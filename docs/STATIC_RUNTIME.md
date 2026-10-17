# Static runtime

`Dockerfile` has three public targets:

- `development`: Node 22, Vite on 8080, launcher health/revision integration. `compose.dev.yaml` bind mounts `app/` and uses a separate Linux dependency volume. The frontend's own build and preview commands are unchanged.
- `test`: installs the locked dependencies with `npm ci`, runs `npm run check`, and produces `dist/`. This is also the build stage required by `runtime`, so publication cannot skip the frontend checks.
- `runtime` (default): nginx uid/gid `101:101`, port 8080, Docker HEALTHCHECK. Only built frontend files and `version.json` are copied to `/srv/site`. Node, npm and source are absent. Nginx's PID and temporary files use `/tmp`; the stock mutating entrypoint is bypassed.

The frontend build runs on the builder's native platform; its static output is identical input to amd64 and arm64 nginx images. The existing release workflows supply both platforms. A local amd64 check does not prove arm64 execution or deployment.

Build arguments: `APP_REVISION` supplies the source revision; `REVISION`, when explicitly passed, takes precedence. Both release arguments should be the same full commit SHA. `APP_SOURCE_URL` supplies the OCI source label; the revision label and the generated JSON use the same resolved revision. The runtime does not substitute environment values into static files at startup. Uncommitted work still returns its parent commit: commit and rerun checks before release.

| Path | Behavior |
|---|---|
| `/`, `/index.html` | Actual frontend; `Cache-Control: no-cache` |
| `/version.json` | Exact `{"revision":"..."}`; `no-store`, no ETag, ignores conditional-date requests |
| `/health` | `200 ok`; `no-store`; used by Docker HEALTHCHECK |
| `/assets/*` | Existing hashed JS/CSS/font assets; one-year immutable caching |
| `/textures/*`, `/favicon.svg` | Existing unversioned assets; one-day caching |
| Other/missing/private paths | 404; never the homepage and never immutable-cached |

HTML, CSS, JS and SVG use negotiated gzip with `Vary: Accept-Encoding`. WebP and WOFF2 retain their already-compressed bytes and correct MIME types. All nginx responses, including errors and cache responses, carry `X-Robots-Tag: noindex, nofollow`; the frontend also has robots meta. This applies to production and previews regardless of `APP_ENVIRONMENT`. Indexing requires an explicit later change to both contracts and tests.

There is no CSP in this integration. The frontend uses an inline class toggle, structured data, inline CSS custom properties and JavaScript-applied reveal transforms. The nginx runtime does not impose restrictions on those behaviors. Browser interaction/visual acceptance is a separate coordinator check.

`scripts/check_runtime.py` verifies real HTTP behavior and linked CSS, JS, textures and fonts. `scripts/app.py check` calls it for the installed image and the unmodified production/derek-dev/abdul-dev deployment Compose files. Only project/network identity and an ephemeral loopback port are overlaid; read-only root, tmpfs, user, no-new-privileges and each environment are inspected in Docker. The isolated stacks never join `xsolutions-proxy`. Test images use UUID tags and are removed in `finally`; cache cleanup must remain scoped to the builder that created it.

For an already-running runtime: `python scripts/check_runtime.py --url http://127.0.0.1:PORT --revision FULL_SHA`. For an existing local image: `python scripts/check_runtime.py --image IMAGE --revision FULL_SHA` checks all three Compose contracts and removes its isolated containers/networks. This latter command retains the caller's image.

The Docker context includes only the Dockerfile, two runtime configs, package files, HTML, the two frontend source files, static checks, favicon and the two original texture files. Add new legitimate build inputs explicitly to `.dockerignore`; do not broaden it to the whole repository or media library.
