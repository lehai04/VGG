import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

async function forward(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const backend = process.env.BACKEND_INTERNAL_URL;
  if (!backend) return NextResponse.json({ success: false, message: "Backend chưa được cấu hình." }, { status: 503 });
  const { path } = await context.params;
  const target = `${backend}/api/admin/${path.join("/")}${request.nextUrl.search}`;
  const body = request.method === "GET" || request.method === "HEAD" ? undefined : await request.text();
  const response = await fetch(target, { method: request.method, body, cache: "no-store", headers: { accept: "application/json", "content-type": request.headers.get("content-type") || "application/json", cookie: (await cookies()).toString() } });
  return new NextResponse(await response.text(), { status: response.status, headers: { "content-type": response.headers.get("content-type") || "application/json" } });
}
export const GET = forward;
export const POST = forward;
export const PUT = forward;
export const DELETE = forward;
