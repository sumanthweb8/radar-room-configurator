# CLAUDE.md

Guidance for Claude Code (and other AI assistants) working in this repository.

## What this is

**Radar Room Configurator** — a web tool to lay out a room in 2D, place radar
devices and furniture, preview it in 3D, and export a device configuration.
Floor plans are imported from Metaroom-by-Amrax PDFs or DXF drawings, or built
by hand.

## Stack & layout

- **Backend** — Python / FastAPI (`backend/`). Two offline importers only:
  - `metaroom.py` — Metaroom PDF parser (uses `pypdf`)
  - `dxf.py` — ASCII DXF parser (uses `ezdxf`)
  - `main.py` — wires them into the API
- **Frontend** — React + Vite + TypeScript + Three.js (`frontend/src/`).
  - 2D editing: `RoomEditor.tsx`; 3D render: `Room3DViewer.tsx`
  - Importing: `ImportImageModal.tsx` (PDF / DXF / manual) → `api.ts`
  - Standalone 3D simulator: `frontend/public/simulator.html`

## API surface (the only endpoints)

- `GET  /api/health`
- `POST /api/import-metaroom` — Metaroom PDF → `{ floor, rooms }`
- `POST /api/import-dxf` — ASCII DXF → `{ floor, rooms }`

Both importers return a `rooms[]` payload: each room has `{ name, width, height,
polygon? }` plus an `objects[]` list of `{ type, label, x, y, width, height,
rotation }`.

## Commands

```bash
# Backend
cd backend && pip install -r requirements.txt
python main.py                  # serve on :8000
python -m pytest                # tests

# Frontend
cd frontend && npm install
npm run dev                     # serve on :5173
npm run build                   # tsc + vite build (typecheck gate)
npm test                        # vitest unit tests
npm run test:e2e                # playwright e2e
```

`VITE_API_BASE` selects the backend origin for the frontend (default same-origin).

## Conventions & guardrails

- **Do not reintroduce the legacy OpenCV / OCR / Claude-vision pipeline.** The
  `/api/analyze`, `/api/import-image`, and `/api/refine` endpoints and their
  modules (`detection.py`, `geometry.py`, `ocr.py`, `dimension_matcher.py`,
  `models.py`) were intentionally removed, along with the `anthropic`, `opencv`,
  `numpy`, `shapely`, `Pillow`, and `pillow-heif` dependencies. Imports go
  through the Metaroom-PDF and DXF parsers only.
- `metaroom.py` and `dxf.py` use plain `@dataclass`, not Pydantic. `dxf.py`
  imports its data types (`Room`, `RoomObject`, …) from `metaroom.py`.
- The sample PDFs in `frontend/public/floorplans/` are loaded by
  `FloorPlanViewer.tsx` — don't delete them.
- Keep `requirements.txt` minimal: `fastapi`, `uvicorn`, `python-multipart`,
  `pypdf`, `ezdxf`.

## Deployment

`.github/workflows/deploy.yml` deploys on push to `main`: frontend → GitHub
Pages, backend → Google Cloud Run (`backend/Dockerfile`), then emails a status.
