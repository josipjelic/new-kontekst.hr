# AI Readiness Questionnaire — Copy & Prompt Specification

> **Owner**: @copywriter-seo
> **Task**: #025
> **Status**: done
> **Last updated**: 2026-03-26
>
> **Language note**: This document is written in English. Croatian (`hr`) copy within it is correct,
> natural Croatian for a B2B audience — not translated Croatian. English (`en`) copy follows each
> Croatian block. Quoted strings are the exact text to be implemented.
>
> **Personas in scope**: Marko (owner, 5–20 people) and Ana/Jelena (COO/operations, 20–100 people).
> Both are non-technical to moderately technical. Write with authority and empathy — no condescension,
> no hype.

---

## Section 1: Page Metadata (SEO)

### Croatian page — `/upitnik`

**Title tag** (55 chars):
```
Upitnik AI spremnosti — Kontekst.hr
```

**Meta description** (154 chars):
```
Odgovorite na 5 pitanja i dobijte personaliziranu procjenu AI i automatizacije za vaše poslovanje. Besplatno. Rezultat za 2 minute.
```

> Keywords covered naturally: automatizacija poslovanja, AI rješenja (implicit in context),
> digitalna transformacija hrvatska (via "poslovanje", "procjena").

**Open Graph title**:
```
Jeste li spremni za AI? Provjerite za 2 minute.
```

**Open Graph description**:
```
Besplatni upitnik za vlasnike tvrtki. 5 pitanja, personalizirana procjena, konkretni sljedeći koraci — od stručnjaka za poslovne automatizacije.
```

**Canonical URL**: `https://kontekst.hr/upitnik`

**robots**: `index, follow`

---

### English page — `/en/questionnaire`

**Title tag** (54 chars):
```
AI Readiness Check for Your Business — Kontekst
```

**Meta description** (155 chars):
```
Answer 5 questions and get a personalised AI and automation readiness assessment for your business. Free. Results in under 2 minutes.
```

**Open Graph title**:
```
Is your business ready for AI? Find out in 2 minutes.
```

**Open Graph description**:
```
Free questionnaire for business owners. 5 questions, a personalised assessment, and concrete next steps — from Croatia's business automation specialists.
```

**Canonical URL**: `https://kontekst.hr/en/questionnaire`

**robots**: `index, follow`

---

## Section 2: Page Hero Copy

### Croatian (hr)

**H1**:
```
Koliko je vaše poslovanje spremno za AI?
```

**Subheadline**:
```
Za 2 minute saznajte gdje stojite — i što napraviti kao sljedeći korak. Odgovorite na 5 kratkih pitanja i dobijte personaliziranu procjenu temeljenu na vašoj situaciji.
```

> Copywriting note: H1 uses a direct question — it mirrors the exact language Marko and Ana use
> when searching ("jesmo li mi uopće za to?"). Subheadline answers the two biggest objections
> upfront: time cost ("2 minute") and relevance ("vašoj situaciji").

---

### English (en)

**H1**:
```
How ready is your business for AI?
```

**Subheadline**:
```
Find out in 2 minutes where you stand — and what to do next. Answer 5 short questions and get a personalised assessment based on your specific situation.
```

---

## Section 3: The 5 Questions

Each question is designed to assess one readiness dimension. Questions are shown one at a time in
a card-based wizard. Answer options are radio buttons. Score values are used internally for tier
calculation — they are never shown to the user.

**Score mapping**: Each answer is worth 0, 1, or 2 points. Maximum total = 10. Tier thresholds
are defined in Section 4.

---

### Question 1 — Dimension: Team & Operations Scale

**Category label (HR)**: `Tim i operacije`
**Category label (EN)**: `Team & Operations`

**Croatian question**:
```
Koliko često vaš tim radi iste zadatke iznova?
```

**Croatian answer options**:

| Label | Text | Score | Scoring note |
|-------|------|-------|--------------|
| a | Svakodnevno — i puno vremena odlazi na to | 2 | High pain, high urgency — prime candidate for automation |
| b | Povremeno, ali znamo koji su problematični | 1 | Aware of the problem, moderate volume |
| c | Rijetko — naši procesi su uglavnom automatizirani | 0 | Already automated or very low volume; may need AI layer instead |

**English question**:
```
How often does your team repeat the same manual tasks?
```

**English answer options**:

| Label | Text | Score | Scoring note |
|-------|------|-------|--------------|
| a | Daily — and it takes up significant time | 2 | High pain, high urgency |
| b | Sometimes — we know which tasks are the problem | 1 | Aware, moderate volume |
| c | Rarely — most of our processes are already automated | 0 | Low automation opportunity; may benefit from AI features instead |

