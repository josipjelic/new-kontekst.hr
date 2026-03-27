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
| ADR-003 | OpenRouter/Claude Haiku for AI readiness questionnaire | Accepted | 2026-03-26 |

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

## ADR-003: OpenRouter/Claude Haiku for AI readiness questionnaire

**Date**: 2026-03-26
**Status**: Accepted
**Deciders**: Josip / @systems-architect

### Context

The product owner requested a new feature: an AI Readiness Questionnaire that gives business visitors a personalised assessment of their readiness for AI and automation. The questionnaire collects 5 multiple-choice answers and returns a tier classification (beginner / intermediate / ready), a numeric score, and a narrative assessment paragraph.

The core design question is how to generate the assessment. A static scoring engine (rule-based) would be simpler but produces generic, formulaic output that does not feel personalised. Using an LLM allows the assessment to be contextual, nuanced, and written in natural Croatian or English prose -- which is more compelling for a marketing-oriented feature that should demonstrate Kontekst's AI expertise.

Key constraints:
- The site has no database -- the assessment is generated on the fly and not persisted
- The backend is a lightweight Express API on Node 20 (ADR-002) -- no heavy dependencies
- Cost must stay low: each questionnaire submission triggers one LLM call, so a cheap, fast model is essential
- The LLM API key must stay server-side (never exposed to the browser)
- The feature must work for both Croatian (`/upitnik`) and English (`/en/questionnaire`) locales

### Options Considered

1. **Static rule-based scoring**: Map each answer to a point value, sum points, assign tier thresholds, and return a pre-written assessment paragraph per tier. Pros: zero external dependency, no API cost, deterministic, instant response, no API key management. Cons: output is generic and identical for every user in the same tier -- no personalisation, no demonstration of AI capability, limited marketing impact. Hard to make the Croatian prose feel natural at scale without writing dozens of variants.

2. **OpenRouter API with Claude Haiku model**: Backend sends the 5 answers to OpenRouter (`https://openrouter.ai/api/v1/chat/completions`) using the `anthropic/claude-haiku-4.5` model (OpenRouter slug). OpenRouter provides an OpenAI-compatible interface, usage-based pricing, and model fallback options. Pros: personalised natural-language assessment in Croatian or English, demonstrates Kontekst's AI capability to visitors, very low per-call cost (Haiku is among the cheapest capable models), OpenRouter abstracts provider billing and offers model switching without code changes. Cons: adds an external runtime dependency (OpenRouter availability), introduces per-request cost (~$0.001-0.003/call), response latency (1-4 seconds typical), requires API key management, assessment quality depends on prompt engineering.

3. **Direct Anthropic API (Messages API)**: Call `https://api.anthropic.com/v1/messages` directly with the same Claude Haiku model. Pros: one fewer intermediary, slightly lower latency, direct relationship with model provider. Cons: Anthropic API uses a non-OpenAI-compatible format (different auth header, different request/response shape), switching models later requires code changes, no built-in fallback to other providers, billing setup directly with Anthropic is less flexible for a small-volume use case.

### Decision

**OpenRouter API with Claude Haiku** (option 2) was chosen. The personalised AI assessment is the entire point of the feature -- a static scoring engine would undermine the value proposition. OpenRouter was preferred over the direct Anthropic API because:

- OpenAI-compatible request format is well-documented and widely understood
- Model switching (e.g. upgrading to a future cheaper/better model) requires only changing an environment variable (`OPENROUTER_MODEL`), not code
- OpenRouter handles billing aggregation -- useful at low volume where setting up a direct Anthropic billing relationship adds friction
- The additional latency of the OpenRouter proxy (typically <100ms) is negligible relative to the LLM inference time

Non-streaming response mode is chosen for v1. Streaming would improve perceived latency but adds significant frontend complexity (SSE parsing, partial state rendering) that is not justified for a 1-4 second response. This can be revisited if user feedback indicates the wait feels too long.

### Consequences

- **Positive**: Visitors receive a genuinely personalised, well-written assessment that demonstrates Kontekst's AI expertise; the feature differentiates the site from competitors; model upgrades are a config change, not a code change
- **Negative**: External runtime dependency on OpenRouter (if OpenRouter is down, the questionnaire returns an error); per-request cost (mitigated by strict rate limiting: 3 req/15 min/IP); response latency of 1-4 seconds requires a loading state in the UI; prompt engineering becomes a maintenance concern; assessment quality is non-deterministic
- **Neutral**: Two new environment variables (`OPENROUTER_API_KEY`, `OPENROUTER_MODEL`) must be configured in all environments; the backend gains its first outbound HTTP call to a third-party API, which changes the backend's failure mode from "self-contained" to "depends on external service"

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
