/**
 * Tests for the buildConfig function (exported via App internals).
 * We test the shape of the generated JSON directly.
 */
import { describe, it, expect } from 'vitest';
import type { RoomObject } from '../types';

// Duplicate buildConfig here to test it independently
function buildConfig(objects: RoomObject[], board: string, location: string) {
  const ALL_FEATURES = [
    'state_machine','out_of_room_alerts','out_of_bed_alerts',
    'on_bed-toss','journey_mapping_time_taken','state_machine_v2',
    'state_machine_flickering','near_edge_alerts',
  ];
  const DEFAULT_FEATURES: Record<string, string[]> = {
    bed:    ['state_machine','out_of_bed_alerts','on_bed-toss','journey_mapping_time_taken','state_machine_v2','state_machine_flickering','near_edge_alerts'],
    door:   ['state_machine','out_of_room_alerts','journey_mapping_time_taken'],
    window: [], radar: [], sofa: ['state_machine','journey_mapping_time_taken'],
    chair:  ['state_machine','journey_mapping_time_taken'], table: [], desk: [],
    wardrobe: [], cabinet: [], person: [], custom: [],
  };
  const serialized = objects.map(obj => ({
    name:         obj.label.toLowerCase().replace(/\s+/g, '_'),
    top_left:     [+obj.x.toFixed(3), +obj.y.toFixed(3)],
    top_right:    [+(obj.x + obj.width).toFixed(3), +obj.y.toFixed(3)],
    bottom_left:  [+obj.x.toFixed(3), +(obj.y + obj.height).toFixed(3)],
    bottom_right: [+(obj.x + obj.width).toFixed(3), +(obj.y + obj.height).toFixed(3)],
    margin_top: 0, margin_bottom: 0, margin_left: 0, margin_right: 0,
  }));
  const result: Record<string, unknown> = { device_configs: { board, location }, objects: serialized };
  for (const feature of ALL_FEATURES) {
    const names = objects.filter(o => (DEFAULT_FEATURES[o.type] ?? []).includes(feature)).map(o => o.label.toLowerCase().replace(/\s+/g, '_'));
    if (names.length > 0) result[feature] = { objects: names };
  }
  return result;
}

function obj(overrides: Partial<RoomObject> = {}): RoomObject {
  return { id:'1', type:'bed', label:'Bed', x:0, y:0, width:1.4, height:2, color:'#fff', rotation:0, marginTop:0, marginBottom:0, marginLeft:0, marginRight:0, ...overrides };
}

describe('buildConfig', () => {
  it('produces device_configs block', () => {
    const cfg = buildConfig([], 'xwr6843', 'bedroom');
    expect((cfg.device_configs as any).board).toBe('xwr6843');
    expect((cfg.device_configs as any).location).toBe('bedroom');
  });

  it('serialises object coordinates', () => {
    const cfg = buildConfig([obj({ x: 1, y: 2, width: 1.4, height: 2 })], 'b', 'l');
    const o = (cfg.objects as any[])[0];
    expect(o.top_left).toEqual([1, 2]);
    expect(o.bottom_right).toEqual([2.4, 4]);
  });

  it('converts label to snake_case', () => {
    const cfg = buildConfig([obj({ label: 'My Bed' })], 'b', 'l');
    expect((cfg.objects as any[])[0].name).toBe('my_bed');
  });

  it('includes state_machine for bed', () => {
    const cfg = buildConfig([obj({ type: 'bed', label: 'bed' })], 'b', 'l');
    expect((cfg.state_machine as any).objects).toContain('bed');
  });

  it('includes out_of_bed_alerts for bed', () => {
    const cfg = buildConfig([obj({ type: 'bed', label: 'bed' })], 'b', 'l');
    expect((cfg.out_of_bed_alerts as any).objects).toContain('bed');
  });

  it('does NOT include out_of_bed_alerts for sofa', () => {
    const cfg = buildConfig([obj({ type: 'sofa', label: 'sofa' })], 'b', 'l');
    expect(cfg.out_of_bed_alerts).toBeUndefined();
  });

  it('includes out_of_room_alerts for door', () => {
    const cfg = buildConfig([obj({ type: 'door', label: 'door' })], 'b', 'l');
    expect((cfg.out_of_room_alerts as any).objects).toContain('door');
  });

  it('does not emit feature sections for empty lists', () => {
    const cfg = buildConfig([obj({ type: 'radar', label: 'radar' })], 'b', 'l');
    expect(cfg.state_machine).toBeUndefined();
  });

  it('handles multiple objects', () => {
    const cfg = buildConfig([
      obj({ type: 'bed', label: 'Bed' }),
      obj({ type: 'sofa', label: 'Sofa' }),
    ], 'b', 'l');
    expect((cfg.objects as any[]).length).toBe(2);
    expect((cfg.state_machine as any).objects).toContain('bed');
    expect((cfg.state_machine as any).objects).toContain('sofa');
  });

  it('rounds coordinates to 3dp', () => {
    const cfg = buildConfig([obj({ x: 1.0001, y: 0, width: 1, height: 1 })], 'b', 'l');
    expect((cfg.objects as any[])[0].top_left[0]).toBe(1);
  });
});
