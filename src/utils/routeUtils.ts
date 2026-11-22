/**
 * Determines whether a given window.location.pathname corresponds to the home portfolio route.
 * Accurately prevents false 404s on /index.html, trailing slashes, redundant slashes, and case differences.
 */
export function isHomeRoute(pathname?: string | null): boolean {
  if (!pathname || typeof pathname !== 'string') return true;
  const clean = pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  return clean === '' || clean === 'index.html';
}
