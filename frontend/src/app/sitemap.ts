import type { MetadataRoute } from "next";
import { menuGroups } from "@/data/site";
import { programmes } from "@/data/programmes";
import { locales } from "@/lib/i18n";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (process.env.PUBLIC_APP_URL || "https://vgg.vlu.edu.vn").replace(/\/$/, "");
  const paths = [
    { path: "", changeFrequency: "weekly" as const, priority: 1 },
    ...menuGroups.map((group) => ({
      path: `/${group.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...programmes.map((programme) => ({
      path: `/programmes/${programme.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
  const backend = process.env.BACKEND_INTERNAL_URL;
  const seoConfigs = new Map<string, Record<string, unknown>>();
  if (backend) {
    await Promise.all(
      locales.map(async (locale) => {
        try {
          const response = await fetch(`${backend}/api/public/site-content?locale=${locale}`, {
            cache: "no-store",
          });
          if (!response.ok) return;
          const result = (await response.json()) as {
            data?: { contents?: Array<{ section: string; page: string; value: unknown }> };
          };
          for (const item of result.data?.contents ?? []) {
            if (
              item.section === "seo" &&
              item.value &&
              typeof item.value === "object" &&
              !Array.isArray(item.value)
            ) {
              seoConfigs.set(
                `${locale}:${item.page.replace(/^\/+|\/+$/g, "")}`,
                item.value as Record<string, unknown>,
              );
            }
          }
        } catch {
          /* CMS SEO settings are optional for the sitemap fallback. */
        }
      }),
    );
  }
  const staticRouteUrls = new Map<string, { locale: string; path: string }>();
  for (const entry of paths)
    for (const locale of locales)
      staticRouteUrls.set(`${base}/${locale}${entry.path}`, { locale, path: entry.path });
  const staticEntries: MetadataRoute.Sitemap = paths.flatMap((entry) =>
    locales.flatMap((locale) => {
      const config = seoConfigs.get(`${locale}:${entry.path.replace(/^\/+|\/+$/g, "")}`);
      if (config?.robotsIndex === false) return [];
      const fallback = `${base}/${locale}${entry.path}`;
      let url = fallback;
      try {
        const candidate = new URL(
          typeof config?.canonicalUrl === "string" ? config.canonicalUrl : fallback,
          base,
        );
        if (candidate.origin === new URL(base).origin) url = candidate.toString();
      } catch {
        /* Use the public route URL if the configured canonical is invalid. */
      }
      const alternateValues =
        config?.hreflang && typeof config.hreflang === "object" && !Array.isArray(config.hreflang)
          ? (config.hreflang as Record<string, unknown>)
          : {};
      const languages: Record<string, string> = {};
      for (const [language, value] of Object.entries(alternateValues)) {
        if (
          ![...locales, "x-default"].includes(language as (typeof locales)[number] | "x-default") ||
          typeof value !== "string"
        )
          continue;
        try {
          const candidate = new URL(value, base);
          const target = staticRouteUrls.get(candidate.toString());
          if (candidate.origin !== new URL(base).origin || !target) continue;
          if (language !== "x-default") {
            if (target.locale !== language) continue;
            const reciprocal = seoConfigs.get(
              `${language}:${target.path.replace(/^\/+|\/+$/g, "")}`,
            )?.hreflang;
            if (!reciprocal || typeof reciprocal !== "object" || Array.isArray(reciprocal))
              continue;
            const back = (reciprocal as Record<string, unknown>)[locale];
            if (typeof back !== "string" || new URL(back, base).toString() !== url) continue;
          }
          languages[language] = candidate.toString();
        } catch {
          /* Ignore invalid language alternates. */
        }
      }
      return [
        {
          url,
          changeFrequency: entry.changeFrequency,
          priority: entry.priority,
          ...(Object.keys(languages).length ? { alternates: { languages } } : {}),
        },
      ];
    }),
  );

  if (!backend) return staticEntries;
  try {
    const newsEntries: MetadataRoute.Sitemap = [];
    for (const locale of locales) {
      let page = 1;
      let totalPages = 1;
      do {
        const response = await fetch(
          `${backend}/api/public/news?locale=${locale}&limit=100&page=${page}`,
          { cache: "no-store" },
        );
        if (!response.ok) break;
        const result = (await response.json()) as {
          data: {
            posts: Array<{
              slug: string;
              publishedAt: string | null;
              robotsIndex?: boolean;
              canonicalUrl?: string | null;
            }>;
            pagination: { totalPages: number };
          };
        };
        totalPages = result.data.pagination.totalPages;
        for (const post of result.data.posts) {
          if (post.robotsIndex === false) continue;
          const fallback = new URL(`/${locale}/news/${post.slug}`, base).toString();
          let url = fallback;
          try {
            const candidate = new URL(post.canonicalUrl || fallback, base);
            if (candidate.origin === new URL(base).origin) url = candidate.toString();
          } catch {
            /* Use the content URL when a stored canonical cannot be parsed. */
          }
          newsEntries.push({
            url,
            lastModified: post.publishedAt ? new Date(post.publishedAt) : undefined,
            changeFrequency: "monthly",
            priority: 0.6,
          });
        }
        page += 1;
      } while (page <= totalPages);
    }
    return [...staticEntries, ...newsEntries];
  } catch {
    return staticEntries;
  }
}
