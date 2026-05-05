import { describe, it, expect } from 'vitest';
import { getEffectiveDims, detectDoorWall, OBJECT_PRESETS } from '../types';
import type { RoomObject, RoomConfig } from '../types';

const room: RoomConfig = { name: 'Test', width: 5, height: 4 };

function makeObj(overrides: Partial<RoomObject> = {}): RoomObject {
  return {
    id: 'x', type: 'door', label: 'Door',
    x: 0, y: 1.5, width: 0.9, height: 0.15,
    color: '#fff', rotation: 0,
    marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0,
    ...overrides,
  };
}

describe('getEffectiveDims', () => {
  it('returns original dims at 0° rotation', () => {
    const { ew, eh } = getEffectiveDims(makeObj({ rotation: 0 }));
    expect(ew).toBeCloseTo(0.9);
    expect(eh).toBeCloseTo(0.15);
  });

  it('swaps dims at 90° rotation', () => {
    const { ew, eh } = getEffectiveDims(makeObj({ rotation: 90 }));
    expect(ew).toBeCloseTo(0.15);
    expect(eh).toBeCloseTo(0.9);
  });

  it('returns original dims at 180° rotation', () => {
    const { ew, eh } = getEffectiveDims(makeObj({ rotation: 180 }));
    expect(ew).toBeCloseTo(0.9);
    expect(eh).toBeCloseTo(0.15);
  });

  it('returns correct bounding box at 45°', () => {
    const obj = makeObj({ width: 1, height: 0, rotation: 45 });
    const { ew, eh } = getEffectiveDims(obj);
    expect(ew).toBeCloseTo(Math.SQRT2 / 2, 3);
    expect(eh).toBeCloseTo(Math.SQRT2 / 2, 3);
  });
});

describe('detectDoorWall', () => {
  it('detects top wall', () => {
    const obj = makeObj({ x: 2, y: 0, width: 0.9, height: 0.15 });
    expect(detectDoorWall(obj, room)).toBe('top');
  });

  it('detects bottom wall', () => {
    const obj = makeObj({ x: 2, y: room.height - 0.15, width: 0.9, height: 0.15 });
    expect(detectDoorWall(obj, room)).toBe('bottom');
  });

  it('detects left wall', () => {
    const obj = makeObj({ x: 0, y: 1.5, width: 0.15, height: 0.9 });
    expect(detectDoorWall(obj, room)).toBe('left');
  });

  it('detects right wall', () => {
    const obj = makeObj({ x: room.width - 0.15, y: 1.5, width: 0.15, height: 0.9 });
    expect(detectDoorWall(obj, room)).toBe('right');
  });

  it('returns null when object is far from all walls', () => {
    const obj = makeObj({ x: 2, y: 2, width: 0.5, height: 0.5 });
    expect(detectDoorWall(obj, room)).toBeNull();
  });

  it('picks closest wall when near corner', () => {
    // Near top-left corner — top distance is smaller
    const obj = makeObj({ x: 0.05, y: 0, width: 0.15, height: 0.9 });
    const result = detectDoorWall(obj, room);
    expect(['top', 'left']).toContain(result);
  });

  it('picks closest not first-within-tolerance', () => {
    // Door at y=0, also x≈0 — y=0 is closer → top
    const obj = makeObj({ x: 0.1, y: 0, width: 0.9, height: 0.15 });
    expect(detectDoorWall(obj, room)).toBe('top');
  });
});

describe('OBJECT_PRESETS', () => {
  it('all types have required fields', () => {
    for (const [type, preset] of Object.entries(OBJECT_PRESETS)) {
      expect(preset.label,       `${type}.label`).toBeTruthy();
      expect(preset.defaultWidth,  `${type}.defaultWidth`).toBeGreaterThan(0);
      expect(preset.defaultHeight, `${type}.defaultHeight`).toBeGreaterThan(0);
      expect(preset.color,       `${type}.color`).toMatch(/^#[0-9a-f]{6}$/i);
      expect(preset.emoji,       `${type}.emoji`).toBeTruthy();
    }
  });

  it('bed is wider than thin', () => {
    expect(OBJECT_PRESETS.bed.defaultWidth).toBeGreaterThan(0.5);
    expect(OBJECT_PRESETS.bed.defaultHeight).toBeGreaterThan(1.0);
  });

  it('door is thin (wall-mounted)', () => {
    expect(OBJECT_PRESETS.door.defaultHeight).toBeLessThan(0.3);
  });

  it('radar is small', () => {
    expect(OBJECT_PRESETS.radar.defaultWidth).toBeLessThan(0.2);
  });
});
