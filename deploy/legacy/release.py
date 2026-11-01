#!/usr/bin/env python3
"""Linux host controller. Immutable images, journaled Nginx switch, warm rollback."""
import json
import os
from pathlib import Path
import re
import signal
import subprocess
import sys
import time
import urllib.request

ROOT = Path('/opt/vgg/state')
CONF = Path('/etc/nginx/conf.d/vgg-release.conf')
PORTS = {'blue': (3100, 4100), 'green': (3200, 4200)}


def run(*args, timeout=300):
    subprocess.run(args, check=True, timeout=timeout)


def atomic(path, content):
    temporary = path.with_suffix(path.suffix + '.tmp')
    with temporary.open('w', encoding='utf-8') as stream:
        stream.write(content)
        stream.flush()
        os.fsync(stream.fileno())
    os.chmod(temporary, 0o644)
    os.replace(temporary, path)
    directory = os.open(path.parent, os.O_RDONLY | os.O_DIRECTORY)
    try:
        os.fsync(directory)
    finally:
        os.close(directory)


def save(state):
    atomic(ROOT / 'state.json', json.dumps(state, indent=2))


def probe(url, release=None):
    try:
        request = urllib.request.Request(url, headers={'Cache-Control': 'no-cache'})
        with urllib.request.urlopen(request, timeout=5) as response:
            return response.status == 200 and (release is None or
                response.headers.get('X-VGG-Release') == release)
    except (OSError, ValueError):
        return False


def healthy(target, public=False, attempts=12):
    ports = (8080, 8082) if public else PORTS[target['slot']]
    urls = [f'http://127.0.0.1:{port}{path}' for port, path in
            zip(ports, ('/', '/ready'))]
    if public:
        # TLS endpoints must bypass CDN caching and preserve X-VGG-Release.
        urls += json.loads(Path('/etc/vgg/public-probes.json').read_text())
    for _ in range(attempts):
        if all(probe(url, target['release'] if public else None) for url in urls):
            return True
        time.sleep(2)
    return False


def nginx_config(target):
    result = []
    for listener, port in zip((8080, 8082), PORTS[target['slot']]):
        result.append(f'''server {{
    listen 127.0.0.1:{listener};
    client_max_body_size 30m;
    add_header X-VGG-Release "{target['release']}" always;
    location / {{
        proxy_pass http://127.0.0.1:{port};
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $http_x_forwarded_proto;
        proxy_read_timeout 60s;
        proxy_buffering off;
    }}
}}
''')
    return '\n'.join(result)


def restore(journal):
    atomic(CONF, journal['config'])
    run('nginx', '-t')
    run('systemctl', 'reload', 'nginx')
    atomic(ROOT / 'leader', journal['leader'])
    old = journal['state'].get('active')
    if old and not healthy(old, public=True):
        raise RuntimeError('Restored routing failed probes; journal retained for operator recovery')
    save(journal['state'])
    (ROOT / 'pending.json').unlink(missing_ok=True)


def switch(state, target):
    journal = {'state': state, 'config': CONF.read_text(),
               'leader': (ROOT / 'leader').read_text()}
    atomic(ROOT / 'pending.json', json.dumps(journal))
    try:
        atomic(CONF, nginx_config(target))
        run('nginx', '-t')
        run('systemctl', 'reload', 'nginx')
        if not healthy(target, public=True):
            raise RuntimeError('Post-switch probes failed')
        atomic(ROOT / 'leader', target['release'])
        # Observe one minute before recording success; old containers stay running.
        for _ in range(6):
            time.sleep(10)
            if not healthy(target, public=True, attempts=1):
                raise RuntimeError('Observation probes failed')
        save({'active': target, 'previous': state.get('active')})
        (ROOT / 'pending.json').unlink()
    except BaseException:
        restore(journal)
        raise


def validate_image(image):
    if not re.fullmatch(r'ghcr\.io/[a-z0-9_./-]+@sha256:[a-f0-9]{64}', image):
        raise ValueError('Expected immutable ghcr.io image@sha256:digest')


