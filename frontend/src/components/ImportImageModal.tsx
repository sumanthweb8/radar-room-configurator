import React, { useCallback, useRef, useState } from 'react';

interface Props {
  dark: boolean;
  onImport: (data: { room: { name: string; width: number; height: number }; objects: any[] }) => void;
  onCancel: () => void;
}

// Convert any image file (including HEIC on Safari/Mac) to a JPEG blob via canvas
async function toJpegBlob(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width  = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      canvas.toBlob(b => b ? resolve(b) : reject(new Error('Canvas toBlob failed')), 'image/jpeg', 0.92);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Image failed to load — try exporting as PNG/JPG from Preview')); };
    img.src = url;
  });
}

const MANUAL_LAYOUT = {
  room: { name: 'Room', width: 5.2, height: 4.64 },
  objects: [
    { type: 'radar',  label: 'Device',       x: 0.05, y: 1.55, width: 0.15, height: 0.15, rotation: 0 },
    { type: 'bed',    label: 'Bed',           x: 1.065, y: 3.65, width: 1.32,  height: 0.91,  rotation: 0 },
    { type: 'door',   label: 'Room Door',     x: 3.38, y: 0.8,  width: 0.9,   height: 0.15,  rotation: 90 },
    { type: 'custom', label: 'Passage',       x: 3.45, y: 0.0,  width: 1.75,  height: 2.14,  rotation: 0 },
    { type: 'door',   label: 'Bathroom Door', x: 3.38, y: 2.5,  width: 0.8,   height: 0.15,  rotation: 90 },
    { type: 'custom', label: 'Bathroom',      x: 3.45, y: 2.14, width: 1.75,  height: 2.50,  rotation: 0 },
    { type: 'door',   label: 'Entry Door',    x: 5.05, y: 0.5,  width: 0.9,   height: 0.15,  rotation: 90 },
  ],
};

