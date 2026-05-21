/**
 * LOCKED FORMAT TEST — DO NOT CHANGE THESE EXPECTED VALUES.
 *
 * These tests verify the exact coordinate math used to generate config.json.
 * The firmware reads this format directly — any change to the coordinate
 * system or field names will break production deployments.
 *
 * Reference example (from real working config):
 *   bed:   top_left [0.21, 3.9],  bottom_right [1.31, 1.74]
 *   door1: top_left [-2.08, 3.06], bottom_right [-1.58, 2.27]
 *   door2: top_left [-1.97, 1.66], bottom_right [-1.47, 0.86]
 */

import { describe, it, expect } from 'vitest';
import type { RoomObject, RoomConfig } from '../types';
import { getRadarFacing } from '../types';

// ── Inline buildConfig matching App.tsx (with rotated coordinates) ─────────────
function buildConfig(objects: RoomObject[], room: RoomConfig) {
  const radar   = objects.find(o => o.type === 'radar');
  const originX = radar ? radar.x + radar.width  / 2 : 0;
  const originY = radar ? radar.y + radar.height / 2 : 0;

  const { nx: fwd_x, ny: fwd_y } = radar ? getRadarFacing(radar, room) : { nx: 0, ny: -1 };
  const right_x = -fwd_y, right_y = fwd_x;

  return objects.map(obj => {
    const corners = [
      [obj.x,             obj.y],
      [obj.x + obj.width, obj.y],
      [obj.x,             obj.y + obj.height],
      [obj.x + obj.width, obj.y + obj.height],
    ];
    const transformed = corners.map(([rx, ry]) => {
      const dx = rx - originX, dy = ry - originY;
      return [+(dx * right_x + dy * right_y).toFixed(3), +(dx * fwd_x + dy * fwd_y).toFixed(3)];
    });
    const xs = transformed.map(c => c[0]), ys = transformed.map(c => c[1]);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);

    return {
      name:         obj.label.toLowerCase().replace(/\s+/g, '_'),
      top_left:     [minX, maxY],
      top_right:    [maxX, maxY],
      bottom_left:  [minX, minY],
      bottom_right: [maxX, minY],
      margin_top:    obj.marginTop,
      margin_bottom: obj.marginBottom,
      margin_left:   obj.marginLeft,
      margin_right:  obj.marginRight,
    };
  });
}

function makeObj(overrides: Partial<RoomObject>): RoomObject {
  return {
    id: 'x', type: 'custom', label: 'Item',
    x: 0, y: 0, width: 1, height: 1, color: '#fff', rotation: 0,
    marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0,
    ...overrides,
  };
}

// ── Radar placed at the reference position ─────────────────────────────────────
// Working back from the example:
//   bed left = 0.21 → obj.x - originX = 0.21 → obj.x = originX + 0.21
//   bed top  = 3.9  → originY - obj.y = 3.9  → obj.y = originY - 3.9
//
//   door1 left = -2.08 → obj.x = originX - 2.08
//   door1 top  = 3.06  → obj.y = originY - 3.06
//
// Choose a concrete radar canvas position, derive object positions from it.
// Radar canvas centre: (2.3, 4.1)   →  originX=2.3, originY=4.1
const RADAR = makeObj({ type: 'radar', x: 2.26, y: 4.06, width: 0.08, height: 0.08 });
// radar centre = (2.26 + 0.04, 4.06 + 0.04) = (2.30, 4.10)

const BED = makeObj({
  type: 'bed', label: 'Bed',
  x: 2.51,   // originX + 0.21 = 2.30 + 0.21
  y: 0.20,   // originY - 3.90 = 4.10 - 3.90
  width:  1.10,  // right - left = 1.31 - 0.21
  height: 2.16,  // top - bottom = 3.90 - 1.74
  marginTop: 0, marginBottom: 0.5, marginLeft: 0.5, marginRight: 0,
});

const DOOR1 = makeObj({
  type: 'door', label: 'Door1',
  x: 0.22,   // originX - 2.08 = 2.30 - 2.08
  y: 1.04,   // originY - 3.06 = 4.10 - 3.06
  width:  0.50,
  height: 0.79, // 3.06 - 2.27
  marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0.5,
});

