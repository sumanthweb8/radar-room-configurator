import { describe, it, expect } from 'vitest';
import {
  RADAR_PROFILE, fovCoversPoint, pointInPolygonPlan, boundaryOf,
  buildTargets, targetCoverage, avatarCoverage, computeSuggestedPositions,
  type SimRadar, type SimAvatar,
} from '../sim/coverage';
import type { RoomObject, RoomConfig } from '../types';

const room: RoomConfig = { name: 'R', width: 4, height: 4 };

function obj(p: Partial<RoomObject>): RoomObject {
  return {
    id: 'x', type: 'bed', label: 'o', x: 0, y: 0, width: 1, height: 1,
    color: '#fff', rotation: 0, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0,
    ...p,
  };
}

// Radar on the top wall (y=0) facing inward (down, +y), tilted -45°, at 2.40m.
const topRadar: SimRadar = { x: 2, y: 0, facingX: 0, facingY: 1, tiltDeg: -45 };

describe('fovCoversPoint', () => {
  it('covers a floor point ~2m in front', () => {
    expect(fovCoversPoint(2, 2, 0, topRadar)).toBe(true);
  });
  it('does not cover a point behind the radar', () => {
    expect(fovCoversPoint(2, -1, 0, topRadar)).toBe(false);
  });
  it('does not cover beyond max range', () => {
    expect(fovCoversPoint(2, 6, 0, topRadar)).toBe(false); // 6m > 4m range
  });
  it('does not cover a point outside the 108° azimuth', () => {
    expect(fovCoversPoint(7, 2, 0, topRadar)).toBe(false); // ~58° lateral
  });
});

describe('coordinate-sign regression (the key risk)', () => {
  // For each facing, points "in front" (along +facing) are covered, "behind" not.
  const cases: { name: string; r: SimRadar; front: [number, number]; behind: [number, number] }[] = [
    { name: 'faces +y (down)', r: { x: 2, y: 0, facingX: 0, facingY: 1, tiltDeg: -45 }, front: [2, 2], behind: [2, -1] },
    { name: 'faces -y (up)',   r: { x: 2, y: 4, facingX: 0, facingY: -1, tiltDeg: -45 }, front: [2, 2], behind: [2, 5] },
    { name: 'faces +x (right)',r: { x: 0, y: 2, facingX: 1, facingY: 0, tiltDeg: -45 }, front: [2, 2], behind: [-1, 2] },
    { name: 'faces -x (left)', r: { x: 4, y: 2, facingX: -1, facingY: 0, tiltDeg: -45 }, front: [2, 2], behind: [5, 2] },
  ];
  for (const c of cases) {
    it(c.name, () => {
      expect(fovCoversPoint(c.front[0], c.front[1], 0, c.r)).toBe(true);
      expect(fovCoversPoint(c.behind[0], c.behind[1], 0, c.r)).toBe(false);
    });
  }
});

describe('buildTargets', () => {
  it('beds → 5 points at z=0.55', () => {
    const t = buildTargets([obj({ type: 'bed', x: 1, y: 1, width: 1.4, height: 2 })]);
    expect(t).toHaveLength(1);
    expect(t[0].type).toBe('bed');
    expect(t[0].points).toHaveLength(5);
    expect(t[0].points.every(p => p.z === 0.55)).toBe(true);
  });
  it('doors → 3 points at z=0.1', () => {
    const t = buildTargets([obj({ type: 'door', x: 0, y: 1, width: 0.1, height: 0.9 })]);
    expect(t[0].type).toBe('door');
    expect(t[0].points).toHaveLength(3);
    expect(t[0].points.every(p => p.z === 0.1)).toBe(true);
  });
  it('ignores non bed/door objects by default', () => {
    expect(buildTargets([obj({ type: 'table' })])).toHaveLength(0);
  });
  it('with ids → selects any object type (chair) at its test height', () => {
    const chair = obj({ id: 'c1', type: 'chair', x: 1, y: 1, width: 0.5, height: 0.5 });
    const t = buildTargets([chair, obj({ id: 'b1', type: 'bed' })], { ids: new Set(['c1']) });
    expect(t).toHaveLength(1);
    expect(t[0].type).toBe('chair');
    expect(t[0].points.every(p => p.z === 0.5)).toBe(true);
  });
  it('with ids → excludes radars even if selected', () => {
    const r = obj({ id: 'r1', type: 'radar' });
    expect(buildTargets([r], { ids: new Set(['r1']) })).toHaveLength(0);
  });
});

