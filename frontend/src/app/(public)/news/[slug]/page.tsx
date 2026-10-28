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
import { headers } from "next/headers";
import { defaultLocale, isLocale } from "@/lib/i18n";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ contentNewsPreview?: string }> };
function canonicalNewsUrl(post: { canonicalUrl?: string | null; slug: string }, locale: string) {
  const base = process.env.PUBLIC_APP_URL || "https://vgg.vlu.edu.vn";
  const fallback = new URL(`/${locale}/news/${post.slug}`, base).toString();
  try {
    const requested = new URL(post.canonicalUrl || fallback, base);
    return requested.origin === new URL(base).origin ? requested.toString() : fallback;
  } catch { return fallback; }
}
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const token=(await searchParams).contentNewsPreview;
  if(token)return {title:"Xem trước tin tức",robots:{index:false,follow:false}};
  const post = await getNewsPost((await params).slug);
  if (!post) return {};
  const requestHeaders = await headers();
  const headerLocale = requestHeaders.get("x-vgg-locale");
  const locale = isLocale(headerLocale) ? headerLocale : defaultLocale;
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
      siteName: "Van Lang Global Graduate",
      url,
      title: post.ogTitle || post.metaTitle || post.title,
      description: post.ogDescription || post.metaDescription || post.excerpt || undefined,
      images: image ? [{ url: image, alt: post.ogImageAlt || post.coverImageAlt || post.title }] : undefined,
      publishedTime: post.publishedAt || undefined,
    },
  };
}

export default async function NewsDetailPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const post = await getNewsPost(slug, (await searchParams).contentNewsPreview);
  if (!post) {
    const legacyHref = legacyNewsHref(slug);
    if (legacyHref) redirect(await localizedRedirectPath(legacyHref));
    notFound();
  }
  const recent = (await getNewsPosts({ limit: 6 }))
    .filter((item) => item.slug !== post.slug)
    .slice(0, 5);
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("vi-VN")
    : "Mới cập nhật";
  const requestHeaders = await headers();
  const headerLocale = requestHeaders.get("x-vgg-locale");
  const locale = isLocale(headerLocale) ? headerLocale : defaultLocale;
  const canonicalUrl = canonicalNewsUrl(post, locale);
  const author = post.authorName || post.author?.fullName || "Viện Sau Đại học";
  const publicBase = (process.env.PUBLIC_APP_URL || "https://vgg.vlu.edu.vn").replace(/\/$/, "");
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "NewsArticle", "@id": `${canonicalUrl}#article`, headline: post.title, description: post.metaDescription || post.excerpt || undefined, datePublished: post.publishedAt || undefined, dateModified: post.publishedAt || undefined, author: { "@type": "Person", name: author }, image: post.coverImage ? [new URL(post.coverImage, process.env.PUBLIC_APP_URL || "https://vgg.vlu.edu.vn").toString()] : undefined, mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl }, publisher: { "@type": "EducationalOrganization", name: "Viện Sau Đại học Văn Lang", url: process.env.PUBLIC_APP_URL || "https://vgg.vlu.edu.vn" } },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Trang chủ", item: `${publicBase}/${locale}` }, { "@type": "ListItem", position: 2, name: "Tin tức", item: `${publicBase}/${locale}/news` }, { "@type": "ListItem", position: 3, name: post.title, item: canonicalUrl }] },
      ...(post.customJsonLd ? [post.customJsonLd] : []),
    ],
  };
  return (
    <main className={styles.page} id="main-content">
      <SiteHeader compact />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <article>
        <nav aria-label="Breadcrumb"><Link href="/">Trang chủ</Link> / <Link href="/news">Tin tức</Link> / <span>{post.title}</span></nav>
        <header className={styles.articleHeader}>
          <p>{categoryLabel(post.category)}</p>
          <h1>{post.title}</h1>
          <div className={styles.infoRow}>
            <div className={styles.meta}>
              <span>
                <UserRound />
                Tác giả <b>{post.authorName || post.author?.fullName || "Viện Sau Đại học"}</b>
              </span>
              <time>
                <CalendarDays />
                Ngày đăng <b>{date}</b>
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
          <div className={styles.articleBody}>
            {post.excerpt && (
              <p className={styles.lead}>
                <strong>{post.excerpt}</strong>
              </p>
            )}
            <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          <aside className={styles.recent} aria-labelledby="recent-news">
            <h2 id="recent-news">Tin tức gần đây</h2>
            {recent.length ? (
              <>
                <div>
                  {recent.map((item) => (
                    <Link
                      href={item.externalUrl ?? `/news/${item.slug}`}
                      target={item.externalUrl ? "_blank" : undefined}
                      rel={item.externalUrl ? "noopener noreferrer" : undefined}
                      key={item.id}
                    >
                      <figure>
                        <Image
                          src={item.coverImage || "/images/pages/news/content/banner.jpg"}
                          unoptimized={item.coverImage?.startsWith("/uploads/")}
                          alt={item.coverImageAlt || item.title}
                          fill
                          sizes="150px"
                        />
                      </figure>
                      <div>
                        <p>{categoryLabel(item.category)}</p>
                        <h3>{item.title}</h3>
                        <time>
                          {item.publishedAt
                            ? new Date(item.publishedAt).toLocaleDateString("vi-VN")
                            : "Mới cập nhật"}
                        </time>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link className={styles.exploreMore} href="/news">
                  Khám phá tất cả <ArrowUpRight />
                </Link>
              </>
            ) : (
              <p className={styles.noRecent}>Chưa có tin tức</p>
            )}
          </aside>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
