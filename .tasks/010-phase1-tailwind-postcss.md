---
id: "010"
title: "Phase 1b — Set up Tailwind CSS with PostCSS in React project"
status: "done"
area: "setup"
agent: "@frontend-developer"
priority: "high"
created_at: "2026-03-25"
due_date: null
started_at: null
completed_at: "2026-03-25"
prd_refs: []
blocks: ["015", "016", "017", "018", "019"]
blocked_by: ["009"]
---

## Description

Replace the Tailwind CDN `<script>` tag (current approach per ADR-001, now superseded) with a proper PostCSS-based Tailwind installation. This enables tree-shaking, removes the ~3MB CDN bundle, and allows the custom `tailwind.config.js` to use the full Tailwind API.

All design tokens currently defined inline in the `<script>` block in `index.html` (brand colours, accent colours, font families) must be migrated verbatim into `tailwind.config.js`.

All custom CSS currently in `assets/css/custom.css` must be migrated to `src/assets/css/custom.css` (or equivalent `src/` path) and imported in `src/main.jsx`.

## Acceptance Criteria

- [x] `tailwindcss`, `postcss`, `autoprefixer` installed as devDependencies
- [x] `tailwind.config.js` in project root with `content` array covering `./index.html` and `./src/**/*.{js,jsx}`
- [x] `postcss.config.js` configured with `tailwindcss` and `autoprefixer` plugins
- [x] `src/index.css` (or `src/assets/css/main.css`) contains Tailwind directives: `@tailwind base; @tailwind components; @tailwind utilities;`
- [x] Custom CSS from `assets/css/custom.css` migrated to `src/assets/css/custom.css` — all existing class names preserved exactly (`.nav-cta`, `.btn-primary`, `.hero-badge`, `.service-card`, `.process-step`, `.reveal`, `.reveal-delay-1/2/3`, etc.)
- [x] All colour tokens migrated to `tailwind.config.js` `theme.extend.colors`:
  - `brand` scale (50–900)
  - `accent.DEFAULT` (#00D4AA) and `accent.dim` (#00A886)
- [x] Font families migrated: `display: ['Syne']`, `body: ['DM Sans']`, `sans: ['DM Sans']`
- [x] Google Fonts `<link>` tags for Syne + DM Sans present in `index.html` (Vite entry)
- [x] CSS custom properties (`--color-surface-base`, `--color-accent`, etc.) preserved in migrated custom CSS
- [x] `npm run dev` renders styles correctly — no visible regression vs. current `index.html`
- [x] `npm run build` — Tailwind purges unused classes, resulting CSS is significantly smaller than 3MB CDN bundle

## Technical Notes

The CDN `tailwind.config` inline script block in the original `index.html` (lines 40–70) contains all token definitions — copy them exactly into `tailwind.config.js`.

`assets/css/custom.css` contains all component-level CSS including `@keyframes`, `prefers-reduced-motion` media query, `.reveal` animation classes, and all component hover/focus states. This file is critical — do not lose any rules during migration.

`@layer components` or `@layer utilities` wrappers may be needed for some custom classes to be correctly purged.

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-25 | human | Task created as part of migration plan |
| 2026-03-25 | @frontend-developer | Tailwind 3 + PostCSS, `src/assets/css/custom.css`, Vite entry fonts — task completed |
