// Only launched against the ephemeral database created by test-cms-integration.
import { spawn } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { writeFileSync, existsSync, unlinkSync, createWriteStream } from 'node:fs';
import { Client as Minio } from 'minio';
import {createServer} from 'node:http';
if (!/^\/vgg_cms_test_[a-f0-9]+$/.test(new URL(process.env.DATABASE_URL).pathname)) throw Error('QA requires isolated CMS test database.');
const { prisma } = await import('../backend/dist/shared/database/prisma.js');
const { hashPassword } = await import('../backend/dist/modules/auth/auth.service.js');
const { buildApp } = await import('../backend/dist/app.js');
const role = await prisma.role.findUniqueOrThrow({ where: { code: 'SUPER_ADMIN' } });
const password = randomBytes(24).toString('base64url');
await prisma.admin.create({ data: { username: 'cms_qa_admin', passwordHash: await hashPassword(password), fullName: 'CMS QA Administrator', mustChangePassword: false, roleId: role.id } });
const app = await buildApp();
app.log.level = 'warn';
await app.listen({ host: '127.0.0.1', port: 4020 });
const children = [];
const credentialFile = join(tmpdir(), `vgg-cms-qa-${process.pid}.json`);
const stopFile = `${credentialFile}.stop`;
const outputDirectory = resolve('outputs/cms-qa');
const { mkdirSync } = await import('node:fs'); mkdirSync(outputDirectory, { recursive: true });
const responsiveServer=createServer((request,response)=>{if(request.url!=='/'){response.writeHead(404).end();return;}response.writeHead(200,{'content-type':'text/html; charset=utf-8','cache-control':'no-store'});response.end(`<!doctype html><html lang="vi"><head><meta name="viewport" content="width=device-width, initial-scale=1"><title>CMS responsive QA</title><style>body{margin:16px;background:#edf1f7;font-family:Arial}main{display:flex;align-items:start;gap:20px}section{flex-shrink:0}iframe{display:block;border:1px solid #aebbd0;background:white;height:1100px}h2{font-size:18px}</style></head><body><h1>Kiểm tra CMS ở kích thước thật</h1><main>${[320,375,768,1280].map(width=>`<section><h2>${width}px</h2><iframe id="cms-${width}" title="CMS ${width}px" width="${width}" src="http://localhost:3021/admin/website"></iframe></section>`).join('')}</main></body></html>`);});
try {
  await new Promise((resolve,reject)=>{responsiveServer.once('error',reject);responsiveServer.listen(4021,'localhost',resolve);});
  for (const [workspace, port] of [['frontend', 3020], ['admin', 3021]]) {
    const log = createWriteStream(join(outputDirectory, `${workspace}.log`));
    const child = spawn(process.execPath, [resolve('node_modules/next/dist/bin/next'), 'start', '-p', String(port), '-H', 'localhost'], { cwd: workspace, windowsHide: true, env: { ...process.env, NODE_ENV: 'production', BACKEND_INTERNAL_URL: 'http://127.0.0.1:4020' }, stdio: ['ignore', 'pipe', 'pipe'] });
    child.stdout.pipe(log); child.stderr.pipe(log); children.push(child);
  }
  writeFileSync(credentialFile, JSON.stringify({ username: 'cms_qa_admin', password, admin: 'http://localhost:3021/admin/login', frontend: 'http://localhost:3020', stopFile }));
  console.log(`CMS_QA_CREDENTIAL_FILE=${credentialFile}`);
  const expires = Date.now() + 20 * 60 * 1000;
  while (!existsSync(stopFile) && Date.now() < expires && children.every(child => child.exitCode === null)) await new Promise(resolve => setTimeout(resolve, 1000));
} finally {
  if(responsiveServer.listening)await new Promise(resolve=>responsiveServer.close(resolve));
  for (const child of children) child.kill();
  await app.close();
  const bucket = process.env.STORAGE_BUCKET;
  if (/^vgg-cms-qa-[a-f0-9]+$/.test(bucket)) {
    const storage = new Minio({ endPoint: process.env.STORAGE_ENDPOINT || '127.0.0.1', port: Number(process.env.STORAGE_PORT || 9000), useSSL: process.env.STORAGE_USE_SSL === 'true', accessKey: process.env.STORAGE_ACCESS_KEY, secretKey: process.env.STORAGE_SECRET_KEY });
    if (await storage.bucketExists(bucket)) {
      const objects = []; for await (const item of storage.listObjectsV2(bucket, '', true)) if (item.name) objects.push(item.name);
      if (objects.length) await storage.removeObjects(bucket, objects);
      await storage.removeBucket(bucket);
    }
  }
  if (existsSync(credentialFile)) unlinkSync(credentialFile);
  if (existsSync(stopFile)) unlinkSync(stopFile);
  console.log('QA services stopped; temporary credentials and QA storage removed.');
}
