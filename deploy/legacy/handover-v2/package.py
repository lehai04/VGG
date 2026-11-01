from pathlib import Path
import hashlib, json, zipfile
root = Path(__file__).resolve().parents[2]
out = root / 'outputs' / 'sdh-handover-v2'
# Reuse the local Markdown renderer; its SVG is replaced by this release's diagram.
renderer = (root / 'deploy/handover/package-handover.py').read_text(encoding='utf-8')
renderer = renderer[renderer.index('def inline'):]
exec('import html, re\n' + renderer, {'src': out, 'out': out, 'diagram': (out / 'SO-DO-KET-NOI.svg').read_text(encoding='utf-8')})
manifest = json.loads((root / 'outputs/sdh-v2-source-manifest.json').read_text(encoding='utf-8'))
release = {
    'release': '20261028-02', 'domain': 'https://sdh.vlu.edu.vn',
    'scope': 'Public website only; no CMS', 'platform': 'linux/amd64 glibc (Debian 12 compatible)',
    'node': '26.12.1', 'gitHead': manifest['gitHead'], 'workingTreeBuild': True,
    'sourceManifestSha256': hashlib.sha256((root / 'outputs/sdh-v2-source-manifest.json').read_bytes()).hexdigest(),
    'database': {'source': 'local public website snapshot vgg_public_verify',
       'format': 'PostgreSQL 17.11 SQL schema and column INSERT statements',
       'counts': {'site_contents':58, 'news_posts':4, 'resource_categories':4, 'resource_files':8,
                  'consultations':0, 'consultation_history':0, 'page_visits':0},
       'excluded': 'Legacy CMS database and Prisma migration history'}
}
(out / 'RELEASE.json').write_text(json.dumps(release, indent=2, ensure_ascii=False), encoding='utf-8')
hashes = []
for p in sorted(out.rglob('*')):
    if p.is_file() and p != out / 'SHA256SUMS':
        with p.open('rb') as f:
            digest = hashlib.file_digest(f, 'sha256').hexdigest()
        hashes.append(digest + '  ' + p.relative_to(out).as_posix())
(out / 'SHA256SUMS').write_text('\n'.join(hashes) + '\n', encoding='utf-8')
if __name__ == '__main__':
    import sys
    if '--zip' in sys.argv:
        dest = root / 'outputs' / 'sdh-handover-v2-linux-amd64.zip'
        with zipfile.ZipFile(dest, 'w', compression=zipfile.ZIP_STORED) as archive:
            for p in sorted(out.rglob('*')):
                if p.is_file(): archive.write(p, 'sdh-handover-v2/' + p.relative_to(out).as_posix())
        with dest.open('rb') as f: checksum = hashlib.file_digest(f, 'sha256').hexdigest()
        dest.with_suffix('.zip.sha256').write_text(checksum + '  ' + dest.name + '\n', encoding='utf-8')
        print(dest, dest.stat().st_size)
    else:
        print('Prepared documents and checksums:', out)
