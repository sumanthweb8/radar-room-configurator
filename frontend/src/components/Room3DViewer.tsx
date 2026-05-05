import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import type { RoomConfig, RoomObject } from "../types";

interface Props {
  room: RoomConfig;
  objects: RoomObject[];
  onClose: () => void;
}

function hexToInt(hex: string): number {
  return parseInt(hex.replace("#", ""), 16);
}

function mesh(geo: THREE.BufferGeometry, mat: THREE.Material): THREE.Mesh {
  const m = new THREE.Mesh(geo, mat);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function box(w: number, h: number, d: number, color: number, rough = 0.75, metal = 0.0): THREE.Mesh {
  return mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal })
  );
}

function addTo(g: THREE.Group, obj: THREE.Object3D, x: number, y: number, z: number) {
  obj.position.set(x, y, z);
  g.add(obj);
}

// ─────────────────────────────────────────────────────────────────────────────
// BED — simple, solid, cohesive
// ─────────────────────────────────────────────────────────────────────────────
function makeBed(w: number, d: number): THREE.Group {
  const g = new THREE.Group();
  const legH = 0.15;
  const frameH = 0.12;
  const mattH = 0.20;
  const headH = 0.55;
  const footH = 0.25;
  const frameTop = legH + frameH;

  // Frame
  addTo(g, box(w, legH + frameH, d, 0x5c3d1e, 0.8), 0, (legH + frameH) / 2, d / 2);

  // Mattress
  addTo(g, box(w - 0.06, mattH, d - 0.06, 0xf0ede8, 0.9), 0, frameTop + mattH / 2, d / 2);

  // Bedding (covers lower 55% of mattress)
  const beddingLen = (d - 0.06) * 0.55;
  addTo(g, box(w - 0.1, mattH + 0.04, beddingLen, 0x7fa8cc, 0.9), 0, frameTop + mattH / 2, d / 2 + (d - 0.06) * 0.225);

  // Pillows
  const pilW = (w - 0.2) / 2;
  const pilH = 0.08;
  const pilD = Math.min(0.5, d * 0.15);
  const pilY = frameTop + mattH + pilH / 2;
  const pilZ = pilD / 2 + 0.04;
  addTo(g, box(pilW, pilH, pilD, 0xffffff, 0.95), -(pilW / 2 + 0.02), pilY, pilZ);
  addTo(g, box(pilW, pilH, pilD, 0xffffff, 0.95),  (pilW / 2 + 0.02), pilY, pilZ);

  // Headboard (at z = 0)
  addTo(g, box(w, headH, 0.08, 0x3b2510, 0.7), 0, legH + headH / 2, 0.04);
  // headboard panel
  addTo(g, box(w - 0.1, headH - 0.1, 0.03, 0x4e3218, 0.7), 0, legH + headH / 2, 0.09);

  // Footboard (at z = d)
  addTo(g, box(w, footH, 0.07, 0x3b2510, 0.7), 0, legH + footH / 2, d - 0.035);

  // Legs (4 corners, cylinders)
  const legR = 0.025;
  const cyl = (r: number, h: number, col: number) => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 10), new THREE.MeshStandardMaterial({ color: col, roughness: 0.7 }));
    m.castShadow = true;
    return m;
  };
  [[-w / 2 + 0.05, 0.05], [w / 2 - 0.05, 0.05], [-w / 2 + 0.05, d - 0.05], [w / 2 - 0.05, d - 0.05]].forEach(([lx, lz]) => {
    addTo(g, cyl(legR, legH, 0x2a1a08), lx, legH / 2, lz);
  });

  return g;
}

