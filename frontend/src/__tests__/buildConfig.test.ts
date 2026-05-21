/**
 * Tests for the buildConfig function.
 */
import { describe, it, expect } from 'vitest';
import type { RoomObject } from '../types';

function buildConfig(objects: RoomObject[], board: string, location: string) {
  const radar   = objects.find(o => o.type === 'radar');
  const originX = radar ? radar.x + radar.width  / 2 : 0;
  const originY = radar ? radar.y + radar.height / 2 : 0;

  const exportable = objects.filter(o => o.type === 'bed' || o.type === 'door');
  let doorIdx = 0;
  const serialized = exportable.map(obj => {
    const left   = +(obj.x            - originX).toFixed(3);
    const right  = +(obj.x + obj.width - originX).toFixed(3);
    const top    = +(originY - obj.y           ).toFixed(3);
    const bottom = +(originY - (obj.y + obj.height)).toFixed(3);
    const name   = obj.type === 'door' ? `door${++doorIdx}` : 'bed';
    const entry: Record<string, unknown> = {
      name,
      top_left:     [left,  top],
      top_right:    [right, top],
      bottom_left:  [left,  bottom],
      bottom_right: [right, bottom],
      margin_top:    obj.marginTop    ?? 0,
      margin_bottom: obj.marginBottom ?? 0,
      margin_left:   obj.marginLeft   ?? 0,
      margin_right:  obj.marginRight  ?? 0,
    };
    if (obj.type === 'bed') {
      entry.top_height    = 0.5;
      entry.bottom_height = 0.5;
      entry.right_width   = 0.5;
      entry.left_width    = 0.5;
    }
    return entry;
  });

  const names     = serialized.map(o => o.name as string);
  const bedNames  = names.filter(n => n === 'bed');
  const doorNames = names.filter(n => n.startsWith('door'));

  return {
    device_configs: { board, location },
    objects: serialized,
    state_machine:               { objects: names },
    out_of_room_alerts:          { objects: doorNames },
    out_of_bed_alerts:           { objects: bedNames },
    'on_bed-toss':               { objects: bedNames },
    journey_mapping_time_taken:  { objects: names },
    state_machine_v2:            { objects: bedNames },
    state_machine_flickering:    { objects: bedNames },
    near_edge_alerts:            { objects: bedNames },
  };
}

function obj(overrides: Partial<RoomObject> = {}): RoomObject {
  return { id:'1', type:'bed', label:'Bed', x:0, y:0, width:1.4, height:2, color:'#fff', rotation:0, marginTop:0, marginBottom:0, marginLeft:0, marginRight:0, ...overrides };
}

describe('buildConfig', () => {
  it('produces device_configs block', () => {
    const cfg = buildConfig([], 'xwr6843', 'bedroom');
    expect(cfg.device_configs.board).toBe('xwr6843');
    expect(cfg.device_configs.location).toBe('bedroom');
  });

  it('only exports bed and door objects', () => {
    const cfg = buildConfig([
      obj({ type: 'bed', label: 'Bed' }),
      obj({ id: '2', type: 'table', label: 'Table' }),
      obj({ id: '3', type: 'door', label: 'Door' }),
      obj({ id: '4', type: 'window', label: 'Window' }),
      obj({ id: '5', type: 'radar', label: 'Radar' }),
    ], 'b', 'l');
    const names = (cfg.objects as any[]).map((o: any) => o.name);
    expect(names).toEqual(['bed', 'door1']);
  });

  it('auto-names doors as door1, door2', () => {
    const cfg = buildConfig([
      obj({ id: '1', type: 'door', label: 'Door (upper)' }),
      obj({ id: '2', type: 'door', label: 'Door (lower)' }),
    ], 'b', 'l');
    const names = (cfg.objects as any[]).map((o: any) => o.name);
    expect(names).toEqual(['door1', 'door2']);
  });

  it('adds height/width fields for bed only', () => {
    const cfg = buildConfig([
      obj({ type: 'bed', label: 'Bed' }),
      obj({ id: '2', type: 'door', label: 'Door' }),
    ], 'b', 'l');
    const bed = (cfg.objects as any[])[0];
    expect(bed.top_height).toBe(0.5);
    expect(bed.bottom_height).toBe(0.5);
    expect(bed.right_width).toBe(0.5);
    expect(bed.left_width).toBe(0.5);
    const door = (cfg.objects as any[])[1];
    expect(door.top_height).toBeUndefined();
  });

  it('feature sections are correct', () => {
    const cfg = buildConfig([
      obj({ type: 'bed', label: 'Bed' }),
      obj({ id: '2', type: 'door', label: 'Door A' }),
      obj({ id: '3', type: 'door', label: 'Door B' }),
    ], 'b', 'l');
    expect(cfg.state_machine.objects).toEqual(['bed', 'door1', 'door2']);
    expect(cfg.out_of_room_alerts.objects).toEqual(['door1', 'door2']);
    expect(cfg.out_of_bed_alerts.objects).toEqual(['bed']);
    expect(cfg['on_bed-toss'].objects).toEqual(['bed']);
    expect(cfg.journey_mapping_time_taken.objects).toEqual(['bed', 'door1', 'door2']);
    expect(cfg.state_machine_v2.objects).toEqual(['bed']);
    expect(cfg.state_machine_flickering.objects).toEqual(['bed']);
    expect(cfg.near_edge_alerts.objects).toEqual(['bed']);
  });
});
