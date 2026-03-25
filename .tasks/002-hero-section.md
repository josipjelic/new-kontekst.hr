---
id: "002"
title: "Hero sekcija s futurističkim dizajnom i CTA"
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

Implementiraj Hero sekciju — prva stvar koju posjetitelj vidi. Mora odmah komunicirati što Kontekst.hr radi i pozvati posjetitelja na akciju. Vizualni stil mora biti futuristički: tamna pozadina, geometrijski pattern ili grid u pozadini, gradient accenti, čista tipografija.

Sadržaj: naziv tvrtke, tagline "Poslovne automatizacije", kratka value proposition (1–2 rečenice o benefitima), i CTA gumb koji vodi na #kontakt sekciju.

## Acceptance Criteria

- [x] `<h1>` sadrži "Kontekst.hr" ili ekvivalentni brand headline
- [x] Tagline "Poslovne automatizacije" jasno vidljiv
- [x] Value proposition (1–2 rečenice) na hrvatskom, fokusirana na benefit za klijenta
- [x] CTA gumb s tekstom poput "Razgovarajmo" ili "Kontaktirajte nas" koji scrolla na #kontakt
- [x] Futuristički vizualni stil: tamna pozadina, geometrijski/grid pattern ili CSS efekti
- [x] Sekcija je full-height ili najmanje 80vh
- [x] Responzivna na svim breakpointima (320px – 1920px)
- [x] Tipografija je čitljiva s dovoljnim kontrastom (WCAG 4.5:1)

## Technical Notes

- Futuristički feel može se postići CSS-om: `background-image` s repeating grid patternom, ili subtle radial gradient
- Animacija: opcionalno fade-in na load (CSS `@keyframes` ili Tailwind `animate-fade`)
- CTA gumb: hover state s promjenom boje, cursor pointer
- Value proposition prijedlog: "Automatiziramo procese koji vam oduzimaju vrijeme. Vi se fokusirate na rast poslovanja."
- `<section id="hero">` — anchor za nav link "Početna" ako se doda

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-25 | human | Task created |
| 2026-03-25 | @frontend-developer | Implemented: grid background, radial glow, h1, tagline, value proposition, CTA, fadeInUp animation |
