import { describe, it, expect } from 'vitest';
import { splitPolygonByPolyline, polygonBBox, toLocalFrame, type Pt } from '../sim/geom';
import { signedArea, boundaryOf } from '../sim/coverage';

const SQUARE: Pt[] = [[0, 0], [4, 0], [4, 4], [0, 4]];

function area(p: Pt[]): number {
  return Math.abs(signedArea(p));
}

describe('splitPolygonByPolyline', () => {
  it('cuts a square in half horizontally', () => {
    const res = splitPolygonByPolyline(SQUARE, [[0, 2], [4, 2]]);
    expect(res).not.toBeNull();
    expect(area(res!.polyA)).toBeCloseTo(8, 6);
    expect(area(res!.polyB)).toBeCloseTo(8, 6);
  });

  it('cuts a square diagonally into two triangles', () => {
    const res = splitPolygonByPolyline(SQUARE, [[0, 0], [4, 4]]);
    expect(res).not.toBeNull();
    expect(area(res!.polyA)).toBeCloseTo(8, 6);
    expect(area(res!.polyB)).toBeCloseTo(8, 6);
  });

  it('conserves area for a multi-segment (L) cut', () => {
    const res = splitPolygonByPolyline(SQUARE, [[0, 2], [2, 2], [2, 4]]);
    expect(res).not.toBeNull();
    const total = area(res!.polyA) + area(res!.polyB);
    expect(total).toBeCloseTo(area(SQUARE), 6);
    expect(area(res!.polyA)).toBeGreaterThan(0.1);
    expect(area(res!.polyB)).toBeGreaterThan(0.1);
  });

  it('children inherit the parent winding (CW)', () => {
    const res = splitPolygonByPolyline(SQUARE, [[0, 2], [4, 2]])!;
    const parent = Math.sign(signedArea(SQUARE));
    expect(Math.sign(signedArea(res.polyA))).toBe(parent);
    expect(Math.sign(signedArea(res.polyB))).toBe(parent);
  });

  it('children inherit the parent winding (CCW)', () => {
    const ccw: Pt[] = [[0, 0], [0, 4], [4, 4], [4, 0]];
    const res = splitPolygonByPolyline(ccw, [[0, 2], [4, 2]])!;
    const parent = Math.sign(signedArea(ccw));
    expect(Math.sign(signedArea(res.polyA))).toBe(parent);
    expect(Math.sign(signedArea(res.polyB))).toBe(parent);
  });

  it('snaps endpoints slightly off the wall', () => {
    const res = splitPolygonByPolyline(SQUARE, [[0.02, 2], [3.98, 2]]);
    expect(res).not.toBeNull();
  });

  it('rejects endpoints too far from the boundary', () => {
    expect(splitPolygonByPolyline(SQUARE, [[1, 2], [3, 2]])).toBeNull(); // both interior
  });

  it('rejects a degenerate cut (both ends same point)', () => {
    expect(splitPolygonByPolyline(SQUARE, [[2, 0], [2, 0.01]])).toBeNull();
  });

  it('works on a rectangle boundary via boundaryOf', () => {
    const b = boundaryOf({ name: 'r', width: 4, height: 4 }) as Pt[];
    const res = splitPolygonByPolyline(b, [[0, 1], [4, 1]]);
    expect(res).not.toBeNull();
    expect(area(res!.polyA) + area(res!.polyB)).toBeCloseTo(16, 6);
  });
});

describe('polygonBBox / toLocalFrame', () => {
  it('computes the bounding box', () => {
    const b = polygonBBox([[1, 1], [3, 1], [3, 4]]);
    expect(b.minX).toBe(1); expect(b.minY).toBe(1);
    expect(b.width).toBe(2); expect(b.height).toBe(3);
  });
  it('translates the min corner to (0,0)', () => {
    const { local, offset } = toLocalFrame([[1, 1], [3, 1], [3, 4]]);
    expect(offset).toEqual([1, 1]);
    const b = polygonBBox(local);
    expect(b.minX).toBeCloseTo(0); expect(b.minY).toBeCloseTo(0);
    expect(b.width).toBe(2); expect(b.height).toBe(3);
  });
});
