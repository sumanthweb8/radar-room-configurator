import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { RoomConfig, RoomObject } from '../types';
import { radarFrame, buildZone, assembleConfig, prettyJson, CONFIG_TYPES, type ConfigObject } from '../exportConfig';

interface Props {
  room: RoomConfig;
  objects: RoomObject[];
  dark: boolean;
  onClose: () => void;
  /** Saved zone/inputs to restore (from the parent tab); absent → rebuild from room. */
  initialZone?: [number, number][];
  initialBoard?: string;
  initialLocation?: string;
  /** Reports zone + publish inputs back to the parent so they persist. */
  onPersist?: (s: { zone: [number, number][]; board: string; location: string }) => void;
}

// A single object in radar-local space: an axis-aligned box + four margins.
interface PlotObj {
  id: string; name: string; type: string; color: string;
  minX: number; maxX: number; minY: number; maxY: number;
  mTop: number; mBottom: number; mLeft: number; mRight: number;
}

const SNAP = 0.05; // 5 cm
const snap = (v: number) => Math.round(v / SNAP) * SNAP;
const r3 = (v: number) => +v.toFixed(3);

function initObjs(objects: RoomObject[], room: RoomConfig): PlotObj[] {
  const { toLocal } = radarFrame(objects, room);
  let doorIdx = 0, sofaIdx = 0;
  return objects.filter(o => (CONFIG_TYPES as readonly string[]).includes(o.type)).map(o => {
    const corners: [number, number][] = [
      [o.x, o.y], [o.x + o.width, o.y], [o.x, o.y + o.height], [o.x + o.width, o.y + o.height],
    ];
    const t = corners.map(([rx, ry]) => toLocal(rx, ry));
    const xs = t.map(c => c[0]), ys = t.map(c => c[1]);
    const name = o.type === 'door' ? `door${++doorIdx}` : o.type === 'sofa' ? `sofa${++sofaIdx}` : 'bed';
    return {
      id: o.id, name, type: o.type, color: o.color,
      minX: Math.min(...xs), maxX: Math.max(...xs), minY: Math.min(...ys), maxY: Math.max(...ys),
      mTop: o.marginTop ?? 0.3, mBottom: o.marginBottom ?? 0.3, mLeft: o.marginLeft ?? 0.3, mRight: o.marginRight ?? 0.3,
    };
  });
}

