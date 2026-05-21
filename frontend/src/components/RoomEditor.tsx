import React, { useEffect, useRef, useState } from 'react';
import type { RoomConfig, RoomObject, AdjacentRoom } from '../types';
import { OBJECT_PRESETS } from '../types';

interface Props {
  room: RoomConfig;
  objects: RoomObject[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onUpdate: (id: string, patch: Partial<RoomObject>) => void;
  dark: boolean;
  adjacentRooms?: AdjacentRoom[];
  radarObj?: RoomObject | null;
}

const SNAP = 0.05;

function effectiveDims(obj: RoomObject) {
  const r = (obj.rotation * Math.PI) / 180;
  const c = Math.abs(Math.cos(r)), s = Math.abs(Math.sin(r));
  return { ew: obj.width * c + obj.height * s, eh: obj.width * s + obj.height * c };
}

function clamp(obj: RoomObject, nx: number, ny: number, rw: number, rh: number) {
  const { ew, eh } = effectiveDims(obj);
  const ox = (ew - obj.width) / 2, oy = (eh - obj.height) / 2;
  return {
    x: Math.max(ox, Math.min(nx, rw - obj.width - ox)),
    y: Math.max(oy, Math.min(ny, rh - obj.height - oy)),
  };
}

// ── SVG object shapes ─────────────────────────────────────────────────────────

function BedShape({ w, h, facing = 0 }: { w: number; h: number; color: string; facing?: number }) {
  // Architectural floor-plan style. `facing` places the headboard/pillows
  // at the specified edge WITHOUT moving the bed bounding box.
  const sw     = 1.8;
  const stroke = '#1a1a1a';
  const isVert = facing === 0 || facing === 180; // headboard on top/bottom edge
  // Headboard thickness adapts to which edge it sits on
  const headT  = isVert ? Math.min(h * 0.18, 28) : Math.min(w * 0.18, 28);
  const footT  = isVert ? Math.min(h * 0.06, 8)  : Math.min(w * 0.06, 8);
  const pilT   = Math.min(headT * 0.85, 22); // pillow thickness (toward room)
  const pilLen = isVert ? w * 0.38 : h * 0.38; // pillow length (along edge)
  const gap    = 4; // gap between headboard and pillows

  // Compute headboard rect, pillow positions, fold line, and footboard
  // based on which edge the headboard is on.
  let headRect: { x: number; y: number; w: number; h: number };
  let footRect: { x: number; y: number; w: number; h: number };
  let pils: { x: number; y: number; w: number; h: number }[];
  let fold: { x1: number; y1: number; x2: number; y2: number };
  const edgeLen = isVert ? w : h; // length along the headboard edge
  const pilGap  = (edgeLen - pilLen * 2) / 3;

  if (facing === 0) { // headboard at top
    headRect = { x: 0, y: 0, w, h: headT };
    footRect = { x: 0, y: h - footT, w, h: footT };
    const py = headT + gap;
    pils = [
      { x: pilGap, y: py, w: pilLen, h: pilT },
      { x: pilGap * 2 + pilLen, y: py, w: pilLen, h: pilT },
    ];
    fold = { x1: 0, y1: py + pilT + gap, x2: w, y2: py + pilT + gap };
  } else if (facing === 180) { // headboard at bottom
    headRect = { x: 0, y: h - headT, w, h: headT };
    footRect = { x: 0, y: 0, w, h: footT };
    const py = h - headT - gap - pilT;
    pils = [
      { x: pilGap, y: py, w: pilLen, h: pilT },
      { x: pilGap * 2 + pilLen, y: py, w: pilLen, h: pilT },
    ];
    fold = { x1: 0, y1: py - gap, x2: w, y2: py - gap };
  } else if (facing === 90) { // headboard at right
    headRect = { x: w - headT, y: 0, w: headT, h };
    footRect = { x: 0, y: 0, w: footT, h };
    const px = w - headT - gap - pilT;
    pils = [
      { x: px, y: pilGap, w: pilT, h: pilLen },
      { x: px, y: pilGap * 2 + pilLen, w: pilT, h: pilLen },
    ];
    fold = { x1: px - gap, y1: 0, x2: px - gap, y2: h };
  } else { // 270 — headboard at left
    headRect = { x: 0, y: 0, w: headT, h };
    footRect = { x: w - footT, y: 0, w: footT, h };
    const px = headT + gap;
    pils = [
      { x: px, y: pilGap, w: pilT, h: pilLen },
      { x: px, y: pilGap * 2 + pilLen, w: pilT, h: pilLen },
    ];
    fold = { x1: px + pilT + gap, y1: 0, x2: px + pilT + gap, y2: h };
  }

  return (
    <g>
      <rect x={0} y={0} width={w} height={h} fill="#ffffff" rx={2} />
      <rect x={0} y={0} width={w} height={h} fill="#f8f8f8" rx={2} />
      {/* Headboard */}
      <rect x={headRect.x} y={headRect.y} width={headRect.w} height={headRect.h} fill="#2a2a2a" rx={2} />
      {/* Footboard */}
      <rect x={footRect.x} y={footRect.y} width={footRect.w} height={footRect.h} fill="#2a2a2a" rx={1} />
      {/* Pillows */}
      {pils.map((p, i) => (
        <rect key={i} x={p.x} y={p.y} width={p.w} height={p.h} fill="#ffffff" stroke={stroke} strokeWidth={sw} rx={3} />
      ))}
      {/* Fold line */}
      <line x1={fold.x1} y1={fold.y1} x2={fold.x2} y2={fold.y2} stroke={stroke} strokeWidth={sw * 0.7} />
      {/* Outer border */}
      <rect x={0} y={0} width={w} height={h} fill="none" stroke={stroke} strokeWidth={sw} rx={2} />
    </g>
  );
}

function SofaShape({ w, h, color }: { w: number; h: number; color: string }) {
  const backH = h * 0.35;
  const armW  = Math.min(w * 0.1, 10);
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} fill={color + '20'} rx={3} />
      {/* Back */}
      <rect x={0} y={0} width={w} height={backH} fill={color + 'bb'} rx={3} />
      {/* Arms */}
      <rect x={0} y={backH} width={armW} height={h - backH} fill={color + '90'} rx={2} />
      <rect x={w - armW} y={backH} width={armW} height={h - backH} fill={color + '90'} rx={2} />
      {/* Cushions */}
      {w > 60 && (
        <>
          <rect x={armW + 2} y={backH + 3} width={(w - armW * 2 - 4) / 2 - 2} height={h - backH - 6} fill={color + '50'} stroke={color + '60'} strokeWidth={0.5} rx={2} />
          <rect x={w / 2 + 2} y={backH + 3} width={(w - armW * 2 - 4) / 2 - 2} height={h - backH - 6} fill={color + '50'} stroke={color + '60'} strokeWidth={0.5} rx={2} />
        </>
      )}
      {/* Emoji */}
      {Math.min(w, h) > 30 && (
        <text x={w / 2} y={backH + (h - backH) / 2 + Math.min(w,h) * 0.13} textAnchor="middle"
          fontSize={Math.min(w, h) * 0.32} style={{ userSelect: 'none', pointerEvents: 'none' }}>🛋</text>
      )}
      <rect x={0} y={0} width={w} height={h} fill="none" stroke={color} strokeWidth={1.5} rx={3} />
    </g>
  );
}

