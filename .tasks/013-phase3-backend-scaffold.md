---
id: "013"
title: "Phase 3a — Scaffold Express server with health check endpoint"
status: "done"
area: "backend"
agent: "@backend-developer"
priority: "high"
created_at: "2026-03-25"
due_date: null
started_at: null
completed_at: "2026-03-25"
prd_refs: []
blocks: ["012", "014"]
blocked_by: ["009"]
---

## Description

Create the Node.js + Express backend in a `/backend` subdirectory. This is the foundational backend task — the contact form endpoint (#014) cannot be built until this scaffold exists.

The backend serves one primary purpose in v1: handle the contact form submission (POST /api/contact). The scaffold must include a health check endpoint (GET /health) required by Docker's HEALTHCHECK instruction and by Digital Ocean App Platform health probes.

## Acceptance Criteria

**Project structure**
- [x] `/backend` directory created with its own `package.json`
- [x] Directory layout:
  ```
  backend/
    src/
      routes/
        health.js     # GET /health
        contact.js    # POST /api/contact (stub — implemented in #014)
      middleware/
        errorHandler.js
      app.js          # Express app setup (no listen call)
      server.js       # Starts the server, imports app.js
    .env.example
    package.json
  ```

**Health check endpoint**
- [x] `GET /health` returns `200 OK` with JSON body `{ "status": "ok", "timestamp": "<ISO string>" }`
- [x] Response time under 50ms

**Express app configuration**
- [x] `express.json()` middleware registered
- [x] `express.urlencoded({ extended: true })` registered
- [x] Request logging middleware (use `morgan` — `dev` format for local, `combined` for production, controlled by `NODE_ENV`)
- [x] `/api` prefix applied to all API routes
- [x] 404 handler for unmatched routes returns `{ "error": "Not found" }` with status 404
- [x] Global error handler middleware returns `{ "error": "<message>" }` with appropriate status code

**Environment config**
- [x] `dotenv` installed and loaded at top of `server.js`
- [x] `.env.example` includes: `PORT=3000`, `NODE_ENV=development`, `CORS_ORIGIN=http://localhost:5173`
- [x] `.env` excluded from git (`.gitignore` in `/backend`)
- [x] `PORT` read from environment, defaults to `3000`

**Dev experience**
- [x] `nodemon` installed as devDependency
- [x] `npm run dev` starts server with nodemon
- [x] `npm start` starts server without nodemon (production)
- [x] `npm run lint` runs ESLint on `src/`

**Tests**
- [x] `vitest` or `jest` + `supertest` installed
- [x] Test for `GET /health` — asserts 200 status and `status: "ok"` in body
- [x] `npm test` passes

## Technical Notes

Keep `app.js` and `server.js` separate — `app.js` exports the Express instance for testing (supertest can import it without starting the server). `server.js` is the only file that calls `app.listen()`.

Do not install TypeScript — plain JavaScript consistent with the frontend approach (CLAUDE.md: "Language: HTML5 + vanilla JavaScript (ES6+)").

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-25 | human | Task created as part of migration plan |
| 2026-03-25 | @backend-developer | Scaffold completed: `backend/` Express app, health + contact stub, vitest/supertest, ESLint |
