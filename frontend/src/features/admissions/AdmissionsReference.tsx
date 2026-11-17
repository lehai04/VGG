"use client";
import { useEffect, useRef } from "react";
import { useLocale } from "@/i18n/components/LocaleProvider";
import { useWebsiteCopy } from "@/i18n/components/WebsiteCopy";
import { translateAdmissions } from "./translate-reference";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import content from "./reference-content.json";
import type editorialContent from "./editorial-content.json";
import { initializeAdmissions } from "./reference-engine";
import { connectKnowledgeLookup, knowledgeRegistrationSection } from "./knowledge-appendix";
import { initializeAdmissionsMotion } from "./admissions-motion";
import "./reference.css";
import "./admissions-redesign.css";
import "./knowledge-section.css";
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
  programmeOptions?: Array<{ id: string; title: string; degree: string; tuition?: string; sourceTitle?: string }>;
}) {
  const { locale } = useLocale();
  const t = useWebsiteCopy();
  const bannerHtml = html
    .replace(/(<a href="#hoc-phi-hoc-bong">[^<]*<\/a>)/, '$1<a href="#dang-ky-bo-sung-kien-thuc">Đăng ký bổ sung kiến thức</a>')
    .replace('<section id="ho-so-du-tuyen"', `${knowledgeRegistrationSection(locale)}<section id="ho-so-du-tuyen"`)
    .replace('<h3 class="fee-program-name" id="fee-program-name"></h3>', `<h3 class="fee-program-name" id="fee-program-name"></h3><a id="fee-program-detail" class="text-link" href="/${locale}/programmes/quan-tri-kinh-doanh">Xem chi tiết ngành Quản trị kinh doanh →</a>`)
    .replace('id="ts-hoc-phi" hidden=""><div class="wrap">', `id="ts-hoc-phi" hidden=""><div class="wrap"><a class="text-link" href="/${locale}/programmes/khoa-hoc-moi-truong">Xem chi tiết ngành Khoa học môi trường →</a>`)
    .replace('class="hero admission-step admission-step-01"', 'data-site-banner class="hero admission-step admission-step-01"')
    .replace('<div class="hero-copy">', '<div class="hero-copy" data-banner-copy data-banner-inset><p data-banner-label class="eyebrow">ADMISSIONS</p>')
    .replace('<h1 id="hero-title">', '<h1 data-banner-title id="hero-title">')
    .replace('</h1>\n<p>', '</h1>\n<p data-banner-description>')
    .replace(/([.。…]+)(\s*(?:<\/[^>]+>\s*)*<\/h1>)/g, '$2');
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!root.current) return;
    // Restore initial markup when React replays effects in development.
    root.current.innerHTML = bannerHtml;
    applyAdmissionsLayout(root.current, layout);
    const container = root.current;
    const knowledge = container.querySelector("#dang-ky-bo-sung-kien-thuc");
    if (knowledge) container.querySelector("#hoc-phi-hoc-bong")?.after(knowledge);
    const header = document.querySelector<HTMLElement>(".headerShell");
    const nav = container.querySelector<HTMLElement>(".section-nav-shell");
    const measureNavigation = () => {
      container.style.setProperty("--admissions-header-height", `${header?.getBoundingClientRect().bottom ?? 0}px`);
      container.style.setProperty("--admissions-nav-height", `${nav?.getBoundingClientRect().height ?? 0}px`);
    };
    measureNavigation();
    const resizeObserver = new ResizeObserver(measureNavigation);
    if (header) resizeObserver.observe(header);
    if (nav) resizeObserver.observe(nav);
    window.addEventListener("resize", measureNavigation);
    const cleanupEngine = initializeAdmissions(root.current, editorial, programmeOptions);
    const cleanupMotion = initializeAdmissionsMotion(root.current);
    const cleanupKnowledge = connectKnowledgeLookup(container);
    // The reference engine fills earlier sections during hydration, shifting deep links.
    const knowledgeAnchor = window.location.hash;
    const anchorFrame = ["#dang-ky-bo-sung-kien-thuc", "#tra-cuu-hoc-phan-bo-sung"].includes(knowledgeAnchor)
      ? window.requestAnimationFrame(() => {
          container.querySelector(knowledgeAnchor)?.scrollIntoView({ block: "start", behavior: "instant" });
        })
      : undefined;
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
            option.value === programme.id ||
            normalize(option.dataset.vggSourceLabel ?? option.textContent ?? "") === normalize(programme.title) ||
            (programme.sourceTitle &&
              normalize(option.dataset.vggSourceLabel ?? option.textContent ?? "").startsWith(normalize(programme.sourceTitle))),
        );
        if (existing) {
          if (existing.textContent !== t(programme.title)) existing.textContent = programme.title;
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
    const cleanupTranslation = locale === "en" ? translateAdmissions(container, t) : undefined;
    return () => {
      cleanupTranslation?.();
      cleanupMotion();
      cleanupKnowledge?.();
      if (anchorFrame !== undefined) window.cancelAnimationFrame(anchorFrame);
      cleanupEngine();
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("resize", measureNavigation);
    };
  }, [bannerHtml, editorial, layout, programmeOptions, locale, t]);
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