function downloadJson(data: unknown, filename: string) {
  const blob = new Blob([prettyJson(data)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

type Drag =
  | { kind: 'vertex'; i: number }
  | { kind: 'obj'; id: string }
  | { kind: 'corner'; id: string; cx: 'min' | 'max'; cy: 'min' | 'max' }
  | { kind: 'margin'; id: string; side: 'top' | 'bottom' | 'left' | 'right' };

export const PlotEditor: React.FC<Props> = ({ room, objects, dark, onClose, initialZone, initialBoard, initialLocation, onPersist }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ w: 900, h: 640 });

  const [zone, setZone] = useState<[number, number][]>(() =>
    initialZone && initialZone.length >= 3 ? initialZone : (buildZone(objects, room).zone as [number, number][]));
  const [pobjs, setPobjs] = useState<PlotObj[]>(() => initObjs(objects, room));
  const [shown, setShown] = useState<Set<string>>(() => new Set(initObjs(objects, room).map(p => p.id)));
  const [sel, setSel] = useState<{ kind: 'vertex'; i: number } | { kind: 'obj'; id: string } | null>(null);
  const [board, setBoard] = useState(initialBoard ?? '');
  const [location, setLocation] = useState(initialLocation ?? '');
  const [viewTab, setViewTab] = useState<'config' | 'zone'>('config');
  const [draft, setDraft] = useState('');           // editable JSON text
  const [jsonErr, setJsonErr] = useState<string | null>(null);
  const taFocused = useRef(false);
  const dragRef = useRef<Drag | null>(null);

  useEffect(() => {
    const el = wrapRef.current; if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    setSize({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  const visObjs = pobjs.filter(p => shown.has(p.id));

  // Data bounds (radar-local metres) over zone + visible object+margin boxes + origin.
  const bounds = useMemo(() => {
    let minX = 0, maxX = 0, minY = 0, maxY = 0; // include origin (radar)
    const ext = (x: number, y: number) => { minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y); };
    zone.forEach(([x, y]) => ext(x, y));
    visObjs.forEach(p => { ext(p.minX - p.mLeft, p.minY - p.mBottom); ext(p.maxX + p.mRight, p.maxY + p.mTop); });
    const pad = 0.4;
    return { minX: minX - pad, maxX: maxX + pad, minY: minY - pad, maxY: maxY + pad, w: (maxX - minX) + 2 * pad, h: (maxY - minY) + 2 * pad };
  }, [zone, visObjs]);

  // Live config + zone, rebuilt on every edit (drag/resize/margin/vertex).
  const serialized = useMemo<ConfigObject[]>(() =>
    visObjs.filter(p => (CONFIG_TYPES as readonly string[]).includes(p.type)).map(p => {
      const entry: ConfigObject = {
        name: p.name, type: p.type,
        top_left: [r3(p.minX), r3(p.maxY)], top_right: [r3(p.maxX), r3(p.maxY)],
        bottom_left: [r3(p.minX), r3(p.minY)], bottom_right: [r3(p.maxX), r3(p.minY)],
        margin_top: r3(p.mTop), margin_bottom: r3(p.mBottom), margin_left: r3(p.mLeft), margin_right: r3(p.mRight),
      };
      if (p.type === 'bed') { entry.top_height = 0.5; entry.bottom_height = 0.5; entry.right_width = 0.5; entry.left_width = 0.5; }
      return entry;
    }), [visObjs]);

  const liveConfig = useMemo(() => {
    const c = assembleConfig(serialized, board.trim() || '<board>', location.trim() || '<location>') as Record<string, unknown>;
    delete c._clampedMargins;
    return c;
  }, [serialized, board, location]);

  const liveZone = useMemo(() => ({ zone: zone.map(([x, y]) => [r3(x), r3(y)]) }), [zone]);

  // Plot → code: keep the editable JSON in sync with the live model, except while
  // the user is actively typing in it (so their edits aren't clobbered mid-keystroke).
  useEffect(() => {
    if (taFocused.current) return;
    setDraft(prettyJson(viewTab === 'config' ? liveConfig : liveZone));
    setJsonErr(null);
  }, [liveConfig, liveZone, viewTab]);

  // code → Plot: parse the edited JSON and write it back into the model. Objects
  // are matched by name (bed / door1 / sofa1 …); unknown/malformed entries are skipped.
  function applyDraft(text: string) {
    setDraft(text);
    let parsed: any;
    try { parsed = JSON.parse(text); } catch { setJsonErr('Invalid JSON'); return; }
    try {
      if (viewTab === 'zone') {
        if (!Array.isArray(parsed?.zone)) throw new Error('Expected { "zone": [[x,y], …] }');
        const z = parsed.zone.map((p: any) => [+p?.[0], +p?.[1]] as [number, number]);
        if (z.some((p: [number, number]) => !isFinite(p[0]) || !isFinite(p[1]))) throw new Error('zone has non-numbers');
        if (z.length < 3) throw new Error('zone needs ≥3 points');
        setZone(z);
      } else {
        const arr = parsed?.objects;
        if (!Array.isArray(arr)) throw new Error('Expected { "objects": [ … ] }');
        setPobjs(list => list.map(p => {
          const c = arr.find((o: any) => o?.name === p.name);
          if (!c || !c.top_left || !c.top_right || !c.bottom_left) return p;
          const x0 = +c.top_left[0], yTop = +c.top_left[1], x1 = +c.top_right[0], yBot = +c.bottom_left[1];
          if ([x0, x1, yTop, yBot].some(v => !isFinite(v))) return p;
          const num = (v: any, d: number) => (isFinite(+v) ? Math.max(0, +v) : d);
          return {
            ...p,
            minX: Math.min(x0, x1), maxX: Math.max(x0, x1),
            minY: Math.min(yTop, yBot), maxY: Math.max(yTop, yBot),
            mTop: num(c.margin_top, p.mTop), mBottom: num(c.margin_bottom, p.mBottom),
            mLeft: num(c.margin_left, p.mLeft), mRight: num(c.margin_right, p.mRight),
          };
        }));
      }
      setJsonErr(null);
    } catch (e: any) {
      setJsonErr(e?.message || 'Invalid structure');
    }
  }

  const PAD = 52;
  const scale = Math.min((size.w - 2 * PAD) / (bounds.w || 1), (size.h - 2 * PAD) / (bounds.h || 1));
  // Y is up (plot convention); SVG y grows down → flip.
  const toPx = (mx: number, my: number): [number, number] => [PAD + (mx - bounds.minX) * scale, size.h - PAD - (my - bounds.minY) * scale];
  const toM = (px: number, py: number): [number, number] => [(px - PAD) / scale + bounds.minX, (size.h - PAD - py) / scale + bounds.minY];

  function pointerM(e: React.PointerEvent | PointerEvent): [number, number] {
    const rect = svgRef.current!.getBoundingClientRect();
    return toM(e.clientX - rect.left, e.clientY - rect.top);
  }

  function onMove(e: PointerEvent) {
    const d = dragRef.current; if (!d) return;
    const [mxRaw, myRaw] = pointerM(e);
    const mx = snap(mxRaw), my = snap(myRaw);
    if (d.kind === 'vertex') {
      setZone(z => z.map((p, i) => i === d.i ? [mx, my] : p));
    } else if (d.kind === 'obj') {
      setPobjs(list => list.map(p => {
        if (p.id !== d.id) return p;
        const w = p.maxX - p.minX, h = p.maxY - p.minY;
        return { ...p, minX: mx, maxX: mx + w, minY: my, maxY: my + h };
      }));
    } else if (d.kind === 'corner') {
      setPobjs(list => list.map(p => {
        if (p.id !== d.id) return p;
        const nx = { ...p } as PlotObj;
        if (d.cx === 'min') nx.minX = Math.min(mx, p.maxX - 0.1); else nx.maxX = Math.max(mx, p.minX + 0.1);
        if (d.cy === 'min') nx.minY = Math.min(my, p.maxY - 0.1); else nx.maxY = Math.max(my, p.minY + 0.1);
        return nx;
      }));
    } else if (d.kind === 'margin') {
      setPobjs(list => list.map(p => {
        if (p.id !== d.id) return p;
        const nx = { ...p } as PlotObj;
        if (d.side === 'top') nx.mTop = Math.max(0, my - p.maxY);
        else if (d.side === 'bottom') nx.mBottom = Math.max(0, p.minY - my);
        else if (d.side === 'left') nx.mLeft = Math.max(0, p.minX - mx);
        else nx.mRight = Math.max(0, mx - p.maxX);
        return nx;
      }));
    }
  }
  function onUp() {
    dragRef.current = null;
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
  }
  function startDrag(d: Drag, e: React.PointerEvent) {
    e.stopPropagation();
    dragRef.current = d;
    if (d.kind === 'vertex') setSel({ kind: 'vertex', i: d.i });
    else setSel({ kind: 'obj', id: (d as any).id });
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }

  // Insert a vertex at the midpoint of a zone edge (double-click an edge).
  function addVertexOnEdge(i: number) {
    setZone(z => {
      const a = z[i], b = z[(i + 1) % z.length];
      const mid: [number, number] = [snap((a[0] + b[0]) / 2), snap((a[1] + b[1]) / 2)];
      const next = [...z]; next.splice(i + 1, 0, mid); return next;
    });
  }

  // Remove a zone vertex (double-click a vertex, or Delete/Backspace while one is
  // selected). Guarded so the zone never drops below a valid 3-vertex polygon.
  function deleteVertex(i: number) {
    setZone(z => (z.length > 3 ? z.filter((_, j) => j !== i) : z));
    setSel(null);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.key === 'Delete' || e.key === 'Backspace') && sel?.kind === 'vertex') deleteVertex(sel.i);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sel]);

  // Report zone + publish inputs to the parent (debounced) so they persist across
  // reopening the panel and page refreshes. A ref holds the latest callback so the
  // timer isn't re-armed on every parent re-render.
  const persistRef = useRef(onPersist);
  persistRef.current = onPersist;
  useEffect(() => {
    const t = setTimeout(() => persistRef.current?.({ zone, board, location }), 300);
    return () => clearTimeout(t);
  }, [zone, board, location]);

  // Axis ticks
  const stepFor = (range: number) => range > 6 ? 1 : range > 3 ? 0.5 : 0.25;
  const xs: number[] = [], ys: number[] = [];
  const sx = stepFor(bounds.w), sy = stepFor(bounds.h);
  for (let v = Math.ceil(bounds.minX / sx) * sx; v <= bounds.maxX; v += sx) xs.push(+v.toFixed(2));
  for (let v = Math.ceil(bounds.minY / sy) * sy; v <= bounds.maxY; v += sy) ys.push(+v.toFixed(2));

  // Colours
  const bg = dark ? '#0d1117' : '#ffffff';
  const grid = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const axis = dark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.3)';
  const txt = dark ? '#94a3b8' : '#475569';
  const zoneStroke = dark ? '#e2e8f0' : '#0f172a';

  const canDownload = board.trim() && location.trim();

  function download() {
    const base = `${board.trim()}_${(room.name || 'room').replace(/\s+/g, '_')}`;
    const config = assembleConfig(serialized, board.trim(), location.trim()) as Record<string, unknown>;
    delete config._clampedMargins;
    downloadJson(config, `${base}_config.json`);
    setTimeout(() => downloadJson(liveZone, `${base}_zone.json`), 150);
  }

  const handle = (mx: number, my: number, key: string, fill: string, d: Drag, shape: 'rect' | 'circle' = 'rect', onDbl?: () => void) => {
    const [px, py] = toPx(mx, my);
    const dbl = onDbl ? (e: React.MouseEvent) => { e.stopPropagation(); onDbl(); } : undefined;
    return shape === 'circle'
      ? <circle key={key} cx={px} cy={py} r={5} fill={fill} stroke="#fff" strokeWidth={1.2} style={{ cursor: 'grab' }} onPointerDown={e => startDrag(d, e)} onDoubleClick={dbl} />
      : <rect key={key} x={px - 4} y={py - 4} width={8} height={8} fill={fill} stroke="#fff" strokeWidth={1.2} style={{ cursor: 'grab' }} onPointerDown={e => startDrag(d, e)} onDoubleClick={dbl} />;
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}>
      <div style={{ position: 'relative', display: 'flex', width: '96vw', height: '93vh', borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: bg }}>

        {/* Plot */}
        <div ref={wrapRef} style={{ flex: 1, position: 'relative' }}>
          <svg ref={svgRef} width={size.w} height={size.h} style={{ display: 'block', background: bg, touchAction: 'none' }}
            onPointerDown={() => setSel(null)}>
            {/* grid + axes */}
            {xs.map(v => { const [px] = toPx(v, 0); return <line key={`gx${v}`} x1={px} y1={PAD} x2={px} y2={size.h - PAD} stroke={v === 0 ? axis : grid} strokeWidth={v === 0 ? 1.2 : 1} />; })}
            {ys.map(v => { const [, py] = toPx(0, v); return <line key={`gy${v}`} x1={PAD} y1={py} x2={size.w - PAD} y2={py} stroke={v === 0 ? axis : grid} strokeWidth={v === 0 ? 1.2 : 1} />; })}
            {xs.map(v => { const [px] = toPx(v, bounds.minY); return <text key={`tx${v}`} x={px} y={size.h - PAD + 16} fill={txt} fontSize={10} textAnchor="middle">{v}</text>; })}
            {ys.map(v => { const [, py] = toPx(bounds.minX, v); return <text key={`ty${v}`} x={PAD - 8} y={py + 3} fill={txt} fontSize={10} textAnchor="end">{v}</text>; })}
            <text x={size.w / 2} y={size.h - 8} fill={txt} fontSize={11} textAnchor="middle">X — lateral (m)</text>
            <text x={14} y={size.h / 2} fill={txt} fontSize={11} textAnchor="middle" transform={`rotate(-90 14 ${size.h / 2})`}>Y — forward (m)</text>

            {/* zone polygon */}
            <polygon points={zone.map(([x, y]) => toPx(x, y).join(',')).join(' ')}
              fill={dark ? 'rgba(148,163,184,0.06)' : 'rgba(0,0,0,0.03)'} stroke={zoneStroke} strokeWidth={2} />

            {/* zone edges (double-click to add a vertex) */}
            {zone.map((a, i) => {
              const b = zone[(i + 1) % zone.length];
              const [ax, ay] = toPx(a[0], a[1]); const [bx, by] = toPx(b[0], b[1]);
              return <line key={`e${i}`} x1={ax} y1={ay} x2={bx} y2={by} stroke="transparent" strokeWidth={10} style={{ cursor: 'copy' }} onDoubleClick={() => addVertexOnEdge(i)} />;
            })}

            {/* objects + margins */}
            {visObjs.map(p => {
              const [x0, y1] = toPx(p.minX, p.maxY); // top-left in px
              const [x1, y0] = toPx(p.maxX, p.minY); // bottom-right in px
              const [mx0, my1] = toPx(p.minX - p.mLeft, p.maxY + p.mTop);
              const [mx1, my0] = toPx(p.maxX + p.mRight, p.minY - p.mBottom);
              const isSel = sel?.kind === 'obj' && sel.id === p.id;
              return (
                <g key={p.id}>
                  {/* margin (dashed) */}
                  <rect x={mx0} y={my1} width={mx1 - mx0} height={my0 - my1} fill="none" stroke={p.color} strokeWidth={1.2} strokeDasharray="5 4" opacity={0.7} />
                  {/* object box */}
                  <rect x={x0} y={y1} width={x1 - x0} height={y0 - y1} fill={p.color} fillOpacity={0.18} stroke={p.color} strokeWidth={isSel ? 2.4 : 1.6}
                    style={{ cursor: 'move' }} onPointerDown={e => startDrag({ kind: 'obj', id: p.id }, e)} />
                  <text x={(x0 + x1) / 2} y={(y0 + y1) / 2} fill={p.color} fontSize={11} fontWeight={700} textAnchor="middle" pointerEvents="none">{p.name}</text>
                  {/* corner resize handles */}
                  {handle(p.minX, p.maxY, `${p.id}-tl`, p.color, { kind: 'corner', id: p.id, cx: 'min', cy: 'max' })}
                  {handle(p.maxX, p.maxY, `${p.id}-tr`, p.color, { kind: 'corner', id: p.id, cx: 'max', cy: 'max' })}
                  {handle(p.minX, p.minY, `${p.id}-bl`, p.color, { kind: 'corner', id: p.id, cx: 'min', cy: 'min' })}
                  {handle(p.maxX, p.minY, `${p.id}-br`, p.color, { kind: 'corner', id: p.id, cx: 'max', cy: 'min' })}
                  {/* margin edge handles (mid of each dashed edge) */}
                  {handle((p.minX + p.maxX) / 2, p.maxY + p.mTop, `${p.id}-mt`, '#fff', { kind: 'margin', id: p.id, side: 'top' }, 'circle')}
                  {handle((p.minX + p.maxX) / 2, p.minY - p.mBottom, `${p.id}-mb`, '#fff', { kind: 'margin', id: p.id, side: 'bottom' }, 'circle')}
                  {handle(p.minX - p.mLeft, (p.minY + p.maxY) / 2, `${p.id}-ml`, '#fff', { kind: 'margin', id: p.id, side: 'left' }, 'circle')}
                  {handle(p.maxX + p.mRight, (p.minY + p.maxY) / 2, `${p.id}-mr`, '#fff', { kind: 'margin', id: p.id, side: 'right' }, 'circle')}
                </g>
              );
            })}

            {/* zone vertices (double-click to delete) */}
            {zone.map((p, i) => handle(p[0], p[1], `v${i}`, sel?.kind === 'vertex' && sel.i === i ? '#f59e0b' : '#0f172a', { kind: 'vertex', i }, 'circle', () => deleteVertex(i)))}

            {/* radar at origin */}
            {(() => { const [px, py] = toPx(0, 0); return <g key="radar"><circle cx={px} cy={py} r={7} fill="#ef4444" /><text x={px + 11} y={py + 4} fill="#ef4444" fontSize={11} fontWeight={700}>Radar (0,0)</text></g>; })()}
          </svg>
        </div>

        {/* Side panel */}
        <div style={{ width: 340, flexShrink: 0, borderLeft: '1px solid rgba(255,255,255,0.08)', background: dark ? 'rgba(8,13,22,0.98)' : '#f8fafc', padding: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: dark ? '#f1f5f9' : '#0f172a' }}>▣ Plot</p>
            <button onClick={onClose} style={{ padding: '4px 10px', borderRadius: 7, fontSize: 12, color: txt, background: 'transparent', border: `1px solid ${grid}`, cursor: 'pointer' }}>✕ Close</button>
          </div>
          <p style={{ margin: 0, fontSize: 10, color: txt, lineHeight: 1.6 }}>Drag objects, corners (resize) and the dashed margin handles. Drag zone vertices — <b>double-click an edge to add a point, double-click a point to delete</b> (or select a point + Delete). The config + zone below update live.</p>
          <button onClick={() => setZone(buildZone(objects, room).zone as [number, number][])}
            style={{ alignSelf: 'flex-start', padding: '4px 10px', borderRadius: 7, fontSize: 10, fontWeight: 600, color: txt, background: 'transparent', border: `1px solid ${grid}`, cursor: 'pointer' }}>
            ↺ Reset zone to room
          </button>

          <div>
            <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, color: dark ? '#e2e8f0' : '#0f172a' }}>Objects</p>
            <div style={{ maxHeight: 96, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
              {pobjs.length === 0 && <span style={{ fontSize: 10, color: txt }}>No bed / door / sofa in this room.</span>}
              {pobjs.map(p => (
                <label key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 11, color: dark ? '#cbd5e1' : '#334155', cursor: 'pointer' }}>
                  <input type="checkbox" checked={shown.has(p.id)} onChange={() => setShown(s => { const n = new Set(s); n.has(p.id) ? n.delete(p.id) : n.add(p.id); return n; })} style={{ accentColor: p.color }} />
                  <span style={{ color: p.color }}>{p.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Live config / zone viewer */}
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: dark ? '#e2e8f0' : '#0f172a', marginRight: 'auto' }}>Live preview</p>
              {(['config', 'zone'] as const).map(tab => (
                <button key={tab} onClick={() => setViewTab(tab)}
                  style={{ padding: '3px 10px', borderRadius: 7, fontSize: 10, fontWeight: 700, textTransform: 'capitalize', cursor: 'pointer',
                    color: viewTab === tab ? '#fff' : txt,
                    background: viewTab === tab ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : 'transparent',
                    border: `1px solid ${viewTab === tab ? 'transparent' : grid}` }}>{tab}</button>
              ))}
            </div>
            <textarea
              value={draft}
              spellCheck={false}
              onFocus={() => { taFocused.current = true; }}
              onBlur={() => { taFocused.current = false; setDraft(prettyJson(viewTab === 'config' ? liveConfig : liveZone)); setJsonErr(null); }}
              onChange={e => applyDraft(e.target.value)}
              style={{ margin: 0, flex: 1, minHeight: 160, resize: 'none', overflow: 'auto', background: dark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.04)', border: `1px solid ${jsonErr ? 'rgba(239,68,68,0.6)' : grid}`, borderRadius: 8, padding: 10, fontSize: 10, lineHeight: 1.5, color: dark ? '#a5b4fc' : '#334155', fontFamily: 'monospace', whiteSpace: 'pre', outline: 'none', tabSize: 2 }}
            />
            {jsonErr
              ? <p style={{ margin: '4px 0 0', fontSize: 10, color: '#f87171' }}>⚠ {jsonErr} — fix to apply</p>
              : <p style={{ margin: '4px 0 0', fontSize: 9, color: txt }}>Editable — type to update the plot (objects matched by name).</p>}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <input value={board} onChange={e => setBoard(e.target.value)} placeholder="Board ID (e.g. kc2505p004)"
              style={{ background: dark ? 'rgba(255,255,255,0.05)' : '#fff', border: `1px solid ${grid}`, borderRadius: 8, padding: '7px 10px', fontSize: 12, color: dark ? '#e2e8f0' : '#0f172a', fontFamily: 'monospace' }} />
            <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location (e.g. room1)"
              style={{ background: dark ? 'rgba(255,255,255,0.05)' : '#fff', border: `1px solid ${grid}`, borderRadius: 8, padding: '7px 10px', fontSize: 12, color: dark ? '#e2e8f0' : '#0f172a', fontFamily: 'monospace' }} />
            <button onClick={download} disabled={!canDownload}
              style={{ padding: '9px 0', borderRadius: 9, border: 'none', fontSize: 12, fontWeight: 700, color: '#fff', cursor: canDownload ? 'pointer' : 'not-allowed', opacity: canDownload ? 1 : 0.45, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
              ↓ Download config + zone
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
