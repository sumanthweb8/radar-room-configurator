"""
main.py — FastAPI server.

Full pipeline for hand-drawn annotated sketches
------------------------------------------------
1. OpenCV (detection.py)         → raw wall segments (topology)
2. Geometry engine (geometry.py) → clean walls + rooms
3. EasyOCR (ocr.py)              → dimension annotations ("4m", "1m", …)
4. Dimension matcher             → associate annotations → walls, compute scale

The resulting FloorPlan has:
  • walls with label_m / label_text where OCR matched
  • scale set to pixels-per-metre derived from the annotations
  • ocr_found / ocr_matched counters shown in the UI
"""

import base64
import json
import os
import re
import tempfile
import uuid
from typing import Optional

import anthropic
from dotenv import load_dotenv
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

# Load .env from the backend directory
load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))
from fastapi.middleware.cors import CORSMiddleware

from detection import DetectionConfig, detect_walls, get_image_dimensions, hand_drawn_config
from metaroom import is_metaroom_pdf, parse_metaroom_pdf
from dimension_matcher import match_dimensions
from geometry import GeometryConfig, GeometryEngine, hand_drawn_geo_config
from models import AnalyzeResponse, FloorPlan, Room, Wall
from ocr import read_dimensions

app = FastAPI(title="Floor Plan Analyzer", version="1.0.0")

