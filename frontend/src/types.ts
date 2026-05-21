export type ObjectType =
  | 'bed' | 'sofa' | 'table' | 'desk' | 'chair'
  | 'wardrobe' | 'cabinet' | 'door' | 'window'
  | 'radar' | 'person' | 'custom';

export interface RoomObject {
  id: string;
  type: ObjectType;
  label: string;
  x: number;       // metres from left wall (top-left corner)
  y: number;       // metres from top wall (top-left corner)
  width: number;   // metres
  height: number;  // metres
  color: string;
  rotation: number; // degrees
  marginTop:    number; // metres — buffer above object for radar algorithms
  marginBottom: number;
  marginLeft:   number;
  marginRight:  number;
}

export interface RoomConfig {
  name: string;
  width: number;   // metres (bounding box)
  height: number;  // metres (bounding box)
  polygon?: [number, number][];  // room outline vertices in metres — undefined = rectangle
}

export type WallSide = 'top' | 'bottom' | 'left' | 'right';
export type AdjacentRoomType = 'room' | 'passage' | 'bathroom';

export interface AdjacentRoomDoor {
  id: string;
  /** Which wall of the adjacent room the door is on (relative to the adjacent room itself) */
  wall: WallSide;
  /** Position along that wall in metres from the start edge */
  position: number;
  width: number;
  label: string;
}

export interface AdjacentRoom {
  id: string;
  doorId: string;
  wall: WallSide;
  name: string;
  roomType: AdjacentRoomType;
  /** For top/bottom rooms: horizontal span. For left/right rooms: depth (perpendicular). */
  width: number;
  /** For top/bottom rooms: depth (perpendicular). For left/right rooms: vertical span. */
  height: number;
  doors?: AdjacentRoomDoor[];
}

/**
 * Returns the radar's facing direction as a unit normal (nx, ny) in room-space (Y-down).
 * Uses polygon-aware nearest wall when available, with aspect-ratio fallback
 * for frame-mounted radars far from any wall.
 */
export function getRadarFacing(radar: RoomObject, room: RoomConfig): { nx: number; ny: number } {
  const rox = radar.x + radar.width / 2;
  const roy = radar.y + radar.height / 2;
  let nx = 0, ny = -1, bestDist = Infinity;

  if (room.polygon && room.polygon.length >= 3) {
    const poly = room.polygon;
    let signedArea = 0;
    for (let i = 0; i < poly.length; i++) {
      const [x1, y1] = poly[i];
      const [x2, y2] = poly[(i + 1) % poly.length];
      signedArea += x1 * y2 - x2 * y1;
    }
    const cw = signedArea > 0;
    for (let i = 0; i < poly.length; i++) {
      const [x1, y1] = poly[i];
      const [x2, y2] = poly[(i + 1) % poly.length];
      const edx = x2 - x1, edy = y2 - y1;
      const len = Math.sqrt(edx * edx + edy * edy);
      if (len < 0.01) continue;
      let t = ((rox - x1) * edx + (roy - y1) * edy) / (len * len);
      t = Math.max(0, Math.min(1, t));
      const px = x1 + t * edx, py = y1 + t * edy;
      const d = Math.sqrt((rox - px) ** 2 + (roy - py) ** 2);
      if (d < bestDist) {
        bestDist = d;
        nx = cw ? -edy / len : edy / len;
        ny = cw ? edx / len : -edx / len;
      }
    }
  } else {
    const dT = roy, dB = room.height - roy, dL = rox, dR = room.width - rox;
    bestDist = Math.min(dT, dB, dL, dR);
    if (bestDist === dT)      { nx = 0; ny = 1; }
    else if (bestDist === dB) { nx = 0; ny = -1; }
    else if (bestDist === dL) { nx = 1; ny = 0; }
    else                      { nx = -1; ny = 0; }
  }

  if (bestDist > 0.3) {
    if (radar.height > radar.width * 1.2) {
      nx = rox < room.width / 2 ? 1 : -1; ny = 0;
    } else if (radar.width > radar.height * 1.2) {
      nx = 0; ny = roy < room.height / 2 ? 1 : -1;
    }
  }

  return { nx, ny };
}

