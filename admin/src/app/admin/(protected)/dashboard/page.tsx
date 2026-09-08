import { backendRequest } from "@/lib/backend-api";
import { requireAdmin } from "@/lib/auth/authorization";
import { RealtimeDashboard, type DashboardData } from "@/components/dashboard/RealtimeDashboard";
import { AdminNotifications } from "@/components/layout/AdminNotifications";

export const metadata = {
  title: "Dashboard - Quản trị VGG",
};

export default async function DashboardPage() {
  const admin = await requireAdmin();
  const data = await backendRequest<DashboardData>("/api/admin/dashboard");

  return (
    <div className="admin-page dashboard-page">
      <RealtimeDashboard initialData={data} admin={admin} />
    </div>
  );
}
