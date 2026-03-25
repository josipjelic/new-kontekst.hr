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
| ADR-001 | Plain HTML + Tailwind CDN umjesto JS frameworka | Superseded by ADR-002 | 2026-03-25 |
| ADR-002 | Migracija na Vite + React, Node.js/Express backend, Docker | Accepted | 2026-03-25 |

---

## ADR-001: Plain HTML + Tailwind CDN umjesto JS frameworka

**Date**: 2026-03-25
**Status**: Superseded by ADR-002
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

## ADR-002: Migracija na Vite + React, Node.js/Express backend, Docker

**Date**: 2026-03-25
**Status**: Accepted
**Deciders**: Josip / @systems-architect

### Context

Kontekst.hr prerasta okvire statične marketing stranice. Nadolazeći zahtjevi uključuju kontakt formu s backend obradom, potencijalnu CRM integraciju, te potrebu za konzistentnim lokalnim razvojnim okruženjem. Trenutni plain HTML pristup (ADR-001) nema component reusability, nema backend, i otežava kolaboraciju jer nema standardiziranog dev environmenta.

Ključna ograničenja:
- Stranica je i dalje primarno marketinška — nema korisničkih računa ni složenog stanja
- Tim treba brz dev feedback loop (HMR)
- Backend zahtjevi su lagani (kontakt forma, eventualne webhook integracije) — ne treba teški framework
- Lokalni dev mora biti reproducibilan bez "works on my machine" problema

### Options Considered

1. **Next.js (React, SSR/SSG)**: Full-stack React framework s ugrađenim API routes. Pros: SSR za SEO, file-based routing, API routes bez zasebnog servera, velik ekosustav. Cons: overkill za marketing stranicu s jednom stranom i laganim API-jem; vendor lock-in u Vercel ekosustav za optimalan DX; složeniji deployment na Digital Ocean; SSR dodaje runtime kompleksnost koja nije potrebna.

2. **Vite + React (SPA) + Node.js/Express (zasebni backend) + Docker**: React SPA buildan Viteom, Express API server, sve orkestrirano docker-composeom. Pros: najbrži HMR u ekosustavu (Vite), čista separacija frontend/backend, Express je minimalan i fleksibilan za lagane API potrebe, Docker osigurava identičan environment za sve developere, lako dodati nove servise (Redis, DB) kad zatreba. Cons: dva procesa za maintain (frontend + backend), SPA zahtijeva klijentski routing, SEO zahtijeva dodatnu pažnju (prerendering ili meta tag management).

3. **Astro + Node.js backend + Docker**: Astro za statički frontend s islands hydration, zasebni Node backend. Pros: odličan SEO iz kutije, parcijalna hidratacija smanjuje JS bundle, content-first pristup. Cons: manji ekosustav od Reacta, tim nema iskustva s Astrom, islands architecture dodaje konceptualnu kompleksnost za jednostavan marketing site, teže naći developere.

### Decision

Odabrano: **Vite + React (SPA) + Node.js/Express + Docker**. Ova kombinacija daje najbolji omjer jednostavnosti i fleksibilnosti za trenutne potrebe:

- **Vite + React** za frontend: Vite ima najbrži HMR, React komponente rješavaju problem ponovljivosti HTML-a iz ADR-001, ekosustav je ogroman i poznat timu. SPA je dovoljan jer je stranica single-page — SEO se rješava prerenderingom ili react-helmet-async za meta tagove.
- **Node.js/Express** za backend: Minimalan server za kontakt formu i buduće integracije. Express je dovoljan — ne treba NestJS ni sličan teški framework za lagane API potrebe.
- **Docker + docker-compose** za infrastrukturu: Lokalni dev identičan za sve developere, lako dodati servise, production-ready Dockerfile s multi-stage buildom.

Next.js je odbačen jer SSR nije potreban za single-page marketing site, a framework donosi kompleksnost (middleware, server components, caching) koja ne služi ovom projektu. Astro je odbačen zbog manjeg ekosustava i nedostatka timskog iskustva.

### Consequences

- **Positive**: Component reusability (React), brz dev feedback (Vite HMR), backend spreman za kontakt formu i integracije, reproducibilan dev environment (Docker), Tailwind se sada može buildati s tree-shakingom (riješava CDN bundle problem iz ADR-001)
- **Negative**: Build step je sada obavezan (Vite build), dva procesa za maintain (frontend + backend), Docker dodaje inicijalnu kompleksnost za developere koji ga ne poznaju, SPA zahtijeva dodatni rad za SEO (prerendering/meta management)
- **Neutral**: Hosting se mijenja s čistog static servinga na containerized deployment — Digital Ocean App Platform podržava Docker, ali konfiguracija je složenija nego push-to-deploy za statičke fileove

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