function DoorShape({ w, h, color }: { w: number; h: number; color: string }) {
  // Wall opening (portrait): h >> w — e.g. a door gap in a side wall shown in plan view.
  // The swing arc must NOT extend beyond the strip; instead render architectural wall-gap markers.
  if (h > w * 1.5) {
    const capLen = Math.min(w * 1.6, 8);  // small perpendicular caps at each end
    const cx = w / 2;
    return (
      <g>
        {/* Opening fill */}
        <rect x={0} y={0} width={w} height={h} fill={color + '38'} rx={1} />
        {/* Wall-end caps (top) */}
        <line x1={cx - capLen} y1={1.5} x2={cx + capLen} y2={1.5}
          stroke={color} strokeWidth={2.5} strokeLinecap="round" />
        {/* Wall-end caps (bottom) */}
        <line x1={cx - capLen} y1={h - 1.5} x2={cx + capLen} y2={h - 1.5}
          stroke={color} strokeWidth={2.5} strokeLinecap="round" />
        {/* Outer border */}
        <rect x={0} y={0} width={w} height={h} fill="none" stroke={color} strokeWidth={1.2} rx={1} />
        {/* Quarter-circle swing drawn INSIDE the strip (from top-end, radius = w) */}
        <path
          d={`M ${cx} ${h * 0.18} A ${w * 0.9} ${w * 0.9} 0 0 1 ${cx} ${h * 0.18 + w * 0.9 * 2}`}
          fill="none" stroke={color + '90'} strokeWidth={0.8} strokeDasharray="3 2"
          clipPath={`inset(0 0 0 0)`}
        />
        {/* Hinge dot */}
        <circle cx={cx} cy={h * 0.18} r={2} fill={color} />
      </g>
    );
  }

  // Swinging door (landscape): w >= h — standard floor-plan door with arc.
  const swing = w;   // swing radius = door leaf width (not max(w,h) which caused the overflow)
  return (
    <g>
      {/* Door leaf */}
      <rect x={0} y={0} width={w} height={h} fill={color + '30'} stroke={color} strokeWidth={1.5} rx={2} />
      {/* Swing arc — constrained to the door's own width */}
      <path d={`M 0 ${h / 2} A ${swing} ${swing} 0 0 1 ${swing} ${h / 2}`}
        fill={color + '12'} stroke={color + '70'} strokeWidth={1} strokeDasharray="4 3" />
      <line x1={0} y1={h / 2} x2={swing} y2={h / 2}
        stroke={color + '70'} strokeWidth={0.8} strokeDasharray="4 3" />
      {/* Hinge dot */}
      <circle cx={0} cy={h / 2} r={2.5} fill={color} />
    </g>
  );
}

