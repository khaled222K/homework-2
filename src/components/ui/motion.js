/**
 * Shared motion vocabulary.
 *
 * One easing curve and one distance scale across the whole site: movement is
 * short (16–24px), fast (0.5–0.7s) and always settles. Nothing loops, spins or
 * bounces. Variants read `custom` for stagger index where relevant.
 */
export const EASE = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE, delay: i * 0.07 },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({ opacity: 1, transition: { duration: 0.6, ease: EASE, delay: i * 0.07 } }),
};

/** For the hero headline: each line clears a mask from below. */
export const lineReveal = {
  hidden: { opacity: 0, y: '0.6em' },
  visible: (i = 0) => ({
    opacity: 1,
    y: '0em',
    transition: { duration: 0.8, ease: EASE, delay: 0.1 + i * 0.09 },
  }),
};

/** Image and panel reveal: a slight scale settle reads as a camera focusing. */
export const mediaReveal = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: EASE } },
};

export const staggerChildren = (stagger = 0.07, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

/** Standard scroll trigger: fire once, a little before the element is centred. */
export const viewportOnce = { once: true, margin: '-12% 0px -8% 0px' };
