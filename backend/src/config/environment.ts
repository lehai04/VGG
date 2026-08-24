import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().min(1),
  BACKEND_HOST: z.string().default("0.0.0.0"),
  BACKEND_PORT: z.coerce.number().int().positive().default(4000),
  PUBLIC_APP_URL: z.url().default("http://localhost:3000"),
  ADMIN_APP_URL: z.url().default("http://localhost:3001"),
});

export const env = schema.parse(process.env);

