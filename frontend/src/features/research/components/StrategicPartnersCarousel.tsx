"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./ResearchLanding.module.css";

const strategicPartners = [
  { name: "The University of Newcastle Australia", logo: "/images/pages/research/partners/newcastle.png" },
  { name: "Liverpool John Moores University", logo: "/images/pages/research/partners/liverpool-john-moores.gif" },
  { name: "The University of Waikato", logo: "/images/pages/research/partners/waikato.png" },
  { name: "Angelo State University", logo: "/images/pages/research/partners/angelo-state.png" },
  { name: "Inha University", logo: "/images/pages/research/partners/inha.png" },
  { name: "Ming Chuan University", logo: "/images/pages/research/partners/ming-chuan.png" },
] as const;

export function StrategicPartnersCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ pointerId: 0, startX: 0, scrollLeft: 0 });
  const draggingRef = useRef(false);
  const pausedRef = useRef(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let previousTime = performance.now();
    // Keep fractional pixels between frames: scrollLeft can be rounded by the browser.
    let position = carousel.scrollLeft;
    const animate = (time: number) => {
      const elapsed = Math.min(time - previousTime, 40);
      previousTime = time;
      if (!draggingRef.current && !pausedRef.current) {
        const loopWidth = carousel.scrollWidth / 2;
        position = loopWidth > 0 ? (position + elapsed * 0.045) % loopWidth : 0;
        carousel.scrollLeft = position;
      } else {
        position = carousel.scrollLeft;
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const stopDragging = () => {
    draggingRef.current = false;
    setDragging(false);
  };

  return (
    <div
      ref={carouselRef}
      className={`${styles.partnerCarousel} ${dragging ? styles.partnerCarouselDragging : ""}`}
      data-reveal
      tabIndex={0}
      aria-label="Danh sách đối tác chiến lược. Kéo ngang để xem thêm."
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      onFocus={() => { pausedRef.current = true; }}
      onBlur={() => { pausedRef.current = false; }}
      onPointerDown={(event) => {
        const carousel = carouselRef.current;
        if (!carousel) return;
        dragState.current = { pointerId: event.pointerId, startX: event.clientX, scrollLeft: carousel.scrollLeft };
        carousel.setPointerCapture(event.pointerId);
        draggingRef.current = true;
        setDragging(true);
      }}
      onPointerMove={(event) => {
        const carousel = carouselRef.current;
        if (!carousel || !dragging || event.pointerId !== dragState.current.pointerId) return;
        carousel.scrollLeft = dragState.current.scrollLeft - (event.clientX - dragState.current.startX);
      }}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onLostPointerCapture={stopDragging}
    >
      <div className={styles.partnerTrack}>
        {[...strategicPartners, ...strategicPartners].map((partner, index) => (
          <figure key={`${partner.name}-${index}`} aria-hidden={index >= strategicPartners.length}>
            <Image src={partner.logo} alt={index < strategicPartners.length ? `Logo ${partner.name}` : ""} fill sizes="240px" draggable={false} />
          </figure>
        ))}
      </div>
    </div>
  );
}