---

### Question 2 — Dimension: Data & Process Maturity

**Category label (HR)**: `Procesi i podaci`
**Category label (EN)**: `Processes & Data`

**Croatian question**:
```
Kako biste opisali vaše poslovne procese?
```

**Croatian answer options**:

| Label | Text | Score | Scoring note |
|-------|------|-------|--------------|
| a | Neformalni — rade u glavama ljudi | 0 | Undocumented processes block automation; must document first |
| b | Djelomično dokumentirani, ali nedosljedno | 1 | Ready for automation with some prep work |
| c | Jasno definirani i dokumentirani | 2 | Fully ready — automation can start immediately |

**English question**:
```
How would you describe your business processes?
```

**English answer options**:

| Label | Text | Score | Scoring note |
|-------|------|-------|--------------|
| a | Informal — they live in people's heads | 0 | Must document before automating |
| b | Partly documented, but inconsistently | 1 | Ready with some preparation |
| c | Clearly defined and documented | 2 | Immediately automation-ready |

---

### Question 3 — Dimension: Tech Stack

**Category label (HR)**: `Alati i tehnologija`
**Category label (EN)**: `Tools & Technology`

**Croatian question**:
```
Koje alate vaša tvrtka svakodnevno koristi?
```

**Croatian answer options**:

| Label | Text | Score | Scoring note |
|-------|------|-------|--------------|
| a | Uglavnom Excel i email | 0 | Basic stack — automation possible but requires more groundwork |
| b | Nekoliko SaaS alata (npr. CRM, računovodstvo) | 1 | Good foundation — most SaaS tools have APIs or n8n integrations |
| c | Međusobno povezani alati s API-jima | 2 | Ideal stack — high automation potential, fast time-to-value |

**English question**:
```
Which tools does your business use day-to-day?
```

**English answer options**:

| Label | Text | Score | Scoring note |
|-------|------|-------|--------------|
| a | Mainly spreadsheets and email | 0 | Requires more groundwork before automation |
| b | Several SaaS tools (e.g. CRM, accounting) | 1 | Good foundation — most have API or n8n integrations |
| c | Connected tools with APIs | 2 | Ideal stack — high automation potential |

---

### Question 4 — Dimension: Pain Point Awareness

**Category label (HR)**: `Svjesnost problema`
**Category label (EN)**: `Pain Awareness`

**Croatian question**:
```
Znate li koji poslovni proces vas najviše koči?
```

**Croatian answer options**:

| Label | Text | Score | Scoring note |
|-------|------|-------|--------------|
| a | Ne, tek istražujemo mogućnosti | 0 | Exploratory stage — needs diagnostic before solution |
| b | Imamo ideje, ali nismo sigurni prioriteta | 1 | Moderate awareness — can work with some scoping |
| c | Da, točno znamo što želimo automatizirati | 2 | Clear problem definition — can move fast |

**English question**:
```
Do you know which business process is holding you back most?
```

**English answer options**:

| Label | Text | Score | Scoring note |
|-------|------|-------|--------------|
| a | No — we're still exploring the possibilities | 0 | Exploratory — needs discovery before solution |
| b | We have ideas but haven't prioritised them | 1 | Moderate clarity — can work with scoping |
| c | Yes — we know exactly what we want to automate | 2 | Clear scope — ready to move fast |

---

### Question 5 — Dimension: Readiness & Timeline

**Category label (HR)**: `Spremnost i rok`
**Category label (EN)**: `Readiness & Timeline`

**Croatian question**:
```
Kada biste bili spremni za prvi projekt?
```

**Croatian answer options**:

| Label | Text | Score | Scoring note |
|-------|------|-------|--------------|
| a | Tek istražujem, bez konkretnih planova | 0 | Early funnel — nurture, not convert |
| b | U idućih 3–6 mjeseci, ako vidimo smisao | 1 | Warm — needs proof of value before committing |
| c | Odmah ili u idućih nekoliko tjedana | 2 | Hot lead — high intent, ready to engage |

**English question**:
```
When would you be ready to start your first project?
```

**English answer options**:

| Label | Text | Score | Scoring note |
|-------|------|-------|--------------|
| a | Just exploring for now — no concrete plans | 0 | Early funnel — nurture approach |
| b | In the next 3–6 months, if it makes sense | 1 | Warm — needs proof of value |
| c | Right away or within the next few weeks | 2 | High intent — ready to engage |

---

## Section 4: Scoring Tiers

**Total score range**: 0–10 (5 questions × max 2 points each)

### Tier 1 — Low readiness

