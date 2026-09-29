import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import ui from '../../i18n/ui.js';
import { photographs, activeCategories, photosByCategory } from '../../data/media.js';
import { contact } from '../../data/school.js';
import Section from '../ui/Section.jsx';
import Reveal from '../ui/Reveal.jsx';
import Icon from '../ui/Icon.jsx';
import useLockBodyScroll from '../../hooks/useLockBodyScroll.js';
import { EASE } from '../ui/motion.js';

function Lightbox({ items, index, onClose, onStep }) {
  const { t, lang, isRtl } = useLanguage();
  const closeRef = useRef(null);
  const photo = items[index];

  useLockBodyScroll(true);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      // In RTL the visual "next" is the left arrow, so the mapping flips.
      if (e.key === 'ArrowRight') onStep(isRtl ? -1 : 1);
      if (e.key === 'ArrowLeft') onStep(isRtl ? 1 : -1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onStep, isRtl]);

  if (!photo) return null;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={t(ui.gallery.title)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="fixed inset-0 z-[70] flex flex-col bg-navy-950/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex items-center justify-between gap-4 p-4 sm:p-6">
        <p className="tabular font-mono text-sm text-navy-300">
          {index + 1} / {items.length}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t(ui.gallery.lightboxClose)}
          className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-white/20"
        >
          <Icon name="close" className="h-5 w-5" />
        </button>
      </div>

      <div
        className="flex flex-1 items-center justify-center gap-3 px-3 pb-3 sm:gap-6 sm:px-6"
        onClick={(e) => e.stopPropagation()}
      >
        {items.length > 1 && (
          <button
            type="button"
            onClick={() => onStep(-1)}
            aria-label={t(ui.gallery.lightboxPrev)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-white/20"
          >
            <Icon name={isRtl ? 'arrowRight' : 'arrowLeft'} className="h-5 w-5" />
          </button>
        )}

        <AnimatePresence mode="wait">
          <motion.figure
            key={photo.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="flex min-w-0 max-w-5xl flex-col items-center"
          >
            <img
              src={photo.src}
              alt={photo.alt[lang] ?? photo.alt.ar}
              width={photo.width}
              height={photo.height}
              className="max-h-[68vh] w-auto max-w-full rounded-xl object-contain"
            />
            <figcaption className="mt-5 max-w-2xl text-center text-sm leading-relaxed text-navy-200">
              {photo.caption?.[lang] ?? photo.alt[lang] ?? photo.alt.ar}
              <span className="mt-2 block text-xs text-navy-400">
                {t(ui.gallery.source)}:{' '}
                <a
                  href={photo.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-dotted underline-offset-4 hover:text-white"
                >
                  {photo.credit}
                </a>
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>

        {items.length > 1 && (
          <button
            type="button"
            onClick={() => onStep(1)}
            aria-label={t(ui.gallery.lightboxNext)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-white/20"
          >
            <Icon name={isRtl ? 'arrowLeft' : 'arrowRight'} className="h-5 w-5" />
          </button>
        )}
      </div>
    </motion.div>
  );
}

/**
 * The empty state.
 *
 * Shown when no photograph has been verified. It explains the rule rather than
 * hiding the section, and routes the visitor to the publishers who do hold
 * authentic imagery.
 */
function AwaitingPhotography() {
  const { t } = useLanguage();

  const channels = [
    { label: t({ ar: 'الموقع الرسمي للمدارس', en: 'The schools’ official website' }), url: contact.website.url },
    { label: `${contact.social[0].network} · ${contact.social[0].handle}`, url: contact.social[0].url },
    { label: t({ ar: 'المركز الإعلامي لوزارة التعليم', en: 'Ministry of Education media centre' }), url: 'https://www.moe.gov.sa/ar/mediacenter/' },
    { label: t({ ar: 'وكالة الأنباء السعودية', en: 'Saudi Press Agency' }), url: 'https://www.spa.gov.sa/' },
  ];

  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-panel border border-mist-200 bg-mist-50 p-8 sm:p-12">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-motif grid-motif-fade opacity-70" />

        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
          <div>
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-white text-royal-700 shadow-card">
              <Icon name="image" className="h-6 w-6" strokeWidth={1.5} />
            </span>
            <h3 className="mt-6 text-2xl font-semibold text-navy-900">{t(ui.gallery.emptyTitle)}</h3>
            <p className="mt-4 max-w-prose text-pretty leading-relaxed text-ink-muted">{t(ui.gallery.emptyBody)}</p>
          </div>

          <ul className="grid gap-2.5">
            {channels.map((channel) => (
              <li key={channel.url}>
                <a
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 rounded-xl border border-mist-200 bg-white px-4 py-3.5 text-sm font-medium text-navy-800 transition-[border-color,box-shadow,transform] duration-300 ease-premium hover:-translate-y-0.5 hover:border-royal-200 hover:shadow-card"
                >
                  <span className="min-w-0 truncate">{channel.label}</span>
                  <Icon
                    name="external"
                    className="h-4 w-4 shrink-0 text-ink-faint transition-colors duration-300 group-hover:text-royal-700"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

export function Gallery() {
  const { t, lang } = useLanguage();
  const [category, setCategory] = useState('all');
  const [openAt, setOpenAt] = useState(null);

  const categories = useMemo(() => ['all', ...activeCategories()], []);
  const items = useMemo(() => photosByCategory(category), [category]);

  const step = useCallback(
    (delta) => setOpenAt((i) => (i === null ? null : (i + delta + items.length) % items.length)),
    [items.length],
  );

  return (
    <Section id="gallery" eyebrow={t(ui.gallery.eyebrow)} title={t(ui.gallery.title)} tone="light">
      {photographs.length === 0 ? (
        <AwaitingPhotography />
      ) : (
        <>
          {categories.length > 2 && (
            <Reveal className="mb-8 flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setCategory(c);
                    setOpenAt(null);
                  }}
                  aria-pressed={category === c}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    category === c ? 'text-white' : 'text-ink-muted hover:text-navy-900'
                  }`}
                >
                  {category === c && (
                    <motion.span layoutId="gallery-filter" className="absolute inset-0 rounded-full bg-navy-900" transition={{ duration: 0.35, ease: EASE }} />
                  )}
                  <span className="relative">{c === 'all' ? t(ui.gallery.all) : t(ui.gallery.categories[c])}</span>
                </button>
              ))}
            </Reveal>
          )}

          <motion.ul layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {items.map((photo, i) => (
                <motion.li
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.45, ease: EASE, delay: Math.min(i, 8) * 0.04 }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenAt(i)}
                    className="group relative block w-full overflow-hidden rounded-card bg-mist-100 shadow-card transition-shadow duration-500 hover:shadow-card-hover"
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt[lang] ?? photo.alt.ar}
                      width={photo.width}
                      height={photo.height}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    />
                    <span className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-start text-sm font-medium text-white opacity-0 transition-[opacity,transform] duration-500 ease-premium group-hover:translate-y-0 group-hover:opacity-100">
                      {photo.caption?.[lang] ?? photo.alt[lang] ?? photo.alt.ar}
                    </span>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </>
      )}

      <AnimatePresence>
        {openAt !== null && (
          <Lightbox items={items} index={openAt} onClose={() => setOpenAt(null)} onStep={step} />
        )}
      </AnimatePresence>
    </Section>
  );
}

export default Gallery;
