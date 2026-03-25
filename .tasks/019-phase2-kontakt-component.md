---
id: "019"
title: "Phase 2e — Migrate Kontakt section to React with live contact form"
status: "todo"
area: "frontend"
agent: "@frontend-developer"
priority: "high"
created_at: "2026-03-25"
due_date: null
started_at: null
completed_at: null
prd_refs: []
blocks: ["020"]
blocked_by: ["009", "010", "011", "014"]
---

## Description

Migrate the Kontakt section to `src/components/sections/Kontakt.jsx`. Unlike other sections, this is not purely presentational — it replaces the current mailto-only layout with a functional contact form that submits to the backend endpoint `POST /api/contact` (implemented in task #014).

This is the only section with React state (form field values, loading state, success/error feedback).

## Acceptance Criteria

**Structure**
- [ ] `src/components/sections/Kontakt.jsx` created
- [ ] Renders `<section id="kontakt">` with section label, H2 heading, and sub-copy
- [ ] Contact form with fields: Name (`name`), Email (`email`), Message (`message`)
- [ ] Submit button with `.btn-primary` class and loading state ("Slanje..." text while submitting)
- [ ] Email address `info@kontekst.hr` still visible as a direct mailto link alongside the form
- [ ] `.contact-card` wrapper class applied to the form container

**Form behaviour**
- [ ] Form fields controlled via `useState`
- [ ] Client-side validation before submit:
  - Name: required, min 2 chars
  - Email: required, valid format
  - Message: required, min 10 chars
  - Inline field error messages displayed below each invalid field
- [ ] On submit: `fetch('POST /api/contact')` (or `axios`) with JSON body
- [ ] During submission: button disabled + shows "Slanje..."
- [ ] On success (201): form clears + shows success message "Hvala! Javit ćemo vam se uskoro."
- [ ] On error (5xx/network): shows error message "Greška pri slanju. Pokušajte ponovo ili nam pišite direktno."
- [ ] On rate limit (429): shows "Previše pokušaja. Pričekajte nekoliko minuta."
- [ ] Success and error messages use ARIA `role="alert"` for accessibility

**API URL config**
- [ ] API base URL read from Vite env var `VITE_API_URL` (default: `http://localhost:3000`)
- [ ] `.env.example` in frontend root includes `VITE_API_URL=http://localhost:3000`
- [ ] `VITE_API_URL=https://api.kontekst.hr` (or equivalent) for production

**Tests**
- [ ] Component renders without errors
- [ ] Submit with empty fields shows validation errors (no fetch call made)
- [ ] Submit with valid data: fetch called with correct payload (mock fetch)
- [ ] Success message shown on mocked 201 response

## Technical Notes

Use native `fetch` — do not add axios unless the team explicitly agrees. The contact form is the only API call on the site.

The `VITE_` prefix is required for Vite to expose env vars to the browser bundle.

This task is blocked by #014 (backend endpoint). However, the component can be built and tested with a mock/stubbed fetch — just ensure the real `VITE_API_URL` integration is verified before marking complete.

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-25 | human | Task created as part of migration plan |
