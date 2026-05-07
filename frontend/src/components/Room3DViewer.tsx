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
  return mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal }));
}
function addTo(g: THREE.Group, obj: THREE.Object3D, x: number, y: number, z: number) {
  obj.position.set(x, y, z); g.add(obj);
}

// ── BED ───────────────────────────────────────────────────────────────────────
function makeBed(w: number, d: number): THREE.Group {
  const g = new THREE.Group();
  const legH = 0.15, frameH = 0.12, mattH = 0.20, headH = 0.55, footH = 0.25;
  const frameTop = legH + frameH;
  addTo(g, box(w, legH + frameH, d, 0x5c3d1e, 0.8), 0, (legH + frameH) / 2, d / 2);
  addTo(g, box(w - 0.06, mattH, d - 0.06, 0xf0ede8, 0.9), 0, frameTop + mattH / 2, d / 2);
  const beddingLen = (d - 0.06) * 0.55;
  addTo(g, box(w - 0.1, mattH + 0.04, beddingLen, 0x7fa8cc, 0.9), 0, frameTop + mattH / 2, d / 2 + (d - 0.06) * 0.225);
  const pilW = (w - 0.2) / 2, pilH = 0.08, pilD = Math.min(0.5, d * 0.15);
  const pilY = frameTop + mattH + pilH / 2, pilZ = pilD / 2 + 0.04;
  addTo(g, box(pilW, pilH, pilD, 0xffffff, 0.95), -(pilW / 2 + 0.02), pilY, pilZ);
  addTo(g, box(pilW, pilH, pilD, 0xffffff, 0.95),  (pilW / 2 + 0.02), pilY, pilZ);
  addTo(g, box(w, headH, 0.08, 0x3b2510, 0.7), 0, legH + headH / 2, 0.04);
  addTo(g, box(w - 0.1, headH - 0.1, 0.03, 0x4e3218, 0.7), 0, legH + headH / 2, 0.09);
  addTo(g, box(w, footH, 0.07, 0x3b2510, 0.7), 0, legH + footH / 2, d - 0.035);
  const legR = 0.025;
  const cyl = (r: number, h: number, col: number) => {
    const m2 = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 10), new THREE.MeshStandardMaterial({ color: col, roughness: 0.7 }));
    m2.castShadow = true; return m2;
  };
  [[-w/2+0.05,0.05],[w/2-0.05,0.05],[-w/2+0.05,d-0.05],[w/2-0.05,d-0.05]].forEach(([lx,lz]) => addTo(g, cyl(legR, legH, 0x2a1a08), lx, legH/2, lz));
  return g;
}

// ── SOFA ──────────────────────────────────────────────────────────────────────
function makeSofa(w: number, d: number, color: number): THREE.Group {
  const g = new THREE.Group();
  const legH = 0.10, backD = Math.min(d*0.22,0.26), seatD = d - backD;
  const seatH = 0.38, backH = 0.52, armW = Math.min(0.13, w*0.09);
  const dark2 = new THREE.Color(color).multiplyScalar(0.60).getHex();
  const cyl = (r: number, h: number) => new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,8), new THREE.MeshStandardMaterial({ color: 0x2a1a08 }));
  [[-w/2+0.10,0.10],[w/2-0.10,0.10],[-w/2+0.10,d-0.10],[w/2-0.10,d-0.10]].forEach(([lx,lz]) => addTo(g, cyl(0.03, legH), lx, legH/2, lz));
  addTo(g, box(w, backH, backD, dark2, 0.8), 0, legH+seatH*0.25+backH/2, backD/2);
  addTo(g, box(w, seatH, seatD, color, 0.85), 0, legH+seatH/2, backD+seatD/2);
  const armH = seatH + backH*0.55;
  addTo(g, box(armW, armH, d, dark2, 0.8), -(w/2-armW/2), legH+armH/2, d/2);
  addTo(g, box(armW, armH, d, dark2, 0.8),  (w/2-armW/2), legH+armH/2, d/2);
  const n = w > 1.5 ? 3 : 2, cw = (w-armW*2-0.04)/n;
  for (let i = 0; i < n; i++) {
    const cx2 = -(w/2-armW)+cw/2+i*cw;
    addTo(g, box(cw-0.04, 0.13, seatD-0.04, color, 0.9), cx2, legH+seatH+0.065, backD+seatD/2);
  }
  addTo(g, box(w-armW*2-0.06, backH*0.65, 0.09, color, 0.9), 0, legH+seatH*0.15+backH*0.33, backD-0.04);
  return g;
}

