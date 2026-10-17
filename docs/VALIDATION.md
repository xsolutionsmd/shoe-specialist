# Backend integration validation

2026-10-16 (Eastern), branch `derek-dev`, parent revision `47b7d1c2a2670a19f7c21d31e7a1942dfbda3172`. The frontend and backend changes were **uncommitted** during these checks. This revision identifies the parent source, not a reproducible committed release. The coordinator must commit the integrated changes and rerun checks against the final revision before publication.

Verified locally on Docker Desktop, Linux amd64:

- `python -B scripts/app.py check`: passed. The test stage ran `npm ci` and `npm run check` (14 built assets). The runtime passed `nginx -t`. Installed-image preflight and all three actual deployment Compose files passed health, labels, exact revision, noindex, frontend/asset delivery, caching, gzip, MIME and 404 checks.
- Production, Derek preview and Abdul preview each used a separate temporary project/network with an ephemeral loopback port. Docker inspection confirmed uid/gid `101:101`, read-only root, `/tmp`/`/data`/`/config` tmpfs, no-new-privileges and the expected environment. Actual writes to `/srv/site` failed; tmpfs writes succeeded. No shared proxy network was used.
- A separate default runtime build with only `REVISION` (without `APP_REVISION`) passed the same HTTP and label checks. The normal launcher check supplied only `APP_REVISION`. Conditional requests to `/version.json` returned 200 with the exact revision and `no-store`; HTML 304 responses retained noindex and revalidation headers.
- `./app.ps1 start -Port 18789`: passed. The development target served the actual Vite frontend and source module, plus health, uncached exact revision and noindex. `./app.ps1 stop`: passed. Rejecting an invalid installed image returned exit 1.
- `python -B scripts/test_graft.py`: 12 tests, OK, one skip because directory symlinks require platform permission.
- Python syntax and `git diff --check`: passed. Hash comparison confirmed the frontend sources, design brief, HANDOFF and state JSON were unchanged by this integration.
- Docker context exported and inspected: exactly 12 allowed input files, 113,499 bytes, with hashes matching source. No host dependencies, generated dist, texture-generation tooling, private files, KB, agent instructions, state or design evidence were included.

Three issues were resolved during this work. The read-only test originally used BusyBox `test -w`, which reported permission bits even on a read-only mount; the final test performs a real write attempt. Windows PowerShell's `Stop` preference treated redirected Docker progress on stderr as a terminating error; the launcher now lets the Python exit code determine success. Startup, stop and failure-code propagation were verified after that fix. Docker directory exceptions initially admitted their children; `.dockerignore` now excludes children at each reopened directory before allowing individual files. The actual exported context was verified and container checks were rerun after the correction.

All task-created local containers, networks, dependency volumes, images and the dedicated build cache were removed. Existing VoiceVault/Budgie services, images and shared/default builder caches were preserved. The exact local resource identities and detailed logs are in the coordinator's private backend handoff.

Not established here: browser visual/interaction approval, arm64 execution, a final committed revision or deployment of the real frontend. The coordinator owns those checks and the subsequent authorized release. Port 8788 and the frontend files were not changed. No CSP was introduced.

## Integrated review and browser acceptance

2026-10-16/17: Sol reviewed all application, runtime, lifecycle and deployment code. Opus triaged every finding: R1-R4 frontend fixed, R5-R6 developer tooling fixed by Astra, R7 optional share image intentionally omitted. No accepted finding remains unresolved.

Coordinator personally inspected every section at1440/820/375, actual navigation anchors, all11 outbound CTA instances (navigation intercepted to avoid initiating phone/email actions), focus/skip/Escape/outside-click and menu focus-leave behavior. At375/200% the header was corrected to separate wordmark and controls; at320x568/200% keyboard scrolling reaches the full Visit link. Normal390 and1440 presentation was rechecked. Actual reduced-motion emulation confirms the menu has no translation transition; metadata preserves1978 establishment and removes the unverified founder relationship. No console/page errors were observed.

Astra's final Graft suite passed18tests with one platform-dependent symlink skip. Separate isolated CLI reproductions pass for both personal preview branches, with authored runtime configs included and private paths excluded. Runtime/container checks remain those above; the integrated commit must pass app.ps1 check before pushing, and GitHub-required checks before merging. Live deployment is verified separately against /version.json on each environment.
