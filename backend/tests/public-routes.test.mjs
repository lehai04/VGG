import assert from 'node:assert/strict';
import test from 'node:test';
process.env.DATABASE_URL ||= 'postgresql://unused:unused@127.0.0.1:1/unused';
process.env.STORAGE_ACCESS_KEY ||= 'test-storage';
process.env.STORAGE_SECRET_KEY ||= 'test-storage-password';
const { buildApp } = await import('../dist/app.js');
test('public build exposes no admin/auth/preview routes and validates real consultation input', async () => {
  const app = await buildApp();
  try {
    for (const url of ['/api/admin/news', '/api/admin/website/pages', '/api/admin/consultations', '/api/auth/login', '/api/public/website/preview']) {
      for (const method of ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']) {
        assert.equal((await app.inject({ method, url })).statusCode, 404, `${method} ${url}`);
      }
    }
    assert.equal((await app.inject({ method: 'POST', url: '/api/public/consultations', payload: {} })).statusCode, 400);
    assert.equal((await app.inject({ method: 'GET', url: '/api/public/news?limit=0' })).statusCode, 400);
  } finally { await app.close(); }
});
