/**
 * coverage.ts — Pure radar-coverage simulation math (no Three.js, no React).
 *
 * Everything here works in PLAN space: x,y are metres in the same Y-down frame
 * as RoomObject / getRadarFacing, and `height`/`z` is metres above the floor.
 * There is deliberately NO Three.js Z anywhere — the 3D viewer applies its own
 * `z = +planY` mapping when it builds meshes (fovMesh.ts). Keeping the math
 * plan-only means the viewer's coordinate convention can never introduce a
 * coverage bug. Ported faithfully from the old standalone simulator.html.
 */

import type { RoomObject, RoomConfig } from '../types';

// Radar spec — ported verbatim from simulator.html RADAR_PROFILE.
export const RADAR_PROFILE = {
  mountHeight: 2.40,            // metres above floor
  mountOffsetFromWall: 0.060,   // stand-off from wall face
  depth: 0.02,                  // device depth (apex offset)
  halfPowerHalfAngleHDeg: 54,   // → 108° azimuth FOV
  halfPowerHalfAngleVDeg: 22,   // → 44° elevation FOV
  maxRangeM: 4.0,
  minRangeM: 0.3,
  defaultTiltDeg: -45,
} as const;

export interface SimRadar {
  x: number;          // plan centre (metres, Y-down)
  y: number;
  facingX: number;    // inward unit normal (from getRadarFacing)
  facingY: number;
  tiltDeg: number;    // default -45 (pitched down)
  mountHeight?: number;
  maxRange?: number;  // override RADAR_PROFILE.maxRangeM (UI slider); tilt/height stay fixed
}

export interface CoverageTarget {
  id?: string;           // source RoomObject id (for self-occlusion skip)
  type: string;          // object type (bed, door, chair, …)
  label: string;
  points: { x: number; y: number; z: number }[]; // z = test height (metres)
}

/** Representative test height (metres) per object type used for coverage. */
export const TARGET_HEIGHT: Record<string, number> = {
  bed: 0.55, door: 0.10, window: 1.0, person: 1.0,
  sofa: 0.5, chair: 0.5, table: 0.5, desk: 0.5,
  cabinet: 0.5, wardrobe: 0.5, custom: 0.5,
};

export type CoverageLevel = 'full' | 'partial' | 'none';
export type Posture = 'stand' | 'sit' | 'lie';

export interface SimAvatar {
  id: string;
  x: number;
  y: number;
  posture: Posture;
  yawDeg: number;
}

/**
 * Core FOV test, plan-space. Returns true if (planX, planY, height) lies inside
 * the radar's elliptical cone (108°×44°, up to maxRange). Algebraically
 * identical to simulator.html's fovCoversPoint, but re-derived so the boresight
 * points along the plan-space facing normal — no world-Z sign games.
 */
export function fovCoversPoint(
  planX: number, planY: number, height: number, radar: SimRadar,
): boolean {
  const mh = radar.mountHeight ?? RADAR_PROFILE.mountHeight;
  const fx = radar.facingX, fy = radar.facingY;

  const relX = planX - radar.x;
  const relY = planY - radar.y;

  // Project onto the device's forward (facing) and lateral (right) axes.
  const along   = relX * fx + relY * fy;        // +forward distance
  const lateral = relX * (-fy) + relY * fx;     // +right (azimuth numerator)
  const dz = height - mh;                        // vertical offset from apex

  // Inverse tilt about the lateral axis (matches simulator's inverse-tilt).
  const tiltRad = -(radar.tiltDeg || 0) * Math.PI / 180;
  const cosT = Math.cos(tiltRad), sinT = Math.sin(tiltRad);
  const py =  dz * cosT + along * sinT;          // elevation numerator
  let   pz = -dz * sinT + along * cosT;          // range (forward)
  pz -= RADAR_PROFILE.depth / 2;

  const maxRange = radar.maxRange ?? RADAR_PROFILE.maxRangeM;
  if (pz <= 0 || pz > maxRange) return false;

  const hDeg = Math.atan2(lateral, pz) * 180 / Math.PI;
  const vDeg = Math.atan2(py, pz) * 180 / Math.PI;
  const u = hDeg / RADAR_PROFILE.halfPowerHalfAngleHDeg;
  const v = vDeg / RADAR_PROFILE.halfPowerHalfAngleVDeg;
  return (u * u + v * v) <= 1;
}

