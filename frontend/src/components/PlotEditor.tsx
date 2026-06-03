import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { RoomConfig, RoomObject } from '../types';
import { radarFrame, buildZone, assembleConfig, type ConfigObject } from '../exportConfig';

interface Props {
  room: RoomConfig;
  objects: RoomObject[];
  dark: boolean;
  onClose: () => void;
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
  let doorIdx = 0;
  return objects.filter(o => o.type !== 'radar').map(o => {
    const corners: [number, number][] = [
      [o.x, o.y], [o.x + o.width, o.y], [o.x, o.y + o.height], [o.x + o.width, o.y + o.height],
    ];
    const t = corners.map(([rx, ry]) => toLocal(rx, ry));
    const xs = t.map(c => c[0]), ys = t.map(c => c[1]);
    const name = o.type === 'door' ? `door${++doorIdx}` : o.type === 'bed' ? 'bed' : (o.label || o.type);
    return {
      id: o.id, name, type: o.type, color: o.color,
      minX: Math.min(...xs), maxX: Math.max(...xs), minY: Math.min(...ys), maxY: Math.max(...ys),
      mTop: o.marginTop ?? 0.3, mBottom: o.marginBottom ?? 0.3, mLeft: o.marginLeft ?? 0.3, mRight: o.marginRight ?? 0.3,
    };
  });
}

function downloadJson(data: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
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

export const PlotEditor: React.FC<Props> = ({ room, objects, dark, onClose }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ w: 900, h: 640 });

  const [zone, setZone] = useState<[number, number][]>(() => buildZone(objects, room).zone as [number, number][]);
  const [pobjs, setPobjs] = useState<PlotObj[]>(() => initObjs(objects, room));
  const [shown, setShown] = useState<Set<string>>(() => new Set(initObjs(objects, room).filter(p => p.type === 'bed' || p.type === 'door').map(p => p.id)));
  const [sel, setSel] = useState<{ kind: 'vertex'; i: number } | { kind: 'obj'; id: string } | null>(null);
  const [board, setBoard] = useState('');
  const [location, setLocation] = useState('');
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

  // Insert a vertex at the midpoint of a zone edge (double-click).
  function addVertexOnEdge(i: number) {
    setZone(z => {
      const a = z[i], b = z[(i + 1) % z.length];
      const mid: [number, number] = [snap((a[0] + b[0]) / 2), snap((a[1] + b[1]) / 2)];
      const next = [...z]; next.splice(i + 1, 0, mid); return next;
    });
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.key === 'Delete' || e.key === 'Backspace') && sel?.kind === 'vertex' && zone.length > 3) {
        setZone(z => z.filter((_, i) => i !== sel.i)); setSel(null);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sel, zone.length]);

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
    const serialized: ConfigObject[] = visObjs.filter(p => p.type === 'bed' || p.type === 'door').map(p => {
      const entry: ConfigObject = {
        name: p.name, type: p.type,
        top_left: [r3(p.minX), r3(p.maxY)], top_right: [r3(p.maxX), r3(p.maxY)],
        bottom_left: [r3(p.minX), r3(p.minY)], bottom_right: [r3(p.maxX), r3(p.minY)],
        margin_top: r3(p.mTop), margin_bottom: r3(p.mBottom), margin_left: r3(p.mLeft), margin_right: r3(p.mRight),
      };
      if (p.type === 'bed') { entry.top_height = 0.5; entry.bottom_height = 0.5; entry.right_width = 0.5; entry.left_width = 0.5; }
      return entry;
    });
    const config = assembleConfig(serialized, board.trim(), location.trim()) as any;
    delete config._clampedMargins;
    downloadJson(config, `${base}_config.json`);
    setTimeout(() => downloadJson({ zone: zone.map(([x, y]) => [x, y]) }, `${base}_zone.json`), 150);
  }

  const handle = (mx: number, my: number, key: string, fill: string, d: Drag, shape: 'rect' | 'circle' = 'rect') => {
    const [px, py] = toPx(mx, my);
    return shape === 'circle'
      ? <circle key={key} cx={px} cy={py} r={5} fill={fill} stroke="#fff" strokeWidth={1.2} style={{ cursor: 'grab' }} onPointerDown={e => startDrag(d, e)} />
      : <rect key={key} x={px - 4} y={py - 4} width={8} height={8} fill={fill} stroke="#fff" strokeWidth={1.2} style={{ cursor: 'grab' }} onPointerDown={e => startDrag(d, e)} />;
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

            {/* zone vertices */}
            {zone.map((p, i) => handle(p[0], p[1], `v${i}`, sel?.kind === 'vertex' && sel.i === i ? '#f59e0b' : '#0f172a', { kind: 'vertex', i }, 'circle'))}

            {/* radar at origin */}
            {(() => { const [px, py] = toPx(0, 0); return <g key="radar"><circle cx={px} cy={py} r={7} fill="#ef4444" /><text x={px + 11} y={py + 4} fill="#ef4444" fontSize={11} fontWeight={700}>Radar (0,0)</text></g>; })()}
          </svg>
        </div>

        {/* Side panel */}
        <div style={{ width: 260, flexShrink: 0, borderLeft: '1px solid rgba(255,255,255,0.08)', background: dark ? 'rgba(8,13,22,0.98)' : '#f8fafc', padding: 16, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: dark ? '#f1f5f9' : '#0f172a' }}>▣ Plot</p>
            <button onClick={onClose} style={{ padding: '4px 10px', borderRadius: 7, fontSize: 12, color: txt, background: 'transparent', border: `1px solid ${grid}`, cursor: 'pointer' }}>✕ Close</button>
          </div>
          <p style={{ margin: 0, fontSize: 10, color: txt, lineHeight: 1.6 }}>Drag vertices, objects, corners (resize) and the dashed margin handles. Double-click a zone edge to add a vertex; select a vertex and press Delete to remove. Edits affect the downloaded JSON only.</p>

          <div>
            <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, color: dark ? '#e2e8f0' : '#0f172a' }}>Objects</p>
            <div style={{ maxHeight: 160, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 3 }}>
              {pobjs.map(p => (
                <label key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 11, color: dark ? '#cbd5e1' : '#334155', cursor: 'pointer' }}>
                  <input type="checkbox" checked={shown.has(p.id)} onChange={() => setShown(s => { const n = new Set(s); n.has(p.id) ? n.delete(p.id) : n.add(p.id); return n; })} style={{ accentColor: p.color }} />
                  <span style={{ color: p.color }}>{p.name}</span>
                  {!(p.type === 'bed' || p.type === 'door') && <span style={{ fontSize: 9, color: txt }}>(not in config)</span>}
                </label>
              ))}
            </div>
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
