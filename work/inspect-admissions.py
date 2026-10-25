import json
from html.parser import HTMLParser
from pathlib import Path
class Outline(HTMLParser):
    def __init__(self):
        super().__init__(); self.depth=0
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag in ('section','main','nav','footer','form','dialog') or 'degree' in a.get('id',''):
            print(' '*self.depth+tag+' '+str(a))
        if tag not in ('img','input','br','hr','meta','link','path','use'): self.depth+=1
    def handle_endtag(self, tag):
        if tag not in ('img','input','br','hr','meta','link','path','use'): self.depth=max(0,self.depth-1)
Outline().feed(json.loads(Path('frontend/src/features/admissions/reference-content.json').read_text(encoding='utf-8'))['html'])
