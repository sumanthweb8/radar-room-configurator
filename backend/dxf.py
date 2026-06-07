"""
dxf.py — Parser for the Shonan-style DXF exports.

These DXFs come from a third-party export tool (build "1.3.3 @ 2026-05-13",
$Author=Metaroom in the sibling PDFs) and follow a fixed layer convention:

  • Geometry          : closed LWPOLYLINEs and LINEs forming the wall mass
                        (each wall is a filled rectangle ~0.1 m thick, plus one
                        large polyline tracing the inner room perimeter)
  • Other             : LWPOLYLINEs marking door/window cut-outs in walls
  • Measurement       : DIMENSION entities (group 42 = measurement in metres)
  • Space Annotation  : MTEXT room label, e.g. "Space\\PA. 13.50 m²\\PRH 2.51 m"
  • Assets            : (file 1 only) furniture rectangles — *intentionally
                        ignored* by this parser

$INSUNITS = 6 → coordinates are in metres. We use them directly.

The output mirrors `metaroom.MetaroomReport` so the same FastAPI handler and
frontend code-path can consume both PDF and DXF imports.
"""

from __future__ import annotations

import io
import re
from typing import List, Optional, Tuple

import ezdxf

from metaroom import FloorInfo, MetaroomReport, Room, RoomObject


# Layers we extract from. Names are case-insensitive against entity.dxf.layer.
_WALL_LAYERS    = {"geometry"}
_OPENING_LAYERS = {"other"}
_ASSET_LAYERS   = {"assets", "amrax objects"}
_LABEL_LAYERS   = {"space annotation"}
_OPENING_LABEL_LAYERS = {"other annotation"}
_ASSET_LABEL_LAYERS   = {"assets annotation", "amrax objects annotation"}

# Per-room label MTEXT — one per room, positioned inside it. Used to detect how
# many rooms a multi-room floor plan contains (and to seed the room split).
_ROOM_LABEL_LAYERS = {"space annotation", "room annotation"}

# A geometry LWPOLYLINE counts as a *room perimeter* (rather than a thin wall
# slab) only if both its bbox dimensions exceed this. Wall slabs are ~0.25 m
# thick in one axis.
_MIN_ROOM_DIM = 0.35

# Asset-label → frontend ObjectType. Labels not listed here fall through to
# 'custom' so the rectangle still imports — just with the generic shape.
_ASSET_TYPE_MAP = {
    "bed":      "bed",
    "sofa":     "sofa",
    "table":    "table",
    "desk":     "desk",
    "chair":    "chair",
    "wardrobe": "wardrobe",
    "cabinet":  "cabinet",
    "storage":  "cabinet",
    "kc":       "radar",
    "kc2":      "radar",
    "kc 2":     "radar",
    "radar":    "radar",
    "fds":      "radar",
    "fds device": "radar",
    "toilet":   "custom",
    "sink":     "custom",
    "bathtub":  "custom",
    "stove":    "custom",
    "oven":     "custom",
    "fridge":   "custom",
}


BBox = Tuple[float, float, float, float]  # (xmin, ymin, xmax, ymax)


def _simplify_polygon(
    pts: List[Tuple[float, float]], room_w: float, room_h: float,
    snap_tol: float = 0.02, collinear_tol: float = 0.01,
) -> List[Tuple[float, float]]:
    """
    Clean up a raw DXF polygon:
      1. Snap near-zero and near-edge values to exact 0 / room_w / room_h
      2. Remove collinear points (on the same straight line)
      3. Remove near-duplicate consecutive points
    """
    # 1. Snap to room edges
    snapped = []
    for x, y in pts:
        if abs(x) < snap_tol:
            x = 0.0
        elif abs(x - room_w) < snap_tol:
            x = round(room_w, 3)
        if abs(y) < snap_tol:
            y = 0.0
        elif abs(y - room_h) < snap_tol:
            y = round(room_h, 3)
        snapped.append((round(x, 3), round(y, 3)))

    # 2. Remove near-duplicate consecutive points
    deduped: List[Tuple[float, float]] = [snapped[0]]
    for p in snapped[1:]:
        if abs(p[0] - deduped[-1][0]) > snap_tol or abs(p[1] - deduped[-1][1]) > snap_tol:
            deduped.append(p)

    # 2b. Drop a closing vertex that duplicates the first point. Some DXF
    # polylines store the closing point explicitly; if left in, the collinear
    # pass below (which wraps around) sees A==B and deletes a real corner,
    # collapsing e.g. an L-shaped room into a triangle.
    if len(deduped) > 1 and \
       abs(deduped[0][0] - deduped[-1][0]) <= snap_tol and \
       abs(deduped[0][1] - deduped[-1][1]) <= snap_tol:
        deduped.pop()

    # 3. Remove collinear points (point B on line A→C)
    if len(deduped) < 4:
        return deduped
    cleaned: List[Tuple[float, float]] = []
    n = len(deduped)
    for i in range(n):
        a = deduped[(i - 1) % n]
        b = deduped[i]
        c = deduped[(i + 1) % n]
        # Cross product magnitude — 0 means collinear
        cross = abs((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]))
        if cross > collinear_tol:
            cleaned.append(b)

    return cleaned if len(cleaned) >= 3 else deduped


