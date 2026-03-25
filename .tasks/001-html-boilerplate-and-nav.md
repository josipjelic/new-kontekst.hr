---
id: "001"
title: "HTML boilerplate, Tailwind setup, i navigacijski header"
status: "todo"
area: "frontend"
agent: "@frontend-developer"
priority: "high"
created_at: "2026-03-25"
due_date: null
started_at: null
completed_at: null
prd_refs: ["FR-001", "FR-002", "FR-003", "FR-004", "FR-060", "FR-066", "FR-067"]
blocks: ["002", "003", "004", "005", "006", "007"]
blocked_by: []
---

## Description

Postavi temeljnu HTML strukturu za cijelu stranicu. Ovo je task #0 za implementaciju — sve ostale sekcije dependaju na ovom. Uključuje: HTML5 boilerplate s ispravnim meta tagovima, Tailwind CSS CDN integraciju, strukturu foldera za assets, i navigacijski header koji je fiksan pri scrollu.

Navigacija mora biti responzivna — desktop prikazuje horizontalne anchor linkove, mobilni prikazuje hamburger ikonu koja otvara vertikalni izbornik.

## Acceptance Criteria

- [ ] `index.html` postoji s ispravnim HTML5 doctype i `<html lang="hr">` atributom
- [ ] Tailwind CSS učitan via CDN u `<head>`
- [ ] Semantička struktura: `<header>`, `<main>`, `<footer>` elementi postoje
- [ ] Sve sekcije imaju placeholder `<section id="...">` blokove (hero, usluge, kako-radimo, o-nama, kontakt)
- [ ] Fiksni `<header>` s logotipom (`logo-light.svg`) i nav linkovima
- [ ] Nav linkovi su anchor linkovi na sekcije (`#usluge`, `#kako-radimo`, `#o-nama`, `#kontakt`)
- [ ] Hamburger menu radi na mobilnim uređajima (toggle via vanilla JS)
- [ ] Glatki scroll (CSS `scroll-behavior: smooth` ili JS)
- [ ] Temeljni color scheme primijenjen: tamna pozadina (#212529), bijeli tekst
- [ ] `assets/css/custom.css` i `assets/js/main.js` fileovi kreirani i linkani
- [ ] Stranica se ispravno prikazuje na 320px, 768px i 1280px

## Technical Notes

- Tailwind CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Tailwind config blok u `<script>` za custom boje iz palete (F8F9FA → 212529)
- `assets/js/main.js` treba samo: hamburger toggle, smooth scroll, sticky header klasa pri scrollu
- Logo: `<img src="logo-light.svg" alt="Kontekst.hr logo">` — ne `<img src="logo-light.svg" alt="">`
- Jedan `<h1>` cijele stranice — bit će u Hero sekciji, ne u nav-u

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-25 | human | Task created |
