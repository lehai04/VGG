import { NextRequest, NextResponse } from "next/server";

const maxSize = 13 * 1024 * 1024;

async function forward(request: NextRequest) {
  const backend = process.env.BACKEND_INTERNAL_URL;
  const responseHeaders = { "Cache-Control": "no-store" };
  if (!backend)
    return NextResponse.json(
      { message: "Chưa cấu hình hệ thống tiếp nhận." },
      { status: 503, headers: responseHeaders },
    );

  let length = 0;
  let tooLarge = Number(request.headers.get("content-length")) > maxSize;
  const sizeError = () =>
    NextResponse.json(
      { message: "Tệp quá lớn. Mỗi tệp tối đa 3 MB." },
      { status: 413, headers: responseHeaders },
    );
  if (tooLarge) return sizeError();
  const body = request.body?.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        length += chunk.byteLength;
        if (length > maxSize) {
          tooLarge = true;
          controller.error(new Error("Request size limit"));
          return;
        }
        controller.enqueue(chunk);
      },
    }),
  );
  try {
    const upstream = await fetch(`${backend}/api/public/knowledge-registrations`, {
      method: request.method,
      headers: {
        "content-type": request.headers.get("content-type") ?? "",
        "x-forwarded-for": request.headers.get("x-forwarded-for") ?? "",
      },
      body,
      duplex: "half",
      redirect: "error",
      cache: "no-store",
      signal: AbortSignal.timeout(25_000),
    } as RequestInit & { duplex: "half" });
    if (upstream.status === 413) return sizeError();
    const data = await upstream.json();
    return NextResponse.json(data, { status: upstream.status, headers: responseHeaders });
  } catch {
    if (tooLarge) return sizeError();
    return NextResponse.json(
      { message: "Hệ thống đang bận. Vui lòng thử lại sau." },
      { status: 502, headers: responseHeaders },
    );
  }
}

export const GET = forward;
export const POST = forward;