/**
 * Graded coverage strength in [0,1] (0 = not covered) for one radar, cone-only
 * (no room clip / occlusion — those are applied by strongestCoverage). Strength
 * combines how centred the point is in the beam (1 − (u²+v²)) with a linear
 * range falloff (1 − pz/maxRange). Used for the gradient heatmap.
 */
export function coverageStrength(
  planX: number, planY: number, height: number, radar: SimRadar,
): number {
  const mh = radar.mountHeight ?? RADAR_PROFILE.mountHeight;
  const fx = radar.facingX, fy = radar.facingY;
  const relX = planX - radar.x;
  const relY = planY - radar.y;
  const along   = relX * fx + relY * fy;
  const lateral = relX * (-fy) + relY * fx;
  const dz = height - mh;

  const tiltRad = -(radar.tiltDeg || 0) * Math.PI / 180;
  const cosT = Math.cos(tiltRad), sinT = Math.sin(tiltRad);
  const py =  dz * cosT + along * sinT;
  let   pz = -dz * sinT + along * cosT;
  pz -= RADAR_PROFILE.depth / 2;

  const maxRange = radar.maxRange ?? RADAR_PROFILE.maxRangeM;
  if (pz <= 0 || pz > maxRange) return 0;

  const hDeg = Math.atan2(lateral, pz) * 180 / Math.PI;
  const vDeg = Math.atan2(py, pz) * 180 / Math.PI;
  const u = hDeg / RADAR_PROFILE.halfPowerHalfAngleHDeg;
  const v = vDeg / RADAR_PROFILE.halfPowerHalfAngleVDeg;
  const ell = u * u + v * v;
  if (ell > 1) return 0;
  const angular = 1 - ell;             // 1 at boresight → 0 at cone edge
  const ranging = 1 - pz / maxRange;   // 1 near device → 0 at max range
  return Math.max(0, Math.min(1, angular * ranging));
}

/** Ray-casting parity point-in-polygon (plan-space). Ported verbatim. */
export function pointInPolygonPlan(
  x: number, y: number, polygon: [number, number][],
): boolean {
  let inside = false;
  const n = polygon.length;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const xi = polygon[i][0], yi = polygon[i][1];
    const xj = polygon[j][0], yj = polygon[j][1];
    if (((yi > y) !== (yj > y)) &&
        (x < (xj - xi) * (y - yi) / (yj - yi + 1e-12) + xi)) {
      inside = !inside;
    }
  }
  return inside;
}

/** Room boundary as a plan polygon (explicit polygon, or rectangle corners). */
export function boundaryOf(room: RoomConfig): [number, number][] {
  if (room.polygon && room.polygon.length >= 3) return room.polygon;
  return [[0, 0], [room.width, 0], [room.width, room.height], [0, room.height]];
}

/** Shoelace signed area; sign indicates winding (>0 = CW in Y-down plan space). */
export function signedArea(poly: [number, number][]): number {
  let a = 0;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    a += poly[j][0] * poly[i][1] - poly[i][0] * poly[j][1];
  }
  return a / 2;
}

// ── Occlusion / line-of-sight ───────────────────────────────────────────────

/**
 * Height (metres) a furniture type rises from the floor for line-of-sight
 * blocking. 0 = transparent (never blocks). A radar can't see a point if a taller
 * piece of furniture stands between the device apex and that point.
 */
export const OCCLUDER_HEIGHT: Record<string, number> = {
  wardrobe: 2.0, cabinet: 1.2, bed: 0.6, sofa: 0.9,
  table: 0.75, desk: 0.75, chair: 0.9, person: 1.7,
  door: 0, window: 0, custom: 1.0,
};

/** A vertical box occluder in plan space: rotated rectangle footprint, floor→topZ. */
export interface Occluder {
  id: string;               // source RoomObject.id — to skip a target's own object
  cx: number; cy: number;   // footprint centre (plan)
  hw: number; hh: number;   // half-extents in the box's local (unrotated) frame
  cos: number; sin: number; // precomputed rotation (ry = -rotation·π/180)
  topZ: number;             // occluder height above floor
}

export interface OcclusionCtx {
  occluders: Occluder[];
  skipId?: string;          // target's own object id (don't self-occlude)
}

