"""Package the verified Linux runtime with current, non-secret IT configuration."""
from pathlib import Path
import hashlib
import zipfile
import tarfile

root = Path(__file__).resolve().parents[2]
source = root / 'deploy/it-native'
output = root / 'outputs/it-handover'
runtime = output / 'release-linux-amd64.tar.gz'
report = output / 'VERIFICATION.txt'
if not runtime.is_file() or not report.is_file():
    raise SystemExit('Missing runtime or verification report; run verification first.')
# Refuse an older runtime paired with service files requiring the new preflight.
with tarfile.open(runtime, 'r:gz') as archive:
    member = next((m for m in archive if m.name.removeprefix('./') == 'backend/scripts/check-runtime.mjs'), None)
    if member is None or not member.isfile():
        raise SystemExit('Runtime is stale: rebuild and verify it with check-runtime.mjs first.')
    if archive.extractfile(member).read() != (root / 'backend/scripts/check-runtime.mjs').read_bytes():
        raise SystemExit('Runtime preflight differs from source: rebuild and verify first.')
checksum = hashlib.file_digest(runtime.open('rb'), 'sha256').hexdigest()
(output / 'SHA256SUMS').write_text(f'{checksum}  {runtime.name}\n', encoding='utf-8')
target = output / 'saudaihoc_IT_native_2026-10-31.zip'
with zipfile.ZipFile(target, 'w', compression=zipfile.ZIP_STORED) as archive:
    for file in [runtime, output / 'SHA256SUMS', report]:
        archive.write(file, file.name)
    archive.write(source / 'README.md', 'README.md')
    archive.write(source / 'FIXES.md', 'FIXES.md')
    for directory in ['config', 'systemd', 'nginx']:
        for file in sorted((source / directory).iterdir()):
            if file.is_file():
                archive.write(file, str(file.relative_to(source)))
with zipfile.ZipFile(target) as archive:
    if archive.testzip() is not None:
        raise SystemExit('ZIP CRC validation failed')
ziphash = hashlib.file_digest(target.open('rb'), 'sha256').hexdigest()
target.with_suffix('.zip.sha256').write_text(f'{ziphash}  {target.name}\n', encoding='utf-8')
print(f'Created {target} ({target.stat().st_size:,} bytes); CRC verified')