export function getEffectiveDims(obj: RoomObject) {
  const r = (obj.rotation * Math.PI) / 180;
  const c = Math.abs(Math.cos(r)), s = Math.abs(Math.sin(r));
  return { ew: obj.width * c + obj.height * s, eh: obj.width * s + obj.height * c };
}

export function detectDoorWall(obj: RoomObject, room: RoomConfig): WallSide | null {
  const { ew, eh } = getEffectiveDims(obj);
  const ox = (ew - obj.width) / 2;
  const oy = (eh - obj.height) / 2;
  const effLeft   = obj.x - ox;
  const effTop    = obj.y - oy;
  const effRight  = effLeft + ew;
  const effBottom = effTop  + eh;
  const TOL = 0.5;

  // Compute distance from each wall edge — pick the closest one within tolerance
  const distances: { wall: WallSide; dist: number }[] = [
    { wall: 'top',    dist: Math.abs(effTop) },
    { wall: 'bottom', dist: Math.abs(room.height - effBottom) },
    { wall: 'left',   dist: Math.abs(effLeft) },
    { wall: 'right',  dist: Math.abs(room.width - effRight) },
  ];
  const closest = distances.reduce((a, b) => a.dist < b.dist ? a : b);
  return closest.dist < TOL ? closest.wall : null;
}

export interface ObjectPreset {
  label: string;
  defaultWidth: number;
  defaultHeight: number;
  color: string;
  emoji: string;
  description: string;
}

export const OBJECT_PRESETS: Record<ObjectType, ObjectPreset> = {
  bed:      { label: 'Bed',      defaultWidth: 1.4,  defaultHeight: 2.0,  color: '#4299e1', emoji: '🛏', description: 'Single/double bed' },
  sofa:     { label: 'Sofa',     defaultWidth: 2.0,  defaultHeight: 0.9,  color: '#48bb78', emoji: '🛋', description: 'Living room sofa' },
  table:    { label: 'Table',    defaultWidth: 1.2,  defaultHeight: 0.8,  color: '#ed8936', emoji: '🪑', description: 'Dining / coffee table' },
  desk:     { label: 'Desk',     defaultWidth: 1.2,  defaultHeight: 0.6,  color: '#4fd1c5', emoji: '🖥', description: 'Work desk' },
  chair:    { label: 'Chair',    defaultWidth: 0.5,  defaultHeight: 0.5,  color: '#b794f4', emoji: '💺', description: 'Chair / stool' },
  wardrobe: { label: 'Wardrobe', defaultWidth: 1.2,  defaultHeight: 0.6,  color: '#fc8181', emoji: '🗄', description: 'Wardrobe / almirah' },
  cabinet:  { label: 'Cabinet',  defaultWidth: 0.8,  defaultHeight: 0.4,  color: '#f6e05e', emoji: '📦', description: 'Storage cabinet' },
  door:     { label: 'Door',     defaultWidth: 0.9,  defaultHeight: 0.15, color: '#fbd38d', emoji: '🚪', description: 'Door opening' },
  window:   { label: 'Window',   defaultWidth: 1.2,  defaultHeight: 0.15, color: '#90cdf4', emoji: '🪟', description: 'Window opening' },
  radar:    { label: 'Radar',    defaultWidth: 0.08, defaultHeight: 0.08, color: '#a78bfa', emoji: '📡', description: 'mmWave radar sensor' },
  person:   { label: 'Person',   defaultWidth: 0.45, defaultHeight: 0.45, color: '#f6ad55', emoji: '🧍', description: 'Human / radar target' },
  custom:   { label: 'Custom',   defaultWidth: 0.5,  defaultHeight: 0.5,  color: '#718096', emoji: '⬜', description: 'Custom obstacle' },
};
