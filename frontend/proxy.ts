import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale } from "@/lib/i18n";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/");
  const locale = segments[1];

  if (!isLocale(locale)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(redirectUrl);
  }

  const rewrittenPath = `/${segments.slice(2).join("/")}` || "/";
  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = rewrittenPath;
  const headers = new Headers(request.headers);
  headers.set("x-vgg-locale", locale);
  headers.set("x-vgg-pathname", pathname);
  return NextResponse.rewrite(rewriteUrl, { request: { headers } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.svg|images|robots.txt|sitemap.xml).*)"],
};