// ─────────────────────────────────────────────────────────────────────────────
// SOFA
// ─────────────────────────────────────────────────────────────────────────────
function makeSofa(w: number, d: number, color: number): THREE.Group {
  const g = new THREE.Group();
  const legH = 0.10;
  const backD = Math.min(d * 0.22, 0.26);  // backrest depth (z=0 side)
  const seatD = d - backD;                  // seat depth (front)
  const seatH = 0.38;
  const backH = 0.52;
  const armW  = Math.min(0.13, w * 0.09);
  const dark  = new THREE.Color(color).multiplyScalar(0.60).getHex();

  // Legs (4 corners, spanning full footprint)
  const cyl = (r: number, h: number) => new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 8), new THREE.MeshStandardMaterial({ color: 0x2a1a08 }));
  [[-w/2+0.10, 0.10],[w/2-0.10, 0.10],[-w/2+0.10, d-0.10],[w/2-0.10, d-0.10]].forEach(([lx,lz]) => addTo(g, cyl(0.03, legH), lx, legH/2, lz));

  // Backrest — z=0 side
  addTo(g, box(w, backH, backD, dark, 0.8), 0, legH + seatH * 0.25 + backH / 2, backD / 2);

  // Seat — z=backD to z=d
  addTo(g, box(w, seatH, seatD, color, 0.85), 0, legH + seatH / 2, backD + seatD / 2);

  // Arms — full depth, one on each side
  const armH = seatH + backH * 0.55;
  addTo(g, box(armW, armH, d, dark, 0.8), -(w / 2 - armW / 2), legH + armH / 2, d / 2);
  addTo(g, box(armW, armH, d, dark, 0.8),  (w / 2 - armW / 2), legH + armH / 2, d / 2);

  // Seat cushions
  const n = w > 1.5 ? 3 : 2;
  const cw = (w - armW * 2 - 0.04) / n;
  for (let i = 0; i < n; i++) {
    const cx2 = -(w / 2 - armW) + cw / 2 + i * cw;
    addTo(g, box(cw - 0.04, 0.13, seatD - 0.04, color, 0.9), cx2, legH + seatH + 0.065, backD + seatD / 2);
  }

  // Back cushion strip
  addTo(g, box(w - armW * 2 - 0.06, backH * 0.65, 0.09, color, 0.9), 0, legH + seatH * 0.15 + backH * 0.33, backD - 0.04);

  return g;
}

// ─────────────────────────────────────────────────────────────────────────────
// DOOR — appears as opening in wall with frame
// ─────────────────────────────────────────────────────────────────────────────
function makeDoor(w: number): THREE.Group {
  const g = new THREE.Group();
  const dH = 2.1;
  const frameT = 0.07;
  const panelD = 0.05;
  const wood = 0xc49a6c;
  const frame = 0x8b6340;

  // Frame sides + top
  addTo(g, box(frameT, dH + frameT, frameT, frame), -w / 2, dH / 2, 0);
  addTo(g, box(frameT, dH + frameT, frameT, frame),  w / 2, dH / 2, 0);
  addTo(g, box(w + frameT * 2, frameT, frameT, frame), 0, dH, 0);

  // Door panel
  addTo(g, box(w - 0.04, dH - 0.02, panelD, wood, 0.55), 0, dH / 2, 0);

  // Decorative inset panels
  const iw = w * 0.78;
  addTo(g, box(iw, dH * 0.35, 0.012, 0xa07040), 0, dH * 0.76, panelD / 2 + 0.006);
  addTo(g, box(iw, dH * 0.40, 0.012, 0xa07040), 0, dH * 0.30, panelD / 2 + 0.006);

  // Handle
  const hx = w / 2 - 0.12;
  const handle = new THREE.Mesh(new THREE.SphereGeometry(0.022, 10, 10), new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.1 }));
  addTo(g, handle, hx, dH * 0.46, panelD / 2 + 0.022);
  const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, 0.09, 8), new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.1 }));
  bar.rotation.z = Math.PI / 2;
  addTo(g, bar, hx - 0.045, dH * 0.46, panelD / 2 + 0.022);

  return g;
}

// ─────────────────────────────────────────────────────────────────────────────
// WINDOW
// ─────────────────────────────────────────────────────────────────────────────
function makeWindow(w: number): THREE.Group {
  const g = new THREE.Group();
  const wH = 1.0, ft = 0.05;

  addTo(g, box(w, wH, ft, 0xdde4ec), 0, wH / 2, 0);
  const pw = (w - ft * 3) / 2;
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x88ccee, transparent: true, opacity: 0.4, roughness: 0.05 });
  [-pw / 2 - ft / 2, pw / 2 + ft / 2].forEach(px => {
    const pane = new THREE.Mesh(new THREE.BoxGeometry(pw, wH - ft * 2, 0.01), glassMat);
    pane.position.set(px, wH / 2, 0);
    g.add(pane);
  });
  addTo(g, box(ft, wH - ft, ft, 0xdde4ec), 0, wH / 2, 0);

  return g;
}

