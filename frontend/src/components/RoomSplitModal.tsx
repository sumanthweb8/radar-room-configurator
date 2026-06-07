import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { RoomConfig, RoomObject } from '../types';
import { boundaryOf, pointInPolygonPlan } from '../sim/coverage';
import { splitPolygonByPolyline, type Pt } from '../sim/geom';

interface Props {
  room: RoomConfig;
  objects: RoomObject[];
  dark: boolean;
  /** Confirm: hand the drawn divider (plan metres) + the two new room names to the app. */
  onSplit: (polyline: Pt[], name1: string, name2: string) => void;
  onCancel: () => void;
}

const SNAP = 0.05;
const snap = (v: number) => Math.round(v / SNAP) * SNAP;
const SNAP_TOL = 0.6; // how close the line's ends must get to a wall to count

export const RoomSplitModal: React.FC<Props> = ({ room, objects, dark, onSplit, onCancel }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ w: 900, h: 640 });
  const [line, setLine] = useState<Pt[]>([]);
  const [sel, setSel] = useState<number | null>(null);
  const [name1, setName1] = useState(`${room.name || 'Room'} A`);
  const [name2, setName2] = useState(`${room.name || 'Room'} B`);
  const dragRef = useRef<number | null>(null);

  const boundary = useMemo(() => boundaryOf(room) as Pt[], [room]);

  useEffect(() => {
    const el = wrapRef.current; if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    setSize({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  // Data bounds (plan metres) over the room boundary, with padding.
  const bounds = useMemo(() => {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const [x, y] of boundary) { minX = Math.min(minX, x); minY = Math.min(minY, y); maxX = Math.max(maxX, x); maxY = Math.max(maxY, y); }
    const pad = 0.4;
    return { minX: minX - pad, minY: minY - pad, w: (maxX - minX) + 2 * pad, h: (maxY - minY) + 2 * pad };
  }, [boundary]);

  const PAD = 52;
  const scale = Math.min((size.w - 2 * PAD) / (bounds.w || 1), (size.h - 2 * PAD) / (bounds.h || 1));
  // Plan space is Y-down (origin top-left) — no Y flip.
  const toPx = (mx: number, my: number): [number, number] => [PAD + (mx - bounds.minX) * scale, PAD + (my - bounds.minY) * scale];
  const toM = (px: number, py: number): [number, number] => [(px - PAD) / scale + bounds.minX, (py - PAD) / scale + bounds.minY];

  function pointerM(e: { clientX: number; clientY: number }): Pt {
    const rect = svgRef.current!.getBoundingClientRect();
    const [mx, my] = toM(e.clientX - rect.left, e.clientY - rect.top);
    return [snap(mx), snap(my)];
  }

  // Live split preview.
  const preview = useMemo(
    () => (line.length >= 2 ? splitPolygonByPolyline(boundary, line, { snapTol: SNAP_TOL }) : null),
    [boundary, line],
  );

  // Object partition by centre-in-polygon (for the preview readout).
  const partition = useMemo(() => {
    if (!preview) return null;
    let a = 0, b = 0;
    for (const o of objects) {
      const c: Pt = [o.x + o.width / 2, o.y + o.height / 2];
      if (pointInPolygonPlan(c[0], c[1], preview.polyA)) a++;
      else if (pointInPolygonPlan(c[0], c[1], preview.polyB)) b++;
    }
    return { a, b };
  }, [preview, objects]);

  function onMove(e: PointerEvent) {
    const i = dragRef.current; if (i == null) return;
    const p = pointerM(e);
    setLine(l => l.map((q, idx) => idx === i ? p : q));
  }
  function onUp() {
    dragRef.current = null;
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
  }
  function startDrag(i: number, e: React.PointerEvent) {
    e.stopPropagation();
    dragRef.current = i;
    setSel(i);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }
  // Click empty canvas → append a point to the divider.
  function onCanvasDown(e: React.PointerEvent) {
    setLine(l => [...l, pointerM(e)]);
  }
  // Delete a single point.
  function removePoint(i: number) {
    setLine(l => l.filter((_, idx) => idx !== i));
    setSel(null);
  }
  // Insert a point into segment i→i+1 at the clicked position.
  function insertOnEdge(i: number, e: React.MouseEvent) {
    const p = pointerM(e);
    setLine(l => { const next = [...l]; next.splice(i + 1, 0, p); return next; });
    setSel(i + 1);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.key === 'Delete' || e.key === 'Backspace') && sel != null) {
        setLine(l => l.filter((_, i) => i !== sel)); setSel(null);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sel]);

  const bg = dark ? '#0d1117' : '#ffffff';
  const grid = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const txt = dark ? '#94a3b8' : '#475569';
  const wall = dark ? '#e2e8f0' : '#0f172a';

  const canSplit = !!preview && name1.trim().length > 0 && name2.trim().length > 0;

  const polyPts = (poly: Pt[]) => poly.map(([x, y]) => toPx(x, y).join(',')).join(' ');

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}>
      <div style={{ position: 'relative', display: 'flex', width: '92vw', height: '90vh', borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: bg }}>

        {/* Canvas */}
        <div ref={wrapRef} style={{ flex: 1, position: 'relative' }}>
          <svg ref={svgRef} width={size.w} height={size.h} style={{ display: 'block', background: bg, touchAction: 'none', cursor: 'crosshair' }}
            onPointerDown={onCanvasDown}>

            {/* split preview fills */}
            {preview && (
              <>
                <polygon points={polyPts(preview.polyA)} fill="rgba(99,102,241,0.18)" stroke="#6366f1" strokeWidth={1.5} />
                <polygon points={polyPts(preview.polyB)} fill="rgba(16,185,129,0.18)" stroke="#10b981" strokeWidth={1.5} />
              </>
            )}

            {/* room boundary */}
            <polygon points={polyPts(boundary)} fill={preview ? 'none' : (dark ? 'rgba(148,163,184,0.06)' : 'rgba(0,0,0,0.03)')} stroke={wall} strokeWidth={2.5} />

            {/* objects */}
            {objects.map(o => {
              const [x0, y0] = toPx(o.x, o.y);
              const w = o.width * scale, h = o.height * scale;
              const c: Pt = [o.x + o.width / 2, o.y + o.height / 2];
              const inA = preview && pointInPolygonPlan(c[0], c[1], preview.polyA);
              const inB = preview && pointInPolygonPlan(c[0], c[1], preview.polyB);
              const col = inA ? '#6366f1' : inB ? '#10b981' : (o.color || '#94a3b8');
              return (
                <g key={o.id} pointerEvents="none">
                  <rect x={x0} y={y0} width={w} height={h} fill={col} fillOpacity={0.22} stroke={col} strokeWidth={1.2} />
                  <text x={x0 + w / 2} y={y0 + h / 2 + 3} fill={col} fontSize={9} textAnchor="middle">{o.label || o.type}</text>
                </g>
              );
            })}

            {/* divider polyline */}
            {line.length >= 2 && (
              <polyline points={line.map(([x, y]) => toPx(x, y).join(',')).join(' ')} fill="none" stroke="#f59e0b" strokeWidth={2.5} strokeDasharray="6 4" pointerEvents="none" />
            )}
            {/* segment hit-lines — double-click to insert a point in between */}
            {line.map((p, i) => {
              if (i === line.length - 1) return null;
              const [ax, ay] = toPx(p[0], p[1]);
              const [bx, by] = toPx(line[i + 1][0], line[i + 1][1]);
              return <line key={`e${i}`} x1={ax} y1={ay} x2={bx} y2={by} stroke="transparent" strokeWidth={14}
                style={{ cursor: 'copy' }} onPointerDown={e => e.stopPropagation()} onDoubleClick={e => insertOnEdge(i, e)} />;
            })}
            {/* divider points — drag to move, double-click to delete */}
            {line.map((p, i) => {
              const [px, py] = toPx(p[0], p[1]);
              const isEnd = i === 0 || i === line.length - 1;
              return <circle key={i} cx={px} cy={py} r={6} fill={sel === i ? '#f59e0b' : isEnd ? '#ef4444' : '#fbbf24'} stroke="#fff" strokeWidth={1.4}
                style={{ cursor: 'grab' }} onPointerDown={e => startDrag(i, e)} onDoubleClick={e => { e.stopPropagation(); removePoint(i); }} />;
            })}
          </svg>
        </div>

        {/* Side panel */}
        <div style={{ width: 264, flexShrink: 0, borderLeft: '1px solid rgba(255,255,255,0.08)', background: dark ? 'rgba(8,13,22,0.98)' : '#f8fafc', padding: 16, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: dark ? '#f1f5f9' : '#0f172a' }}>✂ Split room</p>
            <button onClick={onCancel} style={{ padding: '4px 10px', borderRadius: 7, fontSize: 12, color: txt, background: 'transparent', border: `1px solid ${grid}`, cursor: 'pointer' }}>✕ Close</button>
          </div>
          <p style={{ margin: 0, fontSize: 10, color: txt, lineHeight: 1.6 }}>
            <b>Add:</b> click empty space to drop a point at the end, or double-click a segment to insert one between.<br />
            <b>Move:</b> drag a point.<br />
            <b>Delete:</b> double-click a point (or select it and press Delete / the button below).<br />
            Start and end on the room walls. The original room is kept; two new rooms are added.
          </p>

          {preview ? (
            <div style={{ fontSize: 11, color: dark ? '#cbd5e1' : '#334155', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span><span style={{ color: '#6366f1', fontWeight: 700 }}>■</span> {name1 || 'Room A'} — {partition?.a ?? 0} object{partition?.a === 1 ? '' : 's'}</span>
              <span><span style={{ color: '#10b981', fontWeight: 700 }}>■</span> {name2 || 'Room B'} — {partition?.b ?? 0} object{partition?.b === 1 ? '' : 's'}</span>
            </div>
          ) : (
            <p style={{ margin: 0, fontSize: 11, color: '#f59e0b' }}>Draw a divider from one wall to another to preview the split.</p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <input value={name1} onChange={e => setName1(e.target.value)} placeholder="First room name"
              style={{ background: dark ? 'rgba(255,255,255,0.05)' : '#fff', border: `1px solid ${grid}`, borderRadius: 8, padding: '7px 10px', fontSize: 12, color: dark ? '#e2e8f0' : '#0f172a' }} />
            <input value={name2} onChange={e => setName2(e.target.value)} placeholder="Second room name"
              style={{ background: dark ? 'rgba(255,255,255,0.05)' : '#fff', border: `1px solid ${grid}`, borderRadius: 8, padding: '7px 10px', fontSize: 12, color: dark ? '#e2e8f0' : '#0f172a' }} />
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button onClick={() => sel != null && removePoint(sel)} disabled={sel == null}
              style={{ padding: '8px 12px', borderRadius: 8, fontSize: 11, fontWeight: 600, color: sel == null ? txt : '#f87171', background: 'transparent', border: `1px solid ${sel == null ? grid : 'rgba(248,113,113,0.4)'}`, cursor: sel == null ? 'not-allowed' : 'pointer', opacity: sel == null ? 0.5 : 1 }}>
              ✕ Delete point
            </button>
            <button onClick={() => { setLine([]); setSel(null); }} style={{ padding: '8px 12px', borderRadius: 8, fontSize: 11, color: txt, background: 'transparent', border: `1px solid ${grid}`, cursor: 'pointer' }}>Reset line</button>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => canSplit && onSplit(line, name1.trim(), name2.trim())} disabled={!canSplit}
              style={{ flex: 1, padding: '9px 0', borderRadius: 9, border: 'none', fontSize: 12, fontWeight: 700, color: '#fff', cursor: canSplit ? 'pointer' : 'not-allowed', opacity: canSplit ? 1 : 0.45, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
              ✂ Split into two rooms
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
