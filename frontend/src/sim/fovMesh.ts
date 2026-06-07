/**
 * fovMesh.ts — Three.js geometry for the inline simulation (viewer-only).
 *
 * This is the ONE place that bridges plan-space (coverage.ts) into the viewer's
 * world frame, which uses `z = +planY` (see Room3DViewer). The single sign
 * decision lives in buildFovConeMesh's group position/rotation — coverage
 * correctness is owned by coverage.ts (plan-space) and never depends on this.
 */

import * as THREE from 'three';
import type { RoomConfig } from '../types';
import {
  RADAR_PROFILE, strongestCoverage, boundaryOf,
  anatomicalPointsLocal, type SimRadar, type CoverageLevel, type Posture,
  type Occluder,
} from './coverage';

export const COVERAGE_HEX: Record<CoverageLevel, number> = {
  full: 0x22c55e, partial: 0xeab308, none: 0xef4444,
};

/**
 * Translucent elliptical FOV cone, positioned + oriented for the radar.
 * Group at (x, mountHeight, +y); yaw aligns local +Z to the facing normal;
 * child tilt-pivot pitches it down by -tiltDeg.
 */
export function buildFovConeMesh(radar: SimRadar): THREE.Group {
  const mh = radar.mountHeight ?? RADAR_PROFILE.mountHeight;
  const range = radar.maxRange ?? RADAR_PROFILE.maxRangeM;
  const aMaj = range * Math.tan(RADAR_PROFILE.halfPowerHalfAngleHDeg * Math.PI / 180);
  const bMin = range * Math.tan(RADAR_PROFILE.halfPowerHalfAngleVDeg * Math.PI / 180);

  const group = new THREE.Group();
  group.position.set(radar.x, mh, radar.y);                  // z = +planY
  group.rotation.y = Math.atan2(radar.facingX, radar.facingY);

  const pivot = new THREE.Group();
  pivot.rotation.x = -(radar.tiltDeg || 0) * Math.PI / 180;  // -(-45°) = +45° → down-forward
  group.add(pivot);

  // Cone: apex at origin, elliptical cap at local +Z = range.
  const SEG = 48;
  const verts: number[] = [0, 0, 0]; // apex = index 0
  for (let i = 0; i <= SEG; i++) {
    const a = (i / SEG) * Math.PI * 2;
    verts.push(aMaj * Math.cos(a), bMin * Math.sin(a), range);
  }
  const idx: number[] = [];
  for (let i = 1; i <= SEG; i++) { idx.push(0, i, i + 1); }     // side fan
  const capCenter = verts.length / 3;
  verts.push(0, 0, range);
  for (let i = 1; i <= SEG; i++) { idx.push(capCenter, i + 1, i); } // cap fan

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();

  const mat = new THREE.MeshBasicMaterial({
    color: 0x8b5cf6, transparent: true, opacity: 0.13,
    side: THREE.DoubleSide, depthWrite: false,
  });
  pivot.add(new THREE.Mesh(geo, mat));

  // Boresight line for orientation clarity.
  const lineMat = new THREE.LineBasicMaterial({ color: 0xc4b5fd, transparent: true, opacity: 0.6 });
  const lineGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, range),
  ]);
  pivot.add(new THREE.Line(lineGeo, lineMat));

  return group;
}

/**
 * Floor coverage heatmap — per-cell signal strength (0..1) over all radars,
 * coloured on a red→amber→green gradient (weak→strong). Respects occlusion when
 * `occluders` is supplied. Computed once per radar/room/param change.
 */
