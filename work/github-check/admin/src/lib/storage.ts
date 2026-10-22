import { randomUUID } from "node:crypto";
import { Client } from "minio";

const bucket = process.env.STORAGE_BUCKET ?? "vgg-media";
let bucketReady: Promise<void> | undefined;

function client() {
  const endPoint = process.env.STORAGE_ENDPOINT;
  const accessKey = process.env.STORAGE_ACCESS_KEY;
  const secretKey = process.env.STORAGE_SECRET_KEY;
  if (!endPoint || !accessKey || !secretKey) throw new Error("Kho lưu trữ nội bộ chưa được cấu hình.");
  return new Client({ endPoint, port: Number(process.env.STORAGE_PORT ?? 9000), useSSL: process.env.STORAGE_USE_SSL === "true", accessKey, secretKey });
}

async function ensureBucket(storage: Client) {
  bucketReady ??= (async () => {
    if (await storage.bucketExists(bucket)) return;
    try {
      await storage.makeBucket(bucket);
    } catch (error) {
      const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";
      if (code !== "BucketAlreadyOwnedByYou" && code !== "BucketAlreadyExists") throw error;
    }
  })().catch((error) => {
    bucketReady = undefined;
    throw error;
  });
  return bucketReady;
}

function objectUrl(key: string) {
  return `/api/media/${key.split("/").map(encodeURIComponent).join("/")}`;
}

function safeBaseName(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 120) || "file";
}

export async function uploadNewsImage(buffer: Buffer, folder = "news", extension = "jpg") {
  const storage = client();
  await ensureBucket(storage);
  const key = `${folder}/${new Date().toISOString().slice(0, 10)}/${randomUUID()}.${extension}`;
  await storage.putObject(bucket, key, buffer, buffer.length, { "Content-Type": `image/${extension === "jpg" ? "jpeg" : extension}`, "Cache-Control": "public, max-age=31536000, immutable" });
  return { url: objectUrl(key), objectKey: key };
}

export async function uploadResourceFile(buffer: Buffer, fileName: string, contentType: string) {
  const storage = client();
  await ensureBucket(storage);
  const key = `resources/${new Date().toISOString().slice(0, 10)}/${randomUUID()}-${safeBaseName(fileName)}`;
  await storage.putObject(bucket, key, buffer, buffer.length, { "Content-Type": contentType });
  return { url: objectUrl(key), objectKey: key, bytes: buffer.length };
}