export const ImportImageModal: React.FC<Props> = ({ dark, onImport, onCancel }) => {
  const [file,     setFile]     = useState<File | null>(null);
  const [preview,  setPreview]  = useState<string | null>(null);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef    = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const bg          = dark ? '#0d1117'                : '#ffffff';
  const border      = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)';
  const textMd      = dark ? '#e2e8f0'                : '#0f172a';
  const textSm      = dark ? '#64748b'                : '#94a3b8';
  const inputBorder = dark ? 'rgba(255,255,255,0.1)'  : 'rgba(0,0,0,0.12)';
  const dropBg      = dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';

  const isPdf = (f: File) => f.type === 'application/pdf' || /\.pdf$/i.test(f.name);

  function pickFile(f: File) {
    setFile(f);
    setError(null);
    if (isPdf(f)) {
      setPreview(null); // no image preview for PDFs
    } else {
      const url = URL.createObjectURL(f);
      setPreview(url);
    }
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) pickFile(f);
  }, []);

  async function handleImport() {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const form = new FormData();

      const API = import.meta.env.VITE_API_BASE ?? '';

      if (isPdf(file)) {
        // ── Metaroom PDF path ──────────────────────────────────────────────
        form.append('file', file);
        const res = await fetch(`${API}/api/import-metaroom`, { method: 'POST', body: form });
        if (!res.ok) {
          const detail = await res.json().then(j => j.detail).catch(() => res.statusText);
          throw new Error(detail);
        }
        const data = await res.json();
        // Pass the full multi-room payload — App.tsx will create one tab per room
        if (data.rooms && data.rooms.length > 0) {
          onImport({ rooms: data.rooms } as any);
        }
      } else {
        // ── Image path (Claude vision) — returns same rooms[] format ──────
        const jpeg = await toJpegBlob(file);
        form.append('file', new File([jpeg], 'upload.jpg', { type: 'image/jpeg' }));
        const res = await fetch(`${API}/api/import-image`, { method: 'POST', body: form });
        if (!res.ok) {
          const detail = await res.json().then(j => j.detail).catch(() => res.statusText);
          throw new Error(detail);
        }
        const data = await res.json();
        // Both PDF and image now return { rooms: [...] }
        onImport(data.rooms ? data : { rooms: [data] });
      }
    } catch (e: any) {
      console.error('Import error:', e);
      setError(e.message ?? 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  const hasApiCreditsError = error?.toLowerCase().includes('credit') || error?.toLowerCase().includes('billing');

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}>
      <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: 18, padding: 26, width: 420, maxWidth: '95vw', boxShadow: '0 32px 64px rgba(0,0,0,0.5)' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🗺</div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: textMd, margin: 0 }}>Import Floor Plan</p>
            <p style={{ fontSize: 11, color: textSm, margin: 0, marginTop: 2 }}>Upload an image or Metaroom PDF to extract the layout</p>
          </div>
          <button onClick={onCancel} style={{ marginLeft: 'auto', width: 26, height: 26, borderRadius: 7, background: 'transparent', border: `1px solid ${inputBorder}`, cursor: 'pointer', color: textSm, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>

        {/* Two picker buttons side by side */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          <button
            onClick={() => inputRef.current?.click()}
            style={{
              flex: 1, padding: '10px 0', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit',
              border: `1px solid ${inputBorder}`, background: dropBg,
              color: textMd, fontSize: 12, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            }}
          >
            🖼 Browse Image
          </button>
          <button
            onClick={() => pdfInputRef.current?.click()}
            style={{
              flex: 1, padding: '10px 0', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit',
              border: '1px solid rgba(139,92,246,0.4)', background: 'rgba(139,92,246,0.08)',
              color: '#a78bfa', fontSize: 12, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            }}
          >
            📄 Browse Metaroom PDF
          </button>
        </div>

        {/* Hidden inputs */}
        <input ref={inputRef} type="file" accept="image/*,.heic,.heif" style={{ display: 'none' }}
          onChange={e => { const f = e.target.files?.[0]; if (f) pickFile(f); }} />
        <input ref={pdfInputRef} type="file" accept=".pdf" style={{ display: 'none' }}
          onChange={e => { const f = e.target.files?.[0]; if (f) pickFile(f); }} />

        {/* Drop zone — shows selected file info or drag hint */}
        <div
          onDrop={onDrop}
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          style={{
            border: `2px dashed ${dragOver ? '#6366f1' : inputBorder}`,
            borderRadius: 12, background: dragOver ? 'rgba(99,102,241,0.08)' : dropBg,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            minHeight: 90, transition: 'all 0.15s', overflow: 'hidden', padding: 8,
          }}
        >
          {preview ? (
            <img src={preview} alt="preview" style={{ maxWidth: '100%', maxHeight: 180, objectFit: 'contain', display: 'block' }} />
          ) : file && isPdf(file) ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ fontSize: 32 }}>📄</div>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#a78bfa', margin: 0 }}>{file.name}</p>
              <p style={{ fontSize: 10, color: textSm, margin: 0 }}>Metaroom PDF · {(file.size / 1024).toFixed(0)} KB — ready to import</p>
            </div>
          ) : (
            <p style={{ fontSize: 11, color: textSm, margin: 0 }}>or drag & drop a file here</p>
          )}
        </div>

        {/* Error */}
        {error && (
          <div style={{ marginTop: 12, padding: '10px 12px', borderRadius: 9, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#f87171', fontSize: 11, lineHeight: 1.6 }}>
            {hasApiCreditsError
              ? <>No API credits. Add credits at <strong>console.anthropic.com/settings/billing</strong> — or use the button below.</>
              : error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ marginTop: 12, padding: '10px 12px', borderRadius: 9, background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid #6366f1', borderTopColor: 'transparent', animation: 'spin 0.7s linear infinite', flexShrink: 0 }} />
            <p style={{ fontSize: 12, color: '#818cf8', margin: 0 }}>{file && isPdf(file) ? 'Parsing Metaroom PDF…' : 'Claude is reading and placing every room & object…'}</p>
          </div>
        )}

        {/* Primary buttons */}
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <button onClick={onCancel} disabled={loading}
            style={{ flex: 1, padding: '9px 0', borderRadius: 9, border: `1px solid ${inputBorder}`, background: 'transparent', color: textSm, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
            Cancel
          </button>
          <button onClick={handleImport} disabled={!file || loading}
            style={{
              flex: 2, padding: '9px 0', borderRadius: 9, border: 'none',
              background: (!file || loading) ? (dark ? '#1e293b' : '#e2e8f0') : 'linear-gradient(135deg,#6366f1,#8b5cf6)',
              color: (!file || loading) ? textSm : '#fff',
              fontSize: 12, fontWeight: 700, cursor: (!file || loading) ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit', transition: 'all 0.15s',
            }}>
            {loading ? (file && isPdf(file) ? 'Parsing…' : 'Extracting…') : '✦ Extract & Import'}
          </button>
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '14px 0' }}>
          <div style={{ flex: 1, height: 1, background: inputBorder }} />
          <span style={{ fontSize: 10, color: textSm }}>OR</span>
          <div style={{ flex: 1, height: 1, background: inputBorder }} />
        </div>

        {/* Manual load — always visible */}
        <button
          onClick={() => onImport(MANUAL_LAYOUT)}
          style={{
            width: '100%', padding: '10px 0', borderRadius: 10,
            border: '1px solid rgba(251,191,36,0.35)', background: 'rgba(251,191,36,0.08)',
            color: '#f59e0b', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(251,191,36,0.15)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(251,191,36,0.08)'; }}
        >
          ✏️ Load your sketch directly (3.45×4.64m · Bed · Device · Passage · Bathroom)
        </button>

      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};
