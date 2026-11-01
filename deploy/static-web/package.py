from pathlib import Path
import hashlib,json,zipfile

root=Path(__file__).resolve().parents[2]
output=root/'outputs/static-web'
report=json.loads((output/'VERIFICATION.json').read_text(encoding='utf-8'))
if report['failures'] or report.get('browser',{}).get('errors') or not report.get('browser'):
    raise SystemExit('Complete HTTP and browser verification before packaging')
target=output/'saudaihoc_web_static_2026-10-31.zip'
with zipfile.ZipFile(target,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=6) as z:
    for file in sorted((output/'web').rglob('*')):
        if file.is_file(): z.write(file,file.relative_to(output).as_posix())
    z.write(root/'deploy/static-web/README.md','README.md')
    z.write(root/'deploy/static-web/sdh.vlu.edu.vn.conf','nginx/sdh.vlu.edu.vn.conf')
    z.write(root/'deploy/static-web/routes.conf','nginx/sdh-static-routes.conf')
    z.write(output/'VERIFICATION.json','VERIFICATION.json')
with zipfile.ZipFile(target) as z:
    bad=z.testzip()
    if bad: raise SystemExit(f'ZIP validation failed: {bad}')
with target.open('rb') as f: digest=hashlib.file_digest(f,'sha256').hexdigest()
target.with_suffix('.zip.sha256').write_text(f'{digest}  {target.name}\n',encoding='utf-8')
print(f'{target}\n{target.stat().st_size:,} bytes; ZIP CRC and SHA256 checked')
