/**
 * Top navigation shell: purely presentational (links do not route in this SPA).
 * Labels come from `constants` so you can swap copy in one place.
 */
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useCallback, useRef } from "react";
import { navLinks } from "../constants";

const NavBar = () => {
  const headerRef = useRef<HTMLElement>(null);

  const scrollTopSmooth = useCallback(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const nav = headerRef.current?.querySelector("nav");
      if (!nav) return;
      gsap.killTweensOf(nav);
      gsap.fromTo(
        nav,
        { autoAlpha: 0, y: 10 },
        {
          autoAlpha: 1,
          y: 0,
          delay: 0.12,
          duration: 0.66,
          ease: "power2.out",
          overwrite: "auto",
          immediateRender: true,
          clearProps: "opacity,visibility,transform",
        },
      );
    },
    { scope: headerRef },
  );

  return (
    <header ref={headerRef}>
      <nav>
        <a
          href="#"
          className="nav-bar-logo-link block shrink-0 cursor-pointer"
          aria-label="Scroll to top"
          onClick={(e) => {
            e.preventDefault();
            scrollTopSmooth();
          }}
        >
          <img
            className="nav-bar-logo"
            src="/logo.svg"
            alt="Apple logo"
            width={18}
            height={22}
            loading="eager"
            decoding="sync"
          />
        </a>

        <ul className="nav-bar-links">
          {navLinks.map(({ label, sectionId }) => (
            <li key={label}>
              <a href={`#${sectionId}`}>{label}</a>
            </li>
          ))}
        </ul>

        <div className="nav-bar-actions flex-center gap-3">
          <button type="button" aria-label="Search">
            <img
              className="nav-bar-icon"
              src="/search.svg"
              alt=""
              width={22}
              height={22}
              loading="eager"
              decoding="sync"
            />
          </button>
          <button type="button" aria-label="Shopping bag">
            <img
              className="nav-bar-icon"
              src="/cart.svg"
              alt=""
              width={22}
              height={22}
              loading="eager"
              decoding="sync"
            />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
