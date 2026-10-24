from pathlib import Path
import json,urllib.request,urllib.parse,concurrent.futures,time
sources=json.loads(Path('work/programme-image-sources.json').read_text(encoding='utf-8'));dest=Path('frontend/public/images/programme-library');dest.mkdir(parents=True,exist_ok=True)
def download(p):
 u=urllib.parse.urlsplit(p['url']);query=urllib.parse.parse_qs(u.query);query.update({'w':['1600'],'q':['80'],'fm':['jpg'],'fit':['max']});url=urllib.parse.urlunsplit((u.scheme,u.netloc,u.path,urllib.parse.urlencode(query,doseq=True),''));path=dest/(p['key']+'.jpg')
 for attempt in range(3):
  try:
   data=urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'}),timeout=40).read();assert data[:2]==b'\xff\xd8','Not JPEG';path.write_bytes(data);return {**p,'credit':'Unsplash','path':'/images/programme-library/'+path.name,'bytes':len(data)}
  except Exception as e:
   if attempt==2:return {**p,'error':str(e)}
   time.sleep(1)
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:results=list(pool.map(download,sources))
Path('outputs/programme-image-downloads.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8');print([(p['key'],p.get('bytes',p.get('error'))) for p in results])
