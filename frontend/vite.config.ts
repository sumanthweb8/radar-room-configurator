import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const isGhPages = process.env.DEPLOY_TARGET === "gh-pages";

// Dev /api proxy target. Override when the backend isn't on the default 8000
// (e.g. that port is taken): `BACKEND_URL=http://localhost:8001 npm run dev`.
const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";

export default defineConfig({
  plugins: [react()],
  // Local builds use base '/' so FastAPI can serve from root.
  // GitHub Pages builds use the repo sub-path.
  base: isGhPages ? "/radar-room-configurator/" : "/",
  server: {
    port: 5173,
    // Proxy /api/* to the FastAPI backend so CORS is never an issue in dev.
    proxy: {
      "/api": {
        target: backendUrl,
        changeOrigin: true,
      },
    },
  },
});
