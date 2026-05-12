import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const isGhPages = process.env.DEPLOY_TARGET === "gh-pages";

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
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
});
