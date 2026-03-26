---
id: "026"
title: "AI Readiness Questionnaire: UX spec"
status: "done"
area: "design"
agent: "@ui-ux-designer"
priority: "high"
created_at: "2026-03-26"
due_date: null
started_at: "2026-03-26"
completed_at: "2026-03-26"
prd_refs: []
blocks: ["027"]
blocked_by: ["024"]
---

## Description

Produce the UX specification for the multi-step AI Readiness Questionnaire wizard. This spec is the design contract that @frontend-developer (#028) implements. It must be grounded in the existing design system v2 (dark base, teal accent, Syne + DM Sans typography — see docs/technical/ARCHITECTURE.md Design System).

Deliverables (written to docs/technical/QUESTIONNAIRE_UX_SPEC.md or equivalent):

1. **Wizard shell layout**: full-page or card-centred? Header present (Nav) or stripped-down? Back/close behaviour.

2. **Progress indicator**: visual treatment of a 5-step progress bar — positioning, active/complete/inactive state styles using design system tokens.

3. **Question card layout**: how each step is presented — question text size and weight, answer option layout (radio-style cards in a grid or stacked list), selected vs. unselected state, hover state.

4. **Step transitions**: animation spec for moving between steps (slide, fade, or none for reduced-motion). Duration and easing from the motion budget in ARCHITECTURE.md.

5. **Loading state**: what the user sees while the AI is generating the assessment (after the final step is submitted). Must communicate progress without a spinning loader that feels broken after 3s.

6. **Result display layout**: how tier badge, AI-generated assessment text, and CTA block are composed. Should feel like a premium reveal, not a plain text dump.

7. **Error states**: UI for timeout, rate-limit (429), and generic server error — inline within the wizard, not a full-page error.

8. **Mobile layout**: how the wizard adapts below 768px — stacked answer options, progress bar condensed, touch targets ≥ 44px.

## Acceptance Criteria

- [x] UX spec document created at docs/technical/QUESTIONNAIRE_UX_SPEC.md
- [x] All 8 spec areas above covered (10 sections delivered)
- [x] Every visual state uses design system tokens (color, spacing, typography) — no ad-hoc values
- [x] Progress indicator specced for all 5 steps with active/complete/incomplete states
- [x] Loading state design specified with duration guidance (AI call can take 3–8s)
- [x] Result display layout specced for all three tiers — tier affects badge colour
- [x] Mobile layout addressed explicitly
- [x] Spec is implementable without further design clarification by @frontend-developer

## Technical Notes

- Design system tokens are in src/assets/css/custom.css and documented in ARCHITECTURE.md.
- The wizard pages (/upitnik, /en/questionnaire) are full standalone routes — they do not render within the single-page scroll layout. Nav and Footer inclusion should be decided in this spec.
- Pointer motion (usePointerMotion) is active on the main page — confirm whether it should also run on the questionnaire page or be suppressed.
- Answer option cards should feel consistent with the existing .service-card treatment but simpler (no icon, selectable state).
- The result tier badge could use: teal (Spreman), indigo (Srednji), muted (Početnik) — propose in the spec.
- This task is blocked by #024 to ensure routing and API response shape are known before speccing the result display.

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-26 | human | Task created |
| 2026-03-26 | @ui-ux-designer | Spec complete — docs/technical/QUESTIONNAIRE_UX_SPEC.md created |
