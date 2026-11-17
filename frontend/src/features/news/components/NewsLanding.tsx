import { requestCopy, requestLanguage } from "@/i18n/request-copy";
import { EmptyContent } from "@/shared/components/EmptyContent";
import Image from "next/image";
import { ArrowRight, Search, UserRound } from "lucide-react";
import Link from "@/i18n/components/LocalizedLink";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import { categoryLabel, newsCategories, type NewsPagination, type NewsPost } from "../data";
import styles from "./NewsLanding.module.css";

export async function NewsLanding({
  listingOnly = false,
  posts,
  featuredPost,
  latestPosts,
  newestPostId,
  activeCategory,
  query,
  pagination,
}: {
  listingOnly?: boolean;
  posts: NewsPost[];
  featuredPost?: NewsPost;
  latestPosts: NewsPost[];
  newestPostId?: string;
  activeCategory?: string;
  query?: string;
  pagination: NewsPagination;
}) {
  const t = await requestCopy();
  const { locale } = await requestLanguage();
  const lead = featuredPost ?? latestPosts[0];
  const latest = latestPosts.filter(post => post.id !== lead?.id).slice(0, 3);
  const copy = (vi: string, en: string) => locale === "en" ? en : vi;
  const postLink = (post: NewsPost) => post.externalUrl ?? `/news/${post.slug}`;
  const categoryHref = (value?: string) => {
    const params = new URLSearchParams();
    if (value) params.set("category", value);
    if (query) params.set("q", query);
    return `/news/all${params.size ? `?${params}` : ""}`;
  };
  const pageHref = (page: number) => {
    const params = new URLSearchParams();
    if (activeCategory) params.set("category", activeCategory);
    if (query) params.set("q", query);
    if (page > 1) params.set("page", String(page));
    return `/news/all${params.size ? `?${params}` : ""}`;
  };
  return (
    <main className={styles.page} id="main-content">
      <SiteHeader compact />
      {!listingOnly && lead && (
        <section className={styles.spotlight}>
          <p className={styles.eyebrow}>{copy("Tất cả bài viết", "All articles")}</p>
          <h1>{copy("Bài viết mới nhất", "Latest articles")}</h1>
          <div className={styles.spotlightGrid}>
            <Link className={styles.featureCard} href={postLink(lead)}>
              <Image src={lead.coverImage || "/images/pages/news/content/banner.jpg"} alt={lead.coverImageAlt || lead.title} fill priority sizes="(max-width: 900px) 100vw, 58vw" unoptimized={Boolean(lead.externalUrl) || lead.coverImage?.startsWith("/uploads/")} />
              <div className={styles.featureCopy}>
                {featuredPost && <span>{copy("Tin nổi bật", "Featured")}</span>}
                <h2>{lead.title}</h2>
                {lead.excerpt && <p>{lead.excerpt}</p>}
                <b>{copy("Đọc bài viết", "Read article")} <ArrowRight size={22}/></b>
              </div>
            </Link>
            <aside className={styles.latest}>
              <h2>{copy("Tin mới nhất", "Latest news")}</h2>
              {latest.map(post => <Link className={styles.latestCard} key={post.id} href={postLink(post)}>
                <figure><Image src={post.coverImage || "/images/pages/news/content/banner.jpg"} alt={post.coverImageAlt || post.title} fill sizes="(max-width: 600px) 30vw, 220px" unoptimized={Boolean(post.externalUrl) || post.coverImage?.startsWith("/uploads/")}/></figure>
                <div><h3>{post.title}</h3><p><UserRound size={16}/><span>{post.authorName || post.author?.fullName || copy("Viện Sau đại học", "Institute of Postgraduate Education")}{post.publishedAt && ` · ${new Date(post.publishedAt).toLocaleDateString(locale === "en" ? "en-US" : "vi-VN")}`}</span></p></div>
              </Link>)}
              <Link className={styles.allNews} href="/news/all">{copy("Xem tất cả tin tức", "View all news")} <ArrowRight/></Link>
            </aside>
          </div>
        </section>
      )}
      {!listingOnly && !lead && <section className={styles.spotlight}><h1>{copy("Tin tức", "News")}</h1><EmptyContent title={copy("Nội dung đang được cập nhật", "News is being updated")} description={copy("Vui lòng quay lại sau để xem tin mới nhất.", "Please check back for the latest news.")} /></section>}
      {listingOnly && <>
      <nav className={styles.breadcrumb} aria-label={copy("Đường dẫn", "Breadcrumb")}><Link href="/news">{copy("Tin tức", "News")}</Link><span>/</span><b>{copy("Tất cả tin tức", "All news")}</b></nav>
      <section id="all-news" className={styles.controls} aria-label={t("Tìm kiếm và lọc tin tức")}>
        <form action={`/${locale}/news/all`} method="get">
          <Search />
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder={t("Tìm kiếm theo tiêu đề bài viết...")}
          />
          <button type="submit">{t("Tìm kiếm")}</button>
          {activeCategory && <input type="hidden" name="category" value={activeCategory} />}
        </form>
        <nav className={styles.tags} aria-label={t("Lọc tin theo chuyên mục")}>
          <Link className={!activeCategory ? styles.activeTag : undefined} href={categoryHref()}>
            {t("Tất cả")}
          </Link>
          {newsCategories.map((category) => (
            <Link
              className={activeCategory === category.value ? styles.activeTag : undefined}
              href={categoryHref(category.value)}
              key={category.value}
            >
              {t(category.label)}
            </Link>
          ))}
        </nav>
      </section>
      <section className={styles.results} aria-labelledby="news-results">
        <header>
          <div>
            <p>{t(activeCategory ? categoryLabel(activeCategory) : "Tất cả bài viết")}</p>
            <h1 id="news-results">{query ? `${t("Kết quả cho")} “${query}”` : copy("Tất cả tin tức", "All news")}</h1>
          </div>
          <span>{pagination.total} {locale === "en" ? (pagination.total === 1 ? "article" : "articles") : "bài viết"}</span>
        </header>
        {posts.length ? (
          <div className={styles.grid}>
            {posts.map((post) => (
              <Link href={post.externalUrl ?? `/news/${post.slug}`} target={post.externalUrl ? "_blank" : undefined} rel={post.externalUrl ? "noopener noreferrer" : undefined} key={post.id} data-reveal>
                <figure>
                  <Image
                    src={post.coverImage || "/images/pages/news/content/banner.jpg"}
                    unoptimized={Boolean(post.externalUrl) || post.coverImage?.startsWith("/uploads/")}
                    alt={post.coverImageAlt || post.title}
                    fill
                    sizes="(max-width:760px) 100vw,33vw"
                  />
                  <span className={styles.categoryBadge}>{t(categoryLabel(post.category))}</span>
                  {post.id === newestPostId && <strong className={styles.newBadge}>NEW</strong>}
                </figure>
                <div className={styles.cardBody}>
                  <h3 className="type-card-title">{t(post.title)}</h3>
                  <div className={styles.byline}>
                    <UserRound />
                    <b>{t(post.authorName || post.author?.fullName || "Viện Sau đại học")}</b>
                    <i>·</i>
                    <time>
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString(locale === "en" ? "en-US" : "vi-VN")
                        : t("Mới cập nhật")}
                    </time>
                  </div>
                  {post.excerpt && <p>{t(post.excerpt)}</p>}
                  <b className={styles.readMore}>
                    {t("Đọc bài viết")} <ArrowRight />
                  </b>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.emptyContainer}><EmptyContent
            title={t("Không tìm thấy bài viết")}
            description={t(query || activeCategory || pagination.page > 1
              ? 'Hãy thử từ khóa khác hoặc chọn “Tất cả” để xem những nội dung mới nhất.'
              : 'Nội dung đang được cập nhật. Vui lòng quay lại sau để xem những bài viết mới nhất.')}
            href="/news/all"
            actionLabel={query || activeCategory || pagination.page > 1 ? t("Xem tất cả bài viết") : undefined}
          /></div>
        )}
        {pagination.totalPages > 1 && (
          <nav className={styles.pagination} aria-label={t("Phân trang tin tức")}>
            <Link
              className={pagination.page === 1 ? styles.disabledPage : undefined}
              href={pageHref(Math.max(1, pagination.page - 1))}
              aria-disabled={pagination.page === 1}
            >
              ‹ <span>{t("Trước")}</span>
            </Link>
            {Array.from({ length: pagination.totalPages }, (_, index) => index + 1).map((page) => (
              <Link
                className={page === pagination.page ? styles.activePage : undefined}
                href={pageHref(page)}
                aria-current={page === pagination.page ? "page" : undefined}
                key={page}
              >
                {page}
              </Link>
            ))}
            <Link
              className={
                pagination.page === pagination.totalPages ? styles.disabledPage : undefined
              }
              href={pageHref(Math.min(pagination.totalPages, pagination.page + 1))}
              aria-disabled={pagination.page === pagination.totalPages}
            >
              <span>{t("Sau")}</span> ›
            </Link>
          </nav>
        )}
      </section>
      </>}
      <SiteFooter />
    </main>
  );
}
