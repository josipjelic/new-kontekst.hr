# Content Strategy

> **Owner**: @copywriter-seo
> **Personas**: Defined in `PRD.md` — always read before writing copy
> **Last updated**: 2026-03-25

---

## Overview

Kontekst.hr je specijalizirana agencija za automatizaciju poslovanja i AI rješenja namijenjena vlasnicima tvrtki u Hrvatskoj koji žele eliminirati ručni rad i ubrzati rast. Nudimo n8n workflow automatizacije, automatizaciju poslovnih procesa i AI aplikacije po mjeri. Osnovna obećanje branda: vaš tim oslobođen od ponavljajućih zadataka, uz tehnologiju koja radi 24/7 umjesto vas.

**Primary value proposition**: Zamjenjujemo sate ručnog rada pametnim automatizacijama — vaš tim fokusiran na rast, ostatak prepustite nama.

**Canonical brand statement**: "Automatizacija poslovanja koja zaista radi."

---

## Brand Voice & Tone

### Voice (constant across all content)

| Dimension | Setting | Description |
|-----------|---------|-------------|
| Formality | [Formal / Conversational / Casual] | [Why — e.g., "matches the technical audience"] |
| Energy | [Low / Medium / High] | [Why] |
| Personality | [Corporate / Human / Playful] | [Why] |
| Authority | [Humble / Peer / Expert] | [Why] |

### Tone by Context

| Context | Tone | Example |
|---------|------|---------|
| Marketing headlines | [e.g., Confident, benefit-led] | [Example headline] |
| Error messages | [e.g., Calm, direct, helpful] | [Example error message] |
| Success confirmations | [e.g., Warm, brief, forward-looking] | [Example] |
| Onboarding | [e.g., Encouraging, jargon-free] | [Example] |
| Pricing page | [e.g., Direct, objection-handling] | [Example] |
| Empty states | [e.g., Helpful, action-oriented] | [Example] |

### Voice Rules

- [Rule 1 — e.g., "Always lead with the outcome, not the feature"]
- [Rule 2 — e.g., "Use 'you' and 'your', not 'users' or 'customers'"]
- [Rule 3]

### Forbidden Phrases

- [Phrase] — [reason]
- [Phrase] — [reason]

---

## Target Personas

> Personas are defined in `PRD.md`. This section captures only the copy-relevant summary for each.

### [Persona 1 Name]

**Job-to-be-done**: [What they are trying to accomplish — in their words]
**Biggest objection**: [What holds them back from buying / signing up]
**Language to use**: [Specific words, phrases, vocabulary they use]
**Tone for this persona**: [Adjust from brand default if needed]
**Primary CTA for this persona**: [The action most likely to convert them]

---

### [Persona 2 Name]

**Job-to-be-done**: [What they are trying to accomplish]
**Biggest objection**: [What holds them back]
**Language to use**: [Their vocabulary]
**Tone for this persona**: [Adjust if needed]
**Primary CTA for this persona**: [Most effective action]

---

## Keyword Strategy

### Domain & Canonical URL

- **Primary domain**: `https://kontekst.hr`
- **Canonical protocol + www preference**: `https://kontekst.hr/` (no www — must be consistent across all tags)

### Primary Keyword Targets

| Keyword | Intent | Mapped Page | Monthly Volume | Difficulty | Status | Date Added |
|---------|--------|-------------|---------------|------------|--------|------------|
| automatizacija poslovanja | commercial | / | verify | med | targeting | 2026-03-25 |
| n8n Hrvatska | commercial | / | verify | low | targeting | 2026-03-25 |
| AI aplikacije za poslovanje | commercial | / | verify | med | targeting | 2026-03-25 |
| poslovne automatizacije | commercial | / | verify | med | targeting | 2026-03-25 |
| automatizacija poslovnih procesa | commercial | / | verify | med | targeting | 2026-03-25 |

### Secondary Keywords (supporting, per page)

| Page | Secondary Keywords |
|------|--------------------|
| / | workflow automatizacija, n8n workflow, AI rješenja za tvrtke, integracija poslovnih alata |