/** Build occluders from RoomObjects. Skips radars and zero-height (transparent) types. */
export function buildOccluders(objects: RoomObject[]): Occluder[] {
  const out: Occluder[] = [];
  for (const o of objects) {
    if (o.type === 'radar') continue;
    const topZ = OCCLUDER_HEIGHT[o.type] ?? 1.0;
    if (topZ <= 0) continue;
    const ry = -o.rotation * Math.PI / 180;   // same sign convention as avatarCoverage / meshes
    out.push({
      id: o.id,
      cx: o.x + o.width / 2, cy: o.y + o.height / 2,
      hw: o.width / 2, hh: o.height / 2,
      cos: Math.cos(ry), sin: Math.sin(ry),
      topZ,
    });
  }
  return out;
}

/**
 * True if the 3D segment apex→point passes through the solid box (extruded from
 * z=0 to box.topZ over its rotated rectangle footprint). Liang–Barsky clips the
 * segment to the footprint in the box's local frame, then checks the ray's z over
 * that interval dips into the solid band [0, topZ].
 */
function segmentBlockedByBox(
  ax: number, ay: number, az: number,
  px: number, py: number, pz: number,
  box: Occluder,
): boolean {
  const rax = ax - box.cx, ray = ay - box.cy;
  const rpx = px - box.cx, rpy = py - box.cy;
  const lax =  rax * box.cos + ray * box.sin;
  const lay = -rax * box.sin + ray * box.cos;
  const lpx =  rpx * box.cos + rpy * box.sin;
  const lpy = -rpx * box.sin + rpy * box.cos;
  const dx = lpx - lax, dy = lpy - lay;

  let t0 = 0, t1 = 1;
  const clip = (p: number, q: number): boolean => {
    if (Math.abs(p) < 1e-12) return q >= 0;          // parallel: inside iff q>=0
    const r = q / p;
    if (p < 0) { if (r > t1) return false; if (r > t0) t0 = r; }
    else       { if (r < t0) return false; if (r < t1) t1 = r; }
    return true;
  };
  if (!clip(-dx, lax + box.hw)) return false;        // x >= -hw
  if (!clip( dx, box.hw - lax)) return false;        // x <=  hw
  if (!clip(-dy, lay + box.hh)) return false;        // y >= -hh
  if (!clip( dy, box.hh - lay)) return false;        // y <=  hh
  if (t1 <= t0) return false;                        // never inside footprint

  const dz = pz - az;
  const z0 = az + dz * t0, z1 = az + dz * t1;
  const zLo = Math.min(z0, z1), zHi = Math.max(z0, z1);
  const EPS = 1e-6;
  return zHi >= -EPS && zLo <= box.topZ + EPS;       // overlaps the solid band
}

/** True if the point is visible from the radar apex (no occluder blocks the ray). */
export function visibleFromRadar(
  apexX: number, apexY: number, apexZ: number,
  px: number, py: number, pz: number, occ: OcclusionCtx,
): boolean {
  for (const b of occ.occluders) {
    if (b.id === occ.skipId) continue;
    if (segmentBlockedByBox(apexX, apexY, apexZ, px, py, pz, b)) return false;
  }
  return true;
}

/** FOV test additionally clipped to the room polygon + floor/ceiling (+ occlusion). */
export function fovCoversPointClipped(
  planX: number, planY: number, height: number,
  radar: SimRadar, room: RoomConfig, ceilingHeight = 3.0,
  occ?: OcclusionCtx,
): boolean {
  if (height < 0 || height > ceilingHeight) return false;
  if (!pointInPolygonPlan(planX, planY, boundaryOf(room))) return false;
  if (!fovCoversPoint(planX, planY, height, radar)) return false;
  if (occ && occ.occluders.length) {
    const apexZ = radar.mountHeight ?? RADAR_PROFILE.mountHeight;
    if (!visibleFromRadar(radar.x, radar.y, apexZ, planX, planY, height, occ)) return false;
  }
  return true;
}