describe('targetCoverage', () => {
  const bed = buildTargets([obj({ type: 'bed', x: 1.5, y: 1.5, width: 1, height: 1 })])[0];
  it('none with no radars', () => {
    expect(targetCoverage(bed, [], room)).toBe('none');
  });
  it('full when a well-placed radar sees the whole bed', () => {
    // Radar centred on top wall looking down should cover a central bed.
    expect(targetCoverage(bed, [topRadar], room)).toBe('full');
  });
  it('none when the radar faces away', () => {
    const away: SimRadar = { x: 2, y: 0, facingX: 0, facingY: -1, tiltDeg: -45 };
    expect(targetCoverage(bed, [away], room)).toBe('none');
  });
});

describe('avatarCoverage', () => {
  const center: SimAvatar = { id: 'a', x: 2, y: 2, posture: 'stand', yawDeg: 0 };
  it('none with no radars', () => {
    expect(avatarCoverage(center, [], room)).toBe('none');
  });
  it('returns a level for a covered standing avatar', () => {
    const level = avatarCoverage(center, [topRadar], room);
    expect(['full', 'partial']).toContain(level);
  });
  it('none when far out of range', () => {
    const far: SimRadar = { x: 0, y: 0, facingX: 1, facingY: 0, tiltDeg: -45 };
    const avatarFar: SimAvatar = { id: 'b', x: 3.9, y: 3.9, posture: 'stand', yawDeg: 0 };
    expect(avatarCoverage(avatarFar, [far], room)).toBe('none');
  });
});

describe('computeSuggestedPositions', () => {
  const targets = buildTargets([
    obj({ type: 'bed', x: 1.3, y: 1.3, width: 1.4, height: 1.4 }),
    obj({ type: 'door', x: 0, y: 1.8, width: 0.1, height: 0.9 }),
  ]);
  const sugg = computeSuggestedPositions(room, targets);
  it('returns at most 8 suggestions', () => {
    expect(sugg.length).toBeGreaterThan(0);
    expect(sugg.length).toBeLessThanOrEqual(8);
  });
  it('respects the requested count', () => {
    const two = computeSuggestedPositions(room, targets, 2);
    expect(two.length).toBeLessThanOrEqual(2);
    expect(computeSuggestedPositions(room, targets, 1).length).toBeLessThanOrEqual(1);
    expect(computeSuggestedPositions(room, targets, 0)).toHaveLength(0);
  });
  it('is sorted by score descending', () => {
    for (let i = 1; i < sugg.length; i++) {
      expect(sugg[i - 1].score).toBeGreaterThanOrEqual(sugg[i].score);
    }
  });
  it('dedupes suggestions ≥0.5m apart', () => {
    for (let i = 0; i < sugg.length; i++) {
      for (let j = i + 1; j < sugg.length; j++) {
        expect(Math.hypot(sugg[i].x - sugg[j].x, sugg[i].y - sugg[j].y)).toBeGreaterThanOrEqual(0.5);
      }
    }
  });
  it('places radars near a wall (within the mount offset)', () => {
    const off = RADAR_PROFILE.mountOffsetFromWall + RADAR_PROFILE.depth / 2 + 1e-6;
    for (const s of sugg) {
      const nearWall = Math.min(s.x, s.y, room.width - s.x, room.height - s.y);
      expect(nearWall).toBeLessThanOrEqual(off + 1e-6);
    }
  });
  it('returns empty with no targets', () => {
    expect(computeSuggestedPositions(room, [])).toHaveLength(0);
  });

  it('suggests positions for a CCW polygon room (winding regression)', () => {
    // CCW square (like imported DXF rooms) — must still face radars inward.
    const ccwRoom: RoomConfig = { name: 'L', width: 4, height: 4, polygon: [[0, 0], [0, 4], [4, 4], [4, 0]] };
    const bed = buildTargets([obj({ type: 'bed', x: 1.3, y: 1.3, width: 1.4, height: 1.4 })]);
    const sugg = computeSuggestedPositions(ccwRoom, bed);
    expect(sugg.length).toBeGreaterThan(0);
  });
});

describe('pointInPolygonPlan', () => {
  it('rectangle inside/outside', () => {
    const rect = boundaryOf(room);
    expect(pointInPolygonPlan(2, 2, rect)).toBe(true);
    expect(pointInPolygonPlan(-1, 2, rect)).toBe(false);
  });
  it('L-shape notch', () => {
    const L: [number, number][] = [[0, 0], [4, 0], [4, 2], [2, 2], [2, 4], [0, 4]];
    expect(pointInPolygonPlan(1, 1, L)).toBe(true);   // in the stem
    expect(pointInPolygonPlan(3, 3, L)).toBe(false);  // in the notch
  });
});