// ─────────────────────────────────────────────────────────────────────────────
// TABLE / DESK / CHAIR / WARDROBE / GENERIC
// ─────────────────────────────────────────────────────────────────────────────
function makeTable(w: number, d: number): THREE.Group {
  const g = new THREE.Group();
  addTo(g, box(w, 0.05, d, 0xa0784a, 0.6), 0, 0.73, d / 2);
  const cyl2 = (r: number, h: number) => new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 10), new THREE.MeshStandardMaterial({ color: 0x6b4f2e }));
  [[-w/2+0.06,0.06],[w/2-0.06,0.06],[-w/2+0.06,d-0.06],[w/2-0.06,d-0.06]].forEach(([lx,lz]) => addTo(g, cyl2(0.025, 0.70), lx, 0.35, lz));
  return g;
}

function makeDesk(w: number, d: number): THREE.Group {
  const g = new THREE.Group();
  addTo(g, box(w, 0.04, d, 0x7a5c3a, 0.6), 0, 0.74, d / 2);
  addTo(g, box(0.04, 0.72, d, 0x5c3d1e), -w / 2 + 0.02, 0.36, d / 2);
  addTo(g, box(0.04, 0.72, d, 0x5c3d1e),  w / 2 - 0.02, 0.36, d / 2);
  return g;
}

function makeChair(w: number, d: number, color: number): THREE.Group {
  const g = new THREE.Group();
  const legH = 0.44;
  const cyl2 = (r: number, h: number) => new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 8), new THREE.MeshStandardMaterial({ color: 0x5c3d1e }));
  [[-w/2+0.05,0.05],[w/2-0.05,0.05],[-w/2+0.05,d-0.05],[w/2-0.05,d-0.05]].forEach(([lx,lz]) => addTo(g, cyl2(0.016, legH), lx, legH/2, lz));
  addTo(g, box(w, 0.06, d, color, 0.85), 0, legH + 0.03, d / 2);
  addTo(g, box(w, 0.42, 0.06, color, 0.85), 0, legH + 0.06 + 0.21, 0.03);
  return g;
}

function makeWardrobe(w: number, d: number): THREE.Group {
  const g = new THREE.Group();
  const wH = 2.0;
  addTo(g, box(w, wH, d, 0x7a5c3a, 0.75), 0, wH / 2, d / 2);
  const dw = (w - 0.04) / 2;
  [-(dw/2+0.01), (dw/2+0.01)].forEach(dx => {
    addTo(g, box(dw, wH - 0.06, 0.025, 0x9a7050, 0.65), dx, wH / 2, d + 0.012);
    const h = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.1, 8), new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8 }));
    h.rotation.x = Math.PI / 2;
    addTo(g, h, dx, wH * 0.48, d + 0.025);
  });
  return g;
}

function makeRadar(w: number): THREE.Group {
  const g = new THREE.Group();
  // Body — flat box, faces downward from ceiling mount
  addTo(g, box(w * 3, 0.025, w * 3, 0x1a1a2e, 0.3, 0.8), 0, 0, 0);
  // Lens dome (purple glow)
  const dome = new THREE.Mesh(new THREE.SphereGeometry(w * 0.6, 12, 12), new THREE.MeshStandardMaterial({ color: 0x9b59b6, emissive: 0x9b59b6, emissiveIntensity: 1.2, roughness: 0.2, metalness: 0.5 }));
  addTo(g, dome, 0, -0.02, 0);
  // Status LED ring
  const ring = new THREE.Mesh(new THREE.TorusGeometry(w * 0.9, 0.01, 6, 24), new THREE.MeshStandardMaterial({ color: 0x00ff88, emissive: 0x00ff88, emissiveIntensity: 2.0 }));
  ring.rotation.x = Math.PI / 2;
  addTo(g, ring, 0, -0.005, 0);
  return g;
}

function makePerson(color: number): THREE.Group {
  const g = new THREE.Group();
  addTo(g, new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 10), new THREE.MeshStandardMaterial({ color: 0xf5c5a3 })), 0, 1.65, 0);
  addTo(g, box(0.28, 0.65, 0.16, color), 0, 1.18, 0);
  addTo(g, box(0.10, 0.62, 0.12, 0x2c3e50), -0.08, 0.58, 0);
  addTo(g, box(0.10, 0.62, 0.12, 0x2c3e50),  0.08, 0.58, 0);
  return g;
}

