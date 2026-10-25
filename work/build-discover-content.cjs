const fs = require('node:fs');
const sharp = require('sharp');
const p = JSON.parse(fs.readFileSync('work/discover-source-paragraphs.json', 'utf8').replace(/^\uFEFF/, ''));
const content = {
  hero: { title: [p[4], p[5]], english: p[6], message: p[7], intro: p[8] },
  introduction: { title: p[14], paragraphs: p.slice(15, 19) },
  vision: { title: 'Tầm nhìn', english: 'Vision', paragraphs: p.slice(23, 25) },
  mission: { title: 'Sứ mệnh', english: 'Mission', paragraphs: p.slice(26, 28) },
  philosophy: { title: p[31], paragraphs: p.slice(32, 34), items: [34, 37, 40].map(i => ({ title: p[i].replace(/^\d+\. /, ''), english: p[i + 1], text: p[i + 2] })) },
  values: { title: p[46], intro: p[47], items: [48, 51, 54, 57].map(i => ({ name: p[i], title: p[i + 1], text: p[i + 2] })), message: p[61] },
  benefits: { title: 'Vì sao lựa chọn học sau đại học tại Văn Lang?', message: p[63], intro: p[64], items: [65, 67, 69, 71].map(i => ({ title: p[i].replace(/^\d+\. /, ''), text: p[i + 1] })) },
  strategy: { title: p[76], paragraphs: p.slice(77, 81) },
  leadership: { title: p[84], paragraphs: p.slice(85, 87) },
  closing: { title: p[95], message: p[96], intro: p[97] },
};
fs.writeFileSync('frontend/src/data/discover-introduction.json', JSON.stringify(content, null, 2) + '\n');
// Leadership data remains in frontend/src/data/discover-leadership.ts; no subpage is generated.
Promise.all([
  sharp('work/discover-seminar-discussion.jpg').resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 84 }).toFile('frontend/public/images/pages/discover/introduction/seminar-discussion.webp'),
  sharp('work/discover-seminar-community.jpg').resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 84 }).toFile('frontend/public/images/pages/discover/introduction/seminar-community.webp'),
]).catch(error => { console.error(error); process.exitCode = 1; });

