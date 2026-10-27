import { requireAdmin } from "@/lib/auth/authorization";
import { backendRequest } from "@/lib/backend-api";
import { ContentWorkspace, type ContentPage } from "@/components/cms-next/ContentWorkspace";

export const metadata = { title: "Nội dung theo website" };
export default async function Page() {
  const admin = await requireAdmin();
  const can = (permission: string) => admin.role.code === "SUPER_ADMIN" || admin.permissionCodes.includes(permission);
  if (!can("website.view")) return <p role="alert">Bạn không có quyền xem nội dung website.</p>;
  const data = await backendRequest<{pages: ContentPage[]}>("/api/admin/website/pages").catch(() => null);
  if (!data) return <section className="admin-card"><h1>Nội dung theo website</h1><p role="alert">Chưa tải được dữ liệu từ backend. Kiểm tra kết nối và tải lại trang; không dùng dữ liệu mẫu thay dữ liệu thật.</p><a href="/admin/content">Thử lại</a></section>;
  return <ContentWorkspace pages={data.pages} canEdit={can("website.update")} canPublish={can("website.publish")} canViewMedia={can("media.view")} canUpload={can("media.upload")} />;
}

