import { backendRequest } from "@/lib/backend-api";
import { requireAdmin } from "@/lib/auth/authorization";
import { RealtimeDashboard, type DashboardData } from "@/components/dashboard/RealtimeDashboard";


export const metadata = {
  title: "Dashboard - Quản trị VGG",
};

export default async function DashboardPage() {
  const admin = await requireAdmin();
  const [data,queue]=await Promise.all([backendRequest<DashboardData>("/api/admin/dashboard"),backendRequest<{items:{label:string;count:number;href:string}[]}>("/api/admin/work-queue").catch(()=>null)]);
  const cms = admin.role.code === 'SUPER_ADMIN' || admin.permissionCodes.includes('website.view')
    ? await backendRequest<{ pages: Array<{ states: Array<{ published: boolean }> }> }>('/api/admin/website/pages').catch(() => null) : null;

  return (
    <div className="admin-page dashboard-page">
      {queue&&<section className="admin-card" aria-label="Công việc CMS"><h2>Công việc cần xử lý</h2><ul>{queue.items.map(item=><li key={item.label}><a href={item.href}>{item.label}: <strong>{item.count}</strong></a></li>)}</ul>{!queue.items.length&&<p>Không có phân hệ nội dung được phân quyền.</p>}</section>}
      {cms && <section className="admin-card" aria-label="Thống kê nội dung website"><h2>Nội dung website</h2><p>{cms.pages.length} trang / nhóm nội dung · {cms.pages.filter(page => page.states.some(state => state.published)).length} đã xuất bản qua CMS · {cms.pages.filter(page => page.states.some(state => !state.published)).length} có bản nháp</p><a href="/admin/content">Mở trình quản lý trang →</a></section>}
      <RealtimeDashboard initialData={data} admin={admin} />
    </div>
  );
}
