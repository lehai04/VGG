import { resourceUpstream } from "@/lib/resource-upstream";
import { NextRequest, NextResponse } from "next/server";
import { demoResources } from "@/features/resources/demo-resources";

function safeFileName(value: string) {
  return value.replace(/[\r\n"\\/]/g, "_").slice(0, 180) || "tai-lieu";
}

function contentTypeFor(name: string, fallback: string | null) {
  const extension = name.toLowerCase().match(/\.[a-z0-9]+$/)?.[0];
  const known: Record<string, string> = {
    ".pdf": "application/pdf",
    ".doc": "application/msword",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".xls": "application/vnd.ms-excel",
    ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
  };
  return (extension && known[extension]) || fallback || "application/octet-stream";
}

export async function GET(request: NextRequest) {
  const source = request.nextUrl.searchParams.get("url");
  const name = safeFileName(request.nextUrl.searchParams.get("name") ?? "tai-lieu");
  const download = request.nextUrl.searchParams.get("download") === "1";
  if (!source) return NextResponse.json({ message: "Thiếu đường dẫn tài liệu." }, { status: 400 });
  const isDemoFile = demoResources.some((resource) => resource.fileUrl === source);
  if ((!source.startsWith("/api/media/") && !isDemoFile) || source.includes(".."))
    return NextResponse.json({ message: "Nguồn tài liệu không được hỗ trợ." }, { status: 403 });
  try {
    const upstream = await resourceUpstream(source);
    if (!upstream.ok || !upstream.body)
      return NextResponse.json(
        { message: "Không thể mở tài liệu." },
        { status: upstream.status || 502 },
      );
    const headers = new Headers();
    const type = contentTypeFor(name, upstream.headers.get("content-type"));
    const safeInline = /^(application\/pdf|image\/(png|jpeg|webp|avif|gif))(;|$)/i.test(type);
    headers.set("content-type", type);
    headers.set("x-content-type-options", "nosniff");
    headers.set("x-frame-options", "SAMEORIGIN");
    headers.set("content-security-policy", safeInline ? "default-src 'none'; frame-ancestors 'self'; base-uri 'none'" : "sandbox; default-src 'none'; frame-ancestors 'self'");
    headers.set(
      "content-disposition",
      `${download || !safeInline ? "attachment" : "inline"}; filename*=UTF-8''${encodeURIComponent(name)}`,
    );
    headers.set("cache-control", "public, max-age=300");
    const length = upstream.headers.get("content-length");
    if (length) headers.set("content-length", length);
    return new NextResponse(upstream.body, { status: 200, headers });
  } catch {
    return NextResponse.json({ message: "Không thể kết nối tới kho tài liệu." }, { status: 502 });
  }
}
