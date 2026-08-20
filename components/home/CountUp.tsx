"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  end: number;
  pad?: number;
  duration?: number;
};

export function CountUp({ end, pad = 2, duration = 1400 }: CountUpProps) {
  const [value, setValue] = useState(0);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setValue(end);
      return;
    }

    let animationFrame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const startedAt = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          setValue(Math.round(end * eased));

          if (progress < 1) animationFrame = requestAnimationFrame(animate);
        };

        animationFrame = requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [duration, end]);

  return (
    <strong ref={elementRef} aria-label={String(end)}>
      {String(value).padStart(pad, "0")}
    </strong>
  );
}
