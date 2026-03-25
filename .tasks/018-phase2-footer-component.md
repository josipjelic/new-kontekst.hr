---
id: "018"
title: "Phase 2d — Migrate Footer to React"
status: "done"
area: "frontend"
agent: "@frontend-developer"
priority: "normal"
created_at: "2026-03-25"
due_date: null
started_at: null
completed_at: null
prd_refs: []
blocks: ["020"]
blocked_by: ["009", "010", "011"]
---

## Description

Migrate the `<footer>` from `index.html` to `src/components/layout/Footer.jsx`. The footer is a layout-level component (not a page section) — it renders below all sections and contains copyright, nav links, and email.

## Acceptance Criteria

- [x] `src/components/layout/Footer.jsx` created
- [x] Renders `<footer>` with:
  - Logo or text brand mark
  - Navigation anchor links to all sections (Usluge, Kako radimo, O nama, Kontakt)
  - Email: `info@kontekst.hr` as `<a href="mailto:info@kontekst.hr">`
  - Copyright line: "© 2026 Kontekst.hr — Sva prava pridržana"
- [x] Surface: `--color-surface-raised` with `--color-surface-border` top separator (per ARCHITECTURE.md section visual language)
- [x] Responsive: horizontal layout on desktop, stacked on mobile
- [x] Visual output matches the current HTML footer exactly
- [x] Imported and rendered in `src/App.jsx` (or `src/pages/Home.jsx`) after all sections

## Technical Notes

The footer sits outside the `<main>` element. In `App.jsx`, the structure should be:
```jsx
<>
  <Nav />
  <main>
    <Home />   {/* all sections */}
  </main>
  <Footer />
</>
```

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-25 | human | Task created as part of migration plan |
| 2026-03-25 | @frontend-developer | Footer.jsx; dynamic year; Nav / main / Footer structure in App.jsx |
