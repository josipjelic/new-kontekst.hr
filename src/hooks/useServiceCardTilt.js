import { useCallback, useEffect, useRef } from 'react';

import { pointerMotionAllowed } from './usePointerMotion.js';

const MAX_TILT = 2.5;

/**
 * Pointer-relative tilt for .service-card (hover only). Sets --tilt-x / --tilt-y (degrees scale) on the element.
 * No-op when reduced motion, coarse pointer, or no hover capability.
 */
export function useServiceCardTilt() {
  const allowedRef = useRef(false);

  useEffect(() => {
    const sync = () => {
      allowedRef.current = pointerMotionAllowed();
    };
    sync();
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mqAnyFine = window.matchMedia('(any-pointer: fine)');
    mqReduce.addEventListener('change', sync);
    mqAnyFine.addEventListener('change', sync);
    return () => {
      mqReduce.removeEventListener('change', sync);
      mqAnyFine.removeEventListener('change', sync);
    };
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!allowedRef.current) {
      return;
    }
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    if (r.width <= 0 || r.height <= 0) {
      return;
    }
    const nx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
    const ny = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
    el.style.setProperty('--tilt-x', (ny * -MAX_TILT).toFixed(3));
    el.style.setProperty('--tilt-y', (nx * MAX_TILT).toFixed(3));
  }, []);

  const onPointerLeave = useCallback((e) => {
    e.currentTarget.style.removeProperty('--tilt-x');
    e.currentTarget.style.removeProperty('--tilt-y');
  }, []);

  return { onPointerMove, onPointerLeave };
}
