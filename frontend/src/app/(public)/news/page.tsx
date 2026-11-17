import { redirect } from "next/navigation";
import { sectionMetadata } from "@/lib/section-metadata";
import { NewsLanding } from "@/features/news/components/NewsLanding";
import { getNewsPosts } from "@/features/news/data";
import { requestLanguage } from "@/i18n/request-copy";
export const metadata = sectionMetadata("news");
export default async function NewsPage({ searchParams }: { searchParams: Promise<{ category?: string; page?: string; q?: string }> }) {
  const filters = await searchParams;
  const { locale } = await requestLanguage();
  const params = new URLSearchParams();
  for (const key of ["category", "page", "q"] as const) if (filters[key]) params.set(key, filters[key]);
  if (params.size) redirect(`/${locale}/news/all?${params}`);
  const [latest, featured] = await Promise.all([getNewsPosts({ limit: 4, locale }), getNewsPosts({ limit: 1, locale, featured: true })]);
  return <NewsLanding posts={[]} latestPosts={latest} featuredPost={featured[0]} pagination={{ page: 1, limit: 4, total: latest.length, totalPages: 1 }} />;
}