def prepare(image, slot):
    validate_image(image)
    run('docker', 'pull', image, timeout=600)
    # Must produce and verify a restorable backup; operator installs this hook.
    run('/etc/vgg/pre-deploy', timeout=600)
    run('docker', 'run', '--rm', '--network', 'host', '--env-file',
        '/etc/vgg/backend.env', image, 'npm', 'run', 'db:deploy', timeout=300)
    front, backend = PORTS[slot]
    release = image.rsplit(':', 1)[1]
    for service, port in zip(('frontend', 'backend'), (front, backend)):
        name = f'vgg-{slot}-{service}'
        # Remove only this named inactive-slot container, if present.
        existing = subprocess.run(['docker', 'container', 'inspect', name],
                                  stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        if existing.returncode == 0:
            run('docker', 'rm', '-f', name)
        args = ['docker', 'run', '-d', '--name', name, '--restart', 'unless-stopped',
                '--network', 'host', '--env-file', f'/etc/vgg/{service}.env',
                '--cap-drop', 'ALL', '--security-opt', 'no-new-privileges',
                '--log-opt', 'max-size=20m', '--log-opt', 'max-file=3',
                '-e', f'BACKEND_INTERNAL_URL=http://127.0.0.1:{backend}']
        if service == 'backend':
            args += ['-e', 'BACKEND_HOST=127.0.0.1', '-e', f'BACKEND_PORT={port}',
                     '-e', f'VGG_RELEASE_ID={release}',
                     '-v', f'{ROOT}:/run/vgg:ro', image,
                     'npm', 'run', 'start', '--workspace=backend']
        else:
            args += ['-w', f'/app/{service}', image, 'node',
                     '/app/node_modules/next/dist/bin/next', 'start',
                     '-H', '127.0.0.1', '-p', str(port)]
        run(*args)
    return {'slot': slot, 'image': image, 'release': release}


def main():
    import fcntl
    urls = json.loads(Path('/etc/vgg/public-probes.json').read_text())
    if not isinstance(urls, list) or len(urls) != 2 or not all(
            isinstance(url, str) and url.startswith('https://') for url in urls):
        raise ValueError('Configure exactly two HTTPS probes: website and API')
    if not CONF.is_file():
        raise RuntimeError('Install bootstrap Nginx configuration before deploying')
    ROOT.mkdir(parents=True, exist_ok=True)
    with (ROOT / 'deploy.lock').open('w') as lock:
        fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
        signal.signal(signal.SIGTERM, lambda *_: sys.exit('Deployment interrupted'))
        pending = ROOT / 'pending.json'
        if pending.exists():
            restore(json.loads(pending.read_text()))
            raise RuntimeError('Recovered interrupted switch. Review and rerun requested operation.')
        state_file = ROOT / 'state.json'
        state = json.loads(state_file.read_text()) if state_file.exists() else {}
        if not (ROOT / 'leader').exists():
            atomic(ROOT / 'leader', '')
        if sys.argv[1:] == ['rollback']:
            target = state.get('previous')
            if not target:
                raise RuntimeError('No warm previous release available')
        elif len(sys.argv) == 3 and sys.argv[1] == 'deploy':
            validate_image(sys.argv[2])
            if state.get('active', {}).get('image') == sys.argv[2]:
                raise RuntimeError('Image already active; use rollback or a new release')
            slot = 'green' if state.get('active', {}).get('slot') == 'blue' else 'blue'
            # The next deployment reuses the older slot. Do not leave a stale rollback pointer.
            state['previous'] = None
            save(state)
            target = prepare(sys.argv[2], slot)
        else:
            raise ValueError('Usage: release.py deploy IMAGE@sha256:DIGEST | rollback')
        if not healthy(target):
            raise RuntimeError('Candidate readiness failed; active route unchanged')
        switch(state, target)
        print(json.dumps({'result': 'healthy', 'active': target}), flush=True)


if __name__ == '__main__':
    main()
