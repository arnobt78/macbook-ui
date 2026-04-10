/**
 * Vite build configuration:
 * - `@vitejs/plugin-react` for Fast Refresh + JSX runtime.
 * - `@tailwindcss/vite` wires Tailwind v4 without PostCSS boilerplate.
 * - `manualChunks` splits heavy vendors (three/drei/gsap) to improve caching & parallel download.
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ["@react-three/drei", "stats.js"],
  },
  build: {
    // three + drei exceed 500 kB minified by design; chunking still keeps the app entry small.
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("node_modules/@react-three/drei")) return "drei";
          if (id.includes("node_modules/@react-three/fiber")) return "fiber";
          if (id.includes("node_modules/three")) return "three";
          if (id.includes("node_modules/gsap") || id.includes("node_modules/@gsap"))
            return "gsap";
          if (id.includes("node_modules/react-dom")) return "react-dom";
          if (id.includes("node_modules/react/")) return "react";
        },
      },
    },
  },
});
