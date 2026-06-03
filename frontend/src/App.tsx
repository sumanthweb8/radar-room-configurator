import { useState, useEffect, useCallback } from 'react';
import type { ObjectType, RoomConfig, RoomObject, AdjacentRoom, WallSide, AdjacentRoomType } from './types';
import { OBJECT_PRESETS, getRadarFacing } from './types';
import { RoomEditor } from './components/RoomEditor';
import { ObjectPalette } from './components/ObjectPalette';
import { PropertiesPanel } from './components/PropertiesPanel';
import { Room3DViewer } from './components/Room3DViewer';
import { ExportModal } from './components/ExportModal';
import { ImportImageModal } from './components/ImportImageModal';

function genId(): string { return Math.random().toString(36).slice(2, 10); }

function buildConfig(objects: RoomObject[], board: string, location: string, room: RoomConfig) {
  const radar   = objects.find(o => o.type === 'radar');
  const originX = radar ? radar.x + radar.width  / 2 : 0;
  const originY = radar ? radar.y + radar.height / 2 : 0;

  // Radar facing direction → rotate coords into radar-local frame
  // Config Y = forward (direction radar faces), Config X = lateral (right of radar)
  const { nx: fwd_x, ny: fwd_y } = radar ? getRadarFacing(radar, room) : { nx: 0, ny: -1 };
  const right_x = -fwd_y, right_y = fwd_x;

  const exportable = objects.filter(o => o.type === 'bed' || o.type === 'door');
  let doorIdx = 0;
  const serialized = exportable.map(obj => {
    // Transform all 4 room corners into radar-local coords, then take bounding box
    const corners = [
      [obj.x,             obj.y],
      [obj.x + obj.width, obj.y],
      [obj.x,             obj.y + obj.height],
      [obj.x + obj.width, obj.y + obj.height],
    ];
    const transformed = corners.map(([rx, ry]) => {
      const dx = rx - originX, dy = ry - originY;
      return [+(dx * right_x + dy * right_y).toFixed(3), +(dx * fwd_x + dy * fwd_y).toFixed(3)];
    });
    const xs = transformed.map(c => c[0]), ys = transformed.map(c => c[1]);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);

    const name = obj.type === 'door' ? `door${++doorIdx}` : 'bed';
    const entry: Record<string, unknown> = {
      name,
      top_left:     [minX, maxY],
      top_right:    [maxX, maxY],
      bottom_left:  [minX, minY],
      bottom_right: [maxX, minY],
      margin_top:    obj.marginTop    ?? 0.3,
      margin_bottom: obj.marginBottom ?? 0.3,
      margin_left:   obj.marginLeft   ?? 0.3,
      margin_right:  obj.marginRight  ?? 0.3,
    };
    if (obj.type === 'bed') {
      entry.top_height    = 0.5;
      entry.bottom_height = 0.5;
      entry.right_width   = 0.5;
      entry.left_width    = 0.5;
    }
    return entry;
  });

  // Clamp margins so detection zones never overlap between objects
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

      // Horizontal: A right ↔ B left
      if (bj.minX >= ai.maxX && yNear) {
        const gap = bj.minX - ai.maxX;
        const half = Math.max(0, +(gap / 2).toFixed(3));
        if ((a.margin_right as number) + (b.margin_left as number) > gap) {
          a.margin_right = Math.min(a.margin_right as number, half);
          b.margin_left  = Math.min(b.margin_left  as number, half);
          clampedPairs.push(`${a.name} ↔ ${b.name} (horizontal gap ${gap.toFixed(2)}m)`);
        }
      }
      // Horizontal: B right ↔ A left
      if (ai.minX >= bj.maxX && yNear) {
        const gap = ai.minX - bj.maxX;
        const half = Math.max(0, +(gap / 2).toFixed(3));
        if ((b.margin_right as number) + (a.margin_left as number) > gap) {
          b.margin_right = Math.min(b.margin_right as number, half);
          a.margin_left  = Math.min(a.margin_left  as number, half);
          clampedPairs.push(`${b.name} ↔ ${a.name} (horizontal gap ${gap.toFixed(2)}m)`);
        }
      }
      // Vertical: A top ↔ B bottom
      if (bj.minY >= ai.maxY && xNear) {
        const gap = bj.minY - ai.maxY;
        const half = Math.max(0, +(gap / 2).toFixed(3));
        if ((a.margin_top as number) + (b.margin_bottom as number) > gap) {
          a.margin_top    = Math.min(a.margin_top    as number, half);
          b.margin_bottom = Math.min(b.margin_bottom as number, half);
          clampedPairs.push(`${a.name} ↔ ${b.name} (vertical gap ${gap.toFixed(2)}m)`);
        }
      }
      // Vertical: B top ↔ A bottom
      if (ai.minY >= bj.maxY && xNear) {
        const gap = ai.minY - bj.maxY;
        const half = Math.max(0, +(gap / 2).toFixed(3));
        if ((b.margin_top as number) + (a.margin_bottom as number) > gap) {
          b.margin_top    = Math.min(b.margin_top    as number, half);
          a.margin_bottom = Math.min(a.margin_bottom as number, half);
          clampedPairs.push(`${b.name} ↔ ${a.name} (vertical gap ${gap.toFixed(2)}m)`);
        }
      }
    }
  }

  const names     = serialized.map(o => o.name as string);
  const bedNames  = names.filter(n => n === 'bed');
  const doorNames = names.filter(n => n.startsWith('door'));

  return {
    device_configs: { board, location },
    objects: serialized,
    _clampedMargins: clampedPairs,
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

/**
 * Room boundary expressed in the radar-local frame (radar at 0,0), using the
 * SAME transform as buildConfig so the zone and object coords align.
 * X = lateral (right of radar), Y = forward (radar facing). Full precision.
 */
function buildZone(objects: RoomObject[], room: RoomConfig): { zone: number[][] } {
  const radar   = objects.find(o => o.type === 'radar');
  const originX = radar ? radar.x + radar.width  / 2 : 0;
  const originY = radar ? radar.y + radar.height / 2 : 0;
  const { nx: fwd_x, ny: fwd_y } = radar ? getRadarFacing(radar, room) : { nx: 0, ny: -1 };
  const right_x = -fwd_y, right_y = fwd_x;

  const boundary: [number, number][] = (room.polygon && room.polygon.length >= 3)
    ? room.polygon
    : [[0, 0], [room.width, 0], [room.width, room.height], [0, room.height]];

  const zone = boundary.map(([rx, ry]) => {
    const dx = rx - originX, dy = ry - originY;
    return [dx * right_x + dy * right_y, dx * fwd_x + dy * fwd_y];
  });
  return { zone };
}

// ── Per-tab state ─────────────────────────────────────────────────────────────

interface TabState {
  id: string;
  label: string;
  area: string;
  room: RoomConfig;
  objects: RoomObject[];
  selectedId: string | null;
  adjacentRooms: AdjacentRoom[];
}

function initTabs(): TabState[] {
  return [{
    id:            'room_1',
    label:         'Room 1',
    area:          '',
    room:          { name: 'Room 1', width: 4, height: 4 },
    objects:       [],
    selectedId:    null,
    adjacentRooms: [],
  }];
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [tabs,       setTabs]       = useState<TabState[]>(initTabs);
  const [activeIdx,  setActiveIdx]  = useState(0);
  const [viewer,     setViewer]     = useState<null | { simulate: boolean }>(null);
  const [showExport, setShowExport] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [dark,       setDark]       = useState(true);
  const [marginAlert, setMarginAlert] = useState<string[] | null>(null);

  // Add a radar at a plan-space centre (used by the simulator's Suggest feature).
  const addRadarAtCenter = useCallback((pos: { x: number; y: number }) => {
    const preset = OBJECT_PRESETS['radar'];
    setTabs(prev => prev.map((t, i) => {
      if (i !== activeIdx) return t;
      const n = t.objects.filter(o => o.type === 'radar').length + 1;
      const obj: RoomObject = {
        id: genId(), type: 'radar', label: `Radar ${n}`,
        x: pos.x - preset.defaultWidth / 2, y: pos.y - preset.defaultHeight / 2,
        width: preset.defaultWidth, height: preset.defaultHeight,
        color: preset.color, rotation: 0,
        marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0,
      };
      return { ...t, objects: [...t.objects, obj], selectedId: obj.id };
    }));
  }, [activeIdx]);

  // ── Helpers to patch the active tab ────────────────────────────────────────
  function patchTab(patch: Partial<TabState>) {
    setTabs(prev => prev.map((t, i) => i === activeIdx ? { ...t, ...patch } : t));
  }

  const tab = tabs[activeIdx];
  const { room, objects, selectedId, adjacentRooms } = tab;
  const selectedObject = objects.find(o => o.id === selectedId) ?? null;
  const radarObj       = objects.find(o => o.type === 'radar')  ?? null;

  // Detect margin overlaps whenever objects change (from import, add, move, etc.)
  const [exportPreview, setExportPreview] = useState<Record<string, unknown>[] | null>(null);
  useEffect(() => {
    const exportable = objects.filter(o => o.type === 'bed' || o.type === 'door');
    if (exportable.length < 2) { setMarginAlert(null); setExportPreview(null); return; }
    const config = buildConfig(objects, '<board>', room.name || '', room) as any;
    const clamped: string[] = config._clampedMargins || [];
    delete config._clampedMargins;
    setExportPreview(config.objects || []);
    setMarginAlert(clamped.length > 0 ? clamped : null);
  }, [objects, room]);

  // ── Object handlers (all scoped to active tab) ──────────────────────────────
  function handleAdd(type: ObjectType) {
    const p = OBJECT_PRESETS[type];
    const obj: RoomObject = {
      id: genId(), type, label: p.label,
      x: Math.max(0, (room.width  - p.defaultWidth)  / 2),
      y: Math.max(0, (room.height - p.defaultHeight) / 2),
      width: p.defaultWidth, height: p.defaultHeight,
      color: p.color, rotation: 0,
      marginTop: 0,
      marginBottom: type === 'bed' ? 0.5 : 0,
      marginLeft: type === 'bed' ? 0.5 : 0,
      marginRight: type === 'bed' ? 0.5 : 0,
    };
    patchTab({ objects: [...objects, obj], selectedId: obj.id });
  }

  function handleUpdate(id: string, patch: Partial<RoomObject>) {
    patchTab({ objects: objects.map(o => o.id === id ? { ...o, ...patch } : o) });
  }

  function handleDelete(id: string) {
    patchTab({
      objects: objects.filter(o => o.id !== id),
      adjacentRooms: adjacentRooms.filter(r => r.doorId !== id),
      selectedId: null,
    });
  }

  function makeRoomObjects(rawObjects: any[]): RoomObject[] {
    return (rawObjects ?? []).map((o: any) => {
      const type: ObjectType = o.type in OBJECT_PRESETS ? o.type : 'custom';
      const preset = OBJECT_PRESETS[type];
      return {
        id: genId(), type,
        label: o.label ?? preset.label,
        x: +(o.x ?? 0), y: +(o.y ?? 0),
        width:  +(o.width  ?? preset.defaultWidth),
        height: +(o.height ?? preset.defaultHeight),
        color: preset.color, rotation: o.rotation ?? 0,
        marginTop:    +(o.marginTop    ?? 0),
        marginBottom: +(o.marginBottom ?? (type === 'bed' ? 0.5 : 0)),
        marginLeft:   +(o.marginLeft   ?? (type === 'bed' ? 0.5 : 0)),
        marginRight:  +(o.marginRight  ?? (type === 'bed' ? 0.5 : 0)),
      };
    });
  }

  function handleImportData(data: any) {
    // ── Multi-room PDF import — create one new tab per room ──────────────────
    if (data.rooms && Array.isArray(data.rooms)) {
      const newTabs: TabState[] = data.rooms.map((r: any) => {
        const w = +(r.room.width  ?? 4);
        const h = +(r.room.height ?? 4);
        const area = (w * h).toFixed(2) + ' m²';
        return {
          id:           genId(),
          label:        r.room.name ?? 'Imported Room',
          area,
          room:         { name: r.room.name, width: w, height: h, polygon: r.room.polygon },
          objects:      makeRoomObjects(r.objects),
          selectedId:   null,
          adjacentRooms: [],
        };
      });
      setTabs(prev => {
        const next = [...prev, ...newTabs];
        setActiveIdx(next.length - 1); // jump to last imported tab
        return next;
      });
      setShowImport(false);
      return;
    }

    // ── Single-room import (image/Claude) — patch the active tab ────────────
    patchTab({
      room: { name: data.room.name, width: data.room.width, height: data.room.height },
      objects: makeRoomObjects(data.objects),
      selectedId: null,
      adjacentRooms: [],
    });
    setShowImport(false);
    setViewer({ simulate: false });
  }

  function handleAddAdjacentRoom(doorId: string, wall: WallSide, width: number, height: number, roomType: AdjacentRoomType) {
    const defaultName = roomType === 'bathroom' ? 'Bathroom' : roomType === 'passage' ? 'Passage' : 'Room';
    const ar: AdjacentRoom = { id: genId(), doorId, wall, name: defaultName, roomType, width, height };
    patchTab({ adjacentRooms: [...adjacentRooms, ar] });
  }

  function handleUpdateAdjacentRoom(id: string, patch: Partial<AdjacentRoom>) {
    patchTab({ adjacentRooms: adjacentRooms.map(r => r.id === id ? { ...r, ...patch } : r) });
  }

  function handleRemoveAdjacentRoom(id: string) {
    patchTab({ adjacentRooms: adjacentRooms.filter(r => r.id !== id) });
  }

  function downloadJson(data: unknown, filename: string) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleExportConfirm(board: string, location: string) {
    setShowExport(false);
    const base = `${board}_${tab.label.replace(/\s+/g, '_')}`;

    const config = buildConfig(objects, board, location, room) as any;
    const clamped: string[] = config._clampedMargins || [];
    delete config._clampedMargins;
    downloadJson(config, `${base}_config.json`);

    // Second file: room boundary in the radar-local frame (radar at 0,0).
    const zone = buildZone(objects, room);
    setTimeout(() => downloadJson(zone, `${base}_zone.json`), 150);

    if (clamped.length > 0) setMarginAlert(clamped);
  }

  function handleAddTab() {
    const n = tabs.length + 1;
    const newTab: TabState = {
      id: genId(),
      label: `Room ${String(n).padStart(3, '0')}`,
      area: '0 m²',
      room: { name: `Room ${n}`, width: 4, height: 4 },
      objects: [],
      selectedId: null,
      adjacentRooms: [],
    };
    setTabs(prev => [...prev, newTab]);
    setActiveIdx(tabs.length);
  }

  function handleDeleteTab(idx: number) {
    if (tabs.length === 1) return; // always keep at least one tab
    const next = tabs.filter((_, i) => i !== idx);
    setTabs(next);
    setActiveIdx(Math.min(activeIdx, next.length - 1));
  }

  function toggleDark() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
  }

  const border    = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)';
  const tabBarBg  = dark ? 'rgba(13,17,23,0.97)'   : 'rgba(255,255,255,0.97)';
  const textMuted = dark ? '#475569'                : '#94a3b8';

  return (
    <div className={`flex flex-col h-screen overflow-hidden ${dark ? 'dark' : ''}`}
      style={{ background: dark ? '#0d1117' : '#f8fafc', color: dark ? '#e2e8f0' : '#0f172a' }}
    >
      {/* Gradient cap */}
      <div className="h-[2px] shrink-0" style={{ background: 'linear-gradient(90deg, #c8506b, #a03050, #c8506b)' }} />

      {marginAlert && (
        <div style={{ background: 'rgba(234,179,8,0.15)', border: '1px solid rgba(234,179,8,0.4)', padding: '10px 16px', display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 12, color: '#eab308', flexShrink: 0 }}>
          <span style={{ fontSize: 16, lineHeight: 1 }}>⚠</span>
          <div style={{ flex: 1 }}>
            <strong style={{ fontSize: 12 }}>Margins auto-adjusted to prevent overlap</strong>
            <div style={{ marginTop: 4, color: dark ? '#a3a3a3' : '#737373', lineHeight: 1.5 }}>
              {marginAlert.map((msg, i) => <div key={i}>{msg}</div>)}
            </div>
          </div>
          <button onClick={() => setMarginAlert(null)} style={{ background: 'none', border: 'none', color: '#eab308', cursor: 'pointer', fontSize: 16, padding: 0, lineHeight: 1 }}>×</button>
        </div>
      )}

      {/* ── Header ── */}
      <header style={{ background: tabBarBg, borderBottom: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 18px', height: 52, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Kubocare logo mark */}
          <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg,#c8506b,#a03050)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(200,80,107,0.45)', flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="rgba(255,255,255,0.15)" />
              <path d="M8 8h3v8H8zM13 8h3v4h-3zM13 14h3v2h-3z" fill="white" />
            </svg>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 700, letterSpacing: '-0.01em', color: dark ? '#f1f5f9' : '#0f172a', fontFamily: "'Sora', sans-serif" }}>
              Kubocare <span style={{ color: '#c8506b' }}>Room Config</span>
            </p>
            <p style={{ margin: 0, fontSize: 10, color: textMuted }}>
              {tab.label} · {objects.length} objects · {room.width} × {room.height} m
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button onClick={toggleDark} style={{ width: 32, height: 32, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, cursor: 'pointer', background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)', border: `1px solid ${border}`, transition: 'all 0.15s' }}>
            {dark ? '☀️' : '🌙'}
          </button>

          {objects.length > 0 && (
            <button onClick={() => { if (window.confirm(`Clear all objects in ${tab.label}?`)) patchTab({ objects: [], selectedId: null }); }}
              style={{ padding: '5px 12px', borderRadius: 8, fontSize: 11, fontWeight: 500, color: textMuted, cursor: 'pointer', background: 'transparent', border: `1px solid ${border}`, transition: 'all 0.15s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#f87171'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(248,113,113,0.4)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = textMuted; (e.currentTarget as HTMLButtonElement).style.borderColor = border; }}
            >Clear</button>
          )}

          <button onClick={() => setShowImport(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 13px', borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: 'pointer', background: dark ? 'rgba(16,185,129,0.1)' : 'rgba(16,185,129,0.08)', color: '#10b981', border: '1px solid rgba(16,185,129,0.25)', transition: 'all 0.15s' }}
          >🗺 Import</button>

          <button onClick={() => setViewer({ simulate: false })} disabled={objects.length === 0}
            style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 13px', borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: objects.length === 0 ? 'not-allowed' : 'pointer', opacity: objects.length === 0 ? 0.35 : 1, background: dark ? 'rgba(6,182,212,0.1)' : 'rgba(6,182,212,0.08)', color: '#06b6d4', border: '1px solid rgba(6,182,212,0.25)', transition: 'all 0.15s' }}
          >⬡ 3D</button>

          <button onClick={() => setViewer({ simulate: true })} disabled={objects.length === 0}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 18px', borderRadius: 9, fontSize: 13, fontWeight: 700, cursor: objects.length === 0 ? 'not-allowed' : 'pointer', opacity: objects.length === 0 ? 0.35 : 1, color: '#fff', background: 'linear-gradient(135deg,#a855f7,#7c3aed)', boxShadow: objects.length > 0 ? '0 3px 14px rgba(168,85,247,0.45)' : 'none', border: 'none', transition: 'all 0.15s' }}
          >▶ Simulate</button>

          <button onClick={() => setShowExport(true)} disabled={objects.length === 0}
            style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 16px', borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: objects.length === 0 ? 'not-allowed' : 'pointer', opacity: objects.length === 0 ? 0.35 : 1, color: '#fff', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: objects.length > 0 ? '0 2px 12px rgba(99,102,241,0.45)' : 'none', border: 'none', transition: 'all 0.15s' }}
          >↓ Export</button>
        </div>
      </header>

      {/* ── Room tabs ── */}
      <div style={{
        display: 'flex', alignItems: 'stretch',
        padding: '0 16px',
        background: tabBarBg,
        borderBottom: `1px solid ${border}`,
        flexShrink: 0,
        overflowX: 'auto',
        gap: 4,
      }}>
        {tabs.map((t, idx) => {
          const active = idx === activeIdx;
          return (
            <div
              key={t.id}
              style={{
                display: 'flex', alignItems: 'center',
                height: 40,
                borderBottom: active ? '2px solid #6366f1' : '2px solid transparent',
                background: active
                  ? (dark ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.07)')
                  : 'transparent',
                borderRadius: '6px 6px 0 0',
                transition: 'all 0.15s',
                flexShrink: 0,
                cursor: 'pointer',
              }}
              onMouseEnter={e => { if (!active) (e.currentTarget as HTMLDivElement).style.background = dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)'; }}
              onMouseLeave={e => { if (!active) (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
              onClick={() => setActiveIdx(idx)}
            >
              {/* Tab content */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '0 8px 0 14px' }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                  background: active ? '#818cf8' : (dark ? '#334155' : '#cbd5e1'),
                  boxShadow: active ? '0 0 6px #6366f1' : 'none',
                  transition: 'all 0.15s',
                }} />
                <span style={{
                  fontSize: 12, fontWeight: active ? 700 : 500,
                  color: active ? (dark ? '#a5b4fc' : '#4f46e5') : textMuted,
                  whiteSpace: 'nowrap',
                }}>{t.label}</span>
                <span style={{
                  fontSize: 9, fontWeight: 600, padding: '2px 6px', borderRadius: 99,
                  background: active ? 'rgba(99,102,241,0.2)' : (dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'),
                  color: active ? '#818cf8' : textMuted,
                }}>{t.objects.length}</span>
              </div>

              {/* Close button */}
              {tabs.length > 1 && (
                <button
                  onClick={e => { e.stopPropagation(); handleDeleteTab(idx); }}
                  style={{
                    width: 18, height: 18, marginRight: 6, borderRadius: 4,
                    border: 'none', background: 'transparent', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, color: active ? '#94a3b8' : textMuted,
                    flexShrink: 0, transition: 'all 0.12s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(248,113,113,0.18)'; (e.currentTarget as HTMLButtonElement).style.color = '#f87171'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = active ? '#94a3b8' : textMuted; }}
                >✕</button>
              )}
            </div>
          );
        })}

        {/* Add tab button */}
        <button
          onClick={handleAddTab}
          style={{
            height: 40, padding: '0 12px', border: 'none', background: 'transparent',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, color: textMuted, flexShrink: 0, transition: 'all 0.15s',
            borderBottom: '2px solid transparent',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#818cf8'; (e.currentTarget as HTMLButtonElement).style.background = dark ? 'rgba(99,102,241,0.08)' : 'rgba(99,102,241,0.06)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = textMuted; (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
          title="Add new room tab"
        >+</button>
      </div>

      {/* ── Main layout ── */}
      <div className="flex flex-1 overflow-hidden">
        <ObjectPalette room={room} onRoomChange={r => patchTab({ room: r })} onAdd={handleAdd} dark={dark} />

        <main className="flex-1 relative overflow-hidden">
          <RoomEditor
            key={tab.id}
            room={room}
            objects={objects}
            selectedId={selectedId}
            onSelect={id => patchTab({ selectedId: id })}
            onUpdate={handleUpdate}
            dark={dark}
            adjacentRooms={adjacentRooms}
            radarObj={radarObj}
          />
        </main>

        <PropertiesPanel
          object={selectedObject} objects={objects} room={room} dark={dark}
          onUpdate={patch => selectedId && handleUpdate(selectedId, patch)}
          onDelete={() => selectedId && handleDelete(selectedId)}
          onDeselect={() => patchTab({ selectedId: null })}
          adjacentRooms={adjacentRooms}
          onAddAdjacentRoom={handleAddAdjacentRoom}
          onUpdateAdjacentRoom={handleUpdateAdjacentRoom}
          onRemoveAdjacentRoom={handleRemoveAdjacentRoom}
          radarObj={radarObj}
        />
      </div>

      {viewer && <Room3DViewer room={room} objects={objects} simulate={viewer.simulate} onAddRadar={addRadarAtCenter} onClose={() => setViewer(null)} />}

      {showImport && (
        <ImportImageModal dark={dark} onImport={handleImportData} onCancel={() => setShowImport(false)} />
      )}

      {showExport && (
        <ExportModal dark={dark} onConfirm={handleExportConfirm} onCancel={() => setShowExport(false)} objectsPreview={exportPreview} marginWarnings={marginAlert} />
      )}
    </div>
  );
}
