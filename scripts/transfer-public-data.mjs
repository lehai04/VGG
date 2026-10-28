import pg from 'pg';

const sourceUrl = process.env.SOURCE_DATABASE_URL;
const targetUrl = process.env.DATABASE_URL;
if (!sourceUrl || !targetUrl || sourceUrl === targetUrl) {
  throw new Error('Set distinct SOURCE_DATABASE_URL and DATABASE_URL values.');
}
const tables = ['resource_categories', 'news_posts', 'resource_files', 'site_contents', 'page_visits', 'consultations', 'consultation_history'];
const source = new pg.Client({ connectionString: sourceUrl });
const target = new pg.Client({ connectionString: targetUrl });
const quote = value => `"${value.replaceAll('"', '""')}"`;
function normalizeContent(value, namespace) {
  if (Array.isArray(value)) return value.map(item => normalizeContent(item, namespace));
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(Object.entries(value).map(([key, child]) => {
    const normalizedKey = key.split('.').map(part =>
      part.startsWith(namespace) && /^[A-Z]/.test(part.slice(namespace.length))
        ? `content${part.slice(namespace.length)}` : part,
    ).join('.');
    if (key === '$collections' && typeof child === 'string') {
      child = JSON.stringify(normalizeContent(JSON.parse(child), namespace));
    } else child = normalizeContent(child, namespace);
    return [normalizedKey, child];
  }));
}
try {
  await source.connect();
  await target.connect();
  await source.query('BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ READ ONLY');
  await target.query('BEGIN');
  for (const table of tables) {
    await target.query(`LOCK TABLE ${quote(table)} IN EXCLUSIVE MODE`);
    const count = await target.query(`SELECT count(*)::int AS count FROM ${quote(table)}`);
    if (count.rows[0].count !== 0) throw new Error(`Target table ${table} must be empty.`);
  }
  for (const table of tables) {
    const columns = (await target.query(
      'SELECT column_name, data_type FROM information_schema.columns WHERE table_schema = $1 AND table_name = $2 ORDER BY ordinal_position',
      ['public', table],
    )).rows;
    const sourceColumns = new Set((await source.query(
      'SELECT column_name FROM information_schema.columns WHERE table_schema = $1 AND table_name = $2', ['public', table],
    )).rows.map(row => row.column_name));
    const shared = columns.filter(column => sourceColumns.has(column.column_name));
    if (!shared.length) throw new Error(`Source table ${table} is missing.`);
    const names = shared.map(column => quote(column.column_name));
    const placeholders = shared.map((_, index) => `$${index + 1}`);
    await source.query(`DECLARE transfer_rows NO SCROLL CURSOR FOR SELECT ${names.join(', ')} FROM ${quote(table)}`);
    let copied = 0;
    for (;;) {
      const rows = (await source.query('FETCH 500 FROM transfer_rows')).rows;
      if (!rows.length) break;
      for (const row of rows) {
        if (table === 'site_contents') {
          const parts = row.key.split('.');
          // Only published website documents, public programme states and SEO.
          if (parts[1] === 'published') {
            row.value = normalizeContent(row.value, parts[0]);
            row.key = ['page', ...parts.slice(1)].join('.');
          }
          else if (row.section.endsWith('-programme-state')) {
            row.section = 'content-programme-state';
            row.key = ['content', ...parts.slice(1)].join('.');
          } else if (row.section.endsWith('-programme') && row.published) {
            row.section = 'content-programme';
            row.key = ['content', ...parts.slice(1)].join('.');
          } else if (row.section !== 'seo' || !row.published) continue;
          if (parts[1] === 'published') row.section = 'public-release';
        }
        const values = shared.map(column => {
          const value = row[column.column_name];
          return value != null && ['json', 'jsonb'].includes(column.data_type) ? JSON.stringify(value) : value;
        });
        await target.query(`INSERT INTO ${quote(table)} (${names.join(', ')}) VALUES (${placeholders.join(', ')})`, values);
        copied++;
      }
    }
    await source.query('CLOSE transfer_rows');
    console.log(`${table}: ${copied} rows copied`);
  }
  await target.query('COMMIT');
  await source.query('COMMIT');
} catch (error) {
  await target.query('ROLLBACK').catch(() => {});
  await source.query('ROLLBACK').catch(() => {});
  throw error;
} finally { await Promise.allSettled([source.end(), target.end()]); }
