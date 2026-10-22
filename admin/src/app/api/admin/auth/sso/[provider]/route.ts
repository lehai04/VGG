import { NextRequest, NextResponse } from "next/server";
import {
  SsoProvider,
  getSsoConfig,
  createSsoState,
  buildAuthorizationUrl,
  SSO_STATE_COOKIE,
} from "@/lib/auth/sso";

const VALID_PROVIDERS: SsoProvider[] = ["microsoft", "google"];

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ provider: string }> }
) {
  const { provider: rawProvider } = await context.params;
  const provider = rawProvider.toLowerCase() as SsoProvider;

  if (!VALID_PROVIDERS.includes(provider)) {
    return NextResponse.redirect(new URL("/admin/login?error=sso_unsupported", request.url));
  }

  const searchParams = request.nextUrl.searchParams;
  const returnTo = searchParams.get("returnTo") || "/admin/dashboard";
  const forceMock = searchParams.get("mock") === "1";

  const config = getSsoConfig(provider);

  // Nếu chưa cấu hình Client ID & Secret trên môi trường dev, hoặc người dùng chỉ định mock=1:
  // Chuyển hướng sang mock dialog / login page với cờ sso_mock để test cục bộ
  if (!config.isConfigured || forceMock) {
    if (process.env.NODE_ENV === "production" && !forceMock) {
      return NextResponse.redirect(
        new URL(
          `/admin/login?error=sso_not_configured&provider=${provider}`,
          request.url
        )
      );
    }

    // Dev mock mode: Chuyển hướng tới trang login với query để chọn tài khoản test
    const mockUrl = new URL("/admin/login", request.url);
    mockUrl.searchParams.set("sso_mock", provider);
    return NextResponse.redirect(mockUrl);
  }

  // Luồng SSO thật: Tạo state và chuyển hướng sang Microsoft / Google
  const { state, cookieValue } = createSsoState(provider, returnTo);
  const origin = request.nextUrl.origin;
  const redirectUri = `${origin}/api/admin/auth/sso/${provider}/callback`;
  const authUrl = buildAuthorizationUrl(provider, state, redirectUri);

  const response = NextResponse.redirect(authUrl);
  response.cookies.set(SSO_STATE_COOKIE, cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax", // Bắt buộc là 'lax' để callback từ bên thứ 3 gửi được cookie
    path: "/",
    maxAge: 15 * 60, // 15 phút
  });

  return response;
}
