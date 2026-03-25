/**
 * Post-build hook: previously copied legacy static `en/index.html` and root `assets/*`
 * into `dist/`. The site is now a single Vite SPA; `/` and `/en` are handled by
 * react-router. `vite build` already emits the full app under `dist/`.
 */
// Intentionally empty — kept so `npm run build` can chain this step without changing CI.