def _shoelace_area(pts: List[Tuple[float, float]]) -> float:
    """Absolute area of a polygon via the shoelace formula."""
    n = len(pts)
    if n < 3:
        return 0.0
    s = 0.0
    for i in range(n):
        x1, y1 = pts[i]
        x2, y2 = pts[(i + 1) % n]
        s += x1 * y2 - x2 * y1
    return abs(s) / 2.0


# ───────────────────────── geometry kernel ──────────────────────────

def _point_in_polygon(pt: Tuple[float, float], poly: List[Tuple[float, float]]) -> bool:
    """Ray-casting point-in-polygon test (pure Python — shapely is banned)."""
    x, y = pt
    n = len(poly)
    if n < 3:
        return False
    inside = False
    j = n - 1
    for i in range(n):
        xi, yi = poly[i]
        xj, yj = poly[j]
        if ((yi > y) != (yj > y)) and \
           (x < (xj - xi) * (y - yi) / (yj - yi + 1e-18) + xi):
            inside = not inside
        j = i
    return inside


def _dist_point_to_segment(
    p: Tuple[float, float], a: Tuple[float, float], b: Tuple[float, float],
) -> float:
    """Shortest distance from point ``p`` to segment ``a``→``b``."""
    px, py = p
    ax, ay = a
    bx, by = b
    dx, dy = bx - ax, by - ay
    if dx == 0 and dy == 0:
        return ((px - ax) ** 2 + (py - ay) ** 2) ** 0.5
    t = max(0.0, min(1.0, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)))
    cx, cy = ax + t * dx, ay + t * dy
    return ((px - cx) ** 2 + (py - cy) ** 2) ** 0.5


def _dist_point_to_polygon(pt: Tuple[float, float], poly: List[Tuple[float, float]]) -> float:
    """Minimum distance from ``pt`` to any edge of ``poly``."""
    n = len(poly)
    if n < 2:
        return float("inf")
    return min(_dist_point_to_segment(pt, poly[i], poly[(i + 1) % n]) for i in range(n))


# ───────────────────────── public API ──────────────────────────

def is_dxf(file_bytes: bytes) -> bool:
    """Cheap sniff: DXF ASCII files start with a '0\\nSECTION' near the top."""
    head = file_bytes[:512].decode("ascii", errors="replace").lstrip()
    return head.startswith("0") and "SECTION" in head[:128]


def parse_dxf(dxf_bytes: bytes) -> MetaroomReport:
    """
    Parse a DXF into the MetaroomReport shape.

    Multi-room floor plans carry one label MTEXT per room (layer
    `Room Annotation` / `Space Annotation`). When two or more such seeds resolve
    to distinct perimeter polygons we split the plan into one Room each, routing
    every opening and asset to the room it belongs to. Single-room files (one or
    zero seeds) fall through to :func:`_parse_single_room`, which preserves the
    original whole-floor behaviour exactly.
    """
    text = dxf_bytes.decode("utf-8", errors="replace") if not _looks_binary(dxf_bytes) else None
    if text is None:
        raise ValueError("Binary DXF detected — only ASCII DXF is supported")

    doc = ezdxf.read(io.StringIO(text))
    ms = doc.modelspace()

    seeds = _collect_room_seeds(ms)
    candidates = _collect_room_candidates(ms)
    matched = _match_seeds_to_rooms(seeds, candidates) if seeds else []

    if len(matched) <= 1:
        return _parse_single_room(ms)

    # ── multi-room path ─────────────────────────────────────────────────────
    opening_anns = _opening_annotations(ms)
    opening_bbs  = _opening_bboxes(ms)
    asset_items  = _asset_items(ms)

    # Route each opening/asset to its owning room (raw DXF coordinate space).
    opens_per_room  = [[] for _ in matched]  # type: List[List[BBox]]
    assets_per_room = [[] for _ in matched]  # type: List[List[Tuple[BBox, str]]]

    for bb in opening_bbs:
        idx = _route_opening(bb, matched)
        if idx is not None:
            opens_per_room[idx].append(bb)
    for item in asset_items:
        idx = _route_asset(item[0], matched)
        if idx is not None:
            assets_per_room[idx].append(item)

    rooms: List[Room] = []
    for i, cand in enumerate(matched, start=0):
        pts, bbox, w_m, h_m, _area = cand
        polygon = _room_polygon_local(pts, bbox)
        objects = [_opening_to_object(bb, bbox, opening_anns) for bb in opens_per_room[i]]
        for item in assets_per_room[i]:
            obj = _asset_to_object(item, bbox)
            if obj is not None:
                objects.append(obj)
        rooms.append(Room(
            name=f"Room {i + 1}",
            width=round(w_m, 3),
            height=round(h_m, 3),
            objects=objects,
            polygon=polygon,
        ))
    return MetaroomReport(floor=None, rooms=rooms)


