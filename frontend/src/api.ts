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

/**
 * Publish a room layout to the KuboCare gateway (POST /api/v1/room-config).
 * Loosely coupled: this is the ONLY outbound dependency on the gateway — the
 * gateway resolves (board_id, location) -> room_id and stores the snapshot.
 * `gatewayBase` falls back to VITE_GATEWAY_BASE; `token` is a gateway JWT.
 */
export async function publishConfig(
  payload: Record<string, unknown>,
  gatewayBase?: string,
  token?: string,
): Promise<any> {
  const base = (gatewayBase ?? (import.meta.env.VITE_GATEWAY_BASE as string) ?? "").replace(/\/+$/, "");
  if (!base) throw new Error("Gateway base URL is not set (VITE_GATEWAY_BASE or the form field).");

  const res = await fetch(`${base}/api/v1/room-config`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    const detail =
      typeof err.detail === "string"
        ? err.detail
        : err.detail?.message ?? err.message ?? `Publish failed (${res.status})`;
    throw new Error(detail);
  }
  return res.json();
}
