/**
 * Cấu hình Next.js: ẩn header X-Powered-By, khóa Turbopack vào thư mục project
 * (tránh nhầm root khi folder có khoảng trắng / nằm sâu), và gắn security headers.
 */
import type { NextConfig } from "next";
import { join } from "node:path";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  transpilePackages: ["@vgg/backend"],
  turbopack: {
    // Dùng root monorepo để Turbopack resolve workspace package và node_modules hoisted.
    root: join(process.cwd(), ".."),
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
