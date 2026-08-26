import { NextRequest, NextResponse } from "next/server";

const allowedHosts = new Set(["res.cloudinary.com"]);

function safeFileName(value: string) {
  return value.replace(/[\r\n"\\/]/g, "_").slice(0, 180) || "tai-lieu";
}

export async function GET(request: NextRequest) {
  const source = request.nextUrl.searchParams.get("url");
  const name = safeFileName(request.nextUrl.searchParams.get("name") ?? "tai-lieu");
  const download = request.nextUrl.searchParams.get("download") === "1";
  if (!source) return NextResponse.json({ message: "Thiếu đường dẫn tài liệu." }, { status: 400 });
  let url: URL;
  try {
    url = new URL(source);
  } catch {
    return NextResponse.json({ message: "Đường dẫn không hợp lệ." }, { status: 400 });
  }
  if (url.protocol !== "https:" || !allowedHosts.has(url.hostname))
    return NextResponse.json({ message: "Nguồn tài liệu không được hỗ trợ." }, { status: 403 });
  try {
    const upstream = await fetch(url, { cache: "no-store" });
    if (!upstream.ok || !upstream.body)
      return NextResponse.json(
        { message: "Không thể mở tài liệu." },
        { status: upstream.status || 502 },
      );
    const headers = new Headers();
    headers.set("content-type", upstream.headers.get("content-type") ?? "application/octet-stream");
    headers.set(
      "content-disposition",
      `${download ? "attachment" : "inline"}; filename*=UTF-8''${encodeURIComponent(name)}`,
    );
    headers.set("cache-control", "public, max-age=300");
    const length = upstream.headers.get("content-length");
    if (length) headers.set("content-length", length);
    return new NextResponse(upstream.body, { status: 200, headers });
  } catch {
    return NextResponse.json({ message: "Không thể kết nối tới kho tài liệu." }, { status: 502 });
  }
}
