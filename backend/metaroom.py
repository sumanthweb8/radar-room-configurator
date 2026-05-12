"""
metaroom.py — Parser for Metaroom by Amrax floor-plan PDFs.

Metaroom is an iOS LiDAR app that exports multi-page A4 PDF reports. Each report
contains, for every scanned room, a "Room Layout" page (vector floor plan with
labeled metric dimensions) followed by a "Room Layout Overview" page (a table
listing every wall/door/window/fixture with its bounding box).

This parser is fully deterministic — no LLM, no online APIs. It relies on:
  • pdftotext  -layout  → searchable text layer (room headers, element table)
  • pdftocairo -svg     → vector geometry per page (walls, doors, windows)

Element types are identified by stroke color/width in the rendered SVG:
  • Wall    : stroke-width 441, black
  • Door    : stroke-width 441, peach  rgb(100%, 89.4%, 76.9%)
  • Window  : stroke-width 229, light  rgb(67.8%, 84.7%, 90.2%)
"""

from __future__ import annotations

import os
import re
import subprocess
import tempfile
import xml.etree.ElementTree as ET
from dataclasses import dataclass, field
from typing import List, Optional, Tuple

from pypdf import PdfReader


SVG_NS = {"svg": "http://www.w3.org/2000/svg"}


def _tag_name(tag: str) -> str:
    """Strip XML namespace from SVG tags."""
    return tag.split("}")[-1]


# Tolerances when matching SVG colors (pdftocairo emits high-precision floats).
_COLOR_TOL = 0.05  # 5% RGB component tolerance — more robust across OS/version differences

# Reference colors as (r, g, b) in [0, 1].
_BLACK       = (0.00, 0.00, 0.00)
_DOOR_PEACH  = (1.00, 0.894104, 0.768616)
_WIN_BLUE    = (0.678421, 0.847046, 0.901947)


# ───────────────────────── data shapes ──────────────────────────

@dataclass
class ElementRow:
    """One row of the per-room overview table."""
    index: int
    type: str           # 'Wall' | 'Door area' | 'Window area' | 'Toilet' | 'Sink' | …
    width_m: float
    depth_m: float
    height_m: float


@dataclass
class RoomObject:
    """Output object — shape mirrors the frontend RoomObject interface."""
    type: str           # 'door' | 'window' | 'bed' | 'sofa' | … | 'custom'
    label: str
    x: float            # metres, top-left corner
    y: float
    width: float
    height: float
    rotation: int = 0


@dataclass
class Room:
    name: str
    width: float
    height: float
    objects: List[RoomObject] = field(default_factory=list)


@dataclass
class FloorInfo:
    name: str
    width: float
    height: float


@dataclass
class MetaroomReport:
    floor: Optional[FloorInfo]
    rooms: List[Room]


# ───────────────────────── public API ──────────────────────────

def is_metaroom_pdf(pdf_bytes: bytes) -> bool:
    """Sniff PDF metadata or content for Metaroom signature."""
    try:
        with tempfile.NamedTemporaryFile(suffix=".pdf", delete=True) as tmp:
            tmp.write(pdf_bytes)
            tmp.flush()
            reader = PdfReader(tmp.name)
            meta = reader.metadata or {}
            author = (meta.get("/Author") or "").lower()
            producer = (meta.get("/Producer") or "").lower()
            if "metaroom" in author or "metaroom" in producer:
                return True
            # Lab-layout style: anonymous author but the page footer says "Created with Metaroom".
            if "reportlab" in producer:
                text = subprocess.check_output(
                    ["pdftotext", tmp.name, "-"],
                    stderr=subprocess.DEVNULL,
                ).decode("utf-8", errors="replace").lower()
                return "metaroom" in text
            return False
    except Exception:
        return False


def parse_metaroom_pdf(pdf_bytes: bytes) -> MetaroomReport:
    """Top-level parser. Returns the floor (if a multi-room report) and every room."""
    with tempfile.TemporaryDirectory() as tmpdir:
        pdf_path = os.path.join(tmpdir, "input.pdf")
        with open(pdf_path, "wb") as f:
            f.write(pdf_bytes)

        full_text = _pdftotext_all(pdf_path)
        page_texts = _pdftotext_per_page(pdf_path)

        floor = _parse_floor_info(full_text)
        room_pages = _find_room_pages(page_texts)
        rooms: List[Room] = []
        for header_page, overview_page, name, w, h in room_pages:
            elements = _parse_overview_table(page_texts[overview_page - 1]) if overview_page else []
            svg_root = _pdftocairo_svg(pdf_path, header_page, tmpdir)
            objects = _objects_from_svg(svg_root, w, h, elements)
            rooms.append(Room(name=name, width=w, height=h, objects=objects))
        return MetaroomReport(floor=floor, rooms=rooms)


