import { publicSiteOrigin } from "@/lib/public-site";
import { isPublicSectionVisible } from "@/lib/public-sections";
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, CalendarDays, UserRound } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { localizedRedirectPath } from "@/lib/serverLocale";
import { legacyNewsHref } from "@/features/news/links";
import Link from "@/i18n/components/LocalizedLink";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import { categoryLabel, getNewsPost, getNewsPosts } from "@/features/news/data";
import { NewsShare } from "@/features/news/components/NewsShare";
import styles from "@/features/news/components/NewsDetail.module.css";
import { requestCopy, requestLanguage } from "@/i18n/request-copy";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ contentNewsPreview?: string }> };
function canonicalNewsUrl(post: { canonicalUrl?: string | null; slug: string }, locale: string) {
  const base = publicSiteOrigin();
  const fallback = new URL(`/${locale}/news/${post.slug}`, base).toString();
  try {
    const requested = new URL(post.canonicalUrl || fallback, base);
    return requested.origin === new URL(base).origin ? requested.toString() : fallback;
  } catch { return fallback; }
}
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const token=(await searchParams).contentNewsPreview;
  if(token)return {title:"Xem trước tin tức",robots:{index:false,follow:false}};
  const { locale } = await requestLanguage();
  const post = await getNewsPost((await params).slug, undefined, locale);
  if (!post) return {};
  const url = canonicalNewsUrl(post, locale);
  const image = post.ogImage || post.coverImage;
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt || undefined,
    alternates: { canonical: url },
    robots: {
      index: post.robotsIndex !== false,
      follow: post.robotsFollow !== false,
      googleBot: { index: post.robotsIndex !== false, follow: post.robotsFollow !== false, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    openGraph: {
      type: "article",
      locale: locale === "vi" ? "vi_VN" : "en_US",
      siteName: "Viện Sau đại học",
      url,
      title: post.ogTitle || post.metaTitle || post.title,
      description: post.ogDescription || post.metaDescription || post.excerpt || undefined,
      images: image ? [{ url: image, alt: post.ogImageAlt || post.coverImageAlt || post.title }] : undefined,
      publishedTime: post.publishedAt || undefined,
    },
  };
}

export default async function NewsDetailPage({ params, searchParams }: Props) {
  if (!isPublicSectionVisible("/news")) notFound();
  const { slug } = await params;
  const { locale } = await requestLanguage();
  const t = await requestCopy();
  const post = await getNewsPost(slug, (await searchParams).contentNewsPreview, locale);
  if (!post) {
    const legacyHref = legacyNewsHref(slug);
    if (legacyHref) redirect(await localizedRedirectPath(legacyHref));
    notFound();
  }
  const recent = (await getNewsPosts({ limit: 4, locale }))
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);
  const recentDateFormat = new Intl.DateTimeFormat(locale === "en" ? "en-US" : "vi-VN", {
    day: "2-digit",
    month: locale === "en" ? "short" : "2-digit",
    year: "numeric",
  });
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(locale === "en" ? "en-US" : "vi-VN")
    : t("Mới cập nhật", "Recently updated");
  const canonicalUrl = canonicalNewsUrl(post, locale);
  const author = post.authorName || post.author?.fullName || "Viện Sau đại học";
  const publicBase = publicSiteOrigin();
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "NewsArticle", "@id": `${canonicalUrl}#article`, headline: post.title, description: post.metaDescription || post.excerpt || undefined, datePublished: post.publishedAt || undefined, dateModified: post.publishedAt || undefined, author: { "@type": "Person", name: author }, image: post.coverImage ? [new URL(post.coverImage, publicSiteOrigin()).toString()] : undefined, mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl }, publisher: { "@type": "EducationalOrganization", name: "Viện Sau đại học Văn Lang", url: publicSiteOrigin() } },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Trang chủ", item: `${publicBase}/${locale}` }, { "@type": "ListItem", position: 2, name: "Tin tức", item: `${publicBase}/${locale}/news` }, { "@type": "ListItem", position: 3, name: post.title, item: canonicalUrl }] },
      ...(post.customJsonLd ? [post.customJsonLd] : []),
    ],
  };
  return (
    <main className={styles.page} id="main-content">
      <SiteHeader compact />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <article>
        <nav aria-label="Breadcrumb"><Link href="/">{t("Trang chủ", "Home")}</Link> / <Link href="/news">{t("Tin tức", "News")}</Link> / <span>{post.title}</span></nav>
        <header className={styles.articleHeader}>
          <p>{t(categoryLabel(post.category))}</p>
          <h1 lang={post.locale}>{post.title}</h1>
          <div className={styles.infoRow}>
            <div className={styles.meta}>
              <span>
                <UserRound />
                {t("Tác giả", "Author")} <b>{post.authorName || post.author?.fullName || "Viện Sau đại học"}</b>
              </span>
              <time>
                <CalendarDays />
                {t("Ngày đăng", "Published")} <b>{date}</b>
              </time>
            </div>
            <NewsShare title={post.title} />
          </div>
        </header>
        <figure className={styles.cover}>
          <Image
            src={post.coverImage || "/images/pages/news/content/banner.jpg"}
            unoptimized={post.coverImage?.startsWith("/uploads/")}
            alt={post.coverImageAlt || post.title}
            fill
            priority
            sizes="(max-width: 980px) 100vw, 1200px"
          />
        </figure>
        <div className={styles.bodyLayout}>
          <div className={styles.articleBody} lang={post.locale}>
            {locale === "en" && post.locale === "vi" && (
              <p lang="en">English translation unavailable. The original Vietnamese article is shown below.</p>
            )}
            {post.excerpt && (
              <p className={styles.lead}>
                <strong>{post.excerpt}</strong>
              </p>
            )}
            <div className={`${styles.content} cms-rich-content`} dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          <aside className={styles.recent} aria-labelledby="recent-news">
            <h2 id="recent-news">{t("Tin tức gần đây", "Recent news")}</h2>
            {recent.length ? (
              <>
                <div className={styles.recentList}>
                  {recent.map((item) => (
                    <Link
                      className={styles.recentItem}
                      href={item.externalUrl ?? `/news/${item.slug}`}
                      target={item.externalUrl ? "_blank" : undefined}
                      rel={item.externalUrl ? "noopener noreferrer" : undefined}
                      key={item.id}
                    >
                      <figure>
                        <Image
                          src={item.coverImage || "/images/pages/news/content/banner.jpg"}
                          unoptimized={item.coverImage?.startsWith("/uploads/")}
                          alt=""
                          fill
                          sizes="118px"
                        />
                      </figure>
                      <div className={styles.recentCopy}>
                        <span className={styles.recentCategory} data-category={item.category}>
                          {t(categoryLabel(item.category))}
                        </span>
                        <h3 lang={item.locale}>{item.title}</h3>
                        <div className={styles.recentDate}>
                          <CalendarDays aria-hidden="true" />
                          {item.publishedAt ? (
                            <time dateTime={item.publishedAt}>
                              {recentDateFormat.format(new Date(item.publishedAt))}
                            </time>
                          ) : (
                            <span>{t("Mới cập nhật", "Recently updated")}</span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link className={styles.exploreMore} href="/news">
                  {t("Khám phá tất cả", "Explore all news")} <ArrowUpRight aria-hidden="true" />
                </Link>
              </>
            ) : (
              <p className={styles.noRecent}>{t("Chưa có tin tức", "No news yet")}</p>
            )}
          </aside>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