/** Strongest coverage strength in [0,1] over all radars (room-clipped + occluded). */
export function strongestCoverage(
  p: { x: number; y: number; z: number }, radars: SimRadar[], room: RoomConfig,
  ceilingHeight = 3.0, occ?: OcclusionCtx,
): number {
  if (p.z < 0 || p.z > ceilingHeight) return 0;
  if (!pointInPolygonPlan(p.x, p.y, boundaryOf(room))) return 0;
  let best = 0;
  for (const r of radars) {
    const s = coverageStrength(p.x, p.y, p.z, r);
    if (s <= best) continue;
    if (occ && occ.occluders.length) {
      const apexZ = r.mountHeight ?? RADAR_PROFILE.mountHeight;
      if (!visibleFromRadar(r.x, r.y, apexZ, p.x, p.y, p.z, occ)) continue;
    }
    best = s;
  }
  return best;
}

/** True if any radar covers the point. */
function anyRadarCovers(
  p: { x: number; y: number; z: number }, radars: SimRadar[], room: RoomConfig,
  occ?: OcclusionCtx, ceilingHeight = 3.0,
): boolean {
  for (const r of radars) {
    if (fovCoversPointClipped(p.x, p.y, p.z, r, room, ceilingHeight, occ)) return true;
  }
  return false;
}

/** A single object → coverage target (centre + corners/ends at its test height). */
function targetFromObject(o: RoomObject): CoverageTarget {
  const z = TARGET_HEIGHT[o.type] ?? 0.5;
  if (o.type === 'door') {
    // Door: centre + the two ends along its longer dimension (floor level).
    const horizontal = o.width >= o.height;
    const a = horizontal ? { x: o.x, y: o.y + o.height / 2 } : { x: o.x + o.width / 2, y: o.y };
    const b = horizontal ? { x: o.x + o.width, y: o.y + o.height / 2 } : { x: o.x + o.width / 2, y: o.y + o.height };
    return {
      id: o.id,
      type: 'door', label: o.label || 'Door',
      points: [
        { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, z },
        { x: a.x, y: a.y, z }, { x: b.x, y: b.y, z },
      ],
    };
  }
  // Everything else: centre + 4 footprint corners.
  const x0 = o.x, y0 = o.y, x1 = o.x + o.width, y1 = o.y + o.height;
  return {
    id: o.id,
    type: o.type, label: o.label || o.type,
    points: [
      { x: (x0 + x1) / 2, y: (y0 + y1) / 2, z },
      { x: x0, y: y0, z }, { x: x1, y: y0, z },
      { x: x0, y: y1, z }, { x: x1, y: y1, z },
    ],
  };
}

/**
 * Coverage targets from the app's RoomObject[].
 * - With `opts.ids`: one target per selected (non-radar) object — used by Suggest.
 * - Without: defaults to beds + doors — used by the coverage readout.
 */
export function buildTargets(
  objects: RoomObject[], opts?: { ids?: Set<string> },
): CoverageTarget[] {
  const ids = opts?.ids;
  const picked = ids
    ? objects.filter(o => o.type !== 'radar' && ids.has(o.id))
    : objects.filter(o => o.type === 'bed' || o.type === 'door');
  return picked.map(targetFromObject);
}

/** full = every point covered by ≥1 radar; none = no points; else partial. */
export function targetCoverage(
  target: CoverageTarget, radars: SimRadar[], room: RoomConfig,
  occluders?: Occluder[], ceilingHeight = 3.0,
): CoverageLevel {
  if (radars.length === 0) return 'none';
  const occ: OcclusionCtx | undefined = occluders ? { occluders, skipId: target.id } : undefined;
  let covered = 0;
  for (const p of target.points) {
    if (anyRadarCovers(p, radars, room, occ, ceilingHeight)) covered++;
  }
  if (covered === 0) return 'none';
  if (covered === target.points.length) return 'full';
  return 'partial';
}

// ── Avatars ───────────────────────────────────────────────────────────────

const AVATAR_BODY = {
  headRadius: 0.12, torsoRadius: 0.15, torsoHeight: 0.60,
  armRadius: 0.04, legHeight: 0.80,
};

/**
 * 7 body-local sample points [x (lateral), y (up), z (forward)].
 * Order: head, neck, L-shoulder, R-shoulder, hips, L-knee, R-knee.
 * Ported from simulator.html getAnatomicalPointsLocal.
 */
