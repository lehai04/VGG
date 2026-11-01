import { readFileSync, writeFileSync, readdirSync, mkdirSync, cpSync, rmSync } from 'node:fs';
import { join } from 'node:path';

// This script runs in a disposable Linux build directory, never in the source checkout.
const locale = process.argv[2];
if (!['vi', 'en'].includes(locale) || process.cwd() !== '/app') throw new Error('Run inside the static build container with vi or en');
const root = 'frontend';
const edit = (file, transform) => writeFileSync(join(root, file), transform(readFileSync(join(root, file), 'utf8')));
const write = (file, source) => writeFileSync(join(root, file), source);
function walk(dir) { return readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]); }

rmSync(`${root}/src/proxy.ts`);
rmSync(`${root}/src/app/api`, { recursive: true });
rmSync(`${root}/.next`, { recursive: true, force: true });
rmSync(`${root}/out`, { recursive: true, force: true });
write('next.config.ts', `import type { NextConfig } from 'next';\nimport { join } from 'node:path';\nconst config: NextConfig = {output:'export', trailingSlash:true, images:{unoptimized:true}, turbopack:{root:join(process.cwd(),'..')}};\nexport default config;\n`);
write('src/lib/static-headers.ts', `export async function headers() { return new Headers({'x-vgg-locale':'${locale}'}); }\n`);
for (const file of walk(`${root}/src`).filter(file => /\.(ts|tsx)$/.test(file))) {
  let text = readFileSync(file, 'utf8').replaceAll('from "next/headers"', 'from "@/lib/static-headers"');
  text = text.replace(/\.toLocaleDateString\((["'])vi-VN\1\)/g, '.toLocaleDateString("vi-VN", {timeZone:"Asia/Ho_Chi_Minh"})');
  if (file.endsWith('/app/robots.ts')) text = text.replace('"force-dynamic"', '"force-static"');
  writeFileSync(file, text);
}
edit('src/app/sitemap.ts', text => `export const dynamic = 'force-static';\n${text}`);
mkdirSync(`${root}/src/app/${locale}`, { recursive: true });
cpSync(`${root}/src/app/(public)`, `${root}/src/app/${locale}/(public)`, {recursive:true});
rmSync(`${root}/src/app/(public)`, {recursive:true});
const publicRoot = `src/app/${locale}/(public)`;

// Legacy anchor routes are handled by Nginx rather than server redirects.
for (const section of ['admissions', 'resources', 'research', 'student-success']) {
  rmSync(`${root}/${publicRoot}/${section}/[slug]`, { recursive: true });
}
rmSync(`${root}/${publicRoot}/global`, { recursive: true });
rmSync(`${root}/${publicRoot}/news/[slug]`, { recursive: true });
edit(`${publicRoot}/programmes/[slug]/page.tsx`, text => `${text}\nexport const dynamicParams = false;\nexport async function generateStaticParams() { return (await websiteProgrammes()).map(p => ({slug:p.id})); }\n`);
edit(`${publicRoot}/admissions/page.tsx`, text => text.replace('const selection = await searchParams;', 'const selection: {programme?:string;degree?:string} = {};'));

// Browser-side filtering keeps query-string navigation useful on a static host.
write(`${publicRoot}/news/page.tsx`, `import {sectionMetadata} from '@/lib/section-metadata';\nimport {getDemoNewsPosts} from '@/features/news/demo-posts';\nimport {StaticNews} from '@/features/news/components/StaticNews';\nexport const metadata=sectionMetadata('news');\nexport default function Page(){ return <StaticNews posts={getDemoNewsPosts({})}/>; }\n`);
write('src/features/news/components/StaticNews.tsx', `"use client";
import {useEffect,useState} from 'react';
import {NewsLanding} from './NewsLanding';
import type {NewsPost} from '../data';
export function StaticNews({posts}:{posts:NewsPost[]}){
 const [query,setQuery]=useState(''); const [category,setCategory]=useState(''); const [page,setPage]=useState(1);
 useEffect(()=>{const p=new URLSearchParams(window.location.search);setQuery(p.get('q')||'');setCategory(p.get('category')||'');setPage(Math.max(1,Number(p.get('page'))||1));},[]);
 const filtered=posts.filter(p=>(!category||p.category===category)&&(!query||(p.title+' '+p.excerpt).toLocaleLowerCase('vi').includes(query.toLocaleLowerCase('vi'))));
 const totalPages=Math.max(1,Math.ceil(filtered.length/6));const current=Math.min(page,totalPages);
 return <NewsLanding posts={filtered.slice((current-1)*6,current*6)} newestPostId={posts[0]?.id} activeCategory={category||undefined} query={query||undefined} pagination={{page:current,limit:6,total:filtered.length,totalPages}}/>;
}
`);
// Use normal document navigation: language builds are independent static documents.
edit('src/i18n/components/LocalizedLink.tsx', text => text.replace('return <Link ref={ref} href={localized} {...props} />;', 'const { prefetch, replace, scroll, shallow, locale: nextLocale, as, onNavigate, ...anchorProps } = props;\n  return <a ref={ref} href={typeof localized === "string" ? localized : String(localized.pathname || "/")} {...anchorProps} />;'));
edit('src/features/news/components/NewsLanding.tsx', text => text.replace('action="/vi/news"', `action="/${locale}/news"`));
edit('src/features/programmes/components/ProgrammeSearch.tsx', text => text.replace('router.push(`/programmes${suffix}`);', `window.location.assign(\`/${locale}/programmes\${suffix}\`);`));
// Static files can be viewed/downloaded directly; no Next.js document proxy is needed.
edit('src/features/resources/components/ResourcesExplorer.tsx', text => text.replace('`/api/resources/file?url=${encodeURIComponent(item.fileUrl)}&name=${encodeURIComponent(item.fileName)}${download ? "&download=1" : ""}`', 'item.fileUrl'));
edit('src/features/resources/components/ResourcesExplorer.tsx', text => text.replaceAll('<a href={fileEndpoint(item, true)}>', '<a href={fileEndpoint(item, true)} download={item.fileName}>').replaceAll('<a href={fileEndpoint(preview, true)}>', '<a href={fileEndpoint(preview, true)} download={preview.fileName}>'));

// Give each exported route its own canonical URL (there is no request pathname at build time).
for (const file of walk(`${root}/${publicRoot}`).filter(file => file.endsWith('/page.tsx'))) {
  let text = readFileSync(file,'utf8');
  const route = file.split('/(public)')[1].replace('/page.tsx','');
  let defaults = '{}';
  if (/export async function generateMetadata/.test(text)) {
    text=text.replace('export async function generateMetadata','async function generateSourceMetadata');
    defaults='await generateSourceMetadata(props as never)';
    // Functions without arguments still accept a typed optional static-build argument.
    text=text.replace(/generateSourceMetadata\(\)/,'generateSourceMetadata(_props?: unknown)');
  } else if (/export const metadata\b/.test(text)) {
    text=text.replace('export const metadata','const sourceMetadata'); defaults='sourceMetadata';
  }
  text+=`\nexport async function generateMetadata(props: {params:Promise<{slug?:string}>}) {\n const params=await props.params;const path=${JSON.stringify(`/${locale}${route}`)}.replace('[slug]',params.slug||'');\n const original=${defaults};\n return {...original,alternates:{canonical:'https://sdh.vlu.edu.vn'+path}};\n}\n`;
  writeFileSync(file,text);
}
console.log(`Prepared static ${locale} build`);
