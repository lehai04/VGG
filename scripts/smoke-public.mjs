import assert from 'node:assert/strict';
import { readFile, writeFile, unlink } from 'node:fs/promises';
import { prisma } from '../backend/dist/shared/database/prisma.js';

if (process.env.ALLOW_PUBLIC_SMOKE !== 'true') throw new Error('Run only against an isolated test database with ALLOW_PUBLIC_SMOKE=true');
const marker = '/tmp/vgg-public-smoke.json';
const phase = process.argv[2] || 'create';
try {
  if (phase === 'create') {
    const tables = await prisma.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename <> '_prisma_migrations' ORDER BY tablename`;
    assert.deepEqual(tables.map(row => row.tablename), ['consultation_history', 'consultations', 'news_posts', 'page_visits', 'resource_categories', 'resource_files', 'site_contents']);
    for (const path of ['/vi', '/en', '/vi/programmes', '/vi/admissions', '/vi/news', '/vi/resources']) {
      const response = await fetch(`http://frontend:3000${path}`);
      assert.equal(response.status, 200, path);
      assert.ok((await response.text()).length > 1000, path);
    }
    for (const path of ['/api/public/news', '/api/public/resources', '/api/public/site-content?locale=vi']) {
      const response = await fetch(`http://127.0.0.1:4000${path}`);
      assert.equal(response.status, 200, path);
      assert.equal((await response.json()).success, true);
    }
    const email = `smoke-${Date.now()}@example.invalid`;
    const response = await fetch('http://frontend:3000/api/consultations', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: 'Public release smoke test', phone: '0900000000', email, consent: true, programme: 'Kiểm thử bàn giao' }),
    });
    assert.equal(response.status, 201, await response.text());
    const row = await prisma.consultation.findFirstOrThrow({ where: { email }, include: { history: true } });
    assert.equal(row.history.length, 1);
    const counts = { contents: await prisma.siteContent.count(), news: await prisma.newsPost.count(), resources: await prisma.resourceFile.count() };
    assert.ok(counts.contents > 0 && counts.news > 0 && counts.resources > 0);
    const resource = await prisma.resourceFile.findFirstOrThrow();
    const pdf = await fetch(`http://frontend:3000${resource.fileUrl}`);
    assert.equal(pdf.status, 200);
    assert.equal(Buffer.from(await pdf.arrayBuffer()).subarray(0, 5).toString(), '%PDF-');
    await writeFile(marker, JSON.stringify({ id: row.id, counts }));
    console.log('PASS: pages, public API, PDF download, frontend → backend → database consultation. Restart backend, rerun seed, then run check.');
  } else if (phase === 'check') {
    const { id, counts } = JSON.parse(await readFile(marker, 'utf8'));
    assert.ok(await prisma.consultation.findUnique({ where: { id } }), 'Consultation survives restart and seed');
    assert.deepEqual({ contents: await prisma.siteContent.count(), news: await prisma.newsPost.count(), resources: await prisma.resourceFile.count() }, counts);
    await prisma.consultation.delete({ where: { id } });
    await unlink(marker);
    console.log('PASS: persistence after restart, seed idempotence; smoke consultation removed.');
  } else throw new Error('Unknown phase');
} finally { await prisma.$disconnect(); }
