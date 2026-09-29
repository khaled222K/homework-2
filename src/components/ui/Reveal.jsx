import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from './motion.js';

/**
 * Scroll-triggered entrance for a block of content.
 * `index` staggers siblings; `as` keeps the underlying element semantic.
 */
export function Reveal({ children, index = 0, as = 'div', variants = fadeUp, className, ...rest }) {
  const Component = motion[as] ?? motion.div;
  return (
    <Component
      className={className}
      variants={variants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      {...rest}
    >
      {children}
    </Component>
  );
}

export default Reveal;
