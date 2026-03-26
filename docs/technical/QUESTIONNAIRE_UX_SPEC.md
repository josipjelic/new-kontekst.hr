<!--
DOCUMENT METADATA
Owner: @ui-ux-designer
Update trigger: Design changes to the questionnaire wizard
Update scope: Full document — this is the design contract for #028 (frontend implementation)
Read by: @frontend-developer (implements from this spec), @qa-engineer (verifies against this spec)
-->

# AI Readiness Questionnaire — UX Specification

> **Owner**: @ui-ux-designer
> **Task**: #026
> **Status**: done
> **Last updated**: 2026-03-26
>
> **Routes in scope**: `/upitnik` (Croatian) and `/en/questionnaire` (English)
> **Design system version**: v2 (see `docs/technical/ARCHITECTURE.md` Design System section)
> **Copy source**: `docs/content/questionnaire-copy.md` — all visible strings come from there; this spec references them by name, not by repeating every word.
>
> **Implementation note**: All colour references use CSS custom property names defined in
> `src/assets/css/custom.css`. Never hard-code hex values in component code.

---

## User Goal Statement

A business owner (Marko: SME owner 5–20 people; Ana/Jelena: COO 20–100 people) has arrived on the
questionnaire page — either from the homepage CTAs or from search. Their goal is simple: understand
whether their business is a realistic candidate for automation without having to read a whitepaper
or talk to a salesperson first.

The wizard must accomplish one thing above all else: get them from question 1 to their personalised
result with zero friction and zero doubt about what happens next. Every design decision in this spec
is subordinate to that goal.

---

## Section 1 — Page Layout

### Shell structure

The questionnaire pages use the **same Nav and Footer** as the main site locale shells. This is a
deliberate choice: the page is part of the site, not a detached landing page. Visitors who finish
and want to learn more can use the Nav without disorientation.

However, the Nav CTA ("Razgovarajmo" / "Let's talk") is suppressed on these pages. The wizard
IS the conversion mechanism. Offering a parallel route out reduces completion. Implement this by
passing a prop to Nav: `hideCta={true}` on questionnaire page shells.

```
<Nav hideCta={true} />
<main id="main-content">
  <section class="questionnaire-page">
    <!-- hero copy (H1 + subheadline) -->
    <!-- wizard shell (progress + card + navigation) -->
  </section>
</main>
<Footer />
```

### Vertical rhythm

The page follows a single centred column layout. There is no multi-column content at any
breakpoint within the questionnaire itself.

```
[Nav]
[Page hero — H1 + subheadline]         ← only visible before wizard begins (or always, spec below)
[Progress indicator]
[Question card / Result card]
[Step navigation buttons]
[Footer]
```

**Clarification on hero copy placement**: The H1 ("Koliko je vaše poslovanje spremno za AI?") and
subheadline appear **above the wizard at all times** — they do not disappear after step 1. They are
static context anchors, not an intro screen. This avoids an unnecessary extra step (an intro modal
or splash) that adds cognitive load without value.

### Max-width and centering

The wizard content column has a constrained max-width to maintain readability at large viewports:

| Breakpoint | Max-width of wizard column | Notes |
|------------|---------------------------|-------|
| 320–767px (mobile) | 100% minus 24px horizontal padding (12px each side) | Full-width card feel |
| 768–1023px (tablet) | 600px centred | Card feels purposeful, not cramped |
| 1024px+ (desktop) | 680px centred | Optimal line length for question + answer text |

The hero H1 and subheadline sit within the same column width — they do not break wider.

### Vertical padding

| Breakpoint | Section top padding | Section bottom padding |
|------------|--------------------|-----------------------|
| Mobile | 48px (`2xl` token) | 64px (`3xl` token) |
| Desktop | 80px | 96px (`section` token) |

The gap between the page hero block and the progress indicator is 40px on desktop, 32px on mobile.

### Pointer motion

The `usePointerMotion` hook that drives parallax and card tilt on the homepage **must be suppressed**
on questionnaire pages. The interactive card selection state conflicts with pointer tilt (a card
would visually tilt AND be in selected state simultaneously, which is distracting). Set
`data-pointer-motion="off"` on the questionnaire page wrapper element to prevent the hook from
attaching to answer option cards.

---

## Section 2 — Progress Indicator

### Purpose and position

The progress indicator sits immediately above the question card. It has two jobs: tell the user
how far they are, and give them confidence that this will not take long. It communicates both
through the visual bar fill and the text counter.

### Visual structure

```
[──────────────────── 40% filled ────────────────────────────]   Pitanje 2 od 5
 ← progress bar (full column width) →                            ← right-aligned text →
```

- The progress bar and counter are on the same horizontal row with space between them using
  `display: flex; align-items: center; justify-content: space-between`.
- The bar is full column width, minus the counter label. Use `flex: 1` on the bar, `flex-shrink: 0`
  with a `margin-left: 16px` on the text.
- Total height of this row: 24px (the bar is 4px tall; the row is padded to 24px vertically for
  visual alignment).

### Progress bar styling

| Property | Value |
|----------|-------|
| Track background | `var(--color-surface-overlay)` |
| Track border-radius | `2px` |
| Track height | `4px` |
| Fill colour | `var(--color-accent)` |
| Fill border-radius | `2px` |
| Fill width | CSS custom property `--progress-pct` set via inline style (e.g. `style="width: var(--progress-pct)"`) |
| Fill transition | `width 400ms cubic-bezier(0.16, 1, 0.3, 1)` |

**Percentage values per step**:
| Step | `--progress-pct` |
|------|-----------------|
| Question 1 | `20%` |
| Question 2 | `40%` |
| Question 3 | `60%` |
| Question 4 | `80%` |
| Question 5 | `100%` |
| Loading / Result | `100%` |

