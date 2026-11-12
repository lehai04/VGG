import { sectionMetadata } from "@/lib/section-metadata";
import { NewsLanding } from "@/features/news/components/NewsLanding";
import { newsCategories, getPaginatedNewsPosts, getNewsPosts } from "@/features/news/data";
import { requestLanguage } from "@/i18n/request-copy";

// PAGE DÙNG TEMPLATE CHUNG: nội dung route lấy từ data/site.ts.
export const metadata = sectionMetadata("news");
export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string; q?: string }>;
}) {
  const filters = await searchParams;
  const { locale } = await requestLanguage();
  const requestedCategory = filters.category;
  const activeCategory = newsCategories.some((item) => item.value === requestedCategory)
    ? requestedCategory
    : undefined;
  const query = filters.q?.trim().slice(0, 100) || undefined;
  const requestedPage = Number(filters.page ?? 1);
  const page = Number.isSafeInteger(requestedPage) && requestedPage > 0 && requestedPage <= 100000 ? requestedPage : 1;
  const [listing, latest] = await Promise.all([
    getPaginatedNewsPosts({ category: activeCategory, q: query, page, limit: 6, locale }),
    getNewsPosts({ limit: 1, locale }),
  ]);
  return (
    <NewsLanding
      posts={listing.posts}
      newestPostId={latest[0]?.id}
      activeCategory={activeCategory}
      query={query}
      pagination={listing.pagination}
    />
  );
}
