import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

function configure() {
  const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
  const api_key = process.env.CLOUDINARY_API_KEY;
  const api_secret = process.env.CLOUDINARY_API_SECRET;
  if (!cloud_name || !api_key || !api_secret) throw new Error("Cloudinary chưa được cấu hình.");
  cloudinary.config({ cloud_name, api_key, api_secret, secure: true });
}

export async function uploadNewsImage(buffer: Buffer, folder = "vgg/news") {
  configure();
  return new Promise<{ url: string; publicId: string; width: number; height: number }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image", unique_filename: true, overwrite: false, transformation: [{ width: 2400, height: 2400, crop: "limit", quality: "auto" }] },
      (error, result?: UploadApiResponse) => {
        if (error || !result) return reject(error ?? new Error("Cloudinary không trả kết quả upload."));
        resolve({ url: result.secure_url, publicId: result.public_id, width: result.width, height: result.height });
      },
    );
    stream.end(buffer);
  });
}

export async function uploadResourceFile(buffer: Buffer, fileName: string, folder = "vgg/resources") {
  configure();
  const publicId = fileName.replace(/\.[^.]+$/, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-|-$/g, "") || "resource";
  return new Promise<{ url: string; publicId: string; bytes: number; format: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, public_id: publicId, resource_type: "auto", unique_filename: true, overwrite: false, use_filename: true },
      (error, result?: UploadApiResponse) => {
        if (error || !result) return reject(error ?? new Error("Cloudinary không trả kết quả upload."));
        resolve({ url: result.secure_url, publicId: result.public_id, bytes: result.bytes, format: result.format });
      },
    );
    stream.end(buffer);
  });
}
