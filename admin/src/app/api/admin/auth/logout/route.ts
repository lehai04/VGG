import { NextRequest, NextResponse } from "next/server";
import { writeAudit } from "@/lib/auth/audit";
import { isTrustedMutation, requestContext } from "@/lib/auth/request";
import { errorResponse } from "@/lib/auth/responses";
import { clearSessionCookie, getCurrentAdmin, revokeCurrentSession } from "@/lib/auth/session";

export async function POST(request: NextRequest) {
  if (!isTrustedMutation(request)) return errorResponse("Nguồn gửi không được phép.", 403);
  const admin = await getCurrentAdmin();
  await revokeCurrentSession();
  if (admin) await writeAudit({ action: "LOGOUT", actorAdminId: admin.id, targetAdminId: admin.id, username: admin.username, ...requestContext(request) });
  const response = NextResponse.json({ message: "Đã đăng xuất." });
  clearSessionCookie(response);
  return response;
}

