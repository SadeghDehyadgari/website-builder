// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // [NEW] Explicitly expose Vite to the local network (equivalent to 0.0.0.0)
    host: true,
    proxy: {
      "/api": {
        // [FIX] Force IPv4 (127.0.0.1) instead of localhost to prevent Node.js IPv6 resolution bugs
        target: "http://127.0.0.1:3001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