def _parse_single_room(ms) -> MetaroomReport:
    """
    Original single-room behaviour: the whole floor is treated as one Room whose
    size is the largest-perimeter bounding box, with every opening and asset
    placed in it. Used as the fallback when a plan has no usable room seeds.
    """
    wall_bbox, wall_pts = _collect_wall_bbox(ms)
    if wall_bbox is None:
        return MetaroomReport(floor=None, rooms=[])
    x0, y0, x1, y1 = wall_bbox
    room_w_m = x1 - x0
    room_h_m = y1 - y0

    polygon = _room_polygon_local(wall_pts, wall_bbox) if wall_pts and len(wall_pts) > 4 else None

    name = _extract_room_name(ms) or "Room"
    openings = _collect_openings(ms, wall_bbox)
    assets = _collect_assets(ms, wall_bbox)

    room = Room(
        name=name,
        width=round(room_w_m, 3),
        height=round(room_h_m, 3),
        objects=openings + assets,
        polygon=polygon,
    )
    return MetaroomReport(floor=None, rooms=[room])


def _room_polygon_local(
    wall_pts: Optional[List[Tuple[float, float]]], wall_bbox: BBox,
) -> Optional[List[Tuple[float, float]]]:
    """
    Convert a raw DXF perimeter (Y-up) to a room-local polygon (Y-down, origin
    top-left), returning it only when the room is non-rectangular (polygon area
    < 95 % of its bounding box). Returns None for rectangular rooms.
    """
    if not wall_pts or len(wall_pts) <= 4:
        return None
    x0, y0, x1, y1 = wall_bbox
    room_w_m = x1 - x0
    room_h_m = y1 - y0
    poly_local = [
        (round(px - x0, 3), round(room_h_m - (py - y0), 3))
        for px, py in wall_pts
    ]
    poly_area = _shoelace_area(poly_local)
    bbox_area = room_w_m * room_h_m
    if poly_area < bbox_area * 0.95:
        return _simplify_polygon(poly_local, room_w_m, room_h_m)
    return None


# ───────────────────────── room detection ──────────────────────────

# A matched room: (raw_dxf_points, bbox, width, height, shoelace_area)
_RoomCandidate = Tuple[List[Tuple[float, float]], BBox, float, float, float]


def _collect_room_seeds(ms) -> List[Tuple[Tuple[float, float], str]]:
    """Each room-label MTEXT as ((x, y), raw_text). One per room, in file order."""
    seeds: List[Tuple[Tuple[float, float], str]] = []
    for e in ms:
        if e.dxftype() != "MTEXT":
            continue
        if not _layer_matches(e.dxf.layer, _ROOM_LABEL_LAYERS):
            continue
        ins = e.dxf.insert
        seeds.append(((float(ins.x), float(ins.y)), e.text or ""))
    return seeds


def _collect_room_candidates(ms) -> List[_RoomCandidate]:
    """Every Geometry LWPOLYLINE big enough to be a room perimeter (not a wall slab)."""
    cands: List[_RoomCandidate] = []
    for e in ms:
        if not _layer_matches(e.dxf.layer, _WALL_LAYERS):
            continue
        if e.dxftype() != "LWPOLYLINE":
            continue
        pts = _poly_xy(e)
        if len(pts) < 3:
            continue
        bb = _bbox_of_points(pts)
        if bb is None:
            continue
        w, h = bb[2] - bb[0], bb[3] - bb[1]
        if min(w, h) <= _MIN_ROOM_DIM:
            continue
        cands.append((pts, bb, w, h, _shoelace_area(pts)))
    return cands


