/**
 * Product viewer (`#product-viewer`) — React DOM controls + WebGL canvas.
 *
 * State: `useMacbookStore` (Zustand) holds `color`, `scale`, `screen texture path` shared with Three materials.
 * 3D: `@react-three/fiber` `<Canvas>` hosts lights + `ModelSwitcher` (GLTF swap / cross-fade logic inside).
 * Responsiveness: `isMobile` nudges the passed `scale` prop so framing stays comfortable on narrow screens.
 */
import { Suspense } from "react";
import useMacbookStore from "../store";
import clsx from "clsx";
import { Canvas } from "@react-three/fiber";

import StudioLights from "./three/StudioLights";
import ModelSwitcher from "./three/ModelSwitcher";
import { useMediaQuery } from "react-responsive";

const ProductViewer = () => {
  const { color, scale, setColor, setScale } = useMacbookStore();

  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <section id="product-viewer">
      <h2>Take a closer look.</h2>

      <div className="controls">
        <div className="flex-center gap-5 mt-5">
          <div className="color-control">
            <div
              onClick={() => setColor("#adb5bd")}
              className={clsx(
                "bg-neutral-300",
                color === "#adb5bd" && "active",
              )}
            />
            <div
              onClick={() => setColor("#2e2c2e")}
              className={clsx(
                "bg-neutral-900",
                color === "#2e2c2e" && "active",
              )}
            />
          </div>

          <div className="size-control">
            <div
              onClick={() => setScale(0.06)}
              className={clsx(
                scale === 0.06
                  ? "bg-white text-black"
                  : "bg-transparent text-white",
              )}
            >
              <p>14&quot;</p>
            </div>
            <div
              onClick={() => setScale(0.08)}
              className={clsx(
                scale === 0.08
                  ? "bg-white text-black"
                  : "bg-transparent text-white",
              )}
            >
              <p>16&quot;</p>
            </div>
          </div>
        </div>
      </div>

      {/* R3F canvas: `id="canvas"` pairs with CSS sizing in `index.css` (#product-viewer #canvas). */}
      <Canvas
        id="canvas"
        camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 100 }}
      >
        <Suspense fallback={null}>
          <StudioLights />
          <ModelSwitcher
            scale={isMobile ? scale - 0.03 : scale}
            isMobile={isMobile}
          />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default ProductViewer;
