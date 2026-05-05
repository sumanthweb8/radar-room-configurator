import type { RoomObject } from './types';

export const ALL_FEATURES = [
  'state_machine','out_of_room_alerts','out_of_bed_alerts',
  'on_bed-toss','journey_mapping_time_taken','state_machine_v2',
  'state_machine_flickering','near_edge_alerts',
] as const;

export const DEFAULT_FEATURES: Record<string, string[]> = {
  bed:    ['state_machine','out_of_bed_alerts','on_bed-toss','journey_mapping_time_taken','state_machine_v2','state_machine_flickering','near_edge_alerts'],
  door:   ['state_machine','out_of_room_alerts','journey_mapping_time_taken'],
  window: [],
  radar:  [],
  sofa:   ['state_machine','journey_mapping_time_taken'],
  chair:  ['state_machine','journey_mapping_time_taken'],
  table:  [],
  desk:   [],
  wardrobe: [],
  cabinet:  [],
  person:   [],
  custom:   [],
};

export class MissingRadarError extends Error {
  constructor() {
    super('Place a Radar marker before exporting');
    this.name = 'MissingRadarError';
  }
}

const snake = (s: string) => s.toLowerCase().replace(/\s+/g, '_');

/**
 * Serialize objects into the firmware config.json format.
 *
 * Coordinate frame: origin = radar centre, +x right, +y forward (away from radar).
 * Canvas y is flipped: config_y = radarOriginY_canvas - canvas_y.
 *
 * Throws MissingRadarError when no radar is placed — origin is undefined.
 * The radar itself is not included in the output `objects[]`.
 */
export function buildConfig(objects: RoomObject[], board: string, location: string) {
  const radar = objects.find(o => o.type === 'radar');
  if (!radar) throw new MissingRadarError();

  const originX = radar.x + radar.width  / 2;
  const originY = radar.y + radar.height / 2;

  const serialized = objects
    .filter(o => o.type !== 'radar')
    .map(obj => {
      const left   = +(obj.x             - originX).toFixed(3);
      const right  = +(obj.x + obj.width  - originX).toFixed(3);
      const top    = +(originY - obj.y               ).toFixed(3);
      const bottom = +(originY - (obj.y + obj.height)).toFixed(3);
      return {
        name:         snake(obj.label),
        top_left:     [left,  top],
        top_right:    [right, top],
        bottom_left:  [left,  bottom],
        bottom_right: [right, bottom],
        margin_top:    obj.marginTop    ?? 0,
        margin_bottom: obj.marginBottom ?? 0,
        margin_left:   obj.marginLeft   ?? 0,
        margin_right:  obj.marginRight  ?? 0,
      };
    });

  const result: Record<string, unknown> = {
    device_configs: { board, location },
    objects: serialized,
  };

  for (const feature of ALL_FEATURES) {
    const names = objects
      .filter(o => o.type !== 'radar' && (DEFAULT_FEATURES[o.type] ?? []).includes(feature))
      .map(o => snake(o.label));
    if (names.length > 0) result[feature] = { objects: names };
  }

  return result;
}
