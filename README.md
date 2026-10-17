# Shoe Specialist

Static Vite website served by unprivileged nginx on port 8080. The multi-stage Docker build runs `npm ci` and `npm run check` in `app/`, then copies only the built site into the runtime image. No API, contact form or persistent application data is required.

Run `python scripts/app.py check` (or `./app.ps1 check`) to test the frontend build, installed image and all three deployment Compose contracts using isolated local identities. Checks cover read-only root, tmpfs, health, exact revision, source labels, linked assets, caching, compression, noindex and missing/private paths. See [WORKFLOW.md](WORKFLOW.md) for local development and [runtime details](docs/STATIC_RUNTIME.md) for the HTTP/build contract.

`main` publishes production; `derek-dev` and `abdul-dev` publish independent previews. Every environment retains both robots meta and `X-Robots-Tag: noindex, nofollow` until the owner approves indexing. See [deployment](docs/ORACLE_DEPLOYMENT.md), [validation](docs/VALIDATION.md) and `kb/HANDOFF.md` for release status; a local build does not establish deployment.

`.dockerignore` is an explicit allowlist of required frontend inputs and runtime configuration. KB, agent instructions, project state, design evidence, private media, host `node_modules` and generated `dist` are excluded.