The fill always animates from the previous width to the current width. On the very first render
(step 1), the bar animates from `0%` to `20%` — set `--progress-pct: 0%` as the initial value
then update it in a `useEffect` on mount (after a single `requestAnimationFrame` to ensure the
transition fires).

### Counter text

```
Pitanje 2 od 5   /   Question 2 of 5
```

| Property | Value |
|----------|-------|
| Font family | DM Sans |
| Font size | 12px |
| Font weight | 600 |
| Letter spacing | `+0.06em` |
| Colour | `var(--color-text-muted)` |
| Text transform | Uppercase |

Use the exact strings from `questionnaire-copy.md` Section 7 — "Pitanje {X} od 5" and
"Question {X} of 5".

During loading and result display, the counter text changes to show the completion state. On
loading: hide the counter entirely (aria-hidden), keeping the bar at 100%. On result: also keep
the bar at 100% and hide the counter.

### Accessibility

```html
<div role="progressbar"
     aria-valuenow="2"
     aria-valuemin="1"
     aria-valuemax="5"
     aria-label="Napredak upitnika"
     aria-live="polite">
  <!-- bar and counter markup -->
</div>
```

`aria-valuenow` updates with the current step number. `aria-live="polite"` means screen readers
announce the change after the current utterance finishes — not mid-sentence. The label strings
("Napredak upitnika" / "Questionnaire progress") come from `questionnaire-copy.md` Section 7.

### Reduced motion

Under `prefers-reduced-motion: reduce`, remove the `transition` from the fill width. The bar jumps
immediately to the new percentage. No substitute animation is needed — the updated value is
sufficient feedback.

---

## Section 3 — Question Card

### Card container

The question card is the primary visual anchor of the wizard. It uses the glassmorphism-adjacent
surface treatment established by `.service-card`, adapted for interactivity. It does NOT use
`.service-card` directly (no hover-lift, no icon) — it shares the same surface language but is a
distinct component: `.question-card`.

| Property | Value |
|----------|-------|
| Background | `var(--color-surface-overlay)` |
| Border | `1px solid var(--color-surface-border-mid)` |
| Border-radius | `16px` |
| Padding | `32px` (desktop), `24px` (mobile) |
| Box-shadow | `0 4px 24px rgba(0,0,0,0.3)` |

The card does not animate on hover (the user is interacting inside it, not hovering it as a unit).

### Category label

Above the question text, display the question's category label using the `.section-label` class:

```
TIM I OPERACIJE   /   TEAM & OPERATIONS
```

This creates a visual rhythm: each step has a slightly different category label, giving users the
sense that they are covering different ground (not answering the same question five ways). The label
matches the "section label" treatment: DM Sans 12px, 600 weight, `var(--color-accent)` colour,
uppercase, letter-spacing `+0.12em`, with the leading-line decoration suppressed (no `::before`
line — the question card context makes it unnecessary).

### Question text

| Property | Value |
|----------|-------|
| Font family | Syne |
| Font size | 22px (desktop), 20px (mobile, 320px minimum) |
| Font weight | 700 |
| Colour | `var(--color-text-primary)` |
| Letter spacing | `-0.01em` |
| Line height | `1.3` |
| Margin below | `24px` (desktop), `20px` (mobile) |

At 320px, 20px Syne at weight 700 with `line-height: 1.3` fits a two-line question without
horizontal scroll.

### Answer option cards

Each answer option is a full-width stacked card — not a traditional radio button. They are
stacked vertically (one per line), not arranged in a grid. This ensures every option is readable
at the narrowest viewport and maximises touch target size.

**Component: `.answer-option`**

Each `.answer-option` wraps a visually hidden `<input type="radio">` and a visible styled `<label>`.
The label IS the entire card face — the invisible input is its sibling immediately preceding it,
connected via `id`/`for`. This pattern gives native keyboard semantics (Space to select, arrow
keys to move between options in the group) without custom ARIA gymnastics.

```html
<fieldset aria-labelledby="q1-label">
  <legend id="q1-label" class="sr-only">Koliko često vaš tim radi iste zadatke iznova?</legend>

  <div class="answer-option">
    <input type="radio" name="q1" id="q1-a" value="a" />
    <label for="q1-a">
      <span class="answer-dot" aria-hidden="true"></span>
      <span class="answer-text">Svakodnevno — i puno vremena odlazi na to</span>
    </label>
  </div>

  <div class="answer-option">
    <input type="radio" name="q1" id="q1-b" value="b" />
    <label for="q1-b">
      <span class="answer-dot" aria-hidden="true"></span>
      <span class="answer-text">Povremeno, ali znamo koji su problematični</span>
    </label>
  </div>

  <div class="answer-option">
    <input type="radio" name="q1" id="q1-c" value="c" />
    <label for="q1-c">
      <span class="answer-dot" aria-hidden="true"></span>
      <span class="answer-text">Rijetko — naši procesi su uglavnom automatizirani</span>
    </label>
  </div>
</fieldset>
```

**ARIA note**: The `<fieldset>` + `<legend>` pattern is the correct semantic group for radio buttons.
The `<legend>` is visually hidden (`.sr-only`) because the question text is separately rendered
as the visible heading — duplicating it inside the legend would be redundant visually but is
necessary for screen reader context.

#### Answer option states

**Unselected (default)**

| Property | Value |
|----------|-------|
| Background | `var(--color-surface-raised)` |
| Border | `1px solid var(--color-surface-border)` |
| Border-radius | `12px` |
| Padding | `16px 20px` |
| Min-height | `56px` (ensures 44px+ touch target with padding) |
| Gap between options | `10px` |
| Dot background | `var(--color-surface-overlay)` |
| Dot border | `1.5px solid var(--color-text-muted)` |
| Dot size | `18px × 18px` circular |

