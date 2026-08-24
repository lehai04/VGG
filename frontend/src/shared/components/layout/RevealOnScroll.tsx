"use client";

import { useEffect } from "react";

/** Animates authored content blocks once as they enter the viewport. */
export function RevealOnScroll() {
  useEffect(() => {
    const blocks = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      blocks.forEach((block) => block.classList.add("academic-reveal--visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("academic-reveal--visible");
        observer.unobserve(entry.target);
      }),
      { threshold: 0.12, rootMargin: "0px 0px -8%" },
    );
    blocks.forEach((block, index) => {
      block.style.setProperty("--academic-delay", `${Math.min(index % 4, 3) * 85}ms`);
      observer.observe(block);
    });
    return () => observer.disconnect();
  }, []);

  return null;
}
