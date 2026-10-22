import type { ReactNode } from "react";
import { requireAdmin } from "@/lib/auth/authorization";
import { AdminShell } from "@/components/layout/AdminShell";

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const admin = await requireAdmin();
  return <AdminShell admin={admin}>{children}</AdminShell>;
}

