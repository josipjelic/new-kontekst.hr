---
id: "028"
title: "AI Readiness Questionnaire: Frontend implementation"
status: "done"
area: "frontend"
agent: "@frontend-developer"
priority: "high"
created_at: "2026-03-26"
due_date: null
started_at: "2026-03-26"
completed_at: "2026-03-26"
prd_refs: []
blocks: ["029", "030"]
blocked_by: ["025", "026", "027"]
---

## Description

Build the complete frontend for the AI Readiness Questionnaire — a multi-step wizard available at /upitnik (HR) and /en/questionnaire (EN). Implement according to the UX spec from #026, using copy from #025, and posting to the API implemented in #027.

Implementation checklist:

1. **Components**:
   - src/components/hr/Questionnaire.jsx — Croatian locale wizard
   - src/components/en/Questionnaire.jsx — English locale wizard
   - Shared sub-components (if warranted): QuestionCard, AnswerOption, ProgressBar, ResultDisplay, LoadingState — place in src/components/ui/ or a src/components/questionnaire/ subdirectory

2. **Pages**:
   - src/pages/hr/Questionnaire.jsx — wraps HR component, includes react-helmet-async Helmet with Croatian SEO tags from #025
   - src/pages/en/Questionnaire.jsx — wraps EN component, includes Helmet with English SEO tags from #025

3. **Routing** (App.jsx):
   - Add route /upitnik → HR Questionnaire page
   - Add route /en/questionnaire → EN Questionnaire page

4. **Wizard state**:
   - Manage current step (0–4), selected answers, loading, result, and error state with useState
   - Step navigation: Next (disabled until an answer is selected), Back
   - On final step submit: POST to /api/questionnaire with all 5 answers and locale
   - Show loading state during API call (per UX spec)
   - On success: render result display with tier, assessment text, and CTA
   - On error (timeout, rate limit, server error): show appropriate inline error message (Croatian or English per locale)

5. **SEO**: Helmet tags (title, meta description, OG) per locale, per #025 copy. Correct lang attribute.

6. **Tests**: Vitest + React Testing Library — render each step, answer selection, Next/Back navigation, loading state, successful result render, error state render.

## Acceptance Criteria

- [ ] src/components/hr/Questionnaire.jsx and src/components/en/Questionnaire.jsx implemented
- [ ] src/pages/hr/Questionnaire.jsx and src/pages/en/Questionnaire.jsx implemented with Helmet SEO tags
- [ ] /upitnik and /en/questionnaire routes added to App.jsx
- [ ] 5-step wizard flow: step renders, answer selection, Next/Back navigation working
- [ ] POST /api/questionnaire called on final step submission with correct request body
- [ ] Loading state shown during API call
- [ ] Result display renders tier, AI assessment text, and CTA on success
- [ ] Inline error messages for rate limit (429), timeout (503), and generic error
- [ ] Scroll reveal (.reveal) applied where appropriate per UX spec
- [ ] prefers-reduced-motion respected for step transitions
- [ ] All interactive elements have ≥ 44px touch targets (mobile)
- [ ] Keyboard navigation works through all steps and the result
- [ ] Vitest + RTL tests written and passing (npm test)
- [ ] No console.log in committed code
- [ ] No commented-out code committed

## Technical Notes

- Follow existing locale split pattern: hr/ and en/ component folders, same filenames (Nav.jsx, Footer.jsx, etc.).
- The questionnaire pages are standalone routes — confirm with #026 UX spec whether Nav and Footer are included on these pages.
- Vite API proxy is configured for /api in development — the POST call should use a relative URL (/api/questionnaire) so it works in both dev and production.
- VITE_API_URL env var is used in the contact form — follow the same pattern for the questionnaire fetch.
- blocked_by #025 (need copy/questions), #026 (need UX spec), #027 (need working API endpoint).
- The EN page should set <html lang="en"> — use the existing pattern from src/pages/en/Home.jsx.

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-26 | human | Task created |
| 2026-03-26 | @frontend-developer | Implementation complete — all acceptance criteria met, 13 tests passing |
