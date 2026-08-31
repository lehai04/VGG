import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const backend = process.env.BACKEND_INTERNAL_URL;
  if (!backend) {
    return NextResponse.json({ success: false }, { status: 503 });
  }

  try {
    const response = await fetch(`${backend}/api/public/visits`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: await request.text(),
      signal: AbortSignal.timeout(3000),
      cache: "no-store",
    });

    return new NextResponse(await response.text(), {
      status: response.status,
      headers: { "content-type": "application/json" },
    });
  } catch {
    // Analytics is best-effort: an unavailable backend must never break a public page.
    return NextResponse.json({ success: false }, { status: 502 });
  }
}
