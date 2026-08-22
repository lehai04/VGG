/** Next.js tự phục vụ GET /sitemap.xml từ hàm này. URL lấy từ menuGroups. */
import type { MetadataRoute } from "next";
import { discoverSections, menuGroups, sectionSubpages } from "@/data/site";
import { locales } from "@/lib/i18n";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://vgg.vlu.edu.vn";
  const paths = [
    { path: "", changeFrequency: "weekly" as const, priority: 1 },
    ...menuGroups.map((group) => ({ path: `/${group.slug}`, changeFrequency: "weekly" as const, priority: .8 })),
    ...discoverSections.map((page) => ({ path: `/discover/${page.slug}`, changeFrequency: "monthly" as const, priority: .7 })),
    ...Object.entries(sectionSubpages).flatMap(([section, pages]) => pages.map((page) => ({ path: `/${section}/${page.slug}`, changeFrequency: "monthly" as const, priority: .7 }))),
  ];
  return paths.flatMap((entry) => locales.map((locale) => ({
    url: `${base}/${locale}${entry.path}`,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
    alternates: { languages: { vi: `${base}/vi${entry.path}`, en: `${base}/en${entry.path}`, "x-default": `${base}/vi${entry.path}` } },
  })));
}
