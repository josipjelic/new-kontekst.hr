---
id: "012"
title: "Phase 1d — Docker setup: Dockerfiles + docker-compose for local dev"
status: "done"
area: "infra"
agent: "@docker-expert"
priority: "high"
created_at: "2026-03-25"
due_date: null
started_at: null
completed_at: "2026-03-25"
prd_refs: []
blocks: ["020", "021"]
blocked_by: ["009", "013"]
---

## Description

Create the full Docker setup for both local development and production. This covers:

1. **Frontend Dockerfile** — multi-stage: build stage (Node + Vite) + serve stage (nginx)
2. **Backend Dockerfile** — Node.js/Express production image
3. **`docker-compose.yml`** — local development with hot reload (Vite dev server + backend + volume mounts)
4. **`docker-compose.prod.yml`** — production simulation (built images, no mounts)
5. **`.dockerignore`** files for both frontend and backend

This task depends on task #009 (project scaffold) and #013 (backend scaffold) existing so that `COPY` paths and exposed ports are correct.

## Acceptance Criteria

**Frontend Dockerfile (`frontend/Dockerfile` or root `Dockerfile.frontend`)**
- [x] Multi-stage build: stage 1 uses `node:20-alpine`, runs `npm ci` + `npm run build`
- [x] Stage 2 uses `nginx:alpine`, copies `dist/` from stage 1 to `/usr/share/nginx/html`
- [x] Custom `nginx.conf` included: serves SPA correctly (all routes → `index.html`), gzip enabled, correct MIME types
- [x] Exposes port 80
- [x] Final image is under 50MB

**Backend Dockerfile (`backend/Dockerfile`)**
- [x] Uses `node:20-alpine`
- [x] `npm ci --omit=dev` (production deps only)
- [x] Runs as non-root user (`node` user)
- [x] Exposes port 3000 (or configured `PORT`)
- [x] `HEALTHCHECK` instruction included (hits `/health` endpoint)

**`docker-compose.yml` (local dev)**
- [x] `frontend` service: runs Vite dev server (`npm run dev`), port `5173:5173`, source volume mount for hot reload
- [x] `backend` service: runs with `nodemon` for hot reload, port `3000:3000`, source volume mount
- [x] `env_file: .env` used for both services — no hardcoded values
- [x] Services have explicit `depends_on` where appropriate
- [x] `docker compose up` starts both services and both are reachable

**`docker-compose.prod.yml` (production simulation)**
- [x] Uses built images (no volume mounts)
- [x] Frontend served on port `80`
- [x] Backend on port `3000`
- [x] `docker compose -f docker-compose.prod.yml up --build` runs without errors
- [x] Frontend can reach backend API at `/api/*` via nginx reverse proxy (or explicit URL)

**`.dockerignore` files**
- [x] `node_modules/`, `dist/`, `.env`, `.env.local`, `*.log`, `.git/` excluded from both contexts

## Technical Notes

**nginx SPA config** — critical for React Router (if used) or single-page scroll navigation. Even without React Router, include the fallback rule:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

**API proxying**: In local dev, the Vite config should proxy `/api` to `http://backend:3000` (or `http://localhost:3000`). In production, nginx should proxy `/api` to the backend service. This avoids CORS issues entirely.

**Port convention**: Frontend dev: 5173, Backend: 3000, Frontend prod nginx: 80.

Consult `docs/technical/DECISIONS.md` ADR-002 before making any changes to the containerization approach.

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-25 | human | Task created as part of migration plan |
| 2026-03-25 | @docker-expert | Dockerfiles, compose, root `nginx.conf`, `.env.example`, ARCHITECTURE.md — task completed |
