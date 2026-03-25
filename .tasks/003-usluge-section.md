---
id: "003"
title: "Services (Usluge) section — three service cards"
status: "done"
area: "frontend"
agent: "@frontend-developer"
priority: "high"
created_at: "2026-03-25"
due_date: null
started_at: "2026-03-25"
completed_at: "2026-03-25"
prd_refs: ["FR-020", "FR-021", "FR-022"]
blocks: []
blocked_by: ["001"]
---

## Description

Implement the “Usluge” section with three core services. Each service is a clear card with icon, title, and short **Croatian** copy from the client’s benefit perspective (not low-level technical detail).

Three services:
1. **n8n workflow automation** — recurring processes between tools
2. **Business process automation** — broader automation and workflow optimisation
3. **AI applications** — tailored AI solutions for specific business needs

## Acceptance Criteria

- [x] `<section id="usluge">` with section title “Usluge” (or “Naše usluge”)
- [x] Three cards, each with: SVG (or inline SVG) icon, title, description (3–4 sentences)
- [x] Descriptions client-benefit focused, in **Croatian**
- [x] Grid: 1 column mobile, 3 columns desktop
- [x] Cards have hover treatment (border, background, or shadow)
- [x] Visual style consistent with Hero (dark palette)
- [x] Section visually distinct from hero (different surface tone)

## Technical Notes

- Icons: Heroicons / Lucide inline SVG, or Unicode symbols if SVG is impractical
- Example n8n blurb (Croatian): “Povežite vaše poslovne alate i automatizirajte tokove podataka bez pisanja koda. n8n workflowovi rade za vas 24/7.”
- Example automation blurb: “Identificiramo i eliminiramo ručne, ponavljajuće zadatke u vašem poslovanju. Više vremena za ono što stvarno donosi vrijednost.”
- Example AI blurb: “Razvijamo AI aplikacije prilagođene točno vašim poslovnim procesima — od chatbotova do inteligentnih analitičkih alata.”
- Use `<h2>` for section title, `<h3>` for service titles

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-25 | human | Task created |
| 2026-03-25 | @frontend-developer | Implemented: 3 cards with inline SVG icons, hover effects, responsive grid |
