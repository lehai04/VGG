import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, CalendarDays, UserRound } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "@/i18n/components/LocalizedLink";
import { SiteHeader } from "@/shared/components/layout/SiteHeader";
import { SiteFooter } from "@/shared/components/layout/SiteFooter";
import { categoryLabel, getNewsPost, getNewsPosts } from "@/features/news/data";
import { NewsShare } from "@/features/news/components/NewsShare";
import styles from "@/features/news/components/NewsDetail.module.css";

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getNewsPost((await params).slug);
  return post
    ? {
        title: post.title,
        description: post.excerpt,
        openGraph: {
          title: post.title,
          description: post.excerpt ?? undefined,
          images: post.coverImage ? [post.coverImage] : undefined,
        },
      }
    : {};
}

export default async function NewsDetailPage({ params }: Props) {
  const post = await getNewsPost((await params).slug);
  if (!post) notFound();
  const recent = (await getNewsPosts({ limit: 6 }))
    .filter((item) => item.slug !== post.slug)
    .slice(0, 5);
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("vi-VN")
    : "Mới cập nhật";
  return (
    <main className={styles.page} id="main-content">
      <SiteHeader compact />
      <article>
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
            alt={post.title}
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
                    <Link href={`/news/${item.slug}`} key={item.id}>
                      <figure>
                        <Image
                          src={item.coverImage || "/images/pages/news/content/banner.jpg"}
                          unoptimized={item.coverImage?.startsWith("/uploads/")}
                          alt={item.title}
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
