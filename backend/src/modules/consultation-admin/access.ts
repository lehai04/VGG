import type { FastifyRequest } from "fastify";
import { prisma } from "../../shared/database/prisma.js";
import { tokenHash } from "./password.js";
const cookieName = "vgg_consultation_session";
export function sessionToken(request: FastifyRequest) {
  const value = request.headers.cookie
    ?.split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${cookieName}=`))
    ?.slice(cookieName.length + 1);
  return value && /^[a-f0-9]{64}$/.test(value) ? value : undefined;
}
export async function staffFor(request: FastifyRequest) {
  const token = sessionToken(request);
  if (!token) return null;
  const session = await prisma.consultationSession.findUnique({
    where: { tokenHash: tokenHash(token) },
    include: { staff: true },
  });
  return session && session.expiresAt > new Date() && !session.staff.disabled
    ? session.staff
    : null;
}
