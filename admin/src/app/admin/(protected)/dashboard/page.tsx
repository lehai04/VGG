import { backendRequest } from "@/lib/backend-api";
import { requireAdmin } from "@/lib/auth/authorization";
import { RealtimeDashboard, type DashboardData } from "@/components/dashboard/RealtimeDashboard";
export const metadata={title:"Dashboard"};
export default async function DashboardPage(){const admin=await requireAdmin();const data=await backendRequest<DashboardData>("/api/admin/dashboard");const hour=new Date().getHours();const greeting=hour<12?"Chào buổi sáng":hour<18?"Chào buổi chiều":"Chào buổi tối";return <div className="admin-page dashboard-page"><div className="admin-breadcrumb"><span>Trang chủ</span><b>/</b><strong>Dashboard</strong></div><section className="dashboard-hero"><div><h1>{greeting}, {admin.fullName.toUpperCase()}</h1><p>Chúc bạn một ngày làm việc hiệu quả cùng VGG 🚀</p></div></section><RealtimeDashboard initialData={data}/></div>}
