# Changelog

All notable changes to Kontekst.hr are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com), and this project adheres to [Semantic Versioning](https://semver.org).

---

## [Unreleased]

### Added

- User guide rewritten for React + Docker stack. Includes local dev setup, Docker instructions, contact form testing, and troubleshooting.
- Content strategy expanded: brand voice and tone (conversational, expert), target personas (Jelena, Marko, Nina) with copy-relevant insights, CTA library with canonical strings, technical SEO decisions (meta tags, structured data, hreflang).
- Content calendar for future blog/case study content.

### Changed

- Documentation updated to reflect migration from plain HTML + Tailwind CDN to Vite + React + Node.js/Express + Docker (ADR-002).
- Architecture doc (v2.0) now describes React SPA with Express backend, Docker setup, production nginx proxy config.

---

## [0.1.0] — 2026-03-25

### Added

- Initial marketing website launch with React + Vite frontend, Node.js/Express backend, Docker containerization.
- Homepage with sections: Hero, Services (Usluge), How We Work (Kako radimo), About Us (O nama), Contact (Kontakt), Footer.
- Contact form with server-side validation, rate limiting, CORS, email sending.
- Scroll reveal animations, IntersectionObserver scroll detection, `prefers-reduced-motion` support.
- Design system: dark theme (surface tokens), teal accent, Syne + DM Sans typography, pointer-driven parallax motion.
- SEO optimization: meta tags, Open Graph, JSON-LD (ProfessionalService, WebSite schemas).
- Responsive design: mobile navigation toggle, 44×44px touch targets, WCAG 2.1 AA accessibility.
- Docker setup: dev (`docker-compose.yml`) with hot reload, production simulation (`docker-compose.prod.yml`) with nginx proxy.
- Lint and format: ESLint 9, Prettier configuration.
- Tailwind CSS build with PostCSS, tree-shaking (replaces CDN from earlier prototype).

### Technical

- Migration from ADR-001 (Plain HTML + Tailwind CDN) to ADR-002 (Vite + React + Node.js/Express + Docker).
- Six migration phases completed: scaffolding, frontend components, backend API, Docker, (CI/CD and QA pending).
- All site copy in Croatian; documentation in English.

---
