---
id: "014"
title: "Phase 3b — Implement POST /api/contact with email sending, CORS, rate limiting, validation"
status: "done"
area: "backend"
agent: "@backend-developer"
priority: "high"
created_at: "2026-03-25"
due_date: null
started_at: null
completed_at: "2026-03-25"
prd_refs: []
blocks: []
blocked_by: ["013"]
---

## Description

Implement the contact form backend endpoint: `POST /api/contact`. This endpoint receives form submissions from the React Kontakt section and sends an email notification to `info@kontekst.hr`.

Also implement the three cross-cutting middleware concerns needed by this endpoint:
- **CORS** — restrict to the frontend origin
- **Rate limiting** — prevent abuse
- **Input validation** — validate and sanitise all fields before sending

This task unblocks task #019 (Kontakt section React migration), which needs to call this endpoint.

## Acceptance Criteria

**POST /api/contact endpoint**
- [ ] Accepts JSON body: `{ name: string, email: string, message: string }`
- [ ] Returns `201` on success with `{ "message": "Poruka je poslana." }` (Croatian: “Message sent.”)
- [ ] Returns `422` with field-level errors on validation failure: `{ "errors": [{ "field": "email", "message": "..." }] }`
- [ ] Sends email to `info@kontekst.hr` with sender name, reply-to set to the submitted email address
- [ ] Email subject: `"Nova poruka s kontekst.hr — <name>"` (Croatian subject line for inbox)
- [ ] Email body includes: name, submitted email, and message content

**CORS middleware**
- [ ] `cors` package installed and configured
- [ ] `CORS_ORIGIN` env var controls allowed origin (default: `http://localhost:5173`)
- [ ] In production, must be set to `https://kontekst.hr`
- [ ] Preflight OPTIONS requests handled correctly

**Rate limiting**
- [ ] `express-rate-limit` installed
- [ ] Contact endpoint limited to **5 requests per IP per 15 minutes**
- [ ] Rate limit response: `429` with `{ "error": "Previše zahtjeva. Pokušajte ponovo za nekoliko minuta." }` (localized Croatian body)
- [ ] General API rate limit: 100 requests per IP per 15 minutes applied globally

**Input validation**
- [ ] `express-validator` (or `zod`) used for validation
- [ ] `name`: required, string, min 2 chars, max 100 chars
- [ ] `email`: required, valid email format, max 254 chars
- [ ] `message`: required, string, min 10 chars, max 2000 chars
- [ ] Input sanitised (trim whitespace, escape HTML entities)

**Email sending**
- [ ] `nodemailer` installed
- [ ] SMTP credentials read from env vars: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`
- [ ] `.env.example` updated with all new SMTP vars
- [ ] If `NODE_ENV=test`, email sending is mocked/skipped (no real sends during tests)
- [ ] Email sending failure returns `500` with `{ "error": "Greška pri slanju poruke. Pokušajte ponovo." }` (localized) — does not leak SMTP error details

**Tests**
- [ ] Test: valid submission returns 201
- [ ] Test: missing `name` returns 422 with field error
- [ ] Test: invalid email returns 422
- [ ] Test: message too short returns 422
- [ ] Test: rate limit triggers 429 after 5 rapid requests
- [ ] All tests pass with `npm test`

## Technical Notes

**Email provider recommendation**: Use SMTP with a transactional provider (SendGrid, Mailgun, or Brevo free tier). The SMTP approach keeps nodemailer as the only sending library regardless of provider.

**Risk**: SMTP credentials must never be committed. Verify `.env` is in `.gitignore` before implementing. Flag if `.env.example` is missing the SMTP vars — that's a deployment risk.

**`reply-to` header**: Set to the form submitter's email so that replying to the notification goes directly to the client, not to the system sender.

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-25 | — | Implemented: express-validator, dual rate limits, nodemailer + SMTP env, CORS default; tests in `backend/tests/contact.test.js` |
| 2026-03-25 | human | Task created as part of migration plan |
