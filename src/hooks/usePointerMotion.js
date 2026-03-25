import { useEffect } from 'react';

/**
 * Normalized pointer in [-1, 1] on :root as --pointer-nx / --pointer-ny.
 * Updates via one rAF loop + lerp; no React state per frame.
 * Off when prefers-reduced-motion or when (pointer: coarse) or (hover: none).
 */
const LERP = 0.11;
const IDLE_MS = 1600;
const IDLE_LERP = 0.06;

function setPointerVars(root, x, y) {
  root.style.setProperty('--pointer-nx', x.toFixed(5));
  root.style.setProperty('--pointer-ny', y.toFixed(5));
}

function neutralPointerVars(root) {
  setPointerVars(root, 0, 0);
}

function pointerMotionAllowed() {
  if (typeof window === 'undefined') {
    return false;
  }
  return (
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
    window.matchMedia('(pointer: fine)').matches &&
    window.matchMedia('(hover: hover)').matches
  );
}

export function usePointerMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mqFine = window.matchMedia('(pointer: fine)');
    const mqHover = window.matchMedia('(hover: hover)');

    let remove = () => {};

    function attach() {
      remove();
      neutralPointerVars(root);

      if (!pointerMotionAllowed()) {
        remove = () => {};
        return;
      }

      const target = { x: 0, y: 0 };
      const smoothed = { x: 0, y: 0 };
      let lastMove = performance.now();
      let rafId = 0;

      const onPointerMove = (e) => {
        lastMove = performance.now();
        const w = window.innerWidth || 1;
        const h = window.innerHeight || 1;
        target.x = (e.clientX / w) * 2 - 1;
        target.y = (e.clientY / h) * 2 - 1;
      };

      const tick = () => {
        const now = performance.now();
        if (now - lastMove > IDLE_MS) {
          target.x += (0 - target.x) * IDLE_LERP;
          target.y += (0 - target.y) * IDLE_LERP;
        }
        smoothed.x += (target.x - smoothed.x) * LERP;
        smoothed.y += (target.y - smoothed.y) * LERP;
        setPointerVars(root, smoothed.x, smoothed.y);
        rafId = requestAnimationFrame(tick);
      };

      const onVisibility = () => {
        if (document.visibilityState === 'hidden') {
          cancelAnimationFrame(rafId);
          rafId = 0;
          target.x = target.y = smoothed.x = smoothed.y = 0;
          neutralPointerVars(root);
        } else if (rafId === 0) {
          rafId = requestAnimationFrame(tick);
        }
      };

      document.addEventListener('pointermove', onPointerMove, { passive: true });
      document.addEventListener('visibilitychange', onVisibility);
      rafId = requestAnimationFrame(tick);

      remove = () => {
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('visibilitychange', onVisibility);
        cancelAnimationFrame(rafId);
        rafId = 0;
        target.x = target.y = smoothed.x = smoothed.y = 0;
        neutralPointerVars(root);
      };
    }

    const onMq = () => attach();

    attach();
    mqReduce.addEventListener('change', onMq);
    mqFine.addEventListener('change', onMq);
    mqHover.addEventListener('change', onMq);

    return () => {
      mqReduce.removeEventListener('change', onMq);
      mqFine.removeEventListener('change', onMq);
      mqHover.removeEventListener('change', onMq);
      remove();
    };
  }, []);
}

export { pointerMotionAllowed };
