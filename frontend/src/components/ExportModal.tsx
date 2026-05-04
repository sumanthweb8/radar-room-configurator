import React, { useState } from 'react';

interface Props {
  onConfirm: (board: string, location: string) => void;
  onCancel: () => void;
  dark: boolean;
}

export const ExportModal: React.FC<Props> = ({ onConfirm, onCancel, dark }) => {
  const [board,    setBoard]    = useState('');
  const [location, setLocation] = useState('');

  const bg          = dark ? '#0d1117'                : '#ffffff';
  const border      = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)';
  const textMd      = dark ? '#e2e8f0'                : '#0f172a';
  const textSm      = dark ? '#64748b'                : '#94a3b8';
  const inputBg     = dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)';
  const inputBorder = dark ? 'rgba(255,255,255,0.1)'  : 'rgba(0,0,0,0.12)';

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: 16, padding: 24, width: 340, boxShadow: '0 24px 48px rgba(0,0,0,0.4)' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>📥</div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: textMd, margin: 0 }}>Export Config</p>
            <p style={{ fontSize: 11, color: textSm, margin: 0, marginTop: 2 }}>Enter device details before downloading</p>
          </div>
        </div>

        {/* Fields */}
        {[
          { label: 'Board ID', value: board, set: setBoard, placeholder: 'e.g. kc2505p004', type: 'text' },
          { label: 'Location', value: location, set: setLocation, placeholder: 'e.g. room1', type: 'text' },
        ].map(({ label, value, set, placeholder, type }) => (
          <div key={label} style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 500, color: textSm, marginBottom: 5 }}>{label}</label>
            <input
              type={type} value={value} placeholder={placeholder}
              onChange={e => set(e.target.value)}
              style={{ width: '100%', background: inputBg, border: `1px solid ${inputBorder}`, borderRadius: 8, padding: '8px 12px', fontSize: 13, color: textMd, outline: 'none', fontFamily: 'monospace', boxSizing: 'border-box' }}
            />
          </div>
        ))}


        {/* Preview */}
        {(board || location) && (
          <div style={{ background: dark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.04)', border: `1px solid ${inputBorder}`, borderRadius: 8, padding: '10px 12px', fontFamily: 'monospace', fontSize: 11, color: textSm, lineHeight: 1.8, marginBottom: 16 }}>
            <span style={{ color: dark ? '#475569' : '#94a3b8' }}>"device_configs":</span> {'{'}<br/>
            <span style={{ marginLeft: 12, color: '#86efac' }}>"board": "{board || '…'}"</span>,<br/>
            <span style={{ marginLeft: 12, color: '#86efac' }}>"location": "{location || '…'}"</span><br/>
            {'}'}
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onCancel}
            style={{ flex: 1, padding: '9px 0', borderRadius: 9, border: `1px solid ${inputBorder}`, background: 'transparent', color: textSm, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
            Cancel
          </button>
          <button
            disabled={!board.trim() || !location.trim()}
            onClick={() => onConfirm(board.trim(), location.trim())}
            style={{ flex: 1, padding: '9px 0', borderRadius: 9, border: 'none', background: (!board.trim() || !location.trim()) ? '#374151' : 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', fontSize: 12, fontWeight: 600, cursor: (!board.trim() || !location.trim()) ? 'not-allowed' : 'pointer', opacity: (!board.trim() || !location.trim()) ? 0.5 : 1, fontFamily: 'inherit' }}>
            ↓ Download JSON
          </button>
        </div>
      </div>
    </div>
  );
};
