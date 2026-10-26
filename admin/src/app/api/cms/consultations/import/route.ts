import { NextRequest, NextResponse } from "next/server";
import { backendRequest } from "@/lib/backend-api";
import { getCurrentAdmin } from "@/lib/auth/session";
import { isTrustedMutation } from "@/lib/auth/request";
import {
  consultationTemplate,
  parseConsultations,
} from "@/lib/consultation-excel";
export const runtime = "nodejs";
async function allowed() {
  const admin = await getCurrentAdmin();
  return (
    admin &&
    !admin.mustChangePassword &&
    (admin.role.code === "SUPER_ADMIN" ||
      admin.permissionCodes.includes("consultations.import"))
  );
}
export async function GET() {
  if (!(await allowed()))
    return NextResponse.json(
      { success: false, message: "Không có quyền nhập Excel." },
      { status: 403 },
    );
  return new NextResponse(new Uint8Array(await consultationTemplate()), {
    headers: {
      "content-type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "content-disposition": 'attachment; filename="mau-tu-van.xlsx"',
      "cache-control": "private, no-store",
    },
  });
}
export async function POST(request: NextRequest) {
  if (!isTrustedMutation(request) || !(await allowed()))
    return NextResponse.json(
      { success: false, message: "Không có quyền nhập Excel." },
      { status: 403 },
    );
  try {
    if (request.headers.get("content-type")?.includes("application/json")) {
      const result = await backendRequest("/api/admin/consultations/import", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(await request.json()),
      });
      return NextResponse.json({ success: true, data: result });
    }
    const data = await request.formData();
    const file = data.get("file");
    if (!(file instanceof File) || !file.name.toLowerCase().endsWith(".xlsx"))
      throw Error("Chỉ hỗ trợ file .xlsx.");
    if (file.size > 5 * 1024 * 1024) throw Error("File tối đa 5 MB.");
    return NextResponse.json({
      success: true,
      data: await parseConsultations(Buffer.from(await file.arrayBuffer())),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Không đọc được file.",
      },
      { status: 400 },
    );
  }
}
