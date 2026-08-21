"use client";

import { useEffect } from "react";

const REVEAL_GROUPS = [
  ".overviewIntro > *",
  ".immersiveVideoStage",
  ".graduateStatsGrid > article",
  ".researchImage, .researchContent > *",
  ".programmeCatalogShowcase > *",
  ".programmeFieldGrid > article",
  ".programmeCatalogCta",
  ".admissionsIntro > *",
  ".admissionsSteps > *",
  ".studentSuccessIntro > *",
  ".studentServices > *",
  ".newsHeading > *",
  ".newsGrid > *",
  ".resourcesIntro > *, .resourcesList > *",
  ".consultationIntro > *, .consultationFields > *",
] as const;

/** BEHAVIOR DÙNG CHUNG TRONG HOMEPAGE: kích hoạt animation khi section đi vào viewport. */
export function ScrollReveal() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = REVEAL_GROUPS.flatMap((selector) =>
      Array.from(document.querySelectorAll<HTMLElement>(selector)),
    );

    if (reducedMotion) {
      elements.forEach((element) => element.classList.add("isRevealVisible"));
      return;
    }

    REVEAL_GROUPS.forEach((selector) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        element.classList.add("scrollReveal");
        element.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 85}ms`);

        if (element.classList.contains("researchImage")) element.classList.add("revealFromLeft");
        if (element.classList.contains("researchContent")) element.classList.add("revealFromRight");
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("isRevealVisible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10%", threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}
