import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import ui from '../../i18n/ui.js';
import { identity } from '../../data/school.js';
import useActiveSection from '../../hooks/useActiveSection.js';
import useLockBodyScroll from '../../hooks/useLockBodyScroll.js';
import Icon from '../ui/Icon.jsx';
import { EASE } from '../ui/motion.js';

export const NAV_ITEMS = [
  { id: 'about', key: 'about' },
  { id: 'purpose', key: 'vision' },
  { id: 'tracks', key: 'tracks' },
  { id: 'programs', key: 'programs' },
  { id: 'milestones', key: 'achievements' },
  { id: 'gallery', key: 'gallery' },
  { id: 'admission', key: 'admission' },
  { id: 'contact', key: 'contact' },
];

function Wordmark() {
  const { t, lang } = useLanguage();
  return (
    <a href="#top" className="group flex items-center gap-3 rounded-lg" aria-label={t(identity.nameAr, identity.nameEn)}>
      <span
        aria-hidden="true"
        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy-900 text-white transition-colors duration-300 group-hover:bg-royal-700"
      >
        {/* A monogram, not a claimed institutional logo. */}
        <Icon name="academic" className="h-5 w-5" strokeWidth={1.6} />
      </span>
      <span className="flex min-w-0 flex-col leading-tight">
        <span className="truncate text-[0.9375rem] font-semibold text-navy-900">
          {lang === 'ar' ? identity.nameAr : identity.nameEn}
        </span>
        <span className="truncate text-[0.6875rem] font-medium uppercase tracking-wider text-ink-faint">
          {lang === 'ar' ? 'أكاديمية طويق × وزارة التعليم' : 'Tuwaiq Academy × Ministry of Education'}
        </span>
      </span>
    </a>
  );
}

function LanguageToggle({ compact = false }) {
  const { lang, setLang } = useLanguage();
  return (
    <div
      className="inline-flex items-center rounded-full border border-mist-200 bg-white p-0.5"
      role="group"
      aria-label={lang === 'ar' ? 'لغة الموقع' : 'Site language'}
    >
      {[
        { code: 'ar', label: 'ع', full: 'العربية' },
        { code: 'en', label: 'EN', full: 'English' },
      ].map((option) => {
        const active = lang === option.code;
        return (
          <button
            key={option.code}
            type="button"
            onClick={() => setLang(option.code)}
            aria-pressed={active}
            title={option.full}
            className={`relative rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-300 ${
              active ? 'text-white' : 'text-ink-muted hover:text-navy-800'
            } ${compact ? 'min-w-[2.5rem]' : 'min-w-[2.75rem]'}`}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 rounded-full bg-navy-900"
                transition={{ duration: 0.35, ease: EASE }}
              />
            )}
            <span className="relative">{option.label}</span>
            <span className="sr-only"> — {option.full}</span>
          </button>
        );
      })}
    </div>
  );
}

export function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const active = useActiveSection(NAV_ITEMS.map((i) => i.id));

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24));
  useLockBodyScroll(open);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-1/2 focus:z-[60] focus:-translate-x-1/2 focus:rounded-full focus:bg-navy-900 focus:px-5 focus:py-2.5 focus:text-sm focus:text-white"
      >
        {t(ui.nav.skip)}
      </a>

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-premium ${
          scrolled || open
            ? 'border-b border-mist-200 bg-white/90 shadow-[0_1px_24px_-12px_rgba(15,27,45,0.25)] backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-page flex h-[var(--nav-height)] items-center justify-between gap-4" aria-label={t(ui.nav.menu)}>
          <Wordmark />

          <ul className="hidden items-center gap-0.5 xl:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative inline-block rounded-lg px-3 py-2 text-[0.875rem] font-medium transition-colors duration-300 ${
                      isActive ? 'text-royal-800' : 'text-ink-muted hover:text-navy-900'
                    }`}
                  >
                    {t(ui.nav[item.key])}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-royal-600"
                        transition={{ duration: 0.4, ease: EASE }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? t(ui.nav.close) : t(ui.nav.menu)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-mist-200 bg-white text-navy-800 transition-colors duration-300 hover:bg-mist-50 xl:hidden"
            >
              <Icon name={open ? 'close' : 'menu'} className="h-5 w-5" />
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="overflow-hidden border-t border-mist-200 bg-white xl:hidden"
            >
              <ul className="container-page grid gap-1 py-4">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: EASE, delay: 0.04 * i }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-[0.9375rem] font-medium transition-colors duration-200 ${
                        active === item.id ? 'bg-mist-100 text-royal-800' : 'text-navy-800 hover:bg-mist-50'
                      }`}
                    >
                      {t(ui.nav[item.key])}
                      <Icon name="chevronDown" className="h-4 w-4 -rotate-90 rtl:rotate-90 opacity-40" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

export default Navbar;
