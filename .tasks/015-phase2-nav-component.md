---
id: "015"
title: "Phase 2a — Migrate Nav component from HTML to React"
status: "done"
area: "frontend"
agent: "@frontend-developer"
priority: "high"
created_at: "2026-03-25"
due_date: null
started_at: null
completed_at: null
prd_refs: []
blocks: ["020"]
blocked_by: ["009", "010", "011"]
---

## Description

Migrate the navigation header from `index.html` to a React component `src/components/layout/Nav.jsx`. This includes the logo, nav links, the CTA button, and the mobile hamburger menu with its toggle behaviour.

The mobile nav toggle is currently implemented as vanilla JavaScript in `index.html`. This logic must be rewritten as React state (`useState`) — no direct DOM manipulation.

## Acceptance Criteria

- [x] `src/components/layout/Nav.jsx` created
- [x] Component renders the `<header>` with the same structure as the current HTML nav:
  - Logo (SVG `logo-light.svg` or equivalent import)
  - Desktop nav links: Usluge, Kako radimo, O nama, Kontakt (smooth-scroll anchors)
  - Desktop CTA button "Razgovarajmo" (`.nav-cta` class)
  - Mobile hamburger icon button
  - Mobile menu drawer (conditionally rendered or toggled via CSS class)
- [x] Mobile menu open/close controlled by `useState(false)` — no `document.querySelector`
- [x] `aria-expanded` attribute on hamburger button reflects open/close state
- [x] Close menu on nav link click (UX expectation: tapping a link closes the mobile drawer)
- [x] All existing CSS classes preserved: `.nav-link`, `.nav-cta`, `.mobile-nav-link`
- [x] Scroll behaviour: header gets a background/shadow class when page is scrolled >50px — implemented via `useEffect` + scroll event listener with cleanup
- [x] Keyboard accessible: Escape key closes the mobile menu
- [x] Visual output matches the current HTML nav pixel-for-pixel on both desktop and mobile

## Technical Notes

SVG logo: import as a React component (`import Logo from '../../assets/logo-light.svg?react'`) or as an `<img>` src. Use the `?react` Vite plugin approach if inline SVG styling is needed; use `<img>` if not.

Smooth scroll: use `href="#section-id"` anchor links — the browser handles smooth scroll via CSS `scroll-behavior: smooth` (already in custom.css). No JavaScript scroll handling needed.

The scroll-based header style uses a `useEffect` that attaches a `scroll` event listener — remember to return a cleanup function to remove it on unmount.

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-25 | human | Task created as part of migration plan |
| 2026-03-25 | @frontend-developer | Nav.jsx implemented; logo u `public/logo-light.svg` |
