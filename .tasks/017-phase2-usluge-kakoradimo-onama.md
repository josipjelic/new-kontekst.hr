---
id: "017"
title: "Phase 2c — Migrate Usluge, Kako radimo, and O nama sections to React"
status: "done"
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

Migrate three content sections from `index.html` to individual React components:

1. **Usluge** (Services) → `src/components/sections/Usluge.jsx`
2. **Kako radimo** (How we work) → `src/components/sections/KakoRadimo.jsx`
3. **O nama** (About us) → `src/components/sections/ONama.jsx`

These three sections share a dependency (scaffold + Tailwind) and have no interdependencies with each other, so they are grouped into one task for efficiency. Each is a self-contained presentational component with no state.

## Acceptance Criteria

**Usluge.jsx**
- [x] `src/components/sections/Usluge.jsx` created
- [x] Renders `<section id="usluge">` with all three service cards (n8n, automatizacija procesa, AI — kao u HTML-u)
- [x] Each card uses `.service-card` and `.service-icon` classes
- [x] Cards use `.reveal` + `.reveal-delay-1/2/3` for staggered scroll reveal
- [x] Section label (`.section-label`), H2, and description paragraph present
- [x] Gradient top separator present (matches ARCHITECTURE.md section visual language table)

**KakoRadimo.jsx**
- [x] `src/components/sections/KakoRadimo.jsx` created
- [x] Renders `<section id="kako-radimo">` with all numbered process steps
- [x] Each step uses `.process-step` class with connector line
- [x] Step numbers, titles, and descriptions match the current HTML content exactly
- [x] `.reveal` classes applied to each step

**ONama.jsx**
- [x] `src/components/sections/ONama.jsx` created
- [x] Renders `<section id="o-nama">` with mission text, stat highlight cards (`.about-highlight-card`), and decorative quote (`.about-quote`)
- [x] All content (mission copy, stats, quote text) matches the current HTML exactly
- [x] `.reveal` classes applied appropriately

**Common**
- [x] All three components imported and rendered in `src/pages/Home.jsx` in correct DOM order: Usluge → Kako radimo → O nama
- [x] No hardcoded inline styles — all styling via Tailwind utilities and existing CSS classes
- [x] Visual output of each section matches the current HTML on desktop and mobile

## Technical Notes

These are purely presentational components — no props, no state, no side effects. They render static content identical to the current HTML.

If any content is repeated (e.g., service card structure), a reusable `src/components/ui/ServiceCard.jsx` or `ProcessStep.jsx` sub-component can be extracted, but only if it genuinely reduces repetition. Do not over-componentise.

Croatian copy must be preserved exactly — do not alter any text content during migration.

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-25 | human | Task created as part of migration plan |
| 2026-03-25 | @frontend-developer | Usluge, KakoRadimo, ONama; privremeno `visible` uz `reveal` do #020 |
