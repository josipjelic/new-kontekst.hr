<!--
DOCUMENT METADATA
Owner: @systems-architect
Update trigger: Any significant architectural, technology, or design pattern decision is made
Update scope: Append new ADRs only. Never edit the body of an Accepted ADR.
Read by: All agents. Check this file before proposing changes that may conflict with prior decisions.
-->

# Architecture Decision Records

> This log captures the context and reasoning behind key decisions so they are never lost.
>
> **Rule**: Once an ADR is marked **Accepted**, do not edit its body. If a decision needs to change, write a new ADR that explicitly supersedes the old one. Add `**Status**: Superseded by ADR-XXX` to the old record.
>
> **Agents**: Read the relevant ADRs before proposing architectural changes. A proposal that contradicts an Accepted ADR needs a new ADR — not a silent override.

---

## Decision Index

| ID | Title | Status | Date |
|----|-------|--------|------|
| ADR-001 | Plain HTML + Tailwind CDN instead of a JS framework | Superseded by ADR-002 | 2026-03-25 |
| ADR-002 | Migration to Vite + React, Node.js/Express backend, Docker | Accepted | 2026-03-25 |

---

## ADR-001: Plain HTML + Tailwind CDN instead of a JS framework

**Date**: 2026-03-25
**Status**: Superseded by ADR-002
**Deciders**: Josip / @systems-architect

### Context

Kontekst.hr was a marketing site with no dynamic content, user accounts, or database. The only interactions were a mobile navigation toggle and smooth scroll — nothing that required a reactive UI framework. The project needed to ship quickly and stay easy to maintain without DevOps overhead.

### Options Considered

1. **Plain HTML + Tailwind CDN**: No build step; open `index.html` in the browser. Pros: zero complexity, fast deploy, maximum performance. Cons: no component reusability, no hot reload without extra tooling.
2. **Next.js (React)**: SSR/SSG, TypeScript, large ecosystem. Pros: scalable, TypeScript, easy to add dynamic features later. Cons: overkill for a marketing page, Node dependency, build pipeline, more complex deployment.
3. **Astro**: Static site generator aimed at content-heavy sites. Pros: strong SEO support, partial hydration, islands architecture. Cons: another tool to learn, build step required, unnecessary complexity for a simple marketing site.

### Decision

**Plain HTML + Tailwind CSS via CDN** was chosen. For a marketing page with 5–6 sections and no real interactivity, any JS framework added more overhead than benefit. Tailwind CDN enabled fast styling without a build step.

### Consequences

- **Positive**: Zero build complexity, trivial deploy (push → DO App Platform), maximum page speed, easy to maintain
- **Negative**: No component reusability — HTML repeats for similar UI blocks; if the site grows, a framework migration may be needed
- **Neutral**: Tailwind via CDN ships the full CSS bundle (~3MB) without tree-shaking — acceptable for a marketing site; can be optimized in v2

---

## ADR-002: Migration to Vite + React, Node.js/Express backend, Docker

**Date**: 2026-03-25
**Status**: Accepted
**Deciders**: Josip / @systems-architect

### Context

Kontekst.hr outgrew a static marketing-only setup. Upcoming needs include a contact form with server-side handling, potential CRM integration, and a consistent local development environment. The previous plain HTML approach (ADR-001) lacked component reusability, had no backend, and made collaboration harder without a standardized dev environment.

Key constraints:
- The site remains primarily marketing — no user accounts or complex client state
- The team needs a fast dev feedback loop (HMR)
- Backend needs are light (contact form, possible webhooks) — no heavy framework required
- Local development must be reproducible without “works on my machine” issues

### Options Considered

1. **Next.js (React, SSR/SSG)**: Full-stack React with built-in API routes. Pros: SSR for SEO, file-based routing, API routes without a separate server, large ecosystem. Cons: overkill for a single-page marketing site with a light API; vendor alignment with Vercel for best DX; harder deployment on Digital Ocean; SSR adds runtime complexity that is not needed here.

2. **Vite + React (SPA) + Node.js/Express (separate backend) + Docker**: React SPA built with Vite, Express API, orchestrated with docker-compose. Pros: among the fastest HMR in the ecosystem (Vite), clear frontend/backend split, Express is minimal and flexible for light APIs, Docker gives everyone the same environment, easy to add services (Redis, DB) later. Cons: two processes to maintain (frontend + backend), SPA implies client-side routing concerns, SEO needs extra care (prerendering or meta tag management).

3. **Astro + Node.js backend + Docker**: Astro for static frontend with islands hydration, separate Node backend. Pros: strong SEO defaults, partial hydration reduces JS bundle, content-first. Cons: smaller ecosystem than React, team lacks Astro experience, islands add conceptual complexity for a simple marketing site, harder hiring.

### Decision

**Vite + React (SPA) + Node.js/Express + Docker** was chosen as the best balance of simplicity and flexibility:

- **Vite + React** for the frontend: Vite has very fast HMR; React components address HTML repetition from ADR-001; the ecosystem is large and familiar. An SPA is enough because the site is single-page — SEO is handled via prerendering or meta tag tooling (e.g. `react-helmet-async`).
- **Node.js/Express** for the backend: Minimal server for the contact form and future integrations. Express is sufficient — no NestJS or similar for these API needs.
- **Docker + docker-compose** for infrastructure: Same local dev for all developers, easy to add services, production-ready multi-stage Dockerfiles.

Next.js was rejected because SSR is not required for this single-page marketing site, and the framework adds complexity (middleware, server components, caching) that does not serve this project. Astro was rejected due to a smaller ecosystem and lack of team experience.

### Consequences

- **Positive**: Component reusability (React), fast dev feedback (Vite HMR), backend ready for contact and integrations, reproducible dev environment (Docker), Tailwind can be built with tree-shaking (addresses the CDN bundle issue from ADR-001)
- **Negative**: Build step is now mandatory (Vite build), two processes to maintain (frontend + backend), Docker adds onboarding cost for developers unfamiliar with it, SPA needs extra work for SEO (prerendering / meta management)
- **Neutral**: Hosting moves from pure static files to containerized deployment — Digital Ocean App Platform supports Docker, but configuration is more involved than push-to-deploy for static files

---

<!--
TEMPLATE FOR NEW ADRs — copy this block when adding a new record:

## ADR-[NNN]: [Short Title]

**Date**: YYYY-MM-DD
**Status**: Accepted
**Deciders**: [Human name(s)] / @systems-architect

### Context
[What situation or problem prompted this decision. Include relevant constraints.]

### Options Considered
1. **[Option A]**: [Description] — Pros: [...] Cons: [...]
2. **[Option B]**: [Description] — Pros: [...] Cons: [...]

### Decision
[What was decided and the primary reason why.]

### Consequences
- **Positive**: [What becomes easier or better]
- **Negative**: [Trade-offs or what becomes harder]
- **Neutral**: [What changes but is neither better nor worse]
-->
