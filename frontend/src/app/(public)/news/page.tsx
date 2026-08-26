import { sectionMetadata } from "@/features/content/components/SectionPages";
import { NewsLanding } from "@/features/news/components/NewsLanding";
import { getNewsPosts, newsCategories } from "@/features/news/data";

// PAGE DÙNG TEMPLATE CHUNG: nội dung route lấy từ data/site.ts.
export const metadata = sectionMetadata("news");
export default async function NewsPage({ searchParams }: { searchParams: Promise<{ category?: string; q?: string }> }) {
  const filters = await searchParams;
  const requestedCategory = filters.category;
  const activeCategory = newsCategories.some((item) => item.value === requestedCategory) ? requestedCategory : undefined;
  const query = filters.q?.trim().slice(0, 100) || undefined;
  const posts = await getNewsPosts({ category: activeCategory, q: query });
  return <NewsLanding posts={posts} activeCategory={activeCategory} query={query} />;
}
