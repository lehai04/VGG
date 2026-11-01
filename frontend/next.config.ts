/**
 * Cấu hình Next.js: ẩn header X-Powered-By, khóa Turbopack vào thư mục project
 * (tránh nhầm root khi folder có khoảng trắng / nằm sâu), và gắn security headers.
 */
import type { NextConfig } from "next";
import { join } from "node:path";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    // Dùng root monorepo để Turbopack resolve workspace package và node_modules hoisted.
    root: join(process.cwd(), ".."),
  },
  images: {
    qualities: [75, 95],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vluwebmedia.s3.ap-southeast-1.amazonaws.com",
        port: "",
        pathname: "/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Content-Security-Policy", value: "base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
      ...["/api/resources/file", "/api/media/:path*"].map(source => ({source,headers:[
        {key:"X-Frame-Options",value:"SAMEORIGIN"},
        {key:"Content-Security-Policy",value:"default-src 'none'; frame-ancestors 'self'; base-uri 'none'"},
      ]})),
    ];
  },
};

export default nextConfig;
