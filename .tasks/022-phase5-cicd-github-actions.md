---
id: "022"
title: "Phase 5 — GitHub Actions CI/CD: build, test, push Docker images, deploy to DO"
status: "todo"
area: "infra"
agent: "@cicd-engineer"
priority: "normal"
created_at: "2026-03-25"
due_date: null
started_at: null
completed_at: null
prd_refs: []
blocks: ["023"]
blocked_by: ["020", "021"]
---

## Description

Implement the full CI/CD pipeline using GitHub Actions. The pipeline runs on every push to `main` and on pull requests to `main`.

This replaces the existing planned task #008 (plain-HTML Digital Ocean deployment) which is now superseded by the containerised deployment approach.

**Pipeline stages:**
1. **CI** (runs on every PR + push): lint → unit tests (frontend + backend) → build Docker images
2. **CD** (runs on push to `main` only): push images to Docker Hub or DO Container Registry → trigger DO App Platform deploy

## Acceptance Criteria

**CI workflow (`.github/workflows/ci.yml`)**
- [ ] Triggers on: `push` to `main`, `pull_request` targeting `main`
- [ ] Frontend CI job:
  - Checkout + `npm ci`
  - `npm run lint` — fails pipeline on lint errors
  - `npm run build` — fails pipeline on build errors
- [ ] Backend CI job:
  - Checkout + `npm ci`
  - `npm run lint`
  - `npm test` — fails pipeline on test failures
- [ ] Both jobs run in parallel (not sequential)
- [ ] Job names are human-readable in GitHub Actions UI
- [ ] Uses `actions/cache` for `node_modules` (keyed on `package-lock.json` hash) on both jobs

**Docker build job (CI)**
- [ ] Builds both frontend and backend Docker images
- [ ] Uses `docker/build-push-action` with `push: false` on PRs (build-only, no push)
- [ ] Build cache via `cache-from: type=gha` and `cache-to: type=gha,mode=max`
- [ ] Build failure fails the pipeline

**CD workflow (`.github/workflows/deploy.yml`)**
- [ ] Triggers only on push to `main` (not on PRs)
- [ ] Requires CI workflow to pass first (`needs: ci` or separate workflow with `workflow_run` trigger)
- [ ] Logs in to container registry (Docker Hub or DO Container Registry) using GitHub Secrets
- [ ] Tags images: `latest` + Git SHA (e.g., `kontekst-frontend:abc1234`)
- [ ] Pushes both images
- [ ] Triggers Digital Ocean App Platform deploy via DO API or `doctl` CLI

**Secrets management**
- [ ] All secrets stored as GitHub repository secrets — never hardcoded
- [ ] `.env.example` files document which values become GitHub Secrets in CI
- [ ] Required secrets documented in `docs/technical/DECISIONS.md` or a new `docs/technical/DEPLOYMENT.md`

**DO App Platform config**
- [ ] `/.do/app.yaml` updated to reference container images rather than static files
- [ ] App spec includes both frontend (static site from nginx image) and backend (web service) components
- [ ] Health check path configured for backend: `/health`

## Technical Notes

**Container registry decision**: Digital Ocean Container Registry (DOCR) is preferred over Docker Hub — it keeps all infrastructure in one provider and avoids Docker Hub pull rate limits. However, Docker Hub is acceptable if DOCR adds complexity.

**Deploy trigger**: DO App Platform supports a deploy webhook — triggering it via `curl` with a DO personal access token is the simplest approach. `doctl` CLI is the more robust option.

This task supersedes the approach planned in task #008 (plain-HTML static deploy). Once this pipeline is live, #008 should be closed as superseded.

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-25 | human | Task created as part of migration plan |
