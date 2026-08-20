import { NextRequest, NextResponse } from "next/server";
import { validateConsultation } from "@/lib/consultation";

const attempts = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

function isAllowed(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || entry.resetAt <= now) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= LIMIT) return false;
  entry.count += 1;
  return true;
}

function originAllowed(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const configured = (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  return origin === request.nextUrl.origin || configured.includes(origin);
}

export async function POST(request: NextRequest) {
  if (!originAllowed(request))
    return NextResponse.json({ message: "Nguồn gửi không được phép." }, { status: 403 });
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!isAllowed(ip))
    return NextResponse.json(
      { message: "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau." },
      { status: 429 },
    );
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Dữ liệu JSON không hợp lệ." }, { status: 400 });
  }
  const result = validateConsultation(body);
  if (!result.success) return NextResponse.json({ message: result.message }, { status: 400 });
  const webhook = process.env.CONSULTATION_WEBHOOK_URL;
  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...result.data, submittedAt: new Date().toISOString() }),
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) throw new Error(`Webhook returned ${response.status}`);
    } catch (error) {
      console.error("Consultation forwarding failed", error);
      return NextResponse.json(
        { message: "Hệ thống đang bận. Vui lòng thử lại sau." },
        { status: 502 },
      );
    }
  }
  return NextResponse.json(
    { message: "Cảm ơn bạn. Đội ngũ VGG sẽ liên hệ trong thời gian sớm nhất." },
    { status: 201 },
  );
}
