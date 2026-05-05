/**
 * types.ts — Shared TypeScript types that mirror the backend Pydantic models.
 *
 * Keeping the types explicit (not inferred from a fetch) lets the compiler
 * catch shape mismatches at every call-site.
 */

export interface Wall {
  id: string;
  start: [number, number];
  end: [number, number];
  thickness: number;
  label_m?: number | null;      // OCR-matched dimension in metres
  label_text?: string | null;   // raw OCR text e.g. "4m"
}

export interface Room {
  id: string;
  polygon: [number, number][];
}

export interface FloorPlan {
  walls: Wall[];
  rooms: Room[];
  scale: number;           // pixels per metre
  image_width: number;
  image_height: number;
  ocr_found:   number;     // how many dimension texts OCR detected
  ocr_matched: number;     // how many were matched to a wall
}

export interface AnalyzeResponse {
  floor_plan: FloorPlan;
  debug_image?: string;    // base64 PNG, optional
}

// ── editor state ────────────────────────────────────────────────────────────

export type EditMode = "select" | "draw" | "delete";

export interface ViewTransform {
  tx: number;   // pan x
  ty: number;   // pan y
  scale: number;
}

export interface DragState {
  wallId: string;
  endpoint: "start" | "end";
}
