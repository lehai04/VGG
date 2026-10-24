from pathlib import Path
from bs4 import BeautifulSoup
import json, re, hashlib

source=Path('C:/Users/lepha/Downloads/thac-si-marketing.html')
out=Path('outputs/vgg-content-audit');out.mkdir(parents=True,exist_ok=True)
soup=BeautifulSoup(source.read_text(encoding='utf-8'),'html.parser')
def text(e): return ' '.join(e.stripped_strings)
sections=[]
for i,section in enumerate(soup.select('main > section')):
 sections.append({'index':i,'id':section.get('id'),'class':section.get('class'),
  'source':section.get('data-source'),'headings':[text(e) for e in section.select('h1,h2,h3,h4')],
  'text':text(section),'html':str(section) if not section.select('img[src^="data:"]') else None,
  'paragraphs':[text(e) for e in section.select('p')],
  'lists':[[text(li) for li in e.find_all('li',recursive=False)] for e in section.select('ul,ol')],
  'tables':[[[text(c) for c in row.select('th,td')] for row in table.select('tr')] for table in section.select('table')],
  'details':[{'question':text(e.summary),'answer':text(e.select_one('.faq-answer')) if e.select_one('.faq-answer') else text(e)} for e in section.select('details')]})
data={'path':str(source),'sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'title':text(soup.title),
 'sections':sections,'links':[{'text':text(e),'href':e.get('href')} for e in soup.select('a[href]')],
 'images':[{'alt':e.get('alt'),'src':e.get('src','')[:70] if e.get('src','').startswith('data:') else e.get('src'),'width':e.get('width'),'height':e.get('height')} for e in soup.select('img')],
 'programme':next((re.search(r'const PROGRAMME=(.*?);',e.string or '',re.S).group(1) for e in soup.select('script') if 'const PROGRAMME=' in (e.string or '')),None)}
(out/'marketing-source.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
(out/'marketing-source.txt').write_text('\n\n'.join(f"SECTION {s['index']} #{s['id']} {s['class']}\n"+'\n'.join(s['headings'])+'\n'+s['text']+'\nTABLES\n'+json.dumps(s['tables'],ensure_ascii=False,indent=2) for s in sections),encoding='utf-8')
print(json.dumps({'title':data['title'],'sections':[{'id':s['id'],'headings':s['headings'],'tables':len(s['tables'])} for s in sections],'images':data['images'],'programme':data['programme']},ensure_ascii=False,indent=2))
