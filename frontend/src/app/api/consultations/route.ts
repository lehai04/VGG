import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const backend = process.env.BACKEND_INTERNAL_URL;
  if (!backend) return NextResponse.json({ message: "Backend chưa được cấu hình." }, { status: 503 });
  try {
    const response = await fetch(`${backend}/api/public/consultations`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": request.headers.get("x-forwarded-for") || "", "user-agent": request.headers.get("user-agent") || "" },
      body: await request.text(),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    const payload = await response.json() as { message?: string };
    return NextResponse.json({ message: payload.message || (response.ok ? "Gửi yêu cầu thành công." : "Không thể gửi yêu cầu.") }, { status: response.status });
  } catch (error) {
    console.error("Consultation backend unavailable", error);
    return NextResponse.json({ message: "Hệ thống đang bận. Vui lòng thử lại sau." }, { status: 502 });
  }
}
