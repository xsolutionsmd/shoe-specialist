#!/usr/bin/env python3
"""HTTP and isolated real-Compose checks for the static production image."""
import argparse
import gzip
import json
import os
from pathlib import Path
import re
import subprocess
import tempfile
from urllib.error import HTTPError
from urllib.parse import urljoin
from urllib.request import Request, urlopen
import uuid

ROOT = Path(__file__).resolve().parents[1]


def require(condition, message):
    if not condition:
        raise RuntimeError(message)


def fetch(base, path, status=200, headers=None):
    request = Request(base.rstrip('/') + path, headers=headers or {})
    try:
        response = urlopen(request, timeout=10)
    except HTTPError as error:
        response = error
    with response:
        body = response.read()
        require(response.status == status, f"{path}: expected {status}, received {response.status}")
        require(response.headers.get('X-Robots-Tag') == 'noindex, nofollow', f"{path}: missing noindex header")
        return response.headers, body


def verify_site(base, revision):
    headers, body = fetch(base, '/')
    html = body.decode('utf-8')
    require('Shoe Specialist' in html and 'tel:+14105442129' in html, 'Actual frontend is not served')
    require('<meta name="robots" content="noindex, nofollow"' in html, 'Missing robots meta')
    require(headers.get('Cache-Control') == 'no-cache', 'HTML must revalidate')
    require(headers.get_content_type() == 'text/html', 'Wrong HTML MIME type')
    require(fetch(base, '/index.html')[1] == body, 'Root and index.html differ')
    require(fetch(base, '/health')[1] == b'ok\n', 'Unexpected health response')
    for path in ('/version.json', '/version.json?cache-test=1'):
        version_headers, receipt = fetch(base, path, headers={
            'If-Modified-Since': 'Wed, 31 Dec 2098 23:59:59 GMT', 'If-None-Match': '*',
        })
        require(json.loads(receipt) == {'revision': revision}, 'Version differs from exact build revision')
        require(version_headers.get('Cache-Control') == 'no-store', 'Version must not be cached')
        require(version_headers.get('ETag') is None, 'Version must not have an ETag')
        require(version_headers.get_content_type() == 'application/json', 'Wrong version MIME type')

    assets = set(re.findall(r'(?:src|href)="(/assets/[^"?#]+)', html))
    require(any(path.endswith('.css') for path in assets) and any(path.endswith('.js') for path in assets),
            'Built CSS and JS references missing')
    for path in sorted(assets):
        asset_headers, asset_body = fetch(base, path)
        require(asset_headers.get('Cache-Control') == 'public, max-age=31536000, immutable',
                path + ': missing hashed-asset cache policy')
        require(asset_headers.get_content_type() in ('text/css', 'application/javascript', 'text/javascript'),
                path + ': incorrect CSS/JS MIME type')
        if path.endswith('.css'):
            resources = re.findall(r'url\([\"\']?([^\)\"\']+)', asset_body.decode('utf-8'))
            require(any('.woff2' in item for item in resources), 'Font resources missing from CSS')
            for resource in set(resources):
                require(not resource.startswith(('http:', 'https:', 'data:')), 'Unexpected remote/inline CSS resource')
                resource_path = urljoin(path, resource)
                resource_headers, resource_body = fetch(base, resource_path)
                require(resource_body, resource_path + ': empty resource')
                if resource_path.endswith('.woff2'):
                    require(resource_headers.get_content_type() == 'font/woff2', 'Incorrect WOFF2 MIME type')
                    require('immutable' in resource_headers.get('Cache-Control', ''), 'Fonts must use hashed caching')
    for path, mime in (('/favicon.svg', 'image/svg+xml'), ('/textures/leather-ox.webp', 'image/webp'),
                       ('/textures/leather-deep.webp', 'image/webp')):
        asset_headers, _ = fetch(base, path)
        require(asset_headers.get('Cache-Control') == 'public, max-age=86400', path + ': wrong mutable-asset cache policy')
        require(asset_headers.get_content_type() == mime, path + ': wrong MIME type')

    for path in ('/', *sorted(assets), '/favicon.svg'):
        compressed_headers, compressed = fetch(base, path, headers={'Accept-Encoding': 'gzip'})
        require(compressed_headers.get('Content-Encoding') == 'gzip', path + ': gzip missing')
        require('Accept-Encoding' in compressed_headers.get('Vary', ''), path + ': gzip Vary missing')
        require(gzip.decompress(compressed) == fetch(base, path)[1], path + ': gzip changes content')

    for path in ('/missing', '/assets/missing.js', '/textures/missing.webp', '/private/runs/backend-r1.md',
                 '/kb/HANDOFF.md', '/AGENTS.md', '/CLAUDE.md', '/xsolutions.json', '/.env', '/.git/config',
                 '/.runtime/installed.json', '/.design-evidence/test.png', '/app/package.json',
                 '/node_modules/vite/package.json', '/src/main.js', '/50x.html', '/assets/.hidden'):
        missing_headers, missing_body = fetch(base, path, status=404)
        require(b'tel:+14105442129' not in missing_body, path + ': incorrect HTML fallback')
        require('immutable' not in missing_headers.get('Cache-Control', ''), path + ': cached missing asset')
    print('HTTP frontend, all linked assets, noindex, cache, gzip, exact version and private/missing-path checks passed: ' + base,
          flush=True)


