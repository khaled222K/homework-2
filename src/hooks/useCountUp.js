import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import useReducedMotion from './useReducedMotion.js';

/**
 * Counts from 0 to `target` once the element scrolls into view.
 * Uses rAF rather than a timer so it stays in step with the compositor, and
 * settles on the exact target rather than drifting.
 */
export function useCountUp(target, { duration = 1400, enabled = true } = {}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || !enabled) return undefined;
    if (reduced) {
      setValue(target);
      return undefined;
    }

    let frame;
    const start = performance.now();
    // Ease-out cubic: fast off the mark, settles gently on the final figure.
    const ease = (t) => 1 - (1 - t) ** 3;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(ease(progress) * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration, reduced, enabled]);

  return { ref, value };
}

export default useCountUp;
