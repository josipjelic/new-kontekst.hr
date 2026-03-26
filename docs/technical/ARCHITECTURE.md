<!--
DOCUMENT METADATA
Owner: @systems-architect (all sections except Design System)
Update trigger: System architecture changes, new integrations, component additions, design system updates
Update scope:
  @systems-architect: All sections except "Design System"
  @ui-ux-designer: "Design System" section only
  @frontend-developer: May append to "Frontend Architecture" (never overwrite)
  @backend-developer: May append to "Backend Architecture" (never overwrite)
Read by: All agents. Always read before making implementation decisions.
-->

# System Architecture

> Last updated: 2026-03-26
> Version: 2.1

---

## Overview

Kontekst.hr is a marketing website with a lightweight backend. The frontend is a React SPA built with Vite; the backend is a Node.js/Express API for the contact form and future integrations (CRM, webhooks). Both services are containerized with Docker and orchestrated via docker-compose for local development.

Deployment runs on Digital Ocean App Platform using Docker containers. See ADR-002 for rationale for migrating from plain HTML.

```
[Visitor (browser)]
        │
        ▼
[Digital Ocean App Platform]
  (Docker containers)
        │
   ┌────┴────┐
   ▼         ▼
[Frontend]  [Backend]
 Vite+React  Express API
 (static     (contact form,
  build)      integrations)
```

---

## Tech Stack

| Layer | Technology | Version | Why Chosen |
|-------|-----------|---------|------------|
| Frontend | React (Vite) | React 18+, Vite 5+ | Component reusability, very fast HMR, large ecosystem (ADR-002) |
| Styling | Tailwind CSS (PostCSS build) | 3.x | Utility-first, tree-shaking u buildu smanjuje bundle |
| Backend | Node.js + Express | Node 20 LTS, Express 4.x | Lagan API za kontakt formu i integracije |
| Containerization | Docker + docker-compose | Docker 24+ | Reproducibilan dev environment, production-ready multi-stage build |
| Hosting | Digital Ocean App Platform | - | Docker container deploy, solid availability |
| Version Control | Git / GitHub | - | Standard |

---

## System Components

### Frontend Architecture

React SPA built with Vite. Single-page marketing site — no client-side router (one page, anchor scroll navigation). Tailwind CSS is built via PostCSS with tree-shaking.

**Routing**: None — single page, anchor scroll (`#usluge`, `#kontakt`, etc.)

**State management**: Minimal — local React state for UI (mobile nav toggle, form state). No global state library.

**Implemented components (phase 2)**: Per-locale folders `components/hr/` and `components/en/` — `Nav.jsx`, `Footer.jsx`, `Hero.jsx`, `Services.jsx`, `HowWeWork.jsx`, `AboutUs.jsx`, `Contact.jsx` (form → `POST ${VITE_API_URL}/api/contact`, default `http://localhost:3000`). App shell: `Nav` → `<main>` → sections (`Home`) → `Footer`. Scroll reveal: `hooks/useScrollReveal.js` (IntersectionObserver + `prefers-reduced-motion`) toggles `.visible` on `.reveal`. SEO meta + JSON-LD in `src/index.html` (Vite root). Frontend tests: `npm test` (Vitest, `src/**/*.test.jsx`).

**Component structure**:
```
client/
  src/
    components/
      ui/           # Button, Badge, SectionLabel, Card, etc.
      sections/     # Hero, Services, HowWeWork, AboutUs, Contact, Footer
      layout/       # Navbar, PageWrapper
    assets/
      css/          # Tailwind config, custom.css
      images/       # Images, icons
    App.tsx         # Root component, section composition
    main.tsx        # Entry point
  index.html        # Vite HTML entry (under src/ in this repo)
  vite.config.ts
  tailwind.config.ts
```

