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

# Load .env from the backend directory
load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))
from fastapi.middleware.cors import CORSMiddleware

from detection import DetectionConfig, detect_walls, get_image_dimensions, hand_drawn_config
from dimension_matcher import match_dimensions
from geometry import GeometryConfig, GeometryEngine, hand_drawn_geo_config
from models import AnalyzeResponse, FloorPlan, Room, Wall
from ocr import read_dimensions

app = FastAPI(title="Floor Plan Analyzer", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
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

IMPORT_PROMPT = """You are a floor plan data extractor. Analyze this floor plan image and return ONLY a valid JSON object — no markdown, no explanation.

The JSON must exactly match this schema:
{
  "room": {
    "name": "string (e.g. 'Apartment', '2BHK')",
    "width": number,   // total room/apartment width in metres
    "height": number   // total room/apartment height in metres
  },
  "objects": [
    {
      "type": "bed|sofa|table|desk|chair|wardrobe|cabinet|door|window|radar|person|custom",
      "label": "string (e.g. 'Master Bed', 'Bathroom Door')",
      "x": number,      // distance from left wall in metres (top-left corner)
      "y": number,      // distance from top wall in metres (top-left corner)
      "width": number,  // object width in metres
      "height": number, // object depth/height in metres
      "rotation": 0     // 0, 90, 180, or 270
    }
  ]
}

Rules:
- Measure all sizes in metres. If no scale is given, estimate realistically (e.g. standard door = 0.9m wide, single bed = 0.9×1.9m, double bed = 1.4×2.0m, sofa = 2.0×0.9m, bathroom = ~2×1.5m).
- x=0 is the LEFT wall, y=0 is the TOP wall.
- Include doors and windows as objects with type "door" or "window".
- For rooms labeled "bedroom" include a bed. For "bathroom" include nothing (just note the space). For "living" include sofa.
- If the image shows multiple rooms, set room width/height to the TOTAL bounding box and place all objects within it.
- Rotation: use 90 if the object is rotated 90 degrees clockwise, etc.
- Output ONLY the JSON, no other text."""

@app.post("/api/import-image")
async def import_image(file: UploadFile = File(...)):
    """Use Claude vision to extract floor plan data from an uploaded image."""
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

    try:
        client = anthropic.Anthropic()
        message = client.messages.create(
            model="claude-opus-4-5",
            max_tokens=2048,
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
    except json.JSONDecodeError as exc:
        raise HTTPException(status_code=422, detail=f"Claude returned invalid JSON: {exc}\nRaw: {raw[:500]}")
    except anthropic.APIError as exc:
        raise HTTPException(status_code=502, detail=f"Claude API error: {exc}")
    except Exception as exc:
        import traceback
        raise HTTPException(status_code=500, detail=f"Import error: {exc}\n{traceback.format_exc()}")

    return data


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
