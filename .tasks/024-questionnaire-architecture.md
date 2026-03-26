---
id: "024"
title: "AI Readiness Questionnaire: Architecture & API contract"
status: "done"
area: "infra"
agent: "@systems-architect"
priority: "high"
created_at: "2026-03-26"
due_date: null
started_at: "2026-03-26"
completed_at: "2026-03-26"
prd_refs: []
blocks: ["025", "026", "027"]
blocked_by: []
---

## Description

Design and document the full architectural approach for the AI Readiness Questionnaire feature before any implementation begins. This is the unblocking task for all other questionnaire work.

Deliverables:
- Standalone page routing for /upitnik (HR) and /en/questionnaire (EN) — document how these routes integrate with the existing react-router-dom setup in App.jsx
- POST /api/questionnaire API contract: request schema (array of 5 question/answer pairs), response schema ({ tier, assessment, score }), HTTP status codes, error response shapes
- OpenRouter/Claude Haiku integration strategy: how the backend constructs the prompt, sends the request, handles streaming vs. non-streaming, timeout policy
- Environment variable specification: OPENROUTER_API_KEY, OPENROUTER_MODEL (default: anthropic/claude-haiku), and any other required vars — document in .env.example format
- Rate limiting strategy for the questionnaire endpoint (stricter than contact form — recommended 3 req / 15 min per IP)
- Error handling strategy for AI timeouts, OpenRouter API errors, and invalid responses
- Write an ADR in docs/technical/DECISIONS.md (ADR-003) capturing the decision to use OpenRouter + Claude Haiku and the rationale

## Acceptance Criteria

- [ ] POST /api/questionnaire request and response schemas fully specified in docs/technical/API.md (or a new questionnaire section thereof)
- [ ] ADR-003 written and added to docs/technical/DECISIONS.md covering OpenRouter + Claude Haiku decision
- [ ] Routing approach for /upitnik and /en/questionnaire documented (impact on App.jsx and Vite config if any)
- [ ] All required environment variables listed with descriptions and example values
- [ ] Rate limiting parameters specified (requests per window, window duration, response when exceeded)
- [ ] Timeout and fallback behaviour defined (what the API returns if OpenRouter times out or returns an error)
- [ ] Document reviewed and unblocks #026 and #027 without ambiguity

## Technical Notes

- The existing backend lives in backend/src/. New route should follow the same pattern as backend/src/routes/ (see the contact endpoint in #014).
- OpenRouter uses an OpenAI-compatible API — the backend can use the openai npm package pointed at https://openrouter.ai/api/v1 or a plain fetch call.
- OPENROUTER_API_KEY must never be hardcoded — document in backend/.env.example.
- Consider whether the questionnaire response should be streamed to the frontend (simpler: non-streaming for v1; note this in the ADR).
- The /upitnik and /en/questionnaire routes are new top-level pages (not anchor sections), so they need their own Helmet tags — note this in the routing spec for #028.
- Consult docs/technical/DECISIONS.md before writing ADR-003 to ensure numbering is correct (current highest is ADR-002).

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-26 | human | Task created |
| 2026-03-26 | @systems-architect | ADR-003 written, ARCHITECTURE.md updated with Questionnaire System section, API.md updated with POST /api/questionnaire contract. All deliverables complete. |
