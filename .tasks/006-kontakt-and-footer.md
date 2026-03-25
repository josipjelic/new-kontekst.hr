---
id: "006"
title: "Sekcija Kontakt i footer"
status: "todo"
area: "frontend"
agent: "@frontend-developer"
priority: "normal"
created_at: "2026-03-25"
due_date: null
started_at: null
completed_at: null
prd_refs: ["FR-050", "FR-051", "FR-052", "FR-070", "FR-071"]
blocks: []
blocked_by: ["001"]
---

## Description

Implementiraj sekciju Kontakt i `<footer>`. Sekcija Kontakt mora jasno prikazati kako posjetitelji mogu stupiti u kontakt — primarno email adresa info@kontekst.hr s mailto linkom. Footer sadrži copyright, email i navigacijske linkove.

Napomena: Contact form koji šalje emailove je open question (vidi PRD Q1) — za v1 je dovoljan mailto link i CTA tekst.

## Acceptance Criteria

- [ ] `<section id="kontakt">` s naslovom "Kontakt" ili "Stupite u kontakt"
- [ ] Email adresa `info@kontekst.hr` prikazana i klikabilna kao `<a href="mailto:info@kontekst.hr">`
- [ ] CTA tekst koji potiče na akciju (npr. "Imate projekt na umu? Javite nam se.")
- [ ] `<footer>` s copyright tekstom "© 2026 Kontekst.hr — Sva prava pridržana"
- [ ] Footer sadrži navigacijske anchor linkove na sekcije
- [ ] Footer sadrži email adresu
- [ ] Vizualno jasna distinkcija kontakt sekcije od prethodnih sekcija
- [ ] Responzivno

## Technical Notes

- Mailto link: `<a href="mailto:info@kontekst.hr">info@kontekst.hr</a>`
- Kontakt sekcija može imati veći padding i CTA-heavy layout (veći font, prominentan email)
- Footer: tamna pozadina (#212529), mali tekst, horizontalni linkovi na desktopu, vertikalni na mobitelu
- Ako se odlučimo za contact form u budućnosti, razmotriti Formspree (besplatan tier, no backend needed)

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-25 | human | Task created |
