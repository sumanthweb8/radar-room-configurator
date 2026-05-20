import type { RoomConfig, RoomObject } from './types';

function o(
  id: string,
  type: RoomObject['type'],
  label: string,
  x: number, y: number, w: number, h: number,
  rotation = 0,
): RoomObject {
  const COLORS: Record<string, string> = {
    bed: '#4299e1', door: '#fbd38d', window: '#90cdf4',
    chair: '#b794f4', table: '#ed8936', cabinet: '#f6e05e',
    wardrobe: '#fc8181', custom: '#718096', radar: '#a78bfa',
    sofa: '#48bb78', desk: '#4fd1c5', person: '#f6ad55',
  };
  return {
    id, type, label, x, y, width: w, height: h,
    color: COLORS[type] ?? '#718096', rotation,
    marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0,
  };
}

export interface FloorPlanRoom {
  id: string;
  label: string;
  area: string;
  config: RoomConfig;
  objects: RoomObject[];
}

export const FLOOR_PLAN_ROOMS: FloorPlanRoom[] = [
  {
    id: 'room_002',
    label: 'Sample 1',
    area: '8.57 m²',
    config: { name: 'Room 002', width: 2.91, height: 2.95 },
    objects: [
      o('r2_radar','radar',   'Radar',          0.82, 0.10, 0.08, 0.08),
      o('r2_tv',  'custom',  'Television',     1.01, 0.05, 0.89, 0.08),
      o('r2_bed', 'bed',     'Bed',            0.85, 0.30, 1.22, 2.00),
      o('r2_sg',  'cabinet', 'Storage',        0.54, 2.41, 0.46, 0.44),
      o('r2_tbl', 'table',   'Table',          1.52, 2.37, 0.73, 0.50),
      o('r2_d1',  'door',    'Door (upper)',   0.00, 0.23, 0.10, 1.18),
      o('r2_d2',  'door',    'Door (lower)',   0.00, 1.63, 0.10, 1.30),
      o('r2_d3',  'door',    'Door (right)',   2.81, 1.19, 0.10, 0.76),
      o('r2_win', 'window',  'Window',         0.54, 2.87, 1.70, 0.08),
    ],
  },
  {
    id: 'space_003',
    label: 'Sample 2',
    area: '17.11 m²',
    config: { name: 'Space 003', width: 5.41, height: 3.16 },
    objects: [
      o('s3_radar','radar',  'Radar',           2.65, 2.95, 0.08, 0.08),
      o('s3_c1',  'chair',   'Chair',          1.62, 0.15, 0.56, 0.56),
      o('s3_c2',  'chair',   'Chair',          3.55, 0.40, 0.67, 0.46, 45),
      o('s3_sg1', 'cabinet', 'Storage',        4.66, 0.14, 0.61, 0.26),
      o('s3_sg2', 'cabinet', 'Storage',        4.87, 1.15, 0.39, 0.55),
      o('s3_tbl', 'table',   'Table',          0.14, 1.88, 1.22, 0.97),
      o('s3_tv',  'custom',  'Television',     2.23, 3.06, 0.96, 0.10),
      o('s3_d1',  'door',    'Door (left)',    0.00, 1.06, 0.10, 1.05),
      o('s3_d2',  'door',    'Door (top-L)',   1.80, 0.00, 1.63, 0.10),
      o('s3_d3',  'door',    'Door (top-R)',   3.65, 0.00, 0.92, 0.10),
      o('s3_win', 'window',  'Window',         5.31, 1.22, 0.10, 1.14),
    ],
  },
  {
    id: 'morris_bedroom',
    label: 'Sample 3',
    area: '16.25 m²',
    config: {
      name: 'Morris bedroom', width: 5.78, height: 3.53,
      polygon: [
        [0, 0],         // top-left
        [5.76, 0],      // top-right
        [5.76, 3.52],   // bottom-right
        [2.22, 3.52],   // bottom at step
        [2.22, 1.73],   // inner corner
        [0, 1.73],      // left wall at step
      ],
    },
    objects: [
      o('mb_radar','radar',  'KC',              2.22, 1.87, 0.05, 0.23),
      o('mb_bed',  'bed',    'Bed',             3.69, 1.25, 2.07, 1.63),
      o('mb_tv',   'custom', 'Television',      2.40, 2.18, 0.08, 0.87),
      o('mb_sg',   'cabinet','Storage',         2.22, 2.11, 0.52, 0.88),
      o('mb_tbl',  'table',  'Table',           4.93, 2.95, 0.83, 0.57),
      o('mb_d1',   'door',   'Door area',       3.55, 0.00, 1.70, 0.25),
      o('mb_w1',   'window', 'Window area',     4.06, 3.28, 0.81, 0.25),
      o('mb_w2',   'window', 'Window area',     3.14, 3.28, 0.78, 0.25),
    ],
  },
];
