# Kontekst.hr — Claude Instructions

> Stack: Vite + React · Tailwind CSS (PostCSS) · Node.js/Express · Docker · Digital Ocean App Platform
> Last updated: 2026-03-25

## Project Context

Kontekst.hr is the company website for a business focused on automation, n8n workflows, and AI applications. The audience is business owners who want to optimize and automate operations. The site is a marketing presentation of services, SEO-oriented for the **Croatian** market.

**Tech stack summary**: Vite + React SPA · Tailwind (build) · Express API · Docker · Digital Ocean App Platform

---

## Documentation language

- **All Markdown documentation** (`docs/**`, `README.md`, `.tasks/*.md`, and backlog lines in `TODO.md`) MUST be written in **English**.
- **End-user website copy** (headings, body text, form labels, user-visible API messages) remains **Croatian** unless explicitly requested otherwise.

---

## Agents Available

**Mandatory delegation — this is not optional.** Every task that falls within a specialist's domain MUST be routed to that agent. Do not implement code, design schemas, write docs, or configure pipelines yourself — delegate. Only handle directly: project-level questions, routing decisions, and tasks explicitly outside all specialist domains.

| Agent | Role | Invoke when... |
|-------|------|----------------|
| `project-manager` | Backlog & coordination | "What's next?", sprint planning, breaking down features, reprioritizing |
| `systems-architect` | Architecture & ADRs | New feature design, tech decisions, system integration |
| `frontend-developer` | UI implementation | React components, Tailwind styling, sections, animations |
| `backend-developer` | API & business logic | Endpoints, auth, background jobs, integrations |
| `ui-ux-designer` | UX & design system | Layout, visual hierarchy, futuristic design elements, accessibility |
| `database-expert` | Schema & queries | Migrations, schema design, query optimization |
| `qa-engineer` | Testing | Cross-browser testing, responsiveness checks, accessibility audit |
| `documentation-writer` | Living docs | User guide updates, post-feature documentation |
| `cicd-engineer` | CI/CD & GitHub Actions | Digital Ocean App Platform config, GitHub Actions, release automation |
| `docker-expert` | Containerization | Dockerfiles, docker-compose, image optimization, container networking |
| `copywriter-seo` | Copy & SEO | Landing page copy, marketing content, meta tags, keyword strategy, structured data specs, brand voice |

---

## Critical Rules

These apply to all agents at all times. No exceptions without explicit human instruction.

1. **PRD.md is read-only.** Never modify it. Read it to understand requirements.
2. **TODO.md is the living backlog.** Agents may add items, mark items complete, and move items to "Completed". Preserve section order and existing item priority — do not reorder items within a section unless explicitly asked to reprioritize.
3. **All commits use Conventional Commits format** (see Git Conventions below).
4. **Update the relevant `docs/` file** after every significant change before marking a task complete (in **English**).
5. **Run tests before marking any implementation task complete.**
6. **Never hardcode secrets, credentials, or environment-specific values** in source code.
7. **Consult `docs/technical/DECISIONS.md`** before proposing changes that may conflict with prior architectural decisions.
8. **All user-visible marketing copy is in Croatian** unless explicitly instructed otherwise.
9. **All pages must be SEO-optimized** — meta tags, structured data, alt text, semantic elements (Croatian where shown to users).
10. **Always delegate to the right specialist.** If a task touches frontend, backend, database, UX/design, QA, documentation, CI/CD, Docker, or copy/SEO — invoke the appropriate agent immediately. Do not implement it yourself. The delegation table above is binding, not advisory.

---

## Project Structure

```
new-kontekst.hr/
  src/
    index.html            # Vite HTML entry (Vite root = src)
    components/           # layout/, sections/, ui/
    pages/, hooks/, assets/
  backend/src/            # Express app (routes, middleware)
  public/                 # Static assets
docs/
  user/USER_GUIDE.md
  technical/              # Architecture, decisions, API
  content/                # Content strategy (English docs; live copy may be Croatian)
.claude/agents/           # Specialist agent definitions
.tasks/                   # Detailed task files — one per TODO item
```

---

## Git Conventions

### Commit Format
```
<type>(<scope>): <short description>

[optional body]
[optional footer: Closes #issue]
```

**Types**: `feat` · `fix` · `docs` · `style` · `refactor` · `test` · `chore` · `perf` · `ci`

Examples:
```
feat(hero): add animated headline for hero section
fix(nav): fix mobile hamburger menu toggle
style(services): adjust card spacing on mobile
```

### Branch Naming
```
feature/<ticket-id>-short-description
fix/<ticket-id>-short-description
chore/<description>
docs/<description>
refactor/<description>
```

### PR Requirements
- PR title follows Conventional Commits format
- Fill out `.github/PULL_REQUEST_TEMPLATE.md` completely — do not delete sections
- Link to the related issue/ticket (`Closes #XXX`)
- At least one reviewer required before merge
- All CI checks must pass

---

## Code Style

- **Frontend**: React function components, ES modules, Tailwind utilities + `src/assets/css/custom.css` for tokens/overrides
- **Backend**: ESM Node, Express route modules
- **No `console.log`** in production code
- **No commented-out code** committed
- **Semantic HTML** in React: `<nav>`, `<main>`, `<section>`, `<footer>`, etc.
- **Accessibility**: images need `alt`; interactive elements need labels

---

## Design Guidelines

- **Palette**: Dark base (`#07090D` region) with teal accent — see `docs/technical/ARCHITECTURE.md` Design System
- **Feel**: Futuristic, clean, technical — geometry, subtle grids, gradient accents on cards
- **Typography**: Syne + DM Sans (Google Fonts) — see Architecture doc
- **Public copy language**: Croatian
- **Sections**: Hero, Usluge, Kako radimo, O nama, Kontakt

---

## SEO Requirements

- Croatian title tags and meta descriptions for the live site
- Open Graph tags for social sharing
- JSON-LD structured data for the business
- Target keywords (Croatian): "automatizacija poslovanja", "n8n Hrvatska", "AI aplikacije za poslovanje", "poslovne automatizacije"
- Semantic heading hierarchy (one `<h1>` per page)

---

## Environment & Commands

- **Frontend**: `npm run dev` · `npm run build` · `npm test` · `npm run lint`
- **Backend**: `cd backend && npm run dev` · `npm test`
- **Docker**: `docker compose up` from repo root
- **Deploy**: Digital Ocean App Platform (see backlog / CI tasks)

---

## Key Documentation

@docs/technical/ARCHITECTURE.md
@docs/technical/DECISIONS.md
@docs/user/USER_GUIDE.md
