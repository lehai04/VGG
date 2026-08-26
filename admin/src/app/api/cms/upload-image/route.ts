import { getCurrentAdmin } from "@/lib/auth/session";
import { uploadNewsImage } from "@/lib/cloudinary";
import { NextResponse } from "next/server";

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

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) return NextResponse.json({ success: false, message: "Bạn chưa đăng nhập." }, { status: 401 });
  if (!admin.permissionCodes.includes("news.create") && !admin.permissionCodes.includes("news.update")) {
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
    const uploaded = await uploadNewsImage(buffer);
    return NextResponse.json({ success: true, data: uploaded, message: "Đã tải ảnh lên Cloudinary." });
  } catch (error) {
    console.error("Cloudinary upload failed", error);
    return NextResponse.json({ success: false, message: "Không thể tải ảnh lên Cloudinary." }, { status: 502 });
  }
}
