export const locales = ["vi", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "vi";

export function isLocale(value: string | null | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function stripLocale(pathname: string) {
  const parts = pathname.split("/");
  return isLocale(parts[1]) ? `/${parts.slice(2).join("/")}`.replace(/\/$/, "") || "/" : pathname;
}

export function localizedHref(locale: Locale, href: string) {
  if (!href.startsWith("/") || href.startsWith("//") || href.startsWith("/api/")) return href;
  const [path, hash = ""] = href.split("#");
  const cleanPath = stripLocale(path || "/");
  return `/${locale}${cleanPath === "/" ? "" : cleanPath}${hash ? `#${hash}` : ""}`;
}
