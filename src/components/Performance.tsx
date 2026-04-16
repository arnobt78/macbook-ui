/**
 * Performance section:
 * - `useGSAP` scopes selectors to `sectionRef` so ScrollTrigger instances don’t leak across pages.
 * - Paragraph uses scrubbed `fromTo` for a subtle scroll-linked fade/slide.
 * - Desktop: timeline repositions each `.p*` image using percentage offsets from `constants` (p5 skipped by design).
 */
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { performanceImages, performanceImgPositions } from "../constants";
import { useMediaQuery } from "react-responsive";

const Performance = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const sectionEl = sectionRef.current;
      if (!sectionEl) return;

      if (isMobile) return;

      const tl = gsap.timeline({
        defaults: { duration: 2, ease: "power1.inOut", overwrite: "auto" },
        scrollTrigger: {
          trigger: sectionEl,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      performanceImgPositions.forEach((item) => {
        if (item.id === "p5") return;

        const selector = `.${item.id}`;
        const vars: gsap.TweenVars = {};

        if (typeof item.left === "number") vars.left = `${item.left}%`;
        if (typeof item.right === "number") vars.right = `${item.right}%`;
        if (typeof item.bottom === "number") vars.bottom = `${item.bottom}%`;

        if (item.transform) vars.transform = item.transform;

        tl.to(selector, vars, 0);
      });
    },
    { scope: sectionRef, dependencies: [isMobile] },
  );

  useEffect(() => {
    const contentEl = contentRef.current;
    if (!contentEl) return;
    const rows = Array.from(
      contentEl.querySelectorAll<HTMLElement>(".performance-line"),
    );
    if (!rows.length) return;
    rows.forEach((row, index) => {
      row.style.setProperty("--row-delay", `${index * 70}ms`);
    });
    contentEl.classList.add("performance-reveal-ready");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          contentEl.classList.add("is-inview");
        } else {
          contentEl.classList.remove("is-inview");
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(contentEl);
    return () => {
      observer.disconnect();
      contentEl.classList.remove("performance-reveal-ready", "is-inview");
    };
  }, []);

  return (
    <section id="performance" ref={sectionRef}>
      <h2>Next-level graphics performance. Game on.</h2>

      <div className="wrapper">
        {performanceImages.map((item, index) => (
          <img
            key={item.id}
            src={item.src}
            className={item.id}
            alt={item.alt ?? `Performance Image #${index + 1}`}
          />
        ))}
      </div>

      <div ref={contentRef} className="content performance-reveal">
        <p>
          <span className="performance-line">
            Run graphics-intensive workflows with a responsiveness
          </span>
          <span className="performance-line">
            that keeps up with your imagination. The M4 family of chips
          </span>
          <span className="performance-line">
            features a GPU with a second-generation hardware-
          </span>
          <span className="performance-line">
            accelerated ray tracing engine that renders images faster, so
          </span>
          <span className="performance-line text-white">
            gaming feels more immersive and realistic than ever.
          </span>
          <span className="performance-line">
            And Dynamic Caching optimizes fast on-chip memory to
          </span>
          <span className="performance-line">
            dramatically increase average GPU utilization — driving a
          </span>
          <span className="performance-line">
            huge performance boost for the most demanding pro apps
          </span>
          <span className="performance-line">and games.</span>
        </p>
      </div>
    </section>
  );
};

export default Performance;
