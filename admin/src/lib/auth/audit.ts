import type { AuditAction } from "@/generated/prisma/enums";
import { prisma } from "@/lib/db";

export function writeAudit(data: {
  action: AuditAction;
  actorAdminId?: string | null;
  targetAdminId?: string | null;
  username?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  metadata?: Record<string, string | number | boolean | null>;
}) {
  return prisma.auditLog.create({ data }).catch((error: unknown) => {
    console.error("Audit log write failed", error);
    return null;
  });
}

