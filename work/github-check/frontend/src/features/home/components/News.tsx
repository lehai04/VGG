import Image from "next/image";
import Link from "@/i18n/components/LocalizedLink";
import { categoryLabel, getNewsPosts } from "@/features/news/data";

/** Các bài mới nhất, gồm liên kết ngoài khi bật bản demo. */
export async function News() {
  const posts = await getNewsPosts({ limit: process.env.VGG_DEMO_NEWS !== "false" ? 4 : 3 });

  return (
    <section className="newsSection" id="news">
      <div className="newsHeading">
        <div>
          <p>NEWS &amp; EVENTS</p>
          <h2>
            Tin tức <em>&amp; Sự kiện</em>
          </h2>
        </div>
        <Link href="/news">
          Xem thêm <span>↗</span>
        </Link>
      </div>
      <div className={`newsGrid${posts.length === 4 ? " newsGrid--four" : ""}`}>
        {posts.map((post) => (
          <article className="newsCard" key={post.id}>
            <Link className="newsMedia" href={post.externalUrl ?? `/news/${post.slug}`} target={post.externalUrl ? "_blank" : undefined} rel={post.externalUrl ? "noopener noreferrer" : undefined}>
              <Image
                src={post.coverImage || "/images/pages/news/content/banner.jpg"}
                unoptimized={Boolean(post.externalUrl) || post.coverImage?.startsWith("/uploads/")}
                alt={post.title}
                fill
                sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw"
              />
              <span>{categoryLabel(post.category)}</span>
            </Link>
            <small>
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString("vi-VN")
                : "Mới cập nhật"}
            </small>
            <h3><Link href={post.externalUrl ?? `/news/${post.slug}`} target={post.externalUrl ? "_blank" : undefined} rel={post.externalUrl ? "noopener noreferrer" : undefined}>{post.title}</Link></h3>
            {post.excerpt && <p>{post.excerpt}</p>}
            <Link className="newsReadMore" href={post.externalUrl ?? `/news/${post.slug}`} target={post.externalUrl ? "_blank" : undefined} rel={post.externalUrl ? "noopener noreferrer" : undefined}>
              Đọc bài viết <span>→</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
