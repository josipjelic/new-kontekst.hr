---
id: "011"
title: "Phase 1c — Configure ESLint + Prettier"
status: "todo"
area: "setup"
agent: "@frontend-developer"
priority: "normal"
created_at: "2026-03-25"
due_date: null
started_at: null
completed_at: null
prd_refs: []
blocks: ["015", "016", "017", "018", "019"]
blocked_by: ["009"]
---

## Description

Install and configure ESLint and Prettier for the React project. This establishes consistent code style from day one of the migration and prevents formatting noise in diffs during the component-by-component migration work.

## Acceptance Criteria

- [ ] `eslint`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `@eslint/js` installed as devDependencies
- [ ] `prettier` installed as a devDependency
- [ ] `eslint-config-prettier` installed to disable ESLint rules that conflict with Prettier
- [ ] `.eslintrc.cjs` (or `eslint.config.js`) configured with:
  - React + React Hooks plugins enabled
  - `react/prop-types` rule off (no TypeScript, prop-types are optional)
  - `no-console` rule set to `warn` (enforces CLAUDE.md rule: no console.log in production)
  - `no-unused-vars` set to `warn`
- [ ] `.prettierrc` configured:
  - `semi: true`
  - `singleQuote: true`
  - `tabWidth: 2`
  - `trailingComma: 'es5'`
  - `printWidth: 100`
- [ ] `.prettierignore` excludes `dist/`, `node_modules/`, `*.html.bak`
- [ ] `npm run lint` script added to `package.json` — runs without errors on scaffold files
- [ ] `npm run format` script added to `package.json` — runs Prettier on `src/`
- [ ] `.editorconfig` created (consistent with Prettier settings) for editors without Prettier plugin

## Technical Notes

Use flat config (`eslint.config.js`) if using ESLint v9+, otherwise `.eslintrc.cjs` for ESLint v8. Match the ESLint version to what Vite's default scaffold installs.

Vite's `create-vite` scaffold may already include a basic ESLint config — update rather than replace if so.

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-25 | human | Task created as part of migration plan |