function makeGeneric(w: number, d: number, color: number, h = 1.0): THREE.Group {
  const g = new THREE.Group();
  addTo(g, box(w, h, d, color, 0.75), 0, h / 2, d / 2);
  return g;
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export const Room3DViewer: React.FC<Props> = ({ room, objects, onClose }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current!;
    const W = mount.clientWidth, H = mount.clientHeight;

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x0f172a);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    mount.appendChild(renderer.domElement);

    // ── Scene ─────────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();

    // ── Camera ────────────────────────────────────────────────────────────────
    const cx = room.width / 2;
    const cz = room.height / 2;
    const dist = Math.max(room.width, room.height);
    const camera = new THREE.PerspectiveCamera(52, W / H, 0.05, 300);
    // Position at corner, looking into room diagonally from above
    camera.position.set(cx, dist * 0.9, cz + dist * 1.05);
    camera.lookAt(cx, 0.5, cz);

    // ── Controls ──────────────────────────────────────────────────────────────
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(cx, 0.5, cz);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.minDistance = 0.3;
    controls.maxDistance = 80;
    controls.maxPolarAngle = Math.PI / 2 - 0.01;
    controls.update();

    // ── Lights ────────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xfff8f0, 0.7));

    const sun = new THREE.DirectionalLight(0xffe4b5, 0.9);
    sun.position.set(cx + 5, 8, cz - 3);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.near = 0.1;
    sun.shadow.camera.far = 40;
    sun.shadow.camera.left = -Math.max(room.width, room.height) * 1.5;
    sun.shadow.camera.right = Math.max(room.width, room.height) * 1.5;
    sun.shadow.camera.top = Math.max(room.width, room.height) * 1.5;
    sun.shadow.camera.bottom = -Math.max(room.width, room.height) * 1.5;
    sun.shadow.radius = 3;
    scene.add(sun);

    const fill = new THREE.DirectionalLight(0xc8d8ff, 0.35);
    fill.position.set(cx - 5, 4, cz + 5);
    scene.add(fill);

    // ── Floor ─────────────────────────────────────────────────────────────────
    const floorC = document.createElement('canvas');
    floorC.width = 512; floorC.height = 512;
    const fc = floorC.getContext('2d')!;
    fc.fillStyle = '#c8955a'; fc.fillRect(0, 0, 512, 512);
    fc.strokeStyle = '#a8753a'; fc.lineWidth = 2;
    for (let i = 0; i < 512; i += 80) { fc.beginPath(); fc.moveTo(0, i); fc.lineTo(512, i); fc.stroke(); }
    fc.strokeStyle = '#b0804a'; fc.lineWidth = 1;
    for (let i = 0; i < 512; i += 160) {
      fc.beginPath(); fc.moveTo(i, 0); fc.lineTo(i, 512); fc.stroke();
      fc.beginPath(); fc.moveTo(i+80, 80); fc.lineTo(i+80, 240); fc.stroke();
      fc.beginPath(); fc.moveTo(i+80, 320); fc.lineTo(i+80, 480); fc.stroke();
    }
    const floorTex = new THREE.CanvasTexture(floorC);
    floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping;
    floorTex.repeat.set(room.width, room.height);

    const floor = mesh(
      new THREE.PlaneGeometry(room.width, room.height),
      new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.6 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(cx, 0, cz);
    scene.add(floor);

    // ── Walls — 4 planes, front wall transparent ───────────────────────────────
    const wallH = 2.8;
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xf2ede6, roughness: 0.88, side: THREE.FrontSide });
    const wallMatFront = new THREE.MeshStandardMaterial({ color: 0xf2ede6, roughness: 0.88, transparent: true, opacity: 0.08, side: THREE.FrontSide });

    // Back wall (z=0, facing +z into room)
    const wallBack = mesh(new THREE.PlaneGeometry(room.width, wallH), wallMat);
    wallBack.position.set(cx, wallH / 2, 0);
    scene.add(wallBack);

    // Left wall (x=0, facing +x)
    const wallLeft = mesh(new THREE.PlaneGeometry(room.height, wallH), wallMat);
    wallLeft.rotation.y = Math.PI / 2;
    wallLeft.position.set(0, wallH / 2, cz);
    scene.add(wallLeft);

    // Right wall (x=room.width, facing -x)
    const wallRight = mesh(new THREE.PlaneGeometry(room.height, wallH), wallMat);
    wallRight.rotation.y = -Math.PI / 2;
    wallRight.position.set(room.width, wallH / 2, cz);
    scene.add(wallRight);

    // Front wall (z=room.height, very transparent so you can see inside)
    const wallFront = mesh(new THREE.PlaneGeometry(room.width, wallH), wallMatFront);
    wallFront.rotation.y = Math.PI;
    wallFront.position.set(cx, wallH / 2, room.height);
    scene.add(wallFront);

    // Ceiling (barely visible)
    const ceiling = mesh(new THREE.PlaneGeometry(room.width, room.height), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, transparent: true, opacity: 0.06 }));
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(cx, wallH, cz);
    scene.add(ceiling);

    // Skirting along walls
    const skirtMat = new THREE.MeshStandardMaterial({ color: 0xe0d5c8, roughness: 0.85 });
    const sk = (w2: number, d2: number, px: number, py: number, pz: number) => {
      const s = mesh(new THREE.BoxGeometry(w2, 0.08, d2), skirtMat);
      s.position.set(px, py, pz);
      scene.add(s);
    };
    sk(room.width, 0.02, cx,   0.04, 0.01);
    sk(room.width, 0.02, cx,   0.04, room.height - 0.01);
    sk(0.02, room.height, 0.01,  0.04, cz);
    sk(0.02, room.height, room.width - 0.01, 0.04, cz);

    // ── Objects ───────────────────────────────────────────────────────────────
    for (const obj of objects) {
      const color = hexToInt(obj.color);
      const w = obj.width;
      const d = obj.height; // in 3D, height in 2D = depth in Z

      let group: THREE.Group;

      switch (obj.type) {
        case 'bed':      group = makeBed(w, d); break;
        case 'sofa':     group = makeSofa(w, d, color); break;
        case 'door':     group = makeDoor(Math.max(w, d)); break;
        case 'window':   group = makeWindow(Math.max(w, d)); break;
        case 'wardrobe': group = makeWardrobe(w, d); break;
        case 'table':    group = makeTable(w, d); break;
        case 'desk':     group = makeDesk(w, d); break;
        case 'chair':    group = makeChair(w, d, color); break;
        case 'radar':    group = makeRadar(w); break;
        case 'person':   group = makePerson(color); break;
        default:         group = makeGeneric(w, d, color); break;
      }

      group.traverse(c => { if ((c as THREE.Mesh).isMesh) { c.castShadow = true; c.receiveShadow = true; } });

      if (obj.type === 'door' || obj.type === 'window') {
        // Find nearest wall using 2D center
        const cx2 = obj.x + w / 2;
        const cy2 = obj.y + d / 2;
        const doorW = Math.max(w, d);
        const elev = obj.type === 'window' ? 0.9 : 0;

        const dists = [
          { wall: 'back',   dist: cy2,                   pos: [cx2, elev, 0.02],             ry: 0 },
          { wall: 'front',  dist: room.height - cy2,     pos: [cx2, elev, room.height-0.02], ry: Math.PI },
          { wall: 'left',   dist: cx2,                   pos: [0.02, elev, cy2],             ry: Math.PI/2 },
          { wall: 'right',  dist: room.width - cx2,      pos: [room.width-0.02, elev, cy2],  ry: -Math.PI/2 },
        ];
        const nearest = dists.reduce((a, b) => a.dist < b.dist ? a : b);

        // Door geometry is centered at x=0, so pos[] is already the center — no extra offset needed
        group.position.set(nearest.pos[0], nearest.pos[1], nearest.pos[2]);
        group.rotation.y = nearest.ry;
        scene.add(group);
      } else if (obj.type === 'radar') {
        // Radar mounted at 2.4 m height (ceiling level), pointing downward
        const RADAR_HEIGHT = 2.4;
        const rcx = obj.x + w / 2;
        const rcz = obj.y + d / 2;
        group.position.set(rcx, RADAR_HEIGHT, rcz);
        scene.add(group);

        // Detection cone — widens from sensor down to floor
        const coneR = Math.max(room.width, room.height) * 0.55;
        const coneMat = new THREE.MeshStandardMaterial({
          color: 0x9b59b6, transparent: true, opacity: 0.055,
          side: THREE.DoubleSide, depthWrite: false,
        });
        const cone = new THREE.Mesh(new THREE.ConeGeometry(coneR, RADAR_HEIGHT, 48, 1, true), coneMat);
        cone.position.set(rcx, RADAR_HEIGHT / 2, rcz);
        scene.add(cone);

        // Rings on floor showing coverage
        [0.35, 0.65, 1.0].forEach(frac => {
          const r = coneR * frac;
          const ringMat = new THREE.MeshBasicMaterial({ color: 0x9b59b6, transparent: true, opacity: 0.18 - frac * 0.1 });
          const ringMesh = new THREE.Mesh(new THREE.TorusGeometry(r, 0.012, 6, 64), ringMat);
          ringMesh.rotation.x = Math.PI / 2;
          ringMesh.position.set(rcx, 0.005, rcz);
          scene.add(ringMesh);
        });

        // Vertical drop-line from sensor to floor
        const lineMat = new THREE.MeshBasicMaterial({ color: 0xcc88ff, transparent: true, opacity: 0.4 });
        const lineMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, RADAR_HEIGHT, 8), lineMat);
        lineMesh.position.set(rcx, RADAR_HEIGHT / 2, rcz);
        scene.add(lineMesh);

        // Height label
        const hc = document.createElement('canvas');
        hc.width = 200; hc.height = 42;
        const hx2 = hc.getContext('2d')!;
        hx2.fillStyle = 'rgba(155,89,182,0.85)';
        hx2.roundRect(2, 2, 196, 38, 7); hx2.fill();
        hx2.fillStyle = '#fff';
        hx2.font = 'bold 16px system-ui';
        hx2.textAlign = 'center'; hx2.textBaseline = 'middle';
        hx2.fillText('📡 2.4 m', 100, 21);
        const heightSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(hc), transparent: true, depthTest: false }));
        heightSprite.scale.set(0.9, 0.22, 1);
        heightSprite.position.set(rcx + 0.55, RADAR_HEIGHT + 0.18, rcz);
        scene.add(heightSprite);

      } else {
        // Place all furniture: geometry is centered in X, z spans 0→d
        // Wrap so pivot = object footprint center
        const wrapper = new THREE.Group();
        wrapper.position.set(obj.x + w / 2, 0, obj.y + d / 2);
        wrapper.rotation.y = -(obj.rotation * Math.PI) / 180;
        group.position.set(0, 0, -d / 2); // center geometry in Z
        wrapper.add(group);
        wrapper.traverse(c => { if ((c as THREE.Mesh).isMesh) { c.castShadow = true; c.receiveShadow = true; } });
        scene.add(wrapper);
      }

      // Floating label
      if (obj.type !== 'door' && obj.type !== 'window' && obj.type !== 'radar') {
        const lc = document.createElement('canvas');
        lc.width = 256; lc.height = 52;
        const lx = lc.getContext('2d')!;
        lx.fillStyle = 'rgba(10,20,40,0.78)';
        lx.roundRect(2, 2, 252, 48, 9); lx.fill();
        lx.fillStyle = '#f8fafc';
        lx.font = 'bold 21px system-ui';
        lx.textAlign = 'center'; lx.textBaseline = 'middle';
        lx.fillText(obj.label, 128, 26);
        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(lc), transparent: true, depthTest: false }));
        sprite.scale.set(1.1, 0.25, 1);
        sprite.position.set(obj.x + w / 2, 2.35, obj.y + d / 2);
        scene.add(sprite);
      }
    }

    // ── Animate ───────────────────────────────────────────────────────────────
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ────────────────────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      const nw = mount.clientWidth, nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    });
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      controls.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [objects, room]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.82)' }}>
      <div className="relative flex flex-col rounded-2xl overflow-hidden shadow-2xl" style={{ width: '94vw', height: '91vh', border: '1px solid rgba(255,255,255,0.08)' }}>

        <div className="flex items-center justify-between px-4 py-2.5 shrink-0" style={{ background: 'rgba(10,15,28,0.97)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-2.5">
            <span className="text-base">🏠</span>
            <span className="text-sm font-semibold text-gray-100">3D Room View</span>
            <span className="text-xs text-gray-500 hidden sm:inline">· drag to rotate · scroll to zoom · right-drag to pan</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500">{room.width}m × {room.height}m · {objects.length} objects</span>
            <button onClick={onClose} className="px-3 py-1 text-xs rounded-lg text-gray-400 hover:text-white transition-colors" style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)' }}>
              ✕ Close
            </button>
          </div>
        </div>

        <div ref={mountRef} className="flex-1 w-full" />
      </div>
    </div>
  );
};