# ───────────────────────── poppler wrappers ──────────────────────────

def _pdftotext_all(pdf_path: str) -> str:
    return subprocess.check_output(
        ["pdftotext", "-layout", pdf_path, "-"],
        stderr=subprocess.DEVNULL,
    ).decode("utf-8", errors="replace")


def _pdftotext_per_page(pdf_path: str) -> List[str]:
    pages: List[str] = []
    reader = PdfReader(pdf_path)
    for i in range(1, len(reader.pages) + 1):
        out = subprocess.check_output(
            ["pdftotext", "-layout", "-f", str(i), "-l", str(i), pdf_path, "-"],
            stderr=subprocess.DEVNULL,
        ).decode("utf-8", errors="replace")
        pages.append(out)
    return pages


def _pdftocairo_svg(pdf_path: str, page: int, tmpdir: str) -> ET.Element:
    out_path = os.path.join(tmpdir, f"page-{page}.svg")
    subprocess.check_call(
        ["pdftocairo", "-svg", "-f", str(page), "-l", str(page), pdf_path, out_path],
        stderr=subprocess.DEVNULL,
    )
    return ET.parse(out_path).getroot()


# ───────────────────────── text parsing ──────────────────────────

_DIM_RE = re.compile(
    r"Dimensions:\s*([\d.]+)\s*m\s*x\s*([\d.]+)\s*m",
    re.IGNORECASE,
)
_FLOOR_HEADER_RE = re.compile(r"^\s*Floor\s+(\d+)\s*$", re.MULTILINE)
_ROOM_HEADER_RE = re.compile(r"^\s*Room Layout:\s*(.+?)\s*$", re.MULTILINE)
_ROOM_OVERVIEW_HEADER_RE = re.compile(r"^\s*Room Layout Overview:\s*(.+?)\s*$", re.MULTILINE)
# Matches table rows like:  "  3          Wall           2.26 m x 0.11 m x 2.59 m   ..."
# Capture group 2 is everything between the row number and the dimensions; we
# resolve the actual element type from that span via _extract_type_from_label.
_TABLE_ROW_RE = re.compile(
    r"^\s*(\d+)\s+(.+?)\s+([\d.]+)\s*m\s*x\s*([\d.]+)\s*m\s*x\s*([\d.]+)\s*m",
    re.MULTILINE,
)

# Known Metaroom element types; longest first so "Door area" wins over "Door".
_KNOWN_TYPES = [
    "Door area", "Window area",
    "Wall", "Toilet", "Sink", "Bed", "Sofa", "Table", "Desk", "Chair",
    "Wardrobe", "Cabinet", "Bathtub", "Stove", "Oven", "Fridge", "Refrigerator",
    "Storage", "Opening",
]


def _extract_type_from_label(span: str) -> str:
    """Return the recognised element type from the [Name + Type] span."""
    s = span.strip()
    for t in _KNOWN_TYPES:
        if s.endswith(t) or s == t:
            return t
    # Unknown type — return last 1-2 words capitalised.
    words = s.split()
    return words[-1] if words else s


def _parse_floor_info(full_text: str) -> Optional[FloorInfo]:
    """Find the first Floor N header followed by a Dimensions: line."""
    for m in _FLOOR_HEADER_RE.finditer(full_text):
        # Look at the next ~200 chars for a Dimensions line
        tail = full_text[m.end(): m.end() + 400]
        dim = _DIM_RE.search(tail)
        if dim:
            return FloorInfo(
                name=m.group(0).strip(),
                width=float(dim.group(1)),
                height=float(dim.group(2)),
            )
    return None


