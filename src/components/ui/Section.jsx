import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from './motion.js';

/**
 * The page's one section shell: anchor id, consistent vertical rhythm, and an
 * optional eyebrow/title/lead header that animates in together.
 */
export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  tone = 'light',
  className = '',
  headerClassName = '',
  align = 'start',
  labelledBy,
}) {
  const tones = {
    light: 'bg-white',
    mist: 'bg-mist-50',
    navy: 'bg-navy-950 text-white',
  };

  const headingId = id ? `${id}-heading` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={labelledBy ?? (title ? headingId : undefined)}
      className={`relative scroll-mt-28 py-20 sm:py-24 lg:py-32 ${tones[tone]} ${className}`}
    >
      <div className="container-page">
        {(eyebrow || title || lead) && (
          <motion.header
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className={`mb-12 max-w-3xl sm:mb-16 ${align === 'center' ? 'mx-auto text-center' : ''} ${headerClassName}`}
          >
            {eyebrow && (
              <p className={`eyebrow ${tone === 'navy' ? 'text-royal-300' : ''}`}>
                <span
                  aria-hidden="true"
                  className={`inline-block h-px w-8 ${tone === 'navy' ? 'bg-royal-400/60' : 'bg-royal-400'}`}
                />
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                id={headingId}
                className={`mt-4 text-display-md font-semibold ${tone === 'navy' ? 'text-white' : 'text-navy-900'}`}
              >
                {title}
              </h2>
            )}
            {lead && (
              <p
                className={`mt-5 max-w-prose text-pretty text-base leading-relaxed sm:text-lg ${
                  tone === 'navy' ? 'text-navy-200' : 'text-ink-muted'
                }`}
              >
                {lead}
              </p>
            )}
          </motion.header>
        )}
        {children}
      </div>
    </section>
  );
}

export default Section;
