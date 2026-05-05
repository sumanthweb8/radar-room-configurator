import { describe, it, expect } from 'vitest';
import {
  addRoom,
  createEmptyHouse,
  createEmptyRoom,
  getActiveRoom,
  removeRoom,
  setActiveRoom,
  updateRoom,
  validateRoomForExport,
} from '../houseModel';
import type { RoomObject } from '../types';

function radar(): RoomObject {
  return {
    id: 'r', type: 'radar', label: 'Radar',
    x: 1, y: 1, width: 0.08, height: 0.08, color: '#fff', rotation: 0,
    marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0,
  };
}

describe('houseModel', () => {
  it('createEmptyHouse starts with one active room', () => {
    const h = createEmptyHouse();
    expect(h.rooms).toHaveLength(1);
    expect(h.activeRoomId).toBe(h.rooms[0].id);
    expect(getActiveRoom(h)).toBe(h.rooms[0]);
  });

  it('addRoom appends and switches active', () => {
    const h0 = createEmptyHouse();
    const h1 = addRoom(h0, createEmptyRoom({ name: 'Room 2' }));
    expect(h1.rooms).toHaveLength(2);
    expect(getActiveRoom(h1)?.name).toBe('Room 2');
  });

  it('removeRoom drops and reassigns active when needed', () => {
    let h = createEmptyHouse();
    h = addRoom(h, createEmptyRoom({ name: 'A' }));
    h = addRoom(h, createEmptyRoom({ name: 'B' }));
    const activeId = h.activeRoomId!;
    h = removeRoom(h, activeId);
    expect(h.rooms).toHaveLength(2);
    expect(h.activeRoomId).not.toBe(activeId);
    expect(h.activeRoomId).toBe(h.rooms[0].id);
  });

  it('updateRoom patches by id', () => {
    let h = createEmptyHouse();
    const id = h.rooms[0].id;
    h = updateRoom(h, id, { board: 'kc2508p012', location: 'room1' });
    expect(h.rooms[0].board).toBe('kc2508p012');
    expect(h.rooms[0].location).toBe('room1');
  });

  it('setActiveRoom ignores unknown ids', () => {
    const h = setActiveRoom(createEmptyHouse(), 'does-not-exist');
    expect(getActiveRoom(h)).not.toBeNull();
  });

  it('validateRoomForExport flags missing radar / board / location', () => {
    const room = createEmptyRoom();
    const errs = validateRoomForExport(room);
    expect(errs).toContain('Missing board id');
    expect(errs).toContain('Missing location label');
    expect(errs).toContain('No radar placed');
  });

  it('validateRoomForExport passes when all required fields present', () => {
    const room = createEmptyRoom({
      board: 'kc2508p012',
      location: 'room1',
      objects: [radar()],
    });
    expect(validateRoomForExport(room)).toEqual([]);
  });
});
