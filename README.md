# MacBook Showcase Landing Page - React, Vite, TypeScript, Tailwind CSS, GSAP, Three.js, Zustand Frontend Project

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.13-88CE02?logo=greensock&logoColor=white)](https://gsap.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.180-000000?logo=three.js&logoColor=white)](https://threejs.org/)
[![React Three Fiber](https://img.shields.io/badge/R3F-9.3-000000)](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
[![Zustand](https://img.shields.io/badge/Zustand-5.0-433654)](https://docs.pmnd.rs/zustand/getting-started/introduction)

A **single-page, client-side** marketing-style experience inspired by Apple product pages. It combines **scroll-driven storytelling (GSAP)**, **interactive 3D (Three.js via React Three Fiber)**, and a **small global state slice (Zustand)** so learners can see how modern landing pages mix layout, motion, and WebGL without a traditional backend or REST API.

- **Live Demo:** [https://macbook-ui.vercel.app/](https://macbook-ui.vercel.app/)

---

## Table of contents

1. [What you will learn](#what-you-will-learn)
2. [Keywords at a glance](#keywords-at-a-glance)
3. [Tech stack & why each piece exists](#tech-stack--why-each-piece-exists)
4. [Project structure](#project-structure)
5. [Features & how they work](#features--how-they-work)
6. [API, backend & data flow](#api-backend--data-flow)
7. [Environment variables (`.env`)](#environment-variables-env)
8. [How to run & scripts](#how-to-run--scripts)
9. [Build, preview & deploy](#build-preview--deploy)
10. [Reusing parts in other projects](#reusing-parts-in-other-projects)
11. [Linting & type-checking](#linting--type-checking)
12. [Further reading](#further-reading)
13. [Conclusion](#conclusion)

---

## What you will learn

- How a **Vite + React + TypeScript** SPA is organized for clarity and scale.
- How **GSAP + ScrollTrigger** tie scroll position to timelines (pinning, scrubbing, parallax-style motion).
- How **React Three Fiber** mounts a Three.js scene inside React and loads **GLTF** models with **drei** helpers.
- How **Zustand** shares a few values (color, scale, screen video texture) between UI controls and 3D materials.
- How **Tailwind CSS v4** (via `@tailwindcss/vite`) keeps styling co-located with components using `@layer` rules in `src/index.css`.

---

## Keywords at a glance

| Keyword / topic       | Short meaning in this repo                                      |
| --------------------- | --------------------------------------------------------------- |
| **SPA**               | One HTML shell; all routes are client-side (no Next.js router). |
| **ScrollTrigger**     | GSAP plugin: run animations based on scroll position.           |
| **R3F**               | React renderer for Three.js (`<Canvas>`, `<mesh>`, hooks).      |
| **drei**              | Helpers: `useGLTF`, `useVideoTexture`, `Environment`, etc.      |
| **GLTF / GLB**        | 3D model format; `.glb` is binary, used for MacBook meshes.     |
| **Zustand**           | Minimal global store; no Redux boilerplate.                     |
| **Vite**              | Fast dev server & optimized production bundles.                 |
| **Tailwind `@theme`** | Design tokens (fonts, colors) declared in CSS for v4.           |

---

## Tech stack & why each piece exists

| Technology             | Role here                                                                   |
| ---------------------- | --------------------------------------------------------------------------- |
| **Vite 7**             | Dev server, HMR, production build, asset pipeline.                          |
| **React 19**           | UI composition, hooks, concurrent-friendly patterns.                        |
| **TypeScript**         | Types for props, refs, GLTF results, and store shape.                       |
| **Tailwind CSS 4**     | Utility classes + `@layer components` for section layout (see `index.css`). |
| **GSAP 3**             | Timelines, easing, `ScrollTrigger` for scroll-synced motion.                |
| **@gsap/react**        | `useGSAP` hook with proper cleanup in React.                                |
| **three + R3F + drei** | 3D scene, models, lights, video textures on the laptop screen.              |
| **react-responsive**   | `useMediaQuery` for mobile vs desktop tuning (e.g. model scale).            |
| **clsx**               | Conditional class names in JSX (e.g. active swatches).                      |
| **Zustand**            | `color`, `scale`, `texture` + setters for product viewer & features.        |

**Note:** This is **not** a Next.js app—there is **no** `app/` router, **no** `getServerSideProps`, and **no** built-in API routes. Everything ships as static HTML/JS/CSS plus files under `public/`.

---

## Project structure

```text
macbook-ui/
├── public/                 # Static assets (served as-is at /)
│   ├── fonts/              # Custom OTF faces
│   ├── models/             # MacBook GLB / transformed GLB
│   ├── videos/             # Hero, game, feature loops
│   ├── robots.txt
│   └── …png / .svg         # Icons, performance art, etc.
├── src/
│   ├── main.tsx            # React root + StrictMode
│   ├── App.tsx             # Registers ScrollTrigger; composes sections
│   ├── index.css           # Tailwind import + @layer component styles
│   ├── vite-env.d.ts       # Vite client types (e.g. CSS modules)
│   ├── constants/index.ts  # Nav links, features copy, image lists, etc.
│   ├── store/index.ts      # Zustand Macbook store
│   ├── types/macbookGltf.ts# Shared typing helper for GLTF + meshes
│   └── components/
│       ├── NavBar.tsx
│       ├── Hero.tsx
│       ├── ProductViewer.tsx
│       ├── Showcase.tsx
│       ├── Performance.tsx
│       ├── Features.tsx
│       ├── Highlights.tsx
│       ├── Footer.tsx
│       ├── models/         # Macbook.tsx, Macbook-14.tsx, Macbook-16.tsx
│       └── three/          # StudioLights.tsx, ModelSwitcher.tsx
├── docs/                   # Internal design / guardrail notes (optional read)
├── index.html              # Entry HTML + SEO + preload hints
├── vite.config.js          # Plugins, manualChunks for heavy vendors
├── vercel.json             # Security headers + long cache for /assets/*
├── tsconfig*.json          # TypeScript project references
├── eslint.config.js        # Flat ESLint + TypeScript rules
├── LICENSE                 # MIT
└── README.md               # This file
```

---

## Features & how they work

### 1. `NavBar`

- Static header: logo, faux nav links, search/cart icons.
- Styles live under `@layer components { header { … } }` in `src/index.css`.

### 2. `Hero`

- Title image + hero **MP4** (`playbackRate` bumped in `useEffect`).
- Plain **Buy** button (no server action—purely presentational).

### 3. `ProductViewer`

- **`<Canvas>`** from `@react-three/fiber` with `StudioLights` + `ModelSwitcher`.
- **Zustand** drives swatches (14″ / 16″) and body color; `PresentationControls` + GSAP fade/slide between two GLTF groups.

### 4. `Showcase`

- Full-width video + masked logo; **ScrollTrigger** `pin` + `scrub` timeline on desktop to sync mask scale and text opacity.

### 5. `Performance`

- Collage of performance images with a **scrubbed** GSAP timeline repositioning images on desktop; paragraph fades in on scroll.

### 6. `Features`

- Pinned **feature canvas**: MacBook model rotates on scroll; **feature videos** preloaded in `useEffect`; texture swaps coordinated with `.box1`…`.box5` opacity tweens.

### 7. `Highlights`

- Masonry-style cards; GSAP reveals columns on scroll (different trigger on mobile vs desktop).

### 8. `Footer`

- Static links and copyright line—no fetch.

**GSAP registration (once at app level):**

```ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
```

**Zustand store (shared 3D + UI state):**

```ts
import { create } from "zustand";

const useMacbookStore = create<MacbookState>()((set) => ({
  color: "#2e2c2e",
  setColor: (color) => set({ color }),
  scale: 0.08,
  setScale: (scale) => set({ scale }),
  texture: "/videos/feature-1.mp4",
  setTexture: (texture) => set({ texture }),
  reset: () =>
    set({ color: "#2e2c2e", scale: 0.08, texture: "/videos/feature-1.mp4" }),
}));

export default useMacbookStore;
```

---

## API, backend & data flow

| Question                         | Answer                                                                                        |
| -------------------------------- | --------------------------------------------------------------------------------------------- |
| **REST / GraphQL API?**          | **None.** All content is static JSON/arrays in `src/constants/index.ts` or hardcoded JSX.     |
| **Server-side rendering?**       | **No.** First paint is the built SPA; crawlers see `index.html` meta + shell.                 |
| **Where do videos/models live?** | Under **`public/`**—URLs like `/videos/hero.mp4` resolve at runtime from the deployed origin. |
| **Authentication?**              | **None.**                                                                                     |

If you later add a real backend, you would typically introduce `fetch` calls, optional **React Query / TanStack Query**, and environment-based **base URLs** (see [Environment variables](#environment-variables-env)).

---

## Environment variables (`.env`)

**You do not need any `.env` file to run or build this project**—there are no secret keys, database URLs, or third-party API tokens in the codebase today.

**Optional pattern for future work** (Vite convention: only variables prefixed with `VITE_` are exposed to client code):

1. Create `.env.local` (gitignored) in the project root:

   ```bash
   # .env.local (example — not required for this repo)
   VITE_PUBLIC_APP_NAME=MacBook Pro Landing
   ```

2. Read in code (after you actually need it):

   ```ts
   const appName =
     import.meta.env.VITE_PUBLIC_APP_NAME ?? "MacBook Pro Landing Page";
   ```

3. **Never** commit real secrets. Use Vercel/hosting **Environment Variables** UI for production values.

---

## How to run & scripts

**Prerequisites:** [Node.js](https://nodejs.org/) **20+** (LTS recommended) and npm.

```bash
# Install dependencies
npm install

# Start dev server (default http://localhost:5173)
npm run dev
```

| Script               | What it does                                     |
| -------------------- | ------------------------------------------------ |
| `npm run dev`        | Vite dev server with hot reload.                 |
| `npm run build`      | TypeScript-aware production build to `dist/`.    |
| `npm run preview`    | Serves the production build locally for testing. |
| `npm run lint`       | ESLint over `src/` (and config files).           |
| `npm run type-check` | `tsc -b` — full project type check, no emit.     |

---

## Build, preview & deploy

```bash
npm run build
npm run preview
```

**Vercel (current demo host):** connect the Git repo or deploy the `dist/` output as a static site. `vercel.json` adds security headers and long-lived caching for hashed assets under `/assets/`. `public/robots.txt` guides crawlers.

---

## Reusing parts in other projects

| Piece                  | How to reuse                                                                                   |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| **Section components** | Copy a component + matching `@layer` block from `index.css`, or move styles into modules.      |
| **Zustand store**      | Extract `store/index.ts` into a package or `lib/store` in a monorepo; keep types alongside.    |
| **R3F canvas**         | Wrap `<Canvas>` in `Suspense`; preload GLBs with `useGLTF.preload` in the same module as use.  |
| **GSAP ScrollTrigger** | Always `registerPlugin` once; kill/refresh triggers on route change if you add a router later. |
| **Constants**          | Replace `src/constants/index.ts` with CMS/API-driven data when you outgrow static arrays.      |

---

## Linting & type-checking

```bash
npm run lint
npm run type-check
```

ESLint uses the **flat config** (`eslint.config.js`) with **TypeScript ESLint**, React Hooks, and React Refresh rules suited for Vite.

---

## Further reading

- [Vite guide](https://vitejs.dev/guide/)
- [React docs](https://react.dev/learn)
- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- [drei](https://github.com/pmndrs/drei#readme)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Tailwind CSS v4](https://tailwindcss.com/docs)

---

## Conclusion

**MacBook UI** is a focused learning sandbox: one scroll narrative, two major “wow” layers (**motion** + **3D**), and a tiny amount of shared state. It intentionally avoids backend complexity so you can study **layout → animation → WebGL** in isolation, then bolt on APIs or a meta-framework when your product needs them.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.

## Happy Coding! 🎉

This is an **open-source project** - feel free to use, enhance, and extend this project further!

If you have any questions or want to share your work, reach out via GitHub or my portfolio at [https://www.arnobmahmud.com](https://www.arnobmahmud.com).

**Enjoy building and learning!** 🚀

Thank you! 😊

---
