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
  STORAGE_ENDPOINT: z.string().min(1).default("127.0.0.1"),
  STORAGE_PORT: z.coerce.number().int().positive().default(9000),
  // Chỉ chuỗi chính xác "true" bật TLS; "1" hoặc "TRUE" không được coi là true.
  STORAGE_USE_SSL: z.string().default("false").transform((value) => value === "true"),
  STORAGE_BUCKET: z.string().min(3).default("vgg-media"),
  STORAGE_ACCESS_KEY: z.preprocess(value => value === "" ? undefined : value, z.string().min(3).optional()),
  STORAGE_SECRET_KEY: z.preprocess(value => value === "" ? undefined : value, z.string().min(8).optional()),
}).refine(value => Boolean(value.STORAGE_ACCESS_KEY) === Boolean(value.STORAGE_SECRET_KEY), {
  message: "Cấu hình đồng thời STORAGE_ACCESS_KEY và STORAGE_SECRET_KEY, hoặc bỏ cả hai khi không dùng object storage.",
  path: ["STORAGE_SECRET_KEY"],
});

// Export cấu hình đã kiểm tra thay vì đọc process.env rải rác trong từng module.
export const env = schema.parse(process.env);

