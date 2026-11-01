from pathlib import Path
import shutil, hashlib, json, subprocess
root = Path(__file__).resolve().parents[2]
snapshot = root / 'outputs' / 'sdh-v2-build-source'
if snapshot.exists():
    raise SystemExit('Snapshot already exists; use the existing frozen source or choose a new directory.')
snapshot.mkdir()
skip = shutil.ignore_patterns('node_modules', '.next', 'dist', '.git', '.env', '.env.*', '*.log')
for directory in ['frontend', 'backend']:
    shutil.copytree(root / directory, snapshot / directory, ignore=skip)
for name in ['package.json', 'package-lock.json']:
    shutil.copy2(root / name, snapshot / name)
build_dir = snapshot / 'deploy' / 'handover-v2'
build_dir.mkdir(parents=True)
for name in ['Dockerfile', 'prepare-build.mjs']:
    shutil.copy2(root / 'deploy' / 'handover-v2' / name, build_dir / name)
manifest = {str(p.relative_to(snapshot)).replace('\\', '/'): hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(snapshot.rglob('*')) if p.is_file()}
provenance = {'gitHead': subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=root, text=True).strip(), 'workingTree': True, 'files': manifest}
(root / 'outputs' / 'sdh-v2-source-manifest.json').write_text(json.dumps(provenance, indent=2), encoding='utf-8')
print(snapshot)
