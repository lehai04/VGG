"""Capture only published public pages. Does not export CMS, credentials or personal records.
Run by release maintainer, not IT: python -X utf8 scripts/package-static-snapshot.py
Requires beautifulsoup4 and curl. Output is ordinary static HTML/CSS/media.
"""
import os
import concurrent.futures as cf
import hashlib
import json
import re
import subprocess
import tempfile
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urljoin, urlsplit, urlunsplit, quote
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = os.environ.get('VGG_SNAPSHOT_ORIGIN', 'https://vgg-vlu-demo.vercel.app').rstrip('/')
OUT = ROOT / os.environ.get('VGG_SNAPSHOT_OUT', 'outputs/vgg-static-handover')
SITE = OUT / 'site'
CACHE = ROOT / os.environ.get('VGG_SNAPSHOT_CACHE', 'outputs/vgg-static-cache')
SITE.mkdir(parents=True, exist_ok=True)
CACHE.mkdir(parents=True, exist_ok=True)
failures, external, assets, pages = [], set(), {}, {}

def canonical(url):
    p = urlsplit(url)
    return urlunsplit((p.scheme, p.netloc, quote(p.path, safe='/%:@'), quote(p.query, safe='=&%+/:?,@'), ''))

def fetch(url):
    url = canonical(url)
    key = hashlib.sha256(url.encode()).hexdigest()
    file, meta = CACHE / key, CACHE / (key + '.json')
    if file.exists() and meta.exists():
        return file.read_bytes(), json.loads(meta.read_text())
    result = subprocess.run(['curl.exe', '-sSL', '--fail', '--retry', '1', '--connect-timeout', '12', '--max-time', '90',
                             '-A', 'VGG-IT-Static-Handover/1.0', '-o', str(file), '-w', '%{content_type}\n%{url_effective}', url],
                            capture_output=True, text=True, encoding='utf-8')
    if result.returncode:
        raise RuntimeError(result.stderr.strip()[-250:])
    lines = result.stdout.splitlines()
    info = {'type': lines[0] if lines else '', 'effective': lines[1] if len(lines)>1 else url}
    meta.write_text(json.dumps(info), encoding='utf-8')
    return file.read_bytes(), info

def public_page(url):
    p = urlsplit(url)
    return p.netloc == urlsplit(ORIGIN).netloc and not re.search(r'/(api|admin|cms-preview)(/|$)', p.path) and not Path(p.path).suffix

def page_path(url):
    p = urlsplit(url)
    if p.query:
        return '/_views/' + hashlib.sha256(url.encode()).hexdigest()[:20] + '/'
    return (p.path.rstrip('/') or '') + '/'

def save(path, data):
    target = SITE / path.lstrip('/')
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes(data if isinstance(data, bytes) else data.encode('utf-8'))

seeds = {ORIGIN+'/', ORIGIN+'/vi', ORIGIN+'/en'}
try:
    data, _ = fetch(ORIGIN+'/sitemap.xml')
    for node in ET.fromstring(data).iter():
        if node.tag.endswith('}loc') and node.text:
            p = urlsplit(node.text)
            seeds.add(canonical(ORIGIN+p.path+('?' + p.query if p.query else '')))
except Exception as exc:
    failures.append({'url': ORIGIN+'/sitemap.xml', 'error': str(exc), 'kind': 'sitemap'})
pending = seeds
seen = set()
with cf.ThreadPoolExecutor(max_workers=6) as pool:
    while pending:
        batch = sorted(pending-seen)
        if not batch: break
        if len(seen)+len(batch)>600: raise RuntimeError('Public crawl exceeded 600 pages; inspect before continuing')
        pending = set()
        jobs = {pool.submit(fetch, u): u for u in batch}
        for job in cf.as_completed(jobs):
            u = jobs[job]; seen.add(u)
            try:
                data, info = job.result()
                if 'text/html' not in info['type']: continue
                soup = BeautifulSoup(data, 'html.parser')
                if not soup.title: raise RuntimeError('Missing page title')
                pages[u] = (soup, info)
                for a in soup.select('a[href]'):
                    href = a['href']
                    target = canonical(urljoin(u, href))
                    if public_page(target): pending.add(target)
            except Exception as exc:
                failures.append({'url': u, 'error': str(exc), 'kind': 'page'})
        print('Captured pages:', len(pages), 'pending:', len(pending-seen), flush=True)

def asset_url(raw, base):
    if not raw or raw.startswith(('data:', '#', 'blob:')): return None
    url = canonical(urljoin(base, raw))
    if urlsplit(url).scheme != 'https' and not (urlsplit(url).scheme == 'http' and urlsplit(url).netloc == urlsplit(ORIGIN).netloc): return None
    return url

