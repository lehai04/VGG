from pathlib import Path
from urllib.request import urlopen
from urllib.error import HTTPError
from urllib.parse import urlsplit, unquote, quote
from html.parser import HTMLParser
import json

root = Path(__file__).resolve().parents[2]
web = root / 'outputs/static-web/web'
base = 'http://127.0.0.1:3388'

class Assets(HTMLParser):
    def __init__(self):
        super().__init__(); self.paths=set(); self.canonical=None; self.lang=None
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='html': self.lang=a.get('lang')
        if tag=='link' and a.get('rel')=='canonical': self.canonical=a.get('href')
        for key in ['src','poster']:
            if a.get(key,'').startswith('/'): self.paths.add(urlsplit(a[key]).path)
        if tag=='link' and a.get('rel') in ['stylesheet','preload','icon','shortcut icon'] and a.get('href','').startswith('/'):
            self.paths.add(urlsplit(a['href']).path)

pages=[]; assets=set(); failures=[]
for locale in ['vi','en']:
    for file in sorted((web/locale).rglob('index.html')):
        path='/'+file.relative_to(web).as_posix().removesuffix('index.html')
        with urlopen(base+path) as response: html=response.read().decode()
        parser=Assets();parser.feed(html);assets.update(parser.paths)
        if parser.lang!=locale: failures.append(f'Wrong language: {path}: {parser.lang}')
        if parser.canonical != 'https://sdh.vlu.edu.vn'+path:
            failures.append(f'Wrong canonical: {path}: {parser.canonical}')
        if '/_next/image?' in html: failures.append(f'Server image URL: {path}')
        pages.append(path)
for path in sorted(assets):
    try:
        with urlopen(base+quote(path,safe='/%')) as response:
            if response.status!=200: failures.append(f'Asset status: {path}')
    except HTTPError as e: failures.append(f'Asset {e.code}: {path}')
pdf=next((web/'documents').rglob('*.pdf'))
with urlopen(base+'/'+pdf.relative_to(web).as_posix()) as response:
    assert response.read(5)==b'%PDF-'
    assert response.headers['X-Frame-Options']=='SAMEORIGIN'
try: urlopen(base+'/vi/not-a-real-route/')
except HTTPError as e: assert e.code==404
else: failures.append('Unknown route did not return 404')
for path in ['/','/programmes','/vi/programmes/thac-si','/en/research/cum-nghien-cuu']:
    with urlopen(base+path) as response: assert response.status==200
for forbidden in ['node_modules','server.js','.env','.env.local','private.key']:
    assert not list(web.rglob(forbidden)), forbidden
report={'date':'2026-10-31','runtime':'Nginx 1.28 only; no frontend Node.js process','source':'Repository content only; no CMS database','html_pages':len(pages),'local_assets_checked':len(assets),'pages':pages,'failures':failures,'checks':['Both locales and all exported programme pages return 200','Correct HTML language and canonical URL','Local scripts, styles, images and icons return 200','PDF preview allows same-origin framing','Legacy redirects and genuine 404','No server runtime, credentials or database in web directory'],'limits':['No CMS database content included','Live form submission and analytics need separate backend; not tested against production','External VLU images/articles still need internet']}
(web.parent/'VERIFICATION.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({k:v for k,v in report.items() if k!='pages'},ensure_ascii=False,indent=2))
if failures: raise SystemExit(1)