const DOOR2 = makeObj({
  type: 'door', label: 'Door2',
  x: 0.33,   // originX - 1.97 = 2.30 - 1.97
  y: 2.44,   // originY - 1.66 = 4.10 - 1.66
  width:  0.50,
  height: 0.80,
  marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0.5,
});

const objects = [RADAR, BED, DOOR1, DOOR2];
// 5m × 5m room — radar at y=4.1 is nearest bottom wall → faces upward (ny=-1)
const ROOM: RoomConfig = { name: 'Test Room', width: 5, height: 5 };

describe('Config format — coordinate system (LOCKED)', () => {
  const result = buildConfig(objects, ROOM);
  // radar itself is included in output — find non-radar entries
  const bed   = result.find(o => o.name === 'bed')!;
  const door1 = result.find(o => o.name === 'door1')!;
  const door2 = result.find(o => o.name === 'door2')!;

  it('bed top_left matches reference [0.21, 3.9]', () => {
    expect(bed.top_left[0]).toBeCloseTo(0.21, 2);
    expect(bed.top_left[1]).toBeCloseTo(3.9,  2);
  });

  it('bed top_right matches reference [1.31, 3.9]', () => {
    expect(bed.top_right[0]).toBeCloseTo(1.31, 2);
    expect(bed.top_right[1]).toBeCloseTo(3.9,  2);
  });

  it('bed bottom_left matches reference [0.21, 1.74]', () => {
    expect(bed.bottom_left[0]).toBeCloseTo(0.21, 2);
    expect(bed.bottom_left[1]).toBeCloseTo(1.74, 2);
  });

  it('bed bottom_right matches reference [1.31, 1.74]', () => {
    expect(bed.bottom_right[0]).toBeCloseTo(1.31, 2);
    expect(bed.bottom_right[1]).toBeCloseTo(1.74, 2);
  });

  it('door1 top_left matches reference [-2.08, 3.06]', () => {
    expect(door1.top_left[0]).toBeCloseTo(-2.08, 2);
    expect(door1.top_left[1]).toBeCloseTo( 3.06, 2);
  });

  it('door1 bottom_right matches reference [-1.58, 2.27]', () => {
    expect(door1.bottom_right[0]).toBeCloseTo(-1.58, 2);
    expect(door1.bottom_right[1]).toBeCloseTo( 2.27, 2);
  });

  it('door2 top_left matches reference [-1.97, 1.66]', () => {
    expect(door2.top_left[0]).toBeCloseTo(-1.97, 2);
    expect(door2.top_left[1]).toBeCloseTo( 1.66, 2);
  });

  it('door2 bottom_right matches reference [-1.47, 0.86]', () => {
    expect(door2.bottom_right[0]).toBeCloseTo(-1.47, 2);
    expect(door2.bottom_right[1]).toBeCloseTo( 0.86, 2);
  });

  it('top y is always greater than bottom y (y increases upward)', () => {
    for (const obj of result) {
      expect(obj.top_left[1]).toBeGreaterThanOrEqual(obj.bottom_left[1]);
      expect(obj.top_right[1]).toBeGreaterThanOrEqual(obj.bottom_right[1]);
    }
  });

  it('left x is always less than right x', () => {
    for (const obj of result) {
      expect(obj.top_left[0]).toBeLessThanOrEqual(obj.top_right[0]);
      expect(obj.bottom_left[0]).toBeLessThanOrEqual(obj.bottom_right[0]);
    }
  });

  it('bed margins are correct', () => {
    expect(bed.margin_top).toBe(0);
    expect(bed.margin_bottom).toBe(0.5);
    expect(bed.margin_left).toBe(0.5);
    expect(bed.margin_right).toBe(0);
  });

  it('door1 margin_right is 0.5', () => {
    expect(door1.margin_right).toBe(0.5);
  });

  it('field names are exactly: top_left, top_right, bottom_left, bottom_right', () => {
    const keys = Object.keys(bed);
    expect(keys).toContain('top_left');
    expect(keys).toContain('top_right');
    expect(keys).toContain('bottom_left');
    expect(keys).toContain('bottom_right');
    expect(keys).toContain('margin_top');
    expect(keys).toContain('margin_bottom');
    expect(keys).toContain('margin_left');
    expect(keys).toContain('margin_right');
  });

  it('label is snake_case', () => {
    expect(bed.name).toBe('bed');
    expect(door1.name).toBe('door1');
  });
});
