import { NextRequest } from "next/server";

export function requestContext(request: NextRequest) {
  return {
    ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null,
    userAgent: request.headers.get("user-agent")?.slice(0, 500) || null,
  };
}

export function isTrustedMutation(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return process.env.NODE_ENV !== "production";
  const configured = (process.env.ADMIN_ALLOWED_ORIGINS || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  return origin === request.nextUrl.origin || configured.includes(origin);
}

