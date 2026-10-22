import "server-only";
import { headers } from "next/headers";
import { defaultLocale, isLocale, localizedHref } from "@/lib/i18n";

/** Preserve the locale prefix when a rewritten public route redirects. */
export async function localizedRedirectPath(href: string) {
  const requestHeaders = await headers();
  const headerLocale = requestHeaders.get("x-vgg-locale");
  return localizedHref(isLocale(headerLocale) ? headerLocale : defaultLocale, href);
}
