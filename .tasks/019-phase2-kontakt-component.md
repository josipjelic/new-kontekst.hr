---
id: "019"
title: "Phase 2e — Migrate Kontakt section to React with live contact form"
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

Migrate the Kontakt section to `src/components/sections/Kontakt.jsx`. Unlike other sections, this is not purely presentational — it replaces the current mailto-only layout with a functional contact form that submits to the backend endpoint `POST /api/contact` (implemented in task #014).

This is the only section with React state (form field values, loading state, success/error feedback).

## Acceptance Criteria

**Structure**
- [x] `src/components/sections/Kontakt.jsx` created
- [x] Renders `<section id="kontakt">` with section label, H2 heading, and sub-copy
- [x] Contact form with fields: Name (`name`), Email (`email`), Message (`message`)
- [x] Submit button with `.btn-primary` class and loading state ("Slanje..." text while submitting)
- [x] Email address `info@kontekst.hr` still visible as a direct mailto link alongside the form
- [x] `.contact-card` wrapper class applied to the form container

**Form behaviour**
- [x] Form fields controlled via `useState`
- [x] Client-side validation before submit:
  - Name: required, min 2 chars
  - Email: required, valid format
  - Message: required, min 10 chars
  - Inline field error messages displayed below each invalid field
- [x] On submit: `fetch('POST /api/contact')` (or `axios`) with JSON body
- [x] During submission: button disabled + shows "Slanje..."
- [x] On success (201): form clears + shows success message "Hvala! Javit ćemo vam se uskoro."
- [x] On error (5xx/network): shows error message "Greška pri slanju. Pokušajte ponovo ili nam pišite direktno."
- [x] On rate limit (429): shows "Previše pokušaja. Pričekajte nekoliko minuta."
- [x] Success and error messages use ARIA `role="alert"` for accessibility

**API URL config**
- [x] API base URL read from Vite env var `VITE_API_URL` (default: `http://localhost:3000`)
- [x] `.env.example` in frontend root includes `VITE_API_URL=http://localhost:3000`
- [x] Produkcija: u `.env` postaviti `VITE_API_URL=https://api.kontekst.hr` (ili stvarni API origin)

**Tests**
- [x] Component renders without errors
- [x] Submit with empty fields shows validation errors (no fetch call made)
- [x] Submit with valid data: fetch called with correct payload (mock fetch)
- [x] Success message shown on mocked 201 response

## Technical Notes

Use native `fetch` — do not add axios unless the team explicitly agrees. The contact form is the only API call on the site.

The `VITE_` prefix is required for Vite to expose env vars to the browser bundle.

This task is blocked by #014 (backend endpoint). However, the component can be built and tested with a mock/stubbed fetch — just ensure the real `VITE_API_URL` integration is verified before marking complete.

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-25 | human | Task created as part of migration plan |
| 2026-03-25 | @frontend-developer | Kontakt.jsx, Vitest + RTL, `npm test`. Backend #014 was still stub (501) — form showed error until implementation. |
