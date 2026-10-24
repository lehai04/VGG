/** Next.js tự phục vụ GET /robots.txt. Chặn crawl /api/ vì đó là endpoint form. */
import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const base = (process.env.PUBLIC_APP_URL || "https://vgg.vlu.edu.vn").replace(/\/$/, "");
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${base}/sitemap.xml`,
  };
}
