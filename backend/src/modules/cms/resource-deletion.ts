import { prisma } from "../../shared/database/prisma.js";
import { mediaStorage, mediaBucket } from "../../shared/storage/minio.js";
import { staticMediaReferences } from "./static-media-references.js";

// A durable cleanup record survives a storage outage; no deleted content is kept here.
type Cleanup = { urls: string[]; retained: string[] };
function keyFor(url: string) {
  if (!url.startsWith("/api/media/")) return null;
  try {
    const key = decodeURIComponent(url.slice(11));
    return key &&
      !key.split("/").some((part) => !part || part === "." || part === "..") &&
      !/[\\\x00-\x1f?#]/.test(key)
      ? key
      : null;
  } catch {
    return null;
  }
}
export async function isMediaReferenced(url: string) {
  const key = keyFor(url);
  if (!key) return true;
  if (staticMediaReferences.some((value) => keyFor(value) === key)) return true;
  // Include drafts and history: restoring another item must not point at a missing file.
  const variants = [
    url,
    `/api/media/${key}`,
    `/api/media/${key.split("/").map(encodeURIComponent).join("/")}`,
    key,
  ];
  const [resources, news, site, versions] = await Promise.all([
    prisma.resourceFile.findMany({ select: { fileUrl: true } }),
    prisma.newsPost.findMany({
      select: {
        content: true,
        coverImage: true,
        ogImage: true,
        customJsonLd: true,
      },
    }),
    prisma.siteContent.findMany({ select: { value: true } }),
    prisma.cmsRevision.findMany({
      where: { entityType: { not: "resource_deletion" } },
      select: { snapshot: true },
    }),
  ]);
  return (
    resources.some((row) => keyFor(row.fileUrl) === key) ||
    [...news, ...site, ...versions].some((row) =>
      variants.some((value) => JSON.stringify(row).includes(value)),
    )
  );
}
export async function cleanDeletedResource(jobId: string) {
  const job = await prisma.cmsRevision.findUnique({ where: { id: jobId } });
  if (!job || job.entityType !== "resource_deletion")
    return { pending: false, retained: 0 };
  const value = job.snapshot as unknown as Cleanup;
  const remaining = [...value.urls],
    retained = [...value.retained];
  for (const url of value.urls) {
    if (await isMediaReferenced(url)) {
      retained.push(url);
    } else {
      if (!mediaStorage) throw new Error("Kho file chưa được cấu hình để xóa.");
      await mediaStorage.removeObject(mediaBucket, keyFor(url)!);
    }
    remaining.splice(remaining.indexOf(url), 1);
    await prisma.cmsRevision.update({
      where: { id: job.id },
      data: {
        snapshot: { urls: remaining, retained },
        action: remaining.length ? "pending" : "completed",
      },
    });
  }
  return { pending: false, retained: retained.length };
}
export async function retryResourceCleanup() {
  const jobs = await prisma.cmsRevision.findMany({
    where: { entityType: "resource_deletion", action: "pending" },
    orderBy: { createdAt: "asc" },
    take: 10,
  });
  for (const job of jobs) {
    try {
      await cleanDeletedResource(job.id);
    } catch {
      /* Keep the durable job for the next retry. */
    }
  }
}
