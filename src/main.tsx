/**
 * Application entry (Vite SPA) — `index.html` loads this module as `type="module"`.
 *
 * Flow: import global styles → resolve `#root` → `createRoot().render(<App />)`.
 *
 * StrictMode (dev): intentionally double-invokes some effects to surface bugs; GSAP-heavy
 * components sometimes need guards if animations must run strictly once per mount.
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element #root not found");
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
