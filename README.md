# Shoe Specialist

The initial infrastructure serves a noindex placeholder on production and both personal previews. The application is being prepared separately.

Run `python scripts/app.py check` to test the image, health and exact revision. `main` publishes production; `derek-dev` and `abdul-dev` publish independent previews. See `docs/ORACLE_DEPLOYMENT.md` for the deployment contract and `kb/HANDOFF.md` for current progress.

The build context currently allows only `Dockerfile` and `placeholder/`. The finished website will replace that explicit allowlist and runtime together, after review and visual checks.
