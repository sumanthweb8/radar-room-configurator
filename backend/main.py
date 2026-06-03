"""
main.py — FastAPI server.

Two offline floor-plan importers:
  • /api/import-metaroom — parse a Metaroom by Amrax PDF into rooms + objects
  • /api/import-dxf      — parse a Shonan-style ASCII DXF into rooms + objects

Both return the same ``{floor, rooms[]}`` shape consumed by the frontend.
"""

import os

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from dxf import is_dxf, parse_dxf
from metaroom import is_metaroom_pdf, parse_metaroom_pdf

app = FastAPI(title="Radar Room Configurator", version="2.0.0")

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


# ─── entry point ─────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import uvicorn
    # PORT env var overrides the default (8000) — useful when 8000 is taken,
    # and matches the Cloud Run convention.
    port = int(os.getenv("PORT", "8000"))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
