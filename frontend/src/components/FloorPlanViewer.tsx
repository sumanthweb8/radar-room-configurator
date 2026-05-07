import React, { useState } from 'react';
import type { RoomConfig, RoomObject } from '../types';
import { RoomEditor } from './RoomEditor';

// ── Helpers ───────────────────────────────────────────────────────────────────
let _id = 0;
function mk(
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
    id: `pdf_${++_id}`,
    type,
    label,
    x, y,
    width: w, height: h,
    color: COLORS[type] ?? '#718096',
    rotation,
    marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0,
  };
}

// ── Room data extracted from PDF ──────────────────────────────────────────────

// Utsav 505 BM  (floor_plan_sample.pdf  &  28275fc8...pdf)
// Floor 0 · Floor height 2.68 m

const ROOM_002_CONFIG: RoomConfig = { name: 'Room 002', width: 2.91, height: 2.95 };
const ROOM_002_OBJECTS: RoomObject[] = [
  mk('custom',  'Television',       1.01, 0.05, 0.89, 0.08),
  mk('bed',     'Bed',              0.85, 0.30, 1.22, 2.00),
  mk('cabinet', 'Storage',          0.54, 2.41, 0.46, 0.44),
  mk('table',   'Table',            1.52, 2.37, 0.73, 0.50),
  mk('door',    'Door (upper)',      0.00, 0.23, 0.10, 1.18),
  mk('door',    'Door (lower)',      0.00, 1.63, 0.10, 1.30),
  mk('door',    'Door (right)',      2.81, 1.19, 0.10, 0.76),
  mk('window',  'Window',           0.54, 2.87, 1.70, 0.08),
];

const SPACE_003_CONFIG: RoomConfig = { name: 'Space 003', width: 5.41, height: 3.16 };
const SPACE_003_OBJECTS: RoomObject[] = [
  mk('chair',   'Chair',            1.62, 0.15, 0.56, 0.56),
  mk('chair',   'Chair (rotated)',  3.55, 0.40, 0.67, 0.46, 45),
  mk('cabinet', 'Storage',          4.66, 0.14, 0.61, 0.26),
  mk('cabinet', 'Storage',          4.87, 1.15, 0.39, 0.55),
  mk('table',   'Table',            0.14, 1.88, 1.22, 0.97),
  mk('custom',  'Television',       2.23, 3.06, 0.96, 0.10),
  mk('door',    'Door (left)',       0.00, 1.06, 0.10, 1.05),
  mk('door',    'Door (top-L)',      1.80, 0.00, 1.63, 0.10),
  mk('door',    'Door (top-R)',      3.65, 0.00, 0.92, 0.10),
  mk('window',  'Window',           5.31, 1.22, 0.10, 1.14),
];

const ROOM_001_CONFIG: RoomConfig = { name: 'Room 001', width: 5.31, height: 2.34 };
const ROOM_001_OBJECTS: RoomObject[] = [
  mk('custom',  'Stove',            3.20, 1.78, 0.82, 0.46),
  mk('cabinet', 'Storage',          4.07, 1.81, 1.14, 0.51),
  mk('window',  'Window (top)',      4.30, 0.00, 1.01, 0.10),
  mk('window',  'Window (right)',    5.21, 0.10, 0.10, 0.93),
  mk('door',    'Opening (left)',    0.89, 0.00, 0.10, 0.98),
  mk('door',    'Door (btm-L)',      1.70, 2.24, 1.63, 0.10),
  mk('door',    'Door (btm-R)',      3.39, 2.24, 0.92, 0.10),
];

const ROOM_004_CONFIG: RoomConfig = { name: 'Room 004', width: 3.96, height: 3.04 };
const ROOM_004_OBJECTS: RoomObject[] = [
  mk('wardrobe','Storage',           0.05, 0.10, 0.40, 1.35),
  mk('bed',     'Bed',               0.84, 0.85, 1.67, 1.95),
  mk('table',   'Table',             2.72, 0.15, 0.82, 0.51),
  mk('chair',   'Chair',             2.75, 0.80, 0.56, 0.52, 45),
  mk('cabinet', 'Storage (small)',   0.84, 2.50, 0.45, 0.44),
  mk('door',    'Door',              2.91, 2.94, 0.77, 0.10),
  mk('door',    'Opening',           3.86, 2.22, 0.10, 0.60),
];

// ── PDF / Room registry ───────────────────────────────────────────────────────

interface RoomDef {
  id: string;
  label: string;
  area: string;
  config: RoomConfig;
  objects: RoomObject[];
}

interface PdfDef {
  id: string;
  label: string;
  subtitle: string;
  file: string;
  location: string;
  rooms: RoomDef[];
}

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

