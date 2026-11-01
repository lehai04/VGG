"""Package operator-facing documentation; does not include source or test TLS keys."""
from pathlib import Path
import html
import re
import shutil

root = Path(__file__).resolve().parents[2]
src = root / 'deploy' / 'handover'
out = root / 'outputs' / 'sdh-handover'
out.mkdir(parents=True, exist_ok=True)
for sub in ('config', 'sql'):
    (out / sub).mkdir(exist_ok=True)
for name in ('frontend.env.example', 'backend.env.example', 'sdh.nginx.conf', 'vgg-frontend.service', 'vgg-backend.service'):
    shutil.copy2(src / name, out / 'config' / name)
shutil.copy2(src / 'sql' / '01-schema.sql', out / 'sql' / '01-schema.sql')
shutil.copy2(src / 'README.md', out / 'HUONG-DAN-TRIEN-KHAI.md')

diagram = '''<svg viewBox="0 0 900 510" role="img" aria-label="Sơ đồ kết nối FE BE PostgreSQL và gateway">
<defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#45617a"/></marker></defs>
<g fill="#eef5fb" stroke="#6385a2" stroke-width="1.5">
<rect x="315" y="12" width="270" height="55" rx="10"/><rect x="290" y="112" width="320" height="65" rx="10"/>
<rect x="35" y="240" width="240" height="65" rx="10"/><rect x="330" y="240" width="240" height="65" rx="10"/>
<rect x="660" y="240" width="210" height="65" rx="10"/>
<rect x="305" y="400" width="260" height="65" rx="10"/><rect x="635" y="400" width="240" height="65" rx="10"/></g>
<g fill="none" stroke="#45617a" stroke-width="2" marker-end="url(#arrow)">
<path d="M450 67V112"/><path d="M340 177L155 240"/><path d="M450 177V240"/><path d="M560 177L765 240"/>
<path d="M275 270H330"/><path d="M435 305V400"/><path d="M520 305L755 400" stroke-dasharray="6 5"/></g>
<g text-anchor="middle" fill="#183447" font-family="Arial,sans-serif" font-size="16">
<text x="450" y="46">Trình duyệt người dùng</text><text x="510" y="95" font-size="13">HTTPS 443</text>
<text x="450" y="139">Nginx · sdh.vlu.edu.vn</text><text x="450" y="160" font-size="13">TLS và reverse proxy</text>
<text x="155" y="266">FE · Next.js Node.js</text><text x="155" y="288" font-size="13">localhost:3000 · ảnh/PDF kèm build</text>
<text x="450" y="266">BE · Fastify Node.js</text><text x="450" y="288" font-size="13">127.0.0.1:4000</text>
<text x="765" y="266">/cms → 404</text><text x="765" y="288" font-size="13">Chưa có ứng dụng CMS</text>
<text x="435" y="427">PostgreSQL 17</text><text x="435" y="450" font-size="13">DATABASE_URL · TCP 5432</text>
<text x="755" y="427">MinIO · tùy chọn</text><text x="755" y="450" font-size="13">Media cũ qua S3 API</text>
<text x="165" y="201" font-size="13">Trang web và /api/*</text><text x="510" y="213" font-size="13">/gateway/*</text>
<text x="302" y="322" font-size="13">FE gọi BE nội bộ</text><text x="450" y="490" font-size="13">Cổng FE, BE và DB chỉ dùng loopback hoặc mạng riêng</text></g></svg>'''

def inline(s):
    s = html.escape(s)
    s = re.sub(r'`([^`]+)`', r'<code>\1</code>', s)
    s = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', s)
    return re.sub(r'\[([^\]]+)\]\((https?://[^)]+)\)', r'<a href="\2">\1</a>', s)

lines = (src / 'README.md').read_text(encoding='utf-8').splitlines()
blocks = []
i = 0
while i < len(lines):
    line = lines[i]
    if line.startswith('```'):
        lang = line[3:]
        code = []
        i += 1
        while i < len(lines) and not lines[i].startswith('```'):
            code.append(lines[i]); i += 1
        blocks.append(diagram if lang == 'mermaid' else '<pre><code>' + html.escape('\n'.join(code)) + '</code></pre>')
    elif line.startswith('|'):
        rows = []
        while i < len(lines) and lines[i].startswith('|'):
            cells = [v.strip() for v in lines[i].strip('|').split('|')]
            if not all(re.fullmatch(r'[: -]+', v) for v in cells):
                tag = 'th' if not rows else 'td'
                rows.append('<tr>' + ''.join(f'<{tag}>{inline(c)}</{tag}>' for c in cells) + '</tr>')
            i += 1
        blocks.append('<table>' + ''.join(rows) + '</table>'); continue
    elif line.startswith('#'):
        level = len(line) - len(line.lstrip('#'))
        blocks.append(f'<h{level}>{inline(line[level:].strip())}</h{level}>')
    elif line:
        blocks.append('<p>' + inline(line) + '</p>')
    i += 1

style = '''body{font:16px/1.65 Arial,sans-serif;color:#20374a;max-width:1080px;margin:40px auto;padding:0 28px}h1{font-size:32px;line-height:1.25;color:#133f61}h2{margin-top:38px;font-size:23px;border-bottom:2px solid #d7e4ed;padding-bottom:7px}table{border-collapse:collapse;width:100%;font-size:14px;margin:20px 0}th,td{border:1px solid #ccd9e2;padding:10px;text-align:left;vertical-align:top;overflow-wrap:anywhere}th{background:#eaf1f6}pre{background:#eef2f5;padding:16px;white-space:pre-wrap;overflow-wrap:anywhere;font-size:13px}code{font-family:Consolas,monospace;font-size:.9em}svg{width:100%;height:auto}a{color:#065e99}@media print{body{margin:0;font-size:11pt;padding:0}h2{break-after:avoid}tr,svg{break-inside:avoid}pre{font-size:9pt}}'''
(out / 'HUONG-DAN-TRIEN-KHAI.html').write_text('<!doctype html><html lang="vi"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Bàn giao triển khai SDH</title><style>' + style + '</style><body>' + '\n'.join(blocks) + '</body></html>', encoding='utf-8')
print(out)
