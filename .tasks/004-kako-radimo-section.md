---
id: "004"
title: "Sekcija Kako radimo — proces u koracima"
status: "todo"
area: "frontend"
agent: "@frontend-developer"
priority: "normal"
created_at: "2026-03-25"
due_date: null
started_at: null
completed_at: null
prd_refs: ["FR-030", "FR-031", "FR-032"]
blocks: []
blocked_by: ["001"]
---

## Description

Implementiraj sekciju "Kako radimo" koja objašnjava metodologiju rada Kontekst.hr u numeriranim koracima. Cilj je izgraditi povjerenje potencijalnih klijenata prikazujući strukturiran i profesionalan pristup. Vizualni prikaz treba biti timeline ili numbered steps layout.

Predloženi koraci (5):
1. **Analiza** — Razgovor o vašim procesima i identifikacija mjesta za automatizaciju
2. **Prijedlog** — Izrađujemo konkretni plan s procjenom uštede vremena i troškova
3. **Razvoj** — Implementiramo rješenje uz redovite provjere s vama
4. **Testiranje** — Temeljito testiramo svaki workflow prije puštanja u produkciju
5. **Podrška** — Pratimo rad rješenja i prilagođavamo ga po potrebi

## Acceptance Criteria

- [ ] `<section id="kako-radimo">` s naslovom "Kako radimo"
- [ ] 4–5 koraka prikazano kao numeriran timeline ili step layout
- [ ] Svaki korak ima broj, naziv i kratki opis na hrvatskom
- [ ] Vizualni konektor između koraka (linija, strelice, ili stepper dots)
- [ ] Responzivno: vertikalni timeline na mobitelu, horizontalni ili grid na desktopu
- [ ] Stil konzistentan s ostatkom stranice

## Technical Notes

- Koristiti `<ol>` ili divovi s `counter-reset`/`counter-increment` CSS counter-ima za numeraciju
- Vizualni stil: numeracija u kružnicama, tanke connecting linije
- `<h2>` za naslov sekcije, `<h3>` ili `<strong>` za nazive koraka

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-25 | human | Task created |