def _find_room_pages(page_texts: List[str]) -> List[Tuple[int, Optional[int], str, float, float]]:
    """
    Locate (header_page, overview_page, room_name, w_m, h_m) for every room.
    Pages are 1-indexed. overview_page may be None when absent (rare).
    """
    found: List[Tuple[int, Optional[int], str, float, float]] = []
    for i, text in enumerate(page_texts, start=1):
        # Skip TOC pages (they contain dotted leaders).
        if "Table of Content" in text:
            continue
        header = _ROOM_HEADER_RE.search(text)
        if not header:
            continue
        # The TOC also matches "Room Layout: …" but only when paired with leader dots.
        if "..." in header.group(0):
            continue
        dim = _DIM_RE.search(text)
        if not dim:
            continue
        name = header.group(1).strip()
        w, h = float(dim.group(1)), float(dim.group(2))
        # Overview page is the next page that contains "Room Layout Overview: <name>".
        overview_page: Optional[int] = None
        for j in range(i, min(i + 4, len(page_texts))):
            ov = _ROOM_OVERVIEW_HEADER_RE.search(page_texts[j])
            if ov and ov.group(1).strip() == name:
                overview_page = j + 1
                break
        found.append((i, overview_page, name, w, h))
    return found


def _parse_overview_table(page_text: str) -> List[ElementRow]:
    rows: List[ElementRow] = []
    for m in _TABLE_ROW_RE.finditer(page_text):
        idx, span, w, d, h = m.groups()
        rows.append(ElementRow(
            index=int(idx),
            type=_extract_type_from_label(span),
            width_m=float(w),
            depth_m=float(d),
            height_m=float(h),
        ))
    return rows


# ───────────────────────── SVG geometry ──────────────────────────

_RGB_RE = re.compile(
    r"rgb\(\s*([\d.]+)%\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)",
    re.IGNORECASE,
)
_STROKE_RE = re.compile(r"stroke\s*:\s*([^;]+)")
_FILL_RE = re.compile(r"fill\s*:\s*([^;]+)")
_STROKE_WIDTH_RE = re.compile(r"stroke-width\s*:\s*([\d.]+)")


def _parse_color(value: str) -> Optional[Tuple[float, float, float]]:
    if value.strip().lower() == "none":
        return None
    m = _RGB_RE.search(value)
    if not m:
        return None
    return (float(m.group(1)) / 100, float(m.group(2)) / 100, float(m.group(3)) / 100)


def _color_matches(c: Optional[Tuple[float, float, float]], ref: Tuple[float, float, float]) -> bool:
    if c is None:
        return False
    return all(abs(a - b) <= _COLOR_TOL for a, b in zip(c, ref))


def _path_style(path_el: ET.Element) -> dict:
    """
    Robust SVG style parser.

    Handles BOTH:
      style="stroke:rgb(...);stroke-width:441"
    AND:
      stroke="rgb(...)"
      stroke-width="441"

    macOS pdftocairo emits different SVG formats than Linux.
    """
    style = path_el.get("style", "") or ""

    stroke = None
    fill = None
    stroke_width = 0.0

    # Parse style=""
    m = _STROKE_RE.search(style)
    if m:
        stroke = _parse_color(m.group(1))

    m = _FILL_RE.search(style)
    if m:
        fill = _parse_color(m.group(1))

    m = _STROKE_WIDTH_RE.search(style)
    if m:
        try:
            stroke_width = float(m.group(1))
        except Exception:
            pass

    # Fallback to direct SVG attributes
    if stroke is None:
        stroke = _parse_color(path_el.get("stroke", "") or "")

    if fill is None:
        fill = _parse_color(path_el.get("fill", "") or "")

    if stroke_width == 0.0:
        try:
            stroke_width = float(path_el.get("stroke-width", 0) or 0)
        except Exception:
            pass

    return {
        "stroke": stroke,
        "fill": fill,
        "stroke_width": stroke_width,
    }


_PATH_NUM_RE = re.compile(r"-?\d+(?:\.\d+)?")
_PATH_CMD_RE = re.compile(r"[MmLlHhVvCcSsQqTtAaZz]")


def _path_bbox(d: str) -> Optional[Tuple[float, float, float, float]]:
    """Approximate bbox of an SVG path 'd' attribute by sampling its numeric pairs."""
    nums = [float(n) for n in _PATH_NUM_RE.findall(d)]
    if len(nums) < 2:
        return None
    xs = nums[0::2]
    ys = nums[1::2]
    if not xs or not ys:
        return None
    return (min(xs), min(ys), max(xs), max(ys))