// ── DOOR ──────────────────────────────────────────────────────────────────────
function makeDoor(w: number): THREE.Group {
  const g = new THREE.Group();
  const dH = 2.1, frameT = 0.07, panelD = 0.05;
  addTo(g, box(frameT, dH+frameT, frameT, 0x8b6340), -w/2, dH/2, 0);
  addTo(g, box(frameT, dH+frameT, frameT, 0x8b6340),  w/2, dH/2, 0);
  addTo(g, box(w+frameT*2, frameT, frameT, 0x8b6340), 0, dH, 0);
  addTo(g, box(w-0.04, dH-0.02, panelD, 0xc49a6c, 0.55), 0, dH/2, 0);
  const iw = w*0.78;
  addTo(g, box(iw, dH*0.35, 0.012, 0xa07040), 0, dH*0.76, panelD/2+0.006);
  addTo(g, box(iw, dH*0.40, 0.012, 0xa07040), 0, dH*0.30, panelD/2+0.006);
  const handle = new THREE.Mesh(new THREE.SphereGeometry(0.022,10,10), new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.1 }));
  addTo(g, handle, w/2-0.12, dH*0.46, panelD/2+0.022);
  const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.007,0.007,0.09,8), new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.1 }));
  bar.rotation.z = Math.PI/2;
  addTo(g, bar, w/2-0.165, dH*0.46, panelD/2+0.022);
  return g;
}

// ── WINDOW ────────────────────────────────────────────────────────────────────
function makeWindow(w: number): THREE.Group {
  const g = new THREE.Group();
  const wH   = 1.15;   // window height
  const fT   = 0.055;  // frame thickness
  const fD   = 0.10;   // frame depth (into wall)
  const sillH = 0.06, sillD = 0.12; // sill protrudes into room

  // Frame color — warm white with slight stone tint
  const frameMat = new THREE.MeshStandardMaterial({ color: 0xedf0f2, roughness: 0.65, metalness: 0.05 });
  const sillMat  = new THREE.MeshStandardMaterial({ color: 0xdce1e7, roughness: 0.55 });

  // ── Outer frame ────────────────────────────────────────────────────────────
  // Top rail
  addTo(g, new THREE.Mesh(new THREE.BoxGeometry(w + fT*2, fT, fD), frameMat), 0, wH + fT/2, -fD/2);
  // Bottom rail
  addTo(g, new THREE.Mesh(new THREE.BoxGeometry(w + fT*2, fT, fD), frameMat), 0, fT/2,      -fD/2);
  // Left jamb
  addTo(g, new THREE.Mesh(new THREE.BoxGeometry(fT, wH + fT*2, fD), frameMat), -(w/2 + fT/2), (wH + fT*2)/2, -fD/2);
  // Right jamb
  addTo(g, new THREE.Mesh(new THREE.BoxGeometry(fT, wH + fT*2, fD), frameMat),  (w/2 + fT/2), (wH + fT*2)/2, -fD/2);

  // ── Sash dividers (mullion) ────────────────────────────────────────────────
  // Horizontal mid-rail
  addTo(g, new THREE.Mesh(new THREE.BoxGeometry(w, fT, fD * 0.7), frameMat), 0, wH/2, -fD/2);
  // Vertical mullion(s) for wide windows
  const nPanes = w > 1.0 ? 2 : 1;
  if (nPanes > 1) {
    addTo(g, new THREE.Mesh(new THREE.BoxGeometry(fT, wH, fD * 0.7), frameMat), 0, wH/2, -fD/2);
  }

  // ── Glass panes ────────────────────────────────────────────────────────────
  // Outer glass — slightly tinted, reflective
  const outerGlass = new THREE.MeshPhysicalMaterial({
    color: 0xadd8f0,
    transparent: true,
    opacity: 0.25,
    roughness: 0.02,
    metalness: 0.0,
    reflectivity: 0.8,
    transmission: 0.7,
    thickness: 0.01,
  });
  // Inner glass — slightly warm tint (interior side picks up room light)
  const innerGlass = new THREE.MeshPhysicalMaterial({
    color: 0xc8e8f8,
    transparent: true,
    opacity: 0.18,
    roughness: 0.04,
    metalness: 0.0,
    reflectivity: 0.9,
    transmission: 0.8,
    thickness: 0.01,
    side: THREE.DoubleSide,
  });

  // Four pane slots: top-left, top-right, bottom-left, bottom-right
  const pW = (w - fT * (nPanes + 1)) / nPanes;
  const pHtop = wH/2 - fT * 1.5;
  const pHbot = wH/2 - fT * 1.5;
  const pYtop = wH/2 + fT/2 + pHtop/2;
  const pYbot = fT    + pHbot/2;

  for (let col = 0; col < nPanes; col++) {
    const px = (col - (nPanes - 1) / 2) * (pW + fT);
    // Top pane
    const topPane = new THREE.Mesh(new THREE.BoxGeometry(pW, pHtop, 0.008), outerGlass);
    topPane.position.set(px, pYtop, -0.001); g.add(topPane);
    const topPaneI = new THREE.Mesh(new THREE.BoxGeometry(pW, pHtop, 0.008), innerGlass);
    topPaneI.position.set(px, pYtop, -fD + 0.001); g.add(topPaneI);
    // Bottom pane
    const botPane = new THREE.Mesh(new THREE.BoxGeometry(pW, pHbot, 0.008), outerGlass);
    botPane.position.set(px, pYbot, -0.001); g.add(botPane);
    const botPaneI = new THREE.Mesh(new THREE.BoxGeometry(pW, pHbot, 0.008), innerGlass);
    botPaneI.position.set(px, pYbot, -fD + 0.001); g.add(botPaneI);

    // Glint highlight (thin bright strip on upper pane, simulates sky reflection)
    const glintMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.18 });
    const glint = new THREE.Mesh(new THREE.BoxGeometry(pW * 0.6, pHtop * 0.12, 0.001), glintMat);
    glint.position.set(px - pW*0.1, pYtop + pHtop*0.28, 0.001); g.add(glint);
  }

  // ── Window sill (protrudes inward into room, i.e. positive Z) ─────────────
  const sill = new THREE.Mesh(new THREE.BoxGeometry(w + fT*2 + 0.04, sillH, sillD), sillMat);
  sill.position.set(0, sillH/2, sillD/2 - 0.01); g.add(sill);

  // ── Subtle ambient light inside the window to simulate daylight bleed ──────
  const dayGlow = new THREE.PointLight(0xd4eeff, 0.5, 3.5);
  dayGlow.position.set(0, wH/2, 0.8);
  g.add(dayGlow);

  return g;
}