**Current repo layout (phase 1a, #009)**: Frontend is Vite + React with **`vite.config.js` `root: src`** — Vite entry is **`src/index.html`**, source under `src/`; repo **`public/`** is still the static asset dir (see `publicDir` in Vite config). Production build outputs to **`dist/`** at the repository root (`npm run build`). (The diagram above using `client/` describes a possible multi-container layout after Docker/CI hardening.)

**Tailwind build (#010)**: `tailwind.config.js` at repo root, `postcss.config.js` with `tailwindcss` + `autoprefixer`. Entry CSS: `src/index.css` (`@tailwind` directives + small `@layer base` tweaks). Component styling from the former `assets/css/custom.css` lives in **`src/assets/css/custom.css`**, imported from `src/main.jsx` after Tailwind layers (order: `index.css` → `custom.css`).

**Lint and format (#011)**: `npm run lint` runs ESLint 9 (`eslint.config.js`, flat config) on `src/`. `npm run format` runs Prettier (`src/**/*.{js,jsx,css}`). `.editorconfig` aligns with Prettier.

**Data fetching pattern**: Minimal — contact form POSTs to the backend API. No server-state caching (no React Query for v1).

**Pointer-driven motion**: `usePointerMotion` (`src/hooks/usePointerMotion.js`) mounted in `App.jsx` — `pointermove` → refs → one `requestAnimationFrame` loop with lerp; writes `--pointer-nx` / `--pointer-ny` on `:root` and `data-pointer-motion="on"|"off"` on `<html>`. Hero uses parallax wrappers + `.hero-spotlight`; services (`Services.jsx`) use `useServiceCardTilt` on `article.service-card`. Enabled when **not** `prefers-reduced-motion: reduce` and **`(any-pointer: fine)`** (so a mouse/trackpad counts even if the primary pointer is coarse, e.g. touchscreen laptops). Pure touch devices with no fine pointer get no listeners. Spec: [`docs/technical/POINTER_MOTION_HANDOVER.md`](POINTER_MOTION_HANDOVER.md).

**Locale layout (hr / en)**: Croatian UI lives under `src/components/hr/` (Nav, Footer, Hero, Services, HowWeWork, AboutUs, Contact) and is composed by `src/pages/hr/Home.jsx`. English mirrors the same filenames under `src/components/en/` and `src/pages/en/Home.jsx` (Helmet + `lang="en"` meta on the EN page). Shared hooks and assets stay outside these folders. `App.jsx` wires `react-router-dom` routes `/` and `/en` to the respective shells.

---

### Backend Architecture

Lightweight Node.js/Express API. Primary use case: contact form and future integrations (CRM, webhooks). No database for v1 — the contact form sends email directly.

**API style**: REST, Express route handlers

**Middleware stack**:
1. CORS — allows only the frontend origin
2. Rate limiting — protects the contact form from abuse
3. Request validation — validates body (contact fields)
4. Error handler — standardized JSON error responses

**Service layer pattern**: Thin controllers in route modules; service logic in `server/src/services/`. For v1 the only service is email/contact.

```
server/
  src/
    routes/         # Express route definitions
    middleware/     # CORS, rate-limit, validation, error handler
    services/      # Business logic (contact, future CRM)
    index.ts       # Express app entry point
  Dockerfile
  package.json
```

**Current backend layout (#013)**: Implementation lives in **`backend/`** (plain JavaScript, not TypeScript). `src/app.js` exports the Express app for supertest without `listen`; `src/server.js` loads `dotenv` and listens on **`PORT`** (default **3000**). **`GET /health`** returns JSON `{ status, timestamp }` for Docker / DO health checks. API routes are under **`/api`** (e.g. **`POST /api/contact`**). CORS origin from **`CORS_ORIGIN`** (see `backend/.env.example`).

---

### Infrastructure

**Environments**:
| Environment | URL | Branch | Notes |
|-------------|-----|--------|-------|
| Production | https://kontekst.hr (TBD) | `main` | Docker container deploy na DO App Platform |
| Local | http://localhost:5173 (frontend), http://localhost:3000 (API) | any | `docker-compose up` runs both services |

**CI/CD**: Push to `main` → Digital Ocean App Platform builds Docker images and deploys containers.

**Docker setup**:
```
docker-compose.yml          # Dev: Vite (:5173) + Express (:3000), binds + anonymous volumes for node_modules
docker-compose.prod.yml     # Prod-like: nginx (:80) + Express (:3000), no source bind mounts
Dockerfile.frontend         # Multi-stage: Node 20 Alpine (Vite build) → nginx:alpine; embeds nginx.conf
backend/Dockerfile          # Node 20 Alpine, npm ci --omit=dev, USER node, HEALTHCHECK on /health
nginx.conf                  # SPA try_files, gzip, proxy /api and /health → backend service
.dockerignore               # Root context for frontend image; backend/.dockerignore for API image
.env.example                # Sample compose variables (API_PROXY_TARGET, CORS_ORIGIN, PORT, NODE_ENV)
```

#### Docker / local development

- **Run (dev)**: from repo root: `docker compose up`. Services: `backend` (Express + nodemon, port **3000**) and `frontend` (Vite with `--host 0.0.0.0`, port **5173**). `depends_on`: frontend waits for backend.
- **Volumes**: source is bind-mounted from the host; **`node_modules`** for both services use **anonymous volumes** so the host does not overwrite them.
- **Variables**: `env_file` may point to an optional root `.env` (copy from `.env.example`). Important: **`API_PROXY_TARGET=http://backend:3000`** so the Vite dev proxy inside the container targets the backend service by name; **`CORS_ORIGIN=http://localhost:5173`** so the browser on the host may call the API when using Vite outside nginx.
- **Production simulation**: `docker compose -f docker-compose.prod.yml up --build` — static files via nginx on **80**, API on **3000**; nginx forwards `/api` to `backend`. For `http://localhost` testing, set e.g. **`CORS_ORIGIN=http://localhost`**. The frontend service waits until the backend is **healthy**: `backend/Dockerfile` `HEALTHCHECK` must hit the same port the process listens on (**3000** by default); a broken check leaves the nginx container stopped so nothing serves the Vite build on port 80.

---

## Data Flow

### Contact Form Submission

```
1. User fills the contact form in the React component
2. Frontend validates fields (client-side)
3. POST /api/contact → Express backend
4. Backend middleware: rate-limit check → request validation
5. Contact service sends email (SMTP or email API)
6. Backend returns success/error JSON
7. Frontend shows confirmation or error message
```

### Page Load (Production)

```
1. Browser requests kontekst.hr
2. DO App Platform serves the nginx container (frontend build)
3. nginx returns index.html + bundled JS/CSS
4. React hydrates the page; IntersectionObserver drives scroll reveal
5. API calls go to /api/* → proxied to the Express backend container
```

---

## Questionnaire System

> Added: 2026-03-26 | ADR: ADR-003 | Status: Design complete, implementation pending

### Overview

The AI Readiness Questionnaire is a standalone multi-step wizard that collects 5 multiple-choice answers from a business visitor and returns a personalised AI readiness assessment generated by Claude Haiku via the OpenRouter API. The feature exists at two locale-specific routes (`/upitnik` for Croatian, `/en/questionnaire` for English) and is separate from the single-page Home layout.

```
[Visitor]
    │
    ▼
[React Questionnaire Page]
  5-step wizard (client-side)
    │
    ▼ POST /api/questionnaire
[Express Backend]
  validate → rate-limit → build prompt
    │
    ▼ HTTPS POST (fetch)
[OpenRouter API]
  anthropic/claude-haiku-4-5
    │
    ▼ JSON response
[Express Backend]
  parse → extract tier/score/assessment
    │
    ▼ JSON 200
[React Questionnaire Page]
  display result card
```

### Frontend Routes and Components

The questionnaire pages are **standalone routes**, not anchor sections within Home. They use the existing locale shell pattern (Nav + main + Footer) but render the questionnaire component instead of the Home sections.

**Routes** (added to `App.jsx` via react-router-dom):
- `/upitnik` -- Croatian questionnaire page
- `/en/questionnaire` -- English questionnaire page

**Component structure**:
```
src/
  components/
    hr/Questionnaire.jsx    # Croatian wizard UI + result display
    en/Questionnaire.jsx    # English wizard UI + result display
  pages/
    hr/Questionnaire.jsx    # Page shell: Nav + Helmet (hr) + Questionnaire + Footer
    en/Questionnaire.jsx    # Page shell: EnNav + Helmet (en) + Questionnaire + Footer
```

**State management**: Local React state within the questionnaire component. Tracks current step (0-4), selected answers, loading state, result, and error. No global state needed.

**UX flow**:
1. Visitor lands on `/upitnik` or `/en/questionnaire`
2. 5-step wizard: one question per step, 3 answer options each (radio or card selection)
3. Progress indicator shows current step (e.g. "Korak 2 od 5" / "Step 2 of 5")
4. After step 5, a "Generate assessment" button triggers `POST /api/questionnaire`
5. Loading state with spinner/skeleton while waiting (1-4 seconds typical)
6. Result card displays: tier badge, score, and narrative assessment paragraph
7. CTA below result to contact Kontekst (link to `/#kontakt` or `/en#contact`)

**SEO**: Each questionnaire page gets its own `<Helmet>` with locale-appropriate title, description, and `<link rel="canonical">`. The pages are indexable and contribute to the site's authority on AI/automation topics.

### Backend: POST /api/questionnaire

**Route file**: `backend/src/routes/questionnaire.js` (follows the same pattern as `contact.js`)

**Registration in app.js**: The questionnaire router is mounted on the existing `/api` router alongside the contact router, inheriting the global rate limiter (100 req/15 min). The questionnaire route additionally applies its own stricter rate limiter.

**Middleware chain** (per-request):
1. Questionnaire rate limiter (3 requests per 15 minutes per IP)
2. Request body validation (express-validator)
3. Controller: build prompt, call OpenRouter, parse response, return JSON

**Rate limiting**: 3 requests per IP per 15-minute window. This is stricter than the contact form (5/15min) because each request incurs AI API cost. The 429 response uses locale-appropriate messaging (Croatian by default, since the endpoint receives `locale` in the body).

**Validation rules**:
- `answers`: must be an array of exactly 5 objects
- Each answer: `{ questionId: "q1"-"q5", value: "a" | "b" | "c" }`
- `locale`: must be `"hr"` or `"en"`
- All question IDs must be present exactly once

**OpenRouter integration**:
- Uses Node 20 built-in `fetch` (no new HTTP client dependency)
- Endpoint: `https://openrouter.ai/api/v1/chat/completions`
- Model: read from `OPENROUTER_MODEL` env var (default: `anthropic/claude-haiku-4-5`)
- Auth: `Authorization: Bearer ${OPENROUTER_API_KEY}`
- Additional headers: `HTTP-Referer: https://kontekst.hr`, `X-Title: Kontekst.hr Questionnaire`
- Timeout: 10 seconds (`AbortController` with `setTimeout`)
- Non-streaming (v1): single JSON response, not SSE

**Request shape sent to OpenRouter**:
```json
{
  "model": "anthropic/claude-haiku-4-5",
  "messages": [
    { "role": "system", "content": "<system prompt>" },
    { "role": "user", "content": "<formatted answers>" }
  ],
  "max_tokens": 800,
  "temperature": 0.7,
  "response_format": { "type": "json_object" }
}
```

**Prompt construction strategy**:

The system prompt establishes the evaluator role and output schema. The user message provides the answers. Total prompt budget: under 600 tokens input to keep costs minimal.

*System prompt* (locale-aware -- Croatian example):
```
Ti si stručnjak za poslovnu AI spremnost u Hrvatskoj. Na temelju odgovora na 5 pitanja,
procijeni koliko je tvrtka spremna za uvođenje AI i automatizacije.

Odgovori ISKLJUČIVO valjanim JSON objektom u ovom formatu:
{
  "tier": "početnik" | "srednji" | "spreman",
  "score": <cijeli broj 0-100>,
  "assessment": "<150-300 riječi personalizirane procjene na hrvatskom jeziku>"
}

Smjernice za ocjenjivanje:
- "početnik" (0-33): Tvrtka je na početku digitalne transformacije
- "srednji" (34-66): Tvrtka ima temelje, ali treba strategiju za AI
- "spreman" (67-100): Tvrtka je dobro pozicionirana za AI implementaciju

Procjena mora biti konkretna, korisna i vezana uz njihove specifične odgovore.
Ne koristi generičke fraze. Budi profesionalan ali pristupačan.
```

*English system prompt equivalent*:
```
You are an expert AI readiness consultant for businesses. Based on answers to 5 questions,
assess how ready the company is to adopt AI and automation.

Respond ONLY with a valid JSON object in this format:
{
  "tier": "beginner" | "intermediate" | "ready",
  "score": <integer 0-100>,
  "assessment": "<150-300 words of personalised assessment in English>"
}

Scoring guidelines:
- "beginner" (0-33): Company is at the start of digital transformation
- "intermediate" (34-66): Company has foundations but needs an AI strategy
- "ready" (67-100): Company is well-positioned for AI implementation

The assessment must be specific, actionable, and tied to their specific answers.
Avoid generic phrases. Be professional but approachable.
```

*User message construction*: The 5 answers are mapped to human-readable question/answer text before being sent. The backend holds a lookup table of question texts and answer texts (both locales) so the prompt includes meaningful context, not just "q1: a". Example:

```
Odgovori korisnika:

1. Koliko zaposlenika ima vaša tvrtka?
   Odgovor: 11-50 zaposlenika

2. Koliki dio poslovnih procesa je digitaliziran?
   Odgovor: Većina procesa je digitalizirana

...
```

**Response parsing**:
- Parse the `choices[0].message.content` from OpenRouter's response
- `JSON.parse()` the content string
- Validate that `tier`, `score`, and `assessment` are present and correctly typed
- If parsing fails, return 500 with a graceful error (do not expose raw AI output)

**Error handling**:
| Scenario | HTTP Status | Response Body |
|----------|-------------|---------------|
| Validation failure | 422 | `{ "errors": [{ "field": "...", "message": "..." }] }` |
| Rate limit exceeded | 429 | `{ "error": "Previše pokušaja. Pokušajte za nekoliko minuta." }` |
| `OPENROUTER_API_KEY` not set | 500 | `{ "error": "Greška pri generiranju procjene. Pokušajte ponovo." }` |
| OpenRouter returns non-200 | 500 | `{ "error": "Greška pri generiranju procjene. Pokušajte ponovo." }` |
| AI response unparseable | 500 | `{ "error": "Greška pri generiranju procjene. Pokušajte ponovo." }` |
| 10s timeout exceeded | 504 | `{ "error": "Procjena traje predugo. Pokušajte ponovo." }` |

English locale error messages:
| Scenario | HTTP Status | Response Body |
|----------|-------------|---------------|
| Rate limit exceeded | 429 | `{ "error": "Too many requests. Please try again in a few minutes." }` |
| Server/AI error | 500 | `{ "error": "Error generating assessment. Please try again." }` |
| Timeout | 504 | `{ "error": "Assessment is taking too long. Please try again." }` |

Note: The rate limiter fires before locale is known from the body, so its 429 message defaults to Croatian. The 500 and 504 errors occur after body parsing, so they can be locale-aware.

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `OPENROUTER_API_KEY` | Yes (production) | -- | API key from openrouter.ai for LLM calls |
| `OPENROUTER_MODEL` | No | `anthropic/claude-haiku-4-5` | Model identifier; change without code deploy |

These must be added to `backend/.env.example` and configured in Digital Ocean App Platform environment settings for production.

### NFR Considerations

- **Availability**: The questionnaire degrades gracefully -- if OpenRouter is unavailable, visitors see a clear error message and can still use the rest of the site. The questionnaire is not a critical path for the business.
- **Latency**: Expected P95 < 4 seconds (dominated by LLM inference). The frontend must show a loading indicator. The 10-second timeout prevents indefinite hangs.
- **Security**: `OPENROUTER_API_KEY` is server-side only, never sent to the browser. User answers are not persisted (no database). Rate limiting prevents abuse. Input validation prevents prompt injection via answer values (answers are constrained to `"a"`, `"b"`, or `"c"` -- no free text reaches the prompt).
- **Observability**: Log OpenRouter response times and status codes (morgan + custom log). Track rate limit hits. In production, monitor the `/api/questionnaire` endpoint latency and error rate.
- **Cost**: At ~$0.001-0.003 per Haiku call, with 3 req/15min/IP rate limiting, cost risk is minimal. A runaway bot hitting from many IPs would be caught by the global API rate limiter (100 req/15min/IP).

### Technical Debt

| Item | Impact | Plan |
|------|--------|------|
| No persistence of questionnaire results | Cannot analyse submission patterns or follow up | Add database storage when CRM integration is built |
| Non-streaming AI response | 1-4s wait with spinner; not the most engaging UX | Consider SSE streaming in v2 if user feedback indicates poor perceived performance |
| Duplicate question text in backend lookup table and frontend UI | Two sources of truth for question/answer copy | Extract to a shared JSON file or API endpoint if the question set changes frequently |

---

## Design System

<!--
This section is owned by @ui-ux-designer.
Other agents: read-only. Do not modify.
-->

> Last design system update: 2026-03-25 (v2 — full redesign)

### Aesthetic Direction

**Theme**: Deep dark. Not generic "dark mode" — a near-black base (`#07090D`) with strong electric teal accent. Feels premium, technical, and alive without being aggressive.

**Typography pairing**:
- Display/headings: **Syne** (geometric, distinctive weight at 600–800) — loaded from Google Fonts
- Body/UI: **DM Sans** (refined, highly legible at small sizes) — loaded from Google Fonts
- Never use Inter, Roboto, or system fonts as primary typeface on this project

**Spatial stance**: Generous negative space. Sections breathe. Content is not cramped.

**Visual texture**: Ambient radial glow orbs (animated, subtle) + dot grid in hero. Gradient border treatment on interactive cards. No gradients on backgrounds — depth comes from layered surfaces.

---

### Color Tokens

All tokens are defined as CSS custom properties in `assets/css/custom.css`.

#### Surface tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--color-surface-base` | `#07090D` | Page background, darkest layer |
| `--color-surface-raised` | `#0D1117` | Sections that sit above base (Services, About, Footer) |
| `--color-surface-overlay` | `#131920` | Cards, panels, overlays |
| `--color-surface-border` | `rgba(255,255,255,0.07)` | Subtle separators, card borders |
| `--color-surface-border-mid` | `rgba(255,255,255,0.12)` | Slightly more prominent borders |

#### Text tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--color-text-primary` | `#F0F4F8` | Headings, primary text — not pure white (softer) |
| `--color-text-secondary` | `#8B97A6` | Body copy, descriptions |
| `--color-text-muted` | `#4A5568` | Timestamps, footnotes, placeholder-level content |

#### Accent tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--color-accent` | `#00D4AA` | Primary accent: CTAs, active states, icons, links |
| `--color-accent-dim` | `#00A886` | Hover variant of accent (slightly darker) |
| `--color-accent-glow` | `rgba(0,212,170,0.18)` | Box-shadow glow on hover; ambient orbs |
| `--color-accent-subtle` | `rgba(0,212,170,0.06)` | Icon container backgrounds, pill backgrounds |
| `--color-accent-2` | `#6366F1` | Secondary accent (indigo) — used for depth in gradients |
| `--color-accent-2-glow` | `rgba(99,102,241,0.15)` | Ambient orb fill for secondary accent |

**Contrast ratios verified (WCAG 2.1 AA):**
- `--color-text-primary` (#F0F4F8) on `--color-surface-base` (#07090D): ~18:1 — passes AAA
- `--color-text-secondary` (#8B97A6) on `--color-surface-overlay` (#131920): ~5.2:1 — passes AA
- `--color-accent` (#00D4AA) on `--color-surface-base` (#07090D): ~9.1:1 — passes AAA
- `#07090D` text on `--color-accent` (#00D4AA) CTA button: ~9.1:1 — passes AAA

---

### Typography Scale

| Class / Token | Font | Size | Weight | Line Height | Usage |
|--------------|------|------|--------|------------|-------|
| Hero H1 | Syne | 44–72px (fluid) | 800 | 1.05 | Single hero headline |
| Section H2 | Syne | 36–52px | 700 | 1.1 | Section headings |
| Card H3 | Syne | 18px | 700 | 1.35 | Card/component headings |
| Process step title | Syne | 17px | 700 | 1.4 | Numbered step labels |
| Body large | DM Sans | 18–20px | 400 | 1.7 | Hero value proposition |
| Body default | DM Sans | 15px | 400 | 1.7 | Card body copy |
| Body small | DM Sans | 14px | 400 | 1.6 | Captions, footnotes |
| Section label | DM Sans | 12px | 600 | — | All-caps category label above H2 |
| UI / nav | DM Sans | 14px | 500–600 | — | Nav links, button labels |
| Monospace (decorative) | system monospace | 12px | 400 | 1.5 | Workflow diagram decoration only |

**Letter-spacing conventions:**
- H1/H2 headings: `-0.02em` (tight, premium)
- Section labels (uppercase): `+0.12em`
- Hero badge (uppercase): `+0.10em`

---

### Spacing System

Base unit: **8px**. All spacing values are multiples of 8 unless a 4px micro-adjustment is needed for optical alignment.

| Token | Value | Typical use |
|-------|-------|------------|
| xs | 4px | Icon-to-label gap, badge padding |
| sm | 8px | Internal component padding small |
| md | 16px | Internal component padding standard |
| lg | 24px | Gap between related items |
| xl | 32px | Card internal padding |
| 2xl | 48px | Section internal spacing |
| 3xl | 64px | — |
| section | 96–128px | Vertical section padding (py-24 / py-32) |

---

### Component Inventory

Legacy reference: original patterns lived in `index.html` + `assets/css/custom.css`. The live app uses React components under `src/components/` with styles in `src/assets/css/custom.css` and Tailwind.

| Component | CSS Class(es) | Status | Notes |
|-----------|--------------|--------|-------|
| Nav CTA button | `.nav-cta` | Stable | Teal fill, dark text, glow on hover |
| Nav link | `.nav-link` | Stable | Underline animation via `::after` pseudo |
| Mobile nav link | `.mobile-nav-link` | Stable | Tap target min 44px height |
| Primary button | `.btn-primary` | Stable | Teal fill, dark text, 44px min touch target |
| Ghost button | `.btn-ghost` | Stable | Border-only, teal on hover |
| Hero badge | `.hero-badge` | Stable | Pill with pulsing dot; status indicator |
| Hero orb | `.hero-orb-1/2/3` | Stable | Animated ambient glows; `prefers-reduced-motion` safe |
| Section label | `.section-label` | Stable | Uppercase teal label with leading line |
| Service card | `.service-card` | Stable | Glassmorphism-adjacent; gradient border on hover |
| Service icon | `.service-icon` | Stable | 48x48 container inside service card |
| Process step | `.process-step` | Stable | Numbered vertical timeline with connector line |
| About highlight card | `.about-highlight-card` | Stable | Small utility cards in 2-col grid |
| About quote | `.about-quote` | Stable | Large decorative quote mark |
| Contact card | `.contact-card` | Stable | Centered, gradient border treatment |
| Contact email link | `.contact-email-link` | Stable | Large tappable email link; glow on hover |
| Scroll reveal | `.reveal` + `.visible` | Stable | JS IntersectionObserver drives `.visible` class |

---

### Interaction Patterns

**Hover states:**
- Cards: `translateY(-4px)` + border brightens to `rgba(0,212,170,0.2)` + gradient border pseudo-element fades in
- Buttons: `translateY(-2px)` + glow shadow
- Nav links: underline slides in left-to-right via `::after` pseudo-element
- Email link: border turns teal + glow + `translateY(-2px)`
- All transitions: `250ms cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo) for position; `150ms ease-in-out` for colors

**Focus states:**
- All focusable elements use `outline: 2px solid var(--color-accent); outline-offset: 3px`
- Never suppressed — the teal outline is visually distinctive against all surfaces

**Scroll reveal:**
- Pattern: `.reveal` class (opacity 0, translateY 24px) + IntersectionObserver adds `.visible` (opacity 1, translateY 0)
- Threshold: 12% element visibility + 40px rootMargin bottom offset
- After paint, a double-`requestAnimationFrame` flush plus `window` `load` re-checks elements already in view (covers browser scroll restoration on refresh mid-page)
- Hook re-runs when `location.pathname` changes so locale switches (`/` ↔ `/en`) attach observers to the new page’s `.reveal` nodes
- Staggered children use `.reveal-delay-1/2/3` (100/200/300ms delay)
- Fully disabled under `prefers-reduced-motion` — elements appear immediately without animation

**Motion budget:**
- Feedback animations (button press): 150ms ease-out
- Card hover transitions: 250ms ease-out-expo
- Scroll reveal: 600ms ease-out-expo
- Ambient hero orbs: 9–15s ease-in-out infinite (non-essential; disabled by `prefers-reduced-motion`)
- Hero badge pulse dot: 2s ease-in-out infinite (non-essential; disabled by `prefers-reduced-motion`)
- No infinite animations play that would distract reading

---

### Section Visual Language

Each section has a distinct surface and separator treatment to create rhythm without borders:

| Section | Surface token | Top separator |
|---------|--------------|---------------|
| Hero | `--color-surface-base` | None |
| Services | `--color-surface-raised` | Gradient line (teal→indigo) |
| Kako radimo | `--color-surface-base` | None (contrast from surface change) |
| O nama | `--color-surface-raised` | Gradient line (indigo→teal) |
| Contact | `--color-surface-base` | None |
| Footer | `--color-surface-raised` | `--color-surface-border` solid |

---

### Accessibility Checklist (v2)

- All interactive elements have min 44x44px touch target (verified on mobile nav, buttons, email link)
- No colour-only status indicators — hero badge uses both dot colour AND text label
- All SVG icons are `aria-hidden="true"` with adjacent visible labels
- Keyboard navigation: tab order follows DOM order (no positive tabindex); nav CTA is last tab stop in header
- Service card links have descriptive `aria-label` attributes (not just "Saznajte više")
- Contact email link has `aria-label` that includes the email address
- `prefers-reduced-motion` wraps all animations in `assets/css/custom.css`
- Scroll reveal falls back gracefully (no JS = elements stay visible at opacity 1 after 600ms timeout is moot — no timeout used, observer fires on first intersection)

---

## Security Architecture

**Authentication model**: [e.g., JWT session tokens stored in httpOnly cookies]

**Authorization**: [e.g., Role-based — roles stored in user table. Middleware checks role on protected routes.]

**Data protection**:
- [e.g., Passwords hashed with bcrypt (cost factor 12)]
- [e.g., PII encrypted at rest using AES-256]

**Key security decisions**: See `docs/technical/DECISIONS.md` for rationale behind auth choices.

---

## Performance Considerations

- [e.g., React Query caches API responses — stale time 5 minutes for reference data]
- [e.g., Images served via CDN with automatic optimization]
- [e.g., Database queries use indexes on all FK columns — see DATABASE.md]

---

## Known Constraints and Technical Debt

| Item | Impact | Plan |
|------|--------|------|
| SPA SEO — no SSR | Crawlers must execute JS for content | Add prerendering (e.g. react-snap) if SEO metrics slip |
| No database | Contact form sends email only; no inquiry persistence | Add SQLite or PostgreSQL when CRM integration needs it |
| Migration from plain HTML | Legacy HTML/CSS ported to React | Intentional tech debt — port section by section, avoid big-bang rewrite |
