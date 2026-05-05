"""
geometry.py — Layer 2: The Geometry Engine.

This is the core of the pipeline. It takes noisy raw segments from the
detection layer and produces a clean, constrained floor plan.

Processing order
----------------
1.  normalize_segments     — consistent orientation, remove degenerates
2.  snap_angles            — snap to 0°/45°/90°/135°
3.  filter_short           — remove tiny segments
4.  merge_collinear        — fuse fragments of the same line
5.  merge_parallel         — fuse double-line thick-wall artefacts
6.  snap_to_grid           — quantise all endpoints to GRID_SIZE
7.  compute_intersections  — all pairwise segment intersections
8.  snap_intersections     — cluster nearby intersections → centroid
9.  split_at_intersections — cut segments at T/X junctions
10. build_graph            — adjacency list: node = point, edge = segment
11. detect_rooms           — closed polygon faces (Shapely polygonize)

Every constant has a docstring explaining *why* that value matters.
"""

import math
import uuid
from collections import defaultdict
from dataclasses import dataclass, field
from typing import Dict, FrozenSet, List, Optional, Set, Tuple

# Shapely is the cleanest way to do robust polygon extraction.
# If absent we fall back to a simple DFS-based cycle finder.
try:
    from shapely.geometry import LineString, MultiLineString
    from shapely.ops import polygonize, unary_union
    HAS_SHAPELY = True
except ImportError:
    HAS_SHAPELY = False

from models import FloorPlan, Room, Wall

# ─── type aliases ───────────────────────────────────────────────────────────
Point   = Tuple[float, float]          # (x, y)
Segment = Tuple[float, float, float, float]   # (x1, y1, x2, y2)


# ─── configuration ──────────────────────────────────────────────────────────
@dataclass
class GeometryConfig:
    # Snap line angles that fall within this many degrees of a canonical angle
    # (0°, 45°, 90°, 135°).  15° is deliberately generous: real floor plans
    # almost never have intentional non-rectilinear walls.
    angle_snap_threshold: float = 15.0

    # Two segments are considered collinear (same infinite line) if every
    # endpoint of one is within this perpendicular distance of the other's line.
    collinear_distance_threshold: float = 6.0

    # Parallel segments whose perpendicular separation is less than this are
    # treated as two detections of the same physical wall and merged to a
    # centerline.  Typical wall detection on a 1000px floor plan produces
    # double-lines ~5–8px apart.
    parallel_merge_distance: float = 12.0

    # Discard any segment shorter than this (pixels).  Removes door symbols,
    # window markers, furniture lines, etc.
    min_segment_length: float = 20.0

    # Snap all endpoints to a grid of this resolution (pixels).  Ensures that
    # walls that should share an endpoint actually share *exactly* the same
    # coordinate after floating-point arithmetic.
    grid_size: float = 5.0

    # Intersection points within this distance are collapsed to their centroid.
    intersection_snap_distance: float = 8.0

    # Minimum room area (pixels²) to keep a detected polygon.  Filters out
    # tiny triangles formed by near-coincident walls.
    min_room_area_px2: float = 2000.0

    # ── hand-drawn extra aggressiveness ─────────────────────────────────────
    # After all merging is done, drop any segment shorter than
    # max_segment_length * min_relative_length.  Catches annotation marks
    # that survived the detection filter (e.g. a long arrow that Hough saw
    # as one segment).  0.0 = disabled.
    min_relative_length: float = 0.0


def hand_drawn_geo_config() -> GeometryConfig:
    """
    GeometryConfig tuned for rough hand-drawn sketches.

    Differences vs. default
    -----------------------
    collinear_distance_threshold 12  : hand strokes waver more
    parallel_merge_distance      25  : pen produces thicker double-lines
    min_segment_length           40  : drop small annotation fragments
    grid_size                    10  : coarser snap for wobbly lines
    intersection_snap_distance   15  : corners aren't perfectly coincident
    min_relative_length          0.1 : drop anything < 10 % of longest wall
    """
    return GeometryConfig(
        angle_snap_threshold        = 20.0,
        collinear_distance_threshold= 12.0,
        parallel_merge_distance     = 25.0,
        min_segment_length          = 40.0,
        grid_size                   = 10.0,
        intersection_snap_distance  = 15.0,
        min_room_area_px2           = 5000.0,
        min_relative_length         = 0.10,
    )


