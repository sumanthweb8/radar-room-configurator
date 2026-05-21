import React, { useState, useEffect, useRef } from 'react';
import type { RoomConfig, RoomObject, AdjacentRoom, WallSide, AdjacentRoomType } from '../types';
import { OBJECT_PRESETS, detectDoorWall } from '../types';

interface Props {
  object: RoomObject | null;
  objects: RoomObject[];
  room: RoomConfig;
  onUpdate: (patch: Partial<RoomObject>) => void;
  onDelete: () => void;
  onDeselect: () => void;
  dark: boolean;
  adjacentRooms: AdjacentRoom[];
  onAddAdjacentRoom: (doorId: string, wall: WallSide, width: number, height: number, roomType: AdjacentRoomType) => void;
  onUpdateAdjacentRoom: (id: string, patch: Partial<AdjacentRoom>) => void;
  onRemoveAdjacentRoom: (id: string) => void;
  radarObj?: RoomObject | null;
}

// ── Standalone sub-components (MUST be outside the panel to avoid remounting) ──

interface FieldProps {
  label: string; value: number; step?: number; min?: number; max?: number;
  onChange: (v: number) => void;
  inputBg: string; inputBorder: string; textSm: string; dark: boolean;
}
const Field: React.FC<FieldProps> = ({ label, value, step = 0.05, min, max, onChange, inputBg, inputBorder, textSm, dark }) => {
  const [raw, setRaw] = useState(String(value));
  const focused = useRef(false);

  useEffect(() => { if (!focused.current) setRaw(String(value)); }, [value]);

  function commit(str: string) {
    const n = parseFloat(str);
    if (!isNaN(n) && (min === undefined || n >= min) && (max === undefined || n <= max)) {
      onChange(n);
      setRaw(String(n));
    } else {
      setRaw(String(value));
    }
  }

  return (
  <div>
    <label style={{ display: 'block', fontSize: 10, color: textSm, marginBottom: 3 }}>{label}</label>
    <div style={{ display: 'flex', alignItems: 'center', background: inputBg, border: `1px solid ${inputBorder}`, borderRadius: 8, padding: '5px 10px' }}>
      <input type="number" step={step} min={min} max={max} value={raw}
        onFocus={() => { focused.current = true; }}
        onChange={e => setRaw(e.target.value)}
        onBlur={e => { focused.current = false; commit(e.target.value); }}
        onKeyDown={e => { if (e.key === 'Enter') commit((e.target as HTMLInputElement).value); }}
        style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', fontSize: 13, color: dark ? '#e2e8f0' : '#0f172a', fontFamily: 'Inter, system-ui, sans-serif' }}
      />
    </div>
  </div>
  );
};

const Section: React.FC<{ title: string; textSm: string; children: React.ReactNode }> = ({ title, textSm, children }) => (
  <div style={{ marginBottom: 20 }}>
    <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: textSm, marginBottom: 10 }}>{title}</p>
    {children}
  </div>
);

// ── Main panel ────────────────────────────────────────────────────────────────

