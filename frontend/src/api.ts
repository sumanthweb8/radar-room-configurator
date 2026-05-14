/**
 * api.ts — Typed wrappers around the backend REST API.
 */

const BASE = "http://localhost:8000";

export interface MetaroomImportedObject {
  type: string;
  label: string;
  x: number; y: number;
  width: number; height: number;
  rotation: number;
}

export interface MetaroomImportedRoom {
  name: string;
  width: number;
  height: number;
  objects: MetaroomImportedObject[];
}

export interface MetaroomImportResponse {
  floor: { name: string; width: number; height: number } | null;
  rooms: MetaroomImportedRoom[];
}

/** Upload a Metaroom (Amrax) iPhone-LiDAR PDF; returns floor + per-room layouts. */
export async function importMetaroom(file: File): Promise<MetaroomImportResponse> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${BASE}/api/import-metaroom`, { method: "POST", body: form });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail ?? "Metaroom import failed");
  }
  return res.json() as Promise<MetaroomImportResponse>;
}

/** Upload a Shonan-style ASCII DXF; same response shape as the Metaroom PDF importer. */
export async function importDxf(file: File): Promise<MetaroomImportResponse> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${BASE}/api/import-dxf`, { method: "POST", body: form });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail ?? "DXF import failed");
  }
  return res.json() as Promise<MetaroomImportResponse>;
}
