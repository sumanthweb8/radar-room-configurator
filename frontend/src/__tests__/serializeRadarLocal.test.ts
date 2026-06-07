import { describe, it, expect } from 'vitest';
import { serializeRadarLocal, CONFIG_TYPES } from '../exportConfig';
import type { RoomObject, RoomConfig } from '../types';

const room: RoomConfig = { name: 'R', width: 5, height: 5 };

function obj(p: Partial<RoomObject>): RoomObject {
  return {
    id: Math.random().toString(36).slice(2), type: 'bed', label: 'o',
    x: 1, y: 1, width: 1, height: 1, color: '#fff', rotation: 0,
    marginTop: 0.3, marginBottom: 0.3, marginLeft: 0.3, marginRight: 0.3, ...p,
  };
}

describe('serializeRadarLocal — config object set', () => {
  it('includes bed, door, sofa and excludes everything else', () => {
    const out = serializeRadarLocal([
      obj({ type: 'bed' }),
      obj({ type: 'door' }),
      obj({ type: 'sofa' }),
      obj({ type: 'table' }),
      obj({ type: 'chair' }),
      obj({ type: 'radar' }),
    ], room);
    expect(out.map(o => o.name)).toEqual(['bed', 'door1', 'sofa1']);
  });

  it('CONFIG_TYPES is exactly bed/door/sofa', () => {
    expect([...CONFIG_TYPES].sort()).toEqual(['bed', 'door', 'sofa']);
  });

  it('a sofa is a box + margins with no bed-only height fields', () => {
    const [sofa] = serializeRadarLocal([obj({ type: 'sofa', label: 'Couch' })], room);
    expect(sofa.name).toBe('sofa1');
    expect(sofa.type).toBe('sofa');
    expect(sofa.top_left).toBeDefined();
    expect(sofa.margin_top).toBe(0.3);
    expect(sofa.top_height).toBeUndefined();
    expect(sofa.left_width).toBeUndefined();
  });

  it('numbers multiple sofas sofa1, sofa2', () => {
    const out = serializeRadarLocal([obj({ type: 'sofa' }), obj({ type: 'sofa' })], room);
    expect(out.map(o => o.name)).toEqual(['sofa1', 'sofa2']);
  });
});