export function anatomicalPointsLocal(
  posture: Posture, sitStyle: 'spread' | 'bent' = 'bent',
): [number, number, number][] {
  const b = AVATAR_BODY;
  const shldX = b.torsoRadius + b.armRadius; // 0.19
  if (posture === 'stand') {
    const headY = b.legHeight + b.torsoHeight + b.headRadius; // 1.52
    const neckY = b.legHeight + b.torsoHeight;                // 1.40
    const hipY = b.legHeight;                                 // 0.80
    const kneeY = b.legHeight / 2;                            // 0.40
    return [
      [0, headY, 0], [0, neckY, 0],
      [-shldX, neckY, 0], [shldX, neckY, 0],
      [0, hipY, 0], [-0.08, kneeY, 0], [0.08, kneeY, 0],
    ];
  }
  if (posture === 'sit') {
    const seatY = 0.45;
    const torsoZ = sitStyle === 'spread' ? -0.40 : -0.20;
    const hipZ = sitStyle === 'spread' ? -0.25 : -0.05;
    const kneeZ = sitStyle === 'spread' ? 0.15 : 0.35;
    const neckY = seatY + b.torsoHeight;
    const headY = neckY + b.headRadius;
    return [
      [0, headY, torsoZ], [0, neckY, torsoZ],
      [-shldX, neckY, torsoZ], [shldX, neckY, torsoZ],
      [0, seatY, hipZ], [-0.08, seatY, kneeZ], [0.08, seatY, kneeZ],
    ];
  }
  // lie — body horizontal along +Z at lieY = torsoRadius.
  const lieY = b.torsoRadius;
  return [
    [0, lieY, 0.70], [0, lieY, 0.55],
    [-shldX, lieY, 0.28], [shldX, lieY, 0.28],
    [0, lieY, -0.02], [-0.08, lieY, -0.42], [0.08, lieY, -0.42],
  ];
}

/**
 * Avatar coverage: full = all 7 points covered, none = 0, else partial.
 * The body-local (lx,lz) plane is rotated by the avatar yaw into plan space.
 * Uses ry = -yawDeg·π/180 so it matches the 3D mesh's `group.rotation.y`
 * (the viewer's z=+planY frame) — keep this rule in sync with fovMesh.ts.
 */
export function avatarCoverage(
  avatar: SimAvatar, radars: SimRadar[], room: RoomConfig,
  occluders?: Occluder[], ceilingHeight = 3.0,
): CoverageLevel {
  if (radars.length === 0) return 'none';
  const occ: OcclusionCtx | undefined = occluders ? { occluders } : undefined;
  const pts = anatomicalPointsLocal(avatar.posture);
  const ry = -avatar.yawDeg * Math.PI / 180;
  const cos = Math.cos(ry), sin = Math.sin(ry);
  let covered = 0;
  for (const [lx, ly, lz] of pts) {
    const planX = avatar.x + (lx * cos + lz * sin);
    const planY = avatar.y + (-lx * sin + lz * cos);
    if (anyRadarCovers({ x: planX, y: planY, z: ly }, radars, room, occ, ceilingHeight)) covered++;
  }
  if (covered === 0) return 'none';
  if (covered === pts.length) return 'full';
  return 'partial';
}

// ── Suggest positions ───────────────────────────────────────────────────────

export interface Suggestion {
  x: number; y: number;           // plan position of the radar
  facingX: number; facingY: number;
  score: number;                  // covered / total targets (0..1)
  coveredTargets: number;
  totalTargets: number;
}

/** Relative importance of each target type when ranking radar placements. */
export const TARGET_WEIGHT: Record<string, number> = {
  bed: 3, person: 2, door: 1,
};

/** A radar candidate covers a target if it covers at least half the target's points. */
function candidateCoversTarget(
  radar: SimRadar, t: CoverageTarget, room: RoomConfig, occ?: OcclusionCtx,
): boolean {
  let c = 0;
  const need = Math.ceil(t.points.length / 2);
  for (const p of t.points) {
    if (fovCoversPointClipped(p.x, p.y, p.z, radar, room, 3.0, occ)) {
      if (++c >= need) return true;
    }
  }
  return false;
}

