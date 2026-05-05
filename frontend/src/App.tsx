import { useEffect, useMemo, useState } from 'react';
import type { ObjectType, RoomConfig, RoomObject, AdjacentRoom, WallSide, AdjacentRoomType } from './types';
import { OBJECT_PRESETS } from './types';
import { buildConfig, MissingRadarError } from './buildConfig';
import {
  type House, type Room,
  addRoom as addRoomToHouse,
  createEmptyRoom,
  getActiveRoom,
  removeRoom as removeRoomFromHouse,
  setActiveRoom,
  updateRoom,
  validateRoomForExport,
} from './houseModel';
import { loadOrCreate, saveHouse } from './houseStorage';
import { type MetaroomImportResponse } from './api';
import { RoomEditor } from './components/RoomEditor';
import { ObjectPalette } from './components/ObjectPalette';
import { PropertiesPanel } from './components/PropertiesPanel';
import { Room3DViewer } from './components/Room3DViewer';
import { ExportModal } from './components/ExportModal';
import { ImportImageModal } from './components/ImportImageModal';

function genId(): string { return Math.random().toString(36).slice(2, 10); }

function emptyMargins() {
  return { marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 };
}

function makeObject(type: ObjectType, label: string, x: number, y: number, w: number, h: number, rotation = 0): RoomObject {
  const preset = OBJECT_PRESETS[type];
  return {
    id: genId(), type, label,
    x, y, width: w, height: h,
    color: preset.color,
    rotation,
    ...emptyMargins(),
  };
}

