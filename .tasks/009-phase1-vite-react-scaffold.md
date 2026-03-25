---
id: "009"
title: "Phase 1a — Scaffold Vite + React project structure"
status: "done"
area: "setup"
agent: "@frontend-developer"
priority: "high"
created_at: "2026-03-25"
due_date: null
started_at: null
completed_at: "2026-03-25"
prd_refs: []
blocks: ["010", "011", "015", "016", "017", "018", "019"]
blocked_by: []
---

## Description

Create the new Vite + React project scaffold that will replace the current plain-HTML `index.html`. This is the foundational task for the entire migration — nothing else in the migration can start until the project structure exists.

The scaffold must be created in the project root (or a `/frontend` subdirectory — see Technical Notes). It includes the `src/` directory layout with components, pages, assets, and the necessary config files (`vite.config.js`, `package.json`).

All existing HTML content (Hero, Nav, Usluge, Kako radimo, O nama, Kontakt, Footer) will be migrated to React components in subsequent tasks (#015–#019). This task is structure only — no component content is migrated here.

## Acceptance Criteria

- [x] `package.json` with `vite`, `react`, `react-dom` as dependencies
- [x] `vite.config.js` configured (base path, build output to `dist/`)
- [x] Directory structure created:
  ```
  src/
    components/
      layout/       # Nav, Footer
      sections/     # Hero, Usluge, KakoRadimo, ONama, Kontakt
      ui/           # Reusable primitives (Button, SectionLabel, etc.)
    pages/
      Home.jsx      # Assembles all sections in order
    App.jsx
    main.jsx
  ```
- [x] `src/main.jsx` mounts `<App />` into `#root`
- [x] `src/App.jsx` renders `<Home />` page
- [x] `index.html` (Vite entry point) has correct `<div id="root">` and script tag
- [x] `npm run dev` starts the dev server without errors
- [x] `npm run build` produces a `dist/` directory without errors
- [x] `dist/` added to `.gitignore`
- [x] `node_modules/` confirmed in `.gitignore`

## Technical Notes

**Project root structure decision**: Place the React app at the repository root (replacing the existing `index.html`) rather than in a `/frontend` subdirectory. This keeps the Docker build context clean and matches the existing deployment expectation of serving from root.

The old `index.html` should be renamed to `index.html.bak` (not deleted) until Phase 2 migration is complete and verified.

**Vite config base**: Set `base: '/'` explicitly to avoid asset path issues when served from nginx.

**React version**: Use React 18 (`react@18`, `react-dom@18`).

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-25 | human | Task created as part of migration plan |
| 2026-03-25 | @frontend-developer | Completed: Vite root `index.html`, `src/` scaffold, `index.css`, `.gitkeep` in component dirs, `npm run build` → `dist/`; docs/TODO updated |
