import { useEffect } from 'react';

const OBSERVER_OPTIONS = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px',
};

/**
 * Dodaje klasu `.visible` na elemente s klasom `.reveal` kad uđu u viewport.
 * Poštuje `prefers-reduced-motion: reduce` — odmah označava sve kao vidljive.
 */
export function useScrollReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal');
    if (nodes.length === 0) {
      return;
    }

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      nodes.forEach((el) => {
        el.classList.add('visible');
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, OBSERVER_OPTIONS);

    nodes.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);
}