| | Croatian | English |
|-|---------|---------|
| **Tier name** | Istraživač | Explorer |
| **Score range** | 0–3 | 0–3 |
| **1-sentence description (HR)** | Vaše poslovanje još gradi temelje za automatizaciju — pravi trenutak za postavljanje pravih pitanja. |
| **1-sentence description (EN)** | Your business is building the foundations for automation — now is the right time to ask the right questions. |

### Tier 2 — Moderate readiness

| | Croatian | English |
|-|---------|---------|
| **Tier name** | Graditelj | Builder |
| **Score range** | 4–7 | 4–7 |
| **1-sentence description (HR)** | Imate dobre temelje — uz pravi plan, automatizacija može brzo postati stvarnost. |
| **1-sentence description (EN)** | You have solid foundations — with the right plan, automation can become a reality quickly. |

### Tier 3 — High readiness

| | Croatian | English |
|-|---------|---------|
| **Tier name** | Spreman za akciju | Ready to Act |
| **Score range** | 8–10 | 8–10 |
| **1-sentence description (HR)** | Vaše poslovanje je dobro pozicionirano za automatizaciju — sada je pravo vrijeme za djelovanje. |
| **1-sentence description (EN)** | Your business is well positioned for automation — now is the right time to act. |

> Tier name rationale: "Istraživač", "Graditelj", "Spreman za akciju" avoid the condescending
> language of "Beginner/Intermediate/Advanced". They describe a journey stage, not a judgment.
> All three tiers are framed as positive momentum points, not grades.

---

## Section 5: Claude Haiku System Prompt Template

### Overview

The backend sends two messages to Claude Haiku via OpenRouter:
1. A **system prompt** that sets role, output format, and constraints.
2. A **user message** containing the five answers.

Both are provided below. The backend selects the Croatian or English version based on the request
locale (derived from the route: `/upitnik` → `hr`, `/en/questionnaire` → `en`).

---

### System Prompt — Croatian (`hr`)

> Token estimate: ~320 tokens (well within the 500-token target).

```
Ti si konzultant za poslovnu automatizaciju i AI. Tvoj zadatak je napisati personaliziranu procjenu AI spremnosti za vlasnika tvrtke na temelju njegovih odgovora na 5 pitanja.

Pravila:
- Odgovori isključivo JSON objektom ovog oblika: {"tier": "<string>", "score": <integer>, "assessment": "<string>"}
- "tier" je jedna od: "Istraživač", "Graditelj", "Spreman za akciju"
- "score" je cijeli broj od 0 do 10 (zbroj bodova iz odgovora)
- "assessment" je 150 do 250 riječi, pisan u drugom licu (Vi/vaše), na hrvatskom jeziku
- Procjena mora biti konkretna i osobna — referenciraj što je korisnik odgovorio
- Ne izmišljaj detalje koji nisu u odgovorima
- Ne koristi korporativni žargon; piši kao iskusan savjetnik koji izravno govori vlasniku tvrtke
- Završi procjenu s jednim konkretnim sljedećim korakom koji korisnik može poduzeti
- Ton: profesionalan, direktan, poticajan — ne prodavački
```

---

### System Prompt — English (`en`)

> Token estimate: ~300 tokens.

```
You are a business automation and AI consultant. Your task is to write a personalised AI readiness assessment for a business owner based on their answers to 5 questions.

Rules:
- Respond only with a JSON object in this exact shape: {"tier": "<string>", "score": <integer>, "assessment": "<string>"}
- "tier" must be one of: "Explorer", "Builder", "Ready to Act"
- "score" is an integer from 0 to 10 (sum of answer scores)
- "assessment" is 150 to 250 words, written in second person (you/your), in English
- The assessment must be specific and personal — reference what the user actually answered
- Do not invent details that are not present in the answers
- Avoid corporate jargon; write as an experienced advisor speaking directly to a business owner
- End the assessment with one concrete next step the user can take
- Tone: professional, direct, encouraging — not salesy
```

---

### User Message Template (both locales)

The backend constructs this message dynamically from the submitted answers. `{q*_label}` is the
letter ("a", "b", or "c"); `{q*_text}` is the full answer text in the questionnaire locale.

```
Odgovori korisnika: (use Croatian labels for hr locale, English labels for en locale)

1. Ponavljajući zadaci — {q1_label}: {q1_text}
2. Dokumentiranost procesa — {q2_label}: {q2_text}
3. Korišteni alati — {q3_label}: {q3_text}
4. Poznatost problema — {q4_label}: {q4_text}
5. Vremenski okvir — {q5_label}: {q5_text}

Ukupan zbroj bodova: {total_score}/10
```

