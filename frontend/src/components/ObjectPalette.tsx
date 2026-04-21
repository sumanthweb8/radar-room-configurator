import React, { useState, useEffect, useRef } from 'react';
import { OBJECT_PRESETS, type ObjectType, type RoomConfig } from '../types';

interface Props {
  room: RoomConfig;
  onRoomChange: (r: RoomConfig) => void;
  onAdd: (t: ObjectType) => void;
  dark: boolean;
}

// Standalone component so it keeps its own local string state without remounting
function RoomSizeField({ label, value, onChange, dark, inputBg, border, textSm }: {
  label: string; value: number; onChange: (v: number) => void;
  dark: boolean; inputBg: string; border: string; textSm: string;
}) {
  const [raw, setRaw] = useState(String(value));
  const focused = useRef(false);

  // Sync display when parent changes value externally (e.g. after import)
  useEffect(() => {
    if (!focused.current) setRaw(String(value));
  }, [value]);

  function commit(str: string) {
    const n = parseFloat(str);
    if (!isNaN(n) && n > 0) {
      onChange(n);
      setRaw(String(n));
    } else {
      setRaw(String(value)); // revert
    }
  }

  return (
    <div style={{ flex: 1 }}>
      <label style={{ display: 'block', fontSize: 10, color: textSm, marginBottom: 4 }}>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center', background: inputBg, border: `1px solid ${border}`, borderRadius: 8, padding: '5px 10px', gap: 4 }}>
        <input
          data-rsf={label}
          type="number"
          step="0.1"
          min="0.1"
          value={raw}
          onChange={e => setRaw(e.target.value)}
          onFocus={() => { focused.current = true; }}
          onBlur={e => { focused.current = false; commit(e.target.value); }}
          onKeyDown={e => { if (e.key === 'Enter') commit((e.target as HTMLInputElement).value); }}
          style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', fontSize: 13, color: dark ? '#e2e8f0' : '#0f172a', fontFamily: 'inherit' }}
        />
        <span style={{ fontSize: 10, color: textSm, flexShrink: 0 }}>m</span>
      </div>
    </div>
  );
}

const CATEGORIES: { label: string; types: ObjectType[] }[] = [
  { label: 'Furniture',  types: ['bed', 'sofa', 'table', 'desk', 'chair', 'wardrobe', 'cabinet'] },
  { label: 'Structural', types: ['door', 'window'] },
  { label: 'Technology', types: ['radar', 'person', 'custom'] },
];

export const ObjectPalette: React.FC<Props> = ({ room, onRoomChange, onAdd, dark }) => {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const bg      = dark ? '#0d1117'              : '#ffffff';
  const border  = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)';
  const textSm  = dark ? '#475569'              : '#94a3b8';
  const inputBg = dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)';
  const cardBg  = dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';
  const cardBorderDefault = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)';

  return (
    <aside style={{ width: 220, background: bg, borderRight: `1px solid ${border}`, flexShrink: 0 }}
      className="flex flex-col overflow-hidden z-10"
    >
      {/* Room Size */}
      <div style={{ padding: '14px 14px 12px', borderBottom: `1px solid ${border}` }}>
        <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', color: textSm, textTransform: 'uppercase', marginBottom: 10 }}>
          Room Size
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['width', 'height'] as const).map((key, i) => (
            <RoomSizeField
              key={key}
              label={i === 0 ? 'Width' : 'Length'}
              value={room[key]}
              onChange={v => onRoomChange({ ...room, [key]: v })}
              dark={dark}
              inputBg={inputBg}
              border={border}
              textSm={textSm}
            />
          ))}
        </div>

        {/* Area pill */}
        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 7, padding: '4px 10px' }}>
          <span style={{ fontSize: 10, color: '#818cf8' }}>Area</span>
          <span style={{ fontSize: 11, color: '#a5b4fc', fontWeight: 600, fontFamily: 'monospace' }}>
            {(room.width * room.height).toFixed(1)} m²
          </span>
        </div>
      </div>

      {/* Categories */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 8 }}>
        {CATEGORIES.map(({ label, types }) => {
          const open = !collapsed.has(label);
          return (
            <div key={label}>
              <button
                onClick={() => setCollapsed(prev => { const s = new Set(prev); s.has(label) ? s.delete(label) : s.add(label); return s; })}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px 6px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: textSm }}
              >
                <span>{label}</span>
                <span style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none', fontSize: 9, color: textSm }}>▾</span>
              </button>

              {open && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, padding: '0 10px 8px' }}>
                  {types.map(type => {
                    const p = OBJECT_PRESETS[type];
                    return (
                      <button key={type} onClick={() => onAdd(type)}
                        title={p.description}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.background = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)';
                          (e.currentTarget as HTMLElement).style.borderColor = p.color + '60';
                          (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.background = cardBg;
                          (e.currentTarget as HTMLElement).style.borderColor = cardBorderDefault;
                          (e.currentTarget as HTMLElement).style.transform = 'none';
                        }}
                        style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                          gap: 4, padding: '10px 6px', borderRadius: 10,
                          background: cardBg, border: `1px solid ${cardBorderDefault}`,
                          cursor: 'pointer', transition: 'all 0.15s', position: 'relative', overflow: 'hidden',
                        }}
                      >
                        {/* colour dot top-right */}
                        <div style={{ position: 'absolute', top: 5, right: 5, width: 5, height: 5, borderRadius: '50%', background: p.color, opacity: 0.7 }} />
                        <span style={{ fontSize: 22, lineHeight: 1, filter: `drop-shadow(0 1px 4px ${p.color}50)` }}>{p.emoji}</span>
                        <span style={{ fontSize: 11, fontWeight: 500, color: dark ? '#cbd5e1' : '#334155' }}>{p.label}</span>
                        <span style={{ fontSize: 9, color: textSm, fontFamily: 'monospace' }}>{p.defaultWidth}×{p.defaultHeight}m</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ padding: '10px 14px', borderTop: `1px solid ${border}` }}>
        <p style={{ fontSize: 10, color: textSm, lineHeight: 1.5 }}>Click to place · Drag to move · R to rotate</p>
      </div>
    </aside>
  );
};
