import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import ui from '../../i18n/ui.js';
import { photographs, activeCategories, photosByCategory } from '../../data/media.js';
import { channelGroups, featuredChannels } from '../../data/channels.js';
import Section from '../ui/Section.jsx';
import Reveal from '../ui/Reveal.jsx';
import Badge from '../ui/Badge.jsx';
import SourceNote from '../ui/SourceNote.jsx';
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

/** One channel card. `featured` gives it the heavier treatment. */
function ChannelCard({ channel, index, featured = false }) {
  const { t, lang } = useLanguage();

  return (
    <Reveal
      as="li"
      index={index}
      className={
        featured
          ? 'card-interactive group relative flex flex-col overflow-hidden bg-navy-950 p-6 sm:p-7'
          : 'card-interactive group relative flex flex-col p-6'
      }
    >
      <a href={channel.url} target="_blank" rel="noopener noreferrer" className="flex flex-1 flex-col">
        {/* The whole card is the target; the link is stretched over it. */}
        <span aria-hidden="true" className="absolute inset-0" />

        <span
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors duration-500 ${
            featured
              ? 'bg-white/10 text-white group-hover:bg-white group-hover:text-navy-950'
              : 'bg-mist-100 text-royal-700 group-hover:bg-royal-700 group-hover:text-white'
          }`}
        >
          <Icon name={channel.icon} className="h-5 w-5" strokeWidth={1.5} filled={channel.brand} />
        </span>

        <h4 className={`mt-5 text-[1.0625rem] font-semibold leading-snug ${featured ? 'text-white' : 'text-navy-900'}`}>
          {t(channel.nameAr, channel.nameEn)}
        </h4>

        {channel.handle && (
          <p className={`mt-1 text-xs ${featured ? 'text-navy-400' : 'text-ink-faint'}`} dir="ltr">
            {channel.handle}
          </p>
        )}

        <p
          className={`mt-3 flex-1 text-pretty text-sm leading-relaxed ${
            featured ? 'text-navy-300' : 'text-ink-muted'
          }`}
        >
          {t(channel.descAr, channel.descEn)}
        </p>

        <span
          className={`mt-5 inline-flex items-center gap-1.5 text-sm font-medium ${
            featured ? 'text-white' : 'text-royal-700'
          }`}
        >
          {t(ui.gallery.view)}
          <Icon
            name={lang === 'ar' ? 'arrowLeft' : 'arrowRight'}
            className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:-translate-x-0.5 ltr:group-hover:translate-x-0.5"
          />
        </span>
      </a>
    </Reveal>
  );
}

/**
 * Where to see the schools.
 *
 * Rather than republish imagery whose attribution cannot be verified, this
 * routes visitors to the publishers who hold it. Each group is badged with whose
 * channel it is, because the schools' own account, the operating academy's, and a
 * ministry release are three different things.
 */
function Channels() {
  const { t } = useLanguage();

  return (
    <div className="grid gap-16">
      {/* The shortest path first. */}
      <div>
        <Reveal className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h4 className="text-lg font-semibold text-navy-900">{t(ui.gallery.featuredTitle)}</h4>
          <p className="text-sm text-ink-faint">{t(ui.gallery.featuredNote)}</p>
        </Reveal>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredChannels.map((channel, i) => (
            <ChannelCard key={channel.id} channel={channel} index={i} featured />
          ))}
        </ul>
      </div>

      {channelGroups.map((group) => (
        <div key={group.id}>
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <h4 className="text-lg font-semibold text-navy-900">{t(group.titleAr, group.titleEn)}</h4>
              <Badge variant={group.owner === 'schools' ? 'royal' : 'neutral'}>
                {t(ui.gallery.ownerLabels[group.owner])}
              </Badge>
            </div>
            <p className="mt-3 max-w-prose text-pretty text-sm leading-relaxed text-ink-muted">
              {t(group.noteAr, group.noteEn)}
            </p>
          </Reveal>

          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.items.map((channel, i) => (
              <ChannelCard key={channel.id} channel={channel} index={i} />
            ))}
          </ul>

          <Reveal className="mt-5">
            <SourceNote keys={group.sources} />
          </Reveal>
        </div>
      ))}
    </div>
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
    <Section
      id="gallery"
      eyebrow={t(ui.gallery.eyebrow)}
      title={t(ui.gallery.channelsTitle)}
      lead={t(ui.gallery.channelsLead)}
      tone="light"
    >
      {photographs.length > 0 && (
        <div className="mb-20">
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
        </div>
      )}

      <Channels />

      <AnimatePresence>
        {openAt !== null && (
          <Lightbox items={items} index={openAt} onClose={() => setOpenAt(null)} onStep={step} />
        )}
      </AnimatePresence>
    </Section>
  );
}

export default Gallery;
