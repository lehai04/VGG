"use client";
import { useEffect, useRef } from "react";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import content from "./reference-content.json";
import type editorialContent from "./editorial-content.json";
import { initializeAdmissions } from "./reference-engine";
import { initializeAdmissionsMotion } from "./admissions-motion";
import "./reference.css";
import "./admissions-redesign.css";
import { applyAdmissionsLayout } from "./content-layout";
import type { ContentComposition } from "../../../../backend/src/modules/content/visual-model";
/** Reviewed static reference markup also renders on the server. */
export function AdmissionsReference({
  html = content.html,
  editorial,
  layout,
  programmeOptions,
}: {
  html?: string;
  editorial?: typeof editorialContent;
  layout?: ContentComposition;
  programmeOptions?: Array<{ id: string; title: string; degree: string; sourceTitle?: string }>;
}) {
  const bannerHtml = html
    .replace('class="hero admission-step admission-step-01"', 'data-site-banner class="hero admission-step admission-step-01"')
    .replace('<div class="hero-copy">', '<div class="hero-copy" data-banner-copy data-banner-inset><p data-banner-label class="eyebrow">ADMISSIONS</p>')
    .replace('<h1 id="hero-title">', '<h1 data-banner-title id="hero-title">')
    .replace('</h1>\n<p>', '</h1>\n<p data-banner-description>');
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!root.current) return;
    // Restore initial markup when React replays effects in development.
    root.current.innerHTML = bannerHtml;
    applyAdmissionsLayout(root.current, layout);
    const cleanupEngine = initializeAdmissions(root.current, editorial);
    const cleanupMotion = initializeAdmissionsMotion(root.current);
    const selector = root.current.querySelector<HTMLSelectElement>("#contact-program");
    const syncOptions = () => {
      if (!selector || !programmeOptions) return;
      const normalize = (value: string) =>
        value
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/đ/gi, "d")
          .toLowerCase()
          .replace(/^(thac si|tien si)\s+/, "")
          .replace(/[^a-z0-9]/g, "");
      const degree =
        root.current?.querySelector<HTMLSelectElement>("#admissions-degree")?.value === "doctor"
          ? "Tiến sĩ"
          : "Thạc sĩ";
      for (const programme of programmeOptions.filter((item) => item.degree === degree)) {
        const existing = [...selector.options].find(
          (option) =>
            normalize(option.textContent ?? "") === normalize(programme.title) ||
            (programme.sourceTitle &&
              normalize(option.textContent ?? "").startsWith(normalize(programme.sourceTitle))),
        );
        if (existing) {
          if (existing.textContent !== programme.title) existing.textContent = programme.title;
        } else {
          const option = document.createElement("option");
          option.value = programme.id;
          option.textContent = programme.title;
          selector.append(option);
        }
      }
    };
    syncOptions();
    const observer = new MutationObserver(syncOptions);
    if (selector) observer.observe(selector, { childList: true });
    return () => {
      cleanupMotion();
      cleanupEngine();
      observer.disconnect();
    };
  }, [bannerHtml, editorial, layout, programmeOptions]);
  return (
    <>
      <SiteHeader compact />
      <div
        ref={root}
        id="main-content"
        className="admissions-reference"
        dangerouslySetInnerHTML={{ __html: bannerHtml }}
      />
    </>
  );
}