def register(raw, base):
    url = asset_url(raw, base)
    if not url: return raw
    if url not in assets:
        # Hash filenames avoid Windows path issues and preserve separate query variants.
        suffix = Path(urlsplit(url).path).suffix
        if not re.fullmatch(r'\.[a-zA-Z0-9]{1,8}', suffix): suffix = '.bin'
        assets[url] = '/assets/'+hashlib.sha256(url.encode()).hexdigest()[:24]+suffix
    return assets[url]

CSS_URL = re.compile(r'url\(\s*([\"\']?)(.*?)\1\s*\)', re.I)
def rewrite_css(text, base):
    return CSS_URL.sub(lambda m: 'url("'+register(m.group(2), base)+'")', text)

inventory = []
for url, (soup, info) in pages.items():
    # Keep structured data, but remove the Next runtime: static hosts cannot serve RSC or POST APIs.
    for script in list(soup.find_all('script')):
        if script.get('type') != 'application/ld+json': script.decompose()
    for link in list(soup.find_all('link')):
        rel = link.get('rel', [])
        if 'stylesheet' in rel or 'icon' in rel:
            if link.get('href'): link['href'] = register(link['href'], url)
        else: link.decompose()
    # Keep one highest-resolution image per element instead of every optimizer width.
    for element in soup.select('img[srcset]'):
        candidates = [v.strip().split() for v in element['srcset'].split(',') if v.strip()]
        if candidates and not element['srcset'].startswith('data:'): element['src'] = candidates[-1][0]
        del element['srcset']
    for frame in list(soup.find_all('iframe')):
        target=frame.get('src','')
        replacement=soup.new_tag('a',href=target)
        replacement.string='Mở nội dung nhúng trên website bên ngoài (cần Internet)'
        frame.replace_with(replacement)
    for element in soup.select('[src], [poster], [srcset], [style]'):
        for attr in ('src', 'poster'):
            if element.get(attr): element[attr] = register(element[attr], url)
        if element.get('srcset') and not element['srcset'].startswith('data:'):
            element['srcset'] = ', '.join(register(v.strip().split()[0], url)+' '+ ' '.join(v.strip().split()[1:]) for v in element['srcset'].split(',') if v.strip())
        if element.get('style'): element['style'] = rewrite_css(element['style'], url)
    for style in soup.find_all('style'):
        style.string = rewrite_css(style.get_text(), url)
    for a in soup.select('a[href]'):
        raw = a['href']; target = canonical(urljoin(url, raw)); frag = urlsplit(urljoin(url, raw)).fragment
        if raw.startswith('#'): continue
        if target in pages:
            # Preserve fragment redirects from the live route.
            effective_frag = urlsplit(pages[target][1]['effective']).fragment
            a['href'] = page_path(target) + ('#'+(frag or effective_frag) if frag or effective_frag else '')
        elif urlsplit(target).netloc == urlsplit(ORIGIN).netloc and (Path(urlsplit(target).path).suffix or '/api/' in target):
            if not target.endswith('.xml'): a['href'] = register(target, url)
            else: a['href'] = '/page-index.html'
        elif raw.startswith(('http:', 'https:')):
            external.add(raw)
    # Prevent accidental sending of personal information from the internal review copy.
    for form in soup.find_all('form'):
        form.attrs.pop('action', None); form.attrs.pop('method', None)
        note = soup.new_tag('p'); note['class'] = 'snapshot-form-note'
        note.string = 'Bản tĩnh kiểm thử: biểu mẫu không gửi hoặc lưu dữ liệu. Liên hệ theo thông tin trên website.'
        form.insert(0, note)
        for control in form.select('input,textarea,select,button'):
            control['disabled'] = ''
    for button in soup.find_all('button'):
        if 'menuButton' not in button.get('class', []) and not button.has_attr('aria-controls'):
            button['disabled'] = ''; button['title'] = 'Chức năng tương tác không có trong bản chụp tĩnh'
    for control in soup.select('input,select,textarea'):
        control['disabled'] = ''
    # Expand server-rendered controlled panels so their captured content remains readable.
    for button in soup.select('button[aria-controls]'):
        if 'menuButton' in button.get('class', []): continue
        panel = soup.find(id=button['aria-controls'])
        if panel:
            panel.attrs.pop('hidden', None); panel['aria-hidden'] = 'false'
            panel['style'] = panel.get('style', '')+';display:block;max-height:none;height:auto;opacity:1;visibility:visible;'
            button['aria-expanded'] = 'true'
            button['disabled'] = ''
    for counter in soup.select('strong[aria-label]'):
        if re.fullmatch(r'\d+', counter['aria-label']) and re.fullmatch(r'0+', counter.get_text(strip=True)):
            counter.string = counter['aria-label']
    robots = soup.new_tag('meta', attrs={'name':'robots','content':'noindex,nofollow'})
    if soup.head: soup.head.append(robots)
    css = soup.new_tag('link', rel='stylesheet', href='/snapshot.css'); soup.head.append(css)
    js = soup.new_tag('script', src='/snapshot.js', defer=True); soup.body.append(js)
    banner = soup.new_tag('aside', attrs={'class':'snapshot-notice'})
    banner.string = 'VGG · Bản tĩnh kiểm thử · Không kết nối hệ thống thật · '
    index = soup.new_tag('a', href='/page-index.html'); index.string='Danh mục trang & tìm kiếm'; banner.append(index)
    soup.body.insert(0, banner)
    path = page_path(url)+'index.html'
    save(path, str(soup))
    inventory.append({'url':url,'local':page_path(url),'title':soup.title.get_text(),'sha256':hashlib.sha256(str(soup).encode()).hexdigest()})

