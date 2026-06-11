// Client-side persistence for the editing session (rooms + objects + plot zone).
// RRC's backend is parser-only by design, so the working draft lives in the
// browser's localStorage — survives refresh, no server/DB. The authoritative,
// shareable copy still goes through Publish (gateway room_configs).

import type { TabState } from './App'

const KEY = 'rrc.session.v1'; // bump the suffix if TabState's shape changes
const DEBOUNCE_MS = 300;

export interface Session {
  tabs: TabState[];
  activeIdx: number;
}

/** Restore the saved session, or null if absent/empty/corrupt. */
export function loadSession(): Session | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const tabs = parsed?.tabs;
    if (!Array.isArray(tabs) || tabs.length === 0) return null;
    const idx = Number.isInteger(parsed?.activeIdx) ? parsed.activeIdx : 0;
    const activeIdx = Math.min(Math.max(0, idx), tabs.length - 1);
    return { tabs, activeIdx };
  } catch {
    return null; // malformed JSON / unavailable storage → fall back to defaults
  }
}

/** Write the session immediately (synchronous — used by tests). */
export function saveSessionNow(tabs: TabState[], activeIdx: number): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ tabs, activeIdx }));
  } catch {
    // quota exceeded / serialization error — best-effort, ignore
  }
}

let timer: ReturnType<typeof setTimeout> | null = null;

/** Debounced write — safe to call on every keystroke/drag frame. */
export function saveSession(tabs: TabState[], activeIdx: number): void {
  if (typeof window === 'undefined') return;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => saveSessionNow(tabs, activeIdx), DEBOUNCE_MS);
}

/** Drop the saved session entirely. */
export function clearSession(): void {
  if (typeof window === 'undefined') return;
  try { window.localStorage.removeItem(KEY); } catch { /* ignore */ }
}
