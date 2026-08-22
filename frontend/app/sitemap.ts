/** Next.js tự phục vụ GET /sitemap.xml từ hàm này. URL lấy từ menuGroups. */
import type { MetadataRoute } from "next";
import { discoverSections, menuGroups, sectionSubpages } from "@/data/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://vgg.vlu.edu.vn";
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    ...menuGroups.map((group) => ({
      url: `${base}/${group.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...discoverSections.map((page) => ({
      url: `${base}/discover/${page.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...Object.entries(sectionSubpages).flatMap(([section, pages]) =>
      pages.map((page) => ({
        url: `${base}/${section}/${page.slug}`,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
    ),
  ];
}
