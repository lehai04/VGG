import 'dotenv/config';
import { randomBytes } from 'node:crypto';
import { PrismaClient, Prisma, ResourceType, ResourceDocumentType } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pages from '../src/modules/cms/page-defaults.json' with { type: 'json' };
import { contentFields } from '../src/modules/cms/content-patch.js';
import { demoResources } from '../../frontend/src/features/resources/demo-resources.js';
import { demoNewsPosts } from '../../frontend/src/features/news/demo-posts.js';

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required');
const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });
const authorId = 'public-release-content-author';
try {
  await db.$transaction(async (tx) => {
    const role = await tx.role.upsert({ where: { code: 'PUBLIC_CONTENT_OWNER' }, update: {}, create: {
      id: 'public-release-role', code: 'PUBLIC_CONTENT_OWNER', name: 'Public content provenance', level: -100,
    } });
    // The historical schema requires an author FK. This locked record cannot log in.
    await tx.admin.upsert({ where: { id: authorId }, update: {}, create: {
      id: authorId, username: 'public-release-content', fullName: 'Viện Sau đại học',
      passwordHash: `disabled:${randomBytes(32).toString('hex')}`, status: 'LOCKED', roleId: role.id,
    } });
    for (const page of pages) for (const locale of page.locales) {
      const key = `cms.published.${locale}.${page.id}`;
      await tx.siteContent.upsert({ where: { key }, update: {}, create: {
        key, locale, page: page.path, section: 'public-release', title: page.title,
        value: Object.fromEntries(contentFields(page.defaults).map(f => [f.path, f.value])),
        published: true, authorId,
      } });
    }
    for (const resource of demoResources) {
      await tx.resourceCategory.upsert({ where: { name: resource.category.name }, update: {}, create: resource.category });
      const category = await tx.resourceCategory.findUniqueOrThrow({ where: { name: resource.category.name } });
      const { category: _category, id, issueDate, publishedAt, resourceType, documentType, ...data } = resource;
      await tx.resourceFile.upsert({ where: { slug: resource.slug }, update: {}, create: {
        ...data, id, authorId, categoryId: category.id, resourceType: resourceType as ResourceType,
        documentType: documentType as ResourceDocumentType | null,
        issueDate: issueDate ? new Date(issueDate) : null,
        publishedAt: publishedAt ? new Date(publishedAt) : null, status: 'PUBLISHED',
      } });
    }
    for (const post of demoNewsPosts) {
      const escape = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
      // Preserve supplied summaries and provenance; do not invent full article text.
      await tx.newsPost.upsert({ where: { slug: post.slug }, update: {}, create: {
        id: post.id, slug: post.slug, title: post.title, category: post.category,
        excerpt: post.excerpt, coverImage: post.coverImage, authorName: post.authorName,
        authorId, status: 'PUBLISHED', publishedAt: post.publishedAt ? new Date(post.publishedAt) : null,
        content: `<p>${escape(post.excerpt || '')}</p><p><a href="${escape(post.externalUrl!)}" target="_blank" rel="noopener noreferrer">Đọc bài gốc trên website Đại học Văn Lang</a></p>`,
      } });
    }
  }, { timeout: 120000 });
  console.log(JSON.stringify({ pages: await db.siteContent.count(), news: await db.newsPost.count(), resources: await db.resourceFile.count() }));
} finally { await db.$disconnect(); }
