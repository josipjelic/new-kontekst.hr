---
id: "008"
title: "Digital Ocean App Platform deployment konfiguracija"
status: "todo"
area: "infra"
agent: "@cicd-engineer"
priority: "normal"
created_at: "2026-03-25"
due_date: null
started_at: null
completed_at: null
prd_refs: []
blocks: []
blocked_by: ["001"]
---

## Description

Konfiguriraj Digital Ocean App Platform za automatski deploy statičke HTML stranice pri svakom pushu na `main` granu. Stranica nema build step — DO treba servirati statičke fileove direktno iz root direktorija.

## Acceptance Criteria

- [ ] `/.do/app.yaml` (ili ekvivalentna DO konfiguracija) kreiran i committan
- [ ] DO App Platform konfiguriran za static site deployment (ne web service)
- [ ] Auto-deploy konfiguriran za `main` granu
- [ ] Custom domena `kontekst.hr` konfigurirana (ili instrukcije za konfiguraciju)
- [ ] HTTPS automatski konfiguriran (DO to radi automatski za custom domene)
- [ ] `www.kontekst.hr` redirect na `kontekst.hr` (ili obratno — odabir je konzistentan s canonical URL-om)

## Technical Notes

Digital Ocean App Platform za statičke stranice:
- Type: `static_site`
- Output dir: `/` (root)
- Build command: prazan (nema build stepa)
- `/.do/app.yaml` primjer:

```yaml
name: kontekst-hr
static_sites:
- name: web
  github:
    repo: [org]/new-kontekst.hr
    branch: main
    deploy_on_push: true
  output_dir: /
  routes:
  - path: /
```

- Alternativno: konfiguracija direktno u DO konzoli bez app.yaml filea

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-25 | human | Task created |
