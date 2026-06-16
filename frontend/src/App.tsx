import { useState, useEffect } from 'react';
import type { ObjectType, RoomConfig, RoomObject, AdjacentRoom, WallSide, AdjacentRoomType } from './types';
import { OBJECT_PRESETS, getRadarFacing } from './types';
import { RoomEditor } from './components/RoomEditor';
import { ObjectPalette } from './components/ObjectPalette';
import { PropertiesPanel } from './components/PropertiesPanel';
import { Room3DViewer } from './components/Room3DViewer';
import { ExportModal } from './components/ExportModal';
import { ImportImageModal } from './components/ImportImageModal';
import { MovementViewer } from './components/MovementViewer';
import { FLOOR_PLAN_ROOMS } from './floorPlanData';

function genId(): string { return Math.random().toString(36).slice(2, 10); }

function buildKcroom(room: RoomConfig, objects: RoomObject[]) {
  // Room boundary polygon (CCW)
  const boundary: number[][] = room.polygon
    ? room.polygon.map(p => [p[0], p[1]])
    : [[0, 0], [room.width, 0], [room.width, room.height], [0, room.height]];

  // Identify doors/windows on wall edges to create openings
  const wallOpenings = new Map<number, { uStart: number; uEnd: number; vStart: number; vEnd: number }[]>();
  const N = boundary.length;

  for (const obj of objects) {
    if (obj.type !== 'door' && obj.type !== 'window') continue;
    const cx = obj.x + obj.width / 2;
    const cy = obj.y + obj.height / 2;

    let bestEdge = 0, bestDist = Infinity;
    for (let i = 0; i < N; i++) {
      const [ax, ay] = boundary[i];
      const [bx, by] = boundary[(i + 1) % N];
      const dx = bx - ax, dy = by - ay;
      const len2 = dx * dx + dy * dy;
      const t = Math.max(0, Math.min(1, ((cx - ax) * dx + (cy - ay) * dy) / len2));
      const px = ax + t * dx, py = ay + t * dy;
      const dist = Math.hypot(cx - px, cy - py);
      if (dist < bestDist) { bestDist = dist; bestEdge = i; }
    }

    const [ax, ay] = boundary[bestEdge];
    const [bx, by] = boundary[(bestEdge + 1) % N];
    const edgeLen = Math.hypot(bx - ax, by - ay);
    if (edgeLen < 0.01) continue;

    const edgeDx = bx - ax, edgeDy = by - ay;
    const corners = [
      [obj.x, obj.y], [obj.x + obj.width, obj.y],
      [obj.x, obj.y + obj.height], [obj.x + obj.width, obj.y + obj.height],
    ];
    const projections = corners.map(([px, py]) => ((px - ax) * edgeDx + (py - ay) * edgeDy) / edgeLen);
    const uStart = Math.max(0, Math.min(...projections) / edgeLen);
    const uEnd = Math.min(1, Math.max(...projections) / edgeLen);

    const vStart = obj.type === 'door' ? 0 : 0.3;
    const vEnd = obj.type === 'door' ? 0.85 : 0.8;

    const arr = wallOpenings.get(bestEdge) ?? [];
    arr.push({ uStart, uEnd, vStart, vEnd });
    wallOpenings.set(bestEdge, arr);
  }

  const walls: { edgeIndex: number; openings: { uStart: number; uEnd: number; vStart: number; vEnd: number }[] }[] = [];
  wallOpenings.forEach((openings, edgeIndex) => {
    walls.push({ edgeIndex, openings });
  });

  const HEIGHT_MAP: Record<string, number> = {
    bed: 0.55, table: 0.75, desk: 0.75, chair: 0.45,
    sofa: 0.85, cabinet: 1.2, wardrobe: 2.0, custom: 0.6,
    door: 2.1,
  };

  const furnitureObjects = objects
    .filter(o => o.type !== 'window' && o.type !== 'radar')
    .map(obj => ({
      type: obj.type,
      name: obj.label,
      footprint: [
        [obj.x, obj.y],
        [obj.x + obj.width, obj.y],
        [obj.x + obj.width, obj.y + obj.height],
        [obj.x, obj.y + obj.height],
      ],
      height: HEIGHT_MAP[obj.type] ?? 0.5,
      yBase: 0,
    }));

  // Compute radar device placement — exact position + facing direction
  const radarDevices: { id: string; freePosition: { x: number; y: number; facingX: number; facingY: number }; tiltDeg: number }[] = [];
  for (const obj of objects) {
    if (obj.type !== 'radar') continue;
    const cx = obj.x + obj.width / 2;
    const cy = obj.y + obj.height / 2;
    const facing = getRadarFacing(obj, room);
    radarDevices.push({
      id: obj.id,
      freePosition: { x: +cx.toFixed(4), y: +cy.toFixed(4), facingX: facing.nx, facingY: facing.ny },
      tiltDeg: -45,
    });
  }

  // Coverage targets: key points on beds and doors that radars must see
  const coverageTargets: { type: string; label: string; points: number[][] }[] = [];
  for (const obj of objects) {
    if (obj.type !== 'bed' && obj.type !== 'door' && obj.type !== 'sofa') continue;
    const pts: number[][] = [
      [obj.x + obj.width / 2, obj.y + obj.height / 2],
      [obj.x, obj.y], [obj.x + obj.width, obj.y],
      [obj.x, obj.y + obj.height], [obj.x + obj.width, obj.y + obj.height],
    ];
    coverageTargets.push({ type: obj.type, label: obj.label, points: pts });
  }

  return {
    name: room.name || 'Room',
    schemaVersion: 1,
    units: 'metres',
    devices: radarDevices,
    coverageTargets,
    rooms: [{
      id: 'room-1',
      name: room.name || 'Room',
      boundary,
      ceilingHeight: 3.0,
      walls,
      objects: furnitureObjects,
    }],
  };
}

