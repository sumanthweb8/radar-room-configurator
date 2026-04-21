"""
detection.py — Layer 1: OpenCV-based wall detection.

Two modes
---------
• Default (CAD / printed plans): fine lines, clean background.
• Hand-drawn (sketches on paper): thick strokes, paper texture, annotation
  marks, arrows, dimension text that must NOT be detected as walls.

The hand-drawn pipeline adds two extra stages:
  1a. Gaussian blur — kills paper-texture speckle before thresholding.
  1b. Dilation      — thickens and connects broken hand strokes.
  And uses much stronger Hough parameters so short annotation marks
  don't survive as line candidates.

After Hough, a relative-length filter keeps only segments longer than
`min_relative_length × (longest detected segment)`.  For a sketch like
the one above this drops 95 % of noise in one step, because actual walls
span the full room width while arrows / text strokes are tiny.
"""

import math
import os
import base64
from dataclasses import dataclass
from typing import List, Optional, Tuple

import cv2
import numpy as np


RawSegment = Tuple[int, int, int, int]   # (x1, y1, x2, y2)
HEIC_EXTENSIONS = {".heic", ".heif"}


# ─── image loader (supports HEIC) ───────────────────────────────────────────

def _load_image(image_path: str) -> np.ndarray:
    """
    Load any image format into a BGR numpy array for OpenCV.

    HEIC/HEIF path uses pillow_heif.open_heif() directly — no Pillow
    plugin registration needed, so there is no ordering / caching issue.
    bgr_mode=True asks pillow-heif to give us the bytes already in BGR
    order, which saves one cvtColor call.
    """
    ext = os.path.splitext(image_path)[1].lower()

    if ext in HEIC_EXTENSIONS:
        try:
            import pillow_heif  # type: ignore

            heif_file = pillow_heif.open_heif(
                image_path,
                convert_hdr_to_8bit=True,
                bgr_mode=True,
            )
            img = np.asarray(heif_file)
            if img.ndim == 2:
                img = cv2.cvtColor(img, cv2.COLOR_GRAY2BGR)
            elif img.shape[2] == 4:
                img = cv2.cvtColor(img, cv2.COLOR_BGRA2BGR)
            return img.copy()

        except ImportError as exc:
            raise ImportError(
                "HEIC support requires pillow-heif: pip install pillow-heif"
            ) from exc

    img = cv2.imread(image_path)
    if img is None:
        raise FileNotFoundError(f"Cannot load image: {image_path}")
    return img


# ─── config ──────────────────────────────────────────────────────────────────

@dataclass
class DetectionConfig:
    # ── mode ────────────────────────────────────────────────────────────────
    hand_drawn: bool = False
    # When True the pipeline applies extra blur + dilation and uses
    # stronger Hough parameters tuned for rough pen-on-paper sketches.

    # ── Gaussian blur (hand-drawn only) ─────────────────────────────────────
    blur_kernel_size: int = 5
    # Smooths paper texture and ink variation before thresholding.
    # Must be odd.  5 is gentle; increase to 7–9 for very rough sketches.

    # ── Adaptive threshold ───────────────────────────────────────────────────
    adaptive_block_size: int = 15   # 11 for CAD, 15 for hand-drawn
    adaptive_c:          int = 4    # 2  for CAD, 4  for hand-drawn

    # ── Morphological ops ────────────────────────────────────────────────────
    morph_kernel_size:  int = 3     # 3 for CAD
    dilate_kernel_size: int = 3     # extra dilation kernel for hand-drawn strokes
    dilate_iterations:  int = 1     # how many times to dilate

    # ── Canny ────────────────────────────────────────────────────────────────
    canny_low:      int = 50
    canny_high:     int = 150
    canny_aperture: int = 3

    # ── HoughLinesP ──────────────────────────────────────────────────────────
    hough_rho:       float = 1.0
    hough_theta:     float = np.pi / 180
    hough_threshold: int   = 50    # votes — raise for hand-drawn (80–120)
    hough_min_length: int  = 30    # px    — raise for hand-drawn (60–100)
    hough_max_gap:   int   = 10    # px    — raise for hand-drawn (20–30)

    # ── Post-Hough length filter ─────────────────────────────────────────────
    min_relative_length: float = 0.0
    # Keep only segments whose length ≥ min_relative_length × longest_segment.
    # 0.0 = disabled (default for CAD).
    # 0.12–0.18 works well for hand-drawn: actual walls are always much
    # longer than annotation arrows / text strokes.


def hand_drawn_config() -> DetectionConfig:
    """
    Return a DetectionConfig tuned for rough pen-on-paper floor plan sketches.

    Key differences vs. the default (CAD) config
    ---------------------------------------------
    blur_kernel_size  5   : kills paper-texture speckle
    adaptive_block_size 15: larger neighbourhood for varying ink density
    adaptive_c          4 : more aggressive binarisation
    dilate_iterations   2 : thickens strokes → better Hough votes
    hough_threshold   100 : only strong, long lines survive
    hough_min_length   80 : annotation arrows are typically < 80 px
    hough_max_gap      25 : bridges small gaps in hand-drawn strokes
    min_relative_length 0.12 : hard-cuts anything shorter than 12 % of the
                               longest segment (= dimension marks, text)
    """
    return DetectionConfig(
        hand_drawn          = True,
        blur_kernel_size    = 5,
        adaptive_block_size = 15,
        adaptive_c          = 4,
        morph_kernel_size   = 3,
        dilate_kernel_size  = 3,
        dilate_iterations   = 2,
        canny_low           = 30,
        canny_high          = 100,
        canny_aperture      = 3,
        hough_threshold     = 100,
        hough_min_length    = 80,
        hough_max_gap       = 25,
        min_relative_length = 0.12,
    )


