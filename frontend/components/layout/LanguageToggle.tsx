"use client";

import { usePathname } from "next/navigation";
import { localizedHref, type Locale } from "@/lib/i18n";
import { useLocale } from "@/components/i18n/LocaleProvider";

/** Nút VI/EN dùng chung; locale nằm trong URL và được đồng bộ giữa các Header. */
export function LanguageToggle({ className }: { className?: string }) {
  const { locale } = useLocale();
  const pathname = usePathname();

  const switchLanguage = (next: Locale) => {
    if (next === locale) return;
    window.location.assign(localizedHref(next, pathname));
  };

  return (
    <span className={className ? `languageToggle ${className}` : "languageToggle"} aria-label="Chọn ngôn ngữ">
      <button type="button" className={locale === "vi" ? "active" : ""} aria-pressed={locale === "vi"} onClick={() => switchLanguage("vi")}>VI</button>
      <i aria-hidden="true">/</i>
      <button type="button" className={locale === "en" ? "active" : ""} aria-pressed={locale === "en"} onClick={() => switchLanguage("en")}>EN</button>
    </span>
  );
}
