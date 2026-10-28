import { headers } from "next/headers";
import { cache } from "react";
import type { Metadata } from "next";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";

type PageSeo = {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  robotsIndex?: boolean;
  robotsFollow?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: "website" | "article";
  hreflang?: Partial<Record<Locale | "x-default", string>>;
  customJsonLd?: Record<string, unknown>;
};

const publicBase = (process.env.PUBLIC_APP_URL || "https://vgg.vlu.edu.vn").replace(/\/$/, "");

function sameSiteUrl(value: unknown) {
  if (typeof value !== "string" || !value.trim()) return undefined;
  try {
    const url = new URL(value, publicBase);
    return url.origin === new URL(publicBase).origin ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

export const pageSeoFor = cache(async (locale: Locale, path: string): Promise<PageSeo> => {
  const backend = process.env.BACKEND_INTERNAL_URL;
  if (!backend) return {};
  try {
    const response = await fetch(`${backend}/api/public/site-content?locale=${locale}`, {
      cache: "no-store",
    });
    if (!response.ok) return {};
    const payload = (await response.json()) as {
      data?: { contents?: Array<{ section: string; page: string; value: unknown }> };
    };
    const entry = payload.data?.contents?.find(
      (item) =>
        item.section === "seo" &&
        item.page.replace(/^\/+|\/+$/g, "") === path.replace(/^\/+|\/+$/g, ""),
    );
    if (!entry || !entry.value || typeof entry.value !== "object" || Array.isArray(entry.value))
      return {};
    const value = entry.value as Record<string, unknown>;
    const hreflangValue =
      value.hreflang && typeof value.hreflang === "object" && !Array.isArray(value.hreflang)
        ? (value.hreflang as Record<string, unknown>)
        : {};
    const hreflang = Object.fromEntries(
      ["vi", "en", "x-default"].flatMap((key) => {
        const url = sameSiteUrl(hreflangValue[key]);
        return url ? [[key, url]] : [];
      }),
    ) as PageSeo["hreflang"];
    const customJsonLd =
      value.customJsonLd &&
      typeof value.customJsonLd === "object" &&
      !Array.isArray(value.customJsonLd) &&
      JSON.stringify(value.customJsonLd).length <= 20_000
        ? (value.customJsonLd as Record<string, unknown>)
        : undefined;
    return {
      metaTitle: typeof value.metaTitle === "string" ? value.metaTitle.slice(0, 250) : undefined,
      metaDescription:
        typeof value.metaDescription === "string"
          ? value.metaDescription.slice(0, 1000)
          : undefined,
      canonicalUrl: sameSiteUrl(value.canonicalUrl),
      robotsIndex: typeof value.robotsIndex === "boolean" ? value.robotsIndex : undefined,
      robotsFollow: typeof value.robotsFollow === "boolean" ? value.robotsFollow : undefined,
      ogTitle: typeof value.ogTitle === "string" ? value.ogTitle.slice(0, 250) : undefined,
      ogDescription:
        typeof value.ogDescription === "string" ? value.ogDescription.slice(0, 1000) : undefined,
      ogImage: sameSiteUrl(value.ogImage),
      ogImageAlt: typeof value.ogImageAlt === "string" ? value.ogImageAlt.slice(0, 500) : undefined,
      ogType: value.ogType === "article" ? "article" : "website",
      hreflang,
      customJsonLd,
    };
  } catch {
    return {};
  }
});

export async function requestPageSeo() {
  const requestHeaders = await headers();
  const headerLocale = requestHeaders.get("x-vgg-locale");
  const locale = isLocale(headerLocale) ? headerLocale : defaultLocale;
  const localizedPath = requestHeaders.get("x-vgg-pathname") ?? `/${locale}`;
  const routePath = localizedPath.replace(/^\/(vi|en)/, "") || "/";
  return { locale, routePath, seo: await pageSeoFor(locale, routePath) };
}

export function metadataForPageSeo(seo: PageSeo, locale: Locale): Metadata {
  const robotsIndex = seo.robotsIndex ?? true;
  const robotsFollow = seo.robotsFollow ?? true;
  return {
    ...(seo.metaTitle ? { title: seo.metaTitle } : {}),
    ...(seo.metaDescription ? { description: seo.metaDescription } : {}),
    ...(seo.canonicalUrl || (seo.hreflang && Object.keys(seo.hreflang).length)
      ? {
          alternates: {
            ...(seo.canonicalUrl ? { canonical: seo.canonicalUrl } : {}),
            ...(seo.hreflang && Object.keys(seo.hreflang).length
              ? { languages: seo.hreflang }
              : {}),
          },
        }
      : {}),
    robots: {
      index: robotsIndex,
      follow: robotsFollow,
      googleBot: {
        index: robotsIndex,
        follow: robotsFollow,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    ...(seo.canonicalUrl ||
    seo.ogTitle ||
    seo.ogDescription ||
    seo.ogImage ||
    seo.metaTitle ||
    seo.metaDescription
      ? {
          openGraph: {
            ...(seo.ogType ? { type: seo.ogType } : {}),
            locale: locale === "vi" ? "vi_VN" : "en_US",
            siteName: "Van Lang Global Graduate",
            ...(seo.canonicalUrl ? { url: seo.canonicalUrl } : {}),
            ...(seo.ogTitle || seo.metaTitle ? { title: seo.ogTitle || seo.metaTitle } : {}),
            ...(seo.ogDescription || seo.metaDescription
              ? { description: seo.ogDescription || seo.metaDescription }
              : {}),
            ...(seo.ogImage
              ? {
                  images: [
                    { url: seo.ogImage, ...(seo.ogImageAlt ? { alt: seo.ogImageAlt } : {}) },
                  ],
                }
              : {}),
          },
          twitter: {
            card: seo.ogImage ? "summary_large_image" : "summary",
            ...(seo.ogTitle || seo.metaTitle ? { title: seo.ogTitle || seo.metaTitle } : {}),
            ...(seo.ogDescription || seo.metaDescription
              ? { description: seo.ogDescription || seo.metaDescription }
              : {}),
            ...(seo.ogImage
              ? {
                  images: [
                    { url: seo.ogImage, ...(seo.ogImageAlt ? { alt: seo.ogImageAlt } : {}) },
                  ],
                }
              : {}),
          },
        }
      : {}),
  };
}
/** Page metadata is resolved after layout metadata; apply page-specific content values here too. */
export async function withPageSeo(defaults: Metadata): Promise<Metadata> {
  const { locale, seo } = await requestPageSeo();
  if (!Object.keys(seo).length) return defaults;
  const overrides = metadataForPageSeo(seo, locale);
  return {
    ...defaults,
    ...overrides,
    ...(seo.metaTitle ? { title: { absolute: seo.metaTitle } } : {}),
    ...(overrides.openGraph
      ? { openGraph: { ...defaults.openGraph, ...overrides.openGraph } }
      : {}),
  };
}
