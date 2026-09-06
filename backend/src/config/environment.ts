import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().min(1),
  BACKEND_HOST: z.string().default("0.0.0.0"),
  BACKEND_PORT: z.coerce.number().int().positive().default(4000),
  PUBLIC_APP_URL: z.url().default("http://localhost:3000"),
  ADMIN_APP_URL: z.url().default("http://localhost:3001"),
  STORAGE_ENDPOINT: z.string().min(1).default("127.0.0.1"),
  STORAGE_PORT: z.coerce.number().int().positive().default(9000),
  STORAGE_USE_SSL: z.string().default("false").transform((value) => value === "true"),
  STORAGE_BUCKET: z.string().min(3).default("vgg-media"),
  STORAGE_ACCESS_KEY: z.string().min(3),
  STORAGE_SECRET_KEY: z.string().min(8),
});

export const env = schema.parse(process.env);