export const PropertiesPanel: React.FC<Props> = ({
  object, objects, room, onUpdate, onDelete, onDeselect, dark,
  adjacentRooms, onAddAdjacentRoom, onUpdateAdjacentRoom, onRemoveAdjacentRoom,
  radarObj = null,
}) => {
  const bg          = dark ? '#0d1117'                : '#ffffff';
  const border      = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)';
  const textMd      = dark ? '#cbd5e1'                : '#334155';
  const textSm      = dark ? '#475569'                : '#94a3b8';
  const inputBg     = dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)';
  const inputBorder = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)';

  const fieldProps = { inputBg, inputBorder, textSm, dark };

  // ── Empty state — show live config export preview ─────────────────────────
  if (!object) {
    const radar   = objects.find(o => o.type === 'radar');
    const originX = radar ? radar.x + radar.width  / 2 : 0;
    const originY = radar ? radar.y + radar.height / 2 : 0;

    const configObjs = objects.map(obj => {
      const left   = +(obj.x             - originX).toFixed(3);
      const right  = +(obj.x + obj.width  - originX).toFixed(3);
      const top    = +(originY - obj.y            ).toFixed(3);
      const bottom = +(originY - (obj.y + obj.height)).toFixed(3);
      return { name: obj.label.toLowerCase().replace(/\s+/g,'_'), top_left:[left,top], bottom_right:[right,bottom] };
    });

    const preview = JSON.stringify({ device_configs: { board: '<board>', location: room.name }, objects: configObjs }, null, 2);

    return (
      <aside style={{ width: 240, background: bg, borderLeft: `1px solid ${border}`, flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ padding: '12px 14px', borderBottom: `1px solid ${border}`, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>↓</div>
          <div>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: dark ? '#f1f5f9' : '#0f172a' }}>Export Preview</p>
            <p style={{ margin: 0, fontSize: 10, color: textSm }}>{objects.length} objects · {room.width}×{room.height} m</p>
          </div>
        </div>

        {/* Radar origin badge */}
        {radar ? (
          <div style={{ margin: '10px 12px 0', padding: '7px 10px', borderRadius: 8, background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ fontSize: 14 }}>📡</span>
            <div>
              <p style={{ margin: 0, fontSize: 10, fontWeight: 700, color: '#818cf8' }}>Radar origin (0, 0)</p>
              <p style={{ margin: 0, fontSize: 9, color: textSm, fontFamily: 'monospace' }}>x={radar.x.toFixed(3)} y={radar.y.toFixed(3)} m</p>
            </div>
          </div>
        ) : (
          <div style={{ margin: '10px 12px 0', padding: '7px 10px', borderRadius: 8, background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.2)' }}>
            <p style={{ margin: 0, fontSize: 10, color: '#f59e0b' }}>⚠ No radar placed — coordinates are room-relative</p>
          </div>
        )}

        {/* JSON preview */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px' }}>
          <p style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: textSm, marginBottom: 6 }}>Config JSON</p>
          <pre style={{
            margin: 0, fontSize: 9.5, lineHeight: 1.65,
            fontFamily: 'monospace',
            color: dark ? '#7dd3fc' : '#0369a1',
            background: dark ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.04)',
            border: `1px solid ${inputBorder}`,
            borderRadius: 8, padding: '10px 10px',
            whiteSpace: 'pre-wrap', wordBreak: 'break-all',
          }}>{preview}</pre>
        </div>

        {/* Hint */}
        <div style={{ padding: '10px 12px', borderTop: `1px solid ${border}` }}>
          <p style={{ margin: 0, fontSize: 10, color: textSm, textAlign: 'center', lineHeight: 1.5 }}>Click any object to edit · ↓ Export to download full config</p>
        </div>
      </aside>
    );
  }

  // narrowed ref for closures (avoids TS null errors)
  const obj    = object;
  const preset = OBJECT_PRESETS[obj.type];

  function clampField(field: 'x' | 'y' | 'width' | 'height') {
    return (v: number) => {
      if (field === 'width')  v = Math.max(0.1, v);
      if (field === 'height') v = Math.max(0.1, v);
      if (field === 'x' || field === 'y') {
        const r = (obj.rotation * Math.PI) / 180;
        const c = Math.abs(Math.cos(r)), s = Math.abs(Math.sin(r));
        const ew = obj.width * c + obj.height * s;
        const eh = obj.width * s + obj.height * c;
        const ox = (ew - obj.width)  / 2;
        const oy = (eh - obj.height) / 2;
        if (field === 'x') v = Math.max(ox, Math.min(v, room.width  - obj.width  - ox));
        if (field === 'y') v = Math.max(oy, Math.min(v, room.height - obj.height - oy));
      }
      onUpdate({ [field]: v });
    };
  }

  // ── Filled state ───────────────────────────────────────────────────────────
  return (
    <aside style={{ width: 220, background: bg, borderLeft: `1px solid ${border}`, flexShrink: 0, display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderBottom: `1px solid ${border}` }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0, background: obj.color + '20', border: `1.5px solid ${obj.color}40` }}>
          {preset.emoji}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <input type="text" value={obj.label}
            onChange={e => onUpdate({ label: e.target.value })}
            style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', fontSize: 13, fontWeight: 600, color: dark ? '#f1f5f9' : '#0f172a', fontFamily: 'Inter, system-ui, sans-serif' }}
          />
          <p style={{ fontSize: 10, color: textSm, textTransform: 'capitalize', marginTop: 1 }}>{obj.type}</p>
        </div>
        <button onClick={onDeselect}
          style={{ width: 22, height: 22, borderRadius: 6, background: inputBg, border: `1px solid ${inputBorder}`, cursor: 'pointer', color: textSm, fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✕</button>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 14px' }}>

        <Section title={radarObj && obj.type !== 'radar' ? 'Position — radar-relative (m)' : 'Position (m)'} textSm={textSm}>
          {(() => {
            const rox = radarObj && obj.type !== 'radar' ? radarObj.x + radarObj.width  / 2 : 0;
            const roy = radarObj && obj.type !== 'radar' ? radarObj.y + radarObj.height / 2 : 0;
            return (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <Field label="X →" value={+(obj.x - rox).toFixed(3)} step={0.05}
                  onChange={v => clampField('x')(v + rox)} {...fieldProps} />
                <Field label="Y ↓" value={+(obj.y - roy).toFixed(3)} step={0.05}
                  onChange={v => clampField('y')(v + roy)} {...fieldProps} />
              </div>
            );
          })()}
          {radarObj && obj.type !== 'radar' && (
            <p style={{ fontSize: 9, color: textSm, marginTop: 4, fontFamily: 'monospace' }}>
              📡 origin = radar centre
            </p>
          )}
        </Section>

        <Section title="Margins (m)" textSm={textSm}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <Field label="Top"    value={obj.marginTop    ?? 0} step={0.05} min={0} onChange={v => onUpdate({ marginTop:    v })} {...fieldProps} />
            <Field label="Bottom" value={obj.marginBottom ?? 0} step={0.05} min={0} onChange={v => onUpdate({ marginBottom: v })} {...fieldProps} />
            <Field label="Left"   value={obj.marginLeft   ?? 0} step={0.05} min={0} onChange={v => onUpdate({ marginLeft:   v })} {...fieldProps} />
            <Field label="Right"  value={obj.marginRight  ?? 0} step={0.05} min={0} onChange={v => onUpdate({ marginRight:  v })} {...fieldProps} />
          </div>
          <p style={{ fontSize: 9, color: textSm, marginTop: 4 }}>Extra buffer zone around object for radar detection</p>
        </Section>

        <Section title="Size (m)" textSm={textSm}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <Field label="Width"  value={obj.width}  step={0.1} min={0.1} onChange={clampField('width')}  {...fieldProps} />
            <Field label="Height" value={obj.height} step={0.1} min={0.1} onChange={clampField('height')} {...fieldProps} />
          </div>
          <div style={{ marginTop: 8, height: 3, borderRadius: 99, background: inputBg, overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: 99, background: obj.color, width: `${Math.min(100, (obj.width / room.width) * 100)}%` }} />
          </div>
          <p style={{ fontSize: 9, color: textSm, marginTop: 4, fontFamily: 'monospace' }}>{(obj.width * obj.height).toFixed(2)} m²</p>
        </Section>

        <Section title={obj.type === 'bed' || obj.type === 'sofa' ? 'Facing' : 'Rotation'} textSm={textSm}>
          {(obj.type === 'bed' || obj.type === 'sofa') ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 4, marginBottom: 10 }}>
              {([
                { deg: 0,   label: '↑ Top' },
                { deg: 90,  label: '→ Right' },
                { deg: 180, label: '↓ Bottom' },
                { deg: 270, label: '← Left' },
              ] as const).map(({ deg, label }) => (
                <button key={deg} onClick={() => onUpdate({ rotation: deg })}
                  style={{ padding: '5px 0', borderRadius: 8, fontSize: 10, fontWeight: 500, cursor: 'pointer', border: '1px solid', transition: 'all 0.15s',
                    background:   obj.rotation === deg ? obj.color  : inputBg,
                    borderColor:  obj.rotation === deg ? obj.color  : inputBorder,
                    color:        obj.rotation === deg ? '#fff'     : textSm,
                  }}>{label}</button>
              ))}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 4, marginBottom: 10 }}>
              {[0, 90, 180, 270].map(deg => (
                <button key={deg} onClick={() => onUpdate({ rotation: deg })}
                  style={{ padding: '5px 0', borderRadius: 8, fontSize: 11, fontWeight: 500, cursor: 'pointer', border: '1px solid', transition: 'all 0.15s',
                    background:   obj.rotation === deg ? obj.color  : inputBg,
                    borderColor:  obj.rotation === deg ? obj.color  : inputBorder,
                    color:        obj.rotation === deg ? '#fff'     : textSm,
                  }}>{deg}°</button>
              ))}
            </div>
          )}
          <input type="range" min={0} max={359} step={1} value={obj.rotation}
            onChange={e => onUpdate({ rotation: +e.target.value })}
            style={{ width: '100%', accentColor: obj.color }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <span style={{ fontSize: 9, color: textSm }}>0°</span>
            <span style={{ fontSize: 10, color: dark ? '#e2e8f0' : '#334155', fontFamily: 'monospace', fontWeight: 600 }}>{obj.rotation}°</span>
            <span style={{ fontSize: 9, color: textSm }}>359°</span>
          </div>
        </Section>

        <Section title="Colour" textSm={textSm}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <input type="color" value={obj.color} onChange={e => onUpdate({ color: e.target.value })}
              style={{ width: 36, height: 36, borderRadius: 8, cursor: 'pointer', border: `2px solid ${obj.color}55`, padding: 2 }} />
            <div>
              <p style={{ fontSize: 12, fontFamily: 'monospace', color: dark ? '#e2e8f0' : '#334155', fontWeight: 600 }}>{obj.color.toUpperCase()}</p>
              {obj.color !== preset.color && (
                <button onClick={() => onUpdate({ color: preset.color })}
                  style={{ fontSize: 10, color: textSm, background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}>reset</button>
              )}
            </div>
          </div>
        </Section>

        {/* Adjacent room — shown when a door is near a wall */}
        {obj.type === 'door' && (() => {
          const wall = detectDoorWall(obj, room);
          if (!wall) return null;
          const adjRoom = adjacentRooms.find(r => r.doorId === obj.id);
          const wallLabel = wall.charAt(0).toUpperCase() + wall.slice(1);
          const isDepthWidth = wall === 'left' || wall === 'right';
          const defaultW = isDepthWidth ? 3.0 : room.width;
          const defaultH = isDepthWidth ? room.height : 3.0;

          return (
            <Section title={`${wallLabel} Wall`} textSm={textSm}>
              {!adjRoom ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <p style={{ fontSize: 10, color: textSm, margin: 0 }}>Add space on {wall} side:</p>
                  {([
                    { type: 'room'     as AdjacentRoomType, label: '🏠 Room',     color: 'rgba(99,102,241', w: defaultW, h: defaultH },
                    { type: 'passage'  as AdjacentRoomType, label: '🚶 Passage',  color: 'rgba(16,185,129', w: isDepthWidth ? 1.2 : room.width, h: isDepthWidth ? room.height : 1.2 },
                    { type: 'bathroom' as AdjacentRoomType, label: '🚿 Bathroom', color: 'rgba(6,182,212',  w: isDepthWidth ? 1.8 : 1.8, h: isDepthWidth ? 2.2 : 1.8 },
                  ]).map(({ type, label, color, w, h }) => (
                    <button key={type}
                      onClick={() => onAddAdjacentRoom(obj.id, wall, w, h, type)}
                      style={{
                        width: '100%', padding: '7px 10px', borderRadius: 9, textAlign: 'left',
                        border: `1px solid ${color},0.3)`,
                        background: `${color},0.08)`, color: `${color},0.9)`,
                        fontSize: 12, fontWeight: 600, cursor: 'pointer',
                        fontFamily: 'inherit', transition: 'all 0.15s',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${color},0.18)`; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = `${color},0.08)`; }}
                    >{label}</button>
                  ))}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {/* Name */}
                  <div>
                    <label style={{ display: 'block', fontSize: 10, color: textSm, marginBottom: 3 }}>Name</label>
                    <div style={{ display: 'flex', alignItems: 'center', background: inputBg, border: `1px solid ${inputBorder}`, borderRadius: 8, padding: '5px 10px' }}>
                      <input
                        type="text" value={adjRoom.name}
                        onChange={e => onUpdateAdjacentRoom(adjRoom.id, { name: e.target.value })}
                        style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', fontSize: 13, color: dark ? '#e2e8f0' : '#0f172a', fontFamily: 'inherit' }}
                      />
                    </div>
                  </div>
                  {/* Dimensions */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    <Field
                      label={isDepthWidth ? 'Depth (m)' : 'Width (m)'}
                      value={adjRoom.width} step={0.1} min={0.5}
                      onChange={v => onUpdateAdjacentRoom(adjRoom.id, { width: Math.max(0.5, v) })}
                      inputBg={inputBg} inputBorder={inputBorder} textSm={textSm} dark={dark}
                    />
                    <Field
                      label={isDepthWidth ? 'Height (m)' : 'Depth (m)'}
                      value={adjRoom.height} step={0.1} min={0.5}
                      onChange={v => onUpdateAdjacentRoom(adjRoom.id, { height: Math.max(0.5, v) })}
                      inputBg={inputBg} inputBorder={inputBorder} textSm={textSm} dark={dark}
                    />
                  </div>
                  {/* Area */}
                  <p style={{ fontSize: 9, color: textSm, fontFamily: 'monospace', margin: 0 }}>
                    {(adjRoom.width * adjRoom.height).toFixed(2)} m²
                  </p>
                  {/* Doors inside this adjacent room */}
                  <div>
                    <p style={{ fontSize: 10, fontWeight: 600, color: textSm, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '4px 0 6px' }}>Doors</p>
                    {(adjRoom.doors ?? []).map((d, i) => (
                      <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5, background: inputBg, border: `1px solid ${inputBorder}`, borderRadius: 8, padding: '5px 8px' }}>
                        <span style={{ fontSize: 12 }}>🚪</span>
                        <input
                          type="text" value={d.label}
                          onChange={e => {
                            const doors = (adjRoom.doors ?? []).map((dd, ii) => ii === i ? { ...dd, label: e.target.value } : dd);
                            onUpdateAdjacentRoom(adjRoom.id, { doors });
                          }}
                          style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 12, color: dark ? '#e2e8f0' : '#0f172a', fontFamily: 'inherit' }}
                        />
                        <span style={{ fontSize: 10, color: textSm, fontFamily: 'monospace' }}>{d.width}m</span>
                        <button
                          onClick={() => onUpdateAdjacentRoom(adjRoom.id, { doors: (adjRoom.doors ?? []).filter(dd => dd.id !== d.id) })}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f87171', fontSize: 12, padding: 0, lineHeight: 1 }}
                        >✕</button>
                      </div>
                    ))}
                    {/* Add door buttons — one per wall of the adjacent room */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, marginTop: 4 }}>
                      {(['top','bottom','left','right'] as WallSide[]).map(w => {
                        // Don't offer a door on the wall that connects back to the main room
                        const connectingWall: WallSide = adjRoom.wall === 'left' ? 'right' : adjRoom.wall === 'right' ? 'left' : adjRoom.wall === 'top' ? 'bottom' : 'top';
                        if (w === connectingWall) return null;
                        const wallLen = (w === 'left' || w === 'right') ? adjRoom.height : adjRoom.width;
                        return (
                          <button key={w}
                            onClick={() => {
                              const newDoor = { id: Math.random().toString(36).slice(2,8), wall: w, position: +(wallLen / 2 - 0.45).toFixed(2), width: 0.9, label: 'Door' };
                              onUpdateAdjacentRoom(adjRoom.id, { doors: [...(adjRoom.doors ?? []), newDoor] });
                            }}
                            style={{ padding: '5px 4px', borderRadius: 7, border: '1px solid rgba(251,191,36,0.3)', background: 'rgba(251,191,36,0.07)', color: '#f59e0b', fontSize: 10, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
                          >+ {w} door</button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => onRemoveAdjacentRoom(adjRoom.id)}
                    style={{
                      padding: '5px 0', borderRadius: 8, border: '1px solid rgba(239,68,68,0.2)',
                      background: 'rgba(239,68,68,0.06)', color: '#f87171',
                      fontSize: 11, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#ef4444'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.06)'; (e.currentTarget as HTMLButtonElement).style.color = '#f87171'; }}
                  >
                    Remove adjacent room
                  </button>
                </div>
              )}
            </Section>
          );
        })()}

        {/* Radar info */}
        {obj.type === 'radar' && (
          <div style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 10, padding: 12 }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>📡 Radar Origin</p>
            <p style={{ fontSize: 11, color: textSm, lineHeight: 1.5, marginBottom: 8 }}>Set device firmware origin:</p>
            <div style={{ background: dark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.05)', borderRadius: 8, padding: '8px 10px', fontFamily: 'monospace', fontSize: 12, color: '#a5b4fc', lineHeight: 1.8 }}>
              X = {obj.x.toFixed(3)} m<br />Y = {obj.y.toFixed(3)} m
            </div>
          </div>
        )}
      </div>

      {/* Delete */}
      <div style={{ padding: '12px 14px', borderTop: `1px solid ${border}` }}>
        <button onClick={onDelete}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#ef4444'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(239,68,68,0.08)'; (e.currentTarget as HTMLButtonElement).style.color = '#f87171'; }}
          style={{ width: '100%', padding: '8px 0', borderRadius: 10, border: '1px solid rgba(239,68,68,0.25)', background: 'rgba(239,68,68,0.08)', color: '#f87171', fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'inherit' }}
        >Delete {obj.label}</button>
      </div>
    </aside>
  );
};
