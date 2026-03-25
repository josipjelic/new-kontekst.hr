# Kontekst.hr — Claude Instructions

> Stack: Plain HTML · Tailwind CSS (CDN) · Digital Ocean App Platform
> Last updated: 2026-03-25

## Project Context

Kontekst.hr je stranica tvrtke koja se bavi poslovnim automatizacijama, n8n workflowima i razvojem AI aplikacija. Ciljna skupina su vlasnici tvrtki koji žele optimizirati i automatizirati svoje poslovanje. Stranica je marketinška prezentacija usluga tvrtke, optimizirana za SEO na hrvatskom jeziku.

**Tech stack summary**: Plain HTML · Tailwind CSS via CDN · No backend · No database · Digital Ocean App Platform

---

## Agents Available

Delegate to specialist agents for focused work. Claude selects them automatically based on context.

| Agent | Role | Invoke when... |
|-------|------|----------------|
| `project-manager` | Backlog & coordination | "What's next?", sprint planning, breaking down features, reprioritizing |
| `systems-architect` | Architecture & ADRs | New feature design, tech decisions, system integration |
| `frontend-developer` | UI implementation | HTML structure, Tailwind styling, sections, animations |
| `ui-ux-designer` | UX & design system | Layout, visual hierarchy, futuristic design elements, accessibility |
| `qa-engineer` | Testing | Cross-browser testing, responsiveness checks, accessibility audit |
| `documentation-writer` | Living docs | User guide updates, post-feature documentation |
| `cicd-engineer` | CI/CD & deployment | Digital Ocean App Platform config, GitHub Actions |

---

## Critical Rules

These apply to all agents at all times. No exceptions without explicit human instruction.

1. **PRD.md is read-only.** Never modify it. Read it to understand requirements.
2. **TODO.md is the living backlog.** Agents may add items, mark items complete, and move items to "Completed". Preserve section order and existing item priority — do not reorder items within a section unless explicitly asked to reprioritize.
3. **All commits use Conventional Commits format** (see Git Conventions below).
4. **Update the relevant `docs/` file** after every significant change before marking a task complete.
5. **Never hardcode secrets, credentials, or environment-specific values** in source code.
6. **Consult `docs/technical/DECISIONS.md`** before proposing changes that may conflict with prior architectural decisions.
7. **All content is in Croatian** unless explicitly instructed otherwise.
8. **All HTML must be SEO-optimized** — meta tags, structured data, alt text, semantic elements.

---

## Project Structure

```
kontekst.hr/
  index.html              # Main (and only) HTML page
  assets/
    css/                  # Custom CSS overrides (if needed beyond Tailwind)
    js/                   # Custom JavaScript (minimal, for interactions)
    images/               # Images, icons, illustrations
  logo-light.svg          # Company logo (white version)
docs/
  user/USER_GUIDE.md
  technical/              # Architecture, decisions
.claude/agents/           # Specialist agent definitions
.tasks/                   # Detailed task files
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
```

### PR Requirements
- PR title follows Conventional Commits format
- Fill out `.github/PULL_REQUEST_TEMPLATE.md` completely
- At least one reviewer required before merge
- All CI checks must pass

---

## Code Style

- **Language**: HTML5 + vanilla JavaScript (ES6+) where needed
- **Styling**: Tailwind CSS via CDN — utility-first, no custom build step
- **Custom CSS**: Only when Tailwind utilities are insufficient — in `assets/css/custom.css`
- **JavaScript**: Minimal — only for mobile nav toggle, scroll behaviour, and micro-interactions
- **No `console.log`** in production code
- **No commented-out code** committed
- **Semantic HTML**: Use appropriate elements (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- **Accessibility**: All images need `alt` attributes, all interactive elements need labels

---

## Design Guidelines

- **Palette**: Based on provided greyscale scheme — dark backgrounds (#212529, #343a40) with light text (#f8f9fa, #e9ecef)
- **Feel**: Futuristic, clean, technical — geometric shapes, subtle grid patterns, gradient accents
- **Typography**: System font stack or Google Fonts (Inter or similar sans-serif)
- **Language**: Croatian throughout
- **Sections**: Hero, Usluge, Kako radimo, O nama, Kontakt

---

## SEO Requirements

- Croatian-language title tags and meta descriptions
- Open Graph tags for social sharing
- JSON-LD structured data for the business
- Target keywords: "automatizacija poslovanja", "n8n Hrvatska", "AI aplikacije za poslovanje", "poslovne automatizacije"
- Semantic HTML headings hierarchy (one `<h1>` per page)

---

## Environment & Commands

- **No build step** — plain HTML with Tailwind CDN
- **Local dev**: Open `index.html` directly in browser, or use VS Code Live Server extension
- **Deploy**: Push to `main` branch → Digital Ocean App Platform auto-deploys

---

## Key Documentation

@docs/technical/ARCHITECTURE.md
@docs/technical/DECISIONS.md
@docs/user/USER_GUIDE.md
