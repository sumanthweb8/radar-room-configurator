"""
ocr.py — Read dimension annotations from a floor-plan sketch.

Strategy
--------
EasyOCR scans the whole image and returns a list of
  (bbox, text, confidence)
where bbox = [[x1,y1],[x2,y1],[x2,y2],[x1,y2]] (4-corner polygon).

We post-process those results to extract *dimension values*:
  • Match patterns like: 4m  4M  4.5m  2'6"  250cm  3000mm  4  4.5
  • Convert everything to metres.
  • Return a list of DimensionAnnotation objects, each carrying:
      - value_m   : float metres
      - center    : (cx, cy) pixel center of the text bounding box
      - raw_text  : original string (for debugging)
      - confidence: OCR confidence score

The caller (main.py) then matches each annotation to the nearest
wall segment by comparing annotation centers to wall midpoints.
"""

import re
import math
from dataclasses import dataclass
from typing import List, Optional, Tuple

import numpy as np


@dataclass
class DimensionAnnotation:
    value_m:    float              # precise length in metres
    center:     Tuple[float, float]  # (cx, cy) in image pixels
    raw_text:   str
    confidence: float


# ── unit conversion to metres ────────────────────────────────────────────────

def _to_metres(value: float, unit: str) -> Optional[float]:
    """Convert a numeric value + unit string to metres. Returns None if unknown unit."""
    u = unit.lower().strip()
    if u in ("m", "mt", "mtr", "metre", "metres", "meter", "meters", ""):
        return value
    if u in ("cm", "centimetre", "centimeter", "centimetres", "centimeters"):
        return value / 100.0
    if u in ("mm", "millimetre", "millimeter"):
        return value / 1000.0
    if u in ("ft", "feet", "foot", "'"):
        return value * 0.3048
    if u in ("in", "inch", "inches", '"'):
        return value * 0.0254
    return None


# ── regex patterns for dimension strings ────────────────────────────────────

# Matches: 4m  4.5m  4.5 m  4M  4.5M  4.5mt  4 mt  4mtr  2.5 metres
_METRIC = re.compile(
    r"""
    ^[\s\(\[]*                      # optional leading whitespace/bracket
    (?P<value>\d+(?:[.,]\d+)?)      # integer or decimal (comma or dot)
    \s*                             # optional space between number and unit
    (?P<unit>m(?:tr?|etre?s?|eter?s?)?|cm|mm|f(?:eet|oot|t)?|in(?:ch(?:es)?)?)?  # optional unit
    [\s\)\]]*$                      # optional trailing
    """,
    re.IGNORECASE | re.VERBOSE,
)

# Matches: 4'6" or 4' 6"  (feet and inches)
_FEET_INCHES = re.compile(
    r"""^(?P<ft>\d+)\s*['']\s*(?P<inch>\d+(?:\.\d+)?)\s*[\""]?$""",
    re.VERBOSE,
)

# Matches: 4' (feet only)  or  6" (inches only)
_FEET_ONLY   = re.compile(r"^(?P<ft>\d+(?:\.\d+)?)\s*['']\s*$")
_INCH_ONLY   = re.compile(r'^(?P<inch>\d+(?:\.\d+)?)\s*[""]\s*$')


def _parse_dimension(text: str) -> Optional[float]:
    """
    Try to parse *text* as a physical dimension.

    Returns metres as a float, or None if the text is not a dimension.

    We are deliberately generous:
      • A bare number like "4" or "3.5" is treated as metres — this is
        the most common annotation style in hand-drawn floor plans.
      • Confidence is left to the caller; here we just parse.
    """
    t = text.strip()

    # feet-inches: 4'6"
    m = _FEET_INCHES.match(t)
    if m:
        return float(m.group("ft")) * 0.3048 + float(m.group("inch")) * 0.0254

    # feet only: 4'
    m = _FEET_ONLY.match(t)
    if m:
        return float(m.group("ft")) * 0.3048

    # inches only: 6"
    m = _INCH_ONLY.match(t)
    if m:
        return float(m.group("inch")) * 0.0254

    # metric / bare number
    m = _METRIC.match(t)
    if m:
        val = float(m.group("value").replace(",", "."))
        unit = m.group("unit") or ""

        # Sanity guard: reject values that can't be a room dimension.
        # Bare numbers < 0.5 or > 200 are likely page numbers, confidence
        # scores, year annotations, etc.
        converted = _to_metres(val, unit)
        if converted is None:
            return None
        if unit == "" and not (0.5 <= val <= 200):
            return None
        if converted < 0.1 or converted > 500:   # < 10 cm or > 500 m — impossible
            return None
        return converted

    return None


# ── bbox helpers ─────────────────────────────────────────────────────────────

def _bbox_center(bbox) -> Tuple[float, float]:
    """
    Compute the pixel center of an EasyOCR bounding box.
    bbox is [[x1,y1],[x2,y1],[x2,y2],[x1,y2]] (list of 4 [x,y] pairs).
    """
    xs = [p[0] for p in bbox]
    ys = [p[1] for p in bbox]
    return (sum(xs) / 4, sum(ys) / 4)


# ── main OCR function ────────────────────────────────────────────────────────

# Module-level reader cache — EasyOCR initialisation is expensive (~2 s).
# We keep the reader alive between requests on the same process.
_reader_cache = {}

def _get_reader(lang: str = "en"):
    if lang not in _reader_cache:
        import easyocr  # type: ignore
        # gpu=False for portability; set True if CUDA available for speed
        _reader_cache[lang] = easyocr.Reader([lang], gpu=False, verbose=False)
    return _reader_cache[lang]


def read_dimensions(
    image_path: str,
    min_confidence: float = 0.3,
) -> List[DimensionAnnotation]:
    """
    Run EasyOCR on *image_path* and return all detected dimension annotations.

    Parameters
    ----------
    image_path     : path to image (any format supported by cv2 / pillow-heif)
    min_confidence : discard OCR results below this confidence threshold.
                     0.3 is permissive — hand-drawn text is often blurry.

    Returns
    -------
    List[DimensionAnnotation] sorted by confidence descending.
    """
    import cv2

    # Load image (reuse the same loader so HEIC works here too)
    from detection import _load_image
    img_bgr = _load_image(image_path)

    # EasyOCR works better on a lightly pre-processed image for sketches:
    # increase contrast slightly so hand-written numbers stand out.
    gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)
    # CLAHE: adaptive histogram equalisation — improves faint pencil text
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    enhanced = clahe.apply(gray)
    # Convert back to BGR for EasyOCR (it accepts both)
    enhanced_bgr = cv2.cvtColor(enhanced, cv2.COLOR_GRAY2BGR)

    reader = _get_reader("en")
    # detail=1 → returns (bbox, text, confidence)
    raw_results = reader.readtext(enhanced_bgr, detail=1, paragraph=False)

    annotations: List[DimensionAnnotation] = []
    for (bbox, text, conf) in raw_results:
        if conf < min_confidence:
            continue
        value_m = _parse_dimension(text)
        if value_m is None:
            continue
        cx, cy = _bbox_center(bbox)
        annotations.append(DimensionAnnotation(
            value_m    = value_m,
            center     = (cx, cy),
            raw_text   = text,
            confidence = conf,
        ))

    # Sort by confidence so callers can prefer high-confidence matches
    annotations.sort(key=lambda a: a.confidence, reverse=True)
    return annotations
