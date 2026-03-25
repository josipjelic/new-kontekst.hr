---
id: "001"
title: "HTML boilerplate, Tailwind setup, and navigation header"
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

Establish the base HTML structure for the whole page. This was the foundation task for the original plain-HTML implementation — later sections depended on it. It included: HTML5 boilerplate with correct meta tags, Tailwind CDN, asset folders, and a sticky navigation header.

Navigation had to be responsive — desktop shows horizontal anchor links; mobile shows a hamburger that opens a vertical menu.

## Acceptance Criteria

- [ ] `index.html` exists with valid HTML5 doctype and `<html lang="hr">`
- [ ] Tailwind CSS loaded via CDN in `<head>`
- [ ] Semantic shell: `<header>`, `<main>`, `<footer>`
- [ ] All sections have placeholder `<section id="...">` blocks (hero, services, how-we-work, about, contact)
- [ ] Sticky `<header>` with logo (`logo-light.svg`) and nav links
- [ ] Nav links are anchors to sections (`#usluge`, `#kako-radimo`, `#o-nama`, `#kontakt`)
- [ ] Hamburger menu works on mobile (vanilla JS toggle)
- [ ] Smooth scroll (CSS `scroll-behavior: smooth` or JS)
- [ ] Base colour scheme: dark background (#212529), light text
- [ ] `assets/css/custom.css` and `assets/js/main.js` created and linked
- [ ] Page renders correctly at 320px, 768px, and 1280px

## Technical Notes

- Tailwind CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Optional Tailwind config block in `<script>` for palette customisation
- `assets/js/main.js`: hamburger toggle, smooth scroll, optional sticky-header class on scroll
- Logo: `<img src="logo-light.svg" alt="Kontekst.hr logo">`
- Single `<h1>` for the page — belongs in the Hero section, not the nav

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-25 | human | Task created |
