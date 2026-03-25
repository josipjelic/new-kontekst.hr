# Product Requirements Document

> [!WARNING]
> **READ-ONLY FOR ALL AGENTS**
> This document is the source of truth for what we are building.
> Claude agents must READ this document to understand requirements.
> **Do not edit, rewrite, or "update to reflect current state" without explicit human instruction.**
> When in doubt, leave it unchanged and ask the human.

---

**Version**: 1.0
**Status**: Draft
**Last updated by human**: 2026-03-25
**Product owner**: Josip (Kontekst.hr)

---

## 1. Executive Summary

Kontekst.hr je marketinška web stranica za istoimenu tvrtku specijaliziranu za poslovne automatizacije, n8n workflowove i razvoj AI aplikacija. Stranica služi kao digitalna vizitka i alat za generiranje potencijalnih klijenata (lead generation) od vlasnika tvrtki koji žele optimizirati svoje poslovne procese. Cilj stranice je jasno komunicirati usluge, izgraditi povjerenje posjetitelja i potaknuti ih na kontakt. Stranica mora biti optimizirana za pretraživače na hrvatskom jeziku kako bi organski privlačila relevantne posjetitelje.

---

## 2. Problem Statement

### 2.1 Current Situation

Tvrtke koje trebaju automatizirati procese ili izgraditi AI rješenja danas pretražuju Google, traže preporuke u poslovnim mrežama, ili slučajno nailaze na pružatelje usluga. Bez snažne online prisutnosti, Kontekst.hr gubi potencijalne klijente koji aktivno traže te usluge.

### 2.2 The Problem

Potencijalni klijenti ne mogu lako pronaći ili procijeniti Kontekst.hr online. Ne postoji centralno mjesto gdje mogu saznati što tvrtka radi, kako radi, i kako je kontaktirati — što rezultira izgubljenim poslovnim prilikama.

### 2.3 Why Now

Automatizacija poslovanja i AI rješenja su u naglom rastu kao kategorija. Vlasnici tvrtki sve više traže načine za smanjenje ručnog rada i povećanje efikasnosti. Sada je pravo vrijeme za izgradnju SEO-optimizirane online prisutnosti koja će uhvatiti taj rastuci organski promet u Hrvatskoj.

---

## 3. Goals & Success Metrics

### 3.1 Business Goals

- Generirati inbound upite od vlasnika tvrtki zainteresiranih za automatizaciju
- Rangirati se na prvoj stranici Googlea za ključne pojmove vezane uz automatizaciju poslovanja u Hrvatskoj
- Izgraditi vjerodostojan i profesionalan brand Kontekst.hr

### 3.2 Success Metrics

| Metric | Baseline | Target | How Measured |
|--------|----------|--------|--------------|
| Organski posjetitelji/mj | 0 | 500 u 6 mj | Google Analytics |
| Upiti putem kontakta | 0 | 5+/mj | Email praćenje |
| Google rang za "automatizacija poslovanja HR" | - | Top 10 | Google Search Console |
| Core Web Vitals | - | Sve "Good" | PageSpeed Insights |

---

## 4. User Personas

### Persona: Marko — Vlasnik malog poduzeća

- **Role**: Vlasnik tvrtke s 5–20 zaposlenika
- **Goals**: Smanjiti ručne i ponavljajuće zadatke, uštedjeti vrijeme i novac, modernizirati poslovanje
- **Pain points**: Previše vremena troši na administrativne zadatke; ne zna koje tehnologije postoje ili kako ih implementirati
- **Technical level**: Non-technical
- **Usage frequency**: Jednokratni posjet pri evaluaciji partnera

### Persona: Ana — Direktorica operacija u mid-size tvrtki

- **Role**: COO ili operations manager u tvrtki s 20–100 zaposlenika
- **Goals**: Identificirati partnera za automatizaciju specifičnih poslovnih procesa, dobiti uvid u metodologiju rada
- **Pain points**: Teško je procijeniti tehničku kompetenciju pružatelja usluga; želi vidjeti konkretan pristup i rezultate
- **Technical level**: Moderate
- **Usage frequency**: Jednokratni posjet, dublje istraživanje sadržaja

---

## 5. Functional Requirements

> Requirements are numbered FR-XXX for unambiguous cross-referencing by agents and in tests.

### 5.1 Navigacija i struktura

- **FR-001**: Stranica mora imati fiksni navigacijski header s logotipom tvrtke i anchor linkovima na sve sekcije
- **FR-002**: Navigacija mora biti responzivna — na mobilnim uređajima prikazuje se hamburger ikona koja otvara/zatvara izbornik
- **FR-003**: Klik na logo vodi na vrh stranice
- **FR-004**: Stranica mora biti single-page layout s glatkim scrollanjem do sekcija

### 5.2 Hero sekcija

- **FR-010**: Hero sekcija mora prikazati naziv tvrtke, tagline "Poslovne automatizacije" i primarni CTA gumb
- **FR-011**: Hero mora vizualno komunicirati futuristički, tehnološki brand identitet
- **FR-012**: Hero mora sadržavati kratku (1–2 rečenice) value proposition na hrvatskom
- **FR-013**: CTA gumb mora voditi na sekciju Kontakt

