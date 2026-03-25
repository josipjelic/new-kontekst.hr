---
id: "008"
title: "Digital Ocean App Platform deployment configuration"
status: "todo"
area: "infra"
agent: "@cicd-engineer"
priority: "normal"
created_at: "2026-03-25"
due_date: null
started_at: null
completed_at: null
prd_refs: []
blocks: []
blocked_by: ["001"]
---

## Description

Configure Digital Ocean App Platform for automated deployment. **Note:** ADR-002 moved the project to **Docker + Vite/React + Express**. This task was originally written for a **static HTML** site without a build step — it is **superseded in spirit** by container-based CI/CD (see `TODO.md` #022). Update acceptance criteria when implementing: use a **Web Service** / container workflow, not `static_site` only, unless you intentionally split static hosting from the API.

## Acceptance Criteria

- [ ] `/.do/app.yaml` (or equivalent DO config) created and committed — **aligned with Docker images**, not only static files
- [ ] DO App Platform configured for the chosen deployment model (containers per ADR-002)
- [ ] Auto-deploy from `main` (or agreed branch)
- [ ] Custom domain `kontekst.hr` configured (or documented steps)
- [ ] HTTPS enabled (default on DO for custom domains)
- [ ] `www` vs non-`www` redirect consistent with canonical URL in `CONTENT_STRATEGY.md`

## Technical Notes

**Legacy static-site example** (pre–ADR-002 only):

```yaml
name: kontekst-hr
static_sites:
- name: web
  github:
    repo: [org]/new-kontekst.hr
    branch: main
    deploy_on_push: true
  output_dir: /
  routes:
  - path: /
```

For the current stack, prefer DO **App Platform** services that build/run `Dockerfile.frontend` and `backend/Dockerfile` (or a single compose-based flow), matching `docker-compose.prod.yml` behaviour. Console-only configuration is acceptable if no `app.yaml` is used.

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-25 | human | Task created |
| 2026-03-25 | docs | Translated to English; noted ADR-002 / Docker supersession |
