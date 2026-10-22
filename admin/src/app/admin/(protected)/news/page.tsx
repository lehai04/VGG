import { NewsList, NewsPostItem } from "@/components/cms/NewsList";
import { backendRequest } from "@/lib/backend-api";
import { requireAdmin } from "@/lib/auth/authorization";

export const metadata = { title: "Danh sách tin tức - VGG Admin" };

export default async function Page() {
  await requireAdmin();
  const { posts } = await backendRequest<{ posts: NewsPostItem[] }>("/api/admin/news");

  return (
    <div className="admin-page news-admin-page">
      <NewsList posts={posts} />
    </div>
  );
}
