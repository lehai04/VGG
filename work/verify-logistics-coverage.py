from pathlib import Path
from bs4 import BeautifulSoup
import json,re
out=Path('outputs/logistics-update')
source=BeautifulSoup(Path('C:/Users/lepha/Downloads/thac-si-logistics-va-quan-ly-chuoi-cung-ung.html').read_text(encoding='utf-8'),'html.parser')
rendered=json.loads((out/'rendered.json').read_text(encoding='utf-8'))
def normalize(text): return re.sub(r'\s+','',text).casefold()
all_text=normalize(rendered['text'])
units=[]
for e in source.main.select('h1,h2,h3,h4,p,li,dt,dd,td,figcaption,summary'):
 fragment=BeautifulSoup(str(e),'html.parser')
 for decoration in fragment.select('[aria-hidden="true"]'): decoration.decompose()
 value=fragment.get_text(' ',strip=True)
 if value and len(value)>2:
  section=e.find_parent('section');identifier=section.get('id') if section else None
  units.append({'section':identifier,'tag':e.name,'text':value,'present':normalize(value) in all_text})
unique={u['section'].__str__()+'|'+u['text']:u for u in units};units=list(unique.values())
result={'checked':len(units),'present':sum(u['present'] for u in units),'missing':[u for u in units if not u['present']],'units':units}
(out/'coverage.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({k:v for k,v in result.items() if k!='units'},ensure_ascii=False,indent=2))


