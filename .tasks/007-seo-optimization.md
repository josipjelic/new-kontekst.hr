---
id: "007"
title: "SEO optimizacija: meta tagovi, Open Graph, JSON-LD structured data"
status: "todo"
area: "frontend"
agent: "@frontend-developer"
priority: "normal"
created_at: "2026-03-25"
due_date: null
started_at: null
completed_at: null
prd_refs: ["FR-060", "FR-061", "FR-062", "FR-063", "FR-064", "FR-065", "FR-066", "FR-067"]
blocks: []
blocked_by: ["001", "002", "003", "004", "005", "006"]
---

## Description

Kad su sve sekcije implementirane, provesti SEO audit i dodati sve potrebne meta tagove, Open Graph tagove, structured data i sitemap. Ovo je finalni polish korak koji osigurava da stranica pravilno komunicira s pretraživačima i društvenim mrežama.

## Acceptance Criteria

- [ ] `<title>` tag: "Kontekst.hr — Poslovne automatizacije, n8n i AI aplikacije u Hrvatskoj"
- [ ] `<meta name="description">` (150–160 znakova) s target ključnim riječima
- [ ] `<meta name="keywords">` s Croatian keywords
- [ ] Open Graph tagovi: `og:title`, `og:description`, `og:url`, `og:type`, `og:locale` (hr_HR)
- [ ] `<link rel="canonical" href="https://kontekst.hr/">`
- [ ] JSON-LD LocalBusiness schema u `<script type="application/ld+json">`
- [ ] Sve slike imaju opisne `alt` atribute na hrvatskom
- [ ] Heading hijerarhija ispravna: jedan `<h1>`, sekcije koriste `<h2>`, kartice `<h3>`
- [ ] `<html lang="hr">` atribut postoji (trebao biti dodan u task #001)
- [ ] Stranica nema broken linkove
- [ ] `robots.txt` kreiran (allow all)
- [ ] `sitemap.xml` kreiran

## Technical Notes

Meta description prijedlog: "Kontekst.hr — specijalizirani za n8n workflow automatizacije, automatizaciju poslovnih procesa i razvoj AI aplikacija. Optimizirajte vaše poslovanje uz stručnu podršku."

JSON-LD template:
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Kontekst.hr",
  "description": "Poslovne automatizacije, n8n workflowovi i AI aplikacije",
  "url": "https://kontekst.hr",
  "email": "info@kontekst.hr",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "HR"
  },
  "sameAs": []
}
```

Target keywords: "automatizacija poslovanja", "n8n Hrvatska", "AI aplikacije za poslovanje", "poslovne automatizacije", "workflow automatizacija", "automatizacija procesa Hrvatska"

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-25 | human | Task created |
