import { NewsEditor } from "@/components/cms/NewsEditor";
import { requireAdmin } from "@/lib/auth/authorization";

export const metadata = { title: "Đăng tin tức mới - VGG Admin" };

export default async function CreateNewsPage() {
  const admin = await requireAdmin();

  return (
    <div className="admin-page news-admin-page">
      <NewsEditor authorName={admin.fullName} />
    </div>
  );
}
