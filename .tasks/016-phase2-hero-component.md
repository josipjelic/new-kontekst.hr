---
id: "016"
title: "Phase 2b — Migrate Hero section to React"
status: "todo"
area: "frontend"
agent: "@frontend-developer"
priority: "high"
created_at: "2026-03-25"
due_date: null
started_at: null
completed_at: null
prd_refs: []
blocks: ["020"]
blocked_by: ["009", "010", "011"]
---

## Description

Migrate the Hero section from `index.html` to `src/components/sections/Hero.jsx`. The Hero section is the first visible section of the page and includes the animated badge, headline, sub-copy, CTA buttons, and animated ambient orb elements.

## Acceptance Criteria

- [ ] `src/components/sections/Hero.jsx` created
- [ ] Renders `<section id="pocetna">` (or the existing ID from `index.html`) with all current content:
  - Hero badge (`.hero-badge`) with pulsing dot and text
  - H1 headline with teal accent span
  - Sub-headline/value proposition paragraph
  - Primary CTA button (`.btn-primary`) — smooth scroll to `#kontakt`
  - Secondary ghost button (`.btn-ghost`) — smooth scroll to `#usluge`
  - Three ambient orb elements (`.hero-orb-1`, `.hero-orb-2`, `.hero-orb-3`)
  - Dot grid decorative background element
- [ ] All CSS classes from `custom.css` preserved exactly (`.hero-badge`, `.hero-orb-1/2/3`, etc.)
- [ ] Scroll reveal class `.reveal` applied to animatable elements
- [ ] `prefers-reduced-motion` behaviour intact (handled by CSS, no JS change needed)
- [ ] Visual output matches the current HTML hero section exactly on desktop and mobile
- [ ] Section is imported and rendered in `src/pages/Home.jsx`

## Technical Notes

The hero orb animations are defined in `custom.css` as `@keyframes` — they are purely CSS and require no React state.

The `.reveal` + `.visible` scroll reveal system is driven by an IntersectionObserver (currently in `index.html` as vanilla JS). This observer must be migrated in task #020 (scroll reveal + mobile nav JS). For now, apply the `.reveal` class to elements — they will be invisible until #020 is done. To avoid a broken-looking hero during development, temporarily add `.visible` statically in dev and remove before final review.

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-25 | human | Task created as part of migration plan |
