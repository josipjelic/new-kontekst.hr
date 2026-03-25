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

> Last updated: 2026-03-25
> Version: 2.0

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

**Pointer-driven motion**: `usePointerMotion` (`src/hooks/usePointerMotion.js`) mounted in `App.jsx` — `pointermove` → refs → one `requestAnimationFrame` loop with lerp; writes `--pointer-nx` / `--pointer-ny` on `:root`. Hero uses parallax wrappers + `.hero-spotlight`; the services section (`Services.jsx`) uses `useServiceCardTilt` for hover-scoped `--tilt-*` on `article.service-card`. Disabled for `prefers-reduced-motion`, coarse pointer, or `hover: none`. Spec and backlog for P3–P6: [`docs/technical/POINTER_MOTION_HANDOVER.md`](POINTER_MOTION_HANDOVER.md).

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
