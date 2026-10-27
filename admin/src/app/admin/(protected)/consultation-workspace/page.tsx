import { requireAdmin } from "@/lib/auth/authorization";
import { ConsultationWorkspace } from "@/components/cms-next/ConsultationWorkspace";

export const metadata = { title: "Yêu cầu tư vấn · CMS mới" };
export default async function Page({searchParams}:{searchParams:Promise<{due?:string}>}) {
  const admin = await requireAdmin();
  const can = (permission: string) => admin.role.code === "SUPER_ADMIN" || admin.permissionCodes.includes(permission);
  if (!can("consultations.view")) return <p role="alert">Bạn không có quyền xem yêu cầu tư vấn.</p>;
  return <ConsultationWorkspace initialDue={(await searchParams).due==="1"} canUpdate={can("consultations.update")} canAssign={can("consultations.assign")} />;
}
