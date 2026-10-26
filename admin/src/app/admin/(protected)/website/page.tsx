import { WebsiteManager } from "@/components/cms/WebsiteManager";
import { VisualWebsiteManager } from "@/components/cms/VisualWebsiteManager";
import { CmsManager } from "@/components/cms/CmsManager";
import { backendRequest } from "@/lib/backend-api";
import { requireAdmin } from "@/lib/auth/authorization";

export const metadata = { title: "Quản lý nội dung website" };
export default async function Page() {
  const admin = await requireAdmin();
  const can = (permission: string) =>
    admin.role.code === "SUPER_ADMIN" ||
    admin.permissionCodes.includes(permission);
  if (!can("website.view"))
    return (
      <div className="admin-page">
        <h1>Bạn không có quyền quản lý nội dung website.</h1>
      </div>
    );
  const result = await Promise.all([
    backendRequest<Parameters<typeof WebsiteManager>[0]>(
      "/api/admin/website/pages",
    ),
    backendRequest<{
      contents: Array<Record<string, unknown> & { id: string }>;
    }>("/api/admin/site-content"),
  ]).catch(() => null);
  if (!result)
    return (
      <div className="admin-page">
        <h1>Quản lý nội dung website</h1>
        <p role="alert">
          Chưa kết nối được API nội dung. Hãy kiểm tra backend và PostgreSQL rồi
          tải lại trang. Nội dung công khai hiện tại được giữ nguyên.
        </p>
      </div>
    );
  const [data, settings] = result;
  return (
    <div className="admin-page admin-page--cms">
      <header className="admin-page__head">
        <div>
          <span className="eyebrow">CMS / WEBSITE</span>
          <h1>Quản lý nội dung website</h1>
          <p>
            Chọn trang, sửa từng phần, lưu bản nháp và xem trước trước khi xuất
            bản. Tin tức và tài liệu tiếp tục được quản lý trong các mục hiện
            có.
          </p>
        </div>
      </header>
      <VisualWebsiteManager
        pages={data.pages.filter((page) => !page.id.startsWith("programme:"))}
        canEdit={can("website.update")}
        canPublish={can("website.publish")}
        canUpload={can("media.upload")}
      />
      {can("website.update") && (
        <details className="admin-card" style={{ marginTop: 24 }}>
          <summary>Cấu hình kỹ thuật nâng cao</summary>
          <p>
            Dành cho cấu hình kỹ thuật đã có. Chỉnh sửa SEO bằng form SEO trên
            trang; không dùng mục này để sửa nội dung thân trang.
          </p>
          <CmsManager
            endpoint="site-content"
            kind="site"
            items={settings.contents.filter(
              (item) =>
                !String(item.section).startsWith("cms-") &&
                item.section !== "seo",
            )}
            fields={[
              {
                name: "key",
                label: "Khóa duy nhất (vd: seo.vi.discover)",
                required: true,
              },
              {
                name: "locale",
                label: "Ngôn ngữ",
                type: "select",
                options: ["vi", "en"],
              },
              {
                name: "section",
                label: "Chuyên mục (SEO: seo)",
                required: true,
              },
              {
                name: "page",
                label: "Đường dẫn (vd: /discover)",
                required: true,
              },
              { name: "title", label: "Tên cấu hình" },
              {
                name: "value",
                label: "Cấu hình JSON",
                type: "json",
                required: true,
              },
            ]}
          />
        </details>
      )}
    </div>
  );
}
