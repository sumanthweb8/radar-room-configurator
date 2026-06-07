/**
 * geom.ts — Pure plan-space polygon geometry for manual room splitting.
 *
 * Plan space: [x, y] metres, Y-down (same frame as RoomObject / coverage.ts).
 * No Three.js, no React. Reuses `signedArea` from coverage.ts for winding.
 */

import { signedArea } from './coverage';

export type Pt = [number, number];

export interface SplitResult {
  polyA: Pt[];
  polyB: Pt[];
}

const DEFAULT_SNAP = 0.05;

function dist(a: Pt, b: Pt): number {
  return Math.hypot(a[0] - b[0], a[1] - b[1]);
}

/** Project p onto segment a→b, returning the clamped foot point + its distance. */
function projectToSegment(p: Pt, a: Pt, b: Pt): { t: number; point: Pt; dist: number } {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const len2 = dx * dx + dy * dy;
  let t = len2 < 1e-12 ? 0 : ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / len2;
  t = Math.max(0, Math.min(1, t));
  const point: Pt = [a[0] + t * dx, a[1] + t * dy];
  return { t, point, dist: dist(p, point) };
}

/** Nearest boundary edge to p. */
function nearestEdge(p: Pt, ring: Pt[]): { edgeIndex: number; t: number; point: Pt; dist: number } {
  let best = { edgeIndex: -1, t: 0, point: p, dist: Infinity };
  const n = ring.length;
  for (let i = 0; i < n; i++) {
    const r = projectToSegment(p, ring[i], ring[(i + 1) % n]);
    if (r.dist < best.dist) best = { edgeIndex: i, ...r };
  }
  return best;
}

/** Remove consecutive duplicate vertices (within eps) and any closing duplicate. */
function dedupeRing(poly: Pt[], eps = 1e-7): Pt[] {
  const out: Pt[] = [];
  for (const p of poly) if (!out.length || dist(out[out.length - 1], p) > eps) out.push(p);
  while (out.length > 1 && dist(out[0], out[out.length - 1]) <= eps) out.pop();
  return out;
}

/** Axis-aligned bounding box of a polygon. */
export function polygonBBox(poly: Pt[]): {
  minX: number; minY: number; maxX: number; maxY: number; width: number; height: number;
} {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const [x, y] of poly) {
    if (x < minX) minX = x; if (x > maxX) maxX = x;
    if (y < minY) minY = y; if (y > maxY) maxY = y;
  }
  return { minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY };
}

/** Translate a polygon so its bbox min corner sits at (0,0). */
export function toLocalFrame(poly: Pt[]): { local: Pt[]; offset: Pt } {
  const b = polygonBBox(poly);
  const offset: Pt = [b.minX, b.minY];
  return { local: poly.map(([x, y]) => [x - b.minX, y - b.minY] as Pt), offset };
}

/**
 * Split a simple polygon by an open polyline whose first and last vertices lie on
 * (or snap within `snapTol` of) the boundary. Returns the two resulting rings, or
 * null if the cut is invalid (endpoints off-boundary, coincident, or degenerate).
 *
 * Poly A = boundary arc(start→end) + reversed interior(end→start)
 * Poly B = boundary arc(end→start) + interior(start→end)
 * Both inherit the parent's winding.
 *
 * Assumes the polyline stays inside the polygon and touches the boundary only at
 * its endpoints (interior containment is not validated).
 */
export function splitPolygonByPolyline(
  boundary: Pt[], polyline: Pt[], opts?: { snapTol?: number },
): SplitResult | null {
  const snapTol = opts?.snapTol ?? DEFAULT_SNAP;
  const ring = dedupeRing(boundary);
  const poly = dedupeRing(polyline.slice());
  if (ring.length < 3 || poly.length < 2) return null;

  // 1. Snap polyline endpoints to the boundary.
  const startHit = nearestEdge(poly[0], ring);
  const endHit = nearestEdge(poly[poly.length - 1], ring);
  if (startHit.dist > snapTol || endHit.dist > snapTol) return null;
  const start = startHit.point, end = endHit.point;
  if (dist(start, end) < snapTol) return null;

  // 2. Insert start/end onto their edges (higher edge/t first so indices stay valid).
  const inserts = [
    { edge: startHit.edgeIndex, t: startHit.t, point: start },
    { edge: endHit.edgeIndex, t: endHit.t, point: end },
  ].sort((a, b) => b.edge - a.edge || b.t - a.t);
  const aug = ring.slice();
  for (const ins of inserts) {
    // splice index edge+1 == ring length means "append before the wrap" (valid).
    if (ins.t > 1e-6 && ins.t < 1 - 1e-6) aug.splice(ins.edge + 1, 0, ins.point);
  }

  const iStart = aug.findIndex(p => dist(p, start) < 1e-6);
  const iEnd = aug.findIndex(p => dist(p, end) < 1e-6);
  if (iStart < 0 || iEnd < 0 || iStart === iEnd) return null;

  // 3. The two boundary arcs between the split points (forward, wrapping).
  const arc = (from: number, to: number): Pt[] => {
    const out: Pt[] = [];
    for (let i = from; ; i = (i + 1) % aug.length) {
      out.push(aug[i]);
      if (i === to) break;
    }
    return out;
  };
  const arcS2E = arc(iStart, iEnd);
  const arcE2S = arc(iEnd, iStart);

  // 4. Interior chain (with snapped endpoints), minus its endpoints.
  const interior = poly.slice();
  interior[0] = start;
  interior[interior.length - 1] = end;
  const interiorMid = interior.slice(1, -1);

  const polyA = dedupeRing([...arcS2E, ...interiorMid.slice().reverse()]);
  const polyB = dedupeRing([...arcE2S, ...interiorMid]);
  if (polyA.length < 3 || polyB.length < 3) return null;

  // 5. Make both children match the parent's winding.
  const parentSign = Math.sign(signedArea(ring) || 1);
  const fix = (p: Pt[]) => (Math.sign(signedArea(p) || 1) === parentSign ? p : p.slice().reverse());
  return { polyA: fix(polyA), polyB: fix(polyB) };
}
