/**
 * Global client store for anything that must sync React DOM + Three.js materials.
 * `create<MacbookState>()(...)` is Zustand’s typed initializer pattern (v4/v5 compatible).
 */
import { create } from "zustand";

export interface MacbookState {
  color: string;
  setColor: (color: string) => void;
  scale: number;
  setScale: (scale: number) => void;
  texture: string;
  setTexture: (texture: string) => void;
  reset: () => void;
}

const useMacbookStore = create<MacbookState>()((set) => ({
  color: "#2e2c2e",
  setColor: (color) => set({ color }),

  scale: 0.08,
  setScale: (scale) => set({ scale }),

  texture: "/videos/feature-1.mp4",
  setTexture: (texture) => set({ texture }),

  reset: () =>
    set({
      color: "#2e2c2e",
      scale: 0.08,
      texture: "/videos/feature-1.mp4",
    }),
}));

export default useMacbookStore;
