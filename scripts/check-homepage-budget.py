"""Conservative cold-cache asset budget: HTML, scripts, CSS, all img fallbacks,
CSS URLs (including fonts/backgrounds), and preload assets. Includes lazy images;
excludes navigation prefetches, API responses, and browser extension traffic.
Run against next start, not next dev. No browser cache or cookies are used.
"""
import gzip
import json
import re
import sys
from html.parser import HTMLParser
from urllib.parse import urljoin
from urllib.request import Request, urlopen
from pathlib import Path

base = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:3500/vi'
limit = 3_000_000
pending = [base]
seen = set()
rows = []

def enqueue(value, origin):
    if value and not value.startswith(('data:', '#')):
        pending.append(urljoin(origin, value))

class Assets(HTMLParser):
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in ('script', 'img', 'source', 'video', 'audio'):
            enqueue(a.get('src'), base)
            enqueue(a.get('poster'), base)
        if tag == 'link' and a.get('rel') in ('stylesheet', 'preload', 'modulepreload', 'icon'):
            enqueue(a.get('href'), base)

while pending:
    url = pending.pop(0)
    if url in seen:
        continue
    seen.add(url)
    print("FETCH", url, flush=True)
    req = Request(url, headers={'Accept-Encoding': 'gzip', 'Accept': 'image/webp,*/*;q=0.8'})
    with urlopen(req, timeout=90) as response:
        data = response.read()
        size = len(data)
        kind = response.headers.get('Content-Type', '')
        if response.headers.get('Content-Encoding') == 'gzip':
            data = gzip.decompress(data)
    rows.append({'url': url, 'bytes': size, 'type': kind})
    if 'text/html' in kind:
        Assets().feed(data.decode('utf-8'))
    elif 'text/css' in kind:
        for value in re.findall(r'url\([\s\"\x27]*([^\)\"\x27]+)', data.decode('utf-8')):
            enqueue(value.strip(), url)

total = sum(row['bytes'] for row in rows)
report = {'page': base, 'limitBytes': limit, 'transferBytes': total,
          'passed': total < limit, 'resources': sorted(rows, key=lambda row: -row['bytes'])}
Path('outputs/media-budget').mkdir(parents=True, exist_ok=True)
Path('outputs/media-budget/homepage.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
print(json.dumps({'bytes': total, 'MB': round(total / 1_000_000, 3), 'requests': len(rows), 'passed': total < limit}))
for row in report['resources'][:10]:
    print(row['bytes'], row['url'])
sys.exit(0 if total < limit else 1)
