import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const backend = process.env.BACKEND_INTERNAL_URL;
  if (!backend) {
    return NextResponse.json({ success: false }, { status: 503 });
  }

  try {
    const response = await fetch(`${backend}/api/public/visits`, {
      method: "POST",
      // Nginx must overwrite this header and be the only public ingress to Next.js.
      headers: {
        "content-type": "application/json",
        "x-forwarded-for": request.headers.get("x-forwarded-for") || "",
        "user-agent": request.headers.get("user-agent") || "",
      },
      body: await request.text(),
      signal: AbortSignal.timeout(3000),
      cache: "no-store",
    });

    return new NextResponse(await response.text(), {
      status: response.status,
      headers: {
        "content-type": "application/json",
        ...(response.headers.has("retry-after")
          ? { "retry-after": response.headers.get("retry-after")! }
          : {}),
      },
    });
  } catch {
    // Analytics is best-effort: an unavailable backend must never break a public page.
    return NextResponse.json({ success: false }, { status: 502 });
  }
}