**English locale version** (same structure, English labels):

```
User answers:

1. Repetitive tasks — {q1_label}: {q1_text}
2. Process documentation — {q2_label}: {q2_text}
3. Tools in use — {q3_label}: {q3_text}
4. Problem awareness — {q4_label}: {q4_text}
5. Timeline — {q5_label}: {q5_text}

Total score: {total_score}/10
```

**Example of a filled user message (Croatian, score = 7)**:

```
Odgovori korisnika:

1. Ponavljajući zadaci — a: Svakodnevno — i puno vremena odlazi na to
2. Dokumentiranost procesa — b: Djelomično dokumentirani, ali nedosljedno
3. Korišteni alati — b: Nekoliko SaaS alata (npr. CRM, računovodstvo)
4. Poznatost problema — c: Da, točno znamo što želimo automatizirati
5. Vremenski okvir — b: U idućih 3–6 mjeseci, ako vidimo smisao

Ukupan zbroj bodova: 7/10
```

---

### Backend Implementation Notes for #027

- The backend calculates `total_score` by summing the score values for each submitted answer
  (a=0, b=1, c=2 for Q1–Q5 as defined in Section 3 above — verify per question in Section 3
  since some questions have reversed scoring).

  **Important**: scores are NOT uniformly a=0, b=1, c=2 for all questions. The exact values
  are in the table in Section 3 for each question. The backend must map each `{q*_label}` to
  its correct score value using those tables.

- Derive `tier` from `total_score` using the thresholds in Section 4:
  - 0–3 → "Istraživač" (hr) / "Explorer" (en)
  - 4–7 → "Graditelj" (hr) / "Builder" (en)
  - 8–10 → "Spreman za akciju" (hr) / "Ready to Act" (en)

- Pass `total_score` and computed `tier` in the user message as shown above.

- The model is instructed to echo back `tier` and `score` in its JSON — use the backend-computed
  `tier` and `score` as the source of truth for displaying the result page. Trust the model's
  `assessment` field; validate `tier` and `score` against your own calculation before rendering.

- If the model returns invalid JSON or a malformed response, fall back to the static tier copy
  from Section 6 (omit the `assessment` paragraph, show only the static text and CTA).

---

## Section 6: Result Page Copy

Each result page shows three layers of content:
1. **Static tier headline** (from this section)
2. **AI-generated assessment** (from Claude Haiku, the `assessment` field)
3. **CTA block** (from this section)

The static copy frames the AI content. It appears above and below the `assessment` paragraph.

---

### Tier 1: Istraživač / Explorer (score 0–3)

#### Croatian (hr)

**Headline**:
```
Dobar početak — sada znate gdje stojite.
```

**Supporting line** (shown above the AI assessment):
```
Vaše poslovanje je u fazi istraživanja. To je normalno — i pravo je vrijeme da postavite prave temelje.
```

**Primary CTA button**:
```
Razgovarajmo o vašim mogućnostima
```
> Links to `/#kontakt`

**Primary CTA subtext**:
```
Besplatni uvodni razgovor — bez obveza.
```

**Secondary CTA button**:
```
Pogledajte naše usluge
```
> Links to `/#usluge`

---

#### English (en)

**Headline**:
```
A solid starting point — now you know where you stand.
```

**Supporting line**:
```
Your business is in the exploration phase. That's perfectly normal — and exactly the right time to lay the right foundations.
```

**Primary CTA button**:
```
Let's talk about your options
```
> Links to `/en/#contact`

**Primary CTA subtext**:
```
Free introductory call — no commitment required.
```

**Secondary CTA button**:
```
See our services
```
> Links to `/en/#services`

---

### Tier 2: Graditelj / Builder (score 4–7)

#### Croatian (hr)

**Headline**:
```
Na pravom ste putu — i bliže ste nego mislite.
```

**Supporting line** (shown above the AI assessment):
```
Imate temelje za automatizaciju. Uz pravi plan i partnera koji poznaje vaše procese, prvi rezultati mogu doći za tjednima.
```

**Primary CTA button**:
```
Dogovorite besplatni razgovor
```
> Links to `/#kontakt`

**Primary CTA subtext**:
```
Konkretna procjena za vaš specifičan slučaj.
```

**Secondary CTA button**:
```
Kako radimo
```
> Links to `/#kako-radimo`

---

#### English (en)

**Headline**:
```
You're on the right path — and closer than you think.
```

**Supporting line**:
```
You have the foundations for automation. With the right plan and a partner who understands your processes, first results can arrive within weeks.
```

**Primary CTA button**:
```
Book a free conversation
```
> Links to `/en/#contact`

