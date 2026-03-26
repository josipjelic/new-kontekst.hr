---
id: "025"
title: "AI Readiness Questionnaire: Copy & system prompt"
status: "done"
area: "docs"
agent: "@copywriter-seo"
priority: "high"
created_at: "2026-03-26"
due_date: null
started_at: "2026-03-26"
completed_at: "2026-03-26"
prd_refs: []
blocks: ["027"]
blocked_by: []
---

## Description

Produce all content required for the AI Readiness Questionnaire feature. This task can run in parallel with #024 and must complete before #027 (backend) can finalise the system prompt.

Deliverables (all written to docs/content/questionnaire-copy.md):

1. **5 questions** with HR and EN variants. Each question must have:
   - Question text (Croatian + English)
   - 3–4 answer options (Croatian + English) with associated score values
   - Question category label (e.g. "Procesi", "Podaci", "Tim", "Strategija", "Alati")

2. **Scoring tiers** definition:
   - Tier names in HR and EN: Početnik / Beginner, Srednji / Intermediate, Spreman / Ready
   - Score ranges for each tier
   - Short tier description (1 sentence, HR + EN)

3. **Claude Haiku system prompt template**: the exact prompt sent to the AI, with placeholder tokens for the user's answers and tier. Must instruct the AI to generate a personalised, actionable assessment in the correct language. Keep under 500 tokens for cost efficiency.

4. **Result page copy** (HR + EN):
   - Page headline per tier
   - Supporting body text per tier (2–3 sentences)
   - CTA block copy: primary CTA (link to /kontakt or /en/#contact) and secondary CTA

5. **SEO meta copy** for /upitnik and /en/questionnaire:
   - Croatian title tag and meta description for /upitnik
   - English title tag and meta description for /en/questionnaire
   - Open Graph title and description for both

## Acceptance Criteria

- [ ] docs/content/questionnaire-copy.md created with all 5 questions, HR + EN variants, and answer option scores
- [ ] Scoring tier definitions (Početnik/Srednji/Spreman) with score ranges documented
- [ ] Claude Haiku system prompt template written and token-counted (target: under 500 tokens)
- [ ] Result page copy written for all three tiers in both languages
- [ ] SEO meta tags (title, description, OG) provided for /upitnik and /en/questionnaire
- [ ] All Croatian copy consistent with the brand voice used throughout the site (technical, clean, direct)
- [ ] Copy reviewed and unambiguous enough for @backend-developer (#027) to implement the system prompt without further clarification

## Technical Notes

- Brand voice: authoritative but approachable — not corporate, not hype. The target reader is a Croatian SME owner with limited technical background.
- Target SEO keywords for /upitnik: "AI spremnost", "automatizacija poslovanja", "digitalna transformacija hrvatska"
- The system prompt should instruct Claude Haiku to respond in the same language as the questionnaire locale (Croatian for /upitnik, English for /en/questionnaire). Include this as a locale token in the template.
- Keep answer options scannable — max 8 words per option.
- The result assessment text from Claude Haiku is the personalised part; the tier copy in this file is the static framing around it.

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-26 | human | Task created |
| 2026-03-26 | @copywriter-seo | Task started — status set to in_progress |
| 2026-03-26 | @copywriter-seo | Task complete — docs/content/questionnaire-copy.md created; CONTENT_STRATEGY.md updated with keyword targets, CTA library entries, page copy library, and content calendar. Status set to done. |
