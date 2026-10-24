/** Một bản ghi dùng URL gốc hoặc slug CMS của chính nó, không ghép theo vị trí. */
export function researchPostHref(slug: string) {
  return /^https?:\/\//i.test(slug) ? slug : `/news/${encodeURIComponent(slug)}`;
}
