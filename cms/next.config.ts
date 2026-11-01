import type { NextConfig } from "next";
import { join } from "node:path";
const config: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_CMS_BASE_PATH || "",
  poweredByHeader: false,
  turbopack: { root: join(process.cwd(), "..") },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "same-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Content-Security-Policy",
            value:
              "base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/api/media/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'none'; frame-ancestors 'self'; base-uri 'none'",
          },
        ],
      },
    ];
  },
};
export default config;
