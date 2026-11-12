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
  posts,
  newestPostId,
  activeCategory,
  query,
  pagination,
}: {
  posts: NewsPost[];
  newestPostId?: string;
  activeCategory?: string;
  query?: string;
  pagination: NewsPagination;
}) {
  const t = await requestCopy();
  const { locale } = await requestLanguage();
  const categoryHref = (value?: string) => {
    const params = new URLSearchParams();
    if (value) params.set("category", value);
    if (query) params.set("q", query);
    return `/news${params.size ? `?${params}` : ""}`;
  };
  const pageHref = (page: number) => {
    const params = new URLSearchParams();
    if (activeCategory) params.set("category", activeCategory);
    if (query) params.set("q", query);
    if (page > 1) params.set("page", String(page));
    return `/news${params.size ? `?${params}` : ""}`;
  };
  return (
    <main className={styles.page} id="main-content">
      <SiteHeader compact />
      <nav className={styles.breadcrumb} aria-label={t("Đường dẫn")}>
        <Link href="/">{t("Trang chủ")}</Link>
        <span>/</span>
        <b>{t("Tin tức & Sự kiện")}</b>
      </nav>
      <header data-site-banner className={styles.hero} data-reveal>
        <Image
          src="/images/pages/news/content/banner.jpg"
          alt="Tin tức và sự kiện Viện Sau đại học"
          fill
          priority
          sizes="100vw"
        />
        <div className={styles.heroShade} />
        <div data-banner-copy className={styles.heroCopy}>
          <p data-banner-label>NEWS &amp; EVENTS</p>
          <h1 data-banner-title>{t("TIN TỨC & SỰ KIỆN")}</h1>
          <span data-banner-description>
            {t("Nơi cập nhật thông tin tuyển sinh, hoạt động học thuật, đời sống Văn Lang và những kết nối quốc tế mới nhất.")}
          </span>
        </div>
      </header>
      <section className={styles.controls} aria-label={t("Tìm kiếm và lọc tin tức")}>
        <form action={`/${locale}/news`} method="get">
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
            <h2 id="news-results">{query ? `${t("Kết quả cho")} “${query}”` : t("Bài viết mới nhất")}</h2>
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
            href="/news"
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
      <SiteFooter />
    </main>
  );
}
