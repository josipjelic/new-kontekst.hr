---
id: "006"
title: "Contact section and footer"
status: "done"
area: "frontend"
agent: "@frontend-developer"
priority: "normal"
created_at: "2026-03-25"
due_date: null
started_at: "2026-03-25"
completed_at: "2026-03-25"
prd_refs: ["FR-050", "FR-051", "FR-052", "FR-070", "FR-071"]
blocks: []
blocked_by: ["001"]
---

## Description

Implement the Contact section and `<footer>`. Contact must show how to reach the company — primarily `info@kontekst.hr` with a `mailto` link. Footer: copyright, email, section anchors.

Note: PRD Q1 discussed server-side email; v1 originally allowed mailto-only. The React migration added a live form + API (see tasks #014, #019).

## Acceptance Criteria

- [x] `<section id="kontakt">` titled “Kontakt” or “Stupite u kontakt”
- [x] Email `info@kontekst.hr` visible and clickable `<a href="mailto:info@kontekst.hr">`
- [x] CTA encouraging action (e.g. Croatian: “Imate projekt na umu? Javite nam se.”)
- [x] `<footer>` with copyright “© 2026 Kontekst.hr — Sva prava pridržana”
- [x] Footer includes anchor links to sections
- [x] Footer includes email
- [x] Contact section visually distinct from previous sections
- [x] Responsive layout

## Technical Notes

- Mailto: `<a href="mailto:info@kontekst.hr">info@kontekst.hr</a>`
- Contact section can use generous padding and a CTA-forward layout
- Footer: dark background, small type; horizontal links on desktop, stacked on mobile
- Optional third-party form services (e.g. Formspree) if ever needed without a backend

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-25 | human | Task created |
| 2026-03-25 | @frontend-developer | Verified `index.html` implementation; footer kontakt link; copyright em-dash; criteria met |
