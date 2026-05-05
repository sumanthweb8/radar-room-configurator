import '@testing-library/jest-dom';

const noop = () => {};

// jsdom doesn't implement ResizeObserver
(globalThis as any).ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Three.js uses WebGL — stub canvas for unit tests
(globalThis as any).WebGLRenderingContext = {};
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: () => ({
    fillRect: noop, strokeRect: noop, clearRect: noop,
    fillStyle: '', strokeStyle: '', lineWidth: 0,
    beginPath: noop, moveTo: noop, lineTo: noop, stroke: noop, fill: noop,
    roundRect: noop, textAlign: '', textBaseline: '', font: '',
    fillText: noop, measureText: () => ({ width: 0 }),
    drawImage: noop, createTexture: noop,
  }),
});
