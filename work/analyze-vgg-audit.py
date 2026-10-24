from pathlib import Path
from bs4 import BeautifulSoup
from urllib.parse import urlsplit,unquote
import json,re
out=Path('outputs/vgg-content-audit')
rows=json.loads((out/'http-route-results.json').read_text(encoding='utf-8'))
def clean_path(value):
 path=urlsplit(value).path
 path=re.sub(r'^/(vi|en)(?=/|$)','',path)
 return path or '/'
pages={}
for row in rows:
 if row.get('file') and row.get('status')==200:
  doc=BeautifulSoup((out/'http-pages'/row['file']).read_text(encoding='utf-8'),'html.parser')
  row['h1']=[e.get_text(' ',strip=True) for e in doc.select('h1')]
  row['ids']=[e['id'] for e in doc.select('[id]')]
  row['duplicateIds']=sorted({id for id in row['ids'] if row['ids'].count(id)>1})
  row['sections']=[{'id':e.get('id'),'title':e.select_one('h2').get_text(' ',strip=True) if e.select_one('h2') else None} for e in doc.select('main > section')]
  row['sourceLabels']=len(re.findall('Đặc điểm nổi bật [123]|Nhóm đối tượng [123]|Ext: XXXX',doc.get_text()))
  row['assetMissing']=[]
  for img in doc.select('img[src]'):
   src=img['src']
   if src.startswith('/images/') and not (Path('frontend/public')/src.lstrip('/')).exists():row['assetMissing'].append(src)
  pages[clean_path(row['finalUrl'])]=(doc,row)

broken=[]
for row in rows:
 if row.get('status')!=200 or not row.get('file') or row['route'].endswith(('.xml','.txt')):continue
 doc=BeautifulSoup((out/'http-pages'/row['file']).read_text(encoding='utf-8'),'html.parser')
 url=urlsplit(row['finalUrl'])
 if url.fragment and unquote(url.fragment) not in row['ids']:broken.append({'from':row['route'],'href':row['finalUrl'],'kind':'redirect-anchor'})
 for a in doc.select('a[href]'):
  href=a['href'];parts=urlsplit(href)
  if parts.scheme and parts.netloc not in ['localhost:3000']:continue
  if not href.startswith(('/','#')):continue
  path=clean_path(href) if not href.startswith('#') else clean_path(row['finalUrl'])
  if path.startswith(('/api/','/_next/')):continue
  if path in pages and parts.fragment and unquote(parts.fragment) not in pages[path][1]['ids']:
   broken.append({'from':row['route'],'href':href,'kind':'link-anchor'})
summary={'routes':len(rows),'httpErrors':[{'route':r['route'],'status':r.get('status'),'error':r.get('error')} for r in rows if r.get('error') or r.get('status',0)>=400], 'brokenAnchors':broken,'duplicateIds':[{'route':r['route'],'ids':r['duplicateIds']} for r in rows if r.get('duplicateIds')],'liveMissingAssets':[{'route':r['route'],'assets':r['assetMissing']} for r in rows if r.get('assetMissing')],'remainingPlaceholderLabels':[r['route'] for r in rows if r.get('sourceLabels')]}
(out/'route-content-inventory.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding='utf-8')
(out/'audit-summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(summary,ensure_ascii=False,indent=2))
