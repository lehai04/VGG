import { NextRequest, NextResponse } from "next/server";
import { cmsCookie } from "@/lib/cms-path";

const allowed =
  /^(?:login|logout|me|dashboard|upload-image|upload-resource|import-word|news(?:\/[a-zA-Z0-9_-]{1,100})?|resource-categories(?:\/[a-zA-Z0-9_-]{1,100})?|resources(?:\/[a-zA-Z0-9_-]{1,100}(?:\/versions)?)?|consultation-workspace(?:\/[a-zA-Z0-9_-]{1,100})?|consultations(?:\/[a-zA-Z0-9_-]{1,100})?)$/;
async function forward(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const path = (await context.params).path.join("/");
  const headers = {
    "Cache-Control": "no-store, private",
    "X-Robots-Tag": "noindex, nofollow",
  };
  if (!allowed.test(path))
    return NextResponse.json(
      { message: "Không tìm thấy API." },
      { status: 404, headers },
    );
  const backend = process.env.BACKEND_INTERNAL_URL;
  if (!backend)
    return NextResponse.json(
      { message: "Chưa cấu hình kết nối quản trị." },
      { status: 503, headers },
    );
  if (request.method !== "GET") {
    const origin = process.env.CMS_APP_URL
      ? new URL(process.env.CMS_APP_URL).origin
      : request.nextUrl.origin;
    if (
      request.headers.get("origin") !== origin ||
      request.headers.get("x-vgg-admin") !== "1"
    )
      return NextResponse.json(
        { message: "Nguồn yêu cầu không hợp lệ." },
        { status: 403, headers },
      );
  }
  try {
    const upload = ["upload-image", "upload-resource", "import-word"].includes(
      path,
    );
    const limit = upload
      ? 101 * 1024 * 1024
      : ["login", "logout"].includes(path)
        ? 16_384
        : 1024 * 1024;
    if (Number(request.headers.get("content-length") || 0) > limit)
      return NextResponse.json(
        { message: "Dữ liệu quá lớn." },
        { status: 413, headers },
      );
    if (upload) {
      const auth = await fetch(`${backend}/api/admin/me`, {
        headers: { cookie: request.headers.get("cookie") ?? "" },
        cache: "no-store",
        redirect: "error",
        signal: AbortSignal.timeout(10000),
      });
      if (!auth.ok)
        return NextResponse.json(
          { message: "Vui lòng đăng nhập." },
          { status: 401, headers },
        );
      const identity = await auth.json();
      if (!identity.data?.user?.canManageContent)
        return NextResponse.json(
          { message: "Không có quyền tải file." },
          { status: 403, headers },
        );
    }
    let length = 0;
    const body =
      request.method === "GET" || !request.body || (request.method === "DELETE" && !request.headers.get("content-type") && !Number(request.headers.get("content-length")))
        ? undefined
        : request.body.pipeThrough(
            new TransformStream<Uint8Array, Uint8Array>({
              transform(chunk, controller) {
                length += chunk.byteLength;
                if (length > limit) throw new Error("BODY_LIMIT");
                controller.enqueue(chunk);
              },
            }),
          );
    const upstream = await fetch(
      `${backend}/api/admin/${path}${request.nextUrl.search}`,
      {
        method: request.method,
        cache: "no-store",
        redirect: "error",
        signal: AbortSignal.timeout(upload ? 120000 : 10000),
        duplex: "half",
        headers: {
          ...(body && request.headers.get("content-type")
            ? {
                "content-type":
                  request.headers.get("content-type")!,
              }
            : {}),
          // Only the gateway is publicly reachable; it overwrites forwarded IPs.
          "x-forwarded-for": request.headers.get("x-forwarded-for") ?? "",
          cookie: request.headers.get("cookie") ?? "",
          origin: request.headers.get("origin") ?? "",
          "x-vgg-admin": request.headers.get("x-vgg-admin") ?? "",
        },
        body,
      } as RequestInit & { duplex: "half" },
    );
    const response = new NextResponse(await upstream.text(), {
      status: upstream.status,
      headers: { ...headers, "Content-Type": "application/json" },
    });
    const retryAfter = upstream.headers.get("retry-after");
    if (retryAfter) response.headers.set("retry-after", retryAfter);
    const cookie = upstream.headers.get("set-cookie");
    if (cookie) response.headers.set("set-cookie", cmsCookie(cookie));
    return response;
  } catch {
    return NextResponse.json(
      { message: "Không thể kết nối máy chủ. Vui lòng thử lại." },
      { status: 502, headers },
    );
  }
}
export const GET = forward;
export const POST = forward;
export const PATCH = forward;

export const PUT = forward;
export const DELETE = forward;
