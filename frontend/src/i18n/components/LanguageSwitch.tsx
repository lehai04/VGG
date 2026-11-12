"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Globe2 } from "lucide-react";
import { localizedHref } from "@/lib/i18n";
import { useLocale } from "./LocaleProvider";

export function LanguageSwitch() {
  const { locale } = useLocale();
  const pathname = usePathname();
  const query = useSearchParams().toString();
  const target = locale === "vi" ? "en" : "vi";
  const href = localizedHref(target, pathname) + (query ? `?${query}` : "");

  return (
    <a
      className="language-switch"
      data-locale={locale}
      href={href}
      hrefLang={target}
      lang={target}
      aria-label={target === "en" ? "Switch to English" : "Chuyển sang tiếng Việt"}
      title={target === "en" ? "Chuyển sang tiếng Anh" : "Switch to Vietnamese"}
      onClick={(event) => {
        event.currentTarget.href = href + window.location.hash;
      }}
    >
      <Globe2 className="language-switch__globe" aria-hidden="true" />
      <span className="language-switch__options" aria-hidden="true">
        <span className="language-switch__indicator" />
        <span className="language-switch__label" data-active={locale === "vi"}>VI</span>
        <span className="language-switch__label" data-active={locale === "en"}>EN</span>
      </span>
    </a>
  );
}
