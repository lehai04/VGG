import fs from 'node:fs';
import dotenv from 'dotenv';
import { Client } from 'pg';
const env = dotenv.parse(fs.readFileSync('backend/.env'));
const db = new Client({connectionString: env.DATABASE_URL, connectionTimeoutMillis: 5000});
await db.connect();
try {
  const result = await db.query('SELECT value::text AS body FROM site_contents UNION ALL SELECT file_url AS body FROM resource_files UNION ALL SELECT cover_image AS body FROM news_posts');
  const content = result.rows.map(row => row.body || '').join('\n');
  const checks = ['video-banner.webm', 'IBMPlexSans-Variable.ttf', 'PlusJakartaSans-Variable.ttf', 'maison-neue', '/api/media/'];
  console.log(JSON.stringify(Object.fromEntries(checks.map(value => [value,content.includes(value)]))));
  fs.mkdirSync('.tmp',{recursive:true});
  fs.writeFileSync('.tmp/public-content-media-refs.json', JSON.stringify([...new Set(content.match(/\/(?:images|assets|fonts|video|documents|admissions|api\/media)\/[^\s"<>\\]+/g)||[])]));
} finally { await db.end(); }
