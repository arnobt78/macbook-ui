/**
 * Application entry (Vite SPA):
 * - Mounts React into the single `#root` div from `index.html`.
 * - StrictMode helps catch unsafe side-effects in development (double-invokes some lifecycles).
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
