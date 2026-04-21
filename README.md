# Floor Plan → 3D

Internal tool: upload a floor plan image → get a correctable 2D wall model → render in 3D.

---

## Architecture

```
floor-plan-tool/
├── backend/
│   ├── detection.py   # Layer 1 — OpenCV pipeline
│   ├── geometry.py    # Layer 2 — Geometry engine (core)
│   ├── models.py      # Pydantic data models
│   ├── main.py        # FastAPI server
│   └── requirements.txt
└── frontend/
    └── src/
        ├── App.tsx                     # Root — upload / 2D / 3D views
        ├── api.ts                      # Typed fetch wrappers
        ├── geometry/types.ts           # Shared TS types
        └── components/
            ├── WallEditor.tsx          # SVG interactive editor
            ├── ThreeDView.tsx          # Three.js renderer
            └── Toolbar.tsx             # Mode + scale controls
```

---

## Quick start

### Backend

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python main.py          # → http://localhost:8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev             # → http://localhost:5173
```

Open http://localhost:5173 and drop a floor-plan image onto the page.

---

## Geometry engine pipeline (geometry.py)

| Step | What it does | Key config |
|------|-------------|------------|
| 1. normalize | Consistent orientation; drop zero-length | — |
| 2. snap_angles | Rotate to nearest 0°/45°/90°/135° | `angle_snap_threshold` (15°) |
| 3. filter_short | Drop segments < threshold | `min_segment_length` (20 px) |
| 4. merge_collinear | Fuse fragments of same wall | `collinear_distance_threshold` (6 px) |
| 5. merge_parallel | Collapse double-line thick walls | `parallel_merge_distance` (12 px) |
| 6. snap_to_grid | Quantise endpoints | `grid_size` (5 px) |
| 7. compute_intersections | Parametric segment–segment | — |
| 8. snap_intersections | Union-find cluster → centroid | `intersection_snap_distance` (8 px) |
| 9. split_at_intersections | Cut segments at T/X junctions | — |
| 10. build_graph | Adjacency list for rooms | — |
| 11. detect_rooms | Shapely polygonize (DFS fallback) | `min_room_area_px2` (2000) |

All constants are in `GeometryConfig` — pass overrides via the `/api/analyze` form fields.

---

## API

### POST /api/analyze
- Body: `multipart/form-data` — `file` (image) + optional config overrides
- Response: `{ floor_plan: FloorPlan, debug_image?: string }`

### POST /api/refine
- Body: JSON `FloorPlan` (after user edits)
- Response: updated `FloorPlan` with re-computed rooms

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
