"""
main.py — FastAPI server.

Three importers feed the floor-plan editor:
  • POST /api/import-image     → Claude vision (raster floor plans)
  • POST /api/import-metaroom  → Metaroom-by-Amrax LiDAR PDFs + single-page
                                  Matplotlib exports
  • POST /api/import-dxf       → Shonan-style ASCII DXF (walls + openings)
"""

import base64
import json
import os
import re

import anthropic
from dotenv import load_dotenv
from fastapi import FastAPI, File, HTTPException, UploadFile

# Load .env from the backend directory
load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))
from fastapi.middleware.cors import CORSMiddleware

from dxf import is_dxf, parse_dxf
from metaroom import MetaroomReport, is_metaroom_pdf, parse_metaroom_pdf

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


# ─── import-metaroom ─────────────────────────────────────────────────────────

def _report_to_response(report: MetaroomReport) -> dict:
    return {
        "floor": (
            {"name": report.floor.name, "width": report.floor.width, "height": report.floor.height}
            if report.floor else None
        ),
        "rooms": [
            {
                "name": r.name,
                "width": r.width,
                "height": r.height,
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


@app.post("/api/import-metaroom")
async def import_metaroom(file: UploadFile = File(...)):
    """Parse a Metaroom (Amrax) iPhone-LiDAR PDF into rooms with placed objects."""
    pdf_bytes = await file.read()
    if not is_metaroom_pdf(pdf_bytes):
        raise HTTPException(status_code=415, detail="Not a Metaroom PDF (no Metaroom signature found)")
    try:
        report = parse_metaroom_pdf(pdf_bytes)
    except Exception as exc:
        import traceback
        raise HTTPException(status_code=500, detail=f"Metaroom parse error: {exc}\n{traceback.format_exc()}")

    return _report_to_response(report)


# ─── import-dxf ──────────────────────────────────────────────────────────────

@app.post("/api/import-dxf")
async def import_dxf(file: UploadFile = File(...)):
    """Parse a Shonan-style ASCII DXF into rooms with door/window openings."""
    dxf_bytes = await file.read()
    if not is_dxf(dxf_bytes):
        raise HTTPException(status_code=415, detail="Not an ASCII DXF file")
    try:
        report = parse_dxf(dxf_bytes)
    except Exception as exc:
        import traceback
        raise HTTPException(status_code=500, detail=f"DXF parse error: {exc}\n{traceback.format_exc()}")

    return _report_to_response(report)


# ─── entry point ─────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
