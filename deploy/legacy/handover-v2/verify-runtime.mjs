import assert from 'node:assert/strict';
import https from 'node:https';
import { createRequire } from 'node:module';
const require = createRequire('/opt/sdh/current/be/backend/package.json');
const { Client } = require('pg');
const db = new Client({ connectionString: process.env.DATABASE_URL });
await db.connect();
const marker = 'handover-build-check@example.invalid';
function request(path, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const req = https.request({ hostname: '127.0.0.1', port: 443, path,
      rejectUnauthorized: false, method: body === undefined ? 'GET' : 'POST',
      headers: { host: 'sdh.vlu.edu.vn', ...headers, ...(body === undefined ? {} : { 'content-type': 'application/json' }) }
    }, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, data: Buffer.concat(chunks) }));
    });
    req.on('error', reject); req.setTimeout(60000, () => req.destroy(new Error('timeout')));
    req.end(body === undefined ? undefined : JSON.stringify(body));
  });
}
try {
  if (process.argv[2] === 'after-restart') {
    const { rows } = await db.query('SELECT count(*)::int AS count FROM consultations WHERE email=$1', [marker]);
    assert.equal(rows[0].count, 1, 'Consultation survives restart and repeat seed');
    await db.query('DELETE FROM consultations WHERE email=$1', [marker]);
    console.log('PASS persistence after restart; test consultation removed');
  } else {
    for (const path of ['/gateway/health', '/gateway/ready', '/gateway/api/public/news', '/gateway/api/public/resources', '/gateway/api/public/site-content', '/vi', '/en', '/vi/admissions', '/vi/programmes', '/vi/resources', '/sitemap.xml', '/robots.txt']) {
      const res = await request(path); assert.equal(res.status, 200, path);
      console.log('PASS 200', path);
    }
    for (const path of ['/cms', '/cms/', '/cms/login', '/vi/news', '/vi/student-success']) assert.equal((await request(path)).status, 404, path);
    assert.equal((await request('/gateway')).status, 308);
    const redirect = await request('/admissions?test=1');
    assert.equal(redirect.status, 307);
    assert.equal(new URL(redirect.headers.location, 'https://sdh.vlu.edu.vn').href, 'https://sdh.vlu.edu.vn/vi/admissions?test=1');
    assert.equal((await request('/gateway/api/public/consultations', {})).status, 400);
    const home = (await request('/vi')).data.toString();
    assert.ok(/<link[^>]+rel="canonical"[^>]+href="https:\/\/sdh\.vlu\.edu\.vn\/vi\/?"/.test(home), 'Canonical uses production domain');
    assert.match((await request('/sitemap.xml')).data.toString(), /https:\/\/sdh\.vlu\.edu\.vn/);
    assert.match((await request('/robots.txt')).data.toString(), /https:\/\/sdh\.vlu\.edu\.vn\/sitemap.xml/);
    const asset = home.match(/(?:src|href)="([^" ]*\/_next\/static\/[^" ]+)"/);
    assert.ok(asset, 'HTML references a static asset');
    assert.equal((await request(asset[1])).status, 200, 'Standalone includes static assets');
    const optimizedImage = home.match(/src="(\/_next\/image[^" ]+)"/);
    assert.ok(optimizedImage);
    assert.equal((await request(optimizedImage[1].replaceAll('&amp;', '&'))).status, 200, 'Native sharp image optimization');
    const resources = JSON.parse((await request('/gateway/api/public/resources')).data).data.resources;
    assert.ok(resources.length > 0);
    const pdfs = resources.filter(r => r.fileUrl.startsWith('/documents/') && r.fileUrl.endsWith('.pdf'));
    assert.equal(pdfs.length, 8);
    for (const pdf of pdfs) {
      const pdfResponse = await request(encodeURI(pdf.fileUrl));
      assert.equal(pdfResponse.status, 200, pdf.fileUrl);
      assert.equal(pdfResponse.data.subarray(0, 5).toString(), '%PDF-');
    }
    const download = await request('/api/resources/file?url=' + encodeURIComponent(pdfs[0].fileUrl) + '&name=test.pdf&download=1');
    assert.equal(download.status, 200, 'Download route behind HTTPS');
    assert.match(download.headers['content-disposition'], /^attachment;/);
    assert.equal(download.data.subarray(0, 5).toString(), '%PDF-');
    console.log('PASS static assets and actual PDF bytes');
    const form = await request('/api/consultations', { name: 'Kiểm thử bàn giao', email: marker, phone: '0900000000', consent: true, message: 'Isolated local build test', sourcePage: '/vi' });
    assert.equal(form.status, 201, form.data.toString());
    const rows = await db.query('SELECT count(*)::int AS count FROM consultations WHERE email=$1', [marker]);
    assert.equal(rows.rows[0].count, 1);
    const counts = await db.query('SELECT (SELECT count(*) FROM site_contents) AS pages, (SELECT count(*) FROM news_posts) AS news, (SELECT count(*) FROM resource_files) AS resources');
    console.log('PASS FE form -> BE -> PostgreSQL', JSON.stringify(counts.rows[0]));
    console.log('PASS gateway mapping, CMS 404 and invalid form 400');
  }
} finally { await db.end(); }
