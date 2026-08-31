import { config } from "dotenv";
import { defineConfig, env } from "prisma/config";

// Next.js dùng .env.local trong phát triển; Prisma CLI không tự đọc file này.
config({ path: [".env.local", ".env"] });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: env("DATABASE_URL") },
});
