import { useState } from 'react';
import type { ObjectType, RoomConfig, RoomObject, AdjacentRoom, WallSide, AdjacentRoomType } from './types';
import { OBJECT_PRESETS } from './types';
import { RoomEditor } from './components/RoomEditor';
import { ObjectPalette } from './components/ObjectPalette';
import { PropertiesPanel } from './components/PropertiesPanel';
import { Room3DViewer } from './components/Room3DViewer';
import { ExportModal } from './components/ExportModal';
import { ImportImageModal } from './components/ImportImageModal';

function genId(): string { return Math.random().toString(36).slice(2, 10); }
const DEFAULT_ROOM: RoomConfig = { name: 'Room', width: 4, height: 4 };

// Feature flags — which object types get which features by default
const DEFAULT_FEATURES: Record<string, string[]> = {
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

const ALL_FEATURES = [
  'state_machine','out_of_room_alerts','out_of_bed_alerts',
  'on_bed-toss','journey_mapping_time_taken','state_machine_v2',
  'state_machine_flickering','near_edge_alerts',
];

/**
 * Build the exact config.json format used by the radar algorithms.
 *
 * Coordinate system (matches firmware convention):
 *   Origin = radar sensor centre (0, 0).
 *   x positive = right, y positive = UP (away from viewer / toward back wall).
 *   Canvas y is flipped: config_y = radarOriginY_canvas - canvas_y
 *
 *   top_left / top_right → higher y value (further from viewer)
 *   bottom_left / bottom_right → lower y value (closer to viewer)
 */
function buildConfig(objects: RoomObject[], board: string, location: string) {
  const radar   = objects.find(o => o.type === 'radar');
  const originX = radar ? radar.x + radar.width  / 2 : 0;
  const originY = radar ? radar.y + radar.height / 2 : 0;

  const serialized = objects.map(obj => {
    // x: left→right same direction. y: FLIPPED (canvas down = config negative)
    const left   = +(obj.x            - originX).toFixed(3);
    const right  = +(obj.x + obj.width - originX).toFixed(3);
    const top    = +(originY - obj.y           ).toFixed(3); // canvas top → large +y
    const bottom = +(originY - (obj.y + obj.height)).toFixed(3); // canvas bottom → small y

    const base: Record<string, unknown> = {
      name:         obj.label.toLowerCase().replace(/\s+/g, '_'),
      top_left:     [left,  top],
      top_right:    [right, top],
      bottom_left:  [left,  bottom],
      bottom_right: [right, bottom],
      margin_top:    obj.marginTop    ?? 0,
      margin_bottom: obj.marginBottom ?? 0,
      margin_left:   obj.marginLeft   ?? 0,
      margin_right:  obj.marginRight  ?? 0,
    };

    return base;
  });

  const result: Record<string, unknown> = {
    device_configs: { board, location },
    objects: serialized,
  };

  // Build feature sections
  for (const feature of ALL_FEATURES) {
    const names = objects
      .filter(o => (DEFAULT_FEATURES[o.type] ?? []).includes(feature))
      .map(o => o.label.toLowerCase().replace(/\s+/g, '_'));
    if (names.length > 0) result[feature] = { objects: names };
  }

  return result;
}

export default function App() {
  const [room,           setRoom]           = useState<RoomConfig>(DEFAULT_ROOM);
  const [objects,        setObjects]        = useState<RoomObject[]>([]);
  const [selectedId,     setSelectedId]     = useState<string | null>(null);
  const [show3D,         setShow3D]         = useState(false);
  const [showExport,     setShowExport]     = useState(false);
  const [showImport,     setShowImport]     = useState(false);
  const [dark,           setDark]           = useState(true);
  const [adjacentRooms,  setAdjacentRooms]  = useState<AdjacentRoom[]>([]);

  function toggleDark() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
  }

  const selectedObject = objects.find(o => o.id === selectedId) ?? null;
  const radarObj       = objects.find(o => o.type === 'radar') ?? null;

  function handleAdd(type: ObjectType) {
    const p = OBJECT_PRESETS[type];
    const obj: RoomObject = {
      id: genId(), type, label: p.label,
      x: Math.max(0, (room.width  - p.defaultWidth)  / 2),
      y: Math.max(0, (room.height - p.defaultHeight) / 2),
      width: p.defaultWidth, height: p.defaultHeight,
      color: p.color, rotation: 0,
      marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0,
    };
    setObjects(prev => [...prev, obj]);
    setSelectedId(obj.id);
  }

  function handleUpdate(id: string, patch: Partial<RoomObject>) {
    setObjects(prev => prev.map(o => o.id === id ? { ...o, ...patch } : o));
  }

  function handleDelete(id: string) {
    setObjects(prev => prev.filter(o => o.id !== id));
    setAdjacentRooms(prev => prev.filter(r => r.doorId !== id));
    setSelectedId(null);
  }

  function handleImportData(data: { room: { name: string; width: number; height: number }; objects: any[] }) {
    setRoom({ name: data.room.name, width: data.room.width, height: data.room.height });
    const imported: RoomObject[] = (data.objects ?? []).map((o: any) => {
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
    });
    setObjects(imported);
    setSelectedId(null);
    setAdjacentRooms([]);
    setShowImport(false);
    setShow3D(true); // auto-open 3D after import
  }

  function handleAddAdjacentRoom(doorId: string, wall: WallSide, width: number, height: number, roomType: AdjacentRoomType) {
    const defaultName = roomType === 'bathroom' ? 'Bathroom' : roomType === 'passage' ? 'Passage' : 'Room';
    const ar: AdjacentRoom = { id: genId(), doorId, wall, name: defaultName, roomType, width, height };
    setAdjacentRooms(prev => [...prev, ar]);
  }

  function handleUpdateAdjacentRoom(id: string, patch: Partial<AdjacentRoom>) {
    setAdjacentRooms(prev => prev.map(r => r.id === id ? { ...r, ...patch } : r));
  }

  function handleRemoveAdjacentRoom(id: string) {
    setAdjacentRooms(prev => prev.filter(r => r.id !== id));
  }

  function handleExportConfirm(board: string, location: string) {
    setShowExport(false);
    const config = buildConfig(objects, board, location);
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = `${board}_config.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

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
              {objects.length} object{objects.length !== 1 ? 's' : ''} · {room.width} × {room.height} m
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button onClick={toggleDark}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-sm transition-all"
            style={{ background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)' }}
          >{dark ? '☀️' : '🌙'}</button>

          {objects.length > 0 && (
            <button onClick={() => { if (window.confirm('Remove all objects?')) { setObjects([]); setSelectedId(null); } }}
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

          <button onClick={() => setShowExport(true)} disabled={objects.length === 0}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white transition-all disabled:opacity-30"
            style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 2px 8px rgba(99,102,241,0.35)' }}
          >↓ Export</button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <ObjectPalette room={room} onRoomChange={setRoom} onAdd={handleAdd} dark={dark} />
        <main className="flex-1 relative overflow-hidden">
          <RoomEditor
            room={room} objects={objects} selectedId={selectedId}
            onSelect={setSelectedId} onUpdate={handleUpdate} dark={dark}
            adjacentRooms={adjacentRooms} radarObj={radarObj}
          />
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
        />
      </div>

      {show3D && <Room3DViewer room={room} objects={objects} onClose={() => setShow3D(false)} />}

      {showImport && (
        <ImportImageModal
          dark={dark}
          onImport={handleImportData}
          onCancel={() => setShowImport(false)}
        />
      )}

      {showExport && (
        <ExportModal
          dark={dark}
          onConfirm={handleExportConfirm}
          onCancel={() => setShowExport(false)}
        />
      )}
    </div>
  );
}
