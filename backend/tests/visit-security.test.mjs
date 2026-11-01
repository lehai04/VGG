import assert from 'node:assert/strict';
import test from 'node:test';

process.env.DATABASE_URL ||= 'postgresql://unused:unused@127.0.0.1:1/unused';
const { buildApp } = await import('../dist/app.js');
const { prisma } = await import('../dist/shared/database/prisma.js');

async function setup(t) {
  let writes = 0;
  const original = prisma.pageVisit.create;
  prisma.pageVisit.create = async () => { writes++; return {}; };
  const app = await buildApp();
  t.after(async () => { await app.close(); prisma.pageVisit.create = original; });
  const send = ({ ip = '203.0.113.1', ua = 'Browser A', visitorId = 'visitor', path = '/vi', direct = false } = {}) => app.inject({
    method: 'POST', url: '/api/public/visits',
    remoteAddress: direct ? '198.51.100.10' : '127.0.0.1',
    headers: { 'x-forwarded-for': ip, ...(ua === null ? {} : { 'user-agent': ua }) },
    payload: { path, visitorId },
  });
  return { app, send, writes: () => writes };
}

test('same IP and user agent writes once, including concurrent requests and changed visitor/path', async t => {
  const { send, writes } = await setup(t);
  const responses = await Promise.all(Array.from({ length: 10 }, (_, i) => send({ visitorId: String(i), path: `/page-${i}` })));
  assert.equal(responses.filter(r => r.statusCode === 201).length, 1);
  assert.equal(responses.filter(r => r.statusCode === 429).length, 9);
  assert.equal(writes(), 1);
  const wait = Number(responses.find(r => r.statusCode === 429).headers['retry-after']);
  assert.ok(wait > 3500 && wait <= 3600);
});

test('shared IP permits different agents, and same agent on another IP has its own quota', async t => {
  const { send, writes } = await setup(t);
  for (let i = 0; i < 35; i++) assert.equal((await send({ ua: `Browser ${i}` })).statusCode, 201);
  assert.equal((await send({ ua: 'Browser 0' })).statusCode, 429);
  assert.equal((await send({ ip: '203.0.113.2', ua: 'Browser 0' })).statusCode, 201);
  assert.equal(writes(), 36);
});

test('hourly window expires without being extended by rejected requests', async t => {
  const { send, writes } = await setup(t);
  let now = Date.now();
  t.mock.method(Date, 'now', () => now);
  assert.equal((await send()).statusCode, 201);
  now += 3_599_000;
  const blocked = await send();
  assert.equal(blocked.statusCode, 429);
  assert.equal(Number(blocked.headers['retry-after']), 1);
  now += 1000;
  assert.equal((await send()).statusCode, 201);
  assert.equal(writes(), 2);
});

test('internal frontend forwards distinct client IPs; missing agents still have a quota', async t => {
  const { send, writes } = await setup(t);
  assert.equal((await send()).statusCode, 201);
  assert.equal((await send({ ip: '203.0.113.200' })).statusCode, 201);
  assert.equal((await send({ ip: '203.0.113.200' })).statusCode, 429);
  assert.equal((await send({ ua: null })).statusCode, 201);
  assert.equal((await send({ ua: null })).statusCode, 429);
  // inject supplies a default agent when omitted; explicitly empty is a separate key.
  assert.equal((await send({ ua: '' })).statusCode, 201);
  assert.equal((await send({ ua: '' })).statusCode, 429);
  assert.equal(writes(), 4);
});

test('invalid and oversized visit bodies never write to the database', async t => {
  const { send, writes } = await setup(t);
  assert.equal((await send({ path: '' })).statusCode, 400);
  assert.equal((await send({ ua: 'Other browser', path: '/' + 'x'.repeat(5000) })).statusCode, 413);
  assert.equal(writes(), 0);
});

test('public direct peers cannot rotate forwarded headers to bypass quotas', async t => {
 const {send,writes}=await setup(t);
 assert.equal((await send({direct:true})).statusCode,201);
 assert.equal((await send({direct:true,ip:'203.0.113.200'})).statusCode,429);
 assert.equal(writes(),1);
});
