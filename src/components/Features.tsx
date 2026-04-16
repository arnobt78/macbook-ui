/**
 * Features section = stacked layout:
 * - Full-viewport R3F canvas (`#f-canvas`) pinned while scrolling.
 * - `ModelScroll` rotates the laptop group and swaps `texture` in Zustand so `useVideoTexture` updates the screen mesh.
 * - HTML overlay `.box1..5` sits above the canvas (`absolute inset-0`) and animates opacity/position in sync with video changes.
 * - `featureSequence` preload warms the browser cache for smoother scrubbing (no network API).
 */
import { Canvas } from "@react-three/fiber";
import StudioLights from "./three/StudioLights";
import { features, featureSequence } from "../constants";
import clsx from "clsx";
import { Suspense, useEffect, useRef } from "react";
import type { Group } from "three";
import { Box3, Vector3 } from "three";
import { Html } from "@react-three/drei";
import MacbookModel from "./models/Macbook";
import { useMediaQuery } from "react-responsive";
import useMacbookStore from "../store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ModelScroll = () => {
  const groupRef = useRef<Group>(null);
  const centerRef = useRef<Group>(null);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const { setTexture } = useMacbookStore();

  useEffect(() => {
    const root = groupRef.current;
    const center = centerRef.current;
    if (!root || !center) return;
    const box = new Box3();
    const middle = new Vector3();

    const alignPivot = () => {
      if (!center.children.length) return false;
      box.setFromObject(center);
      if (box.isEmpty()) return false;
      box.getCenter(middle);
      center.position.x = -middle.x;
      center.position.z = -middle.z;
      return true;
    };

    let frame = requestAnimationFrame(function tick() {
      if (!alignPivot()) {
        frame = requestAnimationFrame(tick);
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [isMobile]);

  useEffect(() => {
    featureSequence.forEach((feature) => {
      const v = document.createElement("video");

      Object.assign(v, {
        src: feature.videoPath,
        muted: true,
        playsInline: true,
        preload: "auto",
        crossOrigin: "anonymous",
      });

      v.load();
    });
  }, []);

  useGSAP(() => {
    const modelTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#f-canvas",
        start: "top top",
        end: "bottom  top",
        scrub: 1,
        pin: true,
      },
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#f-canvas",
        start: "top center",
        end: "bottom  top",
        scrub: 1,
      },
    });

    if (groupRef.current) {
      modelTimeline.to(
        groupRef.current.rotation,
        {
          y: Math.PI * 2,
          ease: "none",
        },
        0,
      );
    }

    timeline
      .call(() => setTexture("/videos/feature-1.mp4"))
      .to(".box1", { opacity: 1, delay: 1, duration: 0.35, ease: "none" })

      .call(() => setTexture("/videos/feature-2.mp4"))
      .to(".box2", { opacity: 1, duration: 0.35, ease: "none" })

      .call(() => setTexture("/videos/feature-3.mp4"))
      .to(".box3", { opacity: 1, duration: 0.35, ease: "none" })

      .call(() => setTexture("/videos/feature-4.mp4"))
      .to(".box4", { opacity: 1, duration: 0.35, ease: "none" })

      .call(() => setTexture("/videos/feature-5.mp4"))
      .to(".box5", { opacity: 1, duration: 0.35, ease: "none" });
  }, [setTexture, isMobile]);

  return (
    <group ref={groupRef}>
      <Suspense
        fallback={
          <Html>
            <h1 className="text-white text-3xl uppercase">Loading...</h1>
          </Html>
        }
      >
        <group ref={centerRef}>
          <MacbookModel
            scale={isMobile ? 0.044 : 0.072}
            position={[0, -0.98, 0]}
          />
        </group>
      </Suspense>
    </group>
  );
};

const Features = () => {
  return (
    <section id="features">
      <h2>See it all in a new light.</h2>

      <Canvas
        id="f-canvas"
        camera={{ position: [0, 1.66, 4.7], fov: 45, near: 0.1, far: 100 }}
      >
        <StudioLights />
        <ambientLight intensity={0.5} />
        <ModelScroll />
      </Canvas>

      <div className="absolute inset-0">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={clsx("box", `box${index + 1}`, feature.styles)}
          >
            <img src={feature.icon} alt={feature.highlight} />
            <p>
              <span className="text-white">{feature.highlight}</span>
              {feature.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
