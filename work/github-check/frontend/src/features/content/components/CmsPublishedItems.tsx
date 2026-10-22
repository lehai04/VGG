import Link from "@/i18n/components/LocalizedLink";

type News = { id: string; slug: string; title: string; excerpt: string | null; coverImage: string | null };
type Resource = { id: string; slug: string; title: string; description: string | null; fileUrl: string };

async function getPublishedItems(section: "news" | "resources") {
  const backend = process.env.BACKEND_INTERNAL_URL;
  if (!backend) return [];

  try {
    const response = await fetch(`${backend}/api/public/${section}`, { next: { revalidate: 60 } });
    if (!response.ok) return [];
    const payload = await response.json();
    return (section === "news" ? payload.data.posts : payload.data.resources) as Array<News | Resource>;
  } catch {
    return [];
  }
}

export async function CmsPublishedItems({ section }: { section: string }) {
  if (section !== "news" && section !== "resources") return null;
  const items = await getPublishedItems(section);
  if (!items.length) return null;

  return (
    <section className="academic-index" aria-label="Nội dung từ CMS">
      {items.map((item, index) => (
        <Link href={section === "news" ? `/news/${item.slug}` : (item as Resource).fileUrl} key={item.id}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <h3>{item.title}</h3>
          <b aria-hidden="true">↗</b>
        </Link>
      ))}
    </section>
  );
}