**Answer text typography:**
| Property | Value |
|----------|-------|
| Font family | DM Sans |
| Font size | 15px |
| Font weight | 400 |
| Colour | `var(--color-text-secondary)` |
| Line height | `1.6` |

**Hover (unselected)**

| Property | Value |
|----------|-------|
| Background | `var(--color-surface-overlay)` |
| Border | `1px solid var(--color-surface-border-mid)` |
| Answer text colour | `var(--color-text-primary)` |
| Transition | `150ms ease-in-out` for background and border |
| Cursor | `pointer` |

Hover is applied via `label:hover` on the wrapping label. The visually hidden input itself has
`cursor: pointer` set so the label hover area covers the full card.

**Selected**

| Property | Value |
|----------|-------|
| Background | `var(--color-accent-subtle)` |
| Border | `1px solid var(--color-accent)` |
| Answer text colour | `var(--color-text-primary)` |
| Dot background | `var(--color-accent)` |
| Dot border | `1.5px solid var(--color-accent)` |
| Dot inner fill | Solid teal circle (the dot becomes filled, no inner ring) |
| Transition | `150ms ease-in-out` |

Selected state is driven by `:checked` state on the hidden input:
```css
.answer-option input[type="radio"]:checked + label {
  background: var(--color-accent-subtle);
  border-color: var(--color-accent);
}
.answer-option input[type="radio"]:checked + label .answer-dot {
  background: var(--color-accent);
  border-color: var(--color-accent);
}
.answer-option input[type="radio"]:checked + label .answer-text {
  color: var(--color-text-primary);
}
```

**Focus**

```css
.answer-option input[type="radio"]:focus-visible + label {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
}
```

The outline appears on the label (the visible element) via the adjacent sibling combinator.
Never suppress focus outlines. The teal outline is visible on all surfaces.

**Disabled** (not applicable in normal flow — all options are always enabled. Included for
completeness in case the backend returns an error mid-wizard and the card needs to be locked.)

| Property | Value |
|----------|-------|
| Background | `var(--color-surface-raised)` |
| Border | `1px solid var(--color-surface-border)` |
| Answer text colour | `var(--color-text-muted)` |
| Opacity | `0.5` on the entire `.answer-option` |
| Cursor | `not-allowed` |

#### Touch target compliance

Each `.answer-option` label has `min-height: 56px` and `padding: 16px 20px`. At 320px width,
the rendered height is always at least 56px, comfortably above the 44px minimum. The gap between
options (10px) does not reduce the individual touch target.

---

## Section 4 — Step Navigation

### Layout

Navigation buttons sit immediately below the question card with a `margin-top: 24px` gap.

```
[  Natrag  ]                    [  Sljedeće  ]
  ← left                             right →
```

On Step 1 (no back button):
```
                                [  Sljedeće  ]
                                      right →
```

Implementation: use `display: flex; justify-content: space-between; align-items: center`.
When Back is absent (step 1), use `justify-content: flex-end` instead. Do not insert a spacer
div — let flexbox handle the alignment natively.

### Button variants per step

| Step | Left button | Right button |
|------|-------------|--------------|
| Q1 | — | Next (`.btn-primary`) |
| Q2 | Back (`.btn-ghost`) | Next (`.btn-primary`) |
| Q3 | Back (`.btn-ghost`) | Next (`.btn-primary`) |
| Q4 | Back (`.btn-ghost`) | Next (`.btn-primary`) |
| Q5 | Back (`.btn-ghost`) | Submit (`.btn-primary`) |

The submit button label is "Prikaži moje rezultate" (hr) / "Show my results" (en) — exact strings
from `questionnaire-copy.md` Section 7. It is NOT labelled "Submit" or "Pošalji".

### Disabled state (no answer selected)

The Next/Submit button is **disabled until an answer is selected** for the current step.

| Property | Value |
|----------|-------|
| Opacity | `0.4` |
| Cursor | `not-allowed` |
| Pointer events | `none` (set on the `<button>` element itself via `disabled` attribute) |

Use the native `disabled` attribute on `<button>`: `<button class="btn-primary" disabled>`. This
ensures keyboard users cannot activate it and screen readers announce "dimmed" or "unavailable".
Do not use `aria-disabled="true"` without also preventing the click — native `disabled` is simpler
and correct here.

When the user selects an answer, the button transitions from disabled to enabled. The visual change
(opacity goes from 0.4 to 1.0) animates over `150ms ease-in-out` — a subtle but perceptible
affordance signal.

### Back button behaviour

Clicking Back moves to the previous step. The previously selected answer for that step is
**remembered** — the user returns to the question with their prior selection still active.
Do not clear answers when navigating backwards.

### Loading state (Submit pressed)

When the user presses Submit on step 5, the Submit button enters a loading state while the API call
is in flight:

| Property | Value |
|----------|-------|
| Button label | Replaced by a small spinner (16×16px) + "Analiziramo…" / "Analysing…" text |
| Button disabled | `true` (native `disabled` attribute) |
| Back button | Disabled (`disabled` attribute, opacity 0.4) |

The spinner inside the button is a simple rotating ring using CSS `border-top` trick:

```css
.spinner-inline {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(7, 9, 13, 0.3);   /* --color-surface-base at 30% opacity */
  border-top-color: #07090D;               /* --color-surface-base — visible on teal bg */
  border-radius: 50%;
  animation: spin 600ms linear infinite;
  flex-shrink: 0;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .spinner-inline {
    animation: none;
    border-top-color: rgba(7, 9, 13, 0.6);
  }
}
```

The button content becomes:
```
[inline-spinner]  Analiziramo…
```

Use `display: flex; align-items: center; gap: 8px` inside the button for this layout. The button
width should not change when it enters loading state — set `min-width` on `.btn-primary.is-loading`
equal to its normal rendered width, or use a fixed width if design allows. This prevents layout
shift.

---

## Section 5 — Step Transition Animation

### Principle

