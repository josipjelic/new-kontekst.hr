---
id: "004"
title: "How we work (Kako radimo) — step-by-step process"
status: "done"
area: "frontend"
agent: "@frontend-developer"
priority: "normal"
created_at: "2026-03-25"
due_date: null
started_at: "2026-03-25"
completed_at: "2026-03-25"
prd_refs: ["FR-030", "FR-031", "FR-032"]
blocks: []
blocked_by: ["001"]
---

## Description

Implement “Kako radimo” explaining Kontekst.hr’s methodology in numbered steps. Goal: build trust with a structured, professional approach. Layout: timeline or numbered steps.

Suggested five steps (titles and copy in **Croatian** on the live site):
1. **Analiza** — Discuss your processes and find automation opportunities
2. **Prijedlog** — Concrete plan with time/cost estimate
3. **Razvoj** — Build the solution with regular check-ins
4. **Testiranje** — Thoroughly test each workflow before go-live
5. **Podrška** — Monitor and adjust as needed

## Acceptance Criteria

- [x] `<section id="kako-radimo">` titled “Kako radimo”
- [x] Five steps as a vertical numbered timeline
- [x] Each step: number, title, short **Croatian** description
- [x] Visual connector between steps (e.g. `.process-step-connector`)
- [x] Responsive: vertical timeline on mobile; optional two-column layout on desktop
- [x] Style aligned with design system v2 (Syne/DM Sans, teal accents)

## Technical Notes

- Prefer semantic `<ol>` or CSS counters for numbering
- Visual style: numbers in circles, thin connecting lines
- `<h2>` for section title; `<h3>` or `<strong>` for step titles

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-25 | human | Task created |
| 2026-03-25 | @frontend-developer | Started implementation |
| 2026-03-25 | @frontend-developer | Completed — `index.html`: semantic `<ol>` with 5 steps (Analiza, Prijedlog, Razvoj, Testiranje, Podrška); scroll reveal; `.process-step` styles |