function WindowShape({ w, h }: { w: number; h: number; color: string }) {
  // Standard architectural floor-plan window symbol:
  // A wall opening filled with glass, shown as two parallel frame lines
  // with a glass-blue fill between them and a subtle reflection glint.
  // Works in both landscape (wide) and portrait (tall) orientation.

  const isLandscape = w >= h;
  const frameT = isLandscape
    ? Math.max(2, Math.min(h * 0.18, 5))   // frame rail thickness (along short axis)
    : Math.max(2, Math.min(w * 0.18, 5));

  // Glass fill color — crisp sky-blue, semi-transparent
  const glassFill   = 'rgba(147,210,255,0.38)';
  const glassStroke = 'rgba(100,180,255,0.85)';
  const frameColor  = '#1e3a5c';
  const sillColor   = '#2c5282';

  if (isLandscape) {
    // ── Landscape window (wide strip in a horizontal wall) ──────────────────
    // outer sill fills → inner glass band → frame rails → reflection
    const midY = h / 2;
    const glassT = h - frameT * 2;

    // Number of panes (mullions every ~30px, minimum 1)
    const paneCount = Math.max(1, Math.floor(w / 30));
    const paneW = w / paneCount;

    return (
      <g>
        {/* Outer sill/reveal (dark, full height) */}
        <rect x={0} y={0} width={w} height={h} fill={sillColor} rx={1} />

        {/* Glass band */}
        <rect x={0} y={frameT} width={w} height={glassT} fill={glassFill} />

        {/* Mullion dividers */}
        {Array.from({ length: paneCount - 1 }, (_, i) => (
          <line key={i}
            x1={(i + 1) * paneW} y1={frameT}
            x2={(i + 1) * paneW} y2={frameT + glassT}
            stroke={glassStroke} strokeWidth={1.2}
          />
        ))}

        {/* Frame rails (top + bottom) */}
        <rect x={0} y={0}          width={w} height={frameT} fill={frameColor} />
        <rect x={0} y={h - frameT} width={w} height={frameT} fill={frameColor} />

        {/* Glass reflection — thin diagonal glint per pane */}
        {Array.from({ length: paneCount }, (_, i) => {
          const px = i * paneW;
          const glintX = px + paneW * 0.22;
          const glintLen = paneW * 0.28;
          return (
            <line key={i}
              x1={glintX} y1={frameT + 1.5}
              x2={glintX + glintLen} y2={frameT + glassT - 1.5}
              stroke="rgba(255,255,255,0.55)" strokeWidth={1} strokeLinecap="round"
            />
          );
        })}

        {/* Outer border */}
        <rect x={0} y={0} width={w} height={h}
          fill="none" stroke={glassStroke} strokeWidth={1.2} rx={1} />
      </g>
    );
  }

  // ── Portrait window (tall strip in a vertical/side wall) ──────────────────
  const midX = w / 2;
  const glassW = w - frameT * 2;
  const paneCount = Math.max(1, Math.floor(h / 30));
  const paneH = h / paneCount;

  return (
    <g>
      {/* Outer sill/reveal */}
      <rect x={0} y={0} width={w} height={h} fill={sillColor} rx={1} />

      {/* Glass band */}
      <rect x={frameT} y={0} width={glassW} height={h} fill={glassFill} />

      {/* Mullion dividers */}
      {Array.from({ length: paneCount - 1 }, (_, i) => (
        <line key={i}
          x1={frameT} y1={(i + 1) * paneH}
          x2={frameT + glassW} y2={(i + 1) * paneH}
          stroke={glassStroke} strokeWidth={1.2}
        />
      ))}

      {/* Frame rails (left + right) */}
      <rect x={0}          y={0} width={frameT} height={h} fill={frameColor} />
      <rect x={w - frameT} y={0} width={frameT} height={h} fill={frameColor} />

      {/* Reflection glints */}
      {Array.from({ length: paneCount }, (_, i) => {
        const py = i * paneH;
        const glintY = py + paneH * 0.22;
        const glintLen = paneH * 0.28;
        return (
          <line key={i}
            x1={frameT + 1.5} y1={glintY}
            x2={frameT + glassW - 1.5} y2={glintY + glintLen}
            stroke="rgba(255,255,255,0.55)" strokeWidth={1} strokeLinecap="round"
          />
        );
      })}

      {/* Outer border */}
      <rect x={0} y={0} width={w} height={h}
        fill="none" stroke={glassStroke} strokeWidth={1.2} rx={1} />
    </g>
  );
}

function RadarShape({ w, h, color }: { w: number; h: number; color: string }) {
  const cx = w / 2, cy = h / 2, r = Math.min(w, h) / 2 - 1;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={color + '25'} stroke={color} strokeWidth={1.5} />
      <circle cx={cx} cy={cy} r={r * 0.6} fill="none" stroke={color + '60'} strokeWidth={0.8} />
      <circle cx={cx} cy={cy} r={r * 0.25} fill={color} />
      <line x1={cx} y1={cy} x2={cx + r * 0.8} y2={cy - r * 0.4} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </g>
  );
}

function PersonShape({ w, h, color }: { w: number; h: number; color: string }) {
  const cx = w / 2, headR = Math.min(w, h) * 0.22;
  return (
    <g>
      <circle cx={cx} cy={headR + 2} r={headR} fill={color + '80'} stroke={color} strokeWidth={1} />
      <ellipse cx={cx} cy={h * 0.65} rx={w * 0.32} ry={h * 0.28} fill={color + '50'} stroke={color} strokeWidth={1} />
    </g>
  );
}

function GenericShape({ w, h, color, emoji }: { w: number; h: number; color: string; emoji: string }) {
  const fs = Math.min(w, h) * 0.45;
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} fill={color + '22'} stroke={color} strokeWidth={1.5} rx={3} />
      <text x={w / 2} y={h / 2 + fs * 0.35} textAnchor="middle" fontSize={fs}
        style={{ userSelect: 'none', pointerEvents: 'none' }}>{emoji}</text>
    </g>
  );
}

