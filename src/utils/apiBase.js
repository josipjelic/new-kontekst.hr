/**
 * Resolves the API origin for browser fetch calls.
 * When VITE_API_URL is unset or empty, use same-origin paths (e.g. /api/...) — required for App Platform ingress.
 * @param {string | undefined} viteApiUrl — usually import.meta.env.VITE_API_URL
 */
export function getApiBaseFromEnv(viteApiUrl) {
  if (viteApiUrl == null || String(viteApiUrl).trim() === '') return '';
  return String(viteApiUrl).replace(/\/$/, '');
}

export function getApiBase() {
  return getApiBaseFromEnv(import.meta.env.VITE_API_URL);
}

/** @param {string} path — must start with / (e.g. /api/contact) */
export function apiUrlFromBase(base, path) {
  const p = path.startsWith('/') ? path : `/${path}`;
  return base ? `${base}${p}` : p;
}

export function apiUrl(path) {
  return apiUrlFromBase(getApiBase(), path);
}
