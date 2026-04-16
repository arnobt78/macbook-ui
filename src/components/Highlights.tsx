/**
 * Highlights: two-column “masonry” cards with CSS-driven initial offsets/opacity.
 * GSAP tweens `.left-column` / `.right-column` into view; trigger start differs on mobile vs desktop for better timing.
 */
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const Highlights = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const secondCardRef = useRef<HTMLDivElement>(null);
  const fourthCardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to([".left-column", ".right-column"], {
      scrollTrigger: {
        trigger: "#highlights",
        start: isMobile ? "bottom bottom" : "top center",
      },
      y: 0,
      opacity: 1,
      stagger: 0.5,
      duration: 1,
      ease: "power1.inOut",
    });
  }, [isMobile]);

  useEffect(() => {
    const subtitle = subtitleRef.current;
    if (!subtitle) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          subtitle.classList.add("is-inview");
        } else {
          subtitle.classList.remove("is-inview");
        }
      },
      { threshold: 0.45, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(subtitle);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const firstCard = firstCardRef.current;
    if (!firstCard) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          firstCard.classList.add("is-inview");
        } else {
          firstCard.classList.remove("is-inview");
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(firstCard);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const secondCard = secondCardRef.current;
    if (!secondCard) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          secondCard.classList.add("is-inview");
        } else {
          secondCard.classList.remove("is-inview");
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(secondCard);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fourthCard = fourthCardRef.current;
    if (!fourthCard) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fourthCard.classList.add("is-inview");
        } else {
          fourthCard.classList.remove("is-inview");
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(fourthCard);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="highlights">
      <h2>There’s never been a better time to upgrade.</h2>
      <h3 ref={subtitleRef} className="highlights-subtitle-reveal">
        Here’s what you get with the new MacBook Pro.
      </h3>

      <div className="masonry">
        <div className="left-column">
          <div ref={firstCardRef} className="first-highlight-reveal">
            <img src="/laptop.png" alt="Laptop" />
            <p>Fly through demanding tasks up to 9.8x faster.</p>
          </div>
          <div ref={secondCardRef} className="second-highlight-reveal">
            <img src="/sun.png" alt="Sun" />
            <p>
              A stunning <br />
              Liquid Retina XDR <br />
              display.
            </p>
          </div>
        </div>
        <div className="right-column">
          <div className="apple-gradient">
            <img src="/ai.png" alt="AI" />
            <p>
              Built for <br />
              <span>Apple Intelligence.</span>
            </p>
          </div>
          <div ref={fourthCardRef} className="fourth-highlight-reveal">
            <img src="/battery.png" alt="Battery" />
            <p>
              Up to
              <span className="green-gradient"> 14 more hours </span>
              battery life.
              <span className="text-dark-100"> (Up to 24 hours total.)</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
