import concurrent.futures as cf
import json, os
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import HTTPError
ROOT=Path(__file__).resolve().parents[1]/os.environ.get('VGG_SNAPSHOT_OUT', 'outputs/vgg-static-handover')
BASE=os.environ.get('VGG_STATIC_TEST_URL', 'http://127.0.0.1:8080')
manifest=json.loads((ROOT/'manifest.json').read_text(encoding='utf-8'))
paths=[p['local'] for p in manifest['pages']]+['/page-index.html','/snapshot.css','/snapshot.js']
paths+=['/assets/'+p.name for p in (ROOT/'site/assets').glob('*')]
def check(path):
    try:
        with urlopen(Request(BASE+path,method='HEAD'),timeout=15) as r:
            if r.status!=200: return {'path':path,'error':r.status}
    except Exception as e:return {'path':path,'error':str(e)}
with cf.ThreadPoolExecutor(max_workers=8) as pool:
    failures=[r for r in pool.map(check,paths) if r]
try:
    urlopen(Request(BASE+'/api/consultations',data=b'{}',method='POST'),timeout=10)
    post_blocked=False
except HTTPError as e: post_blocked=e.code==405
video=next(iter((ROOT/'site/assets').glob('*.webm')),None)
range_ok=None
if video:
    with urlopen(Request(BASE+'/assets/'+video.name,headers={'Range':'bytes=0-99'}),timeout=10) as r:
        range_ok=r.status==206 and len(r.read())==100
result={'checked_urls':len(paths),'failures':failures,'post_blocked':post_blocked,'video_range_ok':range_ok,'pass':not failures and post_blocked and range_ok is not False}
(ROOT/'http-verification.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
print(json.dumps(result))