// ── WALL-MOUNTED TV ───────────────────────────────────────────────────────────
function makeTV(w: number): THREE.Group {
  const g = new THREE.Group();
  const screenH = w * 0.58;    // ~16:9 ratio
  const depth   = 0.06;
  const bezel   = 0.025;

  // Outer casing
  addTo(g, box(w, screenH + bezel*2, depth, 0x111111, 0.3, 0.5), 0, (screenH+bezel*2)/2, 0);
  // Screen (emissive panel)
  const screenMat = new THREE.MeshStandardMaterial({ color: 0x0a2240, emissive: 0x0d3060, emissiveIntensity: 0.6, roughness: 0.1, metalness: 0.2 });
  addTo(g, new THREE.Mesh(new THREE.BoxGeometry(w-bezel*2, screenH, 0.01), screenMat), 0, (screenH+bezel*2)/2, depth/2+0.006);
  // Subtle screen glow lines (like a UI grid)
  const lineMat = new THREE.MeshBasicMaterial({ color: 0x1a4a80, transparent: true, opacity: 0.4 });
  for (let i = 0; i < 3; i++) {
    const lm = new THREE.Mesh(new THREE.BoxGeometry(w-bezel*2, 0.008, 0.001), lineMat);
    lm.position.set(0, screenH*0.25 + i*(screenH*0.25), depth/2+0.008);
    g.add(lm);
  }
  // Wall bracket
  addTo(g, box(0.08, 0.18, 0.06, 0x333333, 0.5, 0.6), 0, -0.05, -depth/2+0.03);
  // Power LED
  const led = new THREE.Mesh(new THREE.SphereGeometry(0.008,8,8), new THREE.MeshStandardMaterial({ color: 0x00ff00, emissive: 0x00aa00, emissiveIntensity: 3 }));
  addTo(g, led, w/2-0.04, bezel, depth/2+0.005);
  return g;
}

