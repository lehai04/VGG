import { config } from 'dotenv';
import { Client } from 'pg';
import { randomBytes } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
config({ path: 'backend/.env', quiet: true });
const compile = spawnSync(process.execPath, ['node_modules/typescript/bin/tsc','--project','backend/tsconfig.json'], { encoding:'utf8', windowsHide:true });
if (compile.status !== 0) throw Error('CMS backend build failed: '+compile.stdout+compile.stderr);
const original = new URL(process.env.DATABASE_URL);
if (!['localhost', '127.0.0.1'].includes(original.hostname)) throw Error('CMS integration tests require local PostgreSQL.');
const database = `vgg_cms_test_${randomBytes(5).toString('hex')}`;
const client = new Client({ connectionString: original.toString() });
await client.connect();
let created = false;
try {
  await client.query(`CREATE DATABASE "${database}"`); created = true;
  const target = new URL(original); target.pathname = `/${database}`;
  const env = { ...process.env, DATABASE_URL: target.toString(), CMS_INTEGRATION: '1', NODE_ENV: 'test' };
  const migrate = spawnSync(process.execPath, ['../node_modules/prisma/build/index.js', 'migrate', 'deploy'], { cwd: 'backend', env, encoding: 'utf8' });
  if (migrate.status) throw Error(`Isolated test database migration failed: ${migrate.stderr}`);
  console.log('Migrations applied to isolated local CMS test database.');
  const tests = spawnSync(process.execPath, ['--test', 'tests/website.integration.test.mjs'], { cwd: 'backend', env, encoding: 'utf8' });
  mkdirSync('outputs/cms-qa', { recursive: true });
  writeFileSync('outputs/cms-qa/api-integration.log', (tests.stdout || '') + (tests.stderr || ''));
  console.log((tests.stdout || '').split('\n').filter(line => !line.startsWith('{"level"')).join('\n'));
  if (tests.stderr) console.error(tests.stderr);
  process.exitCode = tests.status ?? 1;
  if (tests.status === 0 && process.env.CMS_QA_SERVE === '1') {
    const qa = spawnSync(process.execPath, ['scripts/cms-qa-server.mjs'], { env: { ...env, PUBLIC_APP_URL: 'http://localhost:3020', ADMIN_APP_URL: 'http://localhost:3021', STORAGE_BUCKET: `vgg-cms-qa-${randomBytes(5).toString('hex')}` }, stdio: 'inherit' });
    process.exitCode = qa.status ?? 1;
  }
} finally {
  if (created) {
    await client.query('SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname=$1 AND pid<>pg_backend_pid()', [database]);
    await client.query(`DROP DATABASE "${database}"`);
    console.log('Removed isolated CMS test database.');
  }
  await client.end();
}
