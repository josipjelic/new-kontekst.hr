---
id: "021"
title: "Phase 4 — Production Dockerfiles and docker-compose.prod.yml"
status: "todo"
area: "infra"
agent: "@docker-expert"
priority: "normal"
created_at: "2026-03-25"
due_date: null
started_at: null
completed_at: null
prd_refs: []
blocks: ["022"]
blocked_by: ["012", "020", "014"]
---

## Description

Harden the Docker setup for production. Task #012 creates the initial Dockerfiles and local dev compose. This task ensures:

1. The production nginx config is fully hardened (security headers, compression, caching)
2. The backend production image is minimal and secure
3. `docker-compose.prod.yml` can simulate the full production stack locally
4. Image size and startup time are verified

This task is blocked by #012 (initial Docker setup), #020 (frontend complete), and #014 (backend complete) — we need both apps to be finished before hardening production images.

## Acceptance Criteria

**Frontend production Dockerfile hardening**
- [ ] nginx config includes security headers: `X-Frame-Options DENY`, `X-Content-Type-Options nosniff`, `Referrer-Policy strict-origin-when-cross-origin`, `Content-Security-Policy` (permissive initially, tightened post-launch)
- [ ] nginx gzip compression enabled for HTML, CSS, JS, JSON, SVG
- [ ] Static asset caching headers: `Cache-Control: public, max-age=31536000, immutable` for hashed assets in `dist/assets/`
- [ ] `index.html` explicitly not cached: `Cache-Control: no-cache`
- [ ] Final frontend image size documented and under 50MB
- [ ] `docker build -t kontekst-frontend .` succeeds in under 3 minutes on a standard machine

**Backend production Dockerfile hardening**
- [ ] Runs as non-root `node` user (not root)
- [ ] Only production dependencies installed (`npm ci --omit=dev`)
- [ ] No source files other than `src/` and `package*.json` in the image
- [ ] `NODE_ENV=production` set as ENV instruction
- [ ] HEALTHCHECK instruction verified: `CMD wget -qO- http://localhost:3000/health || exit 1`
- [ ] Final backend image size documented

**docker-compose.prod.yml**
- [ ] Builds from production Dockerfiles (not dev targets)
- [ ] Frontend nginx proxies `/api/*` to backend service (eliminates need for frontend to know backend URL)
- [ ] Backend receives `NODE_ENV=production` and SMTP env vars from `.env.prod` (template in `.env.prod.example`)
- [ ] `docker compose -f docker-compose.prod.yml up --build` brings up both services
- [ ] `curl http://localhost/health` (via nginx proxy) returns 200
- [ ] Contact form submission works end-to-end in production simulation

## Technical Notes

nginx proxy config for API:
```nginx
location /api/ {
    proxy_pass http://backend:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

This means the frontend app in production calls `/api/contact` (same origin) rather than `http://localhost:3000/api/contact`. Update `VITE_API_URL` strategy accordingly — in production, the API URL is `/` (relative), in dev it's `http://localhost:3000`.

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-25 | human | Task created as part of migration plan |
