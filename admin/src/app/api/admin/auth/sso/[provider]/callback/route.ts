import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { writeAudit } from "@/lib/auth/audit";
import { requestContext } from "@/lib/auth/request";
import { createSession, setSessionCookie } from "@/lib/auth/session";
import {
  SsoProvider,
  verifySsoState,
  exchangeCodeForUserInfo,
  SSO_STATE_COOKIE,
  getSsoConfig,
} from "@/lib/auth/sso";

const VALID_PROVIDERS: SsoProvider[] = ["microsoft", "google"];

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ provider: string }> }
) {
  const { provider: rawProvider } = await context.params;
  const provider = rawProvider.toLowerCase() as SsoProvider;
  const reqContext = requestContext(request);

  if (!VALID_PROVIDERS.includes(provider)) {
    return NextResponse.redirect(new URL("/admin/login?error=sso_unsupported", request.url));
  }

  const searchParams = request.nextUrl.searchParams;
  const error = searchParams.get("error");
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const mockEmail = searchParams.get("mock_email");

  // Xử lý lỗi trả về từ IdP (người dùng bấm hủy hoặc bị từ chối)
  if (error) {
    const errorDesc = searchParams.get("error_description") || "";
    return NextResponse.redirect(
      new URL(
        `/admin/login?error=sso_denied&provider=${provider}&details=${encodeURIComponent(errorDesc)}`,
        request.url
      )
    );
  }

  let userEmail = "";
  let returnTo = "/admin/dashboard";

  // 1. Chế độ Mock Testing trong môi trường Development (hoặc khi chưa cấu hình credentials)
  const config = getSsoConfig(provider);
  if (mockEmail && (!config.isConfigured || process.env.NODE_ENV !== "production")) {
    userEmail = mockEmail.trim().toLowerCase();
  } else {
    // 2. Chế độ SSO Production / Thực tế qua OAuth code
    if (!code || !state) {
      return NextResponse.redirect(
        new URL("/admin/login?error=sso_missing_params", request.url)
      );
    }

    const stateCookie = request.cookies.get(SSO_STATE_COOKIE)?.value;
    const verification = verifySsoState(stateCookie, state, provider);

    if (!verification.ok) {
      return NextResponse.redirect(
        new URL("/admin/login?error=sso_invalid_state", request.url)
      );
    }

    returnTo = verification.returnTo || "/admin/dashboard";

    try {
      const redirectUri = `${request.nextUrl.origin}/api/admin/auth/sso/${provider}/callback`;
      const userInfo = await exchangeCodeForUserInfo(provider, code, redirectUri);
      userEmail = userInfo.email.trim().toLowerCase();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Xác thực SSO thất bại.";
      return NextResponse.redirect(
        new URL(
          `/admin/login?error=sso_exchange_failed&details=${encodeURIComponent(message)}`,
          request.url
        )
      );
    }
  }

  if (!userEmail) {
    return NextResponse.redirect(
      new URL("/admin/login?error=sso_no_email", request.url)
    );
  }

  // 3. Kiểm tra quyền truy cập trong cơ sở dữ liệu (Access Control)
  const admin = await prisma.admin.findFirst({
    where: {
      email: { equals: userEmail, mode: "insensitive" },
    },
    include: { role: true },
  });

  const now = new Date();

  // TH1: Email không có trong danh sách Quản trị viên
  if (!admin) {
    await writeAudit({
      action: "LOGIN_FAILED",
      username: userEmail,
      ...reqContext,
      metadata: { reason: "sso_unauthorized_email", provider },
    });

    return NextResponse.redirect(
      new URL(
        `/admin/login?error=unauthorized_email&email=${encodeURIComponent(userEmail)}`,
        request.url
      )
    );
  }

  // TH2: Tài khoản bị khóa tạm thời
  if (admin.lockedUntil && admin.lockedUntil > now) {
    await writeAudit({
      action: "LOGIN_FAILED",
      targetAdminId: admin.id,
      username: admin.username,
      ...reqContext,
      metadata: { reason: "temporary_lock", provider },
    });

    return NextResponse.redirect(
      new URL("/admin/login?error=account_locked", request.url)
    );
  }

  // TH3: Tài khoản không ở trạng thái ACTIVE
  if (admin.status !== "ACTIVE") {
    await writeAudit({
      action: "LOGIN_FAILED",
      targetAdminId: admin.id,
      username: admin.username,
      ...reqContext,
      metadata: { reason: admin.status.toLowerCase(), provider },
    });

    return NextResponse.redirect(
      new URL("/admin/login?error=account_inactive", request.url)
    );
  }

  // TH4: Đăng nhập SSO thành công!
  const session = await createSession(admin.id, true, reqContext);

  await prisma.admin.update({
    where: { id: admin.id },
    data: {
      failedLoginAttempts: 0,
      lockedUntil: null,
      lastLoginAt: now,
    },
  });

  await writeAudit({
    action: "LOGIN_SUCCESS",
    actorAdminId: admin.id,
    targetAdminId: admin.id,
    username: admin.username,
    ...reqContext,
    metadata: { method: `SSO_${provider.toUpperCase()}` },
  });

  // Chuyển hướng vào Dashboard và gán cookie phiên làm việc
  const destination = returnTo.startsWith("/") ? returnTo : "/admin/dashboard";
  const response = NextResponse.redirect(new URL(destination, request.url));

  setSessionCookie(response, session.token, session.expiresAt);

  // Xóa cookie sso_state
  response.cookies.delete(SSO_STATE_COOKIE);

  return response;
}