### Content Clusters

| Pillar Page | Cluster Pages | Status |
|-------------|---------------|--------|
| [/pillar-slug] | [/cluster-1], [/cluster-2] | [planned/in progress/live] |

### Keywords to Avoid / Not Target

| Keyword | Reason |
|---------|--------|
| [keyword] | [e.g., Already owned by a competitor with 10× DA; not worth competing] |

---

## Page Copy Library

Copy is recorded here after it goes live. Variants awaiting A/B test results are marked **(test)**.

---

### Homepage

**Title tag**: `Kontekst.hr — Automatizacija poslovanja i AI za tvrtke` (52 chars)
**Meta description**: `Poslovne automatizacije, n8n workflow rješenja i AI aplikacije za tvrtke u Hrvatskoj. Automatizirajte procese, uštedite sate rada dnevno.` (138 chars)

**H1**:
> Automatizacija poslovanja koja zaista radi

**Sub-headline**:
> Zamjenjujemo ručne, ponavljajuće zadatke pametnim n8n workflowima i AI rješenjima. Vaš tim radi na onome što donosi rast — ostatak prepustite nama.

**Primary CTA**: Besplatni uvodni razgovor → #kontakt
**Secondary CTA**: Pogledajte usluge → #usluge

**Nav CTA**: Razgovarajmo → #kontakt

**Social proof block**: Tri stat-a: "24/7 Automatizacije rade" / "n8n Stručnjaci za Hrvatsku" / "AI Rješenja po mjeri"

---

### [Page 2: e.g., Pricing]

**Title tag**: [exact text]
**Meta description**: [exact text]

**H1**:
> [Headline text]

**Primary CTA**: [CTA text]

---

### [Add pages as copy is written]

---

## CTA Library

All approved CTAs in active use. New CTAs must be added here before implementation.

| CTA Text | Page / Context | Level | Notes | Date Added |
|----------|---------------|-------|-------|------------|
| [CTA text] | [page or context] | [primary/secondary/tertiary] | [e.g., "Converts best for cold traffic"] | [YYYY-MM-DD] |

---

## Technical SEO Decisions

### Meta Tag Defaults

Applied to all pages unless a page-level override exists in the Page Copy Library above.

| Tag | Default value | Notes |
|-----|--------------|-------|
| robots | `index, follow` | Override to `noindex` for: /thank-you, /admin, /404 |
| og:image | [path to default social image — 1200×630px] | Override per page when unique image exists |
| twitter:card | `summary_large_image` | |

### Structured Data in Use

| Schema type | Applied to | Implementation status |
|-------------|------------|----------------------|
| ProfessionalService | Homepage (`index.html`) | live |
| WebSite | Homepage (`index.html`) | live |
| Article | Blog posts | not started (no blog yet) |
| FAQPage | Homepage (if FAQ section added) | pending |
| BreadcrumbList | All pages except homepage | not applicable (single-page) |

### Redirect Map

| From | To | Type | Reason |
|------|-----|------|--------|
| [/old-slug] | [/new-slug] | 301 | [e.g., URL restructure] |

### Hreflang Configuration

| Locale | URL pattern | hreflang value |
|--------|-------------|----------------|
| [en-US] | [https://example.com/...] | `en-US` |
| [x-default] | [https://example.com/] | `x-default` |

---

## Content Calendar

| Publish date | Title / Topic | Type | Primary keyword | Status | Owner |
|-------------|--------------|------|----------------|--------|-------|
| [YYYY-MM-DD] | [Article title] | [blog/landing page/guide] | [keyword] | [draft/review/live] | [@copywriter-seo] |

---

## Changelog

| Date | Change |
|------|--------|
| 2026-03-25 | Full content + SEO revision of index.html — improved all section copy, added og:image, og:image:alt, twitter:image, twitter:image:alt, meta author/language, upgraded JSON-LD from LocalBusiness to ProfessionalService + WebSite, added hasOfferCatalog. Updated keyword targets and page copy library. |
| 2026-03-25 | Initial content strategy — brand voice and keyword framework defined |
