<!--
DOCUMENT METADATA
Owner: @systems-architect
Update trigger: Any significant architectural, technology, or design pattern decision is made
Update scope: Append new ADRs only. Never edit the body of an Accepted ADR.
Read by: All agents. Check this file before proposing changes that may conflict with prior decisions.
-->

# Architecture Decision Records

> This log captures the context and reasoning behind key decisions so they are never lost.
>
> **Rule**: Once an ADR is marked **Accepted**, do not edit its body. If a decision needs to change, write a new ADR that explicitly supersedes the old one. Add `**Status**: Superseded by ADR-XXX` to the old record.
>
> **Agents**: Read the relevant ADRs before proposing architectural changes. A proposal that contradicts an Accepted ADR needs a new ADR — not a silent override.

---

## Decision Index

| ID | Title | Status | Date |
|----|-------|--------|------|
| ADR-001 | Plain HTML + Tailwind CDN umjesto JS frameworka | Accepted | 2026-03-25 |

---

## ADR-001: Plain HTML + Tailwind CDN umjesto JS frameworka

**Date**: 2026-03-25
**Status**: Accepted
**Deciders**: Josip / @systems-architect

### Context

Kontekst.hr je marketinška stranica bez dinamičkog sadržaja, korisničkih računa ili baze podataka. Jedine interakcije su navigation toggle na mobitelu i smooth scroll — ništa što zahtijeva reaktivni UI framework. Projekt treba biti što brže isporučen i što lakše maintainabilan bez DevOps overhead-a.

### Options Considered

1. **Plain HTML + Tailwind CDN**: Bez build stepa, otvori index.html u browseru. Pros: nulta kompleksnost, brz deploy, maximalni performance. Cons: nema component reusability, nema hot reload bez alata.
2. **Next.js (React)**: SSR/SSG, TypeScript, bogat ekosustav. Pros: skalabilno, TypeScript, lako dodati dinamičke feature-e later. Cons: overkill za marketing stranicu, Node dependency, build pipeline, deployment kompleksniji.
3. **Astro**: Static site generator dizajniran za content-heavy stranice. Pros: odlična SEO podrška, partial hydration, islands architecture. Cons: još jedan alat za učiti, build step neophodan, nepotrebna kompleksnost za jednostavnu marketing stranicu.

### Decision

Odabrano: **Plain HTML + Tailwind CSS via CDN**. Za marketing stranicu s 5–6 sekcija i nultom dinamičnošću, svaki JS framework donosi više overhead-a nego benefita. Tailwind CDN omogućuje brzu stilizaciju bez build koraka.

### Consequences

- **Positive**: Nulta build kompleksnost, deploy je trivijalan (push → DO App Platform), maksimalna brzina stranice, lako za maintainati
- **Negative**: Nema component reusability — HTML se ponavlja za slične UI blokove; ako stranica naraste, migacija na framework bit će potrebna
- **Neutral**: Tailwind via CDN uključuje cijeli CSS bundle (~3MB) bez tree-shakinga — prihvatljivo za marketing stranicu, može se optimizirati u v2

---

<!--
TEMPLATE FOR NEW ADRs — copy this block when adding a new record:

## ADR-[NNN]: [Short Title]

**Date**: YYYY-MM-DD
**Status**: Accepted
**Deciders**: [Human name(s)] / @systems-architect

### Context
[What situation or problem prompted this decision. Include relevant constraints.]

### Options Considered
1. **[Option A]**: [Description] — Pros: [...] Cons: [...]
2. **[Option B]**: [Description] — Pros: [...] Cons: [...]

### Decision
[What was decided and the primary reason why.]

### Consequences
- **Positive**: [What becomes easier or better]
- **Negative**: [Trade-offs or what becomes harder]
- **Neutral**: [What changes but is neither better nor worse]
-->
