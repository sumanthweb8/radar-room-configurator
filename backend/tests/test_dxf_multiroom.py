"""
Tests for multi-room DXF splitting and the geometry kernel.

The room-split fixtures (Morris/Jp_lab/Fortis) live in the repo's top-level
`files/` directory; tests that need them skip if they're absent. The geometry
kernel tests need no fixture and always run.
"""

from __future__ import annotations

from pathlib import Path

import pytest

from dxf import (
    _dist_point_to_polygon,
    _point_in_polygon,
    _shoelace_area,
    parse_dxf,
)


FILES_DIR = Path(__file__).parent.parent.parent / "files"
MORRIS = FILES_DIR / "Morris_TP.dxf"      # 4-room flat
JP_LAB = FILES_DIR / "Jp_lab.dxf"         # single room (Space Annotation)
FORTIS = FILES_DIR / "Fortis_Bannerghatta_demo.dxf"  # single room (Room Annotation)


def _read(p: Path) -> bytes:
    return p.read_bytes()


def _room_area(r) -> float:
    """Shoelace area of the room polygon, or the bbox area for rectangles."""
    return _shoelace_area(r.polygon) if r.polygon else r.width * r.height


# ───────────────────────── geometry kernel (no fixture) ──────────────────────

def test_point_in_polygon_square():
    square = [(0, 0), (4, 0), (4, 4), (0, 4)]
    assert _point_in_polygon((2, 2), square) is True
    assert _point_in_polygon((5, 2), square) is False
    assert _point_in_polygon((-1, 2), square) is False


def test_point_in_polygon_l_shape():
    # An L: the notch at the top-right is OUTSIDE the polygon.
    l_shape = [(0, 0), (4, 0), (4, 2), (2, 2), (2, 4), (0, 4)]
    assert _point_in_polygon((1, 1), l_shape) is True   # in the foot
    assert _point_in_polygon((1, 3), l_shape) is True   # in the upright
    assert _point_in_polygon((3, 3), l_shape) is False  # in the notch


def test_dist_point_to_polygon():
    square = [(0, 0), (4, 0), (4, 4), (0, 4)]
    # A point 1 m to the right of the right edge.
    assert _dist_point_to_polygon((5, 2), square) == pytest.approx(1.0, abs=1e-6)
    # A point sitting on an edge is distance 0.
    assert _dist_point_to_polygon((2, 0), square) == pytest.approx(0.0, abs=1e-6)


# ───────────────────────── multi-room split (Morris) ─────────────────────────

@pytest.mark.skipif(not MORRIS.exists(), reason="Morris_TP.dxf missing")
def test_morris_splits_into_four_rooms():
    report = parse_dxf(_read(MORRIS))
    assert report.floor is None
    assert len(report.rooms) == 4
    assert [r.name for r in report.rooms] == ["Room 1", "Room 2", "Room 3", "Room 4"]

    # Areas must match the four Room-Annotation declarations {0.71, 3.57, 4.73, 29.57}.
    areas = sorted(_room_area(r) for r in report.rooms)
    expected = sorted([0.71, 3.57, 4.73, 29.57])
    for got, want in zip(areas, expected):
        assert got == pytest.approx(want, abs=0.3), f"area {got} != {want}"


@pytest.mark.skipif(not MORRIS.exists(), reason="Morris_TP.dxf missing")
def test_morris_room_dimensions():
    rooms = parse_dxf(_read(MORRIS)).rooms
    biggest = max(rooms, key=lambda r: r.width * r.height)
    smallest = min(rooms, key=lambda r: r.width * r.height)
    assert biggest.width == pytest.approx(7.70, abs=0.05)
    assert biggest.height == pytest.approx(5.78, abs=0.05)
    assert smallest.width == pytest.approx(0.96, abs=0.05)
    assert smallest.height == pytest.approx(0.76, abs=0.05)


@pytest.mark.skipif(not MORRIS.exists(), reason="Morris_TP.dxf missing")
def test_morris_assets_distributed_not_dumped_in_one_room():
    rooms = parse_dxf(_read(MORRIS)).rooms
    rooms_with_assets = [r for r in rooms if any(
        o.type not in ("door", "window") for o in r.objects)]
    # Furniture must be spread across more than one room, not all in the big one.
    assert len(rooms_with_assets) >= 2


@pytest.mark.skipif(not MORRIS.exists(), reason="Morris_TP.dxf missing")
def test_morris_every_object_within_its_room_bounds():
    for r in parse_dxf(_read(MORRIS)).rooms:
        for o in r.objects:
            assert -0.05 <= o.x <= r.width + 0.05,  f"{r.name}/{o.label}: x={o.x}"
            assert -0.05 <= o.y <= r.height + 0.05, f"{r.name}/{o.label}: y={o.y}"
            assert o.width > 0 and o.height > 0


# ───────────────────────── single-room fallback ──────────────────────────────

@pytest.mark.skipif(not JP_LAB.exists(), reason="Jp_lab.dxf missing")
def test_jp_lab_single_room():
    report = parse_dxf(_read(JP_LAB))
    assert len(report.rooms) == 1
    r = report.rooms[0]
    assert r.width == pytest.approx(5.665, abs=0.05)
    assert r.height == pytest.approx(5.847, abs=0.05)
    assert _room_area(r) == pytest.approx(26.93, abs=0.5)


@pytest.mark.skipif(not FORTIS.exists(), reason="Fortis_Bannerghatta_demo.dxf missing")
def test_fortis_single_room():
    report = parse_dxf(_read(FORTIS))
    assert len(report.rooms) == 1
    r = report.rooms[0]
    assert r.width == pytest.approx(3.976, abs=0.05)
    assert r.height == pytest.approx(3.625, abs=0.05)
