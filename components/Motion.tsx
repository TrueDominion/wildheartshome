"use client";

import { useEffect } from "react";

/**
 * Plays the "lift" and "rule" reveals once each element reaches the lower part of the screen.
 * Only runs when <html data-live> is set (scroll-driven animation support, no reduced motion).
 * Never touches scrolling itself.
 */
export function Motion() {
  useEffect(() => {
    if (!document.documentElement.hasAttribute("data-live")) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -10% 0px" },
    );
    document.querySelectorAll("[data-motion]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
