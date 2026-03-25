---
id: "007"
title: "SEO: meta tags, Open Graph, JSON-LD structured data"
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

After all sections exist, run an SEO pass: meta tags, Open Graph, structured data, sitemap as required. Final polish so search engines and social platforms understand the page.

> Much of this was implemented in the React app (`#020`); reconcile this task with the current `index.html` / Vite setup and close when verified.

## Acceptance Criteria

- [ ] `<title>`: e.g. “Kontekst.hr — Poslovne automatizacije, n8n i AI aplikacije u Hrvatskoj” (Croatian, PRD-aligned)
- [ ] `<meta name="description">` (150–160 characters) with target keywords (**Croatian**)
- [ ] `<meta name="keywords">` with Croatian keywords (if still used)
- [ ] Open Graph: `og:title`, `og:description`, `og:url`, `og:type`, `og:locale` (`hr_HR`)
- [ ] `<link rel="canonical" href="https://kontekst.hr/">`
- [ ] JSON-LD (e.g. LocalBusiness / ProfessionalService) in `<script type="application/ld+json">`
- [ ] All images have descriptive `alt` text (**Croatian**)
- [ ] Heading hierarchy: one `<h1>`, sections `<h2>`, cards `<h3>`
- [ ] `<html lang="hr">` present (from task #001 / scaffold)
- [ ] No broken internal links
- [ ] `robots.txt` (allow all) where applicable
- [ ] `sitemap.xml` where applicable

## Technical Notes

Example meta description (Croatian): “Kontekst.hr — specijalizirani za n8n workflow automatizacije, automatizaciju poslovnih procesa i razvoj AI aplikacija. Optimizirajte vaše poslovanje uz stručnu podršku.”

Example JSON-LD skeleton:
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

Target keywords (Croatian): “automatizacija poslovanja”, “n8n Hrvatska”, “AI aplikacije za poslovanje”, “poslovne automatizacije”, “workflow automatizacija”, “automatizacija procesa Hrvatska”

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-25 | human | Task created |
