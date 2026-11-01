import type { MetadataRoute } from "next";
import { publicSiteOrigin, siteIsIndexable } from "@/lib/public-site";

// Evaluate deployment settings at request time rather than freezing them at build.
export const dynamic = "force-dynamic";
export default function robots(): MetadataRoute.Robots {
  if (!siteIsIndexable()) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/admin"] },
    sitemap: `${publicSiteOrigin()}/sitemap.xml`,
  };
}
