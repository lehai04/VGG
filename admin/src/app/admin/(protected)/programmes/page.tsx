import Link from "next/link";
import { backendRequest } from "@/lib/backend-api";
import { requireAdmin } from "@/lib/auth/authorization";
import { ProgrammeManager } from "@/components/cms/ProgrammeManager";
import { WebsiteManager } from "@/components/cms/WebsiteManager";
import { VisualWebsiteManager } from "@/components/cms/VisualWebsiteManager";

export const metadata = { title: "Quản lý chuyên ngành" };
export default async function Page({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
  const admin = await requireAdmin();
  const can = (permission: string) => admin.role.code === "SUPER_ADMIN" || admin.permissionCodes.includes(permission);
  if (!can("website.view")) return <div className="admin-page"><h1>Bạn không có quyền quản lý chuyên ngành.</h1></div>;
  const data = await backendRequest<Parameters<typeof WebsiteManager>[0]>("/api/admin/website/pages").catch(() => null);
  if (!data) return <div className="admin-page"><h1>Quản lý chuyên ngành</h1><p role="alert">Chưa tải được danh sách. Hãy kiểm tra kết nối và tải lại.</p></div>;
  const pages = data.pages.filter((page) => page.id.startsWith("programme:"));
  const { id } = await searchParams;
  const selected = id ? pages.find((page) => page.id === id) : undefined;
  return <div className="admin-page admin-page--cms">
    <header className="admin-page__head"><div><span className="eyebrow">CMS / CHUYÊN NGÀNH</span><h1>Quản lý chuyên ngành</h1><p>Tạo và quản lý từng chuyên ngành trên template chung. Nội dung mới được lưu nháp trước khi xuất bản.</p></div></header>
    {id ? selected ? <><Link href="/admin/programmes">← Danh sách chuyên ngành</Link><VisualWebsiteManager key={selected.id} pages={[selected]} canEdit={can("website.update")} canPublish={can("website.publish")} canUpload={can("media.upload")} /></> : <p role="alert">Không tìm thấy chuyên ngành. <Link href="/admin/programmes">Quay lại danh sách</Link></p> : <ProgrammeManager pages={pages} canEdit={can("website.update")} canPublish={can("website.publish")} canUpload={can("media.upload")} />}
  </div>;
}
