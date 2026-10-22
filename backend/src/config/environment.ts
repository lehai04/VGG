import { z } from "zod";

/** Kiểm tra biến môi trường khi module được import. Các trường không có default
 * phải được cung cấp; parse thất bại sẽ ngăn backend khởi động với cấu hình thiếu. */
const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().min(1),
  BACKEND_HOST: z.string().default("0.0.0.0"),
  // Biến môi trường là chuỗi; coerce đổi sang số trước khi kiểm tra số nguyên dương.
  BACKEND_PORT: z.coerce.number().int().positive().default(4000),
  PUBLIC_APP_URL: z.url().default("http://localhost:3000"),
  ADMIN_APP_URL: z.url().default("http://localhost:3001"),
  STORAGE_ENDPOINT: z.string().min(1).default("127.0.0.1"),
  STORAGE_PORT: z.coerce.number().int().positive().default(9000),
  // Chỉ chuỗi chính xác "true" bật TLS; "1" hoặc "TRUE" không được coi là true.
  STORAGE_USE_SSL: z.string().default("false").transform((value) => value === "true"),
  STORAGE_BUCKET: z.string().min(3).default("vgg-media"),
  STORAGE_ACCESS_KEY: z.string().min(3),
  STORAGE_SECRET_KEY: z.string().min(8),
});

// Export cấu hình đã kiểm tra thay vì đọc process.env rải rác trong từng module.
export const env = schema.parse(process.env);

