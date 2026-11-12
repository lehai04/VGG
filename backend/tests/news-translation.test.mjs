import test from "node:test";
import assert from "node:assert/strict";

process.env.DATABASE_URL ??= "postgresql://test:test@localhost:5432/test";
const { newsInput } = await import("../dist/modules/cms/schemas.js");
const source = {
  title: "Triển lãm 2026 tại Trường Đại học Văn Lang",
  excerpt: "Trưng bày 50 sản phẩm và 11 đồ án.",
  authorName: "Phạm Mai Đan Thanh",
  content: '<figure><img src="/uploads/2026.jpg" alt="FD2026" /><figcaption>Phạm Mai Đan Thanh trình bày 3 dự án.</figcaption></figure>',
};

test("editorial English copy is optional and sanitized before storage", () => {
  const article = { ...source, slug: "trien-lam" };
  assert.equal(newsInput.parse(article).enTitle, undefined);
  assert.equal(newsInput.parse({ ...article, enTitle: null, enExcerpt: null, enContent: null }).enContent, null);
  assert.equal(newsInput.safeParse({ ...article, enTitle: "Exhibition 2026" }).success, false);
  const result = newsInput.parse({
    ...article, enTitle: "Exhibition 2026", enExcerpt: "50 products and 11 capstone projects.",
    enContent: '<figure><img src="/uploads/2026.jpg" onerror="bad()"><figcaption>Phạm Mai Đan Thanh presented 3 projects.</figcaption></figure>',
  });
  assert.equal(result.content.includes("trình bày"), true);
  assert.match(result.enContent, /<figcaption>Phạm Mai Đan Thanh presented 3 projects\.<\/figcaption>/);
  assert.match(result.enContent, /src="\/uploads\/2026\.jpg"/);
  assert.doesNotMatch(result.enContent, /onerror/);
});

test("public news uses the stored English copy in listing and detail at the original slug", async () => {
  const { default: Fastify } = await import("fastify");
  const { publicRoutes } = await import("../dist/modules/public/public.routes.js");
  const { prisma } = await import("../dist/shared/database/prisma.js");
  const app = Fastify();
  const post = {
    ...source, id: "article", slug: "trien-lam", locale: "vi", status: "PUBLISHED",
    enTitle: "Exhibition 2026", enExcerpt: "50 products and 11 capstone projects.",
    enContent: "<p>Exhibition details</p>",
  };
  const delegate = prisma.newsPost;
  const methods = { findFirst: delegate.findFirst, findMany: delegate.findMany, count: delegate.count };
  delegate.findFirst = async () => post;
  delegate.findMany = async ({ where }) => {
    assert.ok(where.OR.some((entry) => entry.enTitle?.contains === "Exhibition"));
    return [post];
  };
  delegate.count = async () => 1;
  try {
    await app.register(publicRoutes);
    const detail = (await app.inject("/api/public/news/trien-lam?locale=en")).json().data.post;
    assert.equal(detail.title, post.enTitle);
    assert.equal(detail.excerpt, post.enExcerpt);
    assert.equal(detail.content, post.enContent);
    assert.equal(detail.locale, "en");
    assert.equal(detail.slug, post.slug);
    assert.equal(detail.enContent, undefined);
    const original = (await app.inject("/api/public/news/trien-lam?locale=vi")).json().data.post;
    assert.equal(original.title, source.title);
    assert.equal(original.content, source.content);
    const list = (await app.inject("/api/public/news?locale=en&q=Exhibition")).json().data.posts;
    assert.equal(list[0].title, post.enTitle);
    post.enTitle = null;
    const fallback = (await app.inject("/api/public/news/trien-lam?locale=en")).json().data.post;
    assert.equal(fallback.locale, "vi");
    assert.equal(fallback.title, source.title);
  } finally {
    Object.assign(delegate, methods);
    await app.close();
  }
});
