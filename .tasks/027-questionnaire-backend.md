---
id: "027"
title: "AI Readiness Questionnaire: Backend API implementation"
status: "done"
area: "backend"
agent: "@backend-developer"
priority: "high"
created_at: "2026-03-26"
due_date: null
started_at: "2026-03-26"
completed_at: "2026-03-26"
prd_refs: []
blocks: ["028"]
blocked_by: ["024", "025"]
---

## Description

Implement the POST /api/questionnaire endpoint in the Express backend. This endpoint receives the user's 5 question/answer responses, constructs a prompt using the system prompt template from #025, calls Claude Haiku via OpenRouter, and returns a structured JSON response.

Implementation checklist:
- Create backend/src/routes/questionnaire.js following the same module pattern as the existing contact route
- Mount the route in backend/src/app.js under /api
- Implement request validation with express-validator: validate that the request body contains exactly 5 answers with valid option values (per the schema from #024)
- Apply a strict rate limiter: 3 requests per 15-minute window per IP (separate limiter instance, not shared with contact form)
- Call OpenRouter API using the system prompt template from docs/content/questionnaire-copy.md (from #025), substituting user answers and locale
- Parse the OpenRouter response and return JSON: { tier, assessment, score }
- Handle error cases: OpenRouter timeout (return 503 with Croatian/English error message per locale), OpenRouter API error (return 502), rate limit exceeded (return 429), validation failure (return 422)
- Add OPENROUTER_API_KEY and OPENROUTER_MODEL to backend/.env.example with comments
- Write Vitest + supertest tests covering: happy path (mocked OpenRouter), validation errors (missing answers, invalid options), rate limit response, timeout simulation
- Update docs/technical/API.md with the POST /api/questionnaire endpoint documentation

## Acceptance Criteria

- [ ] POST /api/questionnaire implemented in backend/src/routes/questionnaire.js
- [ ] Route mounted in backend/src/app.js
- [ ] express-validator used for request body validation (5 answers, valid option values)
- [ ] Dedicated rate limiter: 3 requests / 15 min / IP
- [ ] OpenRouter call implemented with the system prompt from #025 — locale-aware (Croatian vs English)
- [ ] Response shape matches API contract from #024: { tier, assessment, score }
- [ ] Error responses for 422 (validation), 429 (rate limit), 503 (AI timeout), 502 (OpenRouter error)
- [ ] OPENROUTER_API_KEY and OPENROUTER_MODEL added to backend/.env.example
- [ ] Tests written covering happy path, validation errors, rate limit, and timeout
- [ ] All tests passing (npm test in backend/)
- [ ] docs/technical/API.md updated with endpoint documentation
- [ ] No secrets hardcoded in source code

## Technical Notes

- OpenRouter base URL: https://openrouter.ai/api/v1 — compatible with the openai npm package (set baseURL and apiKey).
- Default model: anthropic/claude-haiku (set via OPENROUTER_MODEL env var so it can be overridden without code changes).
- Non-streaming response for v1 (per #024 architecture decision).
- Timeout: set a 15-second timeout on the OpenRouter fetch. If it exceeds this, return 503 with a user-friendly message.
- The system prompt template is in docs/content/questionnaire-copy.md (created by #025). Read it before building the prompt construction logic.
- Rate limiter should be a separate express-rate-limit instance — do not reuse the contact form limiter. Store in backend/src/middleware/ or inline in the route file.
- See backend/src/routes/ and backend/src/app.js for existing patterns to follow.
- blocked_by #024 (API contract) and #025 (system prompt template) — do not begin implementation until both are complete.

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-26 | human | Task created |
| 2026-03-26 | @backend-developer | Implementation complete — route, app mount, env vars, 23 tests all passing |
