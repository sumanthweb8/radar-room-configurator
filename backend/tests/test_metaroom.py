"""
Tests for the Metaroom parser, run against the real sample PDFs in fwdfloorplans/.
Skips if the samples aren't present.
"""

from __future__ import annotations

import io
import os
from pathlib import Path

import pytest

from metaroom import is_metaroom_pdf, parse_metaroom_pdf


SAMPLES_DIR = Path(__file__).parent.parent.parent / "fwdfloorplans"
LAB_PDF = SAMPLES_DIR / "Lab_layout_floor plan" / "lab-layout.pdf"
UTSAV_PDF = SAMPLES_DIR / "2151dde8-b4e1-4a66-a7c1-5bf19586efe7.pdf"
SHONAN_DIR     = Path(__file__).parent.parent.parent / "shonan"
SHONAN_PDF     = SHONAN_DIR / "6Room_304_shonan_daiichi_hospital_japan_geo only_pdf.pdf"
SHONAN_PDF_COMPLETE = SHONAN_DIR / "2Room_304_shonan_daiichi_hospital_japan_complete_pdf.pdf"


def _read(path: Path) -> bytes:
    return path.read_bytes()


@pytest.mark.skipif(not LAB_PDF.exists(), reason="lab-layout sample missing")
def test_is_metaroom_pdf_lab_layout_via_content():
    # Lab layout has Author='(anonymous)'; detection must fall back to text scan.
    assert is_metaroom_pdf(_read(LAB_PDF)) is True


@pytest.mark.skipif(not UTSAV_PDF.exists(), reason="Utsav sample missing")
def test_is_metaroom_pdf_utsav_via_metadata():
    assert is_metaroom_pdf(_read(UTSAV_PDF)) is True


def test_is_metaroom_pdf_rejects_non_metaroom():
    # Synthesise a tiny PDF without the Metaroom signature.
    fake_pdf = (
        b"%PDF-1.4\n"
        b"1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n"
        b"2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n"
        b"3 0 obj<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]>>endobj\n"
        b"xref\n0 4\n"
        b"0000000000 65535 f \n"
        b"trailer<</Size 4/Root 1 0 R>>\nstartxref\n0\n%%EOF\n"
    )
    assert is_metaroom_pdf(fake_pdf) is False


@pytest.mark.skipif(not UTSAV_PDF.exists(), reason="Utsav sample missing")
def test_parse_utsav_floor_and_rooms():
    report = parse_metaroom_pdf(_read(UTSAV_PDF))
    assert report.floor is not None
    assert report.floor.name.startswith("Floor")
    assert report.floor.width == pytest.approx(7.90)
    assert report.floor.height == pytest.approx(10.27)
    assert len(report.rooms) >= 5  # the report has 7 rooms


@pytest.mark.skipif(not UTSAV_PDF.exists(), reason="Utsav sample missing")
def test_parse_utsav_room_006_dimensions_and_elements():
    report = parse_metaroom_pdf(_read(UTSAV_PDF))
    room = next((r for r in report.rooms if r.name == "Room 006"), None)
    assert room is not None
    assert room.width == pytest.approx(2.20)
    assert room.height == pytest.approx(1.25)

    # The Room Layout Overview lists: 4 walls, 1 door area, 1 window area, 1 sink, 1 toilet.
    types = {}
    for o in room.objects:
        types[o.type] = types.get(o.type, 0) + 1
    assert types.get("door", 0) >= 1
    assert types.get("window", 0) >= 1
    # Toilet and Sink land in the 'custom' bucket — labels are preserved.
    labels = {o.label for o in room.objects}
    assert "Toilet" in labels
    assert "Sink" in labels


@pytest.mark.skipif(not SHONAN_PDF.exists(), reason="Shonan single-page PDF missing")
def test_single_page_matplotlib_geo_only_extracts_window():
    """
    The 'geo only' / 'custom objects' PDF variants render only walls + the
    window cut-out. After SVG colour-keying we should get exactly one
    window object — same geometry as the sibling DXF file 5.
    """
    report = parse_metaroom_pdf(SHONAN_PDF.read_bytes())
    assert report.floor is None
    assert len(report.rooms) == 1
    r = report.rooms[0]
    assert r.width == pytest.approx(2.79, abs=0.01)
    assert r.height == pytest.approx(4.90, abs=0.01)
    assert r.name.startswith("Room 304")
    assert len(r.objects) == 1
    win = r.objects[0]
    assert win.type == "window"
    assert win.y == pytest.approx(0.0, abs=0.05)
    assert win.width == pytest.approx(1.425, abs=0.05)


@pytest.mark.skipif(not SHONAN_PDF_COMPLETE.exists(),
                    reason="Shonan 'complete' PDF missing")
def test_single_page_matplotlib_complete_extracts_window_and_furniture():
    """
    The 'complete' PDF (file 2) is Matplotlib's render of file-1 DXF, so it
    must surface the same 1 window + 6 furniture rectangles. Labels can't
    be recovered from the SVG (text is rendered as glyph paths), so all
    furniture comes through as type='custom' with generic 'Furniture N'
    labels — geometry must match the DXF to within a few millimetres.
    """
    report = parse_metaroom_pdf(SHONAN_PDF_COMPLETE.read_bytes())
    r = report.rooms[0]
    assert r.width == pytest.approx(2.79, abs=0.01)
    assert r.height == pytest.approx(4.90, abs=0.01)
    assert len(r.objects) == 1 + 6

    by_type: dict = {}
    for o in r.objects:
        by_type.setdefault(o.type, []).append(o)
    assert len(by_type["window"]) == 1
    assert len(by_type["custom"]) == 6

    # Bed (largest furniture rectangle) must land at the same position as
    # the DXF parser places it: x=0.0, y≈0.143, size ≈2.18×1.33 m.
    bed = max(by_type["custom"], key=lambda o: o.width * o.height)
    assert bed.x == pytest.approx(0.0,   abs=0.02)
    assert bed.y == pytest.approx(0.143, abs=0.02)
    assert bed.width  == pytest.approx(2.178, abs=0.02)
    assert bed.height == pytest.approx(1.330, abs=0.02)


@pytest.mark.skipif(not UTSAV_PDF.exists(), reason="Utsav sample missing")
def test_object_positions_within_room_bounds():
    report = parse_metaroom_pdf(_read(UTSAV_PDF))
    for room in report.rooms:
        for o in room.objects:
            # Allow a small overshoot — doors/windows can sit on the wall edge.
            assert -0.2 <= o.x <= room.width + 0.2,  f"{room.name} {o.label}: x={o.x} out of [0,{room.width}]"
            assert -0.2 <= o.y <= room.height + 0.2, f"{room.name} {o.label}: y={o.y} out of [0,{room.height}]"
            assert o.width > 0
            assert o.height > 0
