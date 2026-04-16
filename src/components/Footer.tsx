/**
 * Footer — legal strip + links; no API calls.
 *
 * Reveal pattern mirrors `Performance` copy: rows use `.performance-line` + CSS transitions,
 * driven by `IntersectionObserver` toggling `footer-reveal-ready` / `is-inview` on the shell.
 * Avoid Tailwind’s utility class name `content` on this wrapper (it maps to CSS `content:` and can break prod builds).
 */
import { useEffect, useRef } from "react";
import { footerLinks } from "../constants";

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  // Stagger delays are written as CSS variables so the same transition rules can stay in `index.css`.
  useEffect(() => {
    const shell = revealRef.current;
    if (!shell) return;
    const rows = Array.from(
      shell.querySelectorAll<HTMLElement>(".performance-line"),
    );
    if (!rows.length) return;
    rows.forEach((row, index) => {
      row.style.setProperty("--row-delay", `${index * 70}ms`);
    });
    shell.classList.add("footer-reveal-ready");
    // Extra sync: intersection timing can differ in production; this avoids stuck `opacity: 0` on first paint.
    const syncInView = () => {
      const rect = shell.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const visible = rect.top < vh * 0.92 && rect.bottom > vh * 0.08;
      shell.classList.toggle("is-inview", visible);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          shell.classList.add("is-inview");
        } else {
          shell.classList.remove("is-inview");
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px 0px 0px" },
    );
    observer.observe(shell);
    requestAnimationFrame(() => {
      syncInView();
    });
    return () => {
      observer.disconnect();
      shell.classList.remove("footer-reveal-ready", "is-inview");
    };
  }, []);

  return (
    <footer ref={footerRef}>
      <div ref={revealRef} className="footer-reveal performance-reveal">
        <div className="performance-line">
          <div className="info">
            <p>
              <span className="block">
                More ways to shop: Find an Apple Store or other retailer near
                you. Or call 000800 040 1966.
              </span>
            </p>
            <img src="/logo.svg" alt="Apple logo" />
          </div>
        </div>
        <hr className="performance-line" />

        <div className="performance-line">
          <div className="links">
            <p>&copy; {new Date().getFullYear()}. All rights reserved.</p>

            <ul>
              {footerLinks.map(({ label, link }) => (
                <li key={label}>
                  <a href={link}>{label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
