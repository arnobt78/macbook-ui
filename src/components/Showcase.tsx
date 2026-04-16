/**
 * Showcase: full-bleed background video + masked logo + copy column.
 * Desktop-only ScrollTrigger timeline pins the section and scrubs mask + content opacity.
 * On tablet/mobile (`isTablet`) we skip the pinned timeline to avoid cramped layouts.
 */
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const Showcase = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isTablet) {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#showcase",
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
        },
      });

      timeline
        .to(".mask img", {
          transform: "scale(1.1)",
        });
    }

  }, [isTablet]);

  useEffect(() => {
    const contentEl = contentRef.current;
    if (!contentEl) return;
    const rows = Array.from(
      contentEl.querySelectorAll<HTMLElement>(".showcase-row"),
    );
    if (!rows.length) return;
    rows.forEach((row, index) => {
      row.style.setProperty("--row-delay", `${index * 60}ms`);
    });
    contentEl.classList.add("showcase-reveal-ready");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          contentEl.classList.add("is-inview");
        } else {
          contentEl.classList.remove("is-inview");
        }
      },
      { threshold: 0.28, rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(contentEl);
    return () => {
      observer.disconnect();
      contentEl.classList.remove("showcase-reveal-ready", "is-inview");
    };
  }, []);

  return (
    <section id="showcase">
      <div className="media">
        <video src="/videos/game.mp4" loop muted autoPlay playsInline />
        <div className="mask">
          <img src="/mask-logo.svg" alt="Apple logo mask" />
        </div>
      </div>

      <div ref={contentRef} className="content showcase-reveal">
        <div className="wrapper">
          <div className="lg:max-w-md">
            <h2 className="showcase-row">Rocket Chip</h2>

            <div className="space-y-5 mt-7 pe-10">
              <p className="showcase-row">
                Introducing{" "}
                <span className="text-white">
                  M4, the next generation of Apple silicon
                </span>
                . M4 powers
              </p>
              <p className="showcase-row">
                It drives Apple Intelligence on iPad Pro, so you can write,
                create, and accomplish more with ease. All in a design
                that’s unbelievably thin, light, and powerful.
              </p>
              <p className="showcase-row">
                A brand-new display engine delivers breathtaking precision,
                color accuracy, and brightness. And a next-gen GPU with
                hardware-accelerated ray tracing brings console-level graphics
                to your fingertips.
              </p>
              <p className="showcase-row text-primary">
                Learn more about Apple Intelligence
              </p>
            </div>
          </div>

          <div className="max-w-3xs space-y-14">
            <div className="showcase-row space-y-2">
              <p>Up to</p>
              <h3>4x faster</h3>
              <p>pro rendering performance than M2</p>
            </div>
            <div className="showcase-row space-y-2">
              <p>Up to</p>
              <h3>1.5x faster</h3>
              <p>CPU performance than M2</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
