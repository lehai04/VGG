import { sectionMetadata } from "@/features/content/components/SectionPages";
import { NewsLanding } from "@/features/news/components/NewsLanding";
import { getNewsPosts, getPaginatedNewsPosts, newsCategories } from "@/features/news/data";

// PAGE DÙNG TEMPLATE CHUNG: nội dung route lấy từ data/site.ts.
export const metadata = sectionMetadata("news");
export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string; q?: string }>;
}) {
  const filters = await searchParams;
  const requestedCategory = filters.category;
  const activeCategory = newsCategories.some((item) => item.value === requestedCategory)
    ? requestedCategory
    : undefined;
  const query = filters.q?.trim().slice(0, 100) || undefined;
  const requestedPage = Number.parseInt(filters.page ?? "1", 10);
  const page = Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const [{ posts, pagination }, newestPosts] = await Promise.all([
    getPaginatedNewsPosts({ category: activeCategory, q: query, page, limit: 6 }),
    getNewsPosts({ limit: 1 }),
  ]);
  return (
    <NewsLanding
      posts={posts}
      newestPostId={newestPosts[0]?.id}
      activeCategory={activeCategory}
      query={query}
      pagination={pagination}
    />
  );
}