def _bbox_iou(a: Tuple[float, float, float, float], b: Tuple[float, float, float, float]) -> float:
    ix0, iy0 = max(a[0], b[0]), max(a[1], b[1])
    ix1, iy1 = min(a[2], b[2]), min(a[3], b[3])
    iw, ih = max(0.0, ix1 - ix0), max(0.0, iy1 - iy0)
    inter = iw * ih
    if inter <= 0:
        return 0.0
    area_a = max(0.0, a[2] - a[0]) * max(0.0, a[3] - a[1])
    area_b = max(0.0, b[2] - b[0]) * max(0.0, b[3] - b[1])
    union = area_a + area_b - inter
    return inter / union if union > 0 else 0.0


def _dedupe_overlapping(
    bboxes: List[Tuple[float, float, float, float]],
    iou_threshold: float = 0.5,
) -> List[Tuple[float, float, float, float]]:
    """Keep the largest bbox in each cluster of mutually-overlapping ones."""
    kept: List[Tuple[float, float, float, float]] = []
    for b in sorted(bboxes, key=lambda x: -((x[2] - x[0]) * (x[3] - x[1]))):
        if any(_bbox_iou(b, k) > iou_threshold for k in kept):
            continue
        kept.append(b)
    return kept


def _match_rects_to_rows(
    rects_pt: List[Tuple[float, float, float, float]],
    rows: List[ElementRow],
    scale: float,
) -> List[Tuple[Tuple[float, float, float, float], Optional[ElementRow]]]:
    """
    Greedy matcher: assign each interior rectangle to its closest-by-(W×D) row.

    Each rectangle's bbox is compared against every row in both orientations
    (allowing for 90° rotation). The cost is the L1 distance between the size
    pair. Largest rectangles match first; rows whose best match exceeds
    `MAX_MATCH_COST_M` (in metres) stay unassigned.
    """
    MAX_MATCH_COST_M = 0.6

    if not rects_pt or not rows:
        return [(b, None) for b in rects_pt]

    sorted_rects = sorted(
        rects_pt,
        key=lambda b: -((b[2] - b[0]) * (b[3] - b[1])),
    )
    used: set = set()
    pairs: List[Tuple[Tuple[float, float, float, float], Optional[ElementRow]]] = []
    for b in sorted_rects:
        bw_m = (b[2] - b[0]) * scale
        bh_m = (b[3] - b[1]) * scale
        best_idx: Optional[int] = None
        best_cost = float("inf")
        for i, row in enumerate(rows):
            if i in used:
                continue
            cost = min(
                abs(bw_m - row.width_m) + abs(bh_m - row.depth_m),
                abs(bw_m - row.depth_m) + abs(bh_m - row.width_m),
            )
            if cost < best_cost:
                best_cost = cost
                best_idx = i
        if best_idx is not None and best_cost <= MAX_MATCH_COST_M:
            used.add(best_idx)
            pairs.append((b, rows[best_idx]))
        else:
            pairs.append((b, None))
    return pairs


