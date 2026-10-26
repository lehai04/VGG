import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth/session";
import { isTrustedMutation } from "@/lib/auth/request";
import { uploadResourceFile } from "@/lib/storage";
export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  if (!isTrustedMutation(request))
    return NextResponse.json(
      { success: false, message: "Nguồn yêu cầu không hợp lệ." },
      { status: 403 },
    );
  const admin = await getCurrentAdmin();
  if (
    !admin ||
    admin.mustChangePassword ||
    (admin.role.code !== "SUPER_ADMIN" &&
      !admin.permissionCodes.includes("media.upload"))
  )
    return NextResponse.json(
      { success: false, message: "Không có quyền tải video." },
      { status: 403 },
    );
  try {
    const data = await request.formData();
    const file = data.get("file");
    if (!(file instanceof File) || file.size > 20 * 1024 * 1024)
      throw Error("Video tối đa 20 MB.");
    const buffer = Buffer.from(await file.arrayBuffer());
    let extension = "";
    if (
      buffer.length > 12 &&
      buffer.subarray(4, 8).toString() === "ftyp" &&
      !/avi[fs]/.test(buffer.subarray(8, 40).toString())
    )
      extension = "mp4";
    else if (
      buffer.length > 8 &&
      buffer.readUInt32BE(0) === 0x1a45dfa3 &&
      buffer.subarray(0, 4096).includes(Buffer.from("webm"))
    )
      extension = "webm";
    if (!extension) throw Error("Chỉ hỗ trợ video MP4 hoặc WebM hợp lệ.");
    return NextResponse.json({
      success: true,
      data: await uploadResourceFile(
        buffer,
        `banner.${extension}`,
        `video/${extension}`,
      ),
    });
  } catch (e) {
    return NextResponse.json(
      {
        success: false,
        message: e instanceof Error ? e.message : "Không tải được video.",
      },
      { status: 400 },
    );
  }
}