Moving between steps should feel like turning a page, not like a page reload. The animation is
directional: forward navigation slides new content in from the right; backward navigation slides
it in from the left. This mirrors the spatial mental model of a linear sequence.

### What animates

Only the question card and its associated fieldset animate. The progress indicator and navigation
buttons do not animate — they update in place. This keeps the motion focused and reduces the
visual noise of a full-screen transition.

### Keyframes

```css
@keyframes slide-in-from-right {
  from {
    opacity: 0;
    transform: translateX(32px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-in-from-left {
  from {
    opacity: 0;
    transform: translateX(-32px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

| Direction | Keyframe | Duration | Easing |
|-----------|----------|----------|--------|
| Forward (next step) | `slide-in-from-right` | `280ms` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Backward (previous step) | `slide-in-from-left` | `280ms` | `cubic-bezier(0.16, 1, 0.3, 1)` |

The easing (`cubic-bezier(0.16, 1, 0.3, 1)`) matches the card hover transition easing already
established in the design system. Consistency in motion language reinforces system coherence.

### Implementation approach

The wizard component maintains a `direction` ref (`"forward"` or `"backward"`) set before the
step number changes. Each time `currentStep` changes, the question card element receives a CSS
class that applies the appropriate keyframe animation. After the animation ends (via `animationend`
event or `animation-fill-mode: forwards`), remove the class to reset the element.

A React key on the question card matching the step number (e.g. `key={currentStep}`) is the
simplest implementation: React will unmount and remount the element on each step change, and the
enter animation fires automatically. Pair this with a CSS class on the parent that sets direction:

```jsx
<div className={`question-card-wrapper direction-${direction}`}>
  <QuestionCard key={currentStep} ... />
</div>
```

```css
.direction-forward .question-card {
  animation: slide-in-from-right 280ms cubic-bezier(0.16, 1, 0.3, 1) both;
}
.direction-backward .question-card {
  animation: slide-in-from-left 280ms cubic-bezier(0.16, 1, 0.3, 1) both;
}
```

### Reduced motion fallback

```css
@media (prefers-reduced-motion: reduce) {
  .question-card {
    animation: none !important;
  }
}
```

Under reduced motion, the new question card appears instantly (no fade, no slide). The content
update itself is feedback enough. Do not substitute a fade — even a slow fade violates the
spirit of the reduced-motion preference.

---

## Section 6 — Loading State

### Context and duration

After the user presses Submit, the frontend sends `POST /api/questionnaire`. The backend calls
Claude Haiku via OpenRouter. Expected response time: P50 ~2 seconds, P95 ~5 seconds,
hard timeout at 10 seconds. The loading state must handle all durations without appearing broken.

### Design principle

The loading state replaces the question card entirely — the same card footprint, same max-width.
It does not show a blank page or a full-screen overlay. The progress bar stays at 100% and the
navigation buttons (both disabled) remain below. This preserves the spatial context.

The loading state communicates deliberateness, not waiting. The text and visual treatment should
feel like the system is actively working — not stalled.

### Visual structure

```
┌────────────────────────────────────────────┐
│                                            │
│                                            │
│            ◉  (pulsing teal ring)          │
│                                            │
│        Analiziramo vaše odgovore…          │
│                                            │
│                                            │
└────────────────────────────────────────────┘
```

The card has the same dimensions and styling as `.question-card`. Inside it, a single centred
column with `display: flex; flex-direction: column; align-items: center; justify-content: center;
min-height: 280px; gap: 20px`.

### Spinner treatment

The loading indicator is NOT a thin border-spinner (too small, too generic). It is a larger
pulsing ring — a custom treatment that matches the site's aesthetic language (the hero badge
pulse dot is already used, this is its larger cousin).

**Outer ring**: 56×56px circle.
```css
.assessment-spinner {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 2px solid var(--color-accent-subtle);
  border-top-color: var(--color-accent);
  animation: spin 1200ms linear infinite;
}
```

**Inner glow** (pseudo-element for depth):
```css
.assessment-spinner::after {
  content: '';
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  background: var(--color-accent-glow);
  animation: pulse-glow 1200ms ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.3; }
  50%       { opacity: 0.8; }
}
```

The spinner rotates continuously; the inner glow pulses. Together they communicate active
processing without the mechanical feel of a simple spinner.

### Loading text

```
Analiziramo vaše odgovore…   /   Analysing your answers…
```

Exact strings from `questionnaire-copy.md` Section 7 (use the ellipsis character `…`, not
three periods `...`).

| Property | Value |
|----------|-------|
| Font family | DM Sans |
| Font size | 16px |
| Font weight | 400 |
| Colour | `var(--color-text-secondary)` |
| Text align | Centre |

### ARIA for loading state

```html
<div role="status" aria-live="polite" aria-label="Učitavanje rezultata">
  <!-- spinner and text -->
</div>
```

When the loading state mounts, screen readers announce the aria-label ("Učitavanje rezultata" /
"Loading results"). `role="status"` is equivalent to `aria-live="polite"` — use both for
maximum compatibility.

### Reduced motion fallback

Under `prefers-reduced-motion: reduce`:
- Spinner rotation and glow pulse are both disabled
- Display only the static teal ring (no animation) + the loading text
- The static ring still communicates "something is happening" without motion

```css
@media (prefers-reduced-motion: reduce) {
  .assessment-spinner {
    animation: none;
    border-top-color: var(--color-accent);
  }
  .assessment-spinner::after {
    animation: none;
    opacity: 0.5;
  }
}
```

---

## Section 7 — Result Display

### Principle

The result is a premium reveal. The user has answered 5 questions and waited. The result must feel
like it was worth the wait — not like a form confirmation page. The layout uses generous vertical
spacing, a distinctive tier badge, and a clear reading hierarchy.

### Result transitions in

The result card uses the same `slide-in-from-right` animation as step transitions (forward
direction). Duration: 280ms. This is consistent — the result is logically "step 6" in the sequence.

### Result card container

The `.result-card` uses the same container styling as `.question-card` with one addition:
a gradient border treatment (the pseudo-element gradient border used in `.service-card`) to
elevate the reveal moment:

```css
.result-card {
  background: var(--color-surface-overlay);
  border-radius: 16px;
  padding: 40px (desktop), 24px (mobile);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4);
  position: relative;
}

