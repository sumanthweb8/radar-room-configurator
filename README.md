# Floor Plan → 3D

Internal tool: upload a floor plan → get a correctable 2D wall model → render in 3D.

---

## Architecture

```
floor-plan-tool/
├── backend/
│   ├── main.py                # FastAPI server (2 importer endpoints)
│   ├── metaroom.py            # Metaroom-by-Amrax PDF parser + single-page fallback
│   ├── dxf.py                 # Shonan-style ASCII DXF parser
│   ├── tests/                 # pytest suite (skips when sample data is absent)
│   └── requirements.txt
└── frontend/
    └── src/
        ├── App.tsx                     # Root — upload / 2D / 3D views
        ├── api.ts                      # Typed fetch wrappers
        └── components/
            ├── RoomEditor.tsx          # SVG interactive 2D editor
            ├── Room3DViewer.tsx        # Three.js renderer
            ├── ObjectPalette.tsx       # Object/tool palette
            ├── PropertiesPanel.tsx     # Selection properties + scale
            ├── ImportImageModal.tsx    # Floor-plan upload modal
            └── ExportModal.tsx         # Export configuration modal
```

---

## Quick start

### System prerequisites

`poppler-utils` must be available on `$PATH` — the Metaroom PDF importer shells out to `pdftotext` and `pdftocairo`.

```bash
# Debian/Ubuntu
sudo apt install poppler-utils
# macOS
brew install poppler
```

### Backend

Use `python3` — Ubuntu 22.04+ doesn't alias `python` by default. If `python3 -m venv` errors, install `sudo apt install python3-venv` first.

```bash
cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python3 main.py                            # → http://localhost:8000
```

Always activate the venv before installing. Without `source .venv/bin/activate`, pip falls back to `~/.local/lib/python3.x/site-packages`, which leaks dependency pins into your other Python projects (you'll see "Defaulting to user installation because normal site-packages is not writeable" — that's the warning sign).

Both importers run fully offline — no API keys or network access required.

### Frontend

```bash
cd frontend
npm install
npm run dev             # → http://localhost:5173
```

Open http://localhost:5173 and drop a Metaroom PDF or a DXF onto the page. A house can hold any number of rooms — each one carries its own `board` + `location` and is exported as a separate `<board>_config.json` from the **Export** button (active room) or **Export All** (every room with a placed radar). House state persists to localStorage automatically.

## Importers

| Endpoint | Input | Backend file | Notes |
|---|---|---|---|
| `POST /api/import-metaroom` | PDF | `metaroom.py` | Multi-page Metaroom LiDAR reports *and* single-page Matplotlib exports |
| `POST /api/import-dxf` | DXF (ASCII) | `dxf.py` | Shonan-style exports: walls + door/window openings, furniture ignored |

Both return the same `{ floor, rooms: [{ name, width, height, objects[] }] }` shape so the frontend handler is uniform.

### DXF importer details

The DXF parser ([`backend/dxf.py`](backend/dxf.py)) expects the Shonan export-tool layer convention:

| Layer | What we extract |
|---|---|
| `Geometry` | Largest-area `LWPOLYLINE` = inner room perimeter → room width × height |
| `Other` | `LWPOLYLINE` openings → `door` / `window` objects (typed by nearest `Other Annotation` TEXT) |
| `Assets` | Furniture rectangles → `bed` / `chair` / `table` / `cabinet` / `custom` objects (typed by nearest `Assets Annotation` TEXT) |
| `Measurement` | Not used (room dimensions already come from the perimeter polyline) |

Coordinates are read in metres (`$INSUNITS = 6`) and Y is flipped from CAD (Y-up) to SVG (Y-down). Near-coincident opening polylines are deduped (the exporter draws each opening as inner + outer face). Only ASCII DXF is supported; binary DXF will be rejected with `415`.

Furniture extraction only fires when the source DXF carries an `Assets` layer — the Shonan tool's "complete" variant does, the "geo only" / "custom objects" variants do not.

### Metaroom PDF importer details

Two formats are supported:

- **Multi-page Metaroom-by-Amrax LiDAR reports** — every room has a "Room Layout" page (vector floor plan) and a "Room Layout Overview" page (element table). Walls, doors, windows, and fixtures (bed, sofa, toilet, sink, …) are extracted from the rendered SVG + table.
- **Single-page Matplotlib exports** (e.g. Shonan-tool build 1.3.3) — only the room name and dimensions are extracted from the page title and `Dimensions: X m x Y m` line. Objects are not extracted (the SVG mixes glyph paths with the floor geometry and there is no reliable colour convention).

---

## 2D editor controls

| Action | How |
|--------|-----|
| Pan | Middle-mouse drag |
| Zoom | Scroll wheel |
| Select wall | Click (Select mode) |
| Move endpoint | Drag handle (Select mode) |
| Draw new wall | Click start, click end (Draw mode) |
| Delete wall | Click wall (Delete mode) **or** select + Del key |
| Cancel draw | Esc |
| Set scale | Click reference wall → type real-world metres |

---

## 3D view

- Walls extruded to **3 m** height.
- Scale: `1 / floorPlan.scale` converts pixels → metres (set via 2D scale tool).
- Orbit: left-drag to rotate, right-drag to pan, scroll to zoom.

---

## Tests

```bash
cd backend && source .venv/bin/activate
python3 -m pytest tests/ -v
```

PDF-importer tests need samples in `fwdfloorplans/`, DXF-importer tests need samples in `shonan/`. Both directories are gitignored — tests skip cleanly when samples are absent.
