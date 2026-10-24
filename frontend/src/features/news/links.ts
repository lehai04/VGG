/** Các URL chuyên mục cũ vẫn có trong navigation data; không giả làm slug bài viết. */
export function legacyNewsHref(slug: string): string | undefined {
  if (slug === "su-kien") return "/news?category=UNIVERSITY_EVENT";
  if (
    ["tin-tuc", "seminar-webinar", "thong-cao-bao-chi", "thu-vien-hinh-anh", "video"].includes(slug)
  )
    return "/news";
  return undefined;
}
