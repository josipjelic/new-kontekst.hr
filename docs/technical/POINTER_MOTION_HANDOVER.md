<!--
Owner: technical spec for @frontend-developer; UX rationale aligns with Design System in ARCHITECTURE.md.
Update trigger: When pointer motion is implemented, revised, or removed.
-->

# Pointer-driven motion — implementation plan & handover

> **Audience**: `@frontend-developer`  
> **Status**: **P0–P2 implemented** (global pointer vars + Hero parallax/spotlight + Services card tilt). P3–P6 remain optional.  
> **Related**: Design tokens and interaction baseline in `docs/technical/ARCHITECTURE.md` (Design System, Interaction Patterns)

**Implemented files**: `src/hooks/usePointerMotion.js`, `src/hooks/useServiceCardTilt.js`, `src/hooks/usePointerMotion.test.jsx`, `src/App.jsx`, `src/components/hr/Hero.jsx`, `src/components/hr/Services.jsx`, `src/assets/css/custom.css`.

## 1. Goal

Add **subtle, modern** motion that **reacts to pointer position** on desktop fine pointers, without hurting readability, trust (B2B), accessibility, or Core Web Vitals. Croatian copy and semantic structure stay unchanged.

## 2. Non-goals

- No new dependencies (no animation libraries required for v1).
- No information conveyed **only** via pointer position.
- No `setState` / re-renders on every pointer event.
- No full-viewport parallax opposing scroll or large rotations on typography.

## 3. UX constraints (must respect)

| Topic | Rule |
|-------|------|
| Global background influence | Normalized pointer effect roughly **±2–6%** of viewport equivalent in `translate` |
| Foreground / cards | **≤ ~2–3°** tilt when hover-scoped; or **±1–3px** shift for highlights |
| Opacity / glow deltas | **≤ ~0.08–0.12**; reuse `--color-accent-glow`, `--color-accent-subtle` |
| Smoothing | **Lerp** toward target (e.g. factor **0.08–0.15** per frame at 60fps) — lag behind cursor |
| Rest on leave | Ease to neutral in **~300–500ms** when pointer leaves window/section (unless reduced motion) |
| Layering | **One** global ambient system + **at most one** local accent pattern per section in view — avoid stacking at full intensity |

## 4. Architecture

### 4.1 Global pipeline

1. Add `usePointerMotion` (or `PointerMotionProvider` + hook) mounted from `App.jsx` (alongside `useScrollReveal`).
2. Attach **`pointermove`** on `document` (or window); store **clientX/clientY** in **refs**.
3. Run **one** `requestAnimationFrame` loop:
   - Read target from refs; **lerp** smoothed values.
   - Write **CSS custom properties** on `document.documentElement` (or a root wrapper), e.g.:
     - `--pointer-nx`, `--pointer-ny` in **[-1, 1]** (0 = center), or [0,1] with 0.5 center — pick one convention and document it in code comments.
4. On `visibilitychange` → `hidden`, **cancel** rAF and reset vars to neutral.
5. On `resize` / orientation change, reset or re-normalize to avoid stuck transforms.

**Critical**: Do not call `setState` in the rAF path for global motion.

### 4.2 Section-local effects (cards, timeline)

- For **service cards**: on `pointerenter` / `pointerleave` and `pointermove` **while hovered**, compute **local** normalized coords relative to **card bounding rect**; set `--local-nx`, `--local-ny` on the card element (or inline `transform` from a ref).
- **`getBoundingClientRect`** only for the **active** hovered card, not for every card each frame.
- **Mobile / coarse pointer** (`matchMedia('(pointer: coarse)')` or `(hover: none)`): **disable** tilt and heavy local effects; keep tap/hover CSS as today.

### 4.3 CSS integration

- Add rules in **`src/assets/css/custom.css`** (and Tailwind `@layer` only if utilities are cleaner) that consume:
  - Global: orb / grid / optional fixed **spotlight** `::before` using `radial-gradient` + `translate` from `calc(var(--pointer-nx) * …)`.
  - Cards: `perspective` + `rotateX` / `rotateY` with `clamp()` on degrees.
