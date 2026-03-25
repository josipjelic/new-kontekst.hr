---
id: "002"
title: "Hero section with futuristic design and CTA"
status: "done"
area: "frontend"
agent: "@frontend-developer"
priority: "high"
created_at: "2026-03-25"
due_date: null
started_at: "2026-03-25"
completed_at: "2026-03-25"
prd_refs: ["FR-010", "FR-011", "FR-012", "FR-013"]
blocks: []
blocked_by: ["001"]
---

## Description

Implement the Hero section — the first thing visitors see. It must immediately explain what Kontekst.hr does and invite action. Visual style: futuristic — dark background, geometric or grid pattern, gradient accents, clean typography.

Content: company name, tagline “Poslovne automatizacije”, short value proposition (1–2 benefit-focused sentences in **Croatian**), and a CTA button scrolling to `#kontakt`.

## Acceptance Criteria

- [x] `<h1>` contains “Kontekst.hr” or equivalent brand headline
- [x] Tagline “Poslovne automatizacije” clearly visible
- [x] Value proposition (1–2 sentences) in **Croatian**, client-benefit focused
- [x] CTA (e.g. “Razgovarajmo” / “Kontaktirajte nas”) scrolls to `#kontakt`
- [x] Futuristic look: dark background, grid/geometric pattern or CSS effects
- [x] Section full-height or at least 80vh
- [x] Responsive from 320px to 1920px
- [x] Typography readable with sufficient contrast (WCAG 4.5:1)

## Technical Notes

- Futuristic feel via CSS: `background-image` with repeating grid, or subtle radial gradients
- Optional load animation: CSS `@keyframes` or Tailwind `animate-*`
- CTA: hover state, pointer cursor
- Example value proposition (Croatian): “Automatiziramo procese koji vam oduzimaju vrijeme. Vi se fokusirate na rast poslovanja.”
- `<section id="hero">` — optional anchor for a “Početna” nav link

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-25 | human | Task created |
| 2026-03-25 | @frontend-developer | Implemented: grid background, radial glow, h1, tagline, value proposition, CTA, fadeInUp animation |