def _objects_from_svg(
    svg_root: ET.Element,
    room_w_m: float,
    room_h_m: float,
    elements: List[ElementRow],
) -> List[RoomObject]:
    """
    Extract walls / doors / windows / interior fixtures from the floor-plan SVG.

    Strategy:
      • Walls (black, stroke-width ≈ 441) form the room perimeter. Their union
        bbox gives the room outline in PDF points → derive a points-per-metre
        scale by matching against the room's tabled width.
      • Doors (peach) and windows (light blue) — each path's centroid and size
        convert directly to metres.
      • Interior fixtures: any black-stroked rectangle whose centre sits well
        inside the room outline is a fixture rectangle. We match each one to a
        row in the per-room overview table by W × D similarity (allowing for
        90° rotation), then output it at the SVG-derived position with the
        table's authoritative size and label.
      • Table rows that don't get matched to an SVG rectangle (text-only labels
        like "Opening", or the room is missing fine detail) fall back to a
        room-centre placement so the user can nudge them.
    """
    wall_styled: List[Tuple[float, float, float, float]] = []  # black, wall-thick stroke
    doors: List[Tuple[float, float, float, float]] = []
    windows: List[Tuple[float, float, float, float]] = []
    thin_blacks: List[Tuple[float, float, float, float]] = []  # other black strokes

    for el in svg_root.iter():
        tag = _tag_name(el.tag)

        # Support both path and rect elements
        if tag not in ("path", "rect"):
            continue

        s = _path_style(el)

        bbox = None

        # PATH
        if tag == "path":
            bbox = _path_bbox(el.get("d", ""))

        # RECT
        elif tag == "rect":
            try:
                x = float(el.get("x", 0) or 0)
                y = float(el.get("y", 0) or 0)
                w = float(el.get("width", 0) or 0)
                h = float(el.get("height", 0) or 0)
                bbox = (x, y, x + w, y + h)
            except Exception:
                continue

        if bbox is None:
            continue

        # Drop degenerate geometry
        if (bbox[2] - bbox[0]) < 1.0 or (bbox[3] - bbox[1]) < 1.0:
            continue

        is_door = (
            _color_matches(s["stroke"], _DOOR_PEACH)
            or _color_matches(s["fill"], _DOOR_PEACH)
        )
        is_window = (
            _color_matches(s["stroke"], _WIN_BLUE)
            or _color_matches(s["fill"], _WIN_BLUE)
        )

        if is_door:
            doors.append(bbox)
            continue

        if is_window:
            windows.append(bbox)
            continue

        if _color_matches(s["stroke"], _BLACK):
            if 350 < s["stroke_width"] < 550:
                wall_styled.append(bbox)
            elif 50 < s["stroke_width"] < 350:
                thin_blacks.append(bbox)

    doors = _dedupe_overlapping(doors)
    windows = _dedupe_overlapping(windows)

    if not wall_styled:
        return _fixtures_only(elements, room_w_m, room_h_m)

    # Room outline = union bbox of all wall-styled paths (in PDF pt).
    rx0 = min(b[0] for b in wall_styled)
    ry0 = min(b[1] for b in wall_styled)
    rx1 = max(b[2] for b in wall_styled)
    ry1 = max(b[3] for b in wall_styled)
    room_w_pt = rx1 - rx0
    room_h_pt = ry1 - ry0
    if room_w_pt <= 0 or room_h_pt <= 0:
        return _fixtures_only(elements, room_w_m, room_h_m)

    # Average W and H scales — more accurate for non-square rooms where one
    # axis might be slightly clipped by the page margin.
    scale_w = room_w_m / room_w_pt
    scale_h = room_h_m / room_h_pt
    scale = (scale_w + scale_h) / 2
    inset_pt = min(room_w_pt, room_h_pt) * 0.06  # 6% of the shorter side

    def is_interior(bx: Tuple[float, float, float, float]) -> bool:
        cx_pt = (bx[0] + bx[2]) / 2
        cy_pt = (bx[1] + bx[3]) / 2
        dist = min(cx_pt - rx0, cy_pt - ry0, rx1 - cx_pt, ry1 - cy_pt)
        return dist > inset_pt

    # A wall-styled path drawn well inside the room is actually a fixture (Bed,
    # Table, Toilet, Sink, etc.). Walls themselves sit on the perimeter.
    interior_rects: List[Tuple[float, float, float, float]] = []
    for b in wall_styled:
        if is_interior(b):
            interior_rects.append(b)
    for b in thin_blacks:
        if is_interior(b):
            interior_rects.append(b)
    interior_rects = _dedupe_overlapping(interior_rects)

    def to_room(bx: Tuple[float, float, float, float]) -> Tuple[float, float, float, float]:
        x0, y0, x1, y1 = bx
        return (
            (x0 - rx0) * scale,
            (y0 - ry0) * scale,
            (x1 - x0) * scale,
            (y1 - y0) * scale,
        )

    # Pull authoritative door/window dimensions from the overview table.
    door_rows  = [r for r in elements if r.type.lower() == "door area"]
    window_rows = [r for r in elements if r.type.lower() == "window area"]

    objects: List[RoomObject] = []
    for i, b in enumerate(doors, start=1):
        x, y, w, h = to_room(b)
        if w < 0.05 or h < 0.05:
            continue
        # Use table dimensions if available — more accurate than SVG approximation.
        if i - 1 < len(door_rows):
            row = door_rows[i - 1]
            w_out, h_out = row.width_m, row.depth_m
        else:
            w_out, h_out = w, h
        objects.append(RoomObject(
            type="door",
            label=f"Door {i}" if len(doors) > 1 else "Door",
            x=round(x, 3), y=round(y, 3),
            width=round(w_out, 3), height=round(h_out, 3),
        ))
    for i, b in enumerate(windows, start=1):
        x, y, w, h = to_room(b)
        if w < 0.05 or h < 0.05:
            continue
        if i - 1 < len(window_rows):
            row = window_rows[i - 1]
            w_out, h_out = row.width_m, row.depth_m
        else:
            w_out, h_out = w, h
        objects.append(RoomObject(
            type="window",
            label=f"Window {i}" if len(windows) > 1 else "Window",
            x=round(x, 3), y=round(y, 3),
            width=round(w_out, 3), height=round(h_out, 3),
        ))

    # Match each interior rectangle to a table fixture row by W × D similarity.
    fixture_rows = [
        r for r in elements
        if (m := _map_fixture_type(r.type)) is not None and m not in ("door", "window")
    ]
    matches = _match_rects_to_rows(interior_rects, fixture_rows, scale)
    matched_row_ids = set()
    for bbox, row in matches:
        if row is None:
            continue
        x_m, y_m, w_m, h_m = to_room(bbox)
        cx_m = x_m + w_m / 2
        cy_m = y_m + h_m / 2
        # Use the SVG-derived centroid; clamp the table-sized fixture inside the room.
        place_x = max(0.0, min(cx_m - row.width_m / 2, room_w_m - row.width_m))
        place_y = max(0.0, min(cy_m - row.depth_m / 2, room_h_m - row.depth_m))
        # Detect rotation: if SVG bbox is landscape but table says portrait (or vice versa),
        # the fixture was drawn rotated 90°.
        svg_landscape  = w_m >= h_m
        table_landscape = row.width_m >= row.depth_m
        rotation = 90 if svg_landscape != table_landscape else 0
        objects.append(RoomObject(
            type=_map_fixture_type(row.type) or "custom",
            label=row.type,
            x=round(place_x, 3), y=round(place_y, 3),
            width=round(row.width_m, 3), height=round(row.depth_m, 3),
            rotation=rotation,
        ))
        matched_row_ids.add(id(row))

    # Unmatched fixture rows — drop at room centre as before.
    placed = sum(1 for _ in matched_row_ids)
    for row in fixture_rows:
        if id(row) in matched_row_ids:
            continue
        objects.append(RoomObject(
            type=_map_fixture_type(row.type) or "custom",
            label=row.type,
            x=round(max(0.0, room_w_m / 2 - row.width_m / 2 + placed * 0.05), 3),
            y=round(max(0.0, room_h_m / 2 - row.depth_m / 2 + placed * 0.05), 3),
            width=round(row.width_m, 3),
            height=round(row.depth_m, 3),
        ))
        placed += 1

    return objects