downloaded = set()
with cf.ThreadPoolExecutor(max_workers=8) as pool:
    while True:
        batch = set(assets)-downloaded
        if not batch: break
        jobs = {pool.submit(fetch,u):u for u in batch}
        for job in cf.as_completed(jobs):
            url = jobs[job]; downloaded.add(url)
            try:
                data, info = job.result()
                if 'text/html' in info['type']: raise RuntimeError('Asset returned HTML instead of media')
                if 'text/css' in info['type'] or assets[url].endswith('.css'):
                    data = rewrite_css(data.decode('utf-8'), url).encode()
                save(assets[url],data)
            except Exception as exc:
                failures.append({'url':url,'error':str(exc),'kind':'asset','local':assets[url]})
        print('Assets processed:',len(downloaded),'pending:',len(set(assets)-downloaded),flush=True)

save('/snapshot.css', '''.snapshot-notice{position:relative;z-index:10000;background:#fff2ce;color:#302400;padding:8px 16px;font:13px/1.5 Arial,sans-serif}.snapshot-notice a{color:inherit;text-decoration:underline}.snapshot-form-note{padding:12px;background:#fff2ce;color:#302400;font-size:14px} [data-reveal]{opacity:1!important;transform:none!important} button[disabled]{cursor:not-allowed}''')
save('/snapshot.js', '''document.addEventListener('submit',e=>e.preventDefault(),true);document.querySelectorAll('.menuButton').forEach(b=>{b.addEventListener('click',()=>{const n=document.getElementById(b.getAttribute('aria-controls'));if(n){const open=n.classList.toggle('open');b.setAttribute('aria-expanded',String(open));}});});document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelectorAll('.nav.open').forEach(n=>n.classList.remove('open'));document.querySelectorAll('.menuButton').forEach(b=>b.setAttribute('aria-expanded','false'));}});''')
from html import escape
links=''.join('<li><a href="'+escape(p['local'],quote=True)+'">'+escape(p['title'])+'</a> <small>'+escape(urlsplit(p['url']).path)+'</small></li>' for p in sorted(inventory,key=lambda x:x['url']))
save('/page-index.html', '<!doctype html><html lang="vi"><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><meta name="viewport" content="width=device-width"><title>VGG — Danh mục bản tĩnh</title><style>body{font:17px/1.7 Arial;max-width:1000px;margin:40px auto;padding:20px}input{padding:12px;width:90%}li{margin:8px 0}small{color:#666}</style><h1>VGG — Danh mục trang đã đóng gói</h1><p>Bản chụp nội dung công khai để kiểm thử. Không có CMS, gửi form, tìm kiếm động hoặc dữ liệu quản trị. Liên kết sang website bên ngoài vẫn cần Internet.</p><input id="q" aria-label="Tìm trang" placeholder="Tìm trong các trang đã đóng gói"><ul>'+links+'</ul><script>document.getElementById("q").oninput=e=>{const q=e.target.value.toLocaleLowerCase();document.querySelectorAll("li").forEach(x=>x.hidden=!x.textContent.toLocaleLowerCase().includes(q));};</script></html>')
manifest={'source':ORIGIN,'captured_at_utc':datetime.now(timezone.utc).isoformat(),'source_commit':os.environ.get('VGG_SOURCE_COMMIT', 'UNVERIFIED: Vercel connector cannot resolve deployment'),'scope':'Published HTML reachable via sitemap and public links; not a database export','pages':inventory,'asset_count':len(assets),'external_links':sorted(external),'failures':failures,'limitations':['No CMS/login/form submission','No Next.js hydration or dynamic client filters; snapshot controls disabled','Only server-rendered public content captured; client-only or unpublished content is not included','External websites are links, not copied pages']}
(OUT/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'pages':len(pages),'assets':len(assets),'failures':len(failures),'output':str(OUT)},ensure_ascii=False),flush=True)
