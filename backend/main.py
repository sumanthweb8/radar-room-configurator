"""
main.py — FastAPI server.

Two importers feed the floor-plan editor:
  • POST /api/import-metaroom  → Metaroom-by-Amrax LiDAR PDFs + single-page
                                  Matplotlib exports
  • POST /api/import-dxf       → Shonan-style ASCII DXF (walls + openings)
"""

from fastapi import FastAPI, File, HTTPException, UploadFile
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
