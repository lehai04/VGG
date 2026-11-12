import "server-only";
import { headers } from "next/headers";
import { cache } from "react";
import { defaultLocale, isLocale, stripLocale } from "@/lib/i18n";
import { websiteCopy } from "./website-copy";
import { loadProgrammeCopy } from "./programme-copy";

export const requestLanguage = cache(async () => {
  const request = await headers();
  const value = request.get("x-vgg-locale");
  const locale = isLocale(value) ? value : defaultLocale;
  const pathname = request.get("x-vgg-pathname") ?? `/${locale}`;
  return { locale, pathname };
});

export const requestCopy = cache(async () => {
  const { locale, pathname } = await requestLanguage();
  return websiteCopy(locale, pathname);
});

export const requestProgrammeCopy = cache(async () => {
  const { locale, pathname } = await requestLanguage();
  const match = /^\/programmes\/([a-z0-9-]+)$/.exec(stripLocale(pathname));
  if (locale !== "en" || !match) return undefined;
  return loadProgrammeCopy(match[1]);
});