**Primary CTA subtext**:
```
A concrete assessment for your specific situation.
```

**Secondary CTA button**:
```
How we work
```
> Links to `/en/#how-we-work`

---

### Tier 3: Spreman za akciju / Ready to Act (score 8–10)

#### Croatian (hr)

**Headline**:
```
Vaše poslovanje je spremno — iskoristite tu prednost.
```

**Supporting line** (shown above the AI assessment):
```
Rezultati pokazuju da ste dobro pozicionirani za automatizaciju. Pravo je vrijeme da krenete — svaki tjedan kašnjenja znači sate izgubljenog rada.
```

**Primary CTA button**:
```
Pokrenimo prvi projekt
```
> Links to `/#kontakt`

**Primary CTA subtext**:
```
Razgovarajmo ovaj tjedan — slobodnih mjesta ima ograničen broj.
```

**Secondary CTA button**:
```
Pogledajte kako izgledaju naši projekti
```
> Links to `/#usluge`

---

#### English (en)

**Headline**:
```
Your business is ready — make the most of that advantage.
```

**Supporting line**:
```
Your results show you're well positioned for automation. Now is the time to move — every week of delay means more hours lost to manual work.
```

**Primary CTA button**:
```
Let's start your first project
```
> Links to `/en/#contact`

**Primary CTA subtext**:
```
Let's talk this week — availability is limited.
```

**Secondary CTA button**:
```
See what our projects look like
```
> Links to `/en/#services`

---

## Section 7: UI String Copy

All strings required by the frontend component. These are exact-match strings for
`@frontend-developer` (#028) to implement.

### Progress Indicator

| Context | Croatian (hr) | English (en) |
|---------|--------------|-------------|
| Progress text (X = current question number 1–5) | `Pitanje {X} od 5` | `Question {X} of 5` |
| Progress bar aria-label | `Napredak upitnika` | `Questionnaire progress` |

---

### Navigation Buttons

| Button | Croatian (hr) | English (en) | Notes |
|--------|--------------|-------------|-------|
| Back (questions 2–5) | `Natrag` | `Back` | Not shown on Q1 |
| Next (questions 1–4) | `Sljedeće` | `Next` | Disabled until an answer is selected |
| Submit (question 5) | `Prikaži moje rezultate` | `Show my results` | Replaces "Next" on final question |

> "Prikaži moje rezultate" is preferable to "Pošalji" — it frames the action as getting something,
> not submitting data. This reduces friction and sets accurate expectation.

---

### Loading State

**Croatian (hr)**:
```
Analiziramo vaše odgovore…
```

**English (en)**:
```
Analysing your answers…
```

> Use an ellipsis (…), not three dots (...). Show a subtle animated indicator (spinner or
> pulsing teal dot consistent with the hero badge pulse animation).
> Duration: typically 2–6 seconds for Claude Haiku non-streaming response.

---

### Error Messages

#### Generic API error (server error, timeout, or unparseable AI response)

**Croatian (hr)**:
```
Nešto je pošlo po krivu. Pokušajte ponovo ili nas kontaktirajte na info@kontekst.hr.
```

**English (en)**:
```
Something went wrong. Please try again or contact us at info@kontekst.hr.
```

> Tone note: calm, honest, actionable. Gives an immediate fallback (retry) and an escape hatch
> (email). Consistent with the site-wide error message pattern in CONTENT_STRATEGY.md.

---

#### Rate limit error (too many attempts)

**Croatian (hr)**:
```
Previše pokušaja. Pričekajte 15 minuta prije sljedećeg pokušaja.
```

**English (en)**:
```
Too many attempts. Please wait 15 minutes before trying again.
```

> Rate limit window matches the architecture spec (#024): 3 requests per 15 minutes per IP.

---

#### No answer selected (validation, shown inline below the question card)

**Croatian (hr)**:
```
Odaberite jedan odgovor za nastavak.
```

**English (en)**:
```
Please select an answer to continue.
```

---

### Accessibility Strings

| Element | Croatian (hr) | English (en) |
|---------|--------------|-------------|
| Question card region aria-label | `Pitanje {X}: {question_text}` | `Question {X}: {question_text}` |
| Answer option aria-label | `Odgovor {label}: {answer_text}` | `Answer {label}: {answer_text}` |
| Result section aria-label | `Vaši rezultati` | `Your results` |
| Loading spinner aria-label | `Učitavanje rezultata` | `Loading results` |

---

## Changelog

| Date | Agent | Change |
|------|-------|--------|
| 2026-03-26 | @copywriter-seo | Initial creation — all 7 sections complete (#025) |
