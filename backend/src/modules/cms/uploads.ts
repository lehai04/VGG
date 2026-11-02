import type { FastifyInstance } from "fastify";
import multipart from "@fastify/multipart";
import sharp from "sharp";
import mammoth from "mammoth";
import { randomUUID } from "node:crypto";
import { mediaStorage, mediaBucket } from "../../shared/storage/minio.js";
import { cleanNewsHtml } from "./schemas.js";
import { fail, ok } from "../../shared/http/response.js";
// Existing CMS limit: PDF 100 MB. Images/Word are limited more tightly.
const MAX = 100 * 1024 * 1024;
export async function uploadRoutes(app: FastifyInstance) {
  await app.register(multipart, {
    limits: { files: 1, fields: 1, parts: 2, fileSize: MAX },
  });
  for (const kind of [
    "upload-image",
    "upload-resource",
    "import-word",
  ] as const) {
    app.post(
      `/api/admin/${kind}`,
      {
        bodyLimit: MAX + 1024 * 1024,
        config: { rateLimit: { max: 10, timeWindow: "1 minute" } },
      },
      async (request, reply) => {
        if (kind !== "import-word" && !mediaStorage)
          return fail(
            reply,
            503,
            "Chưa cấu hình kho file cho CMS.",
            "STORAGE_UNAVAILABLE",
          );
        const part = await request.file({
          limits: {
            fileSize: kind === "upload-resource" ? MAX : 10 * 1024 * 1024,
          },
        });
        if (!part) return fail(reply, 400, "Chưa chọn file.", "NO_FILE");
        const buffer = await part.toBuffer();
        if (kind === "import-word") {
          if (
            !part.filename.toLowerCase().endsWith(".docx") ||
            buffer.length < 4 ||
            buffer.readUInt32LE(0) !== 0x04034b50
          )
            return fail(reply, 400, "Chỉ hỗ trợ file Word .docx.", "FILE_TYPE");
          // Inspect central-directory sizes before decompression to reject zip bombs.
          let expanded = 0,
            entries = 0;
          for (let i = 0; i + 46 < buffer.length; i++) {
            if (buffer.readUInt32LE(i) === 0x02014b50) {
              expanded += buffer.readUInt32LE(i + 24);
              entries++;
            }
          }
          if (!entries || entries > 2000 || expanded > 50 * 1024 * 1024)
            return fail(
              reply,
              400,
              "File Word quá lớn hoặc không hợp lệ.",
              "FILE_SIZE",
            );
          const imageWarnings: string[] = [];
          let importedImageCount = 0;
          const result = await mammoth.convertToHtml(
            { buffer },
            {
              externalFileAccess: false,
              convertImage: mammoth.images.imgElement(async (image) => {
                importedImageCount += 1;
                if (importedImageCount > 50) {
                  if (importedImageCount === 51)
                    imageWarnings.push("Chỉ nhập tối đa 50 ảnh từ mỗi file Word.");
                  return { src: "" };
                }
                if (!mediaStorage) {
                  imageWarnings.push(
                    "Kho file chưa được cấu hình; không thể nhập ảnh từ Word.",
                  );
                  return { src: "" };
                }

                try {
                  const source = await image.read();
                  const metadata = await sharp(source, {
                    limitInputPixels: 40_000_000,
                    animated: false,
                  }).metadata();
                  if (
                    !metadata.format ||
                    !["jpeg", "png", "webp", "gif", "tiff", "bmp"].includes(
                      metadata.format,
                    )
                  )
                    throw new Error("Unsupported Word image format");

                  const originalTypes: Record<string, { extension: string; contentType: string }> = {
                    jpeg: { extension: "jpg", contentType: "image/jpeg" },
                    png: { extension: "png", contentType: "image/png" },
                    webp: { extension: "webp", contentType: "image/webp" },
                    gif: { extension: "gif", contentType: "image/gif" },
                  };
                  const original = originalTypes[metadata.format];
                  const stored = original
                    ? { buffer: source, ...original }
                    : {
                        buffer: await sharp(source, {
                          limitInputPixels: 40_000_000,
                          animated: false,
                        })
                          .rotate()
                          .resize({ width: 1600, withoutEnlargement: true })
                          .webp({ quality: 82 })
                          .toBuffer(),
                        extension: "webp",
                        contentType: "image/webp",
                      };
                  const key = `cms/news/${randomUUID()}.${stored.extension}`;
                  await mediaStorage.putObject(
                    mediaBucket,
                    key,
                    stored.buffer,
                    stored.contentType,
                  );
                  return { src: `/api/media/${key}` };
                } catch {
                  imageWarnings.push(
                    `Không thể nhập ảnh Word thứ ${importedImageCount}; hãy tải ảnh riêng để chèn vào bài.`,
                  );
                  return { src: "" };
                }
              }),
            },
          );
          const html = cleanNewsHtml(result.value);
          return ok(reply, {
            html,
            excerpt: html
              .replace(/<[^>]+>/g, " ")
              .replace(/\s+/g, " ")
              .trim()
              .slice(0, 300),
            warnings: [
              ...result.messages.map((message) => message.message),
              ...imageWarnings,
            ],
          });
        }
        if (kind === "upload-image") {
          let converted;
          try {
            const metadata = await sharp(buffer).metadata();
            if (!["jpeg", "png", "webp"].includes(metadata.format))
              throw new Error("format");
            converted = await sharp(buffer, {
              limitInputPixels: 40_000_000,
              animated: false,
            })
              .rotate()
              .resize({ width: 1600, withoutEnlargement: true })
              .webp({ quality: 82 })
              .toBuffer({ resolveWithObject: true });
          } catch {
            return fail(
              reply,
              400,
              "Ảnh không hợp lệ. Chọn JPEG, PNG hoặc WebP.",
              "FILE_TYPE",
            );
          }
          const key = `cms/news/${randomUUID()}.webp`;
          await mediaStorage!.putObject(
            mediaBucket,
            key,
            converted.data,
            "image/webp",
          );
          const url = `/api/media/${key}`;
          return ok(reply, {
            url,
            srcSet: `${url} ${converted.info.width}w`,
            width: converted.info.width,
            height: converted.info.height,
          });
        }
        const pdf = buffer.subarray(0, 5).toString() === "%PDF-";
        const image =
          (buffer[0] === 0xff && buffer[1] === 0xd8) ||
          buffer
            .subarray(0, 8)
            .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
        const office = buffer
          .subarray(0, 8)
          .equals(Buffer.from([208, 207, 17, 224, 161, 177, 26, 225]));
        const zip = buffer.length >= 4 && buffer.readUInt32LE(0) === 0x04034b50;
        const ext = part.filename.toLowerCase().split(".").pop() || "";
        const types: Record<string, string> = {
          pdf: "application/pdf",
          doc: "application/msword",
          docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          xls: "application/vnd.ms-excel",
          xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          jpg: "image/jpeg",
          jpeg: "image/jpeg",
          png: "image/png",
        };
        const valid =
          ext === "pdf"
            ? pdf
            : ["doc", "xls"].includes(ext)
              ? office
              : ["docx", "xlsx"].includes(ext)
                ? zip
                : ["jpg", "jpeg", "png"].includes(ext)
                  ? image
                  : false;
        if (!valid || !types[ext] || (!pdf && buffer.length > 50 * 1024 * 1024))
          return fail(
            reply,
            400,
            "Định dạng hoặc dung lượng file không hợp lệ.",
            "FILE_TYPE",
          );
        const key = `cms/resources/${randomUUID()}.${ext}`;
        await mediaStorage!.putObject(mediaBucket, key, buffer, types[ext]);
        return ok(reply, {
          url: `/api/media/${key}`,
          fileName: part.filename.replace(/[\\/\x00-\x1f]/g, "_").slice(0, 255),
          fileType: types[ext],
          fileSize: buffer.length,
        });
      },
    );
  }
}
