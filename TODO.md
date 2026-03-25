# TODO / Backlog

> **Governor**: @project-manager — invoke for sprint planning, prioritization, and feature breakdown
> **Agents**: May add items to "Backlog" and move completed items to "Completed". Preserve section order. Never reorder items within a section — priority position is set by humans or @project-manager when explicitly asked.

---

## In Progress

_(nothing in progress)_

---

## Up Next (prioritized)

_(nothing up next — see Backlog)_

---

## Backlog

- [ ] #008 — Digital Ocean App Platform deployment konfiguracija [area: infra] → [.tasks/008-digitalocean-deployment.md](.tasks/008-digitalocean-deployment.md)
  > NOTE: This task was scoped for plain-HTML static deploy. It is superseded by #022 (containerised CI/CD). Human to confirm whether to close or keep.

---

## Migration: React + Node.js + Docker

> **Context**: ADR-001 (Plain HTML + Tailwind CDN) is superseded by ADR-002 (Vite + React + Node.js/Express + Docker). These tasks execute that migration.
>
> **Critical path**: #009 → #010 + #011 + #013 (parallel) → #015 + #016 + #017 + #018 (parallel, blocked by 010+011) → #019 (blocked by 014) → #020 → #021 → #022 → #023
>
> **Parallel opportunities**: Once #009 is done, Phase 1b/1c (#010, #011) and Phase 3a (#013) can run concurrently. Once scaffold + Tailwind are ready (#010, #011), all section components (#015–#018) can run concurrently.

### Phase 1 — Project Scaffolding

- [ ] #009 — Phase 1a: Scaffold Vite + React project structure (src/, components/, pages/) [area: setup] → [.tasks/009-phase1-vite-react-scaffold.md](.tasks/009-phase1-vite-react-scaffold.md)
- [ ] #010 — Phase 1b: Set up Tailwind CSS with PostCSS in React project (replace CDN) [area: setup] → [.tasks/010-phase1-tailwind-postcss.md](.tasks/010-phase1-tailwind-postcss.md)
- [ ] #011 — Phase 1c: Configure ESLint + Prettier [area: setup] → [.tasks/011-phase1-eslint-prettier.md](.tasks/011-phase1-eslint-prettier.md)
- [ ] #012 — Phase 1d: Docker setup — Dockerfile (frontend + backend) + docker-compose for local dev [area: infra] → [.tasks/012-phase1-docker-setup.md](.tasks/012-phase1-docker-setup.md)

### Phase 2 — Frontend Migration (React components)

- [ ] #015 — Phase 2a: Migrate Nav component from HTML to React [area: frontend] → [.tasks/015-phase2-nav-component.md](.tasks/015-phase2-nav-component.md)
- [ ] #016 — Phase 2b: Migrate Hero section to React [area: frontend] → [.tasks/016-phase2-hero-component.md](.tasks/016-phase2-hero-component.md)
- [ ] #017 — Phase 2c: Migrate Usluge, Kako radimo, and O nama sections to React [area: frontend] → [.tasks/017-phase2-usluge-kakoradimo-onama.md](.tasks/017-phase2-usluge-kakoradimo-onama.md)
- [ ] #018 — Phase 2d: Migrate Footer to React [area: frontend] → [.tasks/018-phase2-footer-component.md](.tasks/018-phase2-footer-component.md)
- [ ] #019 — Phase 2e: Migrate Kontakt section to React with live contact form [area: frontend] → [.tasks/019-phase2-kontakt-component.md](.tasks/019-phase2-kontakt-component.md)
- [ ] #020 — Phase 2f: Wire scroll reveal animations, SEO meta tags, and JSON-LD in React [area: frontend] → [.tasks/020-phase2-scroll-reveal-and-seo.md](.tasks/020-phase2-scroll-reveal-and-seo.md)

### Phase 3 — Backend (Node.js/Express)

- [ ] #013 — Phase 3a: Scaffold Express server with health check endpoint [area: backend] → [.tasks/013-phase3-backend-scaffold.md](.tasks/013-phase3-backend-scaffold.md)
- [ ] #014 — Phase 3b: Implement POST /api/contact with email sending, CORS, rate limiting, validation [area: backend] → [.tasks/014-phase3-contact-endpoint.md](.tasks/014-phase3-contact-endpoint.md)

### Phase 4 — Docker & Dev Experience

- [ ] #021 — Phase 4: Production Dockerfile hardening + docker-compose.prod.yml [area: infra] → [.tasks/021-phase4-production-dockerfiles.md](.tasks/021-phase4-production-dockerfiles.md)

### Phase 5 — CI/CD & Deploy

- [ ] #022 — Phase 5: GitHub Actions CI/CD — build, test, push Docker images, deploy to DO [area: infra] → [.tasks/022-phase5-cicd-github-actions.md](.tasks/022-phase5-cicd-github-actions.md)

### Phase 6 — QA

- [ ] #023 — Phase 6: QA — cross-browser testing, responsiveness, Lighthouse, accessibility audit [area: qa] → [.tasks/023-phase6-qa.md](.tasks/023-phase6-qa.md)

---

## Completed

- [x] #006 — Sekcija Kontakt i footer [area: frontend] → [.tasks/006-kontakt-and-footer.md](.tasks/006-kontakt-and-footer.md)
- [x] #005 — Sekcija O nama [area: frontend] → [.tasks/005-o-nama-section.md](.tasks/005-o-nama-section.md)
- [x] #007 — SEO optimizacija: meta tagovi, Open Graph, JSON-LD structured data [area: frontend] → [.tasks/007-seo-optimization.md](.tasks/007-seo-optimization.md)
- [x] #004 — Sekcija Kako radimo — proces u koracima [area: frontend] → [.tasks/004-kako-radimo-section.md](.tasks/004-kako-radimo-section.md)
- [x] #003 — Sekcija Usluge — 3 kartice usluga [area: frontend] → [.tasks/003-usluge-section.md](.tasks/003-usluge-section.md)
- [x] #002 — Hero sekcija s futurističkim dizajnom i CTA [area: frontend] → [.tasks/002-hero-section.md](.tasks/002-hero-section.md)
- [x] #001 — HTML boilerplate, Tailwind setup, i navigacijski header [area: frontend] → [.tasks/001-html-boilerplate-and-nav.md](.tasks/001-html-boilerplate-and-nav.md)
- [x] #000 — Initial project setup and template configuration → [.tasks/000-initial-project-setup.md](.tasks/000-initial-project-setup.md)

---

## Item Format Guide

When adding new items, use this format:

```
- [ ] #NNN — Brief description of the task [area: frontend|backend|database|qa|docs|infra|design] → [.tasks/NNN-short-title.md](.tasks/NNN-short-title.md)
```

Every TODO item must have a corresponding `.tasks/NNN-*.md` file. @project-manager creates both together.

**Area tags** help agents know which specialist to use:
- `frontend` → @frontend-developer
- `design` → @ui-ux-designer
- `qa` → @qa-engineer
- `docs` → @documentation-writer
- `infra` → @systems-architect / @cicd-engineer
- `setup` → general
