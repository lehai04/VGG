/** Next.js tự phục vụ GET /robots.txt. Chặn crawl /api/ vì đó là endpoint form. */
import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: "https://vgg.vlu.edu.vn/sitemap.xml",
  };
}