// ── TABLE / DESK / CHAIR / WARDROBE / CABINET / GENERIC ───────────────────────
function makeTable(w: number, d: number): THREE.Group {
  const g = new THREE.Group();
  addTo(g, box(w, 0.05, d, 0xa0784a, 0.6), 0, 0.73, d/2);
  const cyl2 = (r: number, h: number) => new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,10), new THREE.MeshStandardMaterial({ color: 0x6b4f2e }));
  [[-w/2+0.06,0.06],[w/2-0.06,0.06],[-w/2+0.06,d-0.06],[w/2-0.06,d-0.06]].forEach(([lx,lz]) => addTo(g, cyl2(0.025, 0.70), lx, 0.35, lz));
  return g;
}
function makeDesk(w: number, d: number): THREE.Group {
  const g = new THREE.Group();
  addTo(g, box(w, 0.04, d, 0x7a5c3a, 0.6), 0, 0.74, d/2);
  addTo(g, box(0.04, 0.72, d, 0x5c3d1e), -w/2+0.02, 0.36, d/2);
  addTo(g, box(0.04, 0.72, d, 0x5c3d1e),  w/2-0.02, 0.36, d/2);
  return g;
}
function makeChair(w: number, d: number, color: number): THREE.Group {
  const g = new THREE.Group();
  const legH = 0.44;
  const cyl2 = (r: number, h: number) => new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,8), new THREE.MeshStandardMaterial({ color: 0x5c3d1e }));
  [[-w/2+0.05,0.05],[w/2-0.05,0.05],[-w/2+0.05,d-0.05],[w/2-0.05,d-0.05]].forEach(([lx,lz]) => addTo(g, cyl2(0.016, legH), lx, legH/2, lz));
  addTo(g, box(w, 0.06, d, color, 0.85), 0, legH+0.03, d/2);
  addTo(g, box(w, 0.42, 0.06, color, 0.85), 0, legH+0.06+0.21, 0.03);
  return g;
}
function makeWardrobe(w: number, d: number): THREE.Group {
  const g = new THREE.Group();
  const wH = 2.0;
  addTo(g, box(w, wH, d, 0x7a5c3a, 0.75), 0, wH/2, d/2);
  const dw = (w-0.04)/2;
  [-(dw/2+0.01), (dw/2+0.01)].forEach(dx => {
    addTo(g, box(dw, wH-0.06, 0.025, 0x9a7050, 0.65), dx, wH/2, d+0.012);
    const h2 = new THREE.Mesh(new THREE.CylinderGeometry(0.008,0.008,0.1,8), new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8 }));
    h2.rotation.x = Math.PI/2;
    addTo(g, h2, dx, wH*0.48, d+0.025);
  });
  return g;
}
function makeCabinet(w: number, d: number): THREE.Group {
  const g = new THREE.Group();
  const h2 = Math.max(0.5, Math.min(w, d)*1.8);
  addTo(g, box(w, h2, d, 0x8b7355, 0.7), 0, h2/2, d/2);
  addTo(g, box(w-0.02, h2-0.04, 0.02, 0xa08060, 0.6), 0, h2/2, d+0.01);
  const knob = new THREE.Mesh(new THREE.SphereGeometry(0.012,8,8), new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8, roughness: 0.2 }));
  addTo(g, knob, 0, h2*0.5, d+0.022);
  return g;
}
function makeRadarDevice(): THREE.Group {
  // Wall-mounted sensor unit — compact rectangular body, tilted 45° downward
  const g = new THREE.Group();

  // Back wall plate (flat against wall at local z=0)
  const plateMat = new THREE.MeshStandardMaterial({ color: 0x1e1e2e, roughness: 0.25, metalness: 0.7 });
  addTo(g, new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.14, 0.018), plateMat), 0, 0, 0);

  // Bracket arm
  const bMat = new THREE.MeshStandardMaterial({ color: 0x3a3a4a, roughness: 0.35, metalness: 0.55 });
  addTo(g, new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.028, 0.06), bMat), 0, -0.025, 0.04);

  // Sensor body (tilted 45° forward-downward, attached to bracket end)
  const sensorGroup = new THREE.Group();
  sensorGroup.position.set(0, -0.025, 0.075);
  sensorGroup.rotation.x = Math.PI / 4;  // 45° tilt: face points down+forward

  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x12121f, roughness: 0.15, metalness: 0.8 });
  sensorGroup.add(new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.055, 0.038), bodyMat));

  // Sensor face — purple emissive array
  const faceMat = new THREE.MeshStandardMaterial({ color: 0x8b5cf6, emissive: 0x7c3aed, emissiveIntensity: 2.2, roughness: 0.05, metalness: 0.1 });
  const face = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.044, 0.005), faceMat);
  face.position.set(0, 0, 0.021); sensorGroup.add(face);

  // Antenna grid dots (3×2 array on face)
  const dotMat = new THREE.MeshStandardMaterial({ color: 0xc4b5fd, emissive: 0xa78bfa, emissiveIntensity: 1.5, roughness: 0.05 });
  for (let col = -1; col <= 1; col++) for (let row = -0.5; row <= 0.5; row++) {
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.0045, 6, 6), dotMat);
    dot.position.set(col * 0.033, row * 0.018, 0.023); sensorGroup.add(dot);
  }

  // Status LED (green)
  const ledMat = new THREE.MeshStandardMaterial({ color: 0x00ff88, emissive: 0x00dd66, emissiveIntensity: 5 });
  const led = new THREE.Mesh(new THREE.SphereGeometry(0.0065, 8, 8), ledMat);
  led.position.set(0.048, 0.018, 0.021); sensorGroup.add(led);

  g.add(sensorGroup);
  return g;
}
function makePerson(color: number): THREE.Group {
  const g = new THREE.Group();
  addTo(g, new THREE.Mesh(new THREE.SphereGeometry(0.12,10,10), new THREE.MeshStandardMaterial({ color: 0xf5c5a3 })), 0, 1.65, 0);
  addTo(g, box(0.28, 0.65, 0.16, color), 0, 1.18, 0);
  addTo(g, box(0.10, 0.62, 0.12, 0x2c3e50), -0.08, 0.58, 0);
  addTo(g, box(0.10, 0.62, 0.12, 0x2c3e50),  0.08, 0.58, 0);
  return g;
}
function makeGeneric(w: number, d: number, color: number, h2 = 0.8): THREE.Group {
  const g = new THREE.Group();
  addTo(g, box(w, h2, d, color, 0.75), 0, h2/2, d/2);
  return g;
}

