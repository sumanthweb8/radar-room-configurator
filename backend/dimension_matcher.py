"""
dimension_matcher.py — Associate OCR dimension annotations with wall segments,
then reconstruct a topologically-correct floor plan using the precise
metric values instead of raw pixel lengths.

The problem
-----------
After hand-drawn sketch detection we have:
  • Wall segments in pixel space — correct topology but noisy lengths.
  • Dimension annotations (e.g. "4m", "1m") in pixel space — correct
    values but we don't yet know which wall each one belongs to.

We need to answer: "which annotation belongs to which wall?"

Matching heuristic
------------------
For each annotation center (cx, cy) we compute the perpendicular distance
from the center to every wall segment's infinite line AND check that the
projection falls within the segment's extent (or close to it).

The wall with the minimum such distance wins, subject to a max-distance
cap (MAX_MATCH_DISTANCE_RATIO × image diagonal).  This is the same
heuristic draftsmen use: dimension text sits close to and roughly
parallel with the wall it labels.

Reconstruction
--------------
Once we know which wall has which dimension we scale each wall so that
its length equals the annotated value.  The scaling is done by:
  1. Computing a global pixels-per-metre factor from ALL matched pairs
     (median — robust to outliers from OCR errors).
  2. Overriding the floor-plan's scale field with this factor.
  3. The 3D renderer uses scale to convert px → metres, so the 3D model
     automatically shows the correct room size.

We do NOT warp individual wall coordinates because that would break
the topology (connected endpoints would no longer match).  Instead we
store the ground-truth scale so that measurements and 3D extrusion are
correct, and expose the per-wall label for the UI to display.
"""

import math
import statistics
from dataclasses import dataclass
from typing import Dict, List, Optional, Tuple

from models import FloorPlan, Wall
from ocr import DimensionAnnotation


# ── constants ────────────────────────────────────────────────────────────────

# An annotation can be matched to a wall only if it is within this fraction
# of the image diagonal from the wall's infinite line.  0.08 = 8 % of diag.
# Keeps annotation–wall associations local (no cross-room mismatches).
MAX_MATCH_DISTANCE_RATIO = 0.08

# An annotation must project onto the wall segment (or within this many pixels
# beyond either endpoint).  Prevents matching a label to a wall that only
# happens to be aligned but is far away laterally.
PROJECTION_OVERSHOOT_PX = 30


@dataclass
class WallDimension:
    wall_id:   str
    value_m:   float
    pixels_px: float     # measured pixel length of the wall
    ppm:       float     # implied pixels-per-metre for this wall
    raw_text:  str
    confidence: float


def _wall_midpoint(wall: Wall) -> Tuple[float, float]:
    return (
        (wall.start[0] + wall.end[0]) / 2,
        (wall.start[1] + wall.end[1]) / 2,
    )


def _wall_length_px(wall: Wall) -> float:
    dx = wall.end[0] - wall.start[0]
    dy = wall.end[1] - wall.start[1]
    return math.hypot(dx, dy)


def _pt_to_segment_distance(
    px: float, py: float,
    x1: float, y1: float,
    x2: float, y2: float,
) -> Tuple[float, float]:
    """
    Returns (perp_distance, projection_t) where:
      perp_distance : perpendicular distance from (px,py) to the infinite line
      projection_t  : parameter t in [0,1] for the closest point on segment;
                      t<0 means beyond start, t>1 means beyond end
    """
    dx, dy = x2 - x1, y2 - y1
    length_sq = dx * dx + dy * dy
    if length_sq < 1e-9:
        return math.hypot(px - x1, py - y1), 0.0

    t = ((px - x1) * dx + (py - y1) * dy) / length_sq
    # Closest point on the infinite line
    cx_ = x1 + t * dx
    cy_ = y1 + t * dy
    perp = math.hypot(px - cx_, py - cy_)
    return perp, t


def match_dimensions(
    floor_plan: FloorPlan,
    annotations: List[DimensionAnnotation],
    image_width:  int,
    image_height: int,
) -> Tuple[FloorPlan, List[WallDimension]]:
    """
    Match OCR annotations to walls, compute a global pixels-per-metre scale,
    and return an updated FloorPlan with scale set + per-wall dimension list.

    Parameters
    ----------
    floor_plan   : output of the geometry engine (walls in pixel space)
    annotations  : output of ocr.read_dimensions()
    image_width,
    image_height : used to compute the max-match-distance cap

    Returns
    -------
    (updated_floor_plan, wall_dimensions)
    """
    if not annotations or not floor_plan.walls:
        return floor_plan, []

    diag = math.hypot(image_width, image_height)
    max_dist = diag * MAX_MATCH_DISTANCE_RATIO

    # ── 1. For each annotation find the best matching wall ────────────────
    matched: Dict[str, WallDimension] = {}   # wall_id → best WallDimension

    for ann in annotations:
        cx, cy = ann.center
        best_wall:  Optional[Wall]  = None
        best_dist:  float           = float("inf")

        for wall in floor_plan.walls:
            x1, y1 = wall.start
            x2, y2 = wall.end
            wall_len = _wall_length_px(wall)
            if wall_len < 1:
                continue

            perp, t = _pt_to_segment_distance(cx, cy, x1, y1, x2, y2)

            # The annotation must be close (perpendicularly) to the wall
            if perp > max_dist:
                continue

            # The annotation must project roughly onto the wall
            # (allow PROJECTION_OVERSHOOT_PX / wall_len overshoot)
            overshoot = PROJECTION_OVERSHOOT_PX / wall_len
            if t < -overshoot or t > 1 + overshoot:
                continue

            if perp < best_dist:
                best_dist = perp
                best_wall = wall

        if best_wall is None:
            continue

        px_len = _wall_length_px(best_wall)
        if px_len < 1 or ann.value_m <= 0:
            continue

        ppm = px_len / ann.value_m

        # If this wall already has a match, keep the higher-confidence one
        existing = matched.get(best_wall.id)
        if existing is None or ann.confidence > existing.confidence:
            matched[best_wall.id] = WallDimension(
                wall_id    = best_wall.id,
                value_m    = ann.value_m,
                pixels_px  = px_len,
                ppm        = ppm,
                raw_text   = ann.raw_text,
                confidence = ann.confidence,
            )

    if not matched:
        return floor_plan, []

    dims = list(matched.values())

    # ── 2. Compute global pixels-per-metre via median ─────────────────────
    # Median is robust to a single bad OCR read that would blow up the mean.
    ppm_values = [d.ppm for d in dims]
    global_ppm = statistics.median(ppm_values)

    # ── 3. Update the floor plan scale ────────────────────────────────────
    updated = floor_plan.model_copy(update={"scale": global_ppm})

    return updated, dims