function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function App() {
  const [house,       setHouse]      = useState<House>(loadOrCreate);
  const [selectedId,  setSelectedId] = useState<string | null>(null);
  const [show3D,      setShow3D]     = useState(false);
  const [showExport,  setShowExport] = useState(false);
  const [showImport,  setShowImport] = useState(false);
  const [dark,        setDark]       = useState(true);

  // Persist house to localStorage on every change.
  useEffect(() => { saveHouse(house); }, [house]);

  const activeRoom = useMemo(() => getActiveRoom(house), [house]);

  function patchActive(patch: Partial<Room>) {
    if (!activeRoom) return;
    setHouse(h => updateRoom(h, activeRoom.id, patch));
  }

  function toggleDark() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
  }

  // ── object handlers (operate on the active room) ────────────────────────────
  const objects        = activeRoom?.objects ?? [];
  const adjacentRooms  = activeRoom?.adjacentRooms ?? [];
  const room           = activeRoom?.config ?? { name: 'Room', width: 4, height: 4 };
  const selectedObject = objects.find(o => o.id === selectedId) ?? null;
  const radarObj       = objects.find(o => o.type === 'radar') ?? null;

  function setRoomConfig(next: RoomConfig) {
    patchActive({ config: next, name: next.name });
  }

  function handleAdd(type: ObjectType) {
    if (!activeRoom) return;
    const p = OBJECT_PRESETS[type];
    const obj = makeObject(
      type, p.label,
      Math.max(0, (room.width  - p.defaultWidth)  / 2),
      Math.max(0, (room.height - p.defaultHeight) / 2),
      p.defaultWidth, p.defaultHeight,
    );
    patchActive({ objects: [...objects, obj] });
    setSelectedId(obj.id);
  }

  function handleUpdate(id: string, patch: Partial<RoomObject>) {
    patchActive({ objects: objects.map(o => o.id === id ? { ...o, ...patch } : o) });
  }

  function handleDelete(id: string) {
    patchActive({
      objects: objects.filter(o => o.id !== id),
      adjacentRooms: adjacentRooms.filter(r => r.doorId !== id),
    });
    setSelectedId(null);
  }

  // ── adjacent rooms ──────────────────────────────────────────────────────────
  function handleAddAdjacentRoom(doorId: string, wall: WallSide, width: number, height: number, roomType: AdjacentRoomType) {
    const defaultName = roomType === 'bathroom' ? 'Bathroom' : roomType === 'passage' ? 'Passage' : 'Room';
    const ar: AdjacentRoom = { id: genId(), doorId, wall, name: defaultName, roomType, width, height };
    patchActive({ adjacentRooms: [...adjacentRooms, ar] });
  }

  function handleUpdateAdjacentRoom(id: string, patch: Partial<AdjacentRoom>) {
    patchActive({ adjacentRooms: adjacentRooms.map(r => r.id === id ? { ...r, ...patch } : r) });
  }

  function handleRemoveAdjacentRoom(id: string) {
    patchActive({ adjacentRooms: adjacentRooms.filter(r => r.id !== id) });
  }

  // ── room rail handlers ──────────────────────────────────────────────────────
  function handleAddRoom() {
    const next = createEmptyRoom({ name: `Room ${house.rooms.length + 1}` });
    setHouse(h => addRoomToHouse(h, next));
    setSelectedId(null);
  }

  function handleSwitchRoom(id: string) {
    setHouse(h => setActiveRoom(h, id));
    setSelectedId(null);
  }

  function handleRemoveRoom(id: string) {
    if (!window.confirm('Remove this room?')) return;
    setHouse(h => removeRoomFromHouse(h, id));
    setSelectedId(null);
  }

  // ── import (image OR Metaroom PDF response) ─────────────────────────────────
  function importedObjectFrom(o: any): RoomObject {
    const type: ObjectType = o.type in OBJECT_PRESETS ? o.type : 'custom';
    const preset = OBJECT_PRESETS[type];
    return {
      id: genId(),
      type,
      label: o.label ?? preset.label,
      x: +(o.x ?? 0),
      y: +(o.y ?? 0),
      width:  +(o.width  ?? preset.defaultWidth),
      height: +(o.height ?? preset.defaultHeight),
      color: preset.color,
      rotation: o.rotation ?? 0,
      marginTop:    +(o.marginTop    ?? 0),
      marginBottom: +(o.marginBottom ?? 0),
      marginLeft:   +(o.marginLeft   ?? 0),
      marginRight:  +(o.marginRight  ?? 0),
    };
  }

  function handleImportImage(data: { room: { name: string; width: number; height: number }; objects: any[] }) {
    // Image-import: replaces the active room's contents.
    if (!activeRoom) return;
    patchActive({
      name: data.room.name,
      config: { name: data.room.name, width: data.room.width, height: data.room.height },
      objects: (data.objects ?? []).map(importedObjectFrom),
      adjacentRooms: [],
    });
    setSelectedId(null);
    setShowImport(false);
    setShow3D(true);
  }

  function handleImportMetaroom(payload: MetaroomImportResponse) {
    // Metaroom-import: append every returned room as a new Room in the house.
    setHouse(h => {
      let next = { ...h, name: payload.floor?.name ?? h.name, floor: payload.floor };
      for (const r of payload.rooms) {
        next = addRoomToHouse(next, createEmptyRoom({
          name: r.name,
          config: { name: r.name, width: r.width, height: r.height },
          objects: r.objects.map(importedObjectFrom),
          adjacentRooms: [],
        }));
      }
      return next;
    });
    setSelectedId(null);
    setShowImport(false);
  }

  // ── export ──────────────────────────────────────────────────────────────────
  function exportRoom(targetRoom: Room, board: string, location: string): boolean {
    let cfg;
    try {
      cfg = buildConfig(targetRoom.objects, board, location);
    } catch (err) {
      if (err instanceof MissingRadarError) {
        window.alert(`${targetRoom.name}: ${err.message}`);
        return false;
      }
      throw err;
    }
    downloadJson(`${board}_config.json`, cfg);
    return true;
  }

  function handleExportConfirm(board: string, location: string) {
    if (!activeRoom) return;
    if (!exportRoom(activeRoom, board, location)) return;
    setHouse(h => updateRoom(h, activeRoom.id, { board, location }));
    setShowExport(false);
  }

  function handleExportAll() {
    const errors: string[] = [];
    for (const r of house.rooms) {
      const blocks = validateRoomForExport(r);
      if (blocks.length > 0) {
        errors.push(`${r.name}: ${blocks.join(', ')}`);
        continue;
      }
      exportRoom(r, r.board, r.location);
    }
    if (errors.length > 0) {
      window.alert(`Skipped ${errors.length} room(s):\n\n${errors.join('\n')}`);
    }
  }

  // ── render ──────────────────────────────────────────────────────────────────
  return (
    <div className={`flex flex-col h-screen overflow-hidden ${dark ? 'dark' : ''}`}
      style={{ background: dark ? '#0d1117' : '#f8fafc', color: dark ? '#e2e8f0' : '#0f172a' }}
    >
      <div className="h-[2px] shrink-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500" />

      <header style={{ background: dark ? 'rgba(13,17,23,0.95)' : 'rgba(255,255,255,0.95)', borderBottom: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.08)' }}
        className="flex items-center justify-between px-5 py-2.5 shrink-0 backdrop-blur-xl"
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 text-sm">
            📡
          </div>
          <div>
            <p className="text-[13px] font-semibold tracking-tight" style={{ color: dark ? '#f1f5f9' : '#0f172a' }}>
              Radar Room Configurator
            </p>
            <p className="text-[10px]" style={{ color: dark ? '#475569' : '#94a3b8' }}>
              {house.rooms.length} room{house.rooms.length !== 1 ? 's' : ''}
              {activeRoom ? ` · active: ${activeRoom.name} (${objects.length} objects, ${room.width} × ${room.height} m)` : ''}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button onClick={toggleDark}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-sm transition-all"
            style={{ background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}
          >{dark ? '☀️' : '🌙'}</button>

          {activeRoom && objects.length > 0 && (
            <button onClick={() => { if (window.confirm(`Remove all objects in ${activeRoom.name}?`)) { patchActive({ objects: [] }); setSelectedId(null); } }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{ color: dark ? '#64748b' : '#94a3b8' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#f87171')}
              onMouseLeave={e => (e.currentTarget.style.color = dark ? '#64748b' : '#94a3b8')}
            >Clear</button>
          )}

          <button onClick={() => setShowImport(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={{ background: dark ? 'rgba(16,185,129,0.12)' : 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.25)' }}
          >🗺 Import</button>

          <button onClick={() => setShow3D(true)} disabled={objects.length === 0}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-30"
            style={{ background: dark ? 'rgba(6,182,212,0.12)' : 'rgba(6,182,212,0.1)', color: '#06b6d4', border: '1px solid rgba(6,182,212,0.25)' }}
          >⬡ 3D</button>

          <button onClick={() => setShowExport(true)} disabled={!activeRoom || objects.length === 0}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white transition-all disabled:opacity-30"
            style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 2px 8px rgba(99,102,241,0.35)' }}
          >↓ Export</button>

          <button onClick={handleExportAll} disabled={house.rooms.length === 0}
            title="Export config.json for every room with a radar + board + location"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white transition-all disabled:opacity-30"
            style={{ background: 'linear-gradient(135deg,#0ea5e9,#6366f1)', boxShadow: '0 2px 8px rgba(14,165,233,0.35)' }}
          >↓ Export All</button>
        </div>
      </header>

      {/* Room rail (tabs) */}
      <div
        style={{
          display: 'flex', gap: 6, padding: '6px 14px', alignItems: 'center',
          borderBottom: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
          background: dark ? 'rgba(13,17,23,0.5)' : 'rgba(255,255,255,0.6)',
          overflowX: 'auto', flexShrink: 0,
        }}
      >
        {house.rooms.map(r => {
          const isActive = r.id === house.activeRoomId;
          const errs = validateRoomForExport(r);
          return (
            <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <button onClick={() => handleSwitchRoom(r.id)}
                style={{
                  padding: '5px 12px', borderRadius: 8, fontSize: 12, fontWeight: 500,
                  background: isActive
                    ? (dark ? 'rgba(99,102,241,0.18)' : 'rgba(99,102,241,0.12)')
                    : 'transparent',
                  border: isActive
                    ? '1px solid rgba(99,102,241,0.4)'
                    : (dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)'),
                  color: isActive ? (dark ? '#c7d2fe' : '#4338ca') : (dark ? '#94a3b8' : '#475569'),
                  cursor: 'pointer', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6,
                }}
              >
                <span>{r.name}</span>
                {r.board && <span style={{ fontFamily: 'monospace', fontSize: 10, opacity: 0.7 }}>· {r.board}</span>}
                {errs.length > 0 && <span title={errs.join(', ')} style={{ color: '#fbbf24' }}>⚠</span>}
              </button>
              {house.rooms.length > 1 && (
                <button onClick={() => handleRemoveRoom(r.id)}
                  title="Remove this room"
                  style={{
                    width: 20, height: 20, borderRadius: 6, border: 'none', background: 'transparent',
                    color: dark ? '#475569' : '#94a3b8', fontSize: 14, cursor: 'pointer',
                  }}
                >×</button>
              )}
            </div>
          );
        })}
        <button onClick={handleAddRoom}
          style={{
            padding: '5px 10px', borderRadius: 8, fontSize: 12, fontWeight: 500,
            background: 'transparent',
            border: dark ? '1px dashed rgba(255,255,255,0.15)' : '1px dashed rgba(0,0,0,0.15)',
            color: dark ? '#64748b' : '#475569', cursor: 'pointer', whiteSpace: 'nowrap',
          }}
        >+ Add room</button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <ObjectPalette room={room} onRoomChange={setRoomConfig} onAdd={handleAdd} dark={dark} />
        <main className="flex-1 relative overflow-hidden">
          {activeRoom ? (
            <RoomEditor
              room={room} objects={objects} selectedId={selectedId}
              onSelect={setSelectedId} onUpdate={handleUpdate} dark={dark}
              adjacentRooms={adjacentRooms} radarObj={radarObj}
            />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: dark ? '#475569' : '#94a3b8', fontSize: 13 }}>
              No active room — click "+ Add room" or import a Metaroom PDF.
            </div>
          )}
        </main>
        <PropertiesPanel
          object={selectedObject} room={room} dark={dark}
          onUpdate={patch => selectedId && handleUpdate(selectedId, patch)}
          onDelete={() => selectedId && handleDelete(selectedId)}
          onDeselect={() => setSelectedId(null)}
          adjacentRooms={adjacentRooms}
          onAddAdjacentRoom={handleAddAdjacentRoom}
          onUpdateAdjacentRoom={handleUpdateAdjacentRoom}
          onRemoveAdjacentRoom={handleRemoveAdjacentRoom}
          radarObj={radarObj}
          activeRoom={activeRoom}
          onRoomFieldChange={(k, v) => patchActive({ [k]: v } as Partial<Room>)}
        />
      </div>

      {show3D && activeRoom && <Room3DViewer room={room} objects={objects} onClose={() => setShow3D(false)} />}

      {showImport && (
        <ImportImageModal
          dark={dark}
          onImport={handleImportImage}
          onImportMetaroom={handleImportMetaroom}
          onCancel={() => setShowImport(false)}
        />
      )}

      {showExport && activeRoom && (
        <ExportModal
          dark={dark}
          initialBoard={activeRoom.board}
          initialLocation={activeRoom.location}
          onConfirm={handleExportConfirm}
          onCancel={() => setShowExport(false)}
        />
      )}
    </div>
  );
}
