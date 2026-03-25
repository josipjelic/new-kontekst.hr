# Kontekst.hr

> Marketinška web stranica za Kontekst.hr — tvrtku specijaliziranu za poslovne automatizacije, n8n workflowove i AI aplikacije.

---

## Overview

Kontekst.hr je statična marketinška web stranica koja služi kao digitalna vizitka tvrtke i alat za generiranje potencijalnih klijenata. Stranica prezentira usluge tvrtke (n8n workflow automatizacije, automatizacija poslovnih procesa, razvoj AI aplikacija) vlasnicima tvrtki koji žele optimizirati i automatizirati svoje poslovanje.

Stranica je izgrađena kao plain HTML s Tailwind CSS-om — bez backend-a, bez baze podataka, bez build procesa. Hosting je na Digital Ocean App Platform s automatskim deployom iz `main` grane.

Dizajn je futuristički s tamnom bazom (grey paleta), responzivan za sve uređaje, i u potpunosti SEO-optimiziran za hrvatsko tržište.

---

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Frontend | Plain HTML5 | Semantički markup, single-page |
| Styling | Tailwind CSS (CDN) | Utility-first, bez build stepa |
| JavaScript | Vanilla JS (ES6+) | Samo za nav toggle i micro-interakcije |
| Hosting | Digital Ocean App Platform | Auto-deploy iz main grane |

---

## Getting Started

### Prerequisites

- Web browser (Chrome, Firefox, Safari, Edge)
- Opcionalno: VS Code s Live Server ekstenzijom za lokalni development

### Running Locally

```bash
# Kloniraj repozitorij
git clone https://github.com/[org]/new-kontekst.hr.git
cd new-kontekst.hr

# Otvori u browseru
open index.html

# Ili koristi VS Code Live Server:
# 1. Otvori projekt u VS Code
# 2. Desni klik na index.html → "Open with Live Server"
```

### Deployment

Stranica se automatski deploya na Digital Ocean App Platform pri svakom pushu na `main` granu.

```bash
git add .
git commit -m "feat(section): opis promjene"
git push origin main
# Digital Ocean App Platform automatski deploya
```

---

## Project Structure

```
new-kontekst.hr/
├── index.html              # Glavna (i jedina) HTML stranica
├── assets/
│   ├── css/
│   │   └── custom.css      # CSS overrides izvan Tailwinda
│   ├── js/
│   │   └── main.js         # Vanilla JS za interakcije
│   └── images/             # Slike, ikone, ilustracije
├── logo-light.svg          # Logo tvrtke (bijela verzija)
├── docs/
│   ├── user/               # Korisnička dokumentacija
│   └── technical/          # Arhitektura, odluke
├── .claude/agents/         # Claude Code specijalistički agenti
├── .tasks/                 # Detaljni task fileovi
├── PRD.md                  # Product requirements (source of truth)
├── TODO.md                 # Projektni backlog
└── CLAUDE.md               # Claude AI upute
```

---

## Environment Variables

Nema environment varijabli — statična stranica bez backend-a.

---

## Deployment

Stranica se deploya na Digital Ocean App Platform.

- **Production**: https://kontekst.hr (TBD)
- Auto-deploy: Svaki push na `main` granu

---

## License

Proprietary — Kontekst.hr, sva prava pridržana.
