"""Inventory editable text/URL slots in the reviewed admissions template.
Does not rewrite the template, its IDs, forms, scripts, or application rules.
"""
import json
import re
from html import unescape
from html.parser import HTMLParser
from pathlib import Path

source = json.loads(Path('frontend/src/features/admissions/reference-content.json').read_text(encoding='utf-8'))['html']
lines = [0]
for match in re.finditer('\n', source):
    lines.append(match.end())
slots = []
defaults = {}
engine = Path('frontend/src/features/admissions/reference-engine.js').read_text(encoding='utf-8')
editable_dynamic = {'.hero-title-label', '#intake-title', '#intake-badge', '#faq-intro'}
dynamic_ids = {selector[1:] for selector in re.findall(r'\$\("([^"]+)"\)\.(?:textContent|innerHTML)\s*=', engine) if selector.startswith('#') and selector not in editable_dynamic}
class Inventory(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack = []
        self.section = 'introduction'
    def position_offset(self):
        line, column = self.getpos()
        return lines[line - 1] + column
    def add(self, start, end, value, kind):
        if not value.strip(): return
        group = self.section.replace('.', '-')
        fields = defaults.setdefault(group, {})
        key = f'{kind}_{len(fields)+1:03}'
        fields[key] = value
        slots.append({'section': group, 'key': key, 'start': len(source[:start].encode('utf-16-le'))//2, 'end': len(source[:end].encode('utf-16-le'))//2, 'type': kind})
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'section': self.section = attrs.get('id', self.section)
        blocked = any(item[1] for item in self.stack) or tag in {'script','style','svg','option','select','textarea'} or attrs.get('id') in dynamic_ids or 'data-degree-label' in attrs or (tag == 'label' and attrs.get('for') == 'intake-select')
        if tag not in {'img','br','hr','input','meta','link','source','area','wbr'}: self.stack.append((tag, blocked))
        if blocked or tag in {'path','use','input','option'}: return
        raw = self.get_starttag_text()
        start = self.position_offset()
        for match in re.finditer(r'\b(src|href|alt)\s*=\s*([\"\'])(.*?)\2', raw, re.S):
            name, _, value = match.groups()
            if name == 'src' and tag != 'img': continue
            if name == 'href' and (tag != 'a' or value.startswith('#')): continue
            self.add(start+match.start(3), start+match.end(3), unescape(value), 'image' if name=='src' else 'url' if name=='href' else 'text')
    def handle_endtag(self, tag):
        tags = [item[0] for item in self.stack]
        if tag in tags:
            self.stack = self.stack[:len(tags)-1-tags[::-1].index(tag)]
    def handle_data(self, data):
        if any(item[1] for item in self.stack): return
        start = self.position_offset()
        end = source.find('<', start)
        if end < 0: end = len(source)
        self.add(start, end, unescape(source[start:end]), 'text')

parser = Inventory()
parser.feed(source)
Path('frontend/src/features/admissions/cms-copy.json').write_text(json.dumps({'defaults': defaults, 'slots': slots}, ensure_ascii=False, indent=2)+'\n',encoding='utf-8')
print(f'Inventoried {len(slots)} admissions copy slots; template unchanged.')
