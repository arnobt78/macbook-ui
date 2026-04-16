/**
 * Root layout: single-page marketing flow (no React Router).
 *
 * Sections map to hash links in `constants.navLinks` (e.g. `#hero`, `#showcase`).
 * There is no backend API in this demo — all copy and assets are static imports / public URLs.
 *
 * GSAP: `ScrollTrigger` is registered once here so any descendant `useGSAP` can attach
 * scroll-linked timelines without re-registering the plugin.
 */
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import ProductViewer from "./components/ProductViewer";
import gsap from "gsap";
import { useLayoutEffect } from "react";
import { ScrollTrigger } from "gsap/all";
import Showcase from "./components/Showcase";
import Performance from "./components/Performance";
import Features from "./components/Features";
import Highlights from "./components/Highlights";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  // Runs after DOM updates: keeps refresh/navigation from restoring an old scroll position
  // (pairs with the inline script in index.html for first-paint behavior).
  useLayoutEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);
  return (
    <main>
      <NavBar />
      <Hero />
      <ProductViewer />
      <Showcase />
      <Performance />
      <Features />
      <Highlights />
      <Footer />
    </main>
  );
};

export default App;
