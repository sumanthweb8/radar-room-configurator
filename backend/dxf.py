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


# ───────────────────────── public API ──────────────────────────

def is_dxf(file_bytes: bytes) -> bool:
    """Cheap sniff: DXF ASCII files start with a '0\\nSECTION' near the top."""
    head = file_bytes[:512].decode("ascii", errors="replace").lstrip()
    return head.startswith("0") and "SECTION" in head[:128]


def parse_dxf(dxf_bytes: bytes) -> MetaroomReport:
    """
    Parse a single-room DXF into the MetaroomReport shape.

    Returns one Room whose width/height is the wall bounding box (in metres)
    and whose `objects` list holds each opening on the `Other` layer as a
    door/window RoomObject placed in room-local coordinates.
    """
    text = dxf_bytes.decode("utf-8", errors="replace") if not _looks_binary(dxf_bytes) else None
    if text is None:
        raise ValueError("Binary DXF detected — only ASCII DXF is supported")

    doc = ezdxf.read(io.StringIO(text))
    ms = doc.modelspace()

    wall_bbox, wall_pts = _collect_wall_bbox(ms)
    if wall_bbox is None:
        return MetaroomReport(floor=None, rooms=[])
    x0, y0, x1, y1 = wall_bbox
    room_w_m = x1 - x0
    room_h_m = y1 - y0

    # Convert DXF polygon (Y-up) to room-local (Y-down, origin top-left).
    polygon = None
    if wall_pts and len(wall_pts) > 4:
        poly_local = [
            (round(px - x0, 3), round(room_h_m - (py - y0), 3))
            for px, py in wall_pts
        ]
        # Only use polygon if the room is non-rectangular (area < 95% of bbox).
        poly_area = _shoelace_area(poly_local)
        bbox_area = room_w_m * room_h_m
        if poly_area < bbox_area * 0.95:
            polygon = _simplify_polygon(poly_local, room_w_m, room_h_m)

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


def _collect_openings(ms, wall_bbox: BBox) -> List[RoomObject]:
    """
    Walk LWPOLYLINEs on the `Other` layer, dedupe near-coincident copies, and
    emit one RoomObject per opening in room-local coordinates.

    Room-local frame:
      • origin (0, 0) at the top-left of the wall bounding box
      • x axis rightward, y axis downward (SVG convention)
    DXF is CAD-convention (Y-up), so we flip Y when translating.
    """
    rx0, ry0, rx1, ry1 = wall_bbox
    room_h_m = ry1 - ry0

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

    deduped = _dedupe_near_coincident(raw_bboxes, dist_tol=0.01)

    # The opening-annotation TEXTs ("Door area" / "Window area") sit *near*
    # each opening — use them to label the object type. For each opening,
    # find the nearest annotation centre.
    annotations: List[Tuple[Tuple[float, float], str]] = []
    for e in ms:
        if e.dxftype() != "TEXT":
            continue
        if not _layer_matches(e.dxf.layer, _OPENING_LABEL_LAYERS):
            continue
        ins = e.dxf.insert
        label = (e.dxf.text or "").strip()
        annotations.append(((float(ins.x), float(ins.y)), label))

    room_w_m = rx1 - rx0
    objects: List[RoomObject] = []
    for i, (ox0, oy0, ox1, oy1) in enumerate(deduped, start=1):
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
        obj_type = _opening_type_from_label(label_text)
        objects.append(RoomObject(
            type=obj_type,
            label=label_text,
            x=round(x_local, 3),
            y=round(y_local, 3),
            width=round(w_m, 3),
            height=round(h_m, 3),
        ))
    return objects


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


def _collect_assets(ms, wall_bbox: BBox) -> List[RoomObject]:
    """
    Walk LWPOLYLINEs on the `Assets` layer (furniture / fixtures in the
    'complete' DXF variant) and emit one RoomObject per piece.

    Same coordinate convention as openings: room-local, Y flipped to SVG
    (origin top-left). Each rectangle's type comes from the nearest TEXT
    on the `Assets Annotation` layer (Bed, Chair, Sink, …) — unknown
    labels fall through to 'custom' so they still appear in the editor.
    """
    rx0, ry0, rx1, ry1 = wall_bbox
    room_h_m = ry1 - ry0

    annotations: List[Tuple[Tuple[float, float], str]] = []
    for e in ms:
        if e.dxftype() != "TEXT":
            continue
        if not _layer_matches(e.dxf.layer, _ASSET_LABEL_LAYERS):
            continue
        ins = e.dxf.insert
        annotations.append(((float(ins.x), float(ins.y)), (e.dxf.text or "").strip()))

    objects: List[RoomObject] = []
    for e in ms:
        if not _layer_matches(e.dxf.layer, _ASSET_LAYERS):
            continue
        if e.dxftype() != "LWPOLYLINE":
            continue
        bb = _bbox_of_points(_poly_xy(e))
        if bb is None:
            continue
        ox0, oy0, ox1, oy1 = bb
        w_m = ox1 - ox0
        h_m = oy1 - oy0
        if w_m < 0.03 or h_m < 0.03:
            continue
        cx, cy = (ox0 + ox1) / 2, (oy0 + oy1) / 2
        label = _nearest_annotation(annotations, (cx, cy)) or "Asset"
        obj_type = _ASSET_TYPE_MAP.get(label.strip().lower(), "custom")
        x_local = ox0 - rx0
        y_local = room_h_m - (oy1 - ry0)

        objects.append(RoomObject(
            type=obj_type,
            label=label,
            x=round(max(0.0, x_local), 3),
            y=round(max(0.0, y_local), 3),
            width=round(w_m, 3),
            height=round(h_m, 3),
            rotation=0,
        ))
    return objects
