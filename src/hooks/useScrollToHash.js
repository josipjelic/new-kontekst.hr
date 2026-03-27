import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to the element matching location.hash after client-side navigation.
 * React Router does not perform native in-page hash scrolling for <Link to="/#id">.
 *
 * @param {string} homePathname - Path where section ids exist (e.g. '/' or '/en')
 */
export function useScrollToHash(homePathname) {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (pathname !== homePathname) return;
    if (!hash || hash === '#') return;
    const id = decodeURIComponent(hash.slice(1));
    if (!id) return;

    const scrollToTarget = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return true;
      }
      return false;
    };

    if (scrollToTarget()) return;

    const frame = requestAnimationFrame(() => {
      scrollToTarget();
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, homePathname]);
}
