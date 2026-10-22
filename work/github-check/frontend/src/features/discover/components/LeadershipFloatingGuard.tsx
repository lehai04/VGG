"use client";

import { useEffect } from "react";

/** Keeps the global floating actions from covering the leadership portrait. */
export function LeadershipFloatingGuard() {
  useEffect(() => {
    const portrait = document.querySelector("[data-leadership-portrait]");
    if (!portrait) return;

    const bodyClass = "leadership-portrait-in-view";
    const observer = new IntersectionObserver(
      ([entry]) => document.body.classList.toggle(bodyClass, entry.isIntersecting),
      { threshold: 0.08 },
    );

    observer.observe(portrait);
    return () => {
      observer.disconnect();
      document.body.classList.remove(bodyClass);
    };
  }, []);

  return null;
}
