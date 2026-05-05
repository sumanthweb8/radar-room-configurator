import { describe, it, expect } from 'vitest';
import type { RoomObject } from '../types';
import { buildConfig, MissingRadarError } from '../buildConfig';

function obj(overrides: Partial<RoomObject> = {}): RoomObject {
  return {
    id: '1', type: 'bed', label: 'Bed',
    x: 0, y: 0, width: 1.4, height: 2,
    color: '#fff', rotation: 0,
    marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0,
    ...overrides,
  };
}

// A radar at canvas (2, 2) with default 0.08 m size → origin ≈ (2.04, 2.04)
function radar(overrides: Partial<RoomObject> = {}): RoomObject {
  return obj({
    id: 'r', type: 'radar', label: 'Radar',
    x: 2, y: 2, width: 0.08, height: 0.08,
    ...overrides,
  });
}

describe('buildConfig', () => {
  it('produces device_configs block', () => {
    const cfg = buildConfig([radar()], 'xwr6843', 'bedroom');
    expect((cfg.device_configs as any).board).toBe('xwr6843');
    expect((cfg.device_configs as any).location).toBe('bedroom');
  });

  it('throws MissingRadarError when no radar is placed', () => {
    expect(() => buildConfig([obj()], 'b', 'l')).toThrow(MissingRadarError);
  });

  it('does not include the radar in the output objects[]', () => {
    const cfg = buildConfig([radar(), obj({ type: 'bed', label: 'Bed' })], 'b', 'l');
    const names = (cfg.objects as any[]).map(o => o.name);
    expect(names).not.toContain('radar');
    expect(names).toContain('bed');
  });

  it('serialises object coordinates in radar frame (origin = radar centre, +y forward)', () => {
    // Radar centre = (2.04, 2.04). Object top-left at canvas (3, 1), size 1×1.
    // Expected: left = 3 - 2.04 = 0.96, top = 2.04 - 1 = 1.04, bottom = 2.04 - 2 = 0.04
    const cfg = buildConfig(
      [radar(), obj({ x: 3, y: 1, width: 1, height: 1, label: 'Test' })],
      'b', 'l'
    );
    const o = (cfg.objects as any[])[0];
    expect(o.top_left).toEqual([0.96, 1.04]);
    expect(o.bottom_right).toEqual([1.96, 0.04]);
  });

  it('matches the locked-format reference example (bed at radar-frame [0.21, 3.9])', () => {
    // From configFormat.test.ts — radar canvas centre (2.3, 4.1), bed at canvas (2.51, 0.2), size 1.1×2.16.
    const r = radar({ x: 2.3 - 0.04, y: 4.1 - 0.04 });
    const bed = obj({ type: 'bed', label: 'bed', x: 2.51, y: 0.2, width: 1.1, height: 2.16 });
    const cfg = buildConfig([r, bed], 'b', 'l');
    const o = (cfg.objects as any[])[0];
    expect(o.top_left).toEqual([0.21, 3.9]);
    expect(o.bottom_right).toEqual([1.31, 1.74]);
  });

  it('converts label to snake_case', () => {
    const cfg = buildConfig([radar(), obj({ label: 'My Bed' })], 'b', 'l');
    expect((cfg.objects as any[])[0].name).toBe('my_bed');
  });

  it('includes state_machine for bed', () => {
    const cfg = buildConfig([radar(), obj({ type: 'bed', label: 'bed' })], 'b', 'l');
    expect((cfg.state_machine as any).objects).toContain('bed');
  });

  it('includes out_of_bed_alerts for bed', () => {
    const cfg = buildConfig([radar(), obj({ type: 'bed', label: 'bed' })], 'b', 'l');
    expect((cfg.out_of_bed_alerts as any).objects).toContain('bed');
  });

  it('does NOT include out_of_bed_alerts for sofa', () => {
    const cfg = buildConfig([radar(), obj({ type: 'sofa', label: 'sofa' })], 'b', 'l');
    expect(cfg.out_of_bed_alerts).toBeUndefined();
  });

  it('includes out_of_room_alerts for door', () => {
    const cfg = buildConfig([radar(), obj({ type: 'door', label: 'door' })], 'b', 'l');
    expect((cfg.out_of_room_alerts as any).objects).toContain('door');
  });

  it('does not emit feature sections for empty lists', () => {
    const cfg = buildConfig([radar()], 'b', 'l');
    expect(cfg.state_machine).toBeUndefined();
  });

  it('handles multiple objects', () => {
    const cfg = buildConfig([
      radar(),
      obj({ type: 'bed',  label: 'Bed' }),
      obj({ type: 'sofa', label: 'Sofa' }),
    ], 'b', 'l');
    expect((cfg.objects as any[]).length).toBe(2);
    expect((cfg.state_machine as any).objects).toContain('bed');
    expect((cfg.state_machine as any).objects).toContain('sofa');
  });

  it('rounds coordinates to 3dp', () => {
    const cfg = buildConfig(
      [radar(), obj({ x: 3.0001, y: 2, width: 1, height: 1 })],
      'b', 'l'
    );
    expect((cfg.objects as any[])[0].top_left[0]).toBe(0.96);
  });
});