def _bbox_close(a: BBox, b: BBox, tol: float = 0.02) -> bool:
    return all(abs(x - y) <= tol for x, y in zip(a, b))


def _match_seeds_to_rooms(
    seeds: List[Tuple[Tuple[float, float], str]],
    candidates: List[_RoomCandidate],
) -> List[_RoomCandidate]:
    """
    For each seed, the smallest-area candidate polygon that contains it. Skips
    seeds that land in no polygon and suppresses duplicate polygons (two seeds in
    the same room, or a perimeter drawn twice). Seed order is preserved so the
    resulting rooms number stably as "Room 1", "Room 2", …
    """
    rooms: List[_RoomCandidate] = []
    used: List[BBox] = []
    for pt, _raw in seeds:
        containing = [c for c in candidates if _point_in_polygon(pt, c[0])]
        if not containing:
            continue
        best = min(containing, key=lambda c: c[4])  # smallest shoelace area
        if any(_bbox_close(best[1], u) for u in used):
            continue
        used.append(best[1])
        rooms.append(best)
    return rooms


def _route_opening(bb: BBox, rooms: List[_RoomCandidate]) -> Optional[int]:
    """Index of the room whose perimeter edge is nearest the opening centroid.

    Openings sit *on* a wall, so their centroid lies outside the inner perimeter;
    nearest-edge distance (not containment) picks the owning room. Ties on a
    shared interior wall break toward the smaller-area room (deterministic).
    """
    if not rooms:
        return None
    cx = (bb[0] + bb[2]) / 2
    cy = (bb[1] + bb[3]) / 2
    return min(
        range(len(rooms)),
        key=lambda i: (round(_dist_point_to_polygon((cx, cy), rooms[i][0]), 4), rooms[i][4]),
    )


def _route_asset(bb: BBox, rooms: List[_RoomCandidate]) -> Optional[int]:
    """Index of the room containing the asset centroid; falls back to nearest edge."""
    if not rooms:
        return None
    cx = (bb[0] + bb[2]) / 2
    cy = (bb[1] + bb[3]) / 2
    containing = [i for i in range(len(rooms)) if _point_in_polygon((cx, cy), rooms[i][0])]
    if containing:
        return min(containing, key=lambda i: rooms[i][4])  # smallest-area on overlap
    return min(
        range(len(rooms)),
        key=lambda i: (round(_dist_point_to_polygon((cx, cy), rooms[i][0]), 4), rooms[i][4]),
    )


# ───────────────────────── geometry helpers ──────────────────────────

def _looks_binary(data: bytes) -> bool:
    """Binary DXF starts with `AutoCAD Binary DXF\\r\\n`."""
    return data[:22].startswith(b"AutoCAD Binary DXF")


def _layer_matches(entity_layer: str, allowed: set) -> bool:
    return (entity_layer or "").strip().lower() in allowed


def _poly_xy(poly) -> List[Tuple[float, float]]:
    return [(float(p[0]), float(p[1])) for p in poly.get_points("xy")]


def _bbox_of_points(pts: List[Tuple[float, float]]) -> Optional[BBox]:
    if not pts:
        return None
    xs = [p[0] for p in pts]
    ys = [p[1] for p in pts]
    return (min(xs), min(ys), max(xs), max(ys))


def _bbox_union(a: Optional[BBox], b: Optional[BBox]) -> Optional[BBox]:
    if a is None:
        return b
    if b is None:
        return a
    return (min(a[0], b[0]), min(a[1], b[1]), max(a[2], b[2]), max(a[3], b[3]))


