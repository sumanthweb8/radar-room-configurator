import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { RoomConfig, RoomObject } from '../types';
import { getRadarFacing } from '../types';

interface Props {
  room: RoomConfig;
  objects: RoomObject[];
  dark: boolean;
  onClose: () => void;
}

type Mode = 'animated' | 'trail' | 'heatmap';

// One tracked detection inside a 2-second bucket, already mapped to room space.
interface TrackPoint { id: string; x: number; y: number; pts: number; vel: number; state: string; }
// One 2-second aggregate bucket.
interface Bucket { t: number; label: string; points: TrackPoint[]; }
// Per-frame raw point (room space) used for the heatmap density.
interface RawPoint { x: number; y: number; w: number; }

const TRACK_COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#a855f7', '#ec4899', '#06b6d4', '#84cc16'];
function colorForTrack(id: string): string {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return TRACK_COLORS[h % TRACK_COLORS.length];
}

// ── CSV parser — handles the doubled-quote ("") escaping in the obj_values field ──
function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [], field = '', inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else { inQ = false; }
      } else field += c;
    } else if (c === '"') inQ = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (c !== '\r') field += c;
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

function fmtTime(ms: number): string {
  const d = new Date(ms);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:${p(d.getUTCSeconds())}`;
}

export const MovementViewer: React.FC<Props> = ({ room, objects, dark, onClose }) => {
  const [mode, setMode] = useState<Mode>('animated');
  const [buckets, setBuckets] = useState<Bucket[]>([]);
  const [rawPoints, setRawPoints] = useState<RawPoint[]>([]);
  const [onlyActive, setOnlyActive] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(4);     // buckets per second
  const [index, setIndex] = useState(0);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [board, setBoard] = useState('kc2508p020');   // Databricks board_sn to query
  const [date, setDate] = useState('');               // optional event_date (Central)
  const [startT, setStartT] = useState('');           // optional window start time (Central)
  const [endT, setEndT] = useState('');               // optional window end time (Central)

  // ── Radar frame: origin + forward/right vectors in room space ──────────────
  const frame = useMemo(() => {
    const radar = objects.find(o => o.type === 'radar');
    let ox: number, oy: number, fx: number, fy: number;
    if (radar) {
      ox = radar.x + radar.width / 2;
      oy = radar.y + radar.height / 2;
      const f = getRadarFacing(radar, room);
      fx = f.nx; fy = f.ny;
    } else {
      ox = room.width / 2; oy = room.height; fx = 0; fy = -1; // bottom-centre, facing up
    }
    const rx = -fy, ry = fx; // right = forward rotated 90°
    return { ox, oy, fx, fy, rx, ry, hasRadar: !!radar };
  }, [objects, room]);

  const toRoom = useMemo(() => {
    const { ox, oy, fx, fy, rx, ry } = frame;
    return (lateral: number, forward: number) => ({
      x: ox + lateral * rx + forward * fx,
      y: oy + lateral * ry + forward * fy,
    });
  }, [frame]);

  // ── Core: build buckets from parsed rows (shared by CSV + Databricks) ────────
  // Each row is one 2-second bucket: a timestamp + a list of frame strings,
  // where each frame is JSON like {"track_id": {"center":[lat,fwd], pts, ...}}.
  function applyRows(rows: { ts: string; frames: string[] }[], name: string) {
    const outBuckets: Bucket[] = [];
    const raw: RawPoint[] = [];
    for (const { ts, frames } of rows) {
      if (!ts) continue;
      const t = Date.parse(ts);
      // Aggregate frame-level detections → mean position per track for this bucket.
      const acc = new Map<string, { sx: number; sy: number; n: number; pts: number; vel: number; state: string }>();
      for (const fr of frames) {
        let obj: Record<string, any>;
        try { obj = typeof fr === 'string' ? JSON.parse(fr) : fr; } catch { continue; }
        if (!obj || typeof obj !== 'object') continue;
        for (const id of Object.keys(obj)) {
          let d: any = obj[id];
          // Tolerate double-stringified inner values (e.g. raw bronze.obj map<string,string>).
          if (typeof d === 'string') { try { d = JSON.parse(d); } catch { continue; } }
          if (!d || !Array.isArray(d.center) || d.center.length < 2) continue;
          const lateral = +d.center[0], forward = +d.center[1];
          if (!isFinite(lateral) || !isFinite(forward)) continue;
          const p = toRoom(lateral, forward);
          const wt = Math.max(1, +d.pts || 1);
          raw.push({ x: p.x, y: p.y, w: wt });
          const a = acc.get(id) ?? { sx: 0, sy: 0, n: 0, pts: 0, vel: 0, state: 'idle' };
          a.sx += p.x; a.sy += p.y; a.n++;
          a.pts = Math.max(a.pts, wt);
          a.vel = +d.velocity || a.vel;
          a.state = d.ai_state || a.state;
          acc.set(id, a);
        }
      }
      const points: TrackPoint[] = [];
      acc.forEach((a, id) => points.push({ id, x: a.sx / a.n, y: a.sy / a.n, pts: a.pts, vel: a.vel, state: a.state }));
      outBuckets.push({ t, label: fmtTime(t), points });
    }

    // Trim leading/trailing empty buckets so the timeline starts at first presence.
    let lo = 0, hi = outBuckets.length - 1;
    while (lo < outBuckets.length && outBuckets[lo].points.length === 0) lo++;
    while (hi > lo && outBuckets[hi].points.length === 0) hi--;
    const trimmed = lo <= hi ? outBuckets.slice(lo, hi + 1) : outBuckets;

    setBuckets(trimmed);
    setRawPoints(raw);
    setIndex(0);
    setPlaying(false);
    setError(null);
    setFileName(name);
  }

  // ── Parse an uploaded CSV → rows → applyRows ────────────────────────────────
  function ingest(text: string, name: string) {
    try {
      const csv = parseCSV(text);
      if (!csv.length) { setError('Empty file'); return; }
      const header = csv[0].map(h => h.trim());
      const tIdx = header.indexOf('bucket_missouri');
      const oIdx = header.indexOf('obj_values');
      if (tIdx < 0 || oIdx < 0) { setError('Expected columns bucket_missouri and obj_values'); return; }

      const rows: { ts: string; frames: string[] }[] = [];
      for (let r = 1; r < csv.length; r++) {
        const cells = csv[r];
        if (!cells || cells.length <= oIdx) continue;
        const ts = cells[tIdx];
        if (!ts) continue;
        let frames: string[] = [];
        const rawObj = (cells[oIdx] || '').trim();
        if (rawObj && rawObj !== '[]') {
          try { frames = JSON.parse(rawObj); } catch { frames = []; }
        }
        rows.push({ ts, frames });
      }
      applyRows(rows, name);
    } catch (e: any) {
      setError('Failed to parse: ' + (e?.message || String(e)));
    }
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => ingest(String(reader.result), f.name);
    reader.readAsText(f);
  }

  // ── Pull the latest N movement buckets straight from Databricks ─────────────
  async function loadLatest() {
    setLoading(true);
    setError(null);
    try {
      const base = (import.meta as any).env?.VITE_API_BASE ?? '';
      const qs = new URLSearchParams({ board, n: '500' });
      // A time window needs a date; combine date + time into 'YYYY-MM-DD HH:MM:SS' (Central).
      if (date) {
        qs.set('date', date);
        if (startT) qs.set('start', `${date} ${startT}`);
        if (endT)   qs.set('end', `${date} ${endT}`);
      }
      const res = await fetch(`${base}/api/movement/latest?${qs.toString()}`);
      if (!res.ok) {
        const e = await res.json().catch(() => ({ detail: res.statusText }));
        throw new Error(e.detail || `Request failed (${res.status})`);
      }
      const data = await res.json();
      const rows = (data.rows || []).map((r: any) => ({ ts: r.bucket_missouri, frames: r.obj_values || [] }));
      if (!rows.length) { setError('Databricks returned no movement data for this board/window.'); return; }
      const tag = date ? `${date}${startT ? ` ${startT}` : ''}${endT ? `–${endT}` : ''}` : `latest ${rows.length}`;
      applyRows(rows, `Databricks · ${board} · ${tag}`);
    } catch (e: any) {
      setError('Databricks load failed: ' + (e?.message || String(e)));
    } finally {
      setLoading(false);
    }
  }

  // Buckets actually shown (optionally only those with detections).
  const view = useMemo(
    () => (onlyActive ? buckets.filter(b => b.points.length > 0) : buckets),
    [buckets, onlyActive],
  );

  // Clamp index when the view changes.
  useEffect(() => { setIndex(i => Math.min(i, Math.max(0, view.length - 1))); }, [view.length]);

  // ── Playback loop ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!playing || mode !== 'animated' || view.length === 0) return;
    const id = window.setInterval(() => {
      setIndex(i => (i + 1 >= view.length ? 0 : i + 1));
    }, 1000 / speed);
    return () => clearInterval(id);
  }, [playing, mode, speed, view.length]);

  // ── View bounds: union of room rect and all data points ─────────────────────
  const bounds = useMemo(() => {
    let minX = 0, minY = 0, maxX = room.width, maxY = room.height;
    const grow = (x: number, y: number) => {
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
    };
    if (room.polygon) for (const [px, py] of room.polygon) grow(px, py);
    for (const p of rawPoints) grow(p.x, p.y);
    const pad = 0.4;
    return { minX: minX - pad, minY: minY - pad, maxX: maxX + pad, maxY: maxY + pad };
  }, [room, rawPoints]);

  const PXW = 760, PXH = 540;
  const spanX = bounds.maxX - bounds.minX, spanY = bounds.maxY - bounds.minY;
  const scale = Math.min(PXW / spanX, PXH / spanY);
  const sx = (x: number) => (x - bounds.minX) * scale;
  const sy = (y: number) => (y - bounds.minY) * scale;
  const svgW = spanX * scale, svgH = spanY * scale;

  // ── Heatmap grid (accumulate weighted raw points) ───────────────────────────
  const heat = useMemo(() => {
    if (mode !== 'heatmap' || rawPoints.length === 0) return null;
    const cell = 0.15; // metres
    const cols = Math.max(1, Math.ceil(spanX / cell));
    const rows = Math.max(1, Math.ceil(spanY / cell));
    const grid = new Float32Array(cols * rows);
    let max = 0;
    for (const p of rawPoints) {
      const cx = Math.floor((p.x - bounds.minX) / cell);
      const cy = Math.floor((p.y - bounds.minY) / cell);
      if (cx < 0 || cy < 0 || cx >= cols || cy >= rows) continue;
      const idx = cy * cols + cx;
      grid[idx] += p.w;
      if (grid[idx] > max) max = grid[idx];
    }
    return { grid, cols, rows, cell, max };
  }, [mode, rawPoints, bounds, spanX, spanY]);

  function heatColor(t: number): string {
    // t in [0,1] → blue → cyan → green → yellow → red
    const stops = [
      [0.0, [30, 64, 175]], [0.25, [6, 182, 212]], [0.5, [16, 185, 129]],
      [0.75, [245, 158, 11]], [1.0, [239, 68, 68]],
    ] as [number, number[]][];
    let a = stops[0], b = stops[stops.length - 1];
    for (let i = 0; i < stops.length - 1; i++) {
      if (t >= stops[i][0] && t <= stops[i + 1][0]) { a = stops[i]; b = stops[i + 1]; break; }
    }
    const f = (t - a[0]) / Math.max(1e-6, b[0] - a[0]);
    const c = a[1].map((v, i) => Math.round(v + (b[1][i] - v) * f));
    return `rgb(${c[0]},${c[1]},${c[2]})`;
  }

  // ── Furniture / room rendering helpers ──────────────────────────────────────
  const wallColor = dark ? '#475569' : '#94a3b8';
  const panelBg = dark ? '#0d1117' : '#ffffff';
  const subText = dark ? '#94a3b8' : '#64748b';

  const radar = objects.find(o => o.type === 'radar');

  // Current bucket for animated mode.
  const cur = view[index];
  // Trail: last N buckets per track.
  const TRAIL = 12;
  const trailByTrack = useMemo(() => {
    if (mode !== 'animated' || !cur) return new Map<string, TrackPoint[]>();
    const m = new Map<string, TrackPoint[]>();
    const from = Math.max(0, index - TRAIL);
    for (let i = from; i <= index; i++) {
      for (const p of view[i].points) {
        const arr = m.get(p.id) ?? []; arr.push(p); m.set(p.id, arr);
      }
    }
    return m;
  }, [mode, view, index, cur]);

  // Full per-track paths for the static Trail mode.
  const fullPaths = useMemo(() => {
    if (mode !== 'trail') return [];
    const m = new Map<string, { x: number; y: number }[]>();
    for (const b of view) for (const p of b.points) {
      const arr = m.get(p.id) ?? []; arr.push({ x: p.x, y: p.y }); m.set(p.id, arr);
    }
    return Array.from(m.entries());
  }, [mode, view]);

  const hasData = buckets.length > 0;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        style={{ background: panelBg, borderRadius: 16, padding: 18, width: 'min(900px, 96vw)', maxHeight: '94vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}` }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: dark ? '#f1f5f9' : '#0f172a' }}>🏃 Movement playback</h2>
            <p style={{ margin: '2px 0 0', fontSize: 11, color: subText }}>
              {fileName ? `${fileName} · ${buckets.length} buckets (${view.length} shown)` : 'Load a 2-second aggregate CSV (bucket_missouri, obj_values)'}
              {!frame.hasRadar && hasData && ' · ⚠ no radar placed — assuming bottom-centre facing up'}
            </p>
          </div>
          <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: 8, border: 'none', cursor: 'pointer', background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', color: subText, fontSize: 16 }}>✕</button>
        </div>

        {/* Toolbar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff' }}>
            ⬆ Load CSV
            <input type="file" accept=".csv,text/csv" onChange={onFile} style={{ display: 'none' }} />
          </label>

          {/* Query Databricks directly — no manual CSV export.                       */}
          {/* board only → latest buckets.  + date (+ optional start/end) → that window. */}
          {(() => {
            const inp = { padding: '6px 8px', borderRadius: 8, fontSize: 12, border: `1px solid ${dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}`, background: dark ? 'rgba(255,255,255,0.04)' : '#fff', color: dark ? '#e2e8f0' : '#0f172a' } as const;
            return (<>
              <input value={board} onChange={e => setBoard(e.target.value.trim())} placeholder="board_sn" title="Databricks board_sn" style={{ ...inp, width: 104 }} />
              <input type="date" value={date} onChange={e => setDate(e.target.value)} title="Date (Central) — leave blank for latest" style={{ ...inp, width: 140 }} />
              <input type="time" step={1} value={startT} onChange={e => setStartT(e.target.value)} disabled={!date} title="Window start (Central)" style={{ ...inp, width: 112, opacity: date ? 1 : 0.5 }} />
              <input type="time" step={1} value={endT} onChange={e => setEndT(e.target.value)} disabled={!date} title="Window end (Central)" style={{ ...inp, width: 112, opacity: date ? 1 : 0.5 }} />
            </>);
          })()}
          <button onClick={loadLatest} disabled={loading || !board}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: loading || !board ? 'not-allowed' : 'pointer', border: 'none', opacity: loading || !board ? 0.6 : 1, background: 'linear-gradient(135deg,#0ea5e9,#14b8a6)', color: '#fff' }}>
            {loading ? '⏳ Loading…' : (date ? '⟳ Load window' : '⟳ Load latest')}
          </button>

          {hasData && (['animated', 'trail', 'heatmap'] as Mode[]).map(m => (
            <button key={m} onClick={() => setMode(m)}
              style={{ padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: `1px solid ${mode === m ? '#6366f1' : (dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)')}`, background: mode === m ? 'rgba(99,102,241,0.15)' : 'transparent', color: mode === m ? '#818cf8' : subText, textTransform: 'capitalize' }}>
              {m === 'animated' ? '▶ Animated + trail' : m === 'trail' ? '〜 Trail path' : '🔥 Heatmap'}
            </button>
          ))}

          {hasData && (
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, color: subText, cursor: 'pointer', marginLeft: 4 }}>
              <input type="checkbox" checked={onlyActive} onChange={e => setOnlyActive(e.target.checked)} />
              skip empty gaps
            </label>
          )}
        </div>

        {error && <div style={{ padding: 10, borderRadius: 8, background: 'rgba(239,68,68,0.12)', color: '#ef4444', fontSize: 12, marginBottom: 12 }}>{error}</div>}

        {!hasData && (
          <div style={{ padding: '48px 16px', textAlign: 'center', color: subText, fontSize: 13, border: `1.5px dashed ${dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}`, borderRadius: 12 }}>
            <p style={{ margin: 0 }}>Drop in your radar export and the track <code>center</code> positions will be mapped onto this room.</p>
            <p style={{ margin: '6px 0 0', fontSize: 11 }}>Each colour is a separate track id (person). Points are transformed from radar-local coordinates using the radar's position &amp; facing.</p>
          </div>
        )}

        {/* Stage */}
        {hasData && (
          <div style={{ display: 'flex', justifyContent: 'center', background: dark ? '#090e14' : '#f0f4f8', borderRadius: 12, padding: 12 }}>
            <svg width={svgW} height={svgH} style={{ maxWidth: '100%' }}>
              {/* Room outline */}
              {room.polygon
                ? <polygon points={room.polygon.map(([px, py]) => `${sx(px)},${sy(py)}`).join(' ')} fill="none" stroke={wallColor} strokeWidth={2} />
                : <rect x={sx(0)} y={sy(0)} width={room.width * scale} height={room.height * scale} fill="none" stroke={wallColor} strokeWidth={2} rx={3} />}

              {/* Furniture (context) */}
              {objects.filter(o => o.type !== 'radar').map(o => (
                <g key={o.id}>
                  <rect x={sx(o.x)} y={sy(o.y)} width={o.width * scale} height={o.height * scale}
                    fill={o.color + '22'} stroke={o.color + '88'} strokeWidth={1} rx={2} />
                  {o.width * scale > 36 && (
                    <text x={sx(o.x) + 4} y={sy(o.y) + 13} fontSize={10} fill={subText}>{o.label}</text>
                  )}
                </g>
              ))}

              {/* Heatmap */}
              {mode === 'heatmap' && heat && Array.from({ length: heat.rows }).map((_, cy) =>
                Array.from({ length: heat.cols }).map((__, cx) => {
                  const v = heat.grid[cy * heat.cols + cx];
                  if (v <= 0) return null;
                  const t = v / heat.max;
                  return <rect key={`${cx}-${cy}`}
                    x={cx * heat.cell * scale} y={cy * heat.cell * scale}
                    width={heat.cell * scale + 0.5} height={heat.cell * scale + 0.5}
                    fill={heatColor(t)} opacity={0.25 + 0.6 * t} />;
                }))}

              {/* Trail mode — full paths coloured per track */}
              {mode === 'trail' && fullPaths.map(([id, pts]) => (
                <g key={id}>
                  <polyline points={pts.map(p => `${sx(p.x)},${sy(p.y)}`).join(' ')}
                    fill="none" stroke={colorForTrack(id)} strokeWidth={1.5} strokeOpacity={0.7}
                    strokeLinejoin="round" strokeLinecap="round" />
                  {pts.length > 0 && <circle cx={sx(pts[0].x)} cy={sy(pts[0].y)} r={4} fill={colorForTrack(id)} />}
                  {pts.length > 1 && <circle cx={sx(pts[pts.length - 1].x)} cy={sy(pts[pts.length - 1].y)} r={4} fill="#fff" stroke={colorForTrack(id)} strokeWidth={2} />}
                </g>
              ))}

              {/* Animated mode — fading trail + heads */}
              {mode === 'animated' && Array.from(trailByTrack.entries()).map(([id, pts]) => {
                const col = colorForTrack(id);
                return (
                  <g key={id}>
                    <polyline points={pts.map(p => `${sx(p.x)},${sy(p.y)}`).join(' ')}
                      fill="none" stroke={col} strokeWidth={2} strokeOpacity={0.35} strokeLinejoin="round" strokeLinecap="round" />
                    {pts.map((p, i) => (
                      <circle key={i} cx={sx(p.x)} cy={sy(p.y)} r={2 + 3 * (i / pts.length)} fill={col} opacity={0.15 + 0.55 * (i / pts.length)} />
                    ))}
                    {(() => {
                      const head = pts[pts.length - 1];
                      return <>
                        <circle cx={sx(head.x)} cy={sy(head.y)} r={9} fill={col} opacity={0.2} />
                        <circle cx={sx(head.x)} cy={sy(head.y)} r={5} fill={col} stroke="#fff" strokeWidth={1.5} />
                        <text x={sx(head.x) + 8} y={sy(head.y) - 8} fontSize={10} fontWeight={700} fill={col}>{id}</text>
                      </>;
                    })()}
                  </g>
                );
              })}

              {/* Radar marker + facing arrow */}
              {(() => {
                const rcx = sx(frame.ox), rcy = sy(frame.oy);
                const ax = rcx + frame.fx * 26, ay = rcy + frame.fy * 26;
                return (
                  <g>
                    <line x1={rcx} y1={rcy} x2={ax} y2={ay} stroke="#a78bfa" strokeWidth={2} />
                    <circle cx={rcx} cy={rcy} r={6} fill="#a78bfa" stroke="#fff" strokeWidth={1.5} />
                    <text x={rcx + 8} y={rcy + 14} fontSize={10} fill="#a78bfa">📡{radar ? '' : ' (assumed)'}</text>
                  </g>
                );
              })()}
            </svg>
          </div>
        )}

        {/* Transport (animated) */}
        {hasData && mode === 'animated' && view.length > 0 && (
          <div style={{ marginTop: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button onClick={() => setPlaying(p => !p)}
                style={{ width: 38, height: 38, borderRadius: 10, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', fontSize: 15 }}>
                {playing ? '⏸' : '▶'}
              </button>
              <input type="range" min={0} max={view.length - 1} value={index}
                onChange={e => { setPlaying(false); setIndex(+e.target.value); }} style={{ flex: 1 }} />
              <span style={{ fontSize: 12, color: subText, fontVariantNumeric: 'tabular-nums', minWidth: 96, textAlign: 'right' }}>
                {cur?.label} · {index + 1}/{view.length}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, fontSize: 11, color: subText }}>
              <span>speed</span>
              {[1, 2, 4, 8, 16].map(s => (
                <button key={s} onClick={() => setSpeed(s)}
                  style={{ padding: '3px 8px', borderRadius: 6, fontSize: 11, cursor: 'pointer', border: `1px solid ${speed === s ? '#6366f1' : (dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)')}`, background: speed === s ? 'rgba(99,102,241,0.15)' : 'transparent', color: speed === s ? '#818cf8' : subText }}>
                  {s}×
                </button>
              ))}
              <span style={{ marginLeft: 'auto' }}>
                {cur?.points.length || 0} {cur?.points.length === 1 ? 'person' : 'people'} this bucket
              </span>
            </div>
          </div>
        )}

        {/* Heatmap legend */}
        {hasData && mode === 'heatmap' && (
          <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: subText }}>
            <span>less time</span>
            <div style={{ flex: 1, maxWidth: 240, height: 10, borderRadius: 5, background: 'linear-gradient(90deg, rgb(30,64,175), rgb(6,182,212), rgb(16,185,129), rgb(245,158,11), rgb(239,68,68))' }} />
            <span>more time (dwell)</span>
          </div>
        )}
      </div>
    </div>
  );
};
