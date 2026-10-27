import { getDemoNewsPosts } from "./demo-posts";

export const newsCategories = [
  { value: "ADMISSIONS", label: "Tuyển sinh" },
  { value: "VAN_LANG_UNIVERSITY", label: "Trường Đại học Văn Lang" },
  { value: "UNIVERSITY_EVENT", label: "Sự kiện trường" },
  { value: "VAN_LANG_LIFE", label: "Đời sống Văn Lang" },
  { value: "INTERNATIONAL_COOPERATION", label: "Hợp tác quốc tế" },
] as const;
export type NewsPost = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  coverImageAlt?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  canonicalUrl?: string | null;
  robotsIndex?: boolean;
  robotsFollow?: boolean;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: string | null;
  ogImageAlt?: string | null;
  customJsonLd?: Record<string, unknown> | null;
  publishedAt: string | null;
  authorName: string | null;
  externalUrl?: string;
  author?: { fullName: string };
};
export type NewsPagination = { page: number; limit: number; total: number; totalPages: number };
export function categoryLabel(category: string) {
  return newsCategories.find((item) => item.value === category)?.label ?? "Tin tức";
}
export async function getNewsPosts(
  options: { category?: string; limit?: number; q?: string } = {},
) {
  const { posts } = await getPaginatedNewsPosts({ ...options, page: 1, limit: options.limit ?? 30 });
  return posts;
}

/** Published CMS posts come first; demo cards remain available after them. */
export async function getPaginatedNewsPosts(options: {
  category?: string;
  limit: number;
  page: number;
  q?: string;
}) {
  const demos = process.env.VGG_DEMO_NEWS !== "false" ? getDemoNewsPosts(options) : [];
  const backend = process.env.BACKEND_INTERNAL_URL;
  let posts: NewsPost[] = [];
  let backendTotal = 0;
  if (backend) {
    try {
      const params = new URLSearchParams({
        locale: "vi",
        limit: String(options.limit),
        page: String(options.page),
      });
      if (options.category) params.set("category", options.category);
      if (options.q) params.set("q", options.q);
      const response = await fetch(`${backend}/api/public/news?${params}`, {
        cache: "no-store",
      });
      if (!response.ok) throw new Error(`News API returned ${response.status}`);
      const payload = (await response.json()) as {
        data: { posts: NewsPost[]; pagination: NewsPagination };
      };
      posts = payload.data.posts;
      backendTotal = payload.data.pagination.total;
    } catch {
      // Keep the existing demo cards available when the CMS cannot be reached.
    }
  }
  const start = (options.page - 1) * options.limit;
  const demoStart = Math.max(0, start - backendTotal);
  const remaining = Math.max(0, options.limit - posts.length);
  const total = backendTotal + demos.length;
  return {
    posts: [...posts, ...demos.slice(demoStart, demoStart + remaining)],
    pagination: { page: options.page, limit: options.limit, total, totalPages: Math.ceil(total / options.limit) },
  };
}
export async function getNewsPost(slug: string, previewToken?: string) {
  const backend = process.env.BACKEND_INTERNAL_URL;
  if (!backend) return null;
  try {
    if (previewToken && !/^[a-f0-9]{64}$/.test(previewToken)) return null;
    const response = await fetch(previewToken ? `${backend}/api/public/news-preview` : `${backend}/api/public/news/${encodeURIComponent(slug)}`, {
      cache: "no-store",
      ...(previewToken ? { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ token: previewToken }) } : {}),
    });
    if (!response.ok) return null;
    const payload = (await response.json()) as { data: { post: NewsPost } };
    return payload.data.post.slug === slug ? payload.data.post : null;
  } catch {
    return null;
  }
}