function ObjectShape({ obj, scale }: { obj: RoomObject; scale: number }) {
  const w = obj.width * scale, h = obj.height * scale;
  const { color, type } = obj;
  const { emoji } = OBJECT_PRESETS[type];
  switch (type) {
    case 'bed':     return <BedShape     w={w} h={h} color={color} facing={obj.rotation} />;
    case 'sofa':    return <SofaShape    w={w} h={h} color={color} />;
    case 'door':    return <DoorShape    w={w} h={h} color={color} />;
    case 'window':  return <WindowShape  w={w} h={h} color={color} />;
    case 'radar':   return <RadarShape   w={w} h={h} color={color} />;
    case 'person':  return <PersonShape  w={w} h={h} color={color} />;
    default:        return <GenericShape w={w} h={h} color={color} emoji={emoji} />;
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

export const RoomEditor: React.FC<Props> = ({ room, objects, selectedId, onSelect, onUpdate, dark, adjacentRooms = [], radarObj = null }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(100);

  function computeScale() {
    if (!containerRef.current) return;
    const { clientWidth: cw, clientHeight: ch } = containerRef.current;
    setScale(Math.min((cw - 120) / room.width, (ch - 120) / room.height));
  }

  // Recompute when room dimensions change
  useEffect(() => { computeScale(); }, [room.width, room.height]);

  // Recompute when container resizes
  useEffect(() => {
    const ro = new ResizeObserver(() => computeScale());
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [room.width, room.height]);

  const W = room.width  * scale;
  const H = room.height * scale;
  const PAD = 48; // space for rulers

  // Compute how much extra space adjacent rooms need on each side
  const leftExt  = adjacentRooms.filter(r => r.wall === 'left')  .reduce((m, r) => Math.max(m, r.width  * scale), 0);
  const topExt   = adjacentRooms.filter(r => r.wall === 'top')   .reduce((m, r) => Math.max(m, r.height * scale), 0);
  const rightExt = adjacentRooms.filter(r => r.wall === 'right') .reduce((m, r) => Math.max(m, r.width  * scale), 0);
  const botExt   = adjacentRooms.filter(r => r.wall === 'bottom').reduce((m, r) => Math.max(m, r.height * scale), 0);

  // Room origin in SVG space
  const RX = PAD + leftExt;
  const RY = PAD + topExt;

  const dragRef = useRef<{ id: string; sx: number; sy: number; ix: number; iy: number } | null>(null);

  function handlePointerDown(e: React.PointerEvent<SVGElement>, id: string) {
    if (e.button !== 0) return;
    e.stopPropagation();
    onSelect(id);
    const obj = objects.find(o => o.id === id);
    if (!obj) return;
    (e.currentTarget as SVGElement).setPointerCapture(e.pointerId);
    dragRef.current = { id, sx: e.clientX, sy: e.clientY, ix: obj.x, iy: obj.y };
  }

  function handlePointerMove(e: React.PointerEvent<SVGSVGElement>) {
    if (!dragRef.current) return;
    const { id, sx, sy, ix, iy } = dragRef.current;
    const obj = objects.find(o => o.id === id);
    if (!obj) return;
    const snap = (v: number) => Math.round(v / SNAP) * SNAP;
    const nx = snap(ix + (e.clientX - sx) / scale);
    const ny = snap(iy + (e.clientY - sy) / scale);
    onUpdate(id, clamp(obj, nx, ny, room.width, room.height));
  }

  function handlePointerUp() { dragRef.current = null; }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.target as HTMLElement)?.tagName === 'INPUT') return;
      if (!selectedId) return;
      const obj = objects.find(o => o.id === selectedId);
      if (!obj) return;
      const j = e.shiftKey ? 0.5 : SNAP;
      let nx = obj.x, ny = obj.y;
      if (e.key === 'ArrowLeft')  nx -= j;
      if (e.key === 'ArrowRight') nx += j;
      if (e.key === 'ArrowUp')    ny -= j;
      if (e.key === 'ArrowDown')  ny += j;
      if (e.key === 'r' || e.key === 'R') onUpdate(selectedId, { rotation: (obj.rotation + 45) % 360 });
      if (e.key === 'Delete' || e.key === 'Backspace') onUpdate(selectedId, {});
      if (nx !== obj.x || ny !== obj.y) onUpdate(selectedId, clamp(obj, nx, ny, room.width, room.height));
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedId, objects, room.width, room.height, onUpdate]);

  const wallColor  = dark ? '#334155' : '#94a3b8';
  const gridColor  = dark ? 'rgba(148,163,184,0.07)' : 'rgba(100,116,139,0.1)';
  const subColor   = dark ? 'rgba(148,163,184,0.03)' : 'rgba(100,116,139,0.05)';
  const floorColor = dark ? '#0f1923' : '#fafbfc';
  const rulerColor = dark ? '#1e293b' : '#f1f5f9';
  const rulerText  = dark ? '#334155' : '#94a3b8';
  const rulerTick  = dark ? '#2d3f50' : '#cbd5e1';
  const dotColor   = dark ? 'rgba(148,163,184,0.12)' : 'rgba(100,116,139,0.12)';

  const totalW = RX + W + rightExt + 20;
  const totalH = RY + H + botExt  + 20;

  // Ruler ticks
  const hTicks: number[] = [], vTicks: number[] = [];
  for (let i = 0; i <= room.width;  i += 0.5) hTicks.push(i);
  for (let i = 0; i <= room.height; i += 0.5) vTicks.push(i);


  return (
    <>
    {/* Scrollable canvas area */}
    <div ref={containerRef}
      className="absolute inset-0"
      style={{
        background: dark ? '#090e14' : '#f0f4f8',
        backgroundImage: `radial-gradient(circle, ${dotColor} 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
        overflow: 'auto',
      }}
    >
      {/* Inner wrapper — centers when SVG fits, scrolls when larger */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minWidth: '100%', minHeight: '100%',
        padding: 32, boxSizing: 'border-box',
      }}>

      <svg
        width={totalW} height={totalH}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{ overflow: 'visible', cursor: 'default' }}
      >
        {/* Invisible full-area background — clicking here deselects */}
        <rect x={0} y={0} width={totalW} height={totalH} fill="transparent"
          style={{ cursor: 'default' }}
          onPointerDown={() => onSelect(null)} />
        <defs>
          <pattern id="grid1m" x={RX} y={RY} width={scale} height={scale} patternUnits="userSpaceOnUse">
            <path d={`M ${scale} 0 L 0 0 0 ${scale}`} fill="none" stroke={gridColor} strokeWidth="1" />
          </pattern>
          <pattern id="grid50cm" x={RX} y={RY} width={scale / 2} height={scale / 2} patternUnits="userSpaceOnUse">
            <path d={`M ${scale / 2} 0 L 0 0 0 ${scale / 2}`} fill="none" stroke={subColor} strokeWidth="0.5" />
          </pattern>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* ── Adjacent rooms (rendered behind main room) ── */}
        {adjacentRooms.map(ar => {
          // Find the door so we can anchor the adjacent room to it
          const door = objects.find(o => o.id === ar.doorId);
          let ax = RX, ay = RY, aw = ar.width * scale, ah = ar.height * scale;

          // Use effective (rotated) bounding box so anchor aligns to visible door position
          const doorEffX = door ? (() => {
            const r2 = (door.rotation * Math.PI) / 180;
            const c2 = Math.abs(Math.cos(r2)), s2 = Math.abs(Math.sin(r2));
            const ew2 = door.width * c2 + door.height * s2;
            return door.x - (ew2 - door.width) / 2;
          })() : 0;
          const doorEffY = door ? (() => {
            const r2 = (door.rotation * Math.PI) / 180;
            const c2 = Math.abs(Math.cos(r2)), s2 = Math.abs(Math.sin(r2));
            const eh2 = door.width * s2 + door.height * c2;
            return door.y - (eh2 - door.height) / 2;
          })() : 0;

          if (ar.wall === 'left') {
            aw = ar.width * scale; ah = ar.height * scale;
            ax = RX - aw;
            ay = door ? RY + doorEffY * scale : RY;
          } else if (ar.wall === 'right') {
            aw = ar.width * scale; ah = ar.height * scale;
            ax = RX + W;
            ay = door ? RY + doorEffY * scale : RY;
          } else if (ar.wall === 'top') {
            aw = ar.width * scale; ah = ar.height * scale;
            ay = RY - ah;
            ax = door ? RX + doorEffX * scale : RX;
          } else if (ar.wall === 'bottom') {
            aw = ar.width * scale; ah = ar.height * scale;
            ay = RY + H;
            ax = door ? RX + doorEffX * scale : RX;
          }
          const midX = ax + aw / 2;
          const midY = ay + ah / 2;

          const typeStyles = {
            room:     { fill: dark ? '#0f1e30' : '#eef2f7', stroke: dark ? 'rgba(99,102,241,0.5)'  : 'rgba(99,102,241,0.4)',  textCol: dark ? '#4a5568' : '#6366f1', emoji: '🏠' },
            passage:  { fill: dark ? '#0a1f18' : '#ecfdf5', stroke: dark ? 'rgba(16,185,129,0.5)'  : 'rgba(16,185,129,0.4)',  textCol: dark ? '#2d6a4f' : '#059669', emoji: '🚶' },
            bathroom: { fill: dark ? '#081e26' : '#ecfeff', stroke: dark ? 'rgba(6,182,212,0.5)'   : 'rgba(6,182,212,0.4)',   textCol: dark ? '#164e63' : '#0891b2', emoji: '🚿' },
          };
          const ts = typeStyles[ar.roomType ?? 'room'];
          const showEmoji = aw > 40 && ah > 40;

          return (
            <g key={ar.id}>
              <rect x={ax} y={ay} width={aw} height={ah}
                fill={ts.fill} stroke={ts.stroke} strokeWidth={1.5} strokeDasharray="8 4" rx={2} />
              {showEmoji && (
                <text x={midX} y={midY - 8} textAnchor="middle" fontSize={Math.min(aw, ah) * 0.22}
                  style={{ pointerEvents: 'none' }}>{ts.emoji}</text>
              )}
              <text x={midX} y={midY + (showEmoji ? 10 : 0)} textAnchor="middle" fontSize={10} fontWeight={600}
                fill={ts.textCol} fontFamily="Inter, system-ui" style={{ pointerEvents: 'none' }}>
                {ar.name}
              </text>
              <text x={midX} y={midY + (showEmoji ? 22 : 12)} textAnchor="middle" fontSize={8}
                fill={ts.textCol} fontFamily="monospace" style={{ pointerEvents: 'none', opacity: 0.7 }}>
                {ar.width}×{ar.height} m
              </text>

              {/* ── Doors inside adjacent room ── */}
              {(ar.doors ?? []).map(d => {
                const ds = d.width * scale;
                const doorColor = '#fbd38d';
                let dx = 0, dy = 0, dw = 0, dh = 0;
                if (d.wall === 'top')    { dx = ax + d.position * scale; dy = ay;          dw = ds;  dh = 6; }
                if (d.wall === 'bottom') { dx = ax + d.position * scale; dy = ay + ah - 6; dw = ds;  dh = 6; }
                if (d.wall === 'left')   { dx = ax;          dy = ay + d.position * scale; dw = 6;   dh = ds; }
                if (d.wall === 'right')  { dx = ax + aw - 6; dy = ay + d.position * scale; dw = 6;   dh = ds; }
                return (
                  <g key={d.id}>
                    <rect x={dx} y={dy} width={dw} height={dh} fill={doorColor} rx={1} />
                    <text x={dx + dw/2} y={dy - 3} textAnchor="middle" fontSize={7}
                      fill={doorColor} fontFamily="monospace" style={{ pointerEvents: 'none' }}>{d.label}</text>
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* ── Ruler backgrounds ── */}
        <rect x={RX} y={RY - PAD + 2} width={W} height={PAD - 2} fill={rulerColor} rx={2} />
        <rect x={RX - PAD + 2} y={RY} width={PAD - 2} height={H} fill={rulerColor} rx={2} />

        {/* ── Horizontal ruler ── */}
        {hTicks.map(t => {
          const x = RX + t * scale;
          const isMajor = t % 1 === 0;
          return (
            <g key={`h${t}`}>
              <line x1={x} y1={isMajor ? RY - 10 : RY - 6} x2={x} y2={RY - 2} stroke={rulerTick} strokeWidth={isMajor ? 1 : 0.5} />
              {isMajor && t > 0 && t < room.width && (
                <text x={x} y={RY - 13} textAnchor="middle" fontSize={8} fill={rulerText} fontFamily="monospace">{t}m</text>
              )}
            </g>
          );
        })}

        {/* ── Vertical ruler ── */}
        {vTicks.map(t => {
          const y = RY + t * scale;
          const isMajor = t % 1 === 0;
          return (
            <g key={`v${t}`}>
              <line x1={isMajor ? RX - 10 : RX - 6} y1={y} x2={RX - 2} y2={y} stroke={rulerTick} strokeWidth={isMajor ? 1 : 0.5} />
              {isMajor && t > 0 && t < room.height && (
                <text x={RX - 13} y={y + 3} textAnchor="end" fontSize={8} fill={rulerText} fontFamily="monospace">{t}</text>
              )}
            </g>
          );
        })}

        {/* ── Room floor ── */}
        {room.polygon ? (
          <>
            <defs>
              <clipPath id="roomClip">
                <polygon points={room.polygon.map(([px, py]) => `${RX + px * scale},${RY + py * scale}`).join(' ')} />
              </clipPath>
            </defs>
            <polygon
              points={room.polygon.map(([px, py]) => `${RX + px * scale},${RY + py * scale}`).join(' ')}
              fill={floorColor}
            />
            <rect x={RX} y={RY} width={W} height={H} fill="url(#grid50cm)" clipPath="url(#roomClip)" />
            <rect x={RX} y={RY} width={W} height={H} fill="url(#grid1m)" clipPath="url(#roomClip)" />
            <polygon
              points={room.polygon.map(([px, py]) => `${RX + px * scale},${RY + py * scale}`).join(' ')}
              fill="none" stroke={wallColor} strokeWidth={3}
            />
          </>
        ) : (
          <>
            <rect x={RX} y={RY} width={W} height={H} fill={floorColor} />
            <rect x={RX} y={RY} width={W} height={H} fill="url(#grid50cm)" />
            <rect x={RX} y={RY} width={W} height={H} fill="url(#grid1m)" />
            <rect x={RX} y={RY} width={W} height={H} fill="none" stroke={wallColor} strokeWidth={3} />
          </>
        )}

        {/* ── Corner coords (radar-relative if radar placed, else room-relative) ── */}
        {(() => {
          const rx0 = radarObj ? -(radarObj.x + radarObj.width  / 2) : 0;
          const ry0 = radarObj ? -(radarObj.y + radarObj.height / 2) : 0;
          const fmt = (v: number) => v % 1 === 0 ? String(v) : v.toFixed(2);
          return [
            { t: `${fmt(rx0)},${fmt(ry0)}`,                         x: RX + 4,     y: RY + 10 },
            { t: `${fmt(rx0 + room.width)},${fmt(ry0)}`,            x: RX + W - 4, y: RY + 10,    anchor: 'end' },
            { t: `${fmt(rx0)},${fmt(ry0 + room.height)}`,           x: RX + 4,     y: RY + H - 4 },
            { t: `${fmt(rx0 + room.width)},${fmt(ry0 + room.height)}`, x: RX + W - 4, y: RY + H - 4, anchor: 'end' },
          ].map(({ t, x, y, anchor }) => (
            <text key={t} x={x} y={y} fontSize={8} fill={dark ? '#1e3a5f' : '#cbd5e1'} fontFamily="monospace" textAnchor={(anchor as 'end') || 'start'}>{t}</text>
          ));
        })()}

        {/* ── Radar crosshair + coverage zone ── */}
        {radarObj && (() => {
          const RANGE = 4.0, SIDE = 2.0;
          const rox = radarObj.x + radarObj.width  / 2;
          const roy = radarObj.y + radarObj.height / 2;
          const rcx = RX + rox * scale;
          const rcy = RY + roy * scale;

          // Nearest wall → coverage direction in room-space
          const dTop    = roy;
          const dBottom = room.height - roy;
          const dLeft   = rox;
          const dRight  = room.width - rox;
          const minD    = Math.min(dTop, dBottom, dLeft, dRight);

          // coverage rect in room coords: [x1,y1,x2,y2]
          let cx1: number, cy1: number, cx2: number, cy2: number;
          let gridAxis: 'h' | 'v'; // h = horizontal gridlines inside rect, v = vertical
          if (minD === dTop) {
            // wall is top → coverage goes downward
            cx1 = rox - SIDE; cy1 = 0;
            cx2 = rox + SIDE; cy2 = RANGE;
            gridAxis = 'h';
          } else if (minD === dBottom) {
            // wall is bottom → coverage goes upward
            cx1 = rox - SIDE; cy1 = room.height - RANGE;
            cx2 = rox + SIDE; cy2 = room.height;
            gridAxis = 'h';
          } else if (minD === dLeft) {
            // wall is left → coverage goes rightward
            cx1 = 0;           cy1 = roy - SIDE;
            cx2 = RANGE;       cy2 = roy + SIDE;
            gridAxis = 'v';
          } else {
            // wall is right → coverage goes leftward
            cx1 = room.width - RANGE; cy1 = roy - SIDE;
            cx2 = room.width;         cy2 = roy + SIDE;
            gridAxis = 'v';
          }

          // Clamp to room bounds
          cx1 = Math.max(0, cx1); cy1 = Math.max(0, cy1);
          cx2 = Math.min(room.width, cx2); cy2 = Math.min(room.height, cy2);

          // Convert to SVG px
          const sx1 = RX + cx1 * scale, sy1 = RY + cy1 * scale;
          const sx2 = RX + cx2 * scale, sy2 = RY + cy2 * scale;
          const sw  = sx2 - sx1, sh = sy2 - sy1;

          // Grid lines at 1m, 2m, 3m inside coverage (parallel to the near wall)
          const gridLines: React.ReactNode[] = [];
          if (gridAxis === 'h') {
            // horizontal lines at distances 1m, 2m, 3m from radar wall
            const wallY = minD === dTop ? 0 : room.height;
            const dir   = minD === dTop ? 1 : -1;
            [1, 2, 3].forEach((d, i) => {
              const gy = RY + (wallY + dir * d) * scale;
              if (gy > sy1 && gy < sy2)
                gridLines.push(<line key={d} x1={sx1} y1={gy} x2={sx2} y2={gy}
                  stroke="#a78bfa" strokeWidth={0.8} strokeDasharray="6 3" opacity={0.35 - i * 0.08} />);
            });
          } else {
            const wallX = minD === dLeft ? 0 : room.width;
            const dir   = minD === dLeft ? 1 : -1;
            [1, 2, 3].forEach((d, i) => {
              const gx = RX + (wallX + dir * d) * scale;
              if (gx > sx1 && gx < sx2)
                gridLines.push(<line key={d} x1={gx} y1={sy1} x2={gx} y2={sy2}
                  stroke="#a78bfa" strokeWidth={0.8} strokeDasharray="6 3" opacity={0.35 - i * 0.08} />);
            });
          }

          return (
            <g style={{ pointerEvents: 'none' }}>
              {/* Coverage fill */}
              <rect x={sx1} y={sy1} width={sw} height={sh}
                fill="#8b5cf6" fillOpacity={0.08} />

              {/* Coverage border */}
              <rect x={sx1} y={sy1} width={sw} height={sh}
                fill="none" stroke="#a78bfa" strokeWidth={1.2} strokeDasharray="8 4" opacity={0.65} />

              {/* Depth grid lines */}
              {gridLines}

              {/* Beam line from radar centre to far edge centre */}
              {(() => {
                const farCx = minD === dLeft ? sx1 : minD === dRight ? sx2 : rcx;
                const farCy = minD === dTop  ? sy1 : minD === dBottom ? sy2 : rcy;
                return <line x1={rcx} y1={rcy} x2={farCx} y2={farCy}
                  stroke="#c4b5fd" strokeWidth={1} strokeDasharray="5 3" opacity={0.5} />;
              })()}

              {/* Coverage label — range badge on far edge */}
              {(() => {
                const lx = (sx1 + sx2) / 2;
                const ly = minD === dTop ? sy1 - 4 : minD === dBottom ? sy2 + 12
                         : minD === dLeft ? sx1 - 4 : sx2 + 12; // reuse lx for vertical
                const labelX = (gridAxis === 'v' && minD === dLeft) ? sx1 - 2 : (gridAxis === 'v' && minD === dRight) ? sx2 + 2 : lx;
                const labelY = (gridAxis === 'h' && minD === dTop) ? sy1 - 4 : (gridAxis === 'h' && minD === dBottom) ? sy2 + 12 : (sy1 + sy2) / 2;
                return (
                  <g>
                    <rect x={labelX - 22} y={labelY - 9} width={44} height={13} rx={4} fill="#7c3aed" opacity={0.85} />
                    <text x={labelX} y={labelY} textAnchor="middle" fontSize={8} fill="white" fontFamily="monospace" fontWeight={700}>4m · ±2m</text>
                  </g>
                );
              })()}

              {/* Axis crosshair lines */}
              <line x1={RX} y1={rcy} x2={RX + W} y2={rcy} stroke="#a78bfa" strokeWidth={0.6} strokeDasharray="5 4" opacity={0.3} />
              <line x1={rcx} y1={RY} x2={rcx} y2={RY + H} stroke="#a78bfa" strokeWidth={0.6} strokeDasharray="5 4" opacity={0.3} />

              {/* Origin dot */}
              <circle cx={rcx} cy={rcy} r={5} fill="#7c3aed" opacity={0.9} />
              <circle cx={rcx} cy={rcy} r={2.5} fill="#fff" />

              {/* 0,0 label */}
              <rect x={rcx + 8} y={rcy - 11} width={34} height={13} rx={3} fill="#7c3aed" opacity={0.85} />
              <text x={rcx + 25} y={rcy - 2} textAnchor="middle" fontSize={8} fill="white" fontFamily="monospace" fontWeight={700}>0, 0</text>
            </g>
          );
        })()}

        {/* ── Objects ── */}
        {objects.map(obj => {
          const sel  = obj.id === selectedId;
          const ox   = RX + obj.x * scale;
          const oy   = RY + obj.y * scale;
          const ow   = obj.width  * scale;
          const oh   = obj.height * scale;
          const cx   = ox + ow / 2;
          const cy   = oy + oh / 2;
          const labelFs = Math.max(8, Math.min(11, Math.min(ow, oh) / 8));

          // Radar-relative centre coords for this object
          const radarOriginX = radarObj ? radarObj.x + radarObj.width  / 2 : 0;
          const radarOriginY = radarObj ? radarObj.y + radarObj.height / 2 : 0;
          const relX = +(obj.x + obj.width  / 2 - radarOriginX).toFixed(2);
          const relY = +(obj.y + obj.height / 2 - radarOriginY).toFixed(2);

          return (
            <g key={obj.id}
              transform={obj.type === 'bed' ? undefined : `rotate(${obj.rotation}, ${cx}, ${cy})`}
              style={{ cursor: 'grab' }}
              onPointerDown={e => handlePointerDown(e, obj.id)}
              onClick={e => e.stopPropagation()}
            >
              {/* Selection glow */}
              {sel && (
                <rect x={ox - 3} y={oy - 3} width={ow + 6} height={oh + 6}
                  fill="none" stroke={obj.color} strokeWidth={2} rx={5} opacity={0.5}
                  strokeDasharray="5 3"
                />
              )}

              {/* Object shape */}
              <g transform={`translate(${ox}, ${oy})`}>
                <ObjectShape obj={obj} scale={scale} />
              </g>

              {/* Label */}
              <text x={cx} y={oy + oh - (oh > 30 ? 5 : -3)}
                textAnchor="middle" fontSize={labelFs}
                fill={dark ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.7)'}
                fontWeight={500} fontFamily="Inter, system-ui"
                style={{ pointerEvents: 'none', userSelect: 'none' }}
              >{obj.label}</text>

              {/* Selection handles */}
              {sel && [
                [ox, oy], [ox + ow, oy], [ox + ow, oy + oh], [ox, oy + oh],
              ].map(([hx, hy], i) => (
                <rect key={i} x={hx - 4} y={hy - 4} width={8} height={8}
                  fill="white" stroke={obj.color} strokeWidth={1.5} rx={2}
                  style={{ pointerEvents: 'none' }}
                />
              ))}

              {/* Rotation badge when selected */}
              {sel && obj.rotation !== 0 && (
                <g style={{ pointerEvents: 'none' }}>
                  <rect x={cx - 14} y={oy - 18} width={28} height={14} rx={7} fill={obj.color} />
                  <text x={cx} y={oy - 7} textAnchor="middle" fontSize={8} fill="white" fontFamily="monospace">{obj.rotation}°</text>
                </g>
              )}

              {/* Radar-relative coord badge — shown on all non-radar objects when radar exists */}
              {radarObj && obj.type !== 'radar' && sel && (
                <g style={{ pointerEvents: 'none' }}>
                  <rect x={cx - 30} y={oy + oh + 3} width={60} height={13} rx={3} fill="#7c3aed" opacity={0.88} />
                  <text x={cx} y={oy + oh + 12} textAnchor="middle" fontSize={8} fill="white" fontFamily="monospace">
                    {relX},{relY} m
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* ── Dimension labels ── */}
        {/* Bottom width */}
        <line x1={RX} y1={RY + H + 12} x2={RX + W} y2={RY + H + 12} stroke={rulerTick} strokeWidth={1} markerEnd="none" />
        <line x1={RX}     y1={RY + H + 8} x2={RX}     y2={RY + H + 16} stroke={rulerTick} strokeWidth={1} />
        <line x1={RX + W} y1={RY + H + 8} x2={RX + W} y2={RY + H + 16} stroke={rulerTick} strokeWidth={1} />
        <text x={RX + W / 2} y={RY + H + 10} textAnchor="middle" fontSize={9} fill={rulerText} fontFamily="monospace" dy={8}>{room.width} m</text>

        {/* Right height */}
        <line x1={RX + W + 12} y1={RY} x2={RX + W + 12} y2={RY + H} stroke={rulerTick} strokeWidth={1} />
        <line x1={RX + W + 8} y1={RY}     x2={RX + W + 16} y2={RY}     stroke={rulerTick} strokeWidth={1} />
        <line x1={RX + W + 8} y1={RY + H} x2={RX + W + 16} y2={RY + H} stroke={rulerTick} strokeWidth={1} />
        <text x={RX + W + 12} y={RY + H / 2} textAnchor="middle" fontSize={9} fill={rulerText} fontFamily="monospace"
          transform={`rotate(-90, ${RX + W + 12}, ${RY + H / 2})`}>{room.height} m</text>
      </svg>

      </div>{/* end inner centering wrapper */}
    </div>{/* end scrollable canvas */}

    {/* Hint pill — fixed to bottom of viewport, not inside scroll */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap"
      style={{ background: dark ? 'rgba(15,23,42,0.85)' : 'rgba(255,255,255,0.85)', border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`, borderRadius: 99, padding: '5px 14px', fontSize: 10, color: dark ? '#475569' : '#94a3b8', backdropFilter: 'blur(8px)' }}
    >
      Arrow: move (5cm) · Shift+Arrow: 50cm · R: rotate
    </div>
    </>
  );
};
