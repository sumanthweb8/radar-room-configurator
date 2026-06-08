import React, { useState } from 'react';
import { publishConfig } from '../api';

interface Props {
  onClose: () => void;
  dark: boolean;
  defaultLocation?: string;
  hasRadar: boolean;
  /** Build the gateway payload from the entered (board, location). */
  buildPayload: (board: string, location: string) => Record<string, unknown>;
}

type Status = 'idle' | 'publishing' | 'ok' | 'error';

/**
 * "Publish to KuboCare" — posts the current room layout to the gateway
 * (POST /api/v1/room-config), keyed by (board, location). RRC stays independent;
 * this is the only outbound call. The gateway resolves the room and stores it.
 */
export const PublishModal: React.FC<Props> = ({ onClose, dark, defaultLocation, hasRadar, buildPayload }) => {
  const [board, setBoard] = useState('');
  const [location, setLocation] = useState(defaultLocation ?? '');
  const [gateway, setGateway] = useState((import.meta.env.VITE_GATEWAY_BASE as string) ?? '');
  const [token, setToken] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState<string | null>(null);

  const bg          = dark ? '#0d1117'                : '#ffffff';
  const border      = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)';
  const textMd      = dark ? '#e2e8f0'                : '#0f172a';
  const textSm      = dark ? '#64748b'                : '#94a3b8';
  const inputBg     = dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)';
  const inputBorder = dark ? 'rgba(255,255,255,0.1)'  : 'rgba(0,0,0,0.12)';

  const fields: { label: string; value: string; set: (v: string) => void; placeholder: string; type: string }[] = [
    { label: 'Board ID',    value: board,    set: setBoard,    placeholder: 'e.g. kc2505p004',           type: 'text' },
    { label: 'Location',    value: location, set: setLocation, placeholder: 'e.g. room1',                type: 'text' },
    { label: 'Gateway URL', value: gateway,  set: setGateway,  placeholder: 'https://gateway.kubocare…', type: 'text' },
    { label: 'Token (JWT)', value: token,    set: setToken,    placeholder: 'gateway bearer token',      type: 'password' },
  ];

  const disabled = !board.trim() || !location.trim() || !gateway.trim() || status === 'publishing';

  async function handlePublish() {
    setStatus('publishing');
    setMessage(null);
    try {
      const payload = buildPayload(board.trim(), location.trim());
      const res = await publishConfig(payload, gateway.trim() || undefined, token.trim() || undefined);
      setStatus('ok');
      setMessage(`Published → room ${res.room_id}, version ${res.version}`);
    } catch (e: unknown) {
      setStatus('error');
      setMessage(e instanceof Error ? e.message : 'Publish failed');
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
      <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: 16, padding: 24, width: 440, maxHeight: '85vh', overflowY: 'auto', boxShadow: '0 24px 48px rgba(0,0,0,0.4)' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🚀</div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: textMd, margin: 0 }}>Publish to KuboCare</p>
            <p style={{ fontSize: 11, color: textSm, margin: 0, marginTop: 2 }}>Sends this layout to the gateway, keyed by board + location.</p>
          </div>
        </div>

        {!hasRadar && (
          <div style={{ background: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.3)', borderRadius: 8, padding: '8px 10px', marginBottom: 14, fontSize: 10, color: '#eab308', lineHeight: 1.6 }}>
            <strong style={{ fontSize: 11 }}>⚠ No radar placed</strong>
            <div style={{ color: dark ? '#a3a3a3' : '#737373', marginTop: 2 }}>
              Without a radar, alignment can't be computed — the gateway will fall back to its default and the overlay may be approximate.
            </div>
          </div>
        )}

        {/* Fields */}
        {fields.map(({ label, value, set, placeholder, type }) => (
          <div key={label} style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 500, color: textSm, marginBottom: 5 }}>{label}</label>
            <input
              type={type} value={value} placeholder={placeholder}
              onChange={e => set(e.target.value)}
              style={{ width: '100%', background: inputBg, border: `1px solid ${inputBorder}`, borderRadius: 8, padding: '8px 12px', fontSize: 13, color: textMd, outline: 'none', fontFamily: 'monospace', boxSizing: 'border-box' }}
            />
          </div>
        ))}

        {/* Status */}
        {message && (
          <div style={{
            background: status === 'error' ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
            border: `1px solid ${status === 'error' ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)'}`,
            borderRadius: 8, padding: '8px 10px', marginBottom: 16, fontSize: 11,
            color: status === 'error' ? '#ef4444' : '#10b981', lineHeight: 1.5, fontFamily: 'monospace',
          }}>
            {status === 'error' ? '✕ ' : '✓ '}{message}
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onClose}
            style={{ flex: 1, padding: '9px 0', borderRadius: 9, border: `1px solid ${inputBorder}`, background: 'transparent', color: textSm, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
            {status === 'ok' ? 'Close' : 'Cancel'}
          </button>
          <button
            disabled={disabled}
            onClick={handlePublish}
            style={{ flex: 1, padding: '9px 0', borderRadius: 9, border: 'none', background: disabled ? '#374151' : 'linear-gradient(135deg,#10b981,#059669)', color: '#fff', fontSize: 12, fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, fontFamily: 'inherit' }}>
            {status === 'publishing' ? 'Publishing…' : '🚀 Publish'}
          </button>
        </div>
      </div>
    </div>
  );
};
