import test from "node:test";
import assert from "node:assert/strict";
process.env.DATABASE_URL ??= "postgresql://test:test@localhost:5432/test";

test("featured flag accepts booleans only and defaults to ordinary news", async () => {
  const { newsInput } = await import("../dist/modules/cms/schemas.js");
  const post = { title: "Featured article", slug: "featured-article", authorName: "Test editor", excerpt: "Featured article excerpt", content: "<p>Article content for the featured news test</p>" };
  assert.equal(newsInput.parse(post).isFeatured, false);
  assert.equal(newsInput.parse({ ...post, isFeatured: true }).isFeatured, true);
  assert.equal(newsInput.safeParse({ ...post, isFeatured: "false" }).success, false);
});

test("featured public query filters published articles independently of pagination", async () => {
  const { default: Fastify } = await import("fastify");
  const { publicRoutes } = await import("../dist/modules/public/public.routes.js");
  const { prisma } = await import("../dist/shared/database/prisma.js");
  const original = { findMany: prisma.newsPost.findMany, count: prisma.newsPost.count };
  prisma.newsPost.findMany = async ({ where }) => {
    assert.equal(where.status, "PUBLISHED");
    assert.equal(where.isFeatured, true);
    return [{ id: "featured", title: "VI title", locale: "vi", isFeatured: true, enTitle: "EN title", enExcerpt: "Excerpt", enContent: "<p>Content</p>" }];
  };
  prisma.newsPost.count = async () => 1;
  const app = Fastify();
  try {
    await app.register(publicRoutes);
    const response = await app.inject("/api/public/news?featured=true&locale=en&limit=1");
    assert.equal(response.statusCode, 200);
    assert.equal(response.json().data.posts[0].isFeatured, true);
    assert.equal(response.json().data.posts[0].title, "EN title");
  } finally {
    Object.assign(prisma.newsPost, original);
    await app.close();
  }
});

