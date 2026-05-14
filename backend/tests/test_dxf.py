"""
Tests for the DXF parser against the real Shonan exports in shonan/.
Skips if the samples aren't present.
"""

from __future__ import annotations

from pathlib import Path

import pytest

from dxf import is_dxf, parse_dxf


SAMPLES_DIR = Path(__file__).parent.parent.parent / "shonan"
COMPLETE_DXF = SAMPLES_DIR / "1Room_304_shonan_daiichi_hospital_japan_complete_dxf.dxf"
GEO_ONLY_DXF = SAMPLES_DIR / "5Room_304_shonan_daiichi_hospital_japan_geo only_dxf.dxf"


def _read(p: Path) -> bytes:
    return p.read_bytes()


def test_is_dxf_recognises_ascii_dxf():
    assert is_dxf(b"  0\nSECTION\n  2\nHEADER\n") is True


def test_is_dxf_rejects_pdf():
    assert is_dxf(b"%PDF-1.4\n%...\n") is False


@pytest.mark.skipif(not GEO_ONLY_DXF.exists(), reason="shonan geo-only DXF missing")
def test_parse_geo_only_dimensions_match_pdf_groundtruth():
    """The sibling PDF reports the room as 2.79 m x 4.90 m — parser must agree."""
    report = parse_dxf(_read(GEO_ONLY_DXF))
    assert report.floor is None
    assert len(report.rooms) == 1
    r = report.rooms[0]
    assert r.width == pytest.approx(2.789, abs=0.01)
    assert r.height == pytest.approx(4.903, abs=0.01)


@pytest.mark.skipif(not GEO_ONLY_DXF.exists(), reason="shonan geo-only DXF missing")
def test_parse_geo_only_extracts_window_opening():
    report = parse_dxf(_read(GEO_ONLY_DXF))
    r = report.rooms[0]
    # Exactly one opening on the Other layer (near-coincident copies dedup to 1).
    assert len(r.objects) == 1
    o = r.objects[0]
    assert o.type == "window"
    assert "Window" in o.label
    # Window sits on the top wall (y = 0), width matches the W1.43 measurement.
    assert o.y == pytest.approx(0.0, abs=0.05)
    assert o.width == pytest.approx(1.425, abs=0.05)


@pytest.mark.skipif(not (COMPLETE_DXF.exists() and GEO_ONLY_DXF.exists()),
                    reason="shonan samples missing")
def test_complete_and_geo_only_produce_same_room():
    """
    File 1 ('complete') is file 5 + an Assets layer of furniture rectangles.
    The parser must ignore Assets — both files should yield the same room
    geometry and the same opening count.
    """
    a = parse_dxf(_read(COMPLETE_DXF)).rooms[0]
    b = parse_dxf(_read(GEO_ONLY_DXF)).rooms[0]
    assert a.width == pytest.approx(b.width)
    assert a.height == pytest.approx(b.height)
    assert len(a.objects) == len(b.objects)


@pytest.mark.skipif(not GEO_ONLY_DXF.exists(), reason="shonan geo-only DXF missing")
def test_opening_lies_within_room_bounds():
    r = parse_dxf(_read(GEO_ONLY_DXF)).rooms[0]
    for o in r.objects:
        assert -0.05 <= o.x <= r.width + 0.05
        assert -0.05 <= o.y <= r.height + 0.05
        assert o.width > 0
        assert o.height > 0