/** Wall + corner candidate radars (inward-facing) around the room boundary. */
function suggestionCandidates(room: RoomConfig): SimRadar[] {
  const boundary = boundaryOf(room);
  const N = boundary.length;
  const STEP = 0.15;
  const offset = RADAR_PROFILE.mountOffsetFromWall + RADAR_PROFILE.depth / 2;
  // (-dy, dx) is the inward normal for a CW polygon (shoelace > 0); flip for CCW
  // (e.g. imported DXF rooms) so virtual radars face into the room.
  const sign = signedArea(boundary) > 0 ? 1 : -1;
  const cands: SimRadar[] = [];
  const edgeNormals: [number, number][] = [];

  for (let ei = 0; ei < N; ei++) {
    const a = boundary[ei], b = boundary[(ei + 1) % N];
    const dx = b[0] - a[0], dy = b[1] - a[1];
    const L = Math.hypot(dx, dy);
    if (L < 0.3) { edgeNormals.push([0, 0]); continue; }
    const nx = sign * (-dy / L), ny = sign * (dx / L);
    edgeNormals.push([nx, ny]);
    const steps = Math.floor(L / STEP);
    for (let s = 1; s < steps; s++) {
      const u = s / steps;
      cands.push({
        x: a[0] + u * dx + nx * offset, y: a[1] + u * dy + ny * offset,
        facingX: nx, facingY: ny, tiltDeg: RADAR_PROFILE.defaultTiltDeg,
      });
    }
  }

  // Corner mounts: at each vertex, face the average of its two edge normals.
  for (let vi = 0; vi < N; vi++) {
    const [pnx, pny] = edgeNormals[(vi - 1 + N) % N];
    const [nnx, nny] = edgeNormals[vi];
    let fx = pnx + nnx, fy = pny + nny;
    const m = Math.hypot(fx, fy);
    if (m < 1e-6) continue;
    fx /= m; fy /= m;
    const v = boundary[vi];
    cands.push({
      x: v[0] + fx * offset, y: v[1] + fy * offset,
      facingX: fx, facingY: fy, tiltDeg: RADAR_PROFILE.defaultTiltDeg,
    });
  }
  return cands;
}

/**
 * Greedy multi-radar set-cover: repeatedly place the candidate that covers the
 * most *remaining weighted* targets (beds/persons rank above doors), removing
 * covered targets each round, until `count` radars are placed or nothing more can
 * be covered. Scans wall positions (0.15 m) plus corner mounts, and respects
 * occlusion when `occluders` is supplied.
 */
export function computeSuggestedPositions(
  room: RoomConfig, targets: CoverageTarget[], count = 8, occluders?: Occluder[],
): Suggestion[] {
  if (!targets.length || count < 1) return [];
  const occ: OcclusionCtx | undefined = occluders ? { occluders } : undefined;
  const candidates = suggestionCandidates(room);

  // Precompute, per candidate, which targets it covers (occlusion skips the
  // target's own object so a bed's radar isn't blocked by the bed).
  const covers: boolean[][] = candidates.map(radar =>
    targets.map(t => candidateCoversTarget(
      radar, t, room, occ ? { occluders: occ.occluders, skipId: t.id } : undefined)));
  const weight = (t: CoverageTarget) => TARGET_WEIGHT[t.type] ?? 1;

  const remaining = new Set(targets.map((_, i) => i));
  const chosen: Suggestion[] = [];

  while (chosen.length < count && remaining.size > 0) {
    let bestIdx = -1, bestW = 0, bestN = 0;
    for (let ci = 0; ci < candidates.length; ci++) {
      const r = candidates[ci];
      if (chosen.some(s => Math.hypot(r.x - s.x, r.y - s.y) < 0.5)) continue; // dedupe
      let w = 0, n = 0;
      for (const ti of remaining) if (covers[ci][ti]) { w += weight(targets[ti]); n++; }
      if (w > bestW || (w === bestW && n > bestN)) { bestW = w; bestN = n; bestIdx = ci; }
    }
    if (bestIdx < 0 || bestN === 0) break;

    const r = candidates[bestIdx];
    for (const ti of [...remaining]) if (covers[bestIdx][ti]) remaining.delete(ti);
    chosen.push({
      x: r.x, y: r.y, facingX: r.facingX, facingY: r.facingY,
      score: bestN / targets.length, coveredTargets: bestN, totalTargets: targets.length,
    });
  }
  return chosen;
}

/** Targets not fully covered by the given radars — for residual-gap reporting. */
export function uncoveredTargets(
  targets: CoverageTarget[], radars: SimRadar[], room: RoomConfig,
  occluders?: Occluder[], ceilingHeight = 3.0,
): CoverageTarget[] {
  return targets.filter(t => targetCoverage(t, radars, room, occluders, ceilingHeight) !== 'full');
}
