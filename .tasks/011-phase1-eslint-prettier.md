---
id: "011"
title: "Phase 1c — Configure ESLint + Prettier"
status: "done"
area: "setup"
agent: "@frontend-developer"
priority: "normal"
created_at: "2026-03-25"
due_date: null
started_at: null
completed_at: "2026-03-25"
prd_refs: []
blocks: ["015", "016", "017", "018", "019"]
blocked_by: ["009"]
---

## Description

Install and configure ESLint and Prettier for the React project. This establishes consistent code style from day one of the migration and prevents formatting noise in diffs during the component-by-component migration work.

## Acceptance Criteria

- [x] `eslint`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `@eslint/js` installed as devDependencies
- [x] `prettier` installed as a devDependency
- [x] `eslint-config-prettier` installed to disable ESLint rules that conflict with Prettier
- [x] `.eslintrc.cjs` (or `eslint.config.js`) configured with:
  - React + React Hooks plugins enabled
  - `react/prop-types` rule off (no TypeScript, prop-types are optional)
  - `no-console` rule set to `warn` (enforces CLAUDE.md rule: no console.log in production)
  - `no-unused-vars` set to `warn`
- [x] `.prettierrc` configured:
  - `semi: true`
  - `singleQuote: true`
  - `tabWidth: 2`
  - `trailingComma: 'es5'`
  - `printWidth: 100`
- [x] `.prettierignore` excludes `dist/`, `node_modules/`, `*.html.bak`
- [x] `npm run lint` script added to `package.json` — runs without errors on scaffold files
- [x] `npm run format` script added to `package.json` — runs Prettier on `src/`
- [x] `.editorconfig` created (consistent with Prettier settings) for editors without Prettier plugin

## Technical Notes

Use flat config (`eslint.config.js`) if using ESLint v9+, otherwise `.eslintrc.cjs` for ESLint v8. Match the ESLint version to what Vite's default scaffold installs.

Vite's `create-vite` scaffold may already include a basic ESLint config — update rather than replace if so.

## History

| Date | Agent / Human | Event |
|------|--------------|-------|
| 2026-03-25 | human | Task created as part of migration plan |
| 2026-03-25 | @frontend-developer | ESLint 9 flat config, Prettier, `.editorconfig`, `lint`/`format` scripts — task completed |
