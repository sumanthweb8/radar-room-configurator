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
from dxf import is_dxf, parse_dxf
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
                        **({"z": o.z} if o.z is not None else {}),
                    } for o in r.objects
                ],
            } for r in report.rooms
        ],
    }


# ─── import-dxf ──────────────────────────────────────────────────────────────

@app.post("/api/import-dxf")
async def import_dxf(file: UploadFile = File(...)):
    """Parse a Shonan-style ASCII DXF into rooms with door/window openings and furniture."""
    content = await file.read()
    if not is_dxf(content):
        raise HTTPException(status_code=415, detail="Not an ASCII DXF file")
    try:
        report = parse_dxf(content)
    except Exception as exc:
        import traceback
        raise HTTPException(status_code=500, detail=f"DXF parse error: {exc}\n{traceback.format_exc()}")

    return {
        "floor": None,
        "rooms": [
            {
                "room": {
                    "name": r.name, "width": round(r.width, 3), "height": round(r.height, 3),
                    **({"polygon": [[round(x, 3), round(y, 3)] for x, y in r.polygon]} if r.polygon else {}),
                },
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


# ─── liveroom bridge ────────────────────────────────────────────────────────
# Stores room configs pushed from the configurator frontend and serves them
# in the format KuboCare's LiveRoom1 component expects.

_liveroom_store: dict = {}

WEB_VIEW = 550


def _to_liveroom(room_cfg: dict) -> dict:
    """Convert a configurator room config into LiveRoom1-compatible format."""
    room = room_cfg["room"]
    objects = room_cfg.get("objects", [])
    room_w = room["width"]
    room_h = room["height"]

    longer = max(room_w, room_h)
    scale = WEB_VIEW / longer
    web_w = room_w * scale
    web_h = room_h * scale

    radar = next((o for o in objects if o["type"] == "radar"), None)
    radar_x_px = (radar["x"] + radar["width"] / 2) * scale if radar else web_w / 2
    radar_y_px = (radar["y"] + radar["height"] / 2) * scale if radar else web_h

    furniture = []
    for obj in objects:
        if obj["type"] == "radar":
            continue
        furniture.append({
            "startX": round(obj["x"] * scale, 1),
            "startZ": round(obj["y"] * scale, 1),
            "endX":   round((obj["x"] + obj["width"]) * scale, 1),
            "endZ":   round((obj["y"] + obj["height"]) * scale, 1),
            "image":  "",
            "rotation": obj.get("rotation", 0),
            "object_id": obj["type"],
        })

    return {
        "dimensions": {
            "width": round(web_w, 1),
            "length": round(web_h, 1),
            "radar_x": round(radar_x_px, 1),
            "radar_y": round(radar_y_px, 1),
        },
        "furniture": furniture,
        "room": {
            "id": room_cfg.get("id", "room_1"),
            "board_id": "DEV_BOARD",
            "room_name": room.get("name", "Imported Room"),
            "room_id": room_cfg.get("id", "room_1"),
            "location": "dev",
            "room_pos": "D",
        },
    }


@app.post("/api/liveroom/store")
async def liveroom_store(payload: dict):
    """Store a room config from the configurator frontend."""
    room_id = payload.get("id", "room_1")
    _liveroom_store[room_id] = payload
    return {"status": "ok", "id": room_id}


@app.get("/api/liveroom/rooms/{resident_id}")
async def liveroom_rooms(resident_id: str):
    """Mimic getRoomsListByResident for dev mode."""
    rooms = []
    for rid, cfg in _liveroom_store.items():
        lr = _to_liveroom(cfg)
        rooms.append(lr["room"])
    if not rooms:
        rooms = [{"room_name": "No room configured", "board_id": "", "room_id": "none", "location": "", "room_pos": "D"}]
    return {"rooms": rooms, "temperature_unit": "F"}


@app.post("/api/liveroom/room-by-resident")
async def liveroom_room_by_resident(body: dict):
    """Mimic getRoomByResident for dev mode."""
    room_id = body.get("room_id", "")
    cfg = _liveroom_store.get(room_id)
    if not cfg:
        cfg = next(iter(_liveroom_store.values()), None)
    if not cfg:
        return {"id": "none", "board_id": "", "location": "", "room_pos": "D"}
    return _to_liveroom(cfg)["room"]


@app.post("/api/liveroom/dimensions")
async def liveroom_dimensions(body: dict):
    """Mimic getRoomDimensionsDynamic for dev mode."""
    room_id = body.get("roomId", "")
    cfg = _liveroom_store.get(room_id)
    if not cfg:
        cfg = next(iter(_liveroom_store.values()), None)
    if not cfg:
        return {"width": WEB_VIEW, "length": WEB_VIEW, "radar_x": WEB_VIEW / 2}
    return _to_liveroom(cfg)["dimensions"]


@app.post("/api/liveroom/furniture")
async def liveroom_furniture(body: dict):
    """Mimic furniture endpoint for dev mode."""
    room_id = body.get("roomId", "")
    cfg = _liveroom_store.get(room_id)
    if not cfg:
        cfg = next(iter(_liveroom_store.values()), None)
    if not cfg:
        return {"furniture": []}
    return {"furniture": _to_liveroom(cfg)["furniture"]}


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


# ─── movement (Databricks) ───────────────────────────────────────────────────
#
# Pulls the latest N 2-second movement buckets for a board straight from the
# kubocare_external_prod.bronze.obj table, shaped for the MovementViewer
# (columns: bucket_missouri, obj_values). Replaces the manual CSV-export step.
#
# Requires these env vars in backend/.env (see .env.example):
#   DATABRICKS_SERVER_HOSTNAME   e.g. dbc-xxxxxxxx.cloud.databricks.com
#   DATABRICKS_HTTP_PATH         e.g. /sql/1.0/warehouses/a3f419415962f83b
#   DATABRICKS_TOKEN             a personal access token

_TZ_DEFAULT = "America/Chicago"   # Central — "missouri" buckets are in this zone


def _build_movement_query(*, has_date: bool, has_start: bool,
                          has_end: bool, window_mode: bool, limit: int) -> str:
    """Build the movement-bucket SQL, mirroring the proven analyst query:
    2-second buckets, obj timestamps converted UTC→Central, empty {} frames
    dropped, deduped via collect_set. Optional partition/time filters are added
    only when supplied so unused params never need binding."""
    where = ["board = :board"]
    if has_date:
        where.append("event_date = DATE(:event_date)")
    if has_start:
        where.append("event_time_ts >= to_utc_timestamp(:start_ts, :tz)")
    if has_end:
        where.append("event_time_ts < to_utc_timestamp(:end_ts, :tz)")
    where_sql = "\n    AND ".join(where)

    inner = f"""
  SELECT
    from_utc_timestamp(
      from_unixtime(floor(unix_timestamp(event_time_ts) / 2) * 2),
      :tz
    )                                               AS bucket_missouri,
    collect_set(CASE WHEN obj != '{{}}' THEN obj END) AS obj_values
  FROM kubocare_external_prod.bronze.obj
  WHERE {where_sql}
  GROUP BY floor(unix_timestamp(event_time_ts) / 2)"""

    if window_mode:
        # Explicit window → return the whole thing chronologically (high safety cap).
        return f"SELECT bucket_missouri, obj_values FROM ({inner}\n  ORDER BY bucket_missouri ASC\n) LIMIT {limit}"
    # No window → newest N buckets, handed back chronologically for playback.
    return (f"SELECT bucket_missouri, obj_values FROM ({inner}\n"
            f"  ORDER BY bucket_missouri DESC\n  LIMIT {limit}\n"
            f") ORDER BY bucket_missouri ASC")


def _normalize_frames(cell) -> list:
    """Turn the to_json(collect_list(obj)) cell into a list of frame JSON strings
    shaped {track_id: {center:[lat,fwd], ...}} as the viewer expects.

    Handles both possible encodings of the raw obj map: nested objects, and the
    double-stringified map<string,string> form (inner value is itself JSON)."""
    try:
        frames = json.loads(cell) if isinstance(cell, str) else cell
    except (TypeError, ValueError):
        return []
    out = []
    for fr in frames or []:
        try:
            m = json.loads(fr) if isinstance(fr, str) else fr
        except (TypeError, ValueError):
            continue
        if not isinstance(m, dict):
            continue
        norm = {}
        for tid, inner in m.items():
            if isinstance(inner, str):
                try:
                    inner = json.loads(inner)
                except (TypeError, ValueError):
                    continue
            if isinstance(inner, dict) and isinstance(inner.get("center"), list):
                norm[tid] = inner
        if norm:
            out.append(json.dumps(norm, separators=(",", ":")))
    return out


@app.get("/api/movement/latest")
def movement_latest(
    board: str = "kc2508p020",
    n: int = 500,
    date: Optional[str] = None,    # event_date partition, 'YYYY-MM-DD' (Central calendar day)
    start: Optional[str] = None,   # window start 'YYYY-MM-DD HH:MM:SS' (Central)
    end: Optional[str] = None,     # window end   'YYYY-MM-DD HH:MM:SS' (Central)
    tz: str = _TZ_DEFAULT,
):
    """Movement buckets for `board`, ready for the MovementViewer.

    Provide date + start/end for a specific window (how analysts investigate an
    incident); omit them to get the latest N buckets."""
    host = os.getenv("DATABRICKS_SERVER_HOSTNAME")
    http_path = os.getenv("DATABRICKS_HTTP_PATH")
    token = os.getenv("DATABRICKS_TOKEN")
    if not (host and http_path and token):
        raise HTTPException(
            status_code=503,
            detail="Databricks is not configured. Set DATABRICKS_SERVER_HOSTNAME, "
                   "DATABRICKS_HTTP_PATH and DATABRICKS_TOKEN in backend/.env.",
        )
    try:
        from databricks import sql as dbsql
    except ImportError:
        raise HTTPException(
            status_code=503,
            detail="databricks-sql-connector is not installed. "
                   "Run: pip install databricks-sql-connector",
        )

    has_date, has_start, has_end = bool(date), bool(start), bool(end)
    window_mode = has_start or has_end
    # Window queries return the whole span (capped high); latest-N is bounded by n.
    limit = 20000 if window_mode else max(1, min(int(n), 5000))
    query = _build_movement_query(has_date=has_date, has_start=has_start,
                                  has_end=has_end, window_mode=window_mode, limit=limit)

    params = {"board": board, "tz": tz}
    if has_date:  params["event_date"] = date
    if has_start: params["start_ts"] = start
    if has_end:   params["end_ts"] = end

    try:
        with dbsql.connect(server_hostname=host, http_path=http_path,
                           access_token=token) as conn:
            with conn.cursor() as cur:
                cur.execute(query, params)   # board/date/window bound as parameters
                fetched = cur.fetchall()
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Databricks query failed: {exc}")

    rows = []
    for row in fetched:
        ts = row.bucket_missouri
        ts_str = ts.isoformat() if hasattr(ts, "isoformat") else str(ts)
        rows.append({"bucket_missouri": ts_str, "obj_values": _normalize_frames(row.obj_values)})
    return {"board": board, "count": len(rows), "window": window_mode, "rows": rows}


# ─── entry point ─────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
