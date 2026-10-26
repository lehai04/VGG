"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const targets = [
  "[data-reveal]", "[data-section-label]", "[data-section-subtitle]",
  "[data-banner-copy] > *", "section > header", "section article",
  "section figure", "section a:has(> figure)", "article > header", "article figure", "article h2",
].join(",");

/** One shared observer for public pages, including streamed and filtered content. */
export function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const watched = new Set<HTMLElement>();
    const played = new WeakSet<Element>();
    const animations = new Set<Animation>();
    let frame = 0;
    const observer = new IntersectionObserver((entries) => {
      let order = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        played.add(entry.target);
        if (preference.matches || !(entry.target instanceof HTMLElement)) continue;
        const animation = entry.target.animate(
          [{ opacity: 0.35, translate: "0 20px" }, { opacity: 1, translate: "0 0" }],
          { duration: 600, delay: Math.min(order++, 3) * 50, easing: "cubic-bezier(.22,1,.36,1)" },
        );
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
        animation.oncancel = () => animations.delete(animation);
      }
    }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });

    const scan = () => {
      frame = 0;
      // Release detached filter results rather than retaining them for the whole visit.
      for (const element of watched) {
        if (!element.isConnected) {
          observer.unobserve(element);
          watched.delete(element);
        }
      }
      if (preference.matches) return;
      document.querySelectorAll<HTMLElement>(targets).forEach((element) => {
        if (watched.has(element) || played.has(element)) return;
        if (!element.closest("main") || element.closest(".home-page, nav, footer, form, [role='dialog'], [data-motion='off']")) return;
        if (element.parentElement?.closest("[data-site-motion]")) return;
        // Keep existing timeline animations and avoid animating containers twice.
        if (getComputedStyle(element).animationName !== "none") return;
        element.dataset.siteMotion = "reveal";
        watched.add(element);
        observer.observe(element);
      });
    };
    const scheduleScan = () => {
      if (!frame) frame = requestAnimationFrame(scan);
    };
    const updatePreference = () => {
      if (preference.matches) {
        observer.disconnect();
        animations.forEach((animation) => animation.cancel());
        watched.forEach((element) => delete element.dataset.siteMotion);
        watched.clear();
      } else scan();
    };
    scan();
    const changes = new MutationObserver(scheduleScan);
    changes.observe(document.body, { childList: true, subtree: true });
    preference.addEventListener("change", updatePreference);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      changes.disconnect();
      preference.removeEventListener("change", updatePreference);
      animations.forEach((animation) => animation.cancel());
      watched.forEach((element) => delete element.dataset.siteMotion);
    };
  }, [pathname]);

  return null;
}
