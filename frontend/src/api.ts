/**
 * api.ts — Typed wrappers around the backend REST API.
 */

const BASE = import.meta.env.VITE_API_BASE ?? "";

/** Upload a DXF file; returns rooms with openings and furniture. */
export async function importDxf(file: File): Promise<any> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${BASE}/api/import-dxf`, { method: "POST", body: form });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail ?? "DXF import failed");
  }
  return res.json();
}
