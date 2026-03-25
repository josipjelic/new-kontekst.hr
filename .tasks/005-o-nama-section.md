---
id: "005"
title: "About (O nama) section"
status: "done"
area: "frontend"
agent: "@frontend-developer"
priority: "normal"
created_at: "2026-03-25"
due_date: null
started_at: null
completed_at: "2026-03-25"
prd_refs: ["FR-040", "FR-041", "FR-042"]
blocks: []
blocked_by: ["001"]
---

## Description

Implement “O nama” describing mission, values, and expertise. Goal: humanise the brand and build trust. Copy must be authentic and specific — not generic corporate filler.

Kontekst.hr combines technical depth (n8n, AI) with understanding of business processes, focusing on practical, measurable outcomes.

## Acceptance Criteria

- [ ] `<section id="o-nama">` titled “O nama”
- [ ] Paragraph(s) on mission and differentiation
- [ ] Key values or differentiators (3–4 items) clearly highlighted
- [ ] Tone professional but approachable — not stiff corporate
- [ ] **Croatian** copy
- [ ] Visual break in long text (icons, stats, or quote block)
- [ ] Responsive layout

## Technical Notes

- Example mission (Croatian): “Kontekst.hr nastao je iz uvjerenja da svaka tvrtka zaslužuje pristup alatima koji su nekad bili dostupni samo velikim korporacijama. Automatizacijom i AI-em demokratiziramo efikasnost.”
- Differentiators: n8n specialisation, hands-on approach, measurable results, post-launch support
- If real stats exist (clients, projects, hours saved), use them; else placeholder `[TBD]`
- `<h2>` for section title

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-25 | human | Task created |
| 2026-03-25 | @frontend-developer | Implemented: mission copy, 4 differentiator cards, stats row, quote block; design tokens + scroll reveal |
