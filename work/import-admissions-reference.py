from pathlib import Path
from bs4 import BeautifulSoup
import base64,re,json
source=Path('C:/Users/lepha/Downloads/tuyen-sinh-sau-dai-hoc-cap-nhat (1).html');s=BeautifulSoup(source.read_text(encoding='utf-8'),'html.parser');dest=Path('frontend/src/features/admissions');dest.mkdir(exist_ok=True);assets=Path('frontend/public/admissions');assets.mkdir(exist_ok=True)
for i,img in enumerate(s.select('img')):
 src=img['src'];p=assets/('reference-'+str(i)+'.webp');p.write_bytes(base64.b64decode(src.split(',',1)[1]));img['src']='/admissions/'+p.name
pdf=s.select_one('#doctor-source-pdf');(assets/'thong-bao-tuyen-sinh-tien-si-2026.pdf').write_bytes(base64.b64decode(pdf.get_text().strip()))
css=s.style.get_text();counter=[0]
def font(m):
 counter[0]+=1;p=assets/('reference-font-'+str(counter[0])+'.woff2');p.write_bytes(base64.b64decode(m[1]));return '/admissions/'+p.name
css=re.sub(r'data:font/woff2;base64,([A-Za-z0-9+/=]+)',font,css);Path('outputs/admissions-reference.css').write_text(css,encoding='utf-8')
engine=s.select('script')[-1].get_text()
engine=re.sub(r"function downloadDoctorPdf\(\)\{.*?\n\}","function downloadDoctorPdf(){const a=document.createElement('a');a.href='/admissions/thong-bao-tuyen-sinh-tien-si-2026.pdf';a.download='thong-bao-tuyen-sinh-tien-si-2026.pdf';document.body.appendChild(a);a.click();a.remove();}",engine,flags=re.S)
engine=engine.replace('window.addEventListener(', 'listen(window,').replace('document.addEventListener(', 'listen(root,')
for script in s.select('script'):script.decompose()
# Explicit local navigation; retain the source portal, tel/mailto and in-page links.
for a in s.select('a[href]'):
 if a['href'].startswith('https://vgg-vgg4.vercel.app/vi'):a['href']=a['href'].replace('https://vgg-vgg4.vercel.app/vi','/vi',1) or '/vi'
html=''.join(str(c) for c in s.body.contents)
(dest/'reference-content.json').write_text(json.dumps({'html':html},ensure_ascii=False),encoding='utf-8')
preamble='''// Adapted from the user-supplied admissions reference, 25/10/2026.
// Data and UI logic are bundled as a local module; no source scripts are evaluated.
export function initializeAdmissions(root) {
const originalTitle = globalThis.document.title;
const controller = new AbortController();
const timers = new Set();
const setTimeout = (fn, ms) => {const id=globalThis.setTimeout(()=>{timers.delete(id);fn();},ms);timers.add(id);return id;};
const listen = (target, event, callback, options={}) => target.addEventListener(event, callback, {...options, signal:controller.signal});
const document = {
 querySelector: selector => root.querySelector(selector),
 querySelectorAll: selector => root.querySelectorAll(selector),
 getElementById: id => Array.from(root.querySelectorAll('[id]')).find(e=>e.id===id),
 createElement: tag => globalThis.document.createElement(tag),
 body: root,
 get activeElement(){return globalThis.document.activeElement;},
 get title(){return globalThis.document.title;},
 set title(value){globalThis.document.title=value;}
};
'''
(dest/'reference-engine.js').write_text(preamble+engine+'''\nreturn () => {controller.abort();timers.forEach(globalThis.clearTimeout);const dialog=root.querySelector('dialog[open]');if(dialog)dialog.close();globalThis.document.title=originalTitle;};
}
''',encoding='utf-8')