# CORS_ORIGINS env var: comma-separated list of extra allowed origins.
# Example: https://yourname.github.io,https://your-app.vercel.app
_extra_origins = [o.strip() for o in os.getenv("CORS_ORIGINS", "").split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=_extra_origins,
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─── health ──────────────────────────────────────────────────────────────────

@app.get("/api/health")
def health():
    return {"status": "ok"}


# ─── analyze ─────────────────────────────────────────────────────────────────

@app.post("/api/analyze", response_model=AnalyzeResponse)
async def analyze(
    file:        UploadFile = File(...),
    debug:       bool       = Form(False),
    hand_drawn:  bool       = Form(True),   # default ON for sketch workflow
    use_ocr:     bool       = Form(True),   # default ON — read dimension numbers
    # Detection overrides
    hough_threshold:  Optional[int]   = Form(None),
    hough_min_length: Optional[int]   = Form(None),
    hough_max_gap:    Optional[int]   = Form(None),
    # Geometry overrides
    angle_snap_threshold:    Optional[float] = Form(None),
    parallel_merge_distance: Optional[float] = Form(None),
    min_segment_length:      Optional[float] = Form(None),
    grid_size:               Optional[float] = Form(None),
):
    suffix   = os.path.splitext(file.filename or "image.png")[1] or ".png"
    tmp_path = os.path.join(tempfile.gettempdir(), f"fp_{uuid.uuid4().hex}{suffix}")

    try:
        content = await file.read()
        with open(tmp_path, "wb") as f:
            f.write(content)

        # ── 1. Detection config ───────────────────────────────────────────
        det_cfg = hand_drawn_config() if hand_drawn else DetectionConfig()
        if hough_threshold  is not None: det_cfg.hough_threshold  = hough_threshold
        if hough_min_length is not None: det_cfg.hough_min_length = hough_min_length
        if hough_max_gap    is not None: det_cfg.hough_max_gap    = hough_max_gap

        # ── 2. Geometry config ────────────────────────────────────────────
        geo_cfg = hand_drawn_geo_config() if hand_drawn else GeometryConfig()
        if angle_snap_threshold    is not None: geo_cfg.angle_snap_threshold    = angle_snap_threshold
        if parallel_merge_distance is not None: geo_cfg.parallel_merge_distance = parallel_merge_distance
        if min_segment_length      is not None: geo_cfg.min_segment_length      = min_segment_length
        if grid_size               is not None: geo_cfg.grid_size               = grid_size

        # ── 3. Run OpenCV detection ───────────────────────────────────────
        raw_segs, debug_b64 = detect_walls(tmp_path, det_cfg, produce_debug_image=debug)
        img_w, img_h = get_image_dimensions(tmp_path)

        # ── 4. Run geometry engine ────────────────────────────────────────
        engine     = GeometryEngine(geo_cfg)
        floor_plan = engine.process(raw_segs, image_width=img_w, image_height=img_h)

        # ── 5. OCR: read dimension numbers ────────────────────────────────
        if use_ocr:
            annotations = read_dimensions(tmp_path, min_confidence=0.25)
            floor_plan.ocr_found = len(annotations)

            if annotations:
                floor_plan, wall_dims = match_dimensions(
                    floor_plan, annotations, img_w, img_h
                )
                floor_plan.ocr_matched = len(wall_dims)

                # Stamp matched labels onto individual Wall objects
                dim_by_id = {d.wall_id: d for d in wall_dims}
                for wall in floor_plan.walls:
                    d = dim_by_id.get(wall.id)
                    if d:
                        wall.label_m    = d.value_m
                        wall.label_text = d.raw_text

    except FileNotFoundError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    except Exception as exc:
        import traceback
        raise HTTPException(status_code=500, detail=f"Processing error: {exc}\n{traceback.format_exc()}")
    finally:
        if os.path.exists(tmp_path):
            os.remove(tmp_path)

    return AnalyzeResponse(floor_plan=floor_plan, debug_image=debug_b64)


# ─── import-image ────────────────────────────────────────────────────────────

IMPORT_PROMPT = """You are a precise architectural floor plan extractor. Analyze this floor plan image carefully and return ONLY a valid JSON object — no markdown, no explanation, no extra text.

STEP 1 — Identify every distinct room/space in the image (bedroom, living room, kitchen, bathroom, corridor, etc.).
STEP 2 — For each room, measure its width and height in metres using any scale bar, dimension labels, or standard proportions visible. If no scale is shown, estimate from standard sizes (single bed = 0.9×1.9 m, double bed = 1.4×2.0 m, door = 0.9 m wide, toilet = 0.7×1.2 m, sofa = 2.0×0.9 m).
STEP 3 — For every object/fixture inside each room, compute its x,y position as metres from that room's own top-left corner (x=0 is left wall, y=0 is top wall).

Return this exact JSON schema:
{
  "rooms": [
    {
      "room": {
        "name": "string — exact room label from the image, e.g. 'Master Bedroom', 'Living Room', 'Kitchen'",
        "width": number,   // room width in metres (left-to-right)
        "height": number   // room depth in metres (top-to-bottom)
      },
      "objects": [
        {
          "type": "bed|sofa|table|desk|chair|wardrobe|cabinet|door|window|radar|person|custom",
          "label": "string — descriptive name, e.g. 'Double Bed', 'Entry Door', 'Window (north)'",
          "x": number,      // metres from room's LEFT wall to object's left edge
          "y": number,      // metres from room's TOP wall to object's top edge
          "width": number,  // object width in metres
          "height": number, // object depth in metres
          "rotation": 0     // 0, 90, 180, or 270 degrees clockwise
        }
      ]
    }
  ]
}

Critical rules:
- ONE entry per room in the "rooms" array — never merge multiple rooms into one.
- Coordinates are ROOM-LOCAL — each room's own top-left is (0,0). Do NOT use global image coordinates.
- Every door and window must appear as an object with type "door" or "window". Place them at the wall edge (x≈0 or x≈room.width for side walls; y≈0 or y≈room.height for top/bottom walls).
- Walls themselves are NOT objects — only furniture, fixtures, doors, windows.
- If the image shows dimension numbers (e.g. "3.5m", "2400"), use them exactly. Round to 2 decimal places.
- Doors: width = leaf width (0.7–1.0 m), height = wall thickness (~0.1–0.15 m). Place at the wall where the door opening is.
- Windows: width = glazing width, height = wall thickness (~0.1–0.15 m). Place at the wall edge.
- Beds: include headboard direction by using rotation. Headboard is at y=0 side by default (rotation=0).
- For any unlabeled furniture use type "custom" with a descriptive label.
- Output ONLY the JSON object. No other text whatsoever."""


@app.post("/api/import-image")
async def import_image(file: UploadFile = File(...)):
    """Use Claude vision to extract floor plan data from an uploaded image. Returns same rooms[] format as import-metaroom."""
    content = await file.read()
    ext = (os.path.splitext(file.filename or "")[1] or ".png").lstrip(".").lower()
    media_map = {"jpg": "image/jpeg", "jpeg": "image/jpeg", "png": "image/png", "webp": "image/webp", "gif": "image/gif"}

    # HEIC/HEIF — convert to JPEG using pillow-heif before sending to Claude
    if ext in ("heic", "heif"):
        try:
            import io
            import pillow_heif
            heif_file = pillow_heif.read_heif(content)
            from PIL import Image as PILImage
            img = PILImage.frombytes(heif_file.mode, heif_file.size, heif_file.data, "raw")
            buf = io.BytesIO()
            img.convert("RGB").save(buf, format="JPEG", quality=92)
            content = buf.getvalue()
            ext = "jpeg"
        except Exception as conv_err:
            raise HTTPException(status_code=415, detail=f"HEIC conversion failed: {conv_err}")

    media_type = media_map.get(ext, "image/png")
    b64 = base64.standard_b64encode(content).decode("utf-8")

    raw = ""
    try:
        client = anthropic.Anthropic()
        message = client.messages.create(
            model="claude-opus-4-6",
            max_tokens=4096,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "image", "source": {"type": "base64", "media_type": media_type, "data": b64}},
                        {"type": "text", "text": IMPORT_PROMPT},
                    ],
                }
            ],
        )
        raw = message.content[0].text.strip()

        # Strip any accidental markdown fences
        raw = re.sub(r"^```[a-z]*\n?", "", raw)
        raw = re.sub(r"\n?```$", "", raw)

        data = json.loads(raw)

        # Normalise: if Claude returned old single-room format, wrap it
        if "room" in data and "rooms" not in data:
            data = {"rooms": [{"room": data["room"], "objects": data.get("objects", [])}]}

    except json.JSONDecodeError as exc:
        raise HTTPException(status_code=422, detail=f"Claude returned invalid JSON: {exc}\nRaw: {raw[:500]}")
    except anthropic.APIError as exc:
        raise HTTPException(status_code=502, detail=f"Claude API error: {exc}")
    except Exception as exc:
        import traceback
        raise HTTPException(status_code=500, detail=f"Import error: {exc}\n{traceback.format_exc()}")

    return data