# ─── main detection function ─────────────────────────────────────────────────

def detect_walls(
    image_path: str,
    config: Optional[DetectionConfig] = None,
    produce_debug_image: bool = False,
) -> Tuple[List[RawSegment], Optional[str]]:
    """
    Detect raw wall segments from a floor-plan image.

    Returns (segments, debug_base64_png_or_None).
    """
    cfg = config or DetectionConfig()

    # ── 1. Load ───────────────────────────────────────────────────────────
    img = _load_image(image_path)
    h, w = img.shape[:2]

    # Scale Hough min_length relative to image size so the same config works
    # on both low-res and high-res images.  We normalise against a 1000 px
    # reference diagonal so a value of 80 means "80 px on a 1000-px image".
    diag = math.hypot(w, h)
    scale = diag / 1000.0
    eff_min_length = max(10, int(cfg.hough_min_length * scale))

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # ── 1a. Gaussian blur (hand-drawn only) ───────────────────────────────
    # Blurring before thresholding smooths paper texture and ink bleed,
    # preventing every paper fibre from becoming a tiny edge.
    if cfg.hand_drawn:
        k = cfg.blur_kernel_size | 1   # ensure odd
        gray = cv2.GaussianBlur(gray, (k, k), 0)

    # ── 2. Adaptive threshold ─────────────────────────────────────────────
    binary = cv2.adaptiveThreshold(
        gray,
        255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY_INV,
        blockSize=cfg.adaptive_block_size,
        C=cfg.adaptive_c,
    )

    # ── 3. Morphological clean-up ─────────────────────────────────────────
    k_clean = np.ones((cfg.morph_kernel_size, cfg.morph_kernel_size), np.uint8)
    binary = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, k_clean)
    binary = cv2.morphologyEx(binary, cv2.MORPH_OPEN,  k_clean)

    # ── 3a. Extra dilation for hand-drawn ────────────────────────────────
    # Hand-drawn strokes often have tiny gaps and vary in width.
    # Dilating thickens them so Hough gets strong, consistent votes
    # along the full wall length.
    if cfg.hand_drawn and cfg.dilate_iterations > 0:
        k_dil = np.ones((cfg.dilate_kernel_size, cfg.dilate_kernel_size), np.uint8)
        binary = cv2.dilate(binary, k_dil, iterations=cfg.dilate_iterations)

    # ── 4. Canny ─────────────────────────────────────────────────────────
    edges = cv2.Canny(binary, cfg.canny_low, cfg.canny_high,
                      apertureSize=cfg.canny_aperture)

    # ── 5. HoughLinesP ───────────────────────────────────────────────────
    raw_lines = cv2.HoughLinesP(
        edges,
        rho=cfg.hough_rho,
        theta=cfg.hough_theta,
        threshold=cfg.hough_threshold,
        minLineLength=eff_min_length,
        maxLineGap=int(cfg.hough_max_gap * scale),
    )

    segments: List[RawSegment] = []
    if raw_lines is not None:
        for line in raw_lines:
            x1, y1, x2, y2 = line[0]
            segments.append((int(x1), int(y1), int(x2), int(y2)))

    # ── 6. Relative-length filter ─────────────────────────────────────────
    # For hand-drawn images the biggest noise source is annotation marks
    # (arrows ←→, dimension text "4m", "BED" labels).  These are always
    # much shorter than actual wall segments.
    #
    # Strategy: compute the length of every detected segment; keep only
    # those that are at least `min_relative_length` × the longest segment.
    #
    # Example: longest wall = 700 px, min_relative_length = 0.12
    #   → keep segments ≥ 84 px
    #   → drops 50-px arrows and text strokes automatically
    if cfg.min_relative_length > 0 and segments:
        lengths = [
            math.hypot(x2 - x1, y2 - y1)
            for x1, y1, x2, y2 in segments
        ]
        max_len = max(lengths)
        threshold_len = max_len * cfg.min_relative_length
        segments = [
            seg for seg, ln in zip(segments, lengths)
            if ln >= threshold_len
        ]

    # ── 7. Debug overlay ─────────────────────────────────────────────────
    debug_b64: Optional[str] = None
    if produce_debug_image:
        debug_img = img.copy()
        for x1, y1, x2, y2 in segments:
            cv2.line(debug_img, (x1, y1), (x2, y2), (0, 0, 255), 2)
        _, buf = cv2.imencode(".png", debug_img)
        debug_b64 = base64.b64encode(buf.tobytes()).decode("utf-8")

    return segments, debug_b64


def get_image_dimensions(image_path: str) -> Tuple[int, int]:
    img = _load_image(image_path)
    h, w = img.shape[:2]
    return w, h
