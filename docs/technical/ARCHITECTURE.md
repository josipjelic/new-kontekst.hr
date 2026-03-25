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
> Version: 1.0

---

## Overview

Kontekst.hr je statična single-page marketinška web stranica. Nema backend-a, nema baze podataka, nema build procesa. Stranica se sastoji od jednog `index.html` filea s Tailwind CSS-om učitanim putem CDN-a i minimalnim vanilla JavaScript kodom za interakcije.

Hosting je na Digital Ocean App Platform koji servira statičke fileove direktno. Deploy se odvija automatski pri svakom pushu na `main` granu.

```
[Posjetitelj (Browser)]
        │
        ▼
[Digital Ocean App Platform]
  (serves static files)
        │
        ▼
[index.html + Tailwind CDN + assets/]
```

---

## Tech Stack

| Layer | Technology | Version | Why Chosen |
|-------|-----------|---------|------------|
| Frontend | Plain HTML5 | - | Maksimalna jednostavnost, nema ovisnosti, brzo učitavanje |
| Styling | Tailwind CSS (CDN) | 3.x | Utility-first, bez build stepa, brza iteracija |
| JavaScript | Vanilla JS (ES6+) | - | Minimalni JS za nav i micro-interakcije, nema frameworka |
| Hosting | Digital Ocean App Platform | - | Jednostavan deploy iz Gita, dobra dostupnost |
| Version Control | Git / GitHub | - | Standard |

---

## System Components

### Frontend Architecture

[Describe the frontend component hierarchy, routing approach, and state management strategy.]

**Routing**: [e.g., Next.js App Router — pages defined in `src/app/`]

**State management**: [e.g., React Query for server state, Zustand for client state]

**Component structure**:
```
src/components/
  ui/           # Primitive UI elements (Button, Input, Modal, etc.)
  features/     # Feature-specific composite components
  layouts/      # Page layout wrappers
```

**Data fetching pattern**: [e.g., Server Components for initial data, React Query for client-side mutations]

---

### Backend Architecture

[Describe the server-side structure — routing, middleware, service layers, and key patterns.]

**API style**: [e.g., REST, route handlers in Next.js `src/app/api/`]

**Middleware stack**:
1. [e.g., Authentication — validates JWT/session on protected routes]
2. [e.g., Request validation — validates body against Zod schemas]
3. [e.g., Error handler — formats errors before sending to client]

**Service layer pattern**: [How business logic is organized — e.g., thin controllers, service files in `src/lib/services/`]

---

### Infrastructure

**Environments**:
| Environment | URL | Branch | Notes |
|-------------|-----|--------|-------|
| Production | https://kontekst.hr (TBD) | `main` | Auto-deploys on push |
| Local | `file:///` ili Live Server | any | Otvori index.html direktno u browseru |

**CI/CD**: Push na `main` → Digital Ocean App Platform automatski deploya statičke fileove. Nema test pipeline-a za v1 (statična stranica).

---

## Data Flow

### [Key Flow 1: e.g., User Authentication]

```
1. User submits credentials
2. [Auth handler] validates input
3. [Auth service] checks credentials against database
4. On success: session token created and stored
5. Client receives session cookie
6. Subsequent requests include cookie — middleware validates on each request
```

### [Key Flow 2: e.g., Main Feature Flow]

```
[Describe the data flow for the core feature]
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
| `--color-surface-raised` | `#0D1117` | Sections that sit above base (Usluge, About, Footer) |
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

All components live in `index.html` as inline HTML patterns + CSS classes in `assets/css/custom.css`.

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
| Usluge | `--color-surface-raised` | Gradient line (teal→indigo) |
| Kako radimo | `--color-surface-base` | None (contrast from surface change) |
| O nama | `--color-surface-raised` | Gradient line (indigo→teal) |
| Kontakt | `--color-surface-base` | None |
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
| [e.g., No background job queue yet] | [Scheduled tasks run inline] | [Planned: add BullMQ in v2] |
| [Tech debt item] | [Impact] | [Resolution plan] |
