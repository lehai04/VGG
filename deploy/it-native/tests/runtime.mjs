import assert from 'node:assert/strict';
import https from 'node:https';
import { createRequire } from 'node:module';
import { randomBytes } from 'node:crypto';
const require = createRequire('/verified-release/backend/package.json');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { hashPassword } = await import('/verified-release/backend/dist/modules/consultation-admin/password.js');
const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });
const checks = [];
function request(path, { method = 'GET', headers = {}, body } = {}) {
  return new Promise((resolve, reject) => {
    const req = https.request({ hostname: '127.0.0.1', port: 443, path, method, rejectUnauthorized: false,
      headers: { host: 'sdh.vlu.edu.vn', ...headers }, timeout: 10000 }, res => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(chunks).toString() }));
    });
    req.on('error', reject);
    req.on('timeout', () => req.destroy(new Error('request timeout')));
    req.end(body);
  });
}
try {
  for (let i = 0; i < 90; i++) {
    try { if ((await request('/gateway/health')).status === 200 && (await request('/cms')).status === 200) break; } catch {}
    if (i === 89) throw new Error('Services failed to become ready');
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  assert.equal((await request('/gateway/health')).status, 200); checks.push('gateway health');
  assert.equal((await request('/gateway/api/public/news')).status, 200); checks.push('gateway public API prefix rewrite');
  const page = await request('/cms');
  assert.equal(page.status, 200);
  const scripts = [...page.body.matchAll(/src="([^\"]+\.js[^\"]*)"/g)].map(match => match[1].replaceAll('&amp;', '&'));
  assert.ok(scripts.length > 0);
  for (const src of scripts) { assert.ok(src.startsWith('/cms/')); assert.equal((await request(src)).status, 200); }
  checks.push('CMS HTML and JavaScript under /cms');
  const styles = [...page.body.matchAll(/href="([^\"]+\.css[^\"]*)"/g)].map(match => match[1].replaceAll('&amp;', '&'));
  assert.ok(styles.length > 0);
  for (const src of styles) assert.equal((await request(src)).status, 200);
  assert.equal((await request('/fonts/vlu/IBMPlexSans-Variable.woff2')).status, 200);
  assert.equal((await request('/cms/admin/news')).status, 200);
  checks.push('CMS styles, shared fonts and nested route');
  assert.equal((await request('/cms/images/logo/logo-vgg.png')).status, 200); checks.push('CMS logo');
  assert.equal((await request('/vi')).status, 200); checks.push('public website');
  assert.equal((await request('/gateway/api/admin/me')).status, 404); checks.push('direct admin gateway blocked');
  assert.equal((await request('/cms/api/admin/me')).status, 401); checks.push('anonymous CMS rejected');
  const email = 'native-test@example.test';
  const password = randomBytes(24).toString('hex');
  await db.consultationStaff.create({ data: { email, fullName: 'Isolated deployment test', passwordHash: await hashPassword(password), canUpdate: true, canManageContent: true } });
  const headers = { origin: 'https://sdh.vlu.edu.vn', 'x-vgg-admin': '1', 'content-type': 'application/json' };
  const login = await request('/cms/api/admin/login', { method: 'POST', headers, body: JSON.stringify({ email, password }) });
  assert.equal(login.status, 200, login.body);
  const cookie = login.headers['set-cookie'][0];
  assert.match(cookie, /Path=\/cms\/api\/admin;/);
  assert.match(cookie, /HttpOnly/); assert.match(cookie, /Secure/);
  const auth = { ...headers, cookie: cookie.split(';')[0] };
  assert.equal((await request('/cms/api/admin/me', { headers: auth })).status, 200);
  checks.push('login, scoped secure cookie, authenticated session');
  assert.equal((await request('/cms/api/admin/logout', { method: 'POST', headers: { ...auth, origin: 'https://invalid.example' }, body: '{}' })).status, 403);
  checks.push('CSRF wrong origin rejected');
  const logout = await request('/cms/api/admin/logout', { method: 'POST', headers: auth, body: '{}' });
  assert.equal(logout.status, 200);
  assert.match(logout.headers['set-cookie'][0], /Path=\/cms\/api\/admin;/);
  assert.match(logout.headers['set-cookie'][0], /Max-Age=0/);
  assert.equal((await request('/cms/api/admin/me', { headers: auth })).status, 401);
  checks.push('logout and session revocation');
  console.log(JSON.stringify({ passed: checks }, null, 2));
} finally { await db.$disconnect(); }