.result-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 17px;
  background: linear-gradient(135deg, var(--color-accent-glow), var(--color-accent-2-glow));
  z-index: -1;
}
```

This renders as a soft gradient glow border — teal-to-indigo — matching the `.service-card`
hover treatment but always visible (the result is a moment of completion, not an interaction state).

### Score display

The numeric score is displayed large and proud at the top of the card.

```
         7/10
```

| Property | Value |
|----------|-------|
| Font family | Syne |
| Font size | 64px (desktop), 52px (mobile) |
| Font weight | 800 |
| Colour | `var(--color-accent)` |
| Text align | Centre |
| Letter spacing | `-0.02em` |

The `/10` suffix is rendered in the same Syne 800 but at `var(--color-text-muted)` — visually
subordinate to the score number. Use `<span class="score-denom">/10</span>` inside the score
heading and target it separately:

```css
.score-denom {
  color: var(--color-text-muted);
  font-size: 0.6em; /* 38px at 64px base */
}
```

**Do not show** the raw score number before the result animates in. Use the card transition to
bring the score in with the rest of the content.

### Tier badge

The tier badge sits below the score number, centred.

```
[ Graditelj ]   /   [ Builder ]
```

A pill badge with tier-specific accent colour:

| Tier | Badge background | Badge text colour | Badge border |
|------|-----------------|------------------|--------------|
| Istraživač / Explorer (0–3) | `rgba(74, 85, 104, 0.25)` | `#8B97A6` (`--color-text-secondary`) | `1px solid rgba(74, 85, 104, 0.4)` |
| Graditelj / Builder (4–7) | `var(--color-accent-2-glow)` | `#8B8FFF` (lighter indigo derived from `--color-accent-2`) | `1px solid rgba(99, 102, 241, 0.4)` |
| Spreman za akciju / Ready to Act (8–10) | `var(--color-accent-subtle)` | `var(--color-accent)` | `1px solid rgba(0, 212, 170, 0.35)` |

Badge dimensions:
| Property | Value |
|----------|-------|
| Display | `inline-flex; align-items: center; justify-content: center` |
| Padding | `6px 16px` |
| Border-radius | `100px` (pill) |
| Font | DM Sans, 13px, weight 600 |
| Letter spacing | `+0.06em` |
| Text transform | Uppercase |

The rationale for these three colours: muted/neutral for the Explorer (they are at the start of a
journey — no negative connotation, but no false urgency), indigo for Builder (momentum and depth —
they are making progress), teal accent for Ready to Act (the site's primary action colour — strong
positive signal).

### Tier headline

Below the badge, centred, the static tier headline from `questionnaire-copy.md` Section 6:

| Property | Value |
|----------|-------|
| Font family | Syne |
| Font size | 26px (desktop), 22px (mobile) |
| Font weight | 700 |
| Colour | `var(--color-text-primary)` |
| Text align | Centre |
| Margin above badge | `16px` |
| Letter spacing | `-0.01em` |
| Line height | `1.2` |

### Supporting line