export function buildFloorFootprint(
  radars: SimRadar[], room: RoomConfig, ceilingHeight = 3.0, occluders?: Occluder[],
): THREE.Object3D | null {
  if (!radars.length) return null;
  const bnd = boundaryOf(room);
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const [x, y] of bnd) { minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y); }

  const occ = occluders && occluders.length ? { occluders } : undefined;
  const STEP = 0.08;
  const h = STEP / 2;
  const verts: number[] = [];
  const colors: number[] = [];
  const idx: number[] = [];
  const c = new THREE.Color();
  let n = 0;
  for (let x = minX + h; x < maxX; x += STEP) {
    for (let y = minY + h; y < maxY; y += STEP) {
      const s = strongestCoverage({ x, y, z: 0 }, radars, room, ceilingHeight, occ);
      if (s <= 0) continue;
      // hue 0 (red) → 0.33 (green) as strength rises.
      c.setHSL(s * 0.33, 0.85, 0.5);
      const yq = 0.006;
      verts.push(x - h, yq, y - h,  x + h, yq, y - h,  x + h, yq, y + h,  x - h, yq, y + h);
      for (let k = 0; k < 4; k++) colors.push(c.r, c.g, c.b);
      idx.push(n, n + 1, n + 2,  n, n + 2, n + 3);
      n += 4;
    }
  }
  if (!n) return null;
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  const mat = new THREE.MeshBasicMaterial({
    vertexColors: true, transparent: true, opacity: 0.5, side: THREE.DoubleSide, depthWrite: false,
  });
  return new THREE.Mesh(geo, mat);
}

/** Simple humanoid for an avatar, with a coverage badge sphere above the head. */
export function buildAvatarMesh(posture: Posture, level: CoverageLevel): THREE.Group {
  const g = new THREE.Group();
  const skin = new THREE.MeshStandardMaterial({ color: 0xffccaa, roughness: 0.7 });
  const clothes = new THREE.MeshStandardMaterial({ color: 0x4a78b0, roughness: 0.8 });

  const part = (geo: THREE.BufferGeometry, mat: THREE.Material, x: number, y: number, z: number) => {
    const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = true; g.add(m); return m;
  };

  if (posture === 'stand') {
    part(new THREE.SphereGeometry(0.12, 12, 12), skin, 0, 1.40 + 0.12, 0);
    part(new THREE.CylinderGeometry(0.15, 0.16, 0.60, 12), clothes, 0, 1.10, 0);
    part(new THREE.CylinderGeometry(0.06, 0.06, 0.80, 8), clothes, -0.08, 0.40, 0);
    part(new THREE.CylinderGeometry(0.06, 0.06, 0.80, 8), clothes, 0.08, 0.40, 0);
  } else if (posture === 'sit') {
    part(new THREE.SphereGeometry(0.12, 12, 12), skin, 0, 1.05 + 0.12, -0.20);
    part(new THREE.CylinderGeometry(0.15, 0.16, 0.60, 12), clothes, 0, 0.75, -0.20);
    // thighs forward, shins down
    part(new THREE.BoxGeometry(0.30, 0.12, 0.40), clothes, 0, 0.45, 0.05);
    part(new THREE.CylinderGeometry(0.06, 0.06, 0.45, 8), clothes, -0.08, 0.22, 0.30);
    part(new THREE.CylinderGeometry(0.06, 0.06, 0.45, 8), clothes, 0.08, 0.22, 0.30);
  } else { // lie — horizontal along +Z
    const lieY = 0.15;
    part(new THREE.SphereGeometry(0.12, 12, 12), skin, 0, lieY, 0.70);
    part(new THREE.CylinderGeometry(0.15, 0.15, 0.85, 12).rotateX(Math.PI / 2), clothes, 0, lieY, 0.18);
    part(new THREE.CylinderGeometry(0.06, 0.06, 0.80, 8).rotateX(Math.PI / 2), clothes, 0, lieY, -0.42);
  }

  // Coverage badge above head.
  const badgePos = posture === 'lie' ? [0, 0.15 + 0.30, 0.70] : posture === 'sit' ? [0, 1.05 + 0.12 * 2 + 0.12, -0.20] : [0, 1.40 + 0.12 * 2 + 0.12, 0];
  const badge = new THREE.Mesh(
    new THREE.SphereGeometry(0.07, 12, 12),
    new THREE.MeshBasicMaterial({ color: COVERAGE_HEX[level] }),
  );
  badge.position.set(badgePos[0], badgePos[1], badgePos[2]);
  badge.userData.kind = 'coverage-badge';
  g.add(badge);

  return g;
}

/** Clickable suggestion marker (puck) on the floor, coloured by score. */
export function buildSuggestionMarker(score: number, index: number): THREE.Mesh {
  const color = score >= 1 ? 0x22c55e : score >= 0.5 ? 0xeab308 : 0xf97316;
  const m = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.12, 0.04, 20),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.85 }),
  );
  m.position.y = 0.04;
  m.userData.kind = 'suggestion';
  m.userData.index = index;
  return m;
}