# ─── import-metaroom ─────────────────────────────────────────────────────────

@app.post("/api/import-metaroom")
async def import_metaroom(file: UploadFile = File(...)):
    """Parse a Metaroom by Amrax PDF and return all rooms as importable layouts."""
    content = await file.read()

    if not is_metaroom_pdf(content):
        raise HTTPException(status_code=422, detail="File does not appear to be a Metaroom PDF.")

    try:
        report = parse_metaroom_pdf(content)
    except Exception as exc:
        import traceback
        raise HTTPException(status_code=500, detail=f"Metaroom parse error: {exc}\n{traceback.format_exc()}")

    return {
        "floor": (
            {"name": report.floor.name, "width": report.floor.width, "height": report.floor.height}
            if report.floor else None
        ),
        "rooms": [
            {
                "room": {"name": r.name, "width": round(r.width, 3), "height": round(r.height, 3)},
                "objects": [
                    {
                        "type": o.type,
                        "label": o.label,
                        "x": o.x, "y": o.y,
                        "width": o.width, "height": o.height,
                        "rotation": o.rotation,
                    } for o in r.objects
                ],
            } for r in report.rooms
        ],
    }


# ─── refine ──────────────────────────────────────────────────────────────────

@app.post("/api/refine", response_model=FloorPlan)
async def refine(floor_plan: FloorPlan):
    """Re-run room detection only on an edited floor plan."""
    try:
        engine = GeometryEngine()
        segs   = [(float(w.start[0]), float(w.start[1]), float(w.end[0]), float(w.end[1]))
                  for w in floor_plan.walls]
        room_polygons = engine._detect_rooms(segs)
        floor_plan.rooms = [
            Room(id=str(uuid.uuid4())[:8], polygon=[[x, y] for x, y in poly])
            for poly in room_polygons
        ]
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Refine error: {exc}")
    return floor_plan


# ─── entry point ─────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
