import { writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { programmes } from '../frontend/src/data/programmes';
import discover from '../frontend/src/data/discover-introduction.json';
import { leadershipProfiles, departmentHeads } from '../frontend/src/data/discover-leadership';
import vi from '../frontend/src/messages/vi.json';
import en from '../frontend/src/messages/en.json';
import { studentSuccessContent } from '../frontend/src/data/student-success-content';
import { chromeContent } from '../frontend/src/data/chrome-content';
import { homeContent } from '../frontend/src/data/home-content';
import { catalogueCopy } from '../frontend/src/data/programmes/catalogue-copy';
import { admissionsDefaults } from '../frontend/src/features/admissions/cms-template';
import researchCopy from '../frontend/src/data/research-copy.json';
import researchCards from '../frontend/src/data/research-cards.json';
import partners from '../frontend/src/data/research-partners.json';
import { discoverMedia, discoverActions } from '../frontend/src/data/discover-media';
import { contentFields } from '../backend/src/modules/cms/content-patch';

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
writeFileSync('backend/src/modules/cms/page-defaults.json', JSON.stringify(pages, null, 2) + '\n');
console.log(`Exported ${pages.length} CMS documents from existing source.`);
function assets(directory: string, relative = ''): Array<{ url: string; title: string }> {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = relative ? `${relative}/${entry.name}` : entry.name;
    if (entry.isDirectory()) return assets(join(directory, entry.name), path);
    return /\.(?:jpe?g|png|webp|avif|gif|svg)$/i.test(entry.name) ? [{ url: `/images/${path}`, title: entry.name }] : [];
  });
}
const library = assets('frontend/public/images');
writeFileSync('backend/src/modules/cms/asset-defaults.json', JSON.stringify(library, null, 2) + '\n');
console.log(`Inventoried ${library.length} project image assets without moving or deleting files.`);
const inventory = pages.map(page => ({ id: page.id, title: page.title, path: page.path, locales: page.locales, fields: contentFields(page.defaults).map(({path,type,section}) => ({path,type,section})) }));
writeFileSync('docs/cms-audit/page-inventory.json', JSON.stringify(inventory, null, 2) + '\n');