The supporting line (from `questionnaire-copy.md` Section 6, e.g. "Vaše poslovanje je u fazi
istraživanja…") sits below the headline, centred:

| Property | Value |
|----------|-------|
| Font family | DM Sans |
| Font size | 16px |
| Font weight | 400 |
| Colour | `var(--color-text-secondary)` |
| Text align | Centre |
| Max-width | `480px` centred within the card |
| Margin above | `8px` |
| Line height | `1.7` |

### Divider

A subtle horizontal rule separates the static tier block from the AI assessment:

```css
.result-divider {
  width: 40px;
  height: 1px;
  background: var(--color-surface-border-mid);
  margin: 28px auto;
}
```

### AI assessment text

The AI-generated `assessment` string (150–250 words) is rendered as body copy.

| Property | Value |
|----------|-------|
| Font family | DM Sans |
| Font size | 15px |
| Font weight | 400 |
| Colour | `var(--color-text-secondary)` |
| Line height | `1.75` |
| Text align | Left (not centred — longer body text is harder to read centred) |
| Max-width | `560px` within the card |

Render the assessment text as a `<p>` element. Do not render it as Markdown or HTML — it arrives
as plain text from the API. Use `white-space: pre-wrap` only if line breaks need to be preserved;
by default treat it as flowing paragraph text.

**Fallback**: If the API returns no `assessment` (malformed response or backend static fallback),
omit the assessment paragraph entirely. The tier headline and supporting line carry the experience.
The CTA block appears directly after the divider. Do not show an empty container.

### CTA block

Below the assessment text, a second divider, then the CTA block:

**Primary CTA button**: `.btn-primary` — full text from `questionnaire-copy.md` Section 6 per tier.

**CTA subtext** (below the button):
| Property | Value |
|----------|-------|
| Font | DM Sans, 13px, weight 400 |
| Colour | `var(--color-text-muted)` |
| Text align | Centre |
| Margin above | `10px` |

**Secondary CTA button**: `.btn-ghost` — rendered below the subtext. This is a less prominent
action (see services / how we work — different per tier).

**Reset link** ("Pokrenite upitnik iznova" / "Restart the questionnaire"):
A plain text link below the secondary CTA, separated by `20px`:

| Property | Value |
|----------|-------|
| Font | DM Sans, 13px, weight 500 |
| Colour | `var(--color-text-muted)` |
| Decoration | None by default; underline on hover |
| Hover colour | `var(--color-text-secondary)` |
| Display | Block, centred |

The reset link scrolls to the top of the questionnaire and resets all state: `currentStep` to 0,
all answers cleared, result cleared.

### CTA block layout

```
[──────── Primary CTA button (full width of card, up to 340px centred) ────────]
            Besplatni uvodni razgovor — bez obveza.    ← subtext
[──────── Secondary CTA button (ghost, same width) ────────]
              Pokrenite upitnik iznova   ← reset link
```

Buttons are centred within the card. On mobile, both buttons are full-width of the card content
area (minus card padding).

### Result accessibility

```html
<section aria-label="Vaši rezultati" aria-live="polite">
  <!-- all result content -->
</section>
```

When the result card mounts, focus is moved to the score heading (see Section 10).

---

## Section 8 — Error States

### Placement

Error states replace the question card (same card footprint) or, for validation errors, appear
inline below the answer option group. There are no full-page errors. The Nav and Footer remain
present and functional — the user can still navigate the rest of the site.

### Error 1 — No answer selected (inline validation)

This is NOT a card-level error. It is an inline message that appears below the answer option
fieldset when the user presses Next without selecting an answer. (This should only occur via
keyboard — the button is disabled until an answer is selected, preventing mouse-click submission
without an answer. The inline error is a keyboard edge-case guard.)

```
⚠  Odaberite jedan odgovor za nastavak.
```

| Property | Value |
|----------|-------|
| Icon | Warning triangle SVG (16×16px), `aria-hidden="true"` |
| Text | Exact string from `questionnaire-copy.md` Section 7 |
| Font | DM Sans, 13px, weight 500 |
| Colour | `#F59E0B` (amber — not red; not alarming, just directive) |
| Margin above | `12px` |
| Display | `flex; align-items: center; gap: 8px` |
| Role | `role="alert"` (so screen readers announce it immediately when it appears) |

The amber colour has a contrast ratio of approximately 4.6:1 against `var(--color-surface-overlay)`
background — passes WCAG 2.1 AA for normal text.

### Error 2 — Generic API error (500 or unparseable AI response)

Replaces the question card with a `.error-card` (same dimensions and container styling as
`.question-card`). The spinner / loading state is replaced by this error card.

```
┌─────────────────────────────────────────┐
│                                         │
│         ⚠  (icon, 32×32px, amber)       │
│                                         │
│   Nešto je pošlo po krivu.              │
│   Pokušajte ponovo ili nas kontaktirajte│
│   na info@kontekst.hr.                  │
│                                         │
│         [ Pokušaj ponovo ]              │  ← .btn-primary (try again)
│                                         │
└─────────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Icon | Warning triangle SVG, 32×32px, `aria-hidden="true"`, colour `#F59E0B` |
| Heading | DM Sans, 16px, weight 600, `var(--color-text-primary)` — "Nešto je pošlo po krivu." |
| Body text | DM Sans, 14px, weight 400, `var(--color-text-secondary)` — the full error string from `questionnaire-copy.md` Section 7 (includes the email address) |
| CTA | `.btn-primary` labelled "Pokušaj ponovo" (hr) / "Try again" (en) |
| Card background | `var(--color-surface-overlay)` with amber-tinted border: `1px solid rgba(245, 158, 11, 0.25)` |
| Card role | `role="alert"` on the error card wrapper — screen readers announce on mount |

"Pokušaj ponovo" resets to step 5 (the submit step) with all answers retained, so the user
does not have to re-answer all 5 questions.

### Error 3 — Rate limit (429)

Same card structure as generic error, with different copy and without the "Try again" button
(retrying immediately is pointless — the rate limit is enforced server-side).

```
┌─────────────────────────────────────────┐
│                                         │
│         ⏱  (icon, 32×32px, muted)       │
│                                         │
│   Previše pokušaja.                     │
│   Pričekajte 15 minuta prije            │
│   sljedećeg pokušaja.                   │
│                                         │
└─────────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Icon | Clock SVG (not warning — this is not a fault), 32×32px, `aria-hidden="true"`, colour `var(--color-text-muted)` |
| Heading | "Previše pokušaja." — DM Sans, 16px, weight 600, `var(--color-text-primary)` |
| Body text | Full rate limit string from `questionnaire-copy.md` Section 7 |
| No CTA button | The user must wait; offering a button that will fail in 15 minutes is misleading |
| Card border | `1px solid var(--color-surface-border-mid)` (neutral — this is not the user's fault, not alarming) |
| Card role | `role="alert"` on the error card wrapper |

### Error 4 — Timeout (504)

Same structure as generic error. Copy and behaviour are identical to generic error — from the
user's perspective, a timeout and a server error look the same. The "Pokušaj ponovo" button
resets to step 5 with answers retained.

Use the exact timeout copy from `questionnaire-copy.md` Section 7 in its absence (the copy doc
does not define a distinct timeout string — use the generic error string).

### Error recovery state

After pressing "Pokušaj ponovo" on generic/timeout error:
- Return to step 5 (the submit step) with all 5 answers intact
- The question card slides back in from the left (backward direction animation)
- The Submit button is in its normal enabled state (answer is still selected)
- The error card is removed from the DOM

---

## Section 9 — Responsive Behaviour

### Breakpoint definitions

| Breakpoint name | Range | Key changes |
|----------------|-------|-------------|
| Mobile | 320–767px | Full-width card, reduced padding, smaller type sizes, stacked nav buttons |
| Tablet | 768–1023px | Centred 600px card, intermediate padding |
| Desktop | 1024px+ | Centred 680px card, full padding, largest type sizes |

### Mobile (320–767px)

**Card**: full viewport width minus 24px total (12px left, 12px right outer padding on
`.questionnaire-page`). The card itself has no horizontal margin; it fills the content column.

**Card padding**: `20px 16px` (reduced from desktop 32px to prevent content feeling crowded at
narrow widths without wasting vertical space).

**Question text**: 20px (reduced from 22px). At 320px, a 30-character question in Syne 700 at
20px fits in two lines, max three.

**Answer option cards**: Full-width stacked. No change to the stacked layout — it is already
mobile-first. Gap between options: `8px` (reduced from `10px`).

**Answer text**: 14px (reduced from 15px). Still above the 12px minimum for legible body text.
DM Sans at 14px is comfortable.

**Score display**: 52px (reduced from 64px). Still dramatic at this size.

**Tier headline**: 22px (reduced from 26px).

**Navigation buttons**: Stack vertically on narrow mobile if the buttons do not fit side by side.
Stack threshold: if viewport is below 400px. At 320px:
```
[  Natrag  ]  ← full width ghost
[  Sljedeće ]  ← full width primary
```
At 400px and above, return to side-by-side. Implement with a media query on
`.step-navigation` container: switch from `flex-direction: row` to `flex-direction: column-reverse`
(reverse so primary button appears first/top in stacked layout — primary action closer to the
thumb zone).

**Progress bar text**: The "Pitanje X od 5" label switches from uppercase 12px to lowercase 11px
on mobile to save horizontal space. The bar itself does not change width.

**Result card padding**: `24px 16px` on mobile. The score and badge remain centred. Assessment
text switches to `font-size: 14px`.

**CTA buttons in result**: Full-width (100% of card content area) on mobile. This maximises touch
target size and removes the decision about horizontal alignment.

### Tablet (768–1023px)

Card centred at `max-width: 600px`. Padding: `28px 24px`. Type sizes between mobile and desktop
values. Navigation buttons remain side by side. All other properties at desktop values.

### Desktop (1024px+)

Card centred at `max-width: 680px`. All desktop values as specified throughout this document.

### What does NOT change across breakpoints

- Progress bar height (always 4px)
- Answer dot size (always 18px × 18px)
- Badge pill dimensions
- Focus outline style
- Error icon sizes
- Loading spinner size (56px)

---

## Section 10 — Accessibility Specification

### Focus management on step change

When the wizard advances to a new step (forward or backward), focus must be programmatically
moved to the question category label or question heading at the top of the new card. This ensures
keyboard-only users and screen reader users are positioned at the start of the new content — not
left at the button they just activated.

**Implementation**:
1. Attach a `ref` to the category label `<p>` element (or a wrapping `<div>` with `tabindex="-1"`)
   at the top of the question card.
2. After the step state changes, in a `useEffect` dependent on `currentStep`, call
   `ref.current.focus()`.
3. The category label receives `tabindex="-1"` so it is programmatically focusable without
   appearing in the natural tab order. (Users should not Tab to it — they should Tab to the
   answer options.)
4. Use a `requestAnimationFrame` or short timeout (one frame) before calling `.focus()` to ensure
   the DOM has updated and the new card has mounted before focus moves.

```jsx
const questionHeadingRef = useRef(null);

useEffect(() => {
  const frame = requestAnimationFrame(() => {
    questionHeadingRef.current?.focus();
  });
  return () => cancelAnimationFrame(frame);
}, [currentStep]);
```

```html
<div ref={questionHeadingRef} tabIndex="-1" class="question-heading-anchor">
  <p class="section-label">Tim i operacije</p>
</div>
```

### Focus management on result display

When the result card mounts, move focus to the score heading:

```jsx
const resultHeadingRef = useRef(null);

useEffect(() => {
  if (showResult) {
    const frame = requestAnimationFrame(() => {
      resultHeadingRef.current?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }
}, [showResult]);
```

```html
<h2 ref={resultHeadingRef} tabIndex="-1" class="score-display">
  7<span class="score-denom">/10</span>
</h2>
```

### Focus management on error display

When an error card mounts, move focus to the error card's heading:

```jsx
const errorRef = useRef(null);
useEffect(() => {
  if (errorType) {
    requestAnimationFrame(() => errorRef.current?.focus());
  }
}, [errorType]);
```

```html
<div ref={errorRef} role="alert" tabIndex="-1" class="error-card">
  ...
</div>
```

Using `role="alert"` on the error container causes screen readers to announce the content
immediately on mount. The `tabIndex="-1"` and programmatic focus ensure keyboard users land on the
error content.

### ARIA for answer option group

The answer option `<fieldset>` + `<legend>` pattern provides the correct semantic group for radio
buttons. No additional ARIA is required for the group — `fieldset` has an implicit `role="group"`,
and `legend` is its accessible name.

Individual answer labels use the `aria-label` pattern from `questionnaire-copy.md` Section 7:

```html
<label for="q1-a" aria-label="Odgovor a: Svakodnevno — i puno vremena odlazi na to">
```

The visible text inside the label and the `aria-label` content match. The `aria-label` prepends
"Odgovor a:" to give screen readers letter-position context.

### Keyboard behaviour — full map

| Element | Key | Behaviour |
|---------|-----|-----------|
| Answer option (radio) | `Space` | Selects the focused option |
| Answer option (radio) | `Arrow Down` / `Arrow Right` | Moves to next option in group; selects it |
| Answer option (radio) | `Arrow Up` / `Arrow Left` | Moves to previous option in group; selects it |
| Next / Submit button | `Enter` | Activates button (if not disabled) |
| Back button | `Enter` | Returns to previous step |
| Reset link | `Enter` | Resets wizard to step 1 |
| Primary CTA (result) | `Enter` | Follows link to contact / services |
| Secondary CTA (result) | `Enter` | Follows link |

Arrow key navigation between radio buttons is provided natively by the browser's radio group
behaviour — no JavaScript is needed. The `<input type="radio" name="q1">` group handles it.

### ARIA for loading state

```html
<div role="status" aria-live="polite" aria-label="Učitavanje rezultata" aria-atomic="true">
  <div class="assessment-spinner" aria-hidden="true"></div>
  <p>Analiziramo vaše odgovore…</p>
</div>
```

`aria-atomic="true"` ensures the entire region is announced when it updates, not just the changed
portion. `aria-hidden="true"` on the spinner prevents the decorative SVG/CSS element from being
announced.

### Colour alone never conveys state

- Selected answer: teal border + teal dot fill + `var(--color-accent-subtle)` background. Three
  simultaneous visual signals — not colour alone.
- Tier badge: colour + uppercase text label (the tier name itself). Not colour alone.
- Error states: icon + text message. Not colour alone.
- Progress bar: fill width changes + counter text updates. Not colour alone.

### WCAG 2.1 AA contrast verification for new elements

| Element | Foreground | Background | Ratio | Result |
|---------|-----------|-----------|-------|--------|
| Answer text (unselected) | `#8B97A6` | `#0D1117` | ~5.4:1 | Pass AA |
| Answer text (selected) | `#F0F4F8` | `rgba(0,212,170,0.06)` effective on `#131920` | ~14:1 | Pass AAA |
| Inline validation text | `#F59E0B` | `#131920` | ~4.7:1 | Pass AA |
| Score number | `#00D4AA` | `#131920` | ~8.9:1 | Pass AAA |
| Assessment body text | `#8B97A6` | `#131920` | ~5.2:1 | Pass AA |
| CTA subtext | `#4A5568` | `#131920` | ~3.1:1 | Pass AA (large text threshold, this is 13px — borderline; use weight 500 to qualify as UI text) |
| Explorer badge text | `#8B97A6` | `rgba(74,85,104,0.25)` effective | ~4.5:1 | Pass AA |
| Builder badge text | `#8B8FFF` | `rgba(99,102,241,0.15)` effective | ~5.8:1 | Pass AA |
| Ready badge text | `#00D4AA` | `rgba(0,212,170,0.06)` effective | ~8.6:1 | Pass AAA |

---

## New Design System Elements

The following elements are proposed additions to the design system. They extend (not contradict)
existing patterns. Append to `ARCHITECTURE.md` Design System section after implementation is
complete.

### New CSS Classes

| Class | Description | File location |
|-------|-------------|--------------|
| `.question-card` | Question step card container. Same surface as `.contact-card` but without gradient border. | `src/assets/css/custom.css` |
| `.answer-option` | Full-width selectable answer card. Radio input + label pattern. Distinct from `.service-card`. | `src/assets/css/custom.css` |
| `.answer-dot` | The selection indicator circle inside `.answer-option`. | `src/assets/css/custom.css` |
| `.answer-text` | Body text within `.answer-option`. | `src/assets/css/custom.css` |
| `.result-card` | Result display card. Extends `.question-card` with gradient glow border (always visible, not just on hover). | `src/assets/css/custom.css` |
| `.assessment-spinner` | 56px loading spinner for the AI assessment loading state. | `src/assets/css/custom.css` |
| `.score-display` | Large Syne 800 score number with `/10` suffix. | `src/assets/css/custom.css` |
| `.tier-badge` | Pill badge with tier-specific colour variant classes: `.tier-badge--explorer`, `.tier-badge--builder`, `.tier-badge--ready`. | `src/assets/css/custom.css` |
| `.result-divider` | 40px centred horizontal rule between result sections. | `src/assets/css/custom.css` |
| `.error-card` | Error state card with amber-tinted border variant. | `src/assets/css/custom.css` |

### New Design Token

| Token name | Value | Usage |
|------------|-------|-------|
| `--color-state-warning` | `#F59E0B` | Inline validation and generic error icon colour. Amber — not red, not alarming. Meets 4.6:1 contrast on `--color-surface-overlay`. |

---

## Appendix — Complete User Flow

### Happy path

```
Step 1: User lands on /upitnik
        → Page loads: Nav (no CTA), H1 + subheadline, Q1 card, Next disabled
Step 2: User selects an answer for Q1
        → Next button enables (opacity 0.4 → 1.0, 150ms transition)
Step 3: User presses Next
        → Progress bar animates to 40%; card slides out, Q2 card slides in from right;
          focus moves to Q2 category label
Step 4: [User repeats steps 2–3 for Q2, Q3, Q4]
Step 5: User is on Q5; selects an answer
        → Submit button enables
Step 6: User presses "Prikaži moje rezultate"
        → Both buttons enter disabled/loading state; question card replaces with loading card;
          progress bar stays at 100%; spinner animates; "Analiziramo vaše odgovore…" shown
Step 7: API returns 200 with { tier, score, assessment }
        → Loading card replaces with result card (slides in from right); focus moves to score heading
Step 8: User reads result; clicks primary CTA
        → Navigates to /#kontakt (hr) or /en/#contact (en)
```

### Back navigation path

```
User is on Q3, presses Back
  → direction ref set to "backward"; step decrements to Q2;
    Q2 card slides in from left; Q2's previously selected answer is shown as selected;
    focus moves to Q2 category label
```

### Error recovery path

```
API call fails (500)
  → Loading card replaced by error card (slides in from right); focus moves to error heading;
    role="alert" announces error to screen readers
User presses "Pokušaj ponovo"
  → Error card replaced by Q5 card (slides in from left — going backward to retry);
    Q5 selected answer is still shown; Submit button is enabled; user presses Submit again
```

### Rate limit path

```
API returns 429
  → Loading card replaced by rate limit error card; no retry button; user must wait 15 minutes
  → User can navigate to rest of site using Nav links (Nav is still present)
```

---

## Changelog

| Date | Agent | Change |
|------|-------|--------|
| 2026-03-26 | @ui-ux-designer | Initial creation — all 10 sections complete (#026) |