# ─── main engine ────────────────────────────────────────────────────────────
class GeometryEngine:
    """
    Deterministic geometry processing pipeline.

    Same input → identical output on every run.  No random seeds, no
    probabilistic fallbacks.
    """

    def __init__(self, config: Optional[GeometryConfig] = None):
        self.cfg = config or GeometryConfig()

    # ════════════════════════════════════════════════════════════════════
    # PUBLIC API
    # ════════════════════════════════════════════════════════════════════

    def process(
        self,
        raw_segments: List[Tuple[int, int, int, int]],
        image_width: int = 0,
        image_height: int = 0,
    ) -> FloorPlan:
        """Run the full pipeline and return a populated FloorPlan."""

        segs: List[Segment] = [(float(x1), float(y1), float(x2), float(y2))
                               for x1, y1, x2, y2 in raw_segments]

        # ── steps 1-6: clean geometry ────────────────────────────────────
        segs = self._normalize_segments(segs)
        segs = self._snap_angles(segs)
        segs = self._filter_short(segs)
        segs = self._merge_collinear(segs)
        segs = self._merge_parallel(segs)
        segs = self._snap_to_grid(segs)

        # ── steps 7-9: intersection handling ────────────────────────────
        intersections = self._compute_intersections(segs)
        intersections = self._snap_intersections(intersections)
        segs = self._split_at_intersections(segs, intersections)

        # Second grid-snap pass after splitting to realign new endpoints.
        segs = self._snap_to_grid(segs)
        segs = self._filter_short(segs)

        # ── relative-length filter (hand-drawn) ──────────────────────────
        # Drop any segment shorter than min_relative_length × longest seg.
        # This removes dimension arrows and annotation text that survived
        # the fixed-length filter because they happened to be long enough
        # in absolute terms.
        if self.cfg.min_relative_length > 0 and segs:
            lengths = [self._length(s) for s in segs]
            max_len = max(lengths)
            thr = max_len * self.cfg.min_relative_length
            segs = [s for s, l in zip(segs, lengths) if l >= thr]

        # ── steps 10-11: topology ────────────────────────────────────────
        graph = self._build_graph(segs)
        room_polygons = self._detect_rooms(segs)

        # ── assemble result ──────────────────────────────────────────────
        walls = [
            Wall(
                id=str(uuid.uuid4())[:8],
                start=[x1, y1],
                end=[x2, y2],
                thickness=10.0,
            )
            for x1, y1, x2, y2 in segs
        ]

        rooms = [
            Room(id=str(uuid.uuid4())[:8], polygon=[[x, y] for x, y in poly])
            for poly in room_polygons
        ]

        return FloorPlan(
            walls=walls,
            rooms=rooms,
            scale=1.0,
            image_width=image_width,
            image_height=image_height,
        )

    # ════════════════════════════════════════════════════════════════════
    # STEP 1 — normalize_segments
    # ════════════════════════════════════════════════════════════════════

    def _normalize_segments(self, segs: List[Segment]) -> List[Segment]:
        """
        Give every segment a canonical orientation so that later comparisons
        work on a consistent basis.

        Rules
        -----
        - Horizontal-ish (angle < 45° or ≥ 135°): ensure x1 ≤ x2.
        - Vertical-ish   (45° ≤ angle < 135°)   : ensure y1 ≤ y2.
        - Zero-length segments are discarded.
        """
        out: List[Segment] = []
        for x1, y1, x2, y2 in segs:
            dx, dy = x2 - x1, y2 - y1
            if math.hypot(dx, dy) < 1e-6:
                continue
            angle = math.degrees(math.atan2(dy, dx)) % 180
            if angle < 45 or angle >= 135:   # horizontal-ish
                if x1 > x2:
                    x1, y1, x2, y2 = x2, y2, x1, y1
            else:                            # vertical-ish
                if y1 > y2:
                    x1, y1, x2, y2 = x2, y2, x1, y1
            out.append((x1, y1, x2, y2))
        return out

    # ════════════════════════════════════════════════════════════════════
    # STEP 2 — snap_angles
    # ════════════════════════════════════════════════════════════════════

    def _snap_angles(self, segs: List[Segment]) -> List[Segment]:
        """
        Rotate each segment onto the nearest canonical angle.

        Canonical angles: 0° (H), 45° (diagonal), 90° (V), 135° (diagonal).

        Method: preserve the segment's centre point and half-length; only
        the direction vector changes.  This keeps the wall visually in the
        same place while making the angle exact.
        """
        CANONICAL = [0.0, 45.0, 90.0, 135.0]
        out: List[Segment] = []

        for x1, y1, x2, y2 in segs:
            dx, dy = x2 - x1, y2 - y1
            length = math.hypot(dx, dy)
            if length < 1e-6:
                continue

            angle = math.degrees(math.atan2(dy, dx)) % 180

            # Circular distance to each canonical angle (mod 180)
            def circ_dist(a: float, b: float) -> float:
                d = abs(a - b) % 180
                return min(d, 180 - d)

            nearest = min(CANONICAL, key=lambda c: circ_dist(angle, c))

            if circ_dist(angle, nearest) <= self.cfg.angle_snap_threshold:
                cx, cy = (x1 + x2) / 2, (y1 + y2) / 2
                half = length / 2
                rad = math.radians(nearest)
                cos_a, sin_a = math.cos(rad), math.sin(rad)
                out.append((
                    cx - half * cos_a,
                    cy - half * sin_a,
                    cx + half * cos_a,
                    cy + half * sin_a,
                ))
            else:
                out.append((x1, y1, x2, y2))

        return out

    # ════════════════════════════════════════════════════════════════════
    # STEP 3 — filter_short
    # ════════════════════════════════════════════════════════════════════

    def _filter_short(self, segs: List[Segment]) -> List[Segment]:
        return [s for s in segs if self._length(s) >= self.cfg.min_segment_length]

    # ════════════════════════════════════════════════════════════════════
    # STEP 4 — merge_collinear
    # ════════════════════════════════════════════════════════════════════

    def _merge_collinear(self, segs: List[Segment]) -> List[Segment]:
        """
        Fuse fragments of the same wall line into a single segment.

        HoughLinesP often returns 5–10 short fragments for one long wall.
        This step reverses that fragmentation.

        Algorithm
        ---------
        1. Group segments by their "line key" — a (angle_bucket, offset_bucket)
           pair that quantises the infinite line they lie on.
        2. Within each group, do a greedy union-find to merge truly collinear
           pairs (angle check + perpendicular distance check).
        3. For each merged group, project all endpoints onto the direction
           vector and take the full extent.
        """
        if not segs:
            return segs

        n = len(segs)
        parent = list(range(n))

        def find(i: int) -> int:
            while parent[i] != i:
                parent[i] = parent[parent[i]]
                i = parent[i]
            return i

        def union(i: int, j: int) -> None:
            parent[find(i)] = find(j)

        # O(n²) pairwise check — fast enough for typical floor plans (< 2000 segs)
        for i in range(n):
            for j in range(i + 1, n):
                if self._are_collinear(segs[i], segs[j]):
                    union(i, j)

        # Group by root
        groups: Dict[int, List[int]] = defaultdict(list)
        for i in range(n):
            groups[find(i)].append(i)

        result: List[Segment] = []
        for indices in groups.values():
            group_segs = [segs[i] for i in indices]
            merged = self._merge_segment_group(group_segs)
            if merged:
                result.append(merged)

        return result

    def _are_collinear(self, s1: Segment, s2: Segment) -> bool:
        """
        Two segments are collinear when:
        (a) their angles differ by less than 5° and
        (b) the perpendicular distance from each endpoint of s2 to the line
            carrying s1 is within collinear_distance_threshold.
        """
        x1, y1, x2, y2 = s1
        x3, y3, x4, y4 = s2

        a1 = math.degrees(math.atan2(y2 - y1, x2 - x1)) % 180
        a2 = math.degrees(math.atan2(y4 - y3, x4 - x3)) % 180

        def circ_diff(a: float, b: float) -> float:
            d = abs(a - b) % 180
            return min(d, 180 - d)

        if circ_diff(a1, a2) > 5.0:
            return False

        thr = self.cfg.collinear_distance_threshold
        return (
            self._pt_to_line_dist((x3, y3), (x1, y1), (x2, y2)) <= thr
            and self._pt_to_line_dist((x4, y4), (x1, y1), (x2, y2)) <= thr
        )

    def _merge_segment_group(self, group: List[Segment]) -> Optional[Segment]:
        """
        Merge a list of collinear segments by projection onto the primary axis.

        Uses the first segment's direction as the reference axis.
        Projects every endpoint onto that axis (t = dot(p - p0, dir)).
        The merged segment spans [t_min, t_max].
        """
        if not group:
            return None

        x1, y1, x2, y2 = group[0]
        dx, dy = x2 - x1, y2 - y1
        length = math.hypot(dx, dy)
        if length < 1e-6:
            return None

        ux, uy = dx / length, dy / length   # unit direction

        projections: List[float] = []
        for seg in group:
            for px, py in [(seg[0], seg[1]), (seg[2], seg[3])]:
                t = (px - x1) * ux + (py - y1) * uy
                projections.append(t)

        t_min, t_max = min(projections), max(projections)

        return (
            x1 + t_min * ux,
            y1 + t_min * uy,
            x1 + t_max * ux,
            y1 + t_max * uy,
        )

    # ════════════════════════════════════════════════════════════════════
    # STEP 5 — merge_parallel
    # ════════════════════════════════════════════════════════════════════

    def _merge_parallel(self, segs: List[Segment]) -> List[Segment]:
        """
        Merge close parallel segments that represent two sides of a thick wall.

        Many floor plan images draw walls with a double line.  After collinear
        merging we still have pairs of parallel segments close together.
        This step replaces each such pair with a single centerline.

        Condition for merging:
        - Angle difference < 5°
        - Perpendicular distance < parallel_merge_distance
        - They overlap when projected onto their shared direction axis
        """
        result = list(segs)
        changed = True

        while changed:
            changed = False
            used: Set[int] = set()
            new_result: List[Segment] = []

            for i in range(len(result)):
                if i in used:
                    continue
                merged_into = -1
                for j in range(i + 1, len(result)):
                    if j in used:
                        continue
                    if self._should_merge_parallel(result[i], result[j]):
                        centerline = self._parallel_centerline(result[i], result[j])
                        new_result.append(centerline)
                        used.add(i)
                        used.add(j)
                        merged_into = j
                        changed = True
                        break

                if merged_into < 0:
                    new_result.append(result[i])
                    used.add(i)

            result = new_result

        return result

    def _should_merge_parallel(self, s1: Segment, s2: Segment) -> bool:
        x1, y1, x2, y2 = s1
        x3, y3, x4, y4 = s2

        a1 = math.degrees(math.atan2(y2 - y1, x2 - x1)) % 180
        a2 = math.degrees(math.atan2(y4 - y3, x4 - x3)) % 180

        def circ_diff(a: float, b: float) -> float:
            d = abs(a - b) % 180
            return min(d, 180 - d)

        if circ_diff(a1, a2) > 5.0:
            return False

        d1 = self._pt_to_line_dist((x3, y3), (x1, y1), (x2, y2))
        d2 = self._pt_to_line_dist((x4, y4), (x1, y1), (x2, y2))
        avg_d = (d1 + d2) / 2
        if avg_d > self.cfg.parallel_merge_distance:
            return False

        return self._overlap_on_axis(s1, s2)

    def _overlap_on_axis(self, s1: Segment, s2: Segment) -> bool:
        """Check whether two segments overlap when projected onto s1's axis."""
        x1, y1, x2, y2 = s1
        x3, y3, x4, y4 = s2
        dx, dy = x2 - x1, y2 - y1
        ln = math.hypot(dx, dy)
        if ln < 1e-6:
            return False
        ux, uy = dx / ln, dy / ln

        # s1 spans [0, ln]; project s2 endpoints
        t_a = (x3 - x1) * ux + (y3 - y1) * uy
        t_b = (x4 - x1) * ux + (y4 - y1) * uy
        if t_a > t_b:
            t_a, t_b = t_b, t_a

        # Overlap iff intervals [0, ln] and [t_a, t_b] intersect
        return t_a < ln and t_b > 0

    def _parallel_centerline(self, s1: Segment, s2: Segment) -> Segment:
        """
        Create the centerline between two parallel segments.

        Pairs the endpoints by positional proximity and averages each pair.
        """
        x1, y1, x2, y2 = s1
        x3, y3, x4, y4 = s2

        # Pair start-to-start, end-to-end (or swapped if closer)
        d_same  = math.hypot(x1 - x3, y1 - y3) + math.hypot(x2 - x4, y2 - y4)
        d_cross = math.hypot(x1 - x4, y1 - y4) + math.hypot(x2 - x3, y2 - y3)

        if d_cross < d_same:
            x3, y3, x4, y4 = x4, y4, x3, y3

        return (
            (x1 + x3) / 2,
            (y1 + y3) / 2,
            (x2 + x4) / 2,
            (y2 + y4) / 2,
        )

    # ════════════════════════════════════════════════════════════════════
    # STEP 6 — snap_to_grid
    # ════════════════════════════════════════════════════════════════════

    def _snap_to_grid(self, segs: List[Segment]) -> List[Segment]:
        """
        Quantise all coordinates to GRID_SIZE.

        This is the simplest way to guarantee that walls which share an
        endpoint end up sharing *exactly* the same float coordinates.
        Without this, floating-point accumulated errors cause tiny gaps at
        wall junctions, which break the polygon/room detection.
        """
        g = self.cfg.grid_size

        def snap(v: float) -> float:
            return round(v / g) * g

        return [(snap(x1), snap(y1), snap(x2), snap(y2)) for x1, y1, x2, y2 in segs]

    # ════════════════════════════════════════════════════════════════════
    # STEP 7 — compute_intersections
    # ════════════════════════════════════════════════════════════════════

    def _compute_intersections(self, segs: List[Segment]) -> List[Point]:
        """
        Return every point where two segments cross or touch.

        Uses the standard parametric formula:
            P(t) = A + t*(B-A),   Q(s) = C + s*(D-C)
        Solve for t and s; intersection exists when 0 ≤ t ≤ 1 and 0 ≤ s ≤ 1.

        A small epsilon lets us pick up endpoint touches (T-junctions),
        which are just as important as X-junctions for room detection.
        """
        pts: List[Point] = []
        eps = 1e-9

        for i in range(len(segs)):
            for j in range(i + 1, len(segs)):
                pt = self._seg_intersect(segs[i], segs[j], eps)
                if pt is not None:
                    pts.append(pt)

        return pts

    def _seg_intersect(
        self, s1: Segment, s2: Segment, eps: float = 1e-9
    ) -> Optional[Point]:
        x1, y1, x2, y2 = s1
        x3, y3, x4, y4 = s2

        dx1, dy1 = x2 - x1, y2 - y1
        dx2, dy2 = x4 - x3, y4 - y3

        denom = dx1 * dy2 - dy1 * dx2
        if abs(denom) < 1e-10:      # parallel (or coincident) — handled elsewhere
            return None

        t = ((x3 - x1) * dy2 - (y3 - y1) * dx2) / denom
        s = ((x3 - x1) * dy1 - (y3 - y1) * dx1) / denom

        if -eps <= t <= 1 + eps and -eps <= s <= 1 + eps:
            return (x1 + t * dx1, y1 + t * dy1)

        return None

    # ════════════════════════════════════════════════════════════════════
    # STEP 8 — snap_intersections
    # ════════════════════════════════════════════════════════════════════

    def _snap_intersections(self, pts: List[Point]) -> List[Point]:
        """
        Cluster nearby intersection points and collapse each cluster to its
        centroid.

        Uses a simple union-find on all pairs within
        intersection_snap_distance.  This prevents the graph from having
        near-duplicate nodes at every wall junction.
        """
        if not pts:
            return []

        n = len(pts)
        parent = list(range(n))

        def find(i: int) -> int:
            while parent[i] != i:
                parent[i] = parent[parent[i]]
                i = parent[i]
            return i

        thr = self.cfg.intersection_snap_distance
        for i in range(n):
            for j in range(i + 1, n):
                dx = pts[i][0] - pts[j][0]
                dy = pts[i][1] - pts[j][1]
                if dx * dx + dy * dy <= thr * thr:
                    ri, rj = find(i), find(j)
                    if ri != rj:
                        parent[ri] = rj

        # Average each cluster
        groups: Dict[int, List[int]] = defaultdict(list)
        for i in range(n):
            groups[find(i)].append(i)

        result: List[Point] = []
        for indices in groups.values():
            cx = sum(pts[i][0] for i in indices) / len(indices)
            cy = sum(pts[i][1] for i in indices) / len(indices)
            result.append((cx, cy))

        return result

    # ════════════════════════════════════════════════════════════════════
    # STEP 9 — split_at_intersections
    # ════════════════════════════════════════════════════════════════════

    def _split_at_intersections(
        self, segs: List[Segment], intersections: List[Point]
    ) -> List[Segment]:
        """
        Cut each segment at every intersection point that lies on it.

        This creates proper T-junctions and X-junctions in the graph,
        ensuring every connected component is topologically correct.

        The segments are split by:
        1. Finding all intersection points on each segment.
        2. Sorting those points by distance from the segment's start.
        3. Emitting one sub-segment per consecutive pair.
        """
        result: List[Segment] = []

        for seg in segs:
            x1, y1, x2, y2 = seg
            dx, dy = x2 - x1, y2 - y1
            length = math.hypot(dx, dy)
            if length < 1e-6:
                continue

            ux, uy = dx / length, dy / length

            # Collect split points that lie on this segment
            split_pts: List[Tuple[float, Point]] = []   # (t, point)
            split_pts.append((0.0, (x1, y1)))
            split_pts.append((length, (x2, y2)))

            for pt in intersections:
                px, py = pt
                # Bounding-box quick reject
                if not (
                    min(x1, x2) - self.cfg.grid_size <= px <= max(x1, x2) + self.cfg.grid_size
                    and min(y1, y2) - self.cfg.grid_size <= py <= max(y1, y2) + self.cfg.grid_size
                ):
                    continue
                # Perpendicular distance
                if self._pt_to_line_dist(pt, (x1, y1), (x2, y2)) > self.cfg.grid_size:
                    continue
                t = (px - x1) * ux + (py - y1) * uy
                if self.cfg.grid_size / 2 < t < length - self.cfg.grid_size / 2:
                    split_pts.append((t, pt))

            # Sort by t, deduplicate
            split_pts.sort(key=lambda x: x[0])

            deduped: List[Point] = [split_pts[0][1]]
            for _, pt in split_pts[1:]:
                prev = deduped[-1]
                if math.hypot(pt[0] - prev[0], pt[1] - prev[1]) > self.cfg.grid_size / 2:
                    deduped.append(pt)

            # Emit sub-segments
            for k in range(len(deduped) - 1):
                p1, p2 = deduped[k], deduped[k + 1]
                if math.hypot(p2[0] - p1[0], p2[1] - p1[1]) >= self.cfg.min_segment_length:
                    result.append((p1[0], p1[1], p2[0], p2[1]))

        return result

    # ════════════════════════════════════════════════════════════════════
    # STEP 10 — build_graph
    # ════════════════════════════════════════════════════════════════════

    def _build_graph(
        self, segs: List[Segment]
    ) -> Dict[Point, List[Point]]:
        """
        Build an undirected adjacency list.

        Nodes  : unique endpoint coordinates (snapped to grid).
        Edges  : one edge per segment.

        The graph is used only for room detection; the actual wall data is
        kept in the segments list.
        """
        g: float = self.cfg.grid_size

        def snap_pt(p: Point) -> Point:
            return (round(p[0] / g) * g, round(p[1] / g) * g)

        graph: Dict[Point, List[Point]] = defaultdict(list)
        for x1, y1, x2, y2 in segs:
            p1 = snap_pt((x1, y1))
            p2 = snap_pt((x2, y2))
            if p1 != p2:
                if p2 not in graph[p1]:
                    graph[p1].append(p2)
                if p1 not in graph[p2]:
                    graph[p2].append(p1)

        return dict(graph)

    # ════════════════════════════════════════════════════════════════════
    # STEP 11 — detect_rooms
    # ════════════════════════════════════════════════════════════════════

    def _detect_rooms(self, segs: List[Segment]) -> List[List[Point]]:
        """
        Extract closed room polygons from the wall segments.

        Strategy
        --------
        If Shapely is available, use `shapely.ops.polygonize` — this is the
        canonical, robust solution for extracting faces from a planar graph.

        Fallback: a DFS-based minimum-cycle finder that works for simple
        rectilinear floor plans (no guarantee of correctness for complex
        topology).

        Both paths filter out polygons whose area is below min_room_area_px2.
        """
        if HAS_SHAPELY:
            return self._detect_rooms_shapely(segs)
        else:
            graph = self._build_graph(segs)
            return self._detect_rooms_dfs(graph)

    # ── Shapely path ─────────────────────────────────────────────────────

    def _detect_rooms_shapely(self, segs: List[Segment]) -> List[List[Point]]:
        """
        Use Shapely's polygonize on the union of all wall lines.

        `unary_union` node-splits the lines at every intersection, then
        `polygonize` extracts all minimal faces.  This is exactly what we want.
        """
        lines = [
            LineString([(x1, y1), (x2, y2)])
            for x1, y1, x2, y2 in segs
            if math.hypot(x2 - x1, y2 - y1) > 0
        ]
        if not lines:
            return []

        merged = unary_union(lines)
        polygons = list(polygonize(merged))

        rooms: List[List[Point]] = []
        for poly in polygons:
            area = poly.area
            if area < self.cfg.min_room_area_px2:
                continue
            coords = list(poly.exterior.coords)[:-1]   # drop repeated last point
            rooms.append([(float(x), float(y)) for x, y in coords])

        return rooms

    # ── DFS fallback ─────────────────────────────────────────────────────

    def _detect_rooms_dfs(
        self, graph: Dict[Point, List[Point]]
    ) -> List[List[Point]]:
        """
        Minimum-cycle finder for simple rectilinear floor plans.

        For each directed edge (u, v), we follow the "always turn right"
        heuristic (minimum clockwise turn) to trace the face to the right
        of that edge.  This is the planar graph face extraction algorithm.
        """
        rooms: List[List[Point]] = []
        visited_directed: Set[Tuple[Point, Point]] = set()

        def right_turn_next(prev: Point, cur: Point) -> Optional[Point]:
            """Select the neighbour that makes the sharpest right (clockwise) turn."""
            nbrs = graph.get(cur, [])
            if not nbrs:
                return None

            in_dx = cur[0] - prev[0]
            in_dy = cur[1] - prev[1]
            in_angle = math.atan2(in_dy, in_dx)

            best: Optional[Point] = None
            best_turn: float = float("inf")

            for nb in nbrs:
                if nb == prev and len(nbrs) > 1:
                    continue
                out_dx = nb[0] - cur[0]
                out_dy = nb[1] - cur[1]
                out_angle = math.atan2(out_dy, out_dx)

                # Clockwise turn = negative angle in right-hand coords
                turn = out_angle - in_angle
                # Normalise to (−π, π]
                while turn > math.pi:   turn -= 2 * math.pi
                while turn <= -math.pi: turn += 2 * math.pi

                # We want the *most clockwise* turn (most negative)
                if turn < best_turn:
                    best_turn = turn
                    best = nb

            return best

        for start, nbrs in graph.items():
            for nxt in nbrs:
                if (start, nxt) in visited_directed:
                    continue

                poly = [start, nxt]
                prev, cur = start, nxt
                found = False

                for _ in range(len(graph) + 2):
                    nb = right_turn_next(prev, cur)
                    if nb is None:
                        break
                    if nb == start:
                        found = True
                        break
                    if nb in poly:
                        break
                    poly.append(nb)
                    prev, cur = cur, nb

                if found and len(poly) >= 3:
                    area = abs(self._shoelace(poly))
                    if area >= self.cfg.min_room_area_px2:
                        # Mark all directed edges of this face as visited
                        for k in range(len(poly)):
                            p1 = poly[k]
                            p2 = poly[(k + 1) % len(poly)]
                            visited_directed.add((p1, p2))
                        # Only keep counter-clockwise (positive area) faces
                        if self._shoelace(poly) > 0:
                            poly.reverse()
                        rooms.append(poly)

        # De-duplicate by frozen vertex set
        unique: List[List[Point]] = []
        seen: Set[FrozenSet] = set()
        for poly in rooms:
            key = frozenset(poly)
            if key not in seen:
                seen.add(key)
                unique.append(poly)

        return unique

    # ════════════════════════════════════════════════════════════════════
    # HELPERS
    # ════════════════════════════════════════════════════════════════════

    @staticmethod
    def _length(seg: Segment) -> float:
        x1, y1, x2, y2 = seg
        return math.hypot(x2 - x1, y2 - y1)

    @staticmethod
    def _pt_to_line_dist(pt: Point, a: Point, b: Point) -> float:
        """
        Perpendicular distance from *pt* to the infinite line through *a* and *b*.
        Formula: |cross(b-a, a-pt)| / |b-a|
        """
        px, py = pt
        ax, ay = a
        bx, by = b
        dx, dy = bx - ax, by - ay
        length = math.hypot(dx, dy)
        if length < 1e-10:
            return math.hypot(px - ax, py - ay)
        return abs(dy * px - dx * py + bx * ay - by * ax) / length

    @staticmethod
    def _shoelace(poly: List[Point]) -> float:
        """Signed area via the shoelace formula. Positive = CCW."""
        n = len(poly)
        area = 0.0
        for i in range(n):
            j = (i + 1) % n
            area += poly[i][0] * poly[j][1]
            area -= poly[j][0] * poly[i][1]
        return area / 2.0
