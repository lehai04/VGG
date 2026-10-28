import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n";

/** Cổng xử lý locale trước khi Next.js chọn route. URL công khai có /vi hoặc /en,
 * còn cây app giữ một bộ route dùng chung, không nhân đôi thư mục theo ngôn ngữ. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/");
  const locale = segments[1];

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
  headers.delete('x-vgg-cms-preview');
  return NextResponse.rewrite(rewriteUrl, { request: { headers } });
}

// Loại các prefix API và tài nguyên liệt kê bên dưới khỏi xử lý locale.
// Đây là biểu thức matcher cụ thể, không phải cơ chế tự nhận biết mọi phần mở rộng file.
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.svg|images|documents/|robots.txt|sitemap.xml).*)"],
};
