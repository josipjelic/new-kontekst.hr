import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const OBSERVER_OPTIONS = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px',
};

/** Mirrors OBSERVER_OPTIONS (viewport root + bottom rootMargin) for scroll-restore passes. */
function intersectionRatioAgainstRoot(el) {
  const rect = el.getBoundingClientRect();
  const rootBottom = window.innerHeight - 40;
  const intersectLeft = Math.max(rect.left, 0);
  const intersectTop = Math.max(rect.top, 0);
  const intersectRight = Math.min(rect.right, window.innerWidth);
  const intersectBottom = Math.min(rect.bottom, rootBottom);
  const iw = Math.max(0, intersectRight - intersectLeft);
  const ih = Math.max(0, intersectBottom - intersectTop);
  const intersectionArea = iw * ih;
  const targetArea = rect.width * rect.height;
  if (targetArea <= 0) {
    return 0;
  }
  return intersectionArea / targetArea;
}

/**
 * Dodaje klasu `.visible` na elemente s klasom `.reveal` kad uđu u viewport.
 * Poštuje `prefers-reduced-motion: reduce` — odmah označava sve kao vidljive.
 *
 * Nakon refresha na sredini stranice browser ponekad obnovi scroll nakon prvog IO
 * ciklusa — dodatni flush (rAF + load) sinkronizira već vidljive elemente.
 *
 * Ponovno se postavlja pri promjeni rute (npr. HR/EN) jer se DOM zamijeni novim `.reveal` čvorovima.
 */
export function useScrollReveal() {
  const { pathname } = useLocation();

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

    const flushMissedIntersections = () => {
      if (typeof observer.takeRecords === 'function') {
        const pending = observer.takeRecords();
        pending.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }
      nodes.forEach((el) => {
        if (el.classList.contains('visible')) {
          return;
        }
        if (intersectionRatioAgainstRoot(el) >= OBSERVER_OPTIONS.threshold) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      });
    };

    nodes.forEach((el) => {
      observer.observe(el);
    });

    let rafOuter = 0;
    let rafInner = 0;
    const scheduleFlush = () => {
      flushMissedIntersections();
      cancelAnimationFrame(rafOuter);
      cancelAnimationFrame(rafInner);
      rafOuter = requestAnimationFrame(() => {
        rafInner = requestAnimationFrame(() => {
          rafOuter = 0;
          rafInner = 0;
          flushMissedIntersections();
        });
      });
    };

    scheduleFlush();

    const onLoad = () => {
      flushMissedIntersections();
    };
    window.addEventListener('load', onLoad);

    return () => {
      window.removeEventListener('load', onLoad);
      cancelAnimationFrame(rafOuter);
      cancelAnimationFrame(rafInner);
      observer.disconnect();
    };
  }, [pathname]);
}
