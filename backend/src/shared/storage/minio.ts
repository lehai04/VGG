import { DeleteObjectCommand, GetObjectCommand, HeadObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Readable } from "node:stream";
import { env } from "../../config/environment.js";

/** S3-compatible adapter for the existing MinIO bucket. No data migration. */
export function createMediaStorage(options: { endpoint: string; accessKeyId: string; secretAccessKey: string; region?: string }) {
  const client = new S3Client({
    endpoint: options.endpoint,
    region: options.region ?? "us-east-1",
    forcePathStyle: true,
    credentials: { accessKeyId: options.accessKeyId, secretAccessKey: options.secretAccessKey },
    maxAttempts: 2,
  });
  return {
    async statObject(bucket: string, key: string) {
      const result = await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
      return { size: result.ContentLength ?? 0, metaData: { "content-type": result.ContentType ?? "application/octet-stream", "cache-control": result.CacheControl ?? "public, max-age=300" } };
    },
    async getObject(bucket: string, key: string) {
      const result = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
      if (!(result.Body instanceof Readable)) throw new Error("Storage did not return a readable stream");
      return result.Body;
    },
    async putObject(bucket: string, key: string, bytes: Buffer, type: string) {
      await client.send(new PutObjectCommand({Bucket: bucket, Key: key, Body: bytes, ContentType: type, CacheControl: "public, max-age=31536000, immutable"}));
    },
    async removeObject(bucket: string, key: string) {
      await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
    },
    close() { client.destroy(); },
  };
}
export const mediaStorage = env.STORAGE_ACCESS_KEY && env.STORAGE_SECRET_KEY
  ? createMediaStorage({
      endpoint: `${env.STORAGE_USE_SSL ? "https" : "http"}://${env.STORAGE_ENDPOINT}:${env.STORAGE_PORT}`,
      region: env.STORAGE_REGION,
      accessKeyId: env.STORAGE_ACCESS_KEY,
      secretAccessKey: env.STORAGE_SECRET_KEY,
    })
  : null;
export const mediaBucket = env.STORAGE_BUCKET;
