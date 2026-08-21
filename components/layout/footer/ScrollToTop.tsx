"use client";
import { FooterIcon } from "./FooterIcon";

/** Nút cuộn lên đầu trang — client component vì cần window.scrollTo. */
export function ScrollToTop() {
  return (
    <button
      className="scroll-to-top"
      type="button"
      aria-label="Cuộn lên đầu trang"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <FooterIcon name="arrow-up" />
    </button>
  );
}
