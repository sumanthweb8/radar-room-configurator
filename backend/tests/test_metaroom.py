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
SHONAN_PDF = (
    Path(__file__).parent.parent.parent
    / "shonan"
    / "6Room_304_shonan_daiichi_hospital_japan_geo only_pdf.pdf"
)


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
def test_single_page_matplotlib_fallback_parses_dimensions():
    """
    Shonan PDFs are single-page Matplotlib exports that forge Author=Metaroom
    but lack the multi-page 'Room Layout:' headers. The single-page fallback
    must return one Room with the dimensions from the page-title block.
    """
    report = parse_metaroom_pdf(SHONAN_PDF.read_bytes())
    assert report.floor is None
    assert len(report.rooms) == 1
    r = report.rooms[0]
    assert r.width == pytest.approx(2.79, abs=0.01)
    assert r.height == pytest.approx(4.90, abs=0.01)
    assert r.name.startswith("Room 304")
    # No object extraction on this path — user adds them manually.
    assert r.objects == []


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
