# Kontekst.hr

> Marketing website for Kontekst.hr — a company focused on business automation, n8n workflows, and AI applications.

---

## Overview

Kontekst.hr is a marketing site that acts as a digital business card and lead-generation channel. It presents the company’s services (n8n workflow automation, business process automation, custom AI apps) to business owners who want to optimize and automate operations.

The codebase uses **Vite + React** for the frontend, **Node.js + Express** for a small API (contact form and future integrations), and **Docker** for local and production-style environments. Styling is **Tailwind CSS** (PostCSS build). Deployment target is **Digital Ocean App Platform** (containers).

The public UI copy and SEO metadata are **Croatian** (primary market). **Developer documentation** (`docs/`, this README, `.tasks/`) is **English**.

---

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Frontend | React 18 + Vite 5 | SPA, sections in `src/components/` |
| Styling | Tailwind CSS 3 + PostCSS | Built bundle with tree-shaking |
| Backend | Node.js 20 + Express 4 | API under `/api`, health at `/health` |
| Containers | Docker + docker-compose | Dev and prod-compose setups |
| Hosting | Digital Ocean App Platform | Docker-based deploy (see backlog #022) |

---

## Getting Started

### Prerequisites

- Node.js 20+ and npm
- Docker Desktop (optional, for `docker compose`)

### Install and run (local, no Docker)

```bash
git clone https://github.com/[org]/new-kontekst.hr.git
cd new-kontekst.hr

# Frontend (Vite dev server)
npm install
npm run dev
# → http://localhost:5173

# Backend (separate terminal)
cd backend
npm install
npm run dev
# → http://localhost:3000
```

### Run with Docker (frontend + backend)

From the repository root:

```bash
docker compose up
```

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000`

Copy environment examples: `.env.example` (root) and `backend/.env.example`.

### Tests

```bash
npm test                 # frontend (Vitest)
cd backend && npm test   # backend (Vitest)
```

---

## Project Structure

```
new-kontekst.hr/
├── src/                    # React app + Vite entry (`src/index.html`)
├── backend/                # Express API
├── public/                 # Static assets served by Vite
├── docs/                   # Technical + user documentation (English)
├── .tasks/                 # Task specs per TODO item
├── docker-compose.yml      # Local dev
├── docker-compose.prod.yml # Production-style stack (nginx + backend)
├── Dockerfile.frontend     # Multi-stage frontend → nginx
├── PRD.md                  # Product requirements (read-only for agents)
├── TODO.md                 # Backlog
└── CLAUDE.md               # AI / agent instructions
```

---

## Environment Variables

See `.env.example` and `backend/.env.example`. Important for the contact form:

- **Backend**: `SMTP_*`, `CORS_ORIGIN`, `PORT`, `NODE_ENV`
- **Compose / frontend proxy**: `API_PROXY_TARGET`, `CORS_ORIGIN`

Never commit real secrets.

---

## Deployment

Production deployment is tracked in the backlog (GitHub Actions + Digital Ocean — see `TODO.md` / task #022).

---

## License

Proprietary — Kontekst.hr, all rights reserved.
