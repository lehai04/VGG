import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import type { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { REMEMBER_SESSION_DAYS, SESSION_COOKIE, SESSION_DAYS } from "./constants";
import { hashSessionToken } from "./token";

export async function createSession(adminId: string, remember: boolean, context: {
  ipAddress: string | null;
  userAgent: string | null;
}) {
  const token = randomBytes(32).toString("base64url");
  const days = remember ? REMEMBER_SESSION_DAYS : SESSION_DAYS;
  const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  await prisma.session.create({
    data: { tokenHash: hashSessionToken(token), adminId, expiresAt, ...context },
  });
  return { token, expiresAt };
}

export function setSessionCookie(response: NextResponse, token: string, expiresAt: Date) {
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: expiresAt,
  });
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(0),
  });
}

export async function getSessionToken() {
  return (await cookies()).get(SESSION_COOKIE)?.value ?? null;
}

export async function revokeCurrentSession() {
  const token = await getSessionToken();
  if (token) await prisma.session.deleteMany({ where: { tokenHash: hashSessionToken(token) } });
}

export async function getCurrentAdmin() {
  const token = await getSessionToken();
  if (!token) return null;
  const session = await prisma.session.findUnique({
    where: { tokenHash: hashSessionToken(token) },
    include: {
      admin: {
        include: {
          role: { include: { permissions: { include: { permission: true } } } },
        },
      },
    },
  });
  if (!session || session.expiresAt <= new Date() || session.admin.status !== "ACTIVE") {
    if (session) await prisma.session.delete({ where: { id: session.id } }).catch(() => undefined);
    return null;
  }
  return {
    ...session.admin,
    permissionCodes: session.admin.role.permissions.map((item) => item.permission.code),
    sessionId: session.id,
  };
}