def _collect_wall_bbox(ms) -> Tuple[Optional[BBox], Optional[List[Tuple[float, float]]]]:
    """
    Bounding box and polygon of the room's *inner* clear span, in DXF metres.

    The export draws each wall as a thin filled rectangle (the wall mass) AND
    one large LWPOLYLINE tracing the inner perimeter of all walls combined.
    Taking the bbox of every Geometry entity unioned would yield the *outer*
    envelope (wall_mass = clear_span + 2 × wall_thickness, ~0.2 m too large
    in each axis). The user-facing room size is the clear span — readable
    from the single perimeter polyline, which is identifiable as the
    largest-bbox-area LWPOLYLINE on the Geometry layer.

    Returns (bbox, polygon_points) — polygon_points are the raw DXF vertices
    of the perimeter polyline (for L-shaped / non-rectangular rooms).
    """
    best_bbox: Optional[BBox] = None
    best_area: float = -1.0
    best_pts: Optional[List[Tuple[float, float]]] = None
    for e in ms:
        if not _layer_matches(e.dxf.layer, _WALL_LAYERS):
            continue
        if e.dxftype() != "LWPOLYLINE":
            continue
        pts = _poly_xy(e)
        bb = _bbox_of_points(pts)
        if bb is None:
            continue
        area = (bb[2] - bb[0]) * (bb[3] - bb[1])
        if area > best_area:
            best_area = area
            best_bbox = bb
            best_pts = pts
    return best_bbox, best_pts


_MTEXT_FORMATTING_RE = re.compile(r"\\[A-Za-z][^\\;]*;|\\[A-Za-z]|{|}")


def _strip_mtext_formatting(raw: str) -> str:
    """Drop MTEXT control sequences (\\P, \\A, \\f…;, {}) → plain string."""
    s = _MTEXT_FORMATTING_RE.sub(" ", raw)
    return re.sub(r"\s+", " ", s).strip()


def _extract_room_name(ms) -> Optional[str]:
    """
    No usable room name is carried in these DXFs — the only label is a generic
    `Space  A. 13.50 m²  RH 2.51 m` MTEXT. Return None so the caller falls
    back to "Room"; the user can rename in the editor.
    """
    return None


def _opening_bboxes(ms) -> List[BBox]:
    """Deduped bounding boxes (raw DXF coords) of every opening on the `Other` layer."""
    raw_bboxes: List[BBox] = []
    for e in ms:
        if not _layer_matches(e.dxf.layer, _OPENING_LAYERS):
            continue
        if e.dxftype() != "LWPOLYLINE":
            continue
        bb = _bbox_of_points(_poly_xy(e))
        if bb is None:
            continue
        # Drop sub-cm degenerate strokes
        if (bb[2] - bb[0]) < 0.01 and (bb[3] - bb[1]) < 0.01:
            continue
        raw_bboxes.append(bb)
    return _dedupe_near_coincident(raw_bboxes, dist_tol=0.01)


def _opening_annotations(ms) -> List[Tuple[Tuple[float, float], str]]:
    """The "Door area" / "Window area" TEXTs near each opening, as ((x, y), label)."""
    annotations: List[Tuple[Tuple[float, float], str]] = []
    for e in ms:
        if e.dxftype() != "TEXT":
            continue
        if not _layer_matches(e.dxf.layer, _OPENING_LABEL_LAYERS):
            continue
        ins = e.dxf.insert
        annotations.append(((float(ins.x), float(ins.y)), (e.dxf.text or "").strip()))
    return annotations


def _opening_to_object(
    bb: BBox, wall_bbox: BBox, annotations: List[Tuple[Tuple[float, float], str]],
) -> RoomObject:
    """
    Convert one opening bbox to a RoomObject in the owning room's local frame.

    Room-local frame:
      • origin (0, 0) at the top-left of the room's wall bounding box
      • x axis rightward, y axis downward (SVG convention)
    DXF is CAD-convention (Y-up), so we flip Y when translating.
    """
    rx0, ry0, rx1, ry1 = wall_bbox
    room_w_m = rx1 - rx0
    room_h_m = ry1 - ry0
    ox0, oy0, ox1, oy1 = bb
    w_m = ox1 - ox0
    h_m = oy1 - oy0
    # Room-local top-left corner (Y flipped: top of room = highest DXF y)
    x_local = ox0 - rx0
    y_local = room_h_m - (oy1 - ry0)
    # Clamp so openings that extend past the room edge stay inside
    x_local = max(0.0, min(x_local, room_w_m - w_m))
    y_local = max(0.0, min(y_local, room_h_m - h_m))
    cx, cy = (ox0 + ox1) / 2, (oy0 + oy1) / 2
    label_text = _nearest_annotation(annotations, (cx, cy)) or "Opening"
    return RoomObject(
        type=_opening_type_from_label(label_text),
        label=label_text,
        x=round(x_local, 3),
        y=round(y_local, 3),
        width=round(w_m, 3),
        height=round(h_m, 3),
    )


