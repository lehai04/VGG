import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { isTrustedMutation } from '@/lib/auth/request';

async function forward(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  if (!['GET', 'HEAD'].includes(request.method)) {
    if (!isTrustedMutation(request)) return NextResponse.json({ success: false, message: 'Nguồn yêu cầu không hợp lệ.' }, { status: 403 });
  }
  const backend = process.env.BACKEND_INTERNAL_URL;
  if (!backend)
    return NextResponse.json(
      { success: false, message: "Backend chưa được cấu hình." },
      { status: 503 },
    );
  const { path } = await context.params;
  const target = `${backend}/api/admin/${path.join("/")}${request.nextUrl.search}`;
  const canHaveBody = request.method !== "GET" && request.method !== "HEAD";
  const bodyText = canHaveBody ? await request.text() : "";
  const body = bodyText.length > 0 ? bodyText : undefined;
  const headers = new Headers({
    accept: "application/json",
    cookie: (await cookies()).toString(),
  });
  const contentType = request.headers.get("content-type");
  if (body && contentType) headers.set("content-type", contentType);
  const response = await fetch(target, {
    method: request.method,
    body,
    cache: "no-store",
    headers,
  });
  return new NextResponse(await response.text(), {
    status: response.status,
    headers: {
      'cache-control': 'private, no-store',
      "content-type":
        response.headers.get("content-type") || "application/json",
    },
  });
}
export const GET = forward;
export const POST = forward;
export const PUT = forward;
export const PATCH = forward;
export const DELETE = forward;