function isTV(obj: RoomObject): boolean {
  const l = obj.label.toLowerCase();
  return l.includes('tv') || l.includes('television') || l.includes('tele');
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export const Room3DViewer: React.FC<Props> = ({ room, objects, onClose }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current!;
    const W = mount.clientWidth, H = mount.clientHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x080d16);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    mount.appendChild(renderer.domElement);

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080d16, 0.04);

    // Camera
    const cx = room.width / 2, cz = room.height / 2;
    const dist = Math.max(room.width, room.height);
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.05, 300);
    camera.position.set(cx + dist * 0.6, dist * 0.85, cz + dist * 1.1);
    camera.lookAt(cx, 0.6, cz);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(cx, 0.5, cz);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 0.5;
    controls.maxDistance = 80;
    controls.maxPolarAngle = Math.PI / 2 - 0.01;
    controls.update();

    // Lights
    scene.add(new THREE.AmbientLight(0xfff4e8, 0.55));

    const sun = new THREE.DirectionalLight(0xffeedd, 1.05);
    sun.position.set(cx + 4, 9, cz - 4);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    const sc = Math.max(room.width, room.height) * 1.5;
    sun.shadow.camera.left = -sc; sun.shadow.camera.right = sc;
    sun.shadow.camera.top = sc;   sun.shadow.camera.bottom = -sc;
    sun.shadow.camera.near = 0.1; sun.shadow.camera.far = 40;
    sun.shadow.radius = 4;
    scene.add(sun);

    const fill = new THREE.DirectionalLight(0xb8d4ff, 0.3);
    fill.position.set(cx - 4, 3, cz + 6);
    scene.add(fill);

    // Warm overhead point lights
    const pt1 = new THREE.PointLight(0xfff0d8, 0.6, room.width * 2.5);
    pt1.position.set(cx, 2.5, cz);
    scene.add(pt1);

    // Floor — warm hardwood
    const floorC = document.createElement('canvas');
    floorC.width = 512; floorC.height = 512;
    const fc = floorC.getContext('2d')!;
    fc.fillStyle = '#b07840'; fc.fillRect(0, 0, 512, 512);
    // wood grain lines
    fc.strokeStyle = '#986030'; fc.lineWidth = 1.5;
    for (let i = 0; i < 512; i += 80) { fc.beginPath(); fc.moveTo(0, i); fc.lineTo(512, i); fc.stroke(); }
    fc.strokeStyle = '#a06838'; fc.lineWidth = 0.8;
    for (let i = 0; i < 512; i += 160) {
      fc.beginPath(); fc.moveTo(i, 0); fc.lineTo(i, 512); fc.stroke();
      fc.beginPath(); fc.moveTo(i+80, 80); fc.lineTo(i+80, 240); fc.stroke();
      fc.beginPath(); fc.moveTo(i+80, 320); fc.lineTo(i+80, 480); fc.stroke();
    }
    const floorTex = new THREE.CanvasTexture(floorC);
    floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping;
    floorTex.repeat.set(room.width * 1.2, room.height * 1.2);
    const floor = mesh(new THREE.PlaneGeometry(room.width, room.height), new THREE.MeshStandardMaterial({ map: floorTex, roughness: 0.55 }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(cx, 0, cz);
    scene.add(floor);

    // Walls
    const wallH = 2.8;
    const wallMat  = new THREE.MeshStandardMaterial({ color: 0xf5f0ea, roughness: 0.9, side: THREE.FrontSide });
    const wallMatT = new THREE.MeshStandardMaterial({ color: 0xf5f0ea, roughness: 0.9, transparent: true, opacity: 0.07, side: THREE.FrontSide });

    const wallBack  = mesh(new THREE.PlaneGeometry(room.width, wallH), wallMat);
    wallBack.position.set(cx, wallH/2, 0); scene.add(wallBack);
    const wallLeft  = mesh(new THREE.PlaneGeometry(room.height, wallH), wallMat);
    wallLeft.rotation.y = Math.PI/2; wallLeft.position.set(0, wallH/2, cz); scene.add(wallLeft);
    const wallRight = mesh(new THREE.PlaneGeometry(room.height, wallH), wallMat);
    wallRight.rotation.y = -Math.PI/2; wallRight.position.set(room.width, wallH/2, cz); scene.add(wallRight);
    const wallFront = mesh(new THREE.PlaneGeometry(room.width, wallH), wallMatT);
    wallFront.rotation.y = Math.PI; wallFront.position.set(cx, wallH/2, room.height); scene.add(wallFront);

    // Ceiling
    const ceilMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, transparent: true, opacity: 0.05 });
    const ceil = mesh(new THREE.PlaneGeometry(room.width, room.height), ceilMat);
    ceil.rotation.x = Math.PI/2; ceil.position.set(cx, wallH, cz); scene.add(ceil);

    // Skirting
    const skirtMat = new THREE.MeshStandardMaterial({ color: 0xe8e0d5, roughness: 0.8 });
    const sk = (w2: number, d2: number, px: number, py: number, pz: number) => {
      const s = mesh(new THREE.BoxGeometry(w2, 0.09, d2), skirtMat);
      s.position.set(px, py, pz); scene.add(s);
    };
    sk(room.width, 0.02, cx, 0.045, 0.01);
    sk(room.width, 0.02, cx, 0.045, room.height - 0.01);
    sk(0.02, room.height, 0.01, 0.045, cz);
    sk(0.02, room.height, room.width - 0.01, 0.045, cz);

    // Objects
    for (const obj of objects) {
      const color = hexToInt(obj.color);
      const w = obj.width, d = obj.height;

      // ── Wall-mounted TV ───────────────────────────────────────────────────
      if (isTV(obj)) {
        const tvW = Math.max(w, d);
        const tvGroup = makeTV(tvW);
        tvGroup.traverse(c => { if ((c as THREE.Mesh).isMesh) { c.castShadow = true; c.receiveShadow = true; } });

        // Find nearest wall
        const ox = obj.x + w/2, oz = obj.y + d/2;
        const dists = [
          { wall: 'back',  dist: oz,                  x: ox,         y: 1.1, z: 0.04,              ry: 0 },
          { wall: 'front', dist: room.height - oz,    x: ox,         y: 1.1, z: room.height - 0.04, ry: Math.PI },
          { wall: 'left',  dist: ox,                  x: 0.04,       y: 1.1, z: oz,                 ry: Math.PI/2 },
          { wall: 'right', dist: room.width - ox,     x: room.width-0.04, y: 1.1, z: oz,            ry: -Math.PI/2 },
        ];
        const nearest = dists.reduce((a, b) => a.dist < b.dist ? a : b);
        tvGroup.position.set(nearest.x, nearest.y, nearest.z);
        tvGroup.rotation.y = nearest.ry;
        scene.add(tvGroup);
        continue;
      }

      // ── Doors & windows (snapped to nearest wall) ─────────────────────────
      if (obj.type === 'door' || obj.type === 'window') {
        const group = obj.type === 'door' ? makeDoor(Math.max(w, d)) : makeWindow(Math.max(w, d));
        group.traverse(c => { if ((c as THREE.Mesh).isMesh) { c.castShadow = true; c.receiveShadow = true; } });
        const cx2 = obj.x + w/2, cy2 = obj.y + d/2;
        const elev = obj.type === 'window' ? 0.9 : 0;
        const dists2 = [
          { dist: cy2,                  pos: [cx2, elev, 0.02],              ry: 0 },
          { dist: room.height - cy2,    pos: [cx2, elev, room.height-0.02],  ry: Math.PI },
          { dist: cx2,                  pos: [0.02, elev, cy2],              ry: Math.PI/2 },
          { dist: room.width - cx2,     pos: [room.width-0.02, elev, cy2],   ry: -Math.PI/2 },
        ];
        const near = dists2.reduce((a, b) => a.dist < b.dist ? a : b);
        group.position.set(near.pos[0], near.pos[1], near.pos[2]);
        group.rotation.y = near.ry;
        scene.add(group);
        continue;
      }

      // ── Radar (wall-mounted, 45° tilt, wedge coverage) ───────────────────
      if (obj.type === 'radar') {
        const MOUNT_H = 2.2;   // height on wall (m)
        const RANGE   = 4.0;   // forward coverage (m)
        const SIDE    = 2.0;   // lateral coverage each side (m)

        const ox = obj.x + w / 2, oz = obj.y + d / 2;

        // Nearest wall → orientation for the group
        const wallOpts = [
          { dist: oz,               facing: 0,           wx: ox,          wz: 0            },
          { dist: room.height - oz, facing: Math.PI,     wx: ox,          wz: room.height  },
          { dist: ox,               facing: Math.PI / 2, wx: 0,           wz: oz           },
          { dist: room.width - ox,  facing: -Math.PI/2,  wx: room.width,  wz: oz           },
        ];
        const nearW = wallOpts.reduce((a, b) => a.dist < b.dist ? a : b);

        // Group anchored at wall position (floor level), rotated to face room
        const rg = new THREE.Group();
        rg.position.set(nearW.wx, 0, nearW.wz);
        rg.rotation.y = nearW.facing;

        // 1 ── Sensor device ─────────────────────────────────────────────────
        const device = makeRadarDevice();
        device.position.set(0, MOUNT_H, 0.01); // flush to wall
        rg.add(device);

        // 2 ── Coverage rectangle on floor (full width from wall) ─────────────
        // Flat rectangle: 2m left, 2m right, 4m deep — starts right at the wall
        const rectVerts = new Float32Array([
          -SIDE, 0.004, 0,
           SIDE, 0.004, 0,
           SIDE, 0.004, RANGE,
          -SIDE, 0.004, RANGE,
        ]);
        const rectGeo = new THREE.BufferGeometry();
        rectGeo.setAttribute('position', new THREE.BufferAttribute(rectVerts, 3));
        rectGeo.setIndex([0, 1, 2,  0, 2, 3]);
        rectGeo.computeVertexNormals();

        const rectMat = new THREE.MeshBasicMaterial({
          color: 0x8b5cf6, transparent: true, opacity: 0.10,
          side: THREE.DoubleSide, depthWrite: false,
        });
        rg.add(new THREE.Mesh(rectGeo, rectMat));

        // 3 ── Border lines ────────────────────────────────────────────────────
        const edgeMat = new THREE.LineBasicMaterial({ color: 0xb090ff, transparent: true, opacity: 0.65 });

        const mkLine = (pts: [number,number,number][]) => {
          const geo = new THREE.BufferGeometry().setFromPoints(pts.map(([x,y,z]) => new THREE.Vector3(x,y,z)));
          return new THREE.Line(geo, edgeMat);
        };

        rg.add(mkLine([[-SIDE, 0.008, 0],    [-SIDE, 0.008, RANGE]]));  // left edge
        rg.add(mkLine([[ SIDE, 0.008, 0],    [ SIDE, 0.008, RANGE]]));  // right edge
        rg.add(mkLine([[-SIDE, 0.008, RANGE],[ SIDE, 0.008, RANGE]]));  // far edge
        rg.add(mkLine([[-SIDE, 0.008, 0],    [ SIDE, 0.008, 0    ]]));  // near edge (at wall)

        // 4 ── Depth grid lines at 1m, 2m, 3m ─────────────────────────────────
        [1, 2, 3].forEach((depth, i) => {
          const dMat = new THREE.LineBasicMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.30 - i * 0.07 });
          const geo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-SIDE, 0.006, depth),
            new THREE.Vector3( SIDE, 0.006, depth),
          ]);
          rg.add(new THREE.Line(geo, dMat));
        });

        // 5 ── Vertical beam line from sensor down to floor centre ─────────────
        const beamMat = new THREE.LineBasicMaterial({ color: 0xd8b4fe, transparent: true, opacity: 0.35 });
        const beamGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, MOUNT_H, 0.05),
          new THREE.Vector3(0, 0.01, MOUNT_H),   // hits floor at same dist as height (45°)
        ]);
        rg.add(new THREE.Line(beamGeo, beamMat));

        // 6 ── Soft glow point at sensor position ──────────────────────────────
        const radarGlow = new THREE.PointLight(0x9b59b6, 0.8, 3.5);
        radarGlow.position.set(0, MOUNT_H, 0.15);
        rg.add(radarGlow);

        scene.add(rg);
        continue;
      }

      // ── All other furniture ───────────────────────────────────────────────
      let group: THREE.Group;
      switch (obj.type) {
        case 'bed':      group = makeBed(w, d); break;
        case 'sofa':     group = makeSofa(w, d, color); break;
        case 'wardrobe': group = makeWardrobe(w, d); break;
        case 'table':    group = makeTable(w, d); break;
        case 'desk':     group = makeDesk(w, d); break;
        case 'chair':    group = makeChair(w, d, color); break;
        case 'cabinet':  group = makeCabinet(w, d); break;
        case 'person':   group = makePerson(color); break;
        default:         group = makeGeneric(w, d, color); break;
      }
      const wrapper = new THREE.Group();
      wrapper.position.set(obj.x + w/2, 0, obj.y + d/2);
      wrapper.rotation.y = -(obj.rotation * Math.PI) / 180;
      group.position.set(0, 0, -d/2);
      wrapper.add(group);
      wrapper.traverse(c => { if ((c as THREE.Mesh).isMesh) { c.castShadow = true; c.receiveShadow = true; } });
      scene.add(wrapper);
    }

    // Animate
    let animId: number;
    const animate = () => { animId = requestAnimationFrame(animate); controls.update(); renderer.render(scene, camera); };
    animate();

    const ro = new ResizeObserver(() => {
      const nw = mount.clientWidth, nh = mount.clientHeight;
      camera.aspect = nw / nh; camera.updateProjectionMatrix(); renderer.setSize(nw, nh);
    });
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(animId); ro.disconnect(); controls.dispose(); renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [objects, room]);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(6px)' }}>
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', width: '96vw', height: '93vh', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.09)', boxShadow: '0 32px 80px rgba(0,0,0,0.7)' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 18px', flexShrink: 0, background: 'rgba(8,13,22,0.98)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>⬡</div>
            <div>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#f1f5f9' }}>3D Room View</p>
              <p style={{ margin: 0, fontSize: 10, color: '#475569' }}>{room.width}m × {room.height}m · {objects.length} objects · drag to rotate · scroll to zoom</p>
            </div>
          </div>
          <button onClick={onClose} style={{ padding: '5px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, color: '#94a3b8', cursor: 'pointer', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#f1f5f9'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#94a3b8'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)'; }}
          >✕ Close</button>
        </div>

        <div ref={mountRef} style={{ flex: 1, width: '100%' }} />
      </div>
    </div>
  );
};
