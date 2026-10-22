import { Client } from "minio";
import { env } from "../../config/environment.js";

export const mediaStorage = new Client({
  endPoint: env.STORAGE_ENDPOINT,
  port: env.STORAGE_PORT,
  useSSL: env.STORAGE_USE_SSL,
  accessKey: env.STORAGE_ACCESS_KEY,
  secretKey: env.STORAGE_SECRET_KEY,
});

export const mediaBucket = env.STORAGE_BUCKET;