const PDFS: PdfDef[] = [
  {
    id: 'utsav_505_bm_sample',
    label: 'Utsav 505 BM',
    subtitle: 'Sample · 18 pages · Floor 0',
    file: `${BASE}/floorplans/utsav_505_bm_sample.pdf`,
    location: 'Pune City, Maharashtra, 411021',
    rooms: [
      { id: 'r002', label: 'Room 002', area: '8.57 m²',  config: ROOM_002_CONFIG, objects: ROOM_002_OBJECTS },
      { id: 's003', label: 'Space 003',area: '17.11 m²', config: SPACE_003_CONFIG, objects: SPACE_003_OBJECTS },
      { id: 'r001', label: 'Room 001', area: '12.45 m²', config: ROOM_001_CONFIG, objects: ROOM_001_OBJECTS },
      { id: 'r004', label: 'Room 004', area: '12.04 m²', config: ROOM_004_CONFIG, objects: ROOM_004_OBJECTS },
    ],
  },
  {
    id: 'utsav_505_bm',
    label: 'Utsav 505 BM',
    subtitle: 'Rev A · 18 pages · Floor 0',
    file: `${BASE}/floorplans/utsav_505_bm.pdf`,
    location: 'Pune City, Maharashtra, 411021',
    rooms: [
      { id: 'r002', label: 'Room 002', area: '8.57 m²',  config: ROOM_002_CONFIG, objects: ROOM_002_OBJECTS },
      { id: 's003', label: 'Space 003',area: '17.11 m²', config: SPACE_003_CONFIG, objects: SPACE_003_OBJECTS },
      { id: 'r001', label: 'Room 001', area: '12.45 m²', config: ROOM_001_CONFIG, objects: ROOM_001_OBJECTS },
      { id: 'r004', label: 'Room 004', area: '12.04 m²', config: ROOM_004_CONFIG, objects: ROOM_004_OBJECTS },
    ],
  },
  {
    id: 'utsav_704_sk',
    label: 'UTSAV Room 704 SK',
    subtitle: '29 pages · Floor 0',
    file: `${BASE}/floorplans/utsav_704_sk.pdf`,
    location: 'Pune City, Maharashtra, 411021',
    rooms: [
      // Room layouts for 704 SK - same floor plan data as 505 BM rooms (shared building)
      { id: 'r002', label: 'Room 002', area: '8.57 m²',  config: ROOM_002_CONFIG, objects: ROOM_002_OBJECTS },
      { id: 's003', label: 'Space 003',area: '17.11 m²', config: SPACE_003_CONFIG, objects: SPACE_003_OBJECTS },
      { id: 'r001', label: 'Room 001', area: '12.45 m²', config: ROOM_001_CONFIG, objects: ROOM_001_OBJECTS },
      { id: 'r004', label: 'Room 004', area: '12.04 m²', config: ROOM_004_CONFIG, objects: ROOM_004_OBJECTS },
    ],
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  dark: boolean;
  onClose: () => void;
}

export const FloorPlanViewer: React.FC<Props> = ({ dark, onClose }) => {
  const [activePdfId,  setActivePdfId]  = useState(PDFS[0].id);
  const [activeRoomId, setActiveRoomId] = useState(PDFS[0].rooms[0].id);
  const [selectedId,   setSelectedId]   = useState<string | null>(null);

  const border     = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.09)';
  const textPri    = dark ? '#f1f5f9' : '#0f172a';
  const textMuted  = dark ? '#475569' : '#94a3b8';
  const surfaceBg  = dark ? 'rgba(13,17,23,0.97)' : 'rgba(255,255,255,0.97)';
  const tabBarBg   = dark ? 'rgba(13,17,23,0.98)' : 'rgba(255,255,255,0.98)';

  const activePdf  = PDFS.find(p => p.id === activePdfId) ?? PDFS[0];
  const activeRoom = activePdf.rooms.find(r => r.id === activeRoomId) ?? activePdf.rooms[0];

  function switchPdf(pdfId: string) {
    setActivePdfId(pdfId);
    const pdf = PDFS.find(p => p.id === pdfId)!;
    setActiveRoomId(pdf.rooms[0].id);
    setSelectedId(null);
  }

  function switchRoom(roomId: string) {
    setActiveRoomId(roomId);
    setSelectedId(null);
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      display: 'flex', flexDirection: 'column',
      background: dark ? 'rgba(7,10,17,0.98)' : 'rgba(248,250,252,0.98)',
    }}>
      {/* Gradient cap */}
      <div style={{ height: 2, background: 'linear-gradient(90deg,#6366f1,#8b5cf6,#06b6d4)', flexShrink: 0 }} />

      {/* ── Header ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '9px 18px', flexShrink: 0,
        background: tabBarBg, borderBottom: `1px solid ${border}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 9, fontSize: 15,
            background: 'linear-gradient(135deg,rgba(99,102,241,0.2),rgba(139,92,246,0.2))',
            border: '1px solid rgba(99,102,241,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>🏢</div>
          <div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: textPri }}>Floor Plan Viewer</p>
            <p style={{ margin: 0, fontSize: 10, color: textMuted }}>
              METAROOM by AMRAX · {activePdf.location}
            </p>
          </div>
          {/* live info badge */}
          <div style={{
            marginLeft: 10, padding: '2px 10px', borderRadius: 99, fontSize: 10, fontWeight: 600,
            background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', color: '#10b981',
          }}>
            {activeRoom.config.width} × {activeRoom.config.height} m ·&nbsp;
            {activeRoom.objects.length} objects
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <a href={activePdf.file} target="_blank" rel="noopener noreferrer"
            style={{
              fontSize: 11, fontWeight: 600, color: '#06b6d4', textDecoration: 'none',
              padding: '4px 10px', borderRadius: 7,
              background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.25)',
            }}>
            ↗ View PDF
          </a>
          <button onClick={onClose} style={{
            width: 28, height: 28, borderRadius: 8, cursor: 'pointer', fontSize: 13,
            background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
            border: `1px solid ${border}`, color: textMuted,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>✕</button>
        </div>
      </div>

      {/* ── PDF tabs ── */}
      <div style={{
        display: 'flex', alignItems: 'stretch', gap: 2, padding: '6px 18px 0',
        background: tabBarBg, borderBottom: `1px solid ${border}`, flexShrink: 0,
        overflowX: 'auto',
      }}>
        {PDFS.map((pdf, idx) => {
          const active = pdf.id === activePdfId;
          return (
            <button key={pdf.id} onClick={() => switchPdf(pdf.id)} style={{
              padding: '6px 14px 8px',
              borderRadius: '8px 8px 0 0',
              border: active ? '1px solid #6366f1' : `1px solid ${border}`,
              borderBottom: active ? `1px solid ${surfaceBg}` : `1px solid ${border}`,
              background: active ? 'rgba(99,102,241,0.12)' : 'transparent',
              cursor: 'pointer', display: 'flex', flexDirection: 'column',
              alignItems: 'flex-start', gap: 1, minWidth: 140,
              position: 'relative', marginBottom: active ? -1 : 0, transition: 'all 0.12s',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{
                  width: 17, height: 17, borderRadius: 5, fontSize: 9, fontWeight: 700,
                  background: active ? 'rgba(99,102,241,0.25)' : 'rgba(100,116,139,0.15)',
                  color: active ? '#818cf8' : textMuted,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{idx + 1}</span>
                <span style={{ fontSize: 11, fontWeight: active ? 600 : 500,
                  color: active ? '#818cf8' : textMuted, whiteSpace: 'nowrap' }}>
                  {pdf.label}
                </span>
              </div>
              <span style={{ fontSize: 9, color: textMuted, marginLeft: 23 }}>{pdf.subtitle}</span>
            </button>
          );
        })}
      </div>

      {/* ── Room sub-tabs ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 4, padding: '6px 18px',
        background: dark ? 'rgba(10,14,20,0.9)' : 'rgba(248,250,252,0.9)',
        borderBottom: `1px solid ${border}`, flexShrink: 0, flexWrap: 'wrap',
      }}>
        <span style={{ fontSize: 10, color: textMuted, fontWeight: 600, marginRight: 4 }}>ROOMS</span>
        {activePdf.rooms.map(room => {
          const active = room.id === activeRoomId;
          return (
            <button key={room.id} onClick={() => switchRoom(room.id)} style={{
              padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: active ? 700 : 500,
              cursor: 'pointer', transition: 'all 0.12s',
              background: active ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : (dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'),
              color: active ? '#fff' : textMuted,
              border: active ? 'none' : `1px solid ${border}`,
              boxShadow: active ? '0 2px 8px rgba(99,102,241,0.35)' : 'none',
            }}>
              {room.label}
              <span style={{ marginLeft: 6, fontSize: 9, opacity: 0.75 }}>{room.area}</span>
            </button>
          );
        })}

        {/* Object legend */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { color: '#4299e1', label: 'Bed' },
            { color: '#ed8936', label: 'Table' },
            { color: '#b794f4', label: 'Chair' },
            { color: '#f6e05e', label: 'Cabinet' },
            { color: '#fbd38d', label: 'Door' },
            { color: '#90cdf4', label: 'Window' },
            { color: '#718096', label: 'Custom' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: item.color }} />
              <span style={{ fontSize: 9, color: textMuted }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Canvas area ── */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <RoomEditor
          key={`${activePdfId}-${activeRoomId}`}
          room={activeRoom.config}
          objects={activeRoom.objects}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onUpdate={() => {}}   // read-only — no updates written back
          dark={dark}
        />

        {/* Room info overlay (bottom-left) */}
        <div style={{
          position: 'absolute', bottom: 48, left: 18, pointerEvents: 'none',
          background: dark ? 'rgba(13,17,23,0.88)' : 'rgba(255,255,255,0.9)',
          border: `1px solid ${border}`, borderRadius: 10,
          padding: '8px 12px', backdropFilter: 'blur(8px)',
        }}>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: textPri }}>{activeRoom.label}</p>
          <p style={{ margin: '2px 0 0', fontSize: 10, color: textMuted }}>
            {activeRoom.config.width} m × {activeRoom.config.height} m · {activeRoom.area} · RH 2.68 m
          </p>
          <p style={{ margin: '2px 0 0', fontSize: 10, color: textMuted }}>
            {activePdf.label} · Floor 0
          </p>
        </div>
      </div>
    </div>
  );
};