function buildConfig(objects: RoomObject[], board: string, location: string, room: RoomConfig) {
  const radar   = objects.find(o => o.type === 'radar');
  const originX = radar ? radar.x + radar.width  / 2 : 0;
  const originY = radar ? radar.y + radar.height / 2 : 0;

  // Radar facing direction → rotate coords into radar-local frame
  // Config Y = forward (direction radar faces), Config X = lateral (right of radar)
  const { nx: fwd_x, ny: fwd_y } = radar ? getRadarFacing(radar, room) : { nx: 0, ny: -1 };
  const right_x = -fwd_y, right_y = fwd_x;

  const exportable = objects.filter(o => o.type === 'bed' || o.type === 'door' || o.type === 'sofa');
  const sofaCount = exportable.filter(o => o.type === 'sofa').length;
  let doorIdx = 0;
  let sofaIdx = 0;
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

    let name: string;
    if (obj.type === 'door')      name = `door${++doorIdx}`;
    else if (obj.type === 'sofa') name = sofaCount > 1 ? `sofabed${++sofaIdx}` : 'sofabed';
    else                          name = 'bed';
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
    if (obj.type === 'bed' || obj.type === 'sofa') {
      entry.top_height    = 0.5;
      entry.bottom_height = 0.5;
      entry.right_width   = 0.5;
      entry.left_width    = 0.5;
    }
    return entry;
  });

  const names     = serialized.map(o => o.name as string);
  const bedNames  = names.filter(n => n === 'bed' || n.startsWith('sofabed'));
  const doorNames = names.filter(n => n.startsWith('door'));

  return {
    device_configs: { board, location },
    objects: serialized,
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
  return FLOOR_PLAN_ROOMS.map(fp => ({
    id:           fp.id,
    label:        fp.label,
    area:         fp.area,
    room:         { ...fp.config },
    objects:      fp.objects.map(o => ({ ...o })),
    selectedId:   null,
    adjacentRooms: [],
  }));
}

