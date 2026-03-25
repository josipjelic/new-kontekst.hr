---
id: "020"
title: "Phase 2f — Wire scroll reveal animations, SEO meta tags, and JSON-LD in React"
status: "done"
area: "frontend"
agent: "@frontend-developer"
priority: "high"
created_at: "2026-03-25"
due_date: null
started_at: null
completed_at: "2026-03-25"
prd_refs: []
blocks: ["022"]
blocked_by: ["015", "016", "017", "018", "019"]
---

## Description

Final frontend wiring task. Once all section components are in place (#015–#019), this task:

1. Implements the IntersectionObserver scroll reveal system in React (replaces the vanilla JS in `index.html`)
2. Migrates all SEO meta tags and JSON-LD structured data from `index.html` to the Vite entry `index.html`
3. Verifies the complete page renders correctly end-to-end in the browser

This is the last task before the frontend is considered feature-complete.

## Acceptance Criteria

**Scroll reveal**
- [ ] `src/hooks/useScrollReveal.js` custom hook created — uses `IntersectionObserver` to add `.visible` class to elements with `.reveal` class
- [ ] Hook is called once in `src/App.jsx` (or a top-level layout component) after mount
- [ ] IntersectionObserver config: threshold `0.12`, rootMargin `0px 0px -40px 0px`
- [ ] Staggered delays work: `.reveal-delay-1/2/3` (100/200/300ms) — these are CSS delays, the hook does not need special logic for them
- [ ] `prefers-reduced-motion`: if `window.matchMedia('(prefers-reduced-motion: reduce)').matches`, skip the observer and add `.visible` to all `.reveal` elements immediately
- [ ] No memory leak: observer is disconnected in the hook's cleanup

**SEO meta tags in Vite `index.html`**
- [ ] All meta tags from the old `index.html` migrated to the new Vite `index.html` (in `/` root):
  - Title tag
  - Meta description, robots, keywords, author, language
  - Canonical link
  - hreflang alternate links (hr + en)
  - Open Graph tags (og:type, og:url, og:title, og:description, og:locale, og:site_name, og:image, og:image:width/height/alt)
  - Twitter Card tags
- [ ] Google Fonts preconnect + stylesheet `<link>` tags present
- [ ] `lang="hr"` on `<html>` element

**JSON-LD structured data**
- [ ] JSON-LD `ProfessionalService` script from old `index.html` migrated — either into Vite `index.html` as a static `<script type="application/ld+json">` or injected via a React `useEffect` + `document.head` approach
- [ ] Static placement in `index.html` is preferred (simpler, crawlable without JS execution)

**End-to-end verification**
- [ ] `npm run dev` — full page renders with all sections visible and animated
- [ ] `npm run build && npm run preview` — production build serves correctly
- [ ] All section IDs present: `#usluge`, `#kako-radimo`, `#o-nama`, `#kontakt`
- [ ] Nav smooth-scroll links work for all sections
- [ ] Mobile nav opens/closes correctly

## Technical Notes

The custom hook approach for scroll reveal is preferred over putting the IntersectionObserver logic directly in `App.jsx` — it keeps the side effect isolated and testable.

The observer should observe all elements matching `.reveal` that exist in the DOM at the time the hook runs. Because React renders synchronously before `useEffect` fires, all `.reveal` elements will be in the DOM by the time the observer is set up.

**Risk**: If sections are conditionally rendered or lazy-loaded in the future, the observer setup may need to be re-run. For now, a single `useEffect` on mount is sufficient.

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-25 | — | `useScrollReveal` + `App.jsx`; SEO + JSON-LD u Vite `index.html`; uklonjena hardkodirana `visible` s `.reveal` u sekcijama |
| 2026-03-25 | human | Task created as part of migration plan |
