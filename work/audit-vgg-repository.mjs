import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
const root=path.resolve('frontend/src');
const out='outputs/vgg-content-audit';fs.mkdirSync(out,{recursive:true});
const modules=new Map();
function load(file){file=path.resolve(file);if(modules.has(file))return modules.get(file).exports;const record={exports:{}};modules.set(file,record);const compiled=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;new Function('require','exports','module',compiled)(name=>load(path.resolve(path.dirname(file),name+'.ts')),record.exports,record);return record.exports;}
const {programmes}=load(path.join(root,'data/programmes.ts'));
const {getProgrammeCurricula}=load(path.join(root,'data/curricula.ts'));
const site=load(path.join(root,'data/site.ts'));
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);
const sources=walk(root).filter(f=>/\.(tsx|ts)$/.test(f));
const pages=sources.filter(f=>/[/\\](page|layout|not-found)\.tsx$/.test(f)).map(f=>({file:path.relative(root,f).replaceAll('\\','/'),source:fs.readFileSync(f,'utf8')}));
fs.writeFileSync(out+'/page-sources.txt',pages.map(p=>p.file+'\n'+p.source).join('\n\n'));
const programmeAudit=programmes.map(p=>({id:p.id,title:p.title,pending:!!p.detailsPending,credits:p.credits,orientation:p.orientation,orientations:p.orientations,graduation:p.graduationRequirements,facts:p.pageContent?.facts.quickFactsDetailed,tracks:getProgrammeCurricula(p).map(t=>({title:t.title,groups:t.groups.map(g=>({title:g.title,label:g.totalCreditsLabel,courses:g.courses.length,english:g.courses.filter(c=>c.englishName).length}))})),outcomes:!!p.pageContent?.section02.learningOutcomes,sections:Object.keys(p.pageContent??{}),content:p.pageContent}));
const routes=['/',...site.menuGroups.map(g=>'/'+g.slug),...programmes.map(p=>'/programmes/'+p.id),...site.discoverSections.map(p=>'/discover/'+p.slug),'/discover/lien-he'];
for(const [section,slugs]of Object.entries(site.subpageSlugs))for(const slug of slugs)routes.push('/'+section+'/'+slug);
const links=[];for(const f of sources){const text=fs.readFileSync(f,'utf8');for(const match of text.matchAll(/(?:href|src|image|imageFallback|fallbackImage|heroImage|bannerImage):?\s*(?:=\s*)?["'](\/[^"'`\n]*)["']/g))links.push({file:path.relative(root,f).replaceAll('\\','/'),target:match[1]});}
const missingAssets=links.filter(l=>l.target.startsWith('/images/')&&!fs.existsSync(path.join('frontend/public',l.target)));
const literalLinks=links.filter(l=>!l.target.startsWith('/images/')&&!l.target.startsWith('/video/')&&!l.target.startsWith('/api/'));
const data={pages:pages.map(({file})=>file),routes:[...new Set(routes)],programmes:programmeAudit,groups:site.menuGroups,sectionSubpages:site.sectionSubpages,literalLinks,missingAssets};
fs.writeFileSync(out+'/repository-audit.json',JSON.stringify(data,null,2));
fs.writeFileSync(out+'/site-data.json',JSON.stringify(site,null,2));
fs.writeFileSync(out+'/before-programmes.json',JSON.stringify(programmes,null,2));
console.log(JSON.stringify({pages:pages.length,routes:data.routes.length,pending:programmeAudit.filter(p=>p.pending).map(p=>p.id),missingAssets,programmes:programmeAudit.map(({content,...p})=>p)},null,2));
