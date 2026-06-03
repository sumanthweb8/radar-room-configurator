/**
 * exportConfig.ts — Radar-local serialization for the device config + zone.
 *
 * Everything is expressed in the RADAR-LOCAL frame (radar at 0,0):
 *   X = lateral (right of the radar), Y = forward (the radar's facing).
 * The frame is orthonormal, so it doubles as the coordinate space for the
 * interactive Plot editor.
 */

import type { RoomConfig, RoomObject } from './types';
import { getRadarFacing } from './types';

export type ConfigObject = Record<string, unknown>;

/** Radar-local frame: origin at the radar centre, right ⊥ forward (unit). */
export function radarFrame(objects: RoomObject[], room: RoomConfig) {
  const radar = objects.find(o => o.type === 'radar');
  const originX = radar ? radar.x + radar.width / 2 : 0;
  const originY = radar ? radar.y + radar.height / 2 : 0;
  const { nx: fwd_x, ny: fwd_y } = radar ? getRadarFacing(radar, room) : { nx: 0, ny: -1 };
  const right_x = -fwd_y, right_y = fwd_x;
  const toLocal = (rx: number, ry: number): [number, number] => {
    const dx = rx - originX, dy = ry - originY;
    return [dx * right_x + dy * right_y, dx * fwd_x + dy * fwd_y];
  };
  return { originX, originY, fwd_x, fwd_y, right_x, right_y, toLocal };
}

/** Per-object radar-local boxes + margins (beds + doors), as config entries. */
export function serializeRadarLocal(objects: RoomObject[], room: RoomConfig): ConfigObject[] {
  const { toLocal } = radarFrame(objects, room);
  const exportable = objects.filter(o => o.type === 'bed' || o.type === 'door');
  let doorIdx = 0;
  return exportable.map(obj => {
    const corners: [number, number][] = [
      [obj.x, obj.y], [obj.x + obj.width, obj.y],
      [obj.x, obj.y + obj.height], [obj.x + obj.width, obj.y + obj.height],
    ];
    const transformed = corners.map(([rx, ry]) => {
      const [lx, ly] = toLocal(rx, ry);
      return [+lx.toFixed(3), +ly.toFixed(3)];
    });
    const xs = transformed.map(c => c[0]), ys = transformed.map(c => c[1]);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);

    const name = obj.type === 'door' ? `door${++doorIdx}` : 'bed';
    const entry: ConfigObject = {
      name,
      type: obj.type,
      top_left: [minX, maxY], top_right: [maxX, maxY],
      bottom_left: [minX, minY], bottom_right: [maxX, minY],
      margin_top: obj.marginTop ?? 0.3, margin_bottom: obj.marginBottom ?? 0.3,
      margin_left: obj.marginLeft ?? 0.3, margin_right: obj.marginRight ?? 0.3,
    };
    if (obj.type === 'bed') {
      entry.top_height = 0.5; entry.bottom_height = 0.5;
      entry.right_width = 0.5; entry.left_width = 0.5;
    }
    return entry;
  });
}

