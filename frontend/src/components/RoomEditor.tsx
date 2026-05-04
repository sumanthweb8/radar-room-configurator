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

function BedShape({ w, h }: { w: number; h: number; color: string }) {
  // Architectural floor-plan style — clean black outlines, white fill
  const sw      = 1.8;                        // stroke width
  const stroke  = '#1a1a1a';
  const fill    = '#ffffff';
  const headH   = Math.min(h * 0.22, 32);    // headboard thickness
  const footH   = Math.min(h * 0.07, 10);    // footboard thickness
  const frameW  = Math.min(w * 0.035, 5);    // side rail width
  const padX    = frameW;
  const innerW  = w - frameW * 2;
  const pilH    = Math.min(headH * 0.9, 26);
  const pilW    = innerW * 0.42;
  const pilGap  = (innerW - pilW * 2) / 3;
  const pilY    = headH + Math.min(6, h * 0.03);
  const bodyY   = headH;
  const bodyH   = h - headH - footH;

  return (
    <g>
      {/* ── White background ── */}
      <rect x={0} y={0} width={w} height={h} fill={fill} rx={2} />

      {/* ── Side rails ── */}
      <rect x={0}          y={headH} width={frameW} height={bodyH} fill="#e8e8e8" stroke={stroke} strokeWidth={sw * 0.6} />
      <rect x={w - frameW} y={headH} width={frameW} height={bodyH} fill="#e8e8e8" stroke={stroke} strokeWidth={sw * 0.6} />

      {/* ── Mattress area (inner) ── */}
      <rect x={frameW} y={bodyY} width={innerW} height={bodyH} fill="#f8f8f8" />

      {/* ── Pillows ── */}
      {[padX + pilGap, padX + pilGap * 2 + pilW].map((px, i) => (
        <g key={i}>
          <rect x={px} y={pilY} width={pilW} height={pilH} fill="#ffffff" stroke={stroke} strokeWidth={sw} rx={3} />
          {/* pillow centre crease */}
          <line x1={px + pilW / 2} y1={pilY + 3} x2={px + pilW / 2} y2={pilY + pilH - 3}
            stroke="#cccccc" strokeWidth={0.8} />
        </g>
      ))}

      {/* ── Blanket fold line (horizontal line separating pillows from body) ── */}
      <line
        x1={frameW} y1={pilY + pilH + Math.min(6, h * 0.03)}
        x2={w - frameW} y2={pilY + pilH + Math.min(6, h * 0.03)}
        stroke={stroke} strokeWidth={sw * 0.7}
      />

      {/* ── Headboard (solid thick rect) ── */}
      <rect x={0} y={0} width={w} height={headH} fill="#2a2a2a" rx={2} />
      {/* Headboard inner recess panel */}
      <rect x={frameW + 2} y={3} width={innerW - 4} height={headH - 6} fill="#3d3d3d" rx={1} />
      {/* Headboard top highlight */}
      <line x1={frameW + 4} y1={5} x2={w - frameW - 4} y2={5}
        stroke="rgba(255,255,255,0.12)" strokeWidth={1.5} strokeLinecap="round" />

      {/* ── Footboard ── */}
      <rect x={0} y={h - footH} width={w} height={footH} fill="#2a2a2a" rx={1} />

      {/* ── Outer border ── */}
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
  const swing = Math.max(w, h);
  return (
    <g>
      {/* Door panel */}
      <rect x={0} y={0} width={w} height={h} fill={color + '30'} stroke={color} strokeWidth={1.5} rx={2} />
      {/* Swing arc */}
      <path d={`M 0 ${h / 2} A ${swing} ${swing} 0 0 1 ${swing} ${h / 2}`}
        fill={color + '12'} stroke={color + '70'} strokeWidth={1} strokeDasharray="4 3" />
      <line x1={0} y1={h / 2} x2={swing} y2={h / 2} stroke={color + '70'} strokeWidth={0.8} strokeDasharray="4 3" />
      {/* Hinge dot */}
      <circle cx={0} cy={h / 2} r={2.5} fill={color} />
    </g>
  );
}

function WindowShape({ w, h, color }: { w: number; h: number; color: string }) {
  return (
    <g>
      <rect x={0} y={0} width={w} height={h} fill={color + '30'} stroke={color} strokeWidth={1.5} rx={1} />
      {/* Glass panes */}
      <line x1={w / 2} y1={1} x2={w / 2} y2={h - 1} stroke={color + 'aa'} strokeWidth={1} />
      <line x1={1} y1={h / 2} x2={w - 1} y2={h / 2} stroke={color + 'aa'} strokeWidth={0.5} strokeDasharray="3 2" />
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
    case 'bed':     return <BedShape     w={w} h={h} color={color} />;
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
        <rect x={RX} y={RY} width={W} height={H} fill={floorColor} />

        {/* Sub-grid */}
        <rect x={RX} y={RY} width={W} height={H} fill="url(#grid50cm)" />
        {/* 1m grid */}
        <rect x={RX} y={RY} width={W} height={H} fill="url(#grid1m)" />

        {/* ── Walls (thick border) ── */}
        <rect x={RX} y={RY} width={W} height={H} fill="none" stroke={wallColor} strokeWidth={3} />

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

        {/* ── Radar crosshair ── */}
        {radarObj && (() => {
          const rcx = RX + (radarObj.x + radarObj.width  / 2) * scale;
          const rcy = RY + (radarObj.y + radarObj.height / 2) * scale;
          return (
            <g style={{ pointerEvents: 'none' }}>
              {/* Full-room axis lines */}
              <line x1={RX} y1={rcy} x2={RX + W} y2={rcy} stroke="#a78bfa" strokeWidth={0.8} strokeDasharray="6 4" opacity={0.55} />
              <line x1={rcx} y1={RY} x2={rcx} y2={RY + H} stroke="#a78bfa" strokeWidth={0.8} strokeDasharray="6 4" opacity={0.55} />
              {/* Origin dot */}
              <circle cx={rcx} cy={rcy} r={5} fill="#7c3aed" opacity={0.85} />
              <circle cx={rcx} cy={rcy} r={2.5} fill="#fff" />
              {/* Label */}
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
              transform={`rotate(${obj.rotation}, ${cx}, ${cy})`}
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
