/**
 * api.ts — Typed wrappers around the backend REST API.
 */

import type { AnalyzeResponse, FloorPlan } from "./geometry/types";

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

/** Upload an image file; returns the initial FloorPlan. */
export async function analyzeImage(
  file: File,
  opts?: {
    debug?: boolean;
    hand_drawn?: boolean;
    hough_threshold?: number;
    hough_min_length?: number;
    hough_max_gap?: number;
    angle_snap_threshold?: number;
    parallel_merge_distance?: number;
    min_segment_length?: number;
    grid_size?: number;
  }
): Promise<AnalyzeResponse> {
  const form = new FormData();
  form.append("file", file);
  if (opts?.debug)                       form.append("debug",       "true");
  if (opts?.hand_drawn)                  form.append("hand_drawn",  "true");
  if (opts?.hough_threshold != null)     form.append("hough_threshold",       String(opts.hough_threshold));
  if (opts?.hough_min_length != null)    form.append("hough_min_length",      String(opts.hough_min_length));
  if (opts?.hough_max_gap != null)       form.append("hough_max_gap",         String(opts.hough_max_gap));
  if (opts?.angle_snap_threshold != null) form.append("angle_snap_threshold", String(opts.angle_snap_threshold));
  if (opts?.parallel_merge_distance != null) form.append("parallel_merge_distance", String(opts.parallel_merge_distance));
  if (opts?.min_segment_length != null)  form.append("min_segment_length",    String(opts.min_segment_length));
  if (opts?.grid_size != null)           form.append("grid_size",             String(opts.grid_size));

  const res = await fetch(`${BASE}/api/analyze`, { method: "POST", body: form });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail ?? "Analyze failed");
  }
  return res.json() as Promise<AnalyzeResponse>;
}

/** Send an edited FloorPlan back to re-compute rooms. */
export async function refineFloorPlan(fp: FloorPlan): Promise<FloorPlan> {
  const res = await fetch(`${BASE}/api/refine`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fp),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail ?? "Refine failed");
  }
  return res.json() as Promise<FloorPlan>;
}
