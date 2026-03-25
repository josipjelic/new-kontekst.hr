---
id: "003"
title: "Sekcija Usluge — 3 kartice usluga"
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

Implementiraj sekciju "Usluge" koja prikazuje tri core usluge tvrtke. Svaka usluga treba biti vizualno jasna kartica s ikonom, nazivom i kratkim opisom napisanim iz perspektive benefita za klijenta (ne tehničkih detalja).

Tri usluge:
1. **n8n Workflow Automatizacije** — automatizacija ponavljajućih procesa između alata
2. **Automatizacija poslovnih procesa** — šire poslovne automatizacije, optimizacija tijekova rada
3. **AI Aplikacije** — razvoj prilagođenih AI rješenja za specifične poslovne potrebe

## Acceptance Criteria

- [x] `<section id="usluge">` s naslovom sekcije "Usluge" (ili "Naše usluge")
- [x] 3 kartice, svaka s: SVG ikonom (ili inline SVG), naslovom usluge, opisom (3–4 rečenice)
- [x] Opisi fokusirani na korist za klijenta, pisani na hrvatskom
- [x] Grid layout: 1 stupac na mobitelu, 3 stupca na desktopu
- [x] Kartice imaju hover efekt (border, background promjena, ili shadow)
- [x] Vizualni stil konzistentan s Hero sekcijom (tamna paleta)
- [x] Sekcija ima vizualnu distinkciju od hero-a (drugačija nijansa pozadine)

## Technical Notes

- Ikone: Heroicons ili Lucide Icons (inline SVG za no-dependency pristup), ili ASCII/Unicode simboli ako je ikone teško inkorporirati
- Opis za n8n: "Povežite vaše poslovne alate i automatizirajte tokove podataka bez pisanja koda. n8n workflowovi rade za vas 24/7."
- Opis za automatizaciju: "Identificiramo i eliminiramo ručne, ponavljajuće zadatke u vašem poslovanju. Više vremena za ono što stvarno donosi vrijednost."
- Opis za AI: "Razvijamo AI aplikacije prilagođene točno vašim poslovnim procesima — od chatbotova do inteligentnih analitičkih alata."
- Koristiti `<h2>` za naslov sekcije, `<h3>` za nazive usluga

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-25 | human | Task created |
| 2026-03-25 | @frontend-developer | Implemented: 3 cards with inline SVG icons, hover effects, responsive grid |
