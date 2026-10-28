import assert from 'node:assert/strict';
import test from 'node:test';

process.env.DATABASE_URL = 'postgresql://unused:unused@127.0.0.1:1/unused';
delete process.env.STORAGE_ACCESS_KEY;
delete process.env.STORAGE_SECRET_KEY;
const { buildApp } = await import('../dist/app.js');

test('native public service starts without object storage credentials', async () => {
  const app = await buildApp();
  try {
    assert.equal((await app.inject('/health')).statusCode, 200);
    const response = await app.inject('/api/public/media/example.pdf');
    assert.equal(response.statusCode, 503);
    assert.equal(response.json().code, 'MEDIA_STORAGE_UNAVAILABLE');
    assert.equal((await app.inject({method: 'POST', url: '/api/public/consultations', payload: {}})).statusCode, 400);
  } finally { await app.close(); }
});
