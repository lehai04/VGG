import { writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { programmes } from '../../frontend/src/data/programmes';
import discover from '../../frontend/src/data/discover-introduction.json';
import { leadershipProfiles, departmentHeads } from '../../frontend/src/data/discover-leadership';
import vi from '../../frontend/src/messages/vi.json';
import en from '../../frontend/src/messages/en.json';
import { studentSuccessContent } from '../../frontend/src/data/student-success-content';
import { chromeContent } from '../../frontend/src/data/chrome-content';
import { homeContent } from '../../frontend/src/data/home-content';
import { catalogueCopy } from '../../frontend/src/data/programmes/catalogue-copy';
import { admissionsDefaults } from '../../frontend/src/features/admissions/cms-template';
import researchCopy from '../../frontend/src/data/research-copy.json';
import researchCards from '../../frontend/src/data/research-cards.json';
import partners from '../../frontend/src/data/research-partners.json';
import { discoverMedia, discoverActions } from '../../frontend/src/data/discover-media';
import { contentFields } from '../../backend/src/modules/cms/content-patch';

// Generate only from the real public source. Never seed or overwrite database content.
const sharedMessages = (messages: typeof vi) => ({ navigation: { university: messages.navigation.university, news: messages.navigation.news, resources: messages.navigation.resources }, common: { applyNow: messages.common.applyNow }, cta: messages.cta });
const pages = [
  { id: 'research', path: '/research', title: 'Nghiên cứu và hợp tác', kind: 'landing', locales: ['vi', 'en'], defaults: { ...researchCopy, ...researchCards, partners } },
  { id: 'admissions', path: '/admissions', title: 'Trang Tuyển sinh', kind: 'landing', locales: ['vi', 'en'], defaults: admissionsDefaults },
  { id: 'catalogue', path: '/programmes', title: 'Danh mục chương trình', kind: 'landing', locales: ['vi', 'en'], defaults: { ProgrammesPage: catalogueCopy.ProgrammesPage, ProgrammeDirectory: catalogueCopy.ProgrammeDirectory } },
  { id: 'home', path: '/', title: 'Trang chủ', kind: 'landing', locales: ['vi', 'en'], defaults: homeContent },
  { id: 'chrome', path: '/', title: 'Header và footer dùng chung', kind: 'shared', locales: ['vi', 'en'], defaults: chromeContent },
  { id: 'student-success', path: '/student-success', title: 'Hành trình người học', kind: 'landing', locales: ['vi', 'en'], defaults: studentSuccessContent },
  ...programmes.map(p => ({ id: `programme:${p.id}`, path: `/programmes/${p.id}`, title: p.title, kind: 'programme', locales: ['vi', 'en'], defaults: p })),
  { id: 'discover', path: '/discover', title: 'Về Viện Sau Đại học', kind: 'discover', locales: ['vi', 'en'], defaults: { ...discover, media: discoverMedia, actions: discoverActions, leaders: [...leadershipProfiles.map(p => ({ name: p.name, role: p.title, image: p.image })), ...departmentHeads] } },
  { id: 'shared:vi', path: '/', title: 'Nội dung dùng chung · Tiếng Việt', kind: 'messages', locales: ['vi'], defaults: sharedMessages(vi) },
  { id: 'shared:en', path: '/', title: 'Nội dung dùng chung · English', kind: 'messages', locales: ['en'], defaults: sharedMessages(en) },
];
const out = 'docs/cms-rebuild';
const walk = (value:any, path=''):any[] => value !== null && typeof value==='object' ? Object.entries(value).flatMap(([key,item])=>walk(item,path?`${path}.${key}`:key)) : [{path,value,type:value===null?'null':typeof value}];
const mapping = pages.flatMap(page=>{
 const editable=new Map(contentFields(page.defaults).map(f=>[f.path,f]));
 return walk(page.defaults).map(field=>({pageId:page.id,url:page.path,locales:page.locales,section:editable.get(field.path)?.section??field.path.split('.')[0],position:'Đối chiếu thứ tự trong 02-mapping.md; thứ tự runtime chưa xác minh',field:field.path,sourceValue:field.value,type:field.type,shared:page.kind==='shared'||page.kind==='messages',currentlyEditable:editable.has(field.path),proposedEdit:editable.has(field.path)?'Nội dung; cần duyệt theo vị trí render':'Khóa mặc định; xét riêng trường nghiệp vụ khi tạo ngành',fixedLayout:'Component/CSS/DOM và thứ tự runtime đã duyệt',validation:editable.get(field.path)?.type==='image'?'Tệp hợp lệ, URL ảnh cho phép, giữ tỷ lệ khung':editable.get(field.path)?.type==='url'?'URL an toàn, giữ liên kết/anchor hiện hữu':'Giữ kiểu dữ liệu; không cắt hoặc viết lại giá trị hiện có',source:'Nguồn import trong generate-inventory.ts; backend/src/modules/cms/content-patch.ts',verification:'SOURCE_ONLY; chưa áp dụng patch DB hoặc chứng minh trường có render'}));
});
writeFileSync(`${out}/source-content-snapshot.json`,JSON.stringify(pages,null,2)+'\n');
writeFileSync(`${out}/field-mapping.json`,JSON.stringify(mapping,null,2)+'\n');
const csv=(v:any)=>'"'+String(v??'').replaceAll('"','""')+'"';
writeFileSync(`${out}/field-mapping.csv`,'\uFEFF'+[Object.keys(mapping[0]).map(csv).join(','),...mapping.map(r=>Object.values(r).map(csv).join(','))].join('\n'));
const programmeSummary=programmes.map((p:any)=>({id:p.id,title:p.title,degree:p.degree,detailsPending:!!p.detailsPending,hasPageContent:!!p.pageContent,renderer:p.detailsPending||!p.pageContent?'PendingPage':'ProgrammeDetailPage',hasOverviewImage:p.pageContent?.section01?.overviewImage!==null,highlights:p.pageContent?.section02?.highlights?.length??0,hasOutcomes:!!p.pageContent?.section02?.learningOutcomes,hasRequirements:!!p.pageContent?.section03?.requirements,careers:p.pageContent?.section04?.careers?.length??0,hasFees:!!p.pageContent?.fees,hasCmsCurriculum:!!p.cmsCurriculum?.length,source:'frontend/src/data/programmes.ts; frontend/src/data/programmes/'+p.id+'.ts'}));
writeFileSync(`${out}/programme-inventory.json`,JSON.stringify(programmeSummary,null,2)+'\n');
console.log(JSON.stringify({pages:pages.length,programmes:programmes.length,leafFields:mapping.length,renderers:programmeSummary.reduce((a:any,p)=>{a[p.renderer]=(a[p.renderer]??0)+1;return a;},{})}));

