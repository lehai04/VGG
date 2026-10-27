"""Verify generated static references, copy runtime templates and produce ZIP."""
import hashlib, json, re, shutil, zipfile, os
from pathlib import Path
from urllib.parse import urlsplit, unquote
from bs4 import BeautifulSoup
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/os.environ.get('VGG_SNAPSHOT_OUT', 'outputs/vgg-static-handover')
SITE=OUT/'site'
manifest=json.loads((OUT/'manifest.json').read_text(encoding='utf-8'))
for file in (ROOT/'scripts/static-handover').iterdir():
    if file.is_file(): shutil.copy2(file,OUT/file.name)
if manifest['source'].startswith('http://localhost:'):
    readme=OUT/'README.txt'
    content=readme.read_text(encoding='utf-8')
    content=content.replace('Nguồn: https://vgg-vlu-demo.vercel.app/', 'Nguồn: bản production build từ mã nguồn local sau nâng cấp Next.js 16.4.3; Node.js 26.12.1.')
    content=content.replace('Chưa xác minh được commit GitHub tương ứng vì kết nối Vercel không đọc được deployment.', 'Mốc Git và thay đổi local: '+manifest['source_commit']+'\nNội dung dùng dữ liệu mặc định trong mã nguồn; chưa xác minh đồng bộ CMS/database production.\nKhông cần truy cập localhost của máy phát triển để chạy gói này.\nFile .bundle bàn giao trước đây là phiên bản cũ, không tương đương ZIP cập nhật này.')
    readme.write_text(content,encoding='utf-8')
types={}
for file in (ROOT/os.environ.get('VGG_SNAPSHOT_CACHE', 'outputs/vgg-static-cache')).glob('*.json'):
    meta=json.loads(file.read_text(encoding='utf-8'))
    matches=list((SITE/'assets').glob(file.stem[:24]+'.*'))
    for match in matches: types['/assets/'+match.name]=meta['type']
resolutions=[]
for failure in manifest['failures']:
    if failure['kind']=='asset' and 'images.unsplash.com/' in failure['url'] and '404' in failure['error']:
        placeholder=SITE/failure['local'].lstrip('/')
        placeholder.write_text('<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="1200" height="800" fill="#e8e8ec"/><text x="600" y="400" text-anchor="middle" font-family="Arial" font-size="32" fill="#45455a">Ảnh nguồn không khả dụng (HTTP 404)</text></svg>',encoding='utf-8')
        types[failure['local']]='image/svg+xml'
        resolutions.append({'url':failure['url'],'local':failure['local'],'resolution':'Explicit labelled placeholder; original source returned HTTP 404. Not an original image.'})
manifest['source_asset_exceptions']=resolutions
(OUT/'content-types.json').write_text(json.dumps(types,indent=2),encoding='utf-8')
nginx='''# Replace /srv/vgg-static-handover/site with the extracted site directory.
# Bind/access restrictions should follow IT's internal test network policy.
server {
    listen 127.0.0.1:8080;
    server_name localhost;
    root /srv/vgg-static-handover/site;
    index index.html;
    include mime.types;
    add_header X-Robots-Tag "noindex, nofollow" always;
    add_header X-Content-Type-Options nosniff always;
    location / { try_files $uri $uri/ =404; }
'''
for local,mime in sorted(types.items()):
    safe=mime.split(';')[0]
    if re.fullmatch(r'[a-zA-Z0-9.+-]+/[a-zA-Z0-9.+-]+',safe):
        nginx+='    location = '+local+' { types {} default_type '+safe+'; }\n'
(OUT/'nginx-test.conf').write_text(nginx+'}\n',encoding='utf-8')
missing=[]; remote_embeds=[]; scripts=[]; active_forms=[]; page_count=0
def check(raw,source):
    if not raw or raw.startswith(('data:','#','mailto:','tel:')):return
    p=urlsplit(raw)
    if p.scheme or p.netloc:return
    target=SITE/p.path.lstrip('/') if p.path.startswith('/') else source.parent/p.path
    if target.is_dir():target=target/'index.html'
    if not target.exists():missing.append({'file':str(source.relative_to(SITE)),'target':raw})
for file in SITE.rglob('*.html'):
    page_count+=1
    soup=BeautifulSoup(file.read_text(encoding='utf-8'),'html.parser')
    for button in soup.select('button[aria-controls]'):
        if 'menuButton' in button.get('class',[]):continue
        panel=soup.find(id=button['aria-controls'])
        if panel:
            panel.attrs.pop('hidden',None);panel['aria-hidden']='false'
            panel['style']=panel.get('style','')+';display:block;max-height:none;height:auto;opacity:1;visibility:visible;'
            button['aria-expanded']='true';button['disabled']=''
    for counter in soup.select('strong[aria-label]'):
        if re.fullmatch(r'\d+',counter['aria-label']) and re.fullmatch(r'0+',counter.get_text(strip=True)):
            counter.string=counter['aria-label']
    file.write_text(str(soup),encoding='utf-8')
    for tag in soup.select('[src],[poster],link[href],a[href]'):
        for attr in ('src','poster','href'):
            if attr in tag.attrs:
                check(tag[attr],file)
                if tag.name!='a' and tag[attr].startswith(('https:','http:')):remote_embeds.append(tag[attr])
    for tag in soup.select('[srcset]'):
        if not tag['srcset'].startswith('data:'):
            for item in tag['srcset'].split(','):check(item.strip().split()[0],file)
    for script in soup.select('script[src]'):
        if script['src']!='/snapshot.js':scripts.append(script['src'])
    for form in soup.select('form'):
        if form.get('action') or any(not t.has_attr('disabled') for t in form.select('input,select,textarea,button')):active_forms.append(str(file.relative_to(SITE)))
for file in SITE.rglob('*.css'):
    for match in re.finditer(r'url\([\"\']?(.*?)[\"\']?\)',file.read_text(encoding='utf-8')):check(match.group(1),file)
report={'html_files':page_count,'asset_files':len(list((SITE/'assets').glob('*'))),'missing_local_references':missing,'remote_embedded_assets':sorted(set(remote_embeds)),'unexpected_runtime_scripts':scripts,'active_forms':active_forms,'crawl_failures':manifest['failures'],'static_integrity_pass':not(missing or remote_embeds or scripts or active_forms),'scope':'File-level verification. See README for unsupported dynamic functions.'}
for page in manifest['pages']:
    page['sha256']=hashlib.sha256((SITE/page['local'].lstrip('/')/'index.html').read_bytes()).hexdigest()
(OUT/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
(OUT/'verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
checksums=[]
for file in sorted(OUT.rglob('*')):
    if file.is_file() and file.name!='SHA256SUMS.txt':checksums.append(hashlib.sha256(file.read_bytes()).hexdigest()+'  '+file.relative_to(OUT).as_posix())
(OUT/'SHA256SUMS.txt').write_text('\n'.join(checksums)+'\n',encoding='utf-8')
archive=ROOT/os.environ.get('VGG_SNAPSHOT_ZIP', 'outputs/VGG-STATIC-IT.zip')
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED,compresslevel=6) as z:
    for file in sorted(OUT.rglob('*')):
        if file.is_file():z.write(file,'VGG-STATIC-IT/'+file.relative_to(OUT).as_posix())
print(json.dumps({'zip':str(archive),'bytes':archive.stat().st_size,'pages':page_count,'assets':report['asset_files'],'missing_refs':len(missing),'crawl_failures':len(manifest['failures']),'integrity_pass':report['static_integrity_pass']},ensure_ascii=False))
