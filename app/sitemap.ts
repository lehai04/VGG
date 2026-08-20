import type { MetadataRoute } from "next";
import { menuGroups } from "@/data/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://vgg.vlu.edu.vn";
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    ...menuGroups.map((group) => ({
      url: `${base}/${group.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
