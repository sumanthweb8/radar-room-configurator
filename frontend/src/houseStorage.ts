import type { House } from './houseModel';
import { createEmptyHouse } from './houseModel';

const KEY = 'kubocare.house.v1';

export function loadHouse(): House | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.schemaVersion === 1 && Array.isArray(parsed.rooms)) {
      return parsed as House;
    }
    return null;
  } catch {
    return null;
  }
}

export function saveHouse(house: House): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(house));
  } catch {
    // localStorage full or unavailable — silently drop; caller can offer download.
  }
}

export function clearHouse(): void {
  try { window.localStorage.removeItem(KEY); } catch {}
}

export function exportHouseBlob(house: House): Blob {
  return new Blob([JSON.stringify(house, null, 2)], { type: 'application/json' });
}

export async function importHouseFromFile(file: File): Promise<House> {
  const text = await file.text();
  const parsed = JSON.parse(text);
  if (parsed?.schemaVersion !== 1 || !Array.isArray(parsed.rooms)) {
    throw new Error('Not a valid house.json (schemaVersion mismatch)');
  }
  return parsed as House;
}

export function loadOrCreate(): House {
  return loadHouse() ?? createEmptyHouse();
}
