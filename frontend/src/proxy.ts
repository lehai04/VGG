import { siteIsIndexable } from "@/lib/public-site";
import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n";

/** Cổng xử lý locale trước khi Next.js chọn route. URL công khai có /vi hoặc /en,
 * còn cây app giữ một bộ route dùng chung, không nhân đôi thư mục theo ngôn ngữ. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/");
  // A locale rewrite is internally dispatched to the unprefixed route. Next
  // runs the proxy for that dispatch too, so preserve the validated locale
  // header instead of redirecting the rewritten path back to /vi or /en.
  const rewrittenLocale = request.headers.get("x-vgg-locale");
  if (isLocale(rewrittenLocale)) {
    const response = NextResponse.next();
    if (!siteIsIndexable()) response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }
  const locale = segments[1];
  // Management is hosted by the separate CMS application.
  if (pathname === "/admin" || pathname.startsWith("/admin/") || (isLocale(locale) && segments[2] === "admin")) {
    return new NextResponse("Not found", { status: 404 });
  }
  // Chưa có locale hợp lệ: chuyển hướng trình duyệt sang ngôn ngữ mặc định.
  // clone() giữ query string; chỉ pathname được thay, tránh mất tham số tìm kiếm.
  if (!isLocale(locale)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(redirectUrl);
  }

  // Đã có locale: rewrite nội bộ bỏ tiền tố, URL người dùng nhìn thấy vẫn giữ locale.
  const rewrittenPath = `/${segments.slice(2).join("/")}` || "/";
  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = rewrittenPath;
  const headers = new Headers(request.headers);
  // Ghi đè header locale bằng giá trị đã kiểm tra từ URL để Server Component đọc được.
  headers.set("x-vgg-locale", locale);
  headers.set("x-vgg-pathname", pathname);
  const response = NextResponse.rewrite(rewriteUrl, { request: { headers } });
  if (!siteIsIndexable()) response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

// Loại các prefix API và tài nguyên liệt kê bên dưới khỏi xử lý locale.
// Đây là biểu thức matcher cụ thể, không phải cơ chế tự nhận biết mọi phần mở rộng file.
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.svg|images|fonts/|assets/|documents/|robots.txt|sitemap.xml).*)"],
};
