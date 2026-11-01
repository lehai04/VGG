import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const backend = process.env.BACKEND_INTERNAL_URL;
  if (!backend) return NextResponse.json({ message: "Backend chưa được cấu hình." }, { status: 503 });
  const { path } = await params;
  try {
    const upstream = await fetch(`${backend}/api/public/media/${path.map(encodeURIComponent).join("/")}`, { cache: "no-store", redirect: "error", signal: AbortSignal.timeout(10000) });
    if (!upstream.ok || !upstream.body) return NextResponse.json({ message: "Không tìm thấy file." }, { status: upstream.status });
    const headers = new Headers();
    for (const name of ["content-type", "content-length", "cache-control"]) { const value = upstream.headers.get(name); if (value) headers.set(name, value); }
    headers.set("x-content-type-options", "nosniff");
    const type = headers.get("content-type") ?? "application/octet-stream";
    if (!/^(application\/pdf|image\/(png|jpeg|webp|avif|gif))(;|$)/i.test(type)) {
      headers.set("content-disposition", "attachment");
      headers.set("content-security-policy", "sandbox; default-src 'none'");
    }
    return new NextResponse(upstream.body, { headers });
  } catch {
    return NextResponse.json({ message: "Không thể kết nối kho file." }, { status: 502 });
  }
}