def _fixtures_only(elements: List[ElementRow], room_w: float, room_h: float) -> List[RoomObject]:
    objs: List[RoomObject] = []
    for i, row in enumerate(elements):
        mapped = _map_fixture_type(row.type)
        if mapped is None:
            continue
        objs.append(RoomObject(
            type=mapped,
            label=row.type,
            x=round(max(0.0, room_w / 2 - row.width_m / 2 + i * 0.05), 3),
            y=round(max(0.0, room_h / 2 - row.depth_m / 2 + i * 0.05), 3),
            width=round(row.width_m, 3),
            height=round(row.depth_m, 3),
        ))
    return objs


_FIXTURE_MAP = {
    "door area":   "door",
    "window area": "window",
    "bed":         "bed",
    "sofa":        "sofa",
    "table":       "table",
    "desk":        "desk",
    "chair":       "chair",
    "wardrobe":    "wardrobe",
    "cabinet":     "cabinet",
    # Fixtures with no dedicated preset go to 'custom' but keep their label.
    "toilet":      "custom",
    "sink":        "custom",
    "bathtub":     "custom",
    "stove":       "custom",
    "oven":        "custom",
    "fridge":      "custom",
    "refrigerator":"custom",
}


def _map_fixture_type(raw: str) -> Optional[str]:
    """Map a Metaroom element-table type to a frontend ObjectType. None = skip."""
    key = raw.strip().lower()
    if key.startswith("wall"):
        return None  # walls become the room outline, not an object
    return _FIXTURE_MAP.get(key, "custom")
