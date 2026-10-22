import { NewsManager } from "@/components/cms/NewsManager";
import { backendRequest } from "@/lib/backend-api";
import { requireAdmin } from "@/lib/auth/authorization";
export const metadata = { title: "Quản lý tin tức" };
type Post = Parameters<typeof NewsManager>[0]["posts"][number];
export default async function Page() { const admin = await requireAdmin(); const { posts } = await backendRequest<{ posts: Post[] }>("/api/admin/news"); return <div className="admin-page news-admin-page"><header className="admin-page__head"><div><span className="eyebrow">CMS / NEWS</span><h1>Tin tức &amp; Sự kiện</h1><p>Tạo, biên tập, lưu nháp và xuất bản nội dung lên website.</p></div></header><NewsManager posts={posts} authorName={admin.fullName} /></div>; }
