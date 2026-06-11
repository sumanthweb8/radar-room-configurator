import { describe, it, expect, beforeEach } from 'vitest';
import { loadSession, saveSessionNow, clearSession } from '../persistence';
import type { TabState } from '../App';

const KEY = 'rrc.session.v1';

function tab(id: string): TabState {
  return {
    id, label: id, area: '',
    room: { name: id, width: 4, height: 4 },
    objects: [], selectedId: null, adjacentRooms: [],
    zone: [[0, 0], [4, 0], [4, 4], [0, 4]],
    plotBoard: 'kc1', plotLocation: 'room1',
  };
}

describe('persistence', () => {
  beforeEach(() => clearSession());

  it('round-trips a saved session (tabs + zone + plot inputs)', () => {
    saveSessionNow([tab('a'), tab('b')], 1);
    const out = loadSession();
    expect(out).not.toBeNull();
    expect(out!.tabs).toHaveLength(2);
    expect(out!.activeIdx).toBe(1);
    expect(out!.tabs[0].zone).toEqual([[0, 0], [4, 0], [4, 4], [0, 4]]);
    expect(out!.tabs[1].plotLocation).toBe('room1');
  });

  it('returns null when nothing is stored', () => {
    expect(loadSession()).toBeNull();
  });

  it('returns null for corrupt JSON (falls back to defaults)', () => {
    window.localStorage.setItem(KEY, '{not valid json');
    expect(loadSession()).toBeNull();
  });

  it('ignores an empty tabs array', () => {
    window.localStorage.setItem(KEY, JSON.stringify({ tabs: [], activeIdx: 0 }));
    expect(loadSession()).toBeNull();
  });

  it('clamps an out-of-range activeIdx', () => {
    saveSessionNow([tab('a')], 5);
    expect(loadSession()!.activeIdx).toBe(0);
  });
});