def _collect_openings(ms, wall_bbox: BBox) -> List[RoomObject]:
    """Backward-compat: every opening placed in a single room (whole-floor path)."""
    anns = _opening_annotations(ms)
    return [_opening_to_object(bb, wall_bbox, anns) for bb in _opening_bboxes(ms)]


def _dedupe_near_coincident(bboxes: List[BBox], dist_tol: float) -> List[BBox]:
    """Collapse bboxes whose corners agree to within `dist_tol` metres."""
    kept: List[BBox] = []
    for b in bboxes:
        if any(all(abs(a - c) <= dist_tol for a, c in zip(b, k)) for k in kept):
            continue
        kept.append(b)
    return kept


def _nearest_annotation(
    annotations: List[Tuple[Tuple[float, float], str]],
    point: Tuple[float, float],
) -> Optional[str]:
    if not annotations:
        return None
    px, py = point
    best = min(annotations, key=lambda a: (a[0][0] - px) ** 2 + (a[0][1] - py) ** 2)
    return best[1]


def _opening_type_from_label(label: str) -> str:
    s = label.lower()
    if "door" in s:
        return "door"
    if "window" in s:
        return "window"
    return "custom"


def _asset_items(ms) -> List[Tuple[BBox, str]]:
    """
    Every furniture/fixture rectangle on the `Assets` layer as (bbox, label),
    in raw DXF coords. The label comes from the nearest TEXT on the
    `Assets Annotation` layer; sub-5 mm degenerate strokes are dropped.
    """
    annotations: List[Tuple[Tuple[float, float], str]] = []
    for e in ms:
        if e.dxftype() != "TEXT":
            continue
        if not _layer_matches(e.dxf.layer, _ASSET_LABEL_LAYERS):
            continue
        ins = e.dxf.insert
        annotations.append(((float(ins.x), float(ins.y)), (e.dxf.text or "").strip()))

    items: List[Tuple[BBox, str]] = []
    for e in ms:
        if not _layer_matches(e.dxf.layer, _ASSET_LAYERS):
            continue
        if e.dxftype() != "LWPOLYLINE":
            continue
        bb = _bbox_of_points(_poly_xy(e))
        if bb is None:
            continue
        if (bb[2] - bb[0]) < 0.005 and (bb[3] - bb[1]) < 0.005:
            continue
        cx, cy = (bb[0] + bb[2]) / 2, (bb[1] + bb[3]) / 2
        label = _nearest_annotation(annotations, (cx, cy)) or "Asset"
        items.append((bb, label))
    return items


def _asset_to_object(item: Tuple[BBox, str], wall_bbox: BBox) -> Optional[RoomObject]:
    """
    Convert one asset (bbox, label) to a RoomObject in the owning room's local
    frame. Returns None for non-radar pieces smaller than 3 cm (noise). Same
    coordinate convention as openings: room-local, Y flipped (origin top-left).
    Type comes from `_ASSET_TYPE_MAP`; unknown labels fall through to 'custom'.
    """
    rx0, ry0, rx1, ry1 = wall_bbox
    room_h_m = ry1 - ry0
    (ox0, oy0, ox1, oy1), label = item
    w_m = ox1 - ox0
    h_m = oy1 - oy0
    cx, cy = (ox0 + ox1) / 2, (oy0 + oy1) / 2
    key = label.strip().lower()
    obj_type = _ASSET_TYPE_MAP.get(key) or _ASSET_TYPE_MAP.get(key.split()[0] if key else "", "custom")
    # Radar devices may have tiny DXF geometry — use default 0.08m size centered on original
    if obj_type == "radar" and (w_m < 0.03 or h_m < 0.03):
        w_m = 0.08
        h_m = 0.08
        ox0 = cx - 0.04
        oy1 = cy + 0.04
    elif w_m < 0.03 or h_m < 0.03:
        return None
    x_local = ox0 - rx0
    y_local = room_h_m - (oy1 - ry0)
    return RoomObject(
        type=obj_type,
        label=label,
        x=round(max(0.0, x_local), 3),
        y=round(max(0.0, y_local), 3),
        width=round(w_m, 3),
        height=round(h_m, 3),
        rotation=0,
    )


def _collect_assets(ms, wall_bbox: BBox) -> List[RoomObject]:
    """Backward-compat: every asset placed in a single room (whole-floor path)."""
    objects: List[RoomObject] = []
    for item in _asset_items(ms):
        obj = _asset_to_object(item, wall_bbox)
        if obj is not None:
            objects.append(obj)
    return objects
