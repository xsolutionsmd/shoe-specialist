# Handoff

## Current state

The complete site replaces the infrastructure placeholder. Research, all accessible media, coordinator shortlist, verified media delivery and verified infrastructure finished before the final template/design round. George Cleverley is the primary visual reference; provisional Rago Brothers was rejected against the premium-quality bar.

Frontend and backend have passed local checks and review. Sol reviewed the full code; Opus accepted R1-R6 and rejected optional social-share artwork R7. Header containment at enlarged text, short-screen menu scrolling, sourced structured data and reduced motion were fixed and independently rechecked. Graft now supports both personal previews and the two authored runtime configs. No unresolved accepted review finding remains.

This commit is the release candidate. Exact committed container checks, preview verification and the production PR remain the release gates. Consult the branch push workflow and live /version.json for the current deployed revision; local build evidence alone is not deployment evidence.

## Environments and workflow

- Production (main): https://shoe-specialist.xsolutionsmd.com
- Derek (derek-dev): https://shoe-specialist-derek-dev.xsolutionsmd.com
- Abdul (abdul-dev): https://shoe-specialist-abdul-dev.xsolutionsmd.com

Derek works on derek-dev; Abdul works on abdul-dev. A push updates only its preview. Release through a reviewed PR into main, then fast-forward/merge main back into both previews. The initial placeholder and branch isolation were already verified: the harmless Derek KB commit changed only Derek's preview.

## Media and owner questions

The private library contains43images and no videos. Four coordinator-shortlisted files are documented in kb/media.md. The library was delivered and verified once in Slack. Every collected image remains public-unverified, so none ships; the site uses original procedural textures and local fonts. Request owner-approved counter/workbench, storefront and completed-repair photos when authorized.

All three environments remain noindex until explicit business-owner indexing approval. Published hours follow the official source; holiday exceptions and Sunday/Monday closures remain owner questions. Call, directions and email use verified destinations; no form or booking integration is invented. See open-questions.md.

## Validation and next action

See docs/VALIDATION.md, docs/STATIC_RUNTIME.md and docs/ORACLE_DEPLOYMENT.md. Finish the exact-commit check and release gates, then record all three live revisions and cleanup evidence in the coordinator's private release record. The final state command is xs_company.py status --slug shoe-specialist when the toolkit is installed.