def command(*args, env=None, capture=False):
    result = subprocess.run(args, cwd=ROOT, env=env, text=True, check=True,
                            stdout=subprocess.PIPE if capture else None)
    return result.stdout.strip() if capture else None


def check_compose(image, revision):
    """Use each real deployment file; override only resource identity and host port."""
    contracts = (('production', 'compose.production.yaml'),
                 ('derek-dev', 'server/derek-dev/compose.yaml'),
                 ('abdul-dev', 'server/abdul-dev/compose.yaml'))
    env = dict(os.environ, APP_IMAGE=image)
    for environment, compose_file in contracts:
        project = 'shoe-specialist-contract-' + uuid.uuid4().hex[:10]
        with tempfile.TemporaryDirectory(prefix=project + '-') as folder:
            override = Path(folder) / 'override.json'
            # JSON is valid Compose YAML. Never join the real external proxy network.
            override.write_text(json.dumps({
                'services': {'web': {'ports': ['127.0.0.1::8080']}},
                'networks': {'proxy': {'external': False, 'name': project + '-proxy'}},
            }), encoding='utf-8')
            compose = ('docker', 'compose', '--project-name', project, '--file', compose_file,
                       '--file', str(override))
            print(f'Checking {environment}: project={project}; network={project}-proxy', flush=True)
            try:
                command(*compose, 'up', '--detach', '--no-build', '--wait', '--wait-timeout', '90', env=env)
                container = command(*compose, 'ps', '--quiet', 'web', env=env, capture=True)
                info = json.loads(command('docker', 'inspect', container, capture=True))[0]
                print('Container=' + info['Name'].lstrip('/') + ' id=' + container, flush=True)
                require(info['HostConfig']['ReadonlyRootfs'], 'Production root must be read-only')
                require(set(info['HostConfig']['Tmpfs']) == {'/tmp', '/data', '/config'}, 'Unexpected tmpfs contract')
                require('no-new-privileges:true' in info['HostConfig']['SecurityOpt'], 'no-new-privileges missing')
                require(info['Config']['User'] == '101:101', 'Runtime must use unprivileged uid/gid 101')
                require(info['State']['Health']['Status'] == 'healthy', 'Image health check failed')
                require('APP_ENVIRONMENT=' + environment in info['Config']['Env'], 'Incorrect environment')
                command('docker', 'exec', container, 'sh', '-c',
                        'if touch /srv/site/.runtime-write-probe 2>/dev/null; then '
                        'echo "ERROR: static document root is writable"; exit 1; fi; '
                        'touch /tmp/runtime-write-probe /data/runtime-write-probe /config/runtime-write-probe '
                        '&& test ! -e /workspace && test ! -e /srv/site/kb && test ! -e /srv/site/node_modules')
                address = command(*compose, 'port', 'web', '8080', env=env, capture=True).splitlines()[0]
                verify_site('http://' + address, revision)
            finally:
                command(*compose, 'down', '--volumes', env=env)
                print('Removed isolated project and network: ' + project, flush=True)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    source = parser.add_mutually_exclusive_group(required=True)
    source.add_argument('--url')
    source.add_argument('--image')
    parser.add_argument('--revision', required=True)
    args = parser.parse_args()
    if args.url:
        verify_site(args.url, args.revision)
    else:
        check_compose(args.image, args.revision)
