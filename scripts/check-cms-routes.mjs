import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const base = process.argv[2] || 'http://localhost:3020';
if (!['localhost','127.0.0.1'].includes(new URL(base).hostname)) throw Error('Use the local QA server.');
const pages = JSON.parse(readFileSync('backend/src/modules/cms/page-defaults.json','utf8'));
const paths = [...new Set([...pages.map(page => page.path), '/news', '/resources'])];
const pending = ['vi','en'].flatMap(locale => paths.map(path => `/${locale}${path === '/' ? '' : path}`));
const results = [];
for (let index = 0; index < pending.length; index += 3) {
  results.push(...await Promise.all(pending.slice(index,index+3).map(async path => {
    const response = await fetch(base+path,{redirect:'manual',signal:AbortSignal.timeout(20000)});
    const html = await response.text();
    return { path, status: response.status, hasPage: html.includes('<h1') && html.includes('<html') };
  })));
}
const retired = await fetch(`${base}/vi/discover/gioi-thieu`, { redirect:'manual' });
results.push({path:'/vi/discover/gioi-thieu',status:retired.status,expected:404});
mkdirSync('outputs/cms-qa',{recursive:true});
writeFileSync('outputs/cms-qa/routes.json',JSON.stringify(results,null,2)+'\n');
const failures = results.filter(item => item.expected ? item.status !== item.expected : item.status !== 200 || !item.hasPage);
console.log(`${results.length-failures.length}/${results.length} public route checks passed.`);
if (failures.length) { console.log(failures); process.exitCode=1; }
