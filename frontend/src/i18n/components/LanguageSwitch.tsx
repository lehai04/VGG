"use client";

import { usePathname, useSearchParams } from "next/navigation";
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
      href={href}
      hrefLang={target}
      lang={target}
      aria-label={target === "en" ? "Switch to English" : "Chuyển sang tiếng Việt"}
      onClick={(event) => {
        event.currentTarget.href = href + window.location.hash;
      }}
    >
      <span aria-hidden="true">{locale.toUpperCase()} / </span>{target.toUpperCase()}
    </a>
  );
}