### 5.3 Usluge (Services)

- **FR-020**: Sekcija Usluge mora prikazati sve tri core usluge: n8n workflow automatizacije, automatizacija poslovnih procesa, razvoj prilagođenih AI aplikacija
- **FR-021**: Svaka usluga mora imati naziv, kratki opis (2–4 rečenice) i vizualni element (ikona ili ilustracija)
- **FR-022**: Opisi usluga moraju biti napisani s perspektive benefita za klijenta, ne tehničkih detalja

### 5.4 Kako radimo (Process)

- **FR-030**: Sekcija Kako radimo mora objasniti metodologiju rada tvrtke u numeriranim koracima (3–5 koraka)
- **FR-031**: Svaki korak mora imati naziv i kratki opis na hrvatskom
- **FR-032**: Sekcija mora vizualno komunicirati strukturiran, profesionalan pristup

### 5.5 O nama (About)

- **FR-040**: Sekcija O nama mora opisati misiju i vrijednosti tvrtke
- **FR-041**: Sekcija mora izgraditi povjerenje i komunicirati stručnost
- **FR-042**: Sadržaj mora biti autentičan i specifičan za Kontekst.hr

### 5.6 Kontakt (Contact)

- **FR-050**: Sekcija Kontakt mora prikazati email adresu info@kontekst.hr
- **FR-051**: Sekcija mora sadržavati jasni CTA koji potiče posjetitelje na kontakt
- **FR-052**: Sekcija mora sadržavati mailto link na email adresu

### 5.7 SEO optimizacija

- **FR-060**: Stranica mora imati jedinstven, opisan `<title>` tag na hrvatskom jeziku
- **FR-061**: Stranica mora imati `<meta name="description">` tag optimiziran za target ključne riječi
- **FR-062**: Stranica mora sadržavati Open Graph tagove za dijeljenje na društvenim mrežama
- **FR-063**: Stranica mora ciljati ključne pojmove: "automatizacija poslovanja", "n8n Hrvatska", "AI aplikacije za poslovanje", "poslovne automatizacije"
- **FR-064**: Sve slike moraju imati opisne `alt` atribute na hrvatskom
- **FR-065**: Stranica mora sadržavati JSON-LD structured data (LocalBusiness schema)
- **FR-066**: HTML mora koristiti semantičke elemente (`<nav>`, `<main>`, `<section>`, `<footer>`, itd.)
- **FR-067**: Mora postojati samo jedan `<h1>` element po stranici; heading hijerarhija mora biti logična

### 5.8 Footer

- **FR-070**: Footer mora sadržavati copyright obavijest, email adresu i navigacijske linkove na sekcije
- **FR-071**: Footer mora sadržavati godinu i naziv tvrtke

### 5.9 Performanse i responzivnost

- **FR-080**: Stranica mora biti potpuno responzivna od 320px do 1920px širine
- **FR-081**: Stranica mora postići "Good" ocjenu u Google Core Web Vitals
- **FR-082**: Sve slike moraju biti optimizirane za web (WebP format gdje je moguće)

---

## 6. Non-Functional Requirements

### Performance
- Stranica se mora učitati u < 3s na 4G povezanosti
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, FID < 100ms

### Security
- Nema backend-a — nema sigurnosnih surface area-a za server-side napade
- Ako se doda contact form, mora imati honeypot anti-spam zaštitu

### Accessibility
- WCAG 2.1 AA razina usklađenosti
- Kontrast teksta minimum 4.5:1 za normalni tekst

### Browser / Platform Support
- Moderni browseri: Chrome 110+, Firefox 110+, Safari 16+, Edge 110+
- Mobilna responzivnost od 320px

### Reliability
- Hosting na Digital Ocean App Platform — 99.9% uptime SLA

---

## 7. Out of Scope (v1.0)

- Blog ili članci — planirano za v2 radi SEO sadržaja
- Korisnički računi ili login sustav
- Backend server ili baza podataka
- Online plaćanje ili e-commerce
- Višejezičnost (engleski) — samo hrvatsko tržište u v1
- Chat widget ili live support
- Animirani video background
- Portfolio sekcija s case studijima — planirano za v2 kad se nakupi dovoljno projekata

---

## 8. Open Questions

| # | Question | Owner | Status |
|---|----------|-------|--------|
| 1 | Hoće li contact form slati emailove (treba li serverless funkcija ili vanjski servis poput Formspree)? | Josip | Open |
| 2 | Postoji li specifični font koji odgovara brand identitetu? | Josip | Open |
| 3 | Ima li tvrtka testimonijale/reference klijenata za v1? | Josip | Open |

---

## 9. Revision History

> Human entries only. Agents do not modify this section.

| Date | Author | Change Description |
|------|--------|--------------------|
| 2026-03-25 | Josip | Initial draft |