// ── KuboCare cross-window message bridge ─────────────────────────────────────
// Registered at module load (before React mounts) so StrictMode's setup→cleanup→setup
// cycle can't drop a `kubocare-load-config` reply that lands between cleanups.
const kubocareBus = (() => {
  let buffered: any = null;
  const subscribers = new Set<(cfg: any) => void>();
  if (typeof window !== 'undefined') {
    window.addEventListener('message', (ev: MessageEvent) => {
      if (!ev.data || typeof ev.data !== 'object') return;
      if (ev.data.type !== 'kubocare-load-config' || !ev.data.config) return;
      if (subscribers.size === 0) {
        buffered = ev.data.config;
        console.info('[kubocare][bus] config arrived from ' + ev.origin + ' — buffered (no subscribers yet)');
      } else {
        console.info('[kubocare][bus] config arrived from ' + ev.origin + ' — delivering to ' + subscribers.size + ' subscriber(s)');
        subscribers.forEach(fn => { try { fn(ev.data.config); } catch (err) { console.error('[kubocare][bus] subscriber threw', err); } });
      }
    });
    console.info('[kubocare][bus] module-scope listener registered');
  }
  return {
    subscribe(fn: (cfg: any) => void) {
      subscribers.add(fn);
      console.info('[kubocare][bus] subscribe: now ' + subscribers.size + ' subscriber(s); buffered=' + (buffered !== null));
      if (buffered) { const b = buffered; buffered = null; try { fn(b); } catch (err) { console.error('[kubocare][bus] flush threw', err); } }
      return () => { subscribers.delete(fn); console.info('[kubocare][bus] unsubscribe: now ' + subscribers.size); };
    },
  };
})();

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [tabs,       setTabs]       = useState<TabState[]>(initTabs);
  const [activeIdx,  setActiveIdx]  = useState(0);
  const [show3D,     setShow3D]     = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showMovement, setShowMovement] = useState(false);
  const [dark,       setDark]       = useState(true);

  // ── Auto-import from KuboCare via URL param + localStorage ──────────────────
  const [embedMode, setEmbedMode] = useState<'3d-embed' | null>(null);
  const [embedConfig, setEmbedConfig] = useState<{ room: RoomConfig; objects: RoomObject[] } | null>(null);
  const [kubocareEditMode, setKubocareEditMode] = useState(false);

  const [kubocareStatus, setKubocareStatus] = useState<'idle' | 'waiting' | 'loaded' | 'no-opener'>('idle');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const kcMode = params.get('kubocare');
    if (!kcMode) return;
    console.info('[kubocare] mode =', kcMode, 'opener =', !!window.opener);

    const applyConfig = (cfg: any) => {
      try {
        const r = cfg.room;
        const objs: RoomObject[] = (cfg.objects || []).map((o: any) => {
          const preset = OBJECT_PRESETS[o.type as keyof typeof OBJECT_PRESETS] || OBJECT_PRESETS['custom'];
          return {
            id: genId(), type: o.type, label: o.label || o.type,
            x: o.x, y: o.y, width: o.width, height: o.height,
            color: preset.color, rotation: o.rotation ?? 0,
            marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0,
          };
        });

        if (kcMode === '3d-embed') {
          setEmbedMode('3d-embed');
          setEmbedConfig({ room: { name: r.name, width: r.width, height: r.height }, objects: objs });
          return;
        }

        const newTab: TabState = {
          id: genId(), label: r.name || 'KuboCare Import',
          area: `${(r.width * r.height).toFixed(1)} m²`,
          room: { name: r.name, width: r.width, height: r.height },
          objects: objs, selectedId: null, adjacentRooms: [],
        };
        setTabs([newTab]);
        setActiveIdx(0);
        if (kcMode === '3d') setShow3D(true);
        if (kcMode === '2d') setKubocareEditMode(true);
        setKubocareStatus('loaded');
        // Now that the config has been applied, scrub the URL so we don't
        // re-trigger this flow on reload. Doing it AFTER apply means StrictMode's
        // setup→cleanup→setup cycle can still see `?kubocare=2d` on the 2nd setup
        // and re-subscribe to the bus, flushing any buffered config.
        try { window.history.replaceState({}, '', window.location.pathname); } catch {}
        console.info('[kubocare] config loaded:', { room: r, objectCount: objs.length });
      } catch (e) { console.error('[kubocare] apply failed', e); }
    };

    let applied = false;
    const tryApply = (cfg: any) => { if (applied) return; applied = true; applyConfig(cfg); };

    // 1) Same-origin path: localStorage handoff
    try {
      const raw = localStorage.getItem('kubocare_room_config');
      if (raw) {
        console.info('[kubocare] found config in localStorage (same-origin path)');
        tryApply(JSON.parse(raw));
        localStorage.removeItem('kubocare_room_config');
      }
    } catch {}

    // 2) Cross-origin path: ask opener for the config; retry a few times
    //    so a slow KuboCare listener doesn't strand the editor without a config.
    //    The actual `message` listener lives at module scope (kubocareBus) so it
    //    survives React StrictMode's setup→cleanup→setup cycle.
    const unsubscribe = kubocareBus.subscribe((cfg) => {
      console.info('[kubocare] received config via bus');
      tryApply(cfg);
    });

    let pingCount = 0;
    const pingOpener = () => {
      if (applied) return;
      if (!window.opener || window.opener.closed) {
        console.warn('[kubocare] no window.opener available; cannot request config');
        setKubocareStatus('no-opener');
        return;
      }
      pingCount++;
      console.info('[kubocare] ping opener (attempt ' + pingCount + ')');
      try { window.opener.postMessage({ type: 'kubocare-editor-ready' }, '*'); } catch (err) {
        console.error('[kubocare] postMessage to opener failed', err);
      }
    };
    const pingTimers: number[] = [];
    if (!applied && window.opener) {
      setKubocareStatus('waiting');
      pingOpener();
      [400, 1000, 2000, 4000].forEach(ms => {
        pingTimers.push(window.setTimeout(pingOpener, ms));
      });
    } else if (!applied) {
      setKubocareStatus('no-opener');
    }

    return () => {
      unsubscribe();
      pingTimers.forEach(id => clearTimeout(id));
    };
  }, []);

  const [pushFeedback, setPushFeedback] = useState<'idle' | 'sent' | 'no-opener'>('idle');
  const pushToKubocare = () => {
    const tab = tabs[activeIdx];
    if (!tab) { console.warn('[kubocare] push aborted: no active tab'); return; }
    if (!window.opener || window.opener.closed) {
      console.warn('[kubocare] push aborted: window.opener missing/closed');
      setPushFeedback('no-opener');
      setTimeout(() => setPushFeedback('idle'), 2400);
      return;
    }
    const payload = {
      type: 'kubocare-room-update',
      config: {
        room: tab.room,
        objects: tab.objects.map(o => ({
          type: o.type,
          label: o.label,
          x: o.x, y: o.y,
          width: o.width, height: o.height,
          rotation: o.rotation,
          color: o.color,
        })),
      },
    };
    try {
      window.opener.postMessage(payload, '*');
      console.info('[kubocare] pushed room with', payload.config.objects.length, 'objects');
      setPushFeedback('sent');
      setTimeout(() => setPushFeedback('idle'), 1600);
    } catch (err) {
      console.error('[kubocare] push failed', err);
      setPushFeedback('no-opener');
      setTimeout(() => setPushFeedback('idle'), 2400);
    }
  };

  if (embedMode === '3d-embed' && embedConfig) {
    return <Room3DViewer room={embedConfig.room} objects={embedConfig.objects} onClose={() => {}} embed />;
  }

  // ── Listen for messages from mSIM / KuboCare ───────────────────────────────
  useEffect(() => {
    function onMessage(ev: MessageEvent) {
      if (!ev.data || !ev.data.type) return;
      if (ev.data.type === 'msim-place-radar' && ev.data.position) {
        const { x, y } = ev.data.position;
        const preset = OBJECT_PRESETS['radar'];
        const obj: RoomObject = {
          id: genId(), type: 'radar', label: `Radar ${ev.data.index ?? ''}`.trim(),
          x: x - preset.defaultWidth / 2, y: y - preset.defaultHeight / 2,
          width: preset.defaultWidth, height: preset.defaultHeight,
          color: preset.color, rotation: 0,
          marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0,
        };
        setTabs(prev => prev.map((t, i) => i === activeIdx ? { ...t, objects: [...t.objects, obj], selectedId: obj.id } : t));
      }
      if (ev.data.type === 'import-kubocare' && ev.data.room && ev.data.objects) {
        const r = ev.data.room;
        const objs: RoomObject[] = ev.data.objects.map((o: any) => {
          const preset = OBJECT_PRESETS[o.type as keyof typeof OBJECT_PRESETS] || OBJECT_PRESETS['custom'];
          return {
            id: genId(), type: o.type, label: o.label || o.type,
            x: o.x, y: o.y, width: o.width, height: o.height,
            color: preset.color, rotation: o.rotation ?? 0,
            marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0,
          };
        });
        const newTab: TabState = {
          id: genId(), label: r.name || 'KuboCare Import',
          area: `${(r.width * r.height).toFixed(1)} m²`,
          room: { name: r.name, width: r.width, height: r.height },
          objects: objs, selectedId: null, adjacentRooms: [],
        };
        setTabs([newTab]);
        setActiveIdx(0);
        if (ev.data.mode === '3D') setShow3D(true);
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [activeIdx]);

  // ── Helpers to patch the active tab ────────────────────────────────────────
  function patchTab(patch: Partial<TabState>) {
    setTabs(prev => prev.map((t, i) => i === activeIdx ? { ...t, ...patch } : t));
  }

  const tab = tabs[activeIdx];
  const { room, objects, selectedId, adjacentRooms } = tab;
  const selectedObject = objects.find(o => o.id === selectedId) ?? null;
  const radarObj       = objects.find(o => o.type === 'radar')  ?? null;

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
    setShow3D(true);
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

  function handleExportConfirm(board: string, location: string) {
    setShowExport(false);
    const config = buildConfig(objects, board, location, room);
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = `${board}_${tab.label.replace(/\s+/g,'_')}_config.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleExportKuboCare() {
    const config = {
      room: { name: room.name || tab.label, width: room.width, height: room.height },
      objects: objects.map(o => ({ type: o.type, label: o.label, x: +o.x.toFixed(3), y: +o.y.toFixed(3), width: +o.width.toFixed(3), height: +o.height.toFixed(3), rotation: o.rotation ?? 0 })),
    };
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(room.name || tab.label).replace(/\s+/g, '_')}_kubocare.json`;
    a.click();
    URL.revokeObjectURL(url);
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

          <button onClick={() => setShow3D(true)} disabled={objects.length === 0}
            style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 13px', borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: objects.length === 0 ? 'not-allowed' : 'pointer', opacity: objects.length === 0 ? 0.35 : 1, background: dark ? 'rgba(6,182,212,0.1)' : 'rgba(6,182,212,0.08)', color: '#06b6d4', border: '1px solid rgba(6,182,212,0.25)', transition: 'all 0.15s' }}
          >⬡ 3D</button>

          <button onClick={() => setShowMovement(true)}
            title="Visualise radar movement/tracking data from a CSV over this room"
            style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 13px', borderRadius: 8, fontSize: 11, fontWeight: 600, cursor: 'pointer', background: dark ? 'rgba(244,63,94,0.1)' : 'rgba(244,63,94,0.08)', color: '#f43f5e', border: '1px solid rgba(244,63,94,0.25)', transition: 'all 0.15s' }}
          >🏃 Movement</button>

          <button onClick={() => {
              const kcroom = buildKcroom(room, objects);
              const plan = {
                room: { name: kcroom.name, schemaVersion: kcroom.schemaVersion, units: kcroom.units, rooms: kcroom.rooms },
                devices: (kcroom.devices || []).map(d => ({
                  id: d.id, roomId: 'room-1', freePosition: d.freePosition, tiltDeg: d.tiltDeg,
                })),
                coverageTargets: kcroom.coverageTargets,
              };
              const child = window.open(`${import.meta.env.BASE_URL}simulator.html`, '_blank');
              if (child) {
                const timer = setInterval(() => {
                  try { child.postMessage({ type: 'load-kcplan', payload: plan }, '*'); } catch { /* */ }
                }, 300);
                const onAck = (ev: MessageEvent) => {
                  if (ev.data && ev.data.type === 'kcroom-ack') {
                    clearInterval(timer);
                    window.removeEventListener('message', onAck);
                  }
                };
                window.addEventListener('message', onAck);
                setTimeout(() => { clearInterval(timer); window.removeEventListener('message', onAck); }, 10000);
              }
            }} disabled={objects.length === 0}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 18px', borderRadius: 9, fontSize: 13, fontWeight: 700, cursor: objects.length === 0 ? 'not-allowed' : 'pointer', opacity: objects.length === 0 ? 0.35 : 1, color: '#fff', background: 'linear-gradient(135deg,#a855f7,#7c3aed)', boxShadow: objects.length > 0 ? '0 3px 14px rgba(168,85,247,0.45)' : 'none', border: 'none', transition: 'all 0.15s' }}
          >▶ Simulate</button>

          <button onClick={() => setShowExport(true)} disabled={objects.length === 0}
            style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 16px', borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: objects.length === 0 ? 'not-allowed' : 'pointer', opacity: objects.length === 0 ? 0.35 : 1, color: '#fff', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: objects.length > 0 ? '0 2px 12px rgba(99,102,241,0.45)' : 'none', border: 'none', transition: 'all 0.15s' }}
          >↓ Export</button>

          <button onClick={handleExportKuboCare} disabled={objects.length === 0}
            style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 16px', borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: objects.length === 0 ? 'not-allowed' : 'pointer', opacity: objects.length === 0 ? 0.35 : 1, color: '#fff', background: 'linear-gradient(135deg,#10b981,#059669)', boxShadow: objects.length > 0 ? '0 2px 12px rgba(16,185,129,0.45)' : 'none', border: 'none', transition: 'all 0.15s' }}
          >↓ KuboCare</button>

          {kubocareEditMode && (
            <button onClick={pushToKubocare} disabled={objects.length === 0}
              title="Send the current room back to the KuboCare visualizer"
              style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 16px', borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: objects.length === 0 ? 'not-allowed' : 'pointer', opacity: objects.length === 0 ? 0.35 : 1, color: '#fff', background: pushFeedback === 'sent' ? 'linear-gradient(135deg,#0ea5e9,#0369a1)' : pushFeedback === 'no-opener' ? 'linear-gradient(135deg,#f97316,#c2410c)' : 'linear-gradient(135deg,#ec4899,#be185d)', boxShadow: objects.length > 0 ? '0 2px 12px rgba(236,72,153,0.45)' : 'none', border: 'none', transition: 'all 0.15s' }}
            >
              {pushFeedback === 'sent' ? '✓ Pushed' : pushFeedback === 'no-opener' ? '⚠ No KuboCare tab' : '⇧ Push to KuboCare'}
            </button>
          )}
          {kubocareStatus !== 'idle' && (
            <span title="KuboCare connection status"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 8, fontSize: 10, fontWeight: 700,
                background: kubocareStatus === 'loaded' ? 'rgba(16,185,129,0.18)' : kubocareStatus === 'waiting' ? 'rgba(234,179,8,0.18)' : 'rgba(239,68,68,0.18)',
                color: kubocareStatus === 'loaded' ? '#10b981' : kubocareStatus === 'waiting' ? '#eab308' : '#ef4444',
                border: `1px solid ${kubocareStatus === 'loaded' ? 'rgba(16,185,129,0.4)' : kubocareStatus === 'waiting' ? 'rgba(234,179,8,0.4)' : 'rgba(239,68,68,0.4)'}` }}>
              {kubocareStatus === 'loaded' ? '● KuboCare linked' : kubocareStatus === 'waiting' ? '● Waiting…' : '● No opener'}
            </span>
          )}
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

      {show3D && <Room3DViewer room={room} objects={objects} onClose={() => setShow3D(false)} />}

      {showMovement && <MovementViewer room={room} objects={objects} dark={dark} onClose={() => setShowMovement(false)} />}

      {showImport && (
        <ImportImageModal dark={dark} onImport={handleImportData} onCancel={() => setShowImport(false)} />
      )}

      {showExport && (
        <ExportModal dark={dark} onConfirm={handleExportConfirm} onCancel={() => setShowExport(false)} />
      )}
    </div>
  );
}