/** Assemble the full config from serialized radar-local objects (+ margin clamp). */
export function assembleConfig(serialized: ConfigObject[], board: string, location: string) {
  // Clamp margins so detection zones never overlap between objects.
  const MARGIN_THRESH = 0.3 * 2;
  const clampedPairs: string[] = [];
  const objBounds = serialized.map(o => {
    const tl = o.top_left as number[], tr = o.top_right as number[], bl = o.bottom_left as number[];
    return { minX: tl[0], maxX: tr[0], minY: bl[1], maxY: tl[1] };
  });
  for (let i = 0; i < serialized.length; i++) {
    const a = serialized[i];
    const ai = objBounds[i];
    for (let j = i + 1; j < serialized.length; j++) {
      const b = serialized[j];
      const bj = objBounds[j];
      const yNear = (ai.minY - MARGIN_THRESH) < bj.maxY && (bj.minY - MARGIN_THRESH) < ai.maxY;
      const xNear = (ai.minX - MARGIN_THRESH) < bj.maxX && (bj.minX - MARGIN_THRESH) < ai.maxX;

      if (bj.minX >= ai.maxX && yNear) {
        const gap = bj.minX - ai.maxX;
        const half = Math.max(0, +(gap / 2).toFixed(3));
        if ((a.margin_right as number) + (b.margin_left as number) > gap) {
          a.margin_right = Math.min(a.margin_right as number, half);
          b.margin_left = Math.min(b.margin_left as number, half);
          clampedPairs.push(`${a.name} ↔ ${b.name} (horizontal gap ${gap.toFixed(2)}m)`);
        }
      }
      if (ai.minX >= bj.maxX && yNear) {
        const gap = ai.minX - bj.maxX;
        const half = Math.max(0, +(gap / 2).toFixed(3));
        if ((b.margin_right as number) + (a.margin_left as number) > gap) {
          b.margin_right = Math.min(b.margin_right as number, half);
          a.margin_left = Math.min(a.margin_left as number, half);
          clampedPairs.push(`${b.name} ↔ ${a.name} (horizontal gap ${gap.toFixed(2)}m)`);
        }
      }
      if (bj.minY >= ai.maxY && xNear) {
        const gap = bj.minY - ai.maxY;
        const half = Math.max(0, +(gap / 2).toFixed(3));
        if ((a.margin_top as number) + (b.margin_bottom as number) > gap) {
          a.margin_top = Math.min(a.margin_top as number, half);
          b.margin_bottom = Math.min(b.margin_bottom as number, half);
          clampedPairs.push(`${a.name} ↔ ${b.name} (vertical gap ${gap.toFixed(2)}m)`);
        }
      }
      if (ai.minY >= bj.maxY && xNear) {
        const gap = ai.minY - bj.maxY;
        const half = Math.max(0, +(gap / 2).toFixed(3));
        if ((b.margin_top as number) + (a.margin_bottom as number) > gap) {
          b.margin_top = Math.min(b.margin_top as number, half);
          a.margin_bottom = Math.min(a.margin_bottom as number, half);
          clampedPairs.push(`${b.name} ↔ ${a.name} (vertical gap ${gap.toFixed(2)}m)`);
        }
      }
    }
  }

  const names = serialized.map(o => o.name as string);
  const bedNames = names.filter(n => n === 'bed');
  const doorNames = names.filter(n => n.startsWith('door'));

  // Strip the editor-only `type` field from the exported objects.
  const exported = serialized.map(({ type, ...rest }) => rest);

  return {
    device_configs: { board, location },
    objects: exported,
    _clampedMargins: clampedPairs,
    state_machine: { objects: names },
    out_of_room_alerts: { objects: doorNames },
    out_of_bed_alerts: { objects: bedNames },
    'on_bed-toss': { objects: bedNames },
    journey_mapping_time_taken: { objects: names },
    state_machine_v2: { objects: bedNames },
    state_machine_flickering: { objects: bedNames },
    near_edge_alerts: { objects: bedNames },
  };
}

/** Full device config from the room model (radar-local). */
export function buildConfig(objects: RoomObject[], board: string, location: string, room: RoomConfig) {
  return assembleConfig(serializeRadarLocal(objects, room), board, location);
}

/** Room boundary polygon in the radar-local frame (radar at 0,0). Full precision. */
export function buildZone(objects: RoomObject[], room: RoomConfig): { zone: number[][] } {
  const { toLocal } = radarFrame(objects, room);
  const boundary: [number, number][] = (room.polygon && room.polygon.length >= 3)
    ? room.polygon
    : [[0, 0], [room.width, 0], [room.width, room.height], [0, room.height]];
  return { zone: boundary.map(([rx, ry]) => toLocal(rx, ry)) };
}
