# Radar Room Configurator

Lay out a room in 2D, place radar devices and furniture, preview it in 3D, and
export a device configuration. Floor plans can be imported from **Metaroom by
Amrax PDFs** or **DXF** drawings, or built by hand.

---

## Architecture

```
radar-room-configurator/
├── backend/                      # FastAPI — two offline floor-plan importers
│   ├── main.py                   # API server (health, import-metaroom, import-dxf)
│   ├── metaroom.py               # Metaroom PDF → rooms + objects
│   ├── dxf.py                    # ASCII DXF → rooms + objects
│   ├── requirements.txt
│   ├── Dockerfile                # Cloud Run image
│   └── tests/                    # pytest: test_metaroom.py, test_dxf.py
└── frontend/                     # React + Vite + TypeScript + Three.js
    ├── public/
    │   ├── floorplans/           # Sample PDFs used by FloorPlanViewer
    │   └── simulator.html        # Standalone Kubocare Radar Simulator (3D)
    └── src/
        ├── App.tsx               # Root — tabs, 2D editor, 3D view
        ├── api.ts                # importDxf() fetch wrapper
        ├── floorPlanData.ts      # Static sample room data
        ├── types.ts              # Shared TS types
        └── components/
            ├── RoomEditor.tsx        # 2D layout editor
            ├── Room3DViewer.tsx      # Three.js 3D renderer
            ├── FloorPlanViewer.tsx   # Sample floor-plan PDF viewer
            ├── ObjectPalette.tsx     # Furniture / device palette
            ├── PropertiesPanel.tsx   # Selected-object properties
            ├── ImportImageModal.tsx  # Import PDF / DXF / manual layout
            └── ExportModal.tsx       # Device-config export
```

> **Note:** the legacy OpenCV / OCR / Claude-vision sketch-detection pipeline
> (`/api/analyze`, `/api/import-image`, `/api/refine`) has been removed. Imports
> now go exclusively through the Metaroom-PDF and DXF parsers.

---

## Quick start

> Linux/macOS commands. Use `python3` / `pip3` (on most Linux machines plain
> `python` is not installed).

### Backend

**One-time setup** — create the virtualenv and install dependencies:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip3 install -r requirements.txt
```

**Every subsequent run** — just activate the existing venv and start the server:

```bash
cd backend
source .venv/bin/activate
python3 main.py          # → http://localhost:8000
```

If port 8000 is already in use, pick another with `PORT`:

```bash
PORT=8001 python3 main.py   # → http://localhost:8001
```

### Frontend

**One-time setup** — install dependencies:

```bash
cd frontend
npm install
```

**Every subsequent run**:

```bash
cd frontend
npm run dev              # → http://localhost:5173
```

Point the frontend at the backend with `VITE_API_BASE` (defaults to same-origin):

```bash
VITE_API_BASE=http://localhost:8000 npm run dev
```

---

## API

| Method | Endpoint               | Purpose                                            |
|--------|------------------------|----------------------------------------------------|
| GET    | `/api/health`          | Liveness check                                     |
| POST   | `/api/import-metaroom` | Parse a Metaroom by Amrax PDF → `{ floor, rooms }` |
| POST   | `/api/import-dxf`      | Parse an ASCII DXF → `{ floor, rooms }`            |

Both importers return the same shape: a `rooms[]` array where each entry has a
`room` (name + dimensions, optional `polygon`) and an `objects[]` list (type,
label, position, size, rotation).

---

## Testing

```bash
# Backend (activate the venv first: source .venv/bin/activate)
cd backend && python3 -m pytest

# Frontend
cd frontend
npm test            # vitest unit tests
npm run test:e2e    # Playwright end-to-end tests
```

---

## Deployment

CI is defined in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
and runs on every push to `main`:

- **Frontend** → GitHub Pages (`npm run build:gh-pages`), built with the
  `VITE_API_BASE` secret.
- **Backend** → Google Cloud Run (`gcloud run deploy radar-room-backend
  --source .`), using the `backend/Dockerfile`.
- A status email is sent after both jobs finish.

For local container builds, `backend/Dockerfile` and `frontend/Dockerfile`
(served via `frontend/nginx.conf`) are provided.
