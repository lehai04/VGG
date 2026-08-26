import { getCurrentAdmin } from "@/lib/auth/session";
import { uploadResourceFile } from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_FILE_SIZE_MB = Number(
  process.env.CLOUDINARY_MAX_RESOURCE_FILE_MB ?? 10,
);
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;
const allowedTypes: Record<string, string[]> = {
  ".pdf": ["application/pdf"],
  ".doc": ["application/msword", "application/octet-stream"],
  ".docx": [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/zip",
  ],
  ".xls": ["application/vnd.ms-excel", "application/octet-stream"],
  ".xlsx": [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/zip",
  ],
  ".jpg": ["image/jpeg"],
  ".jpeg": ["image/jpeg"],
  ".png": ["image/png"],
};
const canonicalTypes: Record<string, string> = {
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
};

function extensionOf(name: string) {
  const match = name.toLowerCase().match(/\.[a-z0-9]+$/);
  return match?.[0] ?? "";
}

function hasValidSignature(buffer: Buffer, extension: string) {
  if (extension === ".pdf")
    return buffer.subarray(0, 5).toString("ascii") === "%PDF-";
  if (extension === ".jpg" || extension === ".jpeg")
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  if (extension === ".png")
    return buffer
      .subarray(0, 8)
      .equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  if (extension === ".docx" || extension === ".xlsx")
    return buffer[0] === 0x50 && buffer[1] === 0x4b;
  if (extension === ".doc" || extension === ".xls")
    return buffer
      .subarray(0, 8)
      .equals(Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]));
  return false;
}

export async function POST(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin)
    return NextResponse.json(
      { success: false, message: "Bạn chưa đăng nhập." },
      { status: 401 },
    );
  if (
    !admin.permissionCodes.includes("resources.create") &&
    !admin.permissionCodes.includes("resources.update")
  )
    return NextResponse.json(
      { success: false, message: "Bạn không có quyền tải file tài nguyên." },
      { status: 403 },
    );

  const data = await request.formData();
  const file = data.get("file");
  if (!(file instanceof File))
    return NextResponse.json(
      { success: false, message: "Chưa chọn file." },
      { status: 400 },
    );
  if (file.size <= 0)
    return NextResponse.json(
      { success: false, message: "File rỗng hoặc bị lỗi." },
      { status: 400 },
    );
  if (file.size > MAX_FILE_SIZE)
    return NextResponse.json(
      {
        success: false,
        message: `File có dung lượng ${(file.size / 1024 / 1024).toFixed(1)} MB, vượt giới hạn ${MAX_FILE_SIZE_MB} MB của Cloudinary.`,
      },
      { status: 413 },
    );
  const extension = extensionOf(file.name);
  if (
    !allowedTypes[extension] ||
    !allowedTypes[extension].includes(file.type || "application/octet-stream")
  )
    return NextResponse.json(
      { success: false, message: "Định dạng file không được hỗ trợ." },
      { status: 415 },
    );

  const buffer = Buffer.from(await file.arrayBuffer());
  if (!hasValidSignature(buffer, extension))
    return NextResponse.json(
      {
        success: false,
        message: "File bị lỗi hoặc nội dung không đúng định dạng.",
      },
      { status: 415 },
    );

  try {
    const uploaded = await uploadResourceFile(buffer, file.name);
    return NextResponse.json({
      success: true,
      data: {
        url: uploaded.url,
        publicId: uploaded.publicId,
        fileName: file.name,
        fileType: canonicalTypes[extension],
        fileSize: file.size,
      },
      message: "Đã tải file lên Cloudinary.",
    });
  } catch (error) {
    console.error("Resource upload failed", error);
    const detail =
      error instanceof Error
        ? error.message
        : typeof error === "object" && error && "message" in error
          ? String(error.message)
          : "Cloudinary không phản hồi.";
    return NextResponse.json(
      { success: false, message: `Tải file thất bại: ${detail}` },
      { status: 502 },
    );
  }
}
