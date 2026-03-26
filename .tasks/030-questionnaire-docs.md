---
id: "030"
title: "AI Readiness Questionnaire: Documentation update"
status: "done"
area: "docs"
agent: "@documentation-writer"
priority: "normal"
created_at: "2026-03-26"
due_date: null
started_at: null
completed_at: 2026-03-26
prd_refs: []
blocks: []
blocked_by: ["028"]
---

## Description

Update the living documentation to reflect the completed AI Readiness Questionnaire feature. This task runs in parallel with #029 (QA) once #028 (frontend) is done.

Two documents must be updated:

1. **docs/user/USER_GUIDE.md** — add a new section describing the questionnaire from a user/developer perspective:
   - What the questionnaire is and who it is for
   - How to navigate to it (direct URL + any nav entry points)
   - How to complete the 5-step flow
   - What the three result tiers mean (Početnik/Srednji/Spreman)
   - Troubleshooting: rate limit message, AI timeout message, what to do in each case
   - Developer note: how the questionnaire integrates with the backend (POST /api/questionnaire, OpenRouter)

2. **docs/technical/ARCHITECTURE.md** — add a questionnaire subsection under Frontend Architecture and/or a new Questionnaire System section:
   - Route structure (/upitnik, /en/questionnaire)
   - Component structure (hr/Questionnaire.jsx, en/Questionnaire.jsx, shared sub-components)
   - State management approach (useState, step machine)
   - Backend integration (POST /api/questionnaire → OpenRouter → Claude Haiku)
   - Environment variables required (OPENROUTER_API_KEY, OPENROUTER_MODEL)
   - Reference the ADR-003 written in #024

Do not modify PRD.md. Do not alter existing sections of the docs unless necessary for consistency — append new sections.

## Acceptance Criteria

- [ ] docs/user/USER_GUIDE.md updated with questionnaire user-facing section (English)
- [ ] Troubleshooting table in USER_GUIDE.md includes rate limit and AI timeout rows for the questionnaire
- [ ] docs/technical/ARCHITECTURE.md updated with questionnaire system description
- [ ] Component and route structure documented accurately (verified against the actual implementation in #028)
- [ ] Environment variables (OPENROUTER_API_KEY, OPENROUTER_MODEL) documented in ARCHITECTURE.md
- [ ] ADR-003 reference included in ARCHITECTURE.md
- [ ] All documentation written in English (per project language conventions)
- [ ] No modification to PRD.md

## Technical Notes

- Read the completed implementation files from #028 before writing the architecture section — accuracy matters more than speed.
- The USER_GUIDE.md audience is developers and team members, not end users, so include developer-relevant details (API route, env vars, component paths).
- Keep the tone consistent with the existing USER_GUIDE.md style — concise, structured, no marketing language.
- This task is blocked by #028 (frontend) but does not need to wait for #029 (QA) to begin — documentation can be written against the implementation as soon as it is merged.

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-26 | @documentation-writer | Documentation complete — USER_GUIDE.md + ARCHITECTURE.md + API.md updated |
| 2026-03-26 | human | Task created |