- Decorative layers should be **siblings** behind content, not the same nodes as `.reveal` text, to avoid fighting scroll-reveal transforms.

## 5. Implementation phases (suggested order)

| Phase | Scope | Acceptance |
|-------|--------|------------|
| **P0** | Hook + rAF + lerp + CSS vars on `:root`; `prefers-reduced-motion`, `visibilitychange`, coarse-pointer **off** switch | No React per-frame updates; vars stable at rest; motion off when reduced motion or coarse pointer |
| **P1** | Wire **Hero** decorative layers (orbs/grid) to `--pointer-nx/y` with small multipliers | Lighthouse CLS/INP not regressed; Safari/orientation reset OK |
| **P2** | **Services** `.service-card`: hover-scoped tilt + optional gradient-border highlight | Keyboard: focus uses ring/shadow, not dependent on pointer-only state |
| **P3** | **HowWeWork** timeline accent (section-relative) + optional step badge glow on hover | Subtle; no continuous chase on body text |
| **P4** | **AboutUs** highlight / quote decoration (hover-scoped sheen or weak glow) | Text block does not move |
| **P5** | **Contact** `.contact-card` edge glow; **reduce** global/local effect when focus is inside `<form>` | Typing stable |
| **P6** | **Nav** (desktop): optional ≤5% bar sheen; **Footer** optional single accent line | Mobile: no pointer tracking |

Phases P2–P6 can be split across PRs; **P0–P1** should merge first as the foundation.

## 6. Files likely to change

| File | Change |
|------|--------|
| `src/hooks/usePointerMotion.js` (new) | Listener setup, rAF, lerp, media queries, cleanup |
| `src/App.jsx` | Call hook once at root |
| `src/assets/css/custom.css` | Consumers of `--pointer-*`, spotlight, card tilt, reduced-motion overrides |
| `src/components/sections/Hero.jsx` | Wrapper classes / structure for parallax layers if needed |
| `src/components/hr/Services.jsx` | Card hover + local vars or data attributes |
| `src/components/hr/HowWeWork.jsx` | Timeline / step accents |
| `src/components/hr/AboutUs.jsx` | Highlight / quote wrappers |
| `src/components/hr/Contact.jsx` | Card + form focus detection |
| `src/components/layout/Nav.jsx` / `Footer.jsx` | Optional sheen elements |
| Tests | Unit test hook behavior: reduced motion → no listeners or neutral vars; optional smoke test |

## 7. Accessibility checklist

- [ ] `prefers-reduced-motion: reduce` → disable pointer parallax, tilt, moving spotlight, timeline chase, gradient sweeps; reset CSS vars to neutral.
- [ ] Keyboard tab order unchanged; focus-visible rings unchanged.
- [ ] No required pointer interaction for understanding content.
- [ ] Touch / coarse: no card tilt; global ambient optional at half amplitude or off (match product choice; default **off** for tilt).

## 8. Verification before merge

- `npm run lint` and `npm test` pass.
- Manual: tab through Nav → CTA → sections → form; confirm no reliance on pointer.
- Quick Lighthouse check on home: no meaningful **INP** / **CLS** regression.
- Safari + Chrome desktop; one mobile pass (effects off or minimal).

## 9. After implementation

- Append a line to **Frontend Architecture** in `ARCHITECTURE.md` if the hook name or file path differs from this doc.
- Optionally ask `@ui-ux-designer` to add a short **Pointer-driven motion** bullet under **Interaction Patterns** in the Design System (read-only for others) so tokens and caps stay in one visual spec.

## 10. Reference — CSS variables (proposed)

| Variable | Meaning |
|----------|---------|
| `--pointer-nx`, `--pointer-ny` | Smoothed normalized pointer, global |
| `--local-nx`, `--local-ny` | Optional; on hovered card only |
| `--tilt-x`, `--tilt-y` | Derived for `rotateX` / `rotateY` in degrees, `clamp()` in CSS |

Exact naming is up to implementer; keep **one** global convention documented in `usePointerMotion.js`.

---

**Handover complete.** Implement P0–P1 first, then iterate by section. Questions on visual caps → `@ui-ux-designer`; architecture conflicts → `docs/technical/DECISIONS.md`.
