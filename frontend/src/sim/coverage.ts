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
}

export interface CoverageTarget {
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

  if (pz <= 0 || pz > RADAR_PROFILE.maxRangeM) return false;

  const hDeg = Math.atan2(lateral, pz) * 180 / Math.PI;
  const vDeg = Math.atan2(py, pz) * 180 / Math.PI;
  const u = hDeg / RADAR_PROFILE.halfPowerHalfAngleHDeg;
  const v = vDeg / RADAR_PROFILE.halfPowerHalfAngleVDeg;
  return (u * u + v * v) <= 1;
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

/** FOV test additionally clipped to the room polygon + floor/ceiling. */
export function fovCoversPointClipped(
  planX: number, planY: number, height: number,
  radar: SimRadar, room: RoomConfig, ceilingHeight = 3.0,
): boolean {
  if (height < 0 || height > ceilingHeight) return false;
  if (!pointInPolygonPlan(planX, planY, boundaryOf(room))) return false;
  return fovCoversPoint(planX, planY, height, radar);
}

/** True if any radar covers the point. */
function anyRadarCovers(
  p: { x: number; y: number; z: number }, radars: SimRadar[], room: RoomConfig,
): boolean {
  for (const r of radars) {
    if (fovCoversPointClipped(p.x, p.y, p.z, r, room)) return true;
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
): CoverageLevel {
  if (radars.length === 0) return 'none';
  let covered = 0;
  for (const p of target.points) {
    if (anyRadarCovers(p, radars, room)) covered++;
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
): CoverageLevel {
  if (radars.length === 0) return 'none';
  const pts = anatomicalPointsLocal(avatar.posture);
  const ry = -avatar.yawDeg * Math.PI / 180;
  const cos = Math.cos(ry), sin = Math.sin(ry);
  let covered = 0;
  for (const [lx, ly, lz] of pts) {
    const planX = avatar.x + (lx * cos + lz * sin);
    const planY = avatar.y + (-lx * sin + lz * cos);
    if (anyRadarCovers({ x: planX, y: planY, z: ly }, radars, room)) covered++;
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

/**
 * Scan every wall edge at 0.15 m, build a virtual inward-facing radar at each,
 * score by how many targets it covers, dedupe within 0.5 m, and return the best
 * `count` (top-N independent positions).
 */
export function computeSuggestedPositions(
  room: RoomConfig, targets: CoverageTarget[], count = 8,
): Suggestion[] {
  if (!targets.length || count < 1) return [];
  const boundary = boundaryOf(room);
  const N = boundary.length;
  const STEP = 0.15;
  const offset = RADAR_PROFILE.mountOffsetFromWall + RADAR_PROFILE.depth / 2;
  // (-dy, dx) is the inward normal only for a CW polygon (shoelace > 0). Flip it
  // for CCW polygons (e.g. imported DXF rooms) so virtual radars face into the
  // room instead of out of it — otherwise they cover nothing and we suggest none.
  const sign = signedArea(boundary) > 0 ? 1 : -1;

  type Cand = Suggestion & { pointScore: number };
  const candidates: Cand[] = [];

  for (let ei = 0; ei < N; ei++) {
    const a = boundary[ei], b = boundary[(ei + 1) % N];
    const dx = b[0] - a[0], dy = b[1] - a[1];
    const L = Math.hypot(dx, dy);
    if (L < 0.3) continue;
    const nx = sign * (-dy / L), ny = sign * (dx / L); // inward edge normal
    const steps = Math.floor(L / STEP);

    for (let s = 1; s < steps; s++) {
      const u = s / steps;
      const wallX = a[0] + u * dx, wallY = a[1] + u * dy;
      const radar: SimRadar = {
        x: wallX + nx * offset, y: wallY + ny * offset,
        facingX: nx, facingY: ny, tiltDeg: RADAR_PROFILE.defaultTiltDeg,
      };

      let coveredTargets = 0, totalPoints = 0, coveredPoints = 0;
      for (const t of targets) {
        let hit = false;
        for (const p of t.points) {
          totalPoints++;
          if (fovCoversPointClipped(p.x, p.y, p.z, radar, room)) { coveredPoints++; hit = true; }
        }
        if (hit) coveredTargets++;
      }

      if (coveredTargets > 0) {
        candidates.push({
          x: radar.x, y: radar.y, facingX: nx, facingY: ny,
          score: coveredTargets / targets.length,
          coveredTargets, totalTargets: targets.length,
          pointScore: totalPoints ? coveredPoints / totalPoints : 0,
        });
      }
    }
  }

  candidates.sort((p, q) => (q.score - p.score) || (q.pointScore - p.pointScore));

  const filtered: Cand[] = [];
  for (const c of candidates) {
    if (filtered.some(f => Math.hypot(c.x - f.x, c.y - f.y) < 0.5)) continue;
    filtered.push(c);
    if (filtered.length >= count) break;
  }
  return filtered.map(({ pointScore, ...s }) => s);
}
