import { getCurrentAdmin } from "@/lib/auth/session";
import { uploadNewsImage } from "@/lib/storage";
import sharp from "sharp";
import { NextRequest, NextResponse } from "next/server";
import { isTrustedMutation } from '@/lib/auth/request';

export const runtime = "nodejs";

function detectImage(buffer: Buffer) {
  if (buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "png";
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return "jpg";
  if (buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP") return "webp";
  if (buffer.subarray(4, 8).toString("ascii") === "ftyp") {
    const brands = buffer.subarray(8, Math.min(buffer.length, 40)).toString("ascii");
    if (brands.includes("avif") || brands.includes("avis")) return "avif";
  }
  return null;
}

export async function POST(request: NextRequest) {
  if (!isTrustedMutation(request)) return NextResponse.json({ success: false, message: 'Nguồn yêu cầu không hợp lệ.' }, { status: 403 });
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ success: false, message: "Bạn chưa đăng nhập." }, { status: 401 });
  if (admin.mustChangePassword || (admin.role.code !== 'SUPER_ADMIN' && !admin.permissionCodes.includes("media.upload") && !admin.permissionCodes.includes("news.create") && !admin.permissionCodes.includes("news.update"))) {
    return NextResponse.json({ success: false, message: "Bạn không có quyền tải ảnh Tin tức." }, { status: 403 });
  }

  const data = await request.formData();
  const file = data.get("file");
  if (!(file instanceof File)) return NextResponse.json({ success: false, message: "Chưa chọn ảnh." }, { status: 400 });
  if (file.size > 8 * 1024 * 1024) return NextResponse.json({ success: false, message: "Ảnh không được vượt quá 8 MB." }, { status: 413 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const extension = detectImage(buffer);
  if (!extension) return NextResponse.json({ success: false, message: "Chỉ hỗ trợ ảnh JPG, PNG, WebP hoặc AVIF hợp lệ." }, { status: 415 });

  try {
    const source = sharp(buffer, { limitInputPixels: 40_000_000, failOn: "error" }).rotate();
    const dimensions = await source.metadata();
    if (!dimensions.width || !dimensions.height) return NextResponse.json({ success: false, message: "Không đọc được kích thước ảnh." }, { status: 415 });
    const imageId = crypto.randomUUID();
    const widths = [...new Set([480, 960, 1440].filter((width) => width < dimensions.width!).concat(dimensions.width))];
    const variants = await Promise.all(widths.map(async (width) => {
      const output = await sharp(buffer, { limitInputPixels: 40_000_000, failOn: "error" }).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 82, effort: 4 }).toBuffer({ resolveWithObject: true });
      const uploaded = await uploadNewsImage(output.data, "news", "webp", `${imageId}-${output.info.width}`);
      return { ...uploaded, width: output.info.width, height: output.info.height };
    }));
    const largest = variants.reduce((best, item) => item.width > best.width ? item : best, variants[0]);
    return NextResponse.json({ success: true, data: { ...largest, srcSet: variants.map((item) => `${item.url} ${item.width}w`).join(", "), sourceWidth: dimensions.width, sourceHeight: dimensions.height }, message: "Đã tối ưu ảnh sang WebP và tạo các kích thước responsive." });
  } catch (error) {
    console.error("Internal storage upload failed", error);
    return NextResponse.json({ success: false, message: "Không thể tải ảnh lên kho nội bộ." }, { status: 502 });
  }
}
