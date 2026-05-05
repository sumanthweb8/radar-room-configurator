import type { AdjacentRoom, RoomConfig, RoomObject } from './types';

export interface FloorInfo {
  name: string;
  width: number;
  height: number;
}

export interface Room {
  id: string;
  name: string;
  board: string;
  location: string;
  config: RoomConfig;
  objects: RoomObject[];
  adjacentRooms: AdjacentRoom[];
}

export interface House {
  schemaVersion: 1;
  id: string;
  name: string;
  floor: FloorInfo | null;
  rooms: Room[];
  activeRoomId: string | null;
}

export const DEFAULT_ROOM_CONFIG: RoomConfig = { name: 'Room', width: 4, height: 4 };

function genId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function createEmptyRoom(partial: Partial<Room> = {}): Room {
  return {
    id: partial.id ?? genId(),
    name: partial.name ?? 'Room',
    board: partial.board ?? '',
    location: partial.location ?? '',
    config: partial.config ?? { ...DEFAULT_ROOM_CONFIG },
    objects: partial.objects ?? [],
    adjacentRooms: partial.adjacentRooms ?? [],
  };
}

export function createEmptyHouse(): House {
  const room = createEmptyRoom({ name: 'Room 1' });
  return {
    schemaVersion: 1,
    id: genId(),
    name: 'My House',
    floor: null,
    rooms: [room],
    activeRoomId: room.id,
  };
}

export function getActiveRoom(house: House): Room | null {
  return house.rooms.find(r => r.id === house.activeRoomId) ?? null;
}

export function addRoom(house: House, partial: Partial<Room> = {}): House {
  const room = createEmptyRoom(partial);
  return {
    ...house,
    rooms: [...house.rooms, room],
    activeRoomId: room.id,
  };
}

export function removeRoom(house: House, id: string): House {
  const rooms = house.rooms.filter(r => r.id !== id);
  const activeRoomId =
    house.activeRoomId === id
      ? (rooms[0]?.id ?? null)
      : house.activeRoomId;
  return { ...house, rooms, activeRoomId };
}

export function updateRoom(house: House, id: string, patch: Partial<Room>): House {
  return {
    ...house,
    rooms: house.rooms.map(r => (r.id === id ? { ...r, ...patch } : r)),
  };
}

export function setActiveRoom(house: House, id: string | null): House {
  if (id !== null && !house.rooms.some(r => r.id === id)) return house;
  return { ...house, activeRoomId: id };
}

export function validateRoomForExport(room: Room): string[] {
  const errors: string[] = [];
  if (!room.board.trim())     errors.push('Missing board id');
  if (!room.location.trim())  errors.push('Missing location label');
  if (!room.objects.some(o => o.type === 'radar')) errors.push('No radar placed');
  return errors;
}
