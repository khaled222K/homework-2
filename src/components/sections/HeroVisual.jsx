import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { getHeroPhoto } from '../../data/media.js';
import { tracks } from '../../data/school.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import Icon from '../ui/Icon.jsx';
import { EASE, mediaReveal } from '../ui/motion.js';

/**
 * The hero's main visual.
 *
 * If a photograph has been verified and registered in src/data/media.js it is
 * used. Otherwise we render a designed panel built from the school's own four
 * technical tracks — deliberately architectural rather than pictorial, so it
 * never implies it is a picture of the campus.
 */
export function HeroVisual() {
  const { t, lang } = useLanguage();
  const photo = getHeroPhoto();
  const containerRef = useRef(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  // A very shallow parallax — 28px of travel across the whole scroll range.
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [14, -14]);

  return (
    <motion.div ref={containerRef} style={{ y }} className="relative">
      {/* Technical framing marks: two thin rules and a corner bracket. */}
      <span aria-hidden="true" className="absolute -top-5 start-8 h-10 w-px bg-gradient-to-b from-transparent to-royal-300" />
      <span aria-hidden="true" className="absolute -bottom-5 end-12 h-10 w-px bg-gradient-to-t from-transparent to-royal-300" />
      <span
        aria-hidden="true"
        className="absolute -start-4 -top-4 hidden h-16 w-16 rounded-tl-2xl border-s-2 border-t-2 border-royal-200 rtl:rounded-tl-none rtl:rounded-tr-2xl sm:block"
      />

      <motion.div
        variants={mediaReveal}
        initial="hidden"
        animate="visible"
        className="relative overflow-hidden rounded-panel bg-navy-950 shadow-panel"
      >
        {photo ? (
          <figure className="relative">
            <img
              src={photo.src}
              alt={photo.alt[lang] ?? photo.alt.ar}
              width={photo.width}
              height={photo.height}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="aspect-[4/3] w-full object-cover sm:aspect-[5/4]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/90 to-transparent p-5 text-xs text-navy-100">
              {photo.credit}
            </figcaption>
          </figure>
        ) : (
          <div className="relative aspect-[4/3] w-full sm:aspect-[5/4]">
            <div aria-hidden="true" className="absolute inset-0 grid-motif opacity-[0.55]" />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_65%_15%,rgba(29,90,232,0.35),transparent_70%)]"
            />

            <div className="relative flex h-full flex-col justify-between p-7 sm:p-9">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-royal-300">
                    {lang === 'ar' ? 'المسارات' : 'Tracks'}
                  </p>
                  <p className="mt-1.5 font-mono text-xs text-navy-300">
                    {lang === 'ar' ? '٠١ — ٠٤' : '01 — 04'}
                  </p>
                </div>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-white ring-1 ring-inset ring-white/15">
                  <Icon name="academic" className="h-5 w-5" strokeWidth={1.4} />
                </span>
              </div>

              <ul className="grid grid-cols-2 gap-2.5 sm:gap-3">
                {tracks.map((track, i) => (
                  <motion.li
                    key={track.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.45 + i * 0.08 }}
                    className="group rounded-xl bg-white/[0.06] p-3.5 ring-1 ring-inset ring-white/10 backdrop-blur-[2px] transition-colors duration-500 hover:bg-white/[0.11] sm:p-4"
                  >
                    <Icon name={track.icon} className="h-5 w-5 text-royal-300" strokeWidth={1.5} />
                    <p className="mt-2.5 text-[0.8125rem] font-medium leading-snug text-white sm:text-sm">
                      {t(track.nameAr, track.nameEn)}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default HeroVisual;
