# MacBook Showcase Landing Page - React, Vite, TypeScript, Tailwind CSS, GSAP, Three.js, Zustand Frontend Project

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.13-88CE02?logo=greensock&logoColor=white)](https://gsap.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.180-000000?logo=three.js&logoColor=white)](https://threejs.org/)
[![React Three Fiber](https://img.shields.io/badge/R3F-9.3-000000)](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
[![Zustand](https://img.shields.io/badge/Zustand-5.x-433654)](https://docs.pmnd.rs/zustand/getting-started/introduction)

A **single-page application (SPA)**—one HTML shell, one React tree, no server-rendered pages and **no built-in REST or GraphQL API**. It is built for **learning and portfolio demos**: you can study how a marketing-style landing page combines **layout (Tailwind)**, **time-based and scroll-linked motion (GSAP)**, **viewport-driven CSS reveals (`IntersectionObserver`)**, and **interactive 3D (Three.js through React Three Fiber)** in one cohesive codebase. All marketing copy, nav targets, and asset paths are **static** (see `src/constants/index.ts` and `public/`). Extend it with a backend or CMS when your product outgrows hardcoded data.

**Live demo:** [https://macbook-ui.vercel.app/](https://macbook-ui.vercel.app/)

![Image 1](https://github.com/user-attachments/assets/98e5b72e-e603-49c0-85b6-2a6319ab41ba)
![Image 2](https://github.com/user-attachments/assets/6e8ba196-82be-48d5-b11e-13528558c3ad)
![Image 3](https://github.com/user-attachments/assets/37934195-7c53-402a-aa72-2a93348a5378)
![Image 4](https://github.com/user-attachments/assets/d0ac9e70-e562-43b2-a271-af40e19f2ce4)
![Image 5](https://github.com/user-attachments/assets/835045f5-e343-4832-849b-617a51c26b9c)
![Image 6](https://github.com/user-attachments/assets/321cc6a8-300d-4f3c-a6af-877328ce9771)

## Table of contents

1. [What you will learn](#what-you-will-learn)
2. [Keywords at a glance](#keywords-at-a-glance)
3. [Tech stack & dependencies](#tech-stack--dependencies)
4. [Architecture at a glance](#architecture-at-a-glance)
5. [Project structure](#project-structure)
6. [Routing, pages & “API”](#routing-pages--api)
7. [Features & how each part works](#features--how-each-part-works)
8. [Environment variables (`.env`)](#environment-variables-env)
9. [How to run & npm scripts](#how-to-run--npm-scripts)
10. [Build, preview & deploy](#build-preview--deploy)
11. [Reusing components in other projects](#reusing-components-in-other-projects)
12. [Styling & motion docs](#styling--motion-docs)
13. [Linting & type-checking](#linting--type-checking)
14. [Further reading](#further-reading)
15. [Conclusion](#conclusion)
16. [License & closing](#license)

---

## What you will learn

- How **Vite** boots a **React + TypeScript** SPA and how `index.html` relates to `src/main.tsx`.
- How **GSAP** and **ScrollTrigger** map **scroll position** to timelines (scrub, pin, stagger).
- How **`@gsap/react` `useGSAP`** ties animations to refs with safer cleanup than raw `useEffect` for many GSAP cases.
- How **React Three Fiber** embeds a **Three.js** scene in JSX and loads **GLB/GLTF** models with **drei** helpers (`useGLTF`, `useVideoTexture`, `Environment`, etc.).
- How **Zustand** shares a tiny slice of state (`color`, `scale`, `texture`) between **DOM controls** and **materials** in the 3D tree.
- How **Tailwind CSS v4** with **`@tailwindcss/vite`** and **`@layer components`** in `src/index.css` scopes section layout to IDs like `#hero`, `#features`.
- How **IntersectionObserver + CSS transitions** implement “reveal on viewport” patterns without GSAP for some sections (footer copy rows, performance paragraph lines, hero stagger).

---

## Keywords at a glance

| Keyword / topic       | Short meaning in this repo                                                                                       |
| --------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **SPA**               | One `index.html`; all “navigation” is in-page (`#section` hashes) or scroll—not Next.js file routes.             |
| **ScrollTrigger**     | GSAP plugin: run or scrub timelines based on scroll range vs. a trigger element.                                 |
| **Scrub**             | Animation progress is **locked to scroll** (drag scroll = drag timeline).                                        |
| **Pin**               | ScrollTrigger can **fix** a section while the user scrolls through a longer virtual range (Showcase / Features). |
| **R3F**               | React renderer for Three: `<Canvas>`, hooks like `useFrame`, tree = scene graph.                                 |
| **drei**              | Helpers on top of R3F: lights, loaders, `Html`, controls, textures.                                              |
| **GLB**               | Binary glTF; 3D MacBook meshes live under `public/models/`.                                                      |
| **Zustand**           | Small global store; no Redux boilerplate.                                                                        |
| **`import.meta.env`** | Vite’s way to read env vars (only if you add `VITE_*` keys later).                                               |
| **`public/`**         | Files served at **root URL** (`/videos/hero.mp4`).                                                               |

---

## Tech stack & dependencies

| Package                                                    | Role                                 | Learner note                                                                               |
| ---------------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------ |
| **vite**                                                   | Dev server, HMR, production build.   | `vite.config.js` splits `three`, `drei`, `fiber`, `gsap` into separate chunks for caching. |
| **@vitejs/plugin-react**                                   | JSX + Fast Refresh.                  | Standard React plugin for Vite.                                                            |
| **react** / **react-dom**                                  | UI layer.                            | Entry: `src/main.tsx` → `App`.                                                             |
| **typescript**                                             | Static types.                        | `tsconfig.json` + `tsconfig.app.json` for app vs Node tooling.                             |
| **tailwindcss** + **@tailwindcss/vite**                    | Utility CSS + Vite integration (v4). | No separate PostCSS config required for this setup.                                        |
| **gsap** + **@gsap/react**                                 | Animation + React hook `useGSAP`.    | `ScrollTrigger` registered once in `App.tsx`.                                              |
| **three** + **@react-three/fiber** + **@react-three/drei** | WebGL scene in React.                | `Canvas` in `ProductViewer` / `Features`.                                                  |
| **zustand**                                                | Global client store.                 | `src/store/index.ts`—no persistence.                                                       |
| **react-responsive**                                       | `useMediaQuery` for breakpoints.     | Used to skip heavy desktop-only ScrollTrigger setups on small screens.                     |
| **clsx**                                                   | Conditional class strings.           | e.g. active color swatch in `ProductViewer`.                                               |

**Example: reading the Zustand store in a component**

```tsx
import useMacbookStore from "./store";

const { color, setColor } = useMacbookStore();
// Pass `color` into a GLTF material hook or UI className
```

**Example: registering GSAP once (already in `App.tsx`)**

```ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
```

---

## Architecture at a glance

```text
index.html (shell, SEO, critical CSS, preloads)
    └── main.tsx (React root)
            └── App.tsx (ScrollTrigger register + scroll reset + <main> sections)
                    ├── NavBar, Hero, ProductViewer, …
                    ├── R3F <Canvas> where used (WebGL context per canvas)
                    └── constants/index.ts (static data, no fetch)
```

- **No backend** in this repo: nothing listens on a port for JSON. “Data” = TypeScript arrays + static files.
- **Vercel**: `vercel.json` rewrites all paths to `index.html` so client-side navigation and refresh on deep links work for the SPA.

---

## Project structure

```text
macbook-ui/
├── public/                    # Static assets (URLs start with /)
│   ├── fonts/
│   ├── models/                # .glb MacBook variants
│   ├── videos/                # hero, game, feature loops
│   ├── robots.txt
│   └── …images / svg
├── src/
│   ├── main.tsx               # createRoot + StrictMode
│   ├── App.tsx                # ScrollTrigger + section order + scroll restoration
│   ├── index.css              # Tailwind + @layer components (#hero, #features, …)
│   ├── vite-env.d.ts          # Vite client typings
│   ├── constants/index.ts     # Nav, features, performance layout data, footer links
│   ├── store/index.ts         # Zustand: color, scale, texture
│   ├── types/macbookGltf.ts   # GLTF typing helper
│   └── components/
│       ├── NavBar.tsx
│       ├── Hero.tsx
│       ├── ProductViewer.tsx
│       ├── Showcase.tsx
│       ├── Performance.tsx
│       ├── Features.tsx
│       ├── Highlights.tsx
│       ├── Footer.tsx
│       ├── models/            # Macbook GLTF JSX wrappers
│       └── three/             # StudioLights, ModelSwitcher
├── docs/                      # Extra guides (styling, parallax, deployment notes)
├── index.html                 # Entry HTML, meta, preloads, hero CTA anti-flash
├── vite.config.js             # React + Tailwind plugins, manualChunks
├── vercel.json                # SPA fallback rewrite → index.html
├── eslint.config.js
├── tsconfig*.json
├── LICENSE                    # MIT
└── README.md                  # This file
```

---

## Routing, pages & “API”

| Topic              | In this project                                                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Framework**      | **Not** Next.js—there is no `pages/` or `app/` router.                                                                                |
| **Routes**         | There is **one page**. “Sections” are `<section id="…">` blocks; **navbar links** use `href="#hero"` etc. (see `constants.navLinks`). |
| **REST / GraphQL** | **None.** No `fetch` to a backend in the shipped demo.                                                                                |
| **Data**           | `src/constants/index.ts` + files under `public/`.                                                                                     |
| **SSR**            | No server components; build output is static **JS + CSS + assets**.                                                                   |

If you add a real API later, you would introduce something like `VITE_API_BASE_URL`, use `fetch` or a data library (TanStack Query), and keep secrets **out** of the client bundle.

---

## Features & how each part works

### 1. `NavBar`

Fixed header; logo scrolls to top; center links jump to section IDs (`scroll-padding-top` in CSS clears the fixed bar). Entrance uses a short **GSAP** tween on `<nav>`.

### 2. `Hero`

Above-the-fold headline, title image, muted **autoplay** video, CTA, price. Uses **CSS transitions** + **IntersectionObserver** for staggered reveal; separate observer for the **video shell** (restarts clip on enter). `data-hero-cta-ready` on `#root` pairs with `index.html` to avoid a flashing Buy button before JS runs.

### 3. `ProductViewer`

**Zustand** drives finish color and 14″/16″ scale; **R3F `<Canvas>`** renders `ModelSwitcher` (two GLB groups) with **PresentationControls** and idle rotation helper. No API—state is local to the browser.

### 4. `Showcase`

Background video + masked logo. **Desktop**: ScrollTrigger **pin + scrub** timeline; **tablet/small** timeline skipped for layout reasons. Copy blocks use **IntersectionObserver** + `.showcase-row` CSS stagger.

### 5. `Performance`

**Desktop**: scrubbed timeline moves `.p1`…`.p7` collage images (see `performanceImgPositions` in constants). Long paragraph uses **`.performance-line`** rows + observer + CSS (same pattern as footer rows).

### 6. `Features`

Pinned **`#f-canvas`** with scroll-scrubbed **model rotation** and **texture swaps** coordinated with `.box1`…`.box5` opacity; videos **preloaded** via hidden `<video>` elements in `useEffect` (still static files, not an API).

### 7. `Highlights`

Masonry-style cards; **GSAP** reveals columns; individual cards / subtitle may use **IntersectionObserver** + classes in `index.css`.

### 8. `Footer`

Legal copy + links; **no fetch**. Rows use `.performance-line` + `footer-reveal-ready` / `is-inview` (avoid Tailwind’s bare `content` utility on wrappers—it maps to CSS `content:` and can break production layout).

**GSAP registration (once at app level)** — already in `src/App.tsx`:

```ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
```

**Zustand store (excerpt)** — `src/store/index.ts`:

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
```

---

## Environment variables (`.env`)

**You do not need any `.env` file** to run, build, or deploy this project. There are no required API keys, database URLs, or third-party tokens in the source.

**Optional (future):** if you add a backend or analytics, follow **Vite’s rule**: only variables prefixed with `VITE_` are exposed to browser code.

```bash
# .env.local (example only — not required today)
VITE_PUBLIC_APP_NAME=MacBook Pro Landing
```

```ts
const title =
  import.meta.env.VITE_PUBLIC_APP_NAME ?? "MacBook Pro Landing Page";
```

For production secrets, use your host’s **environment variables** UI (e.g. Vercel) and never commit real secrets to git.

---

## How to run & npm scripts

**Prerequisites:** [Node.js](https://nodejs.org/) **20+** (LTS recommended) and npm.

```bash
npm install          # install dependencies
npm run dev          # http://localhost:5173 (Vite dev server + HMR)
```

| Script               | What it does                                       |
| -------------------- | -------------------------------------------------- |
| `npm run dev`        | Start Vite dev server.                             |
| `npm run build`      | Production build → `dist/`.                        |
| `npm run preview`    | Serve `dist/` locally to verify production output. |
| `npm run lint`       | ESLint (flat config).                              |
| `npm run type-check` | `tsc -b` full typecheck, no emit.                  |

---

## Build, preview & deploy

```bash
npm run build
npm run preview
```

**Vercel:** connect the Git repository or upload the `dist/` folder as a static site. `vercel.json` contains a **SPA rewrite** so every path serves `index.html` (fixes 404 on refresh for client-only apps). Tune caching and headers in the Vercel dashboard if you add API routes elsewhere.

---

## Reusing components in other projects

| Piece               | How to reuse                                                                                                                                |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Section + CSS**   | Copy the `.tsx` file and the matching `#section` rules from `src/index.css`, or extract styles to CSS modules.                              |
| **Zustand store**   | Move `store/index.ts` into a shared `lib/` package; keep types next to the store.                                                           |
| **R3F canvas**      | Wrap `<Canvas>` in `Suspense`; preload GLBs with `useGLTF.preload` from drei in the same module where you use the model.                    |
| **ScrollTrigger**   | Keep `registerPlugin` **once** per app; on route changes (if you add a router), `ScrollTrigger.getAll().forEach(t => t.kill())` or refresh. |
| **Constants → CMS** | Replace static arrays with `fetch` + loading states when you outgrow hardcoded copy.                                                        |

**Minimal “drop-in” Hero pattern (conceptual)**

1. Copy `Hero.tsx` + hero block from `index.css`.
2. Ensure `#root` / critical CSS strategy matches your CTA anti-flash needs.
3. Replace video and image paths under `public/`.

---

## Styling & motion docs

- **`docs/UI_STYLING_GUIDE.md`** — Tailwind-oriented design notes; includes a **GSAP / scroll / viewport reveal** section for this repo.
- **`docs/PARALLAX_SCROLL_REVEAL_SYSTEM.md`** — Scroll-linked and reveal patterns (if present in your clone).
- **`docs/VERCEL_PRODUCTION_GUARDRAILS.md`** — Deployment notes.

---

## Linting & type-checking

```bash
npm run lint
npm run type-check
```

ESLint uses **`eslint.config.js`** (flat config) with TypeScript ESLint, React Hooks, and React Refresh rules suited for Vite.

---

## Further reading

- [Vite](https://vitejs.dev/guide/)
- [React](https://react.dev/learn)
- [GSAP & ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- [drei](https://github.com/pmndrs/drei#readme)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Tailwind CSS v4](https://tailwindcss.com/docs)

---

## Conclusion

**macbook-ui** is a compact **open-source teaching sandbox**: one continuous scroll story, **two high-impact layers** (GSAP motion + Three.js/R3F), and **minimal global state**. It deliberately avoids backends and env complexity so you can focus on **layout → motion → WebGL → polish**, then add APIs, auth, or a meta-framework when your roadmap requires them.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.

## Happy Coding! 🎉

This is an **open-source project** - feel free to use, enhance, and extend this project further!

If you have any questions or want to share your work, reach out via GitHub or my portfolio at [https://www.arnobmahmud.com](https://www.arnobmahmud.com).

**Enjoy building and learning!** 🚀

Thank you! 😊

---
