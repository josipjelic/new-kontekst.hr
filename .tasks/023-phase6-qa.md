---
id: "023"
title: "Phase 6 — QA: cross-browser testing, responsiveness, Lighthouse, accessibility audit"
status: "todo"
area: "qa"
agent: "@qa-engineer"
priority: "normal"
created_at: "2026-03-25"
due_date: null
started_at: null
completed_at: null
prd_refs: []
blocks: []
blocked_by: ["020", "014"]
---

## Description

Full QA pass on the migrated React site. This runs after all frontend components are complete (#020) and the backend contact endpoint is functional (#014). QA covers four areas:

1. Cross-browser testing
2. Mobile responsiveness
3. Lighthouse performance audit
4. Accessibility audit

Any regressions found vs. the original plain-HTML site are bugs and must be fixed before the migration is considered complete.

## Acceptance Criteria

**Cross-browser testing**
- [ ] Tested and passing in:
  - Chrome (latest)
  - Firefox (latest)
  - Safari (latest, macOS)
  - Chrome on Android (real device or BrowserStack)
  - Safari on iOS (real device or BrowserStack)
- [ ] No visual regressions vs. the original `index.html` in any tested browser
- [ ] Mobile nav toggle works on all tested browsers/devices
- [ ] Contact form submits correctly on all tested browsers
- [ ] Scroll reveal animations work (or degrade gracefully) on all tested browsers

**Mobile responsiveness**
- [ ] All sections verified at: 375px (iPhone SE), 390px (iPhone 14), 768px (iPad), 1280px, 1440px
- [ ] No horizontal scroll at any breakpoint
- [ ] Touch targets (buttons, nav links, email link) are min 44x44px on mobile
- [ ] Footer navigation stacks vertically on mobile as per existing design

**Lighthouse audit (Chrome DevTools, production build)**
- [ ] Performance score: 90+
- [ ] Accessibility score: 95+
- [ ] Best Practices score: 90+
- [ ] SEO score: 95+
- [ ] All Core Web Vitals in "Good" range: LCP < 2.5s, FID/INP < 200ms, CLS < 0.1

**Accessibility audit**
- [ ] All images have meaningful `alt` attributes (or `alt=""` for decorative)
- [ ] All SVG icons are `aria-hidden="true"` with adjacent visible text
- [ ] Keyboard navigation: tab through entire page without focus traps or lost focus
- [ ] Escape key closes mobile menu
- [ ] Contact form: all fields have associated `<label>` elements
- [ ] Form error messages use `role="alert"` and are announced by screen readers
- [ ] Colour contrast ratios verified (WCAG 2.1 AA minimum):
  - Primary text on base surface: passes AAA
  - Secondary text on overlay surface: passes AA
  - Accent on base surface: passes AAA
- [ ] `prefers-reduced-motion`: verify animations are suppressed when OS setting is enabled

**Regression check**
- [ ] Page title and meta description present and correct
- [ ] JSON-LD structured data present and valid (use Google Rich Results Test)
- [ ] Open Graph tags present (use Facebook Sharing Debugger)
- [ ] All anchor links (`#usluge`, `#kako-radimo`, `#o-nama`, `#kontakt`) work from nav

## Technical Notes

Run Lighthouse against the production build served locally (`npm run preview` or `docker-compose.prod.yml`), not against the Vite dev server — the dev server does not reflect production bundle size or caching behaviour.

For accessibility testing, use both automated tools (axe DevTools browser extension) and manual keyboard navigation. Automated tools catch ~30% of accessibility issues — manual testing is not optional.

Document all findings (pass/fail per criterion) in a test report appended to the History table below.

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-25 | human | Task created as part of migration plan |
