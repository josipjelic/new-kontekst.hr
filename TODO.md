# TODO / Backlog

> **Governor**: @project-manager — invoke for sprint planning, prioritization, and feature breakdown
> **Agents**: May add items to "Backlog" and move completed items to "Completed". Preserve section order. Never reorder items within a section — priority position is set by humans or @project-manager when explicitly asked.

---

## In Progress

_(nothing in progress)_

---

## Up Next (prioritized)

_(nothing up next — see Backlog)_

---

## Backlog

- [ ] #006 — Sekcija Kontakt i footer [area: frontend] → [.tasks/006-kontakt-and-footer.md](.tasks/006-kontakt-and-footer.md)
- [ ] #008 — Digital Ocean App Platform deployment konfiguracija [area: infra] → [.tasks/008-digitalocean-deployment.md](.tasks/008-digitalocean-deployment.md)

---

## Completed

- [x] #005 — Sekcija O nama [area: frontend] → [.tasks/005-o-nama-section.md](.tasks/005-o-nama-section.md)
- [x] #007 — SEO optimizacija: meta tagovi, Open Graph, JSON-LD structured data [area: frontend] → [.tasks/007-seo-optimization.md](.tasks/007-seo-optimization.md)
- [x] #004 — Sekcija Kako radimo — proces u koracima [area: frontend] → [.tasks/004-kako-radimo-section.md](.tasks/004-kako-radimo-section.md)
- [x] #003 — Sekcija Usluge — 3 kartice usluga [area: frontend] → [.tasks/003-usluge-section.md](.tasks/003-usluge-section.md)
- [x] #002 — Hero sekcija s futurističkim dizajnom i CTA [area: frontend] → [.tasks/002-hero-section.md](.tasks/002-hero-section.md)
- [x] #001 — HTML boilerplate, Tailwind setup, i navigacijski header [area: frontend] → [.tasks/001-html-boilerplate-and-nav.md](.tasks/001-html-boilerplate-and-nav.md)
- [x] #000 — Initial project setup and template configuration → [.tasks/000-initial-project-setup.md](.tasks/000-initial-project-setup.md)

---

## Item Format Guide

When adding new items, use this format:

```
- [ ] #NNN — Brief description of the task [area: frontend|backend|database|qa|docs|infra|design] → [.tasks/NNN-short-title.md](.tasks/NNN-short-title.md)
```

Every TODO item must have a corresponding `.tasks/NNN-*.md` file. @project-manager creates both together.

**Area tags** help agents know which specialist to use:
- `frontend` → @frontend-developer
- `design` → @ui-ux-designer
- `qa` → @qa-engineer
- `docs` → @documentation-writer
- `infra` → @systems-architect / @cicd-engineer
- `setup` → general
