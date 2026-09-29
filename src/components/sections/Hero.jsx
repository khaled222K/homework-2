import { motion } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import ui from '../../i18n/ui.js';
import { identity, summary } from '../../data/school.js';
import Icon from '../ui/Icon.jsx';
import SourceNote from '../ui/SourceNote.jsx';
import HeroVisual from './HeroVisual.jsx';
import { EASE, lineReveal } from '../ui/motion.js';

/** Each line animates behind its own mask, so the headline resolves in sequence. */
function MaskedLine({ children, index, className = '' }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span variants={lineReveal} custom={index} className={`block ${className}`}>
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const { t, lang } = useLanguage();

  const headlineLines =
    lang === 'ar'
      ? ['مدارس', 'الموهوبين التقنية']
      : ['Technical', 'Gifted Schools'];

  const ctas = [
    { href: '#about', label: t(ui.hero.ctaPrimary), primary: true },
    { href: '#programs', label: t(ui.hero.ctaSecondary) },
    { href: '#milestones', label: t(ui.hero.ctaTertiary) },
  ];

  return (
    <section id="top" className="relative overflow-hidden bg-white pt-[calc(var(--nav-height)+2.5rem)] pb-20 sm:pb-24 lg:pb-32">
      {/* Background: the one technical motif, faded out well before the text. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-motif grid-motif-fade opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_60%_50%_at_75%_0%,rgba(29,90,232,0.10),transparent_70%)]"
      />

      <div className="container-page relative">
        <motion.div
          initial="hidden"
          animate="visible"
          className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-16 xl:gap-20"
        >
          <div className="max-w-2xl">
            <motion.p
              variants={lineReveal}
              custom={0}
              className="inline-flex items-center gap-2.5 rounded-full border border-mist-200 bg-mist-50 px-4 py-2 text-xs font-medium text-navy-800 sm:text-[0.8125rem]"
            >
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-royal-600" />
              {t(ui.hero.eyebrow)}
            </motion.p>

            <h1 className="mt-7 text-display-xl font-semibold text-navy-950">
              {headlineLines.map((line, i) => (
                <MaskedLine key={line} index={i + 1} className={i === 1 ? 'text-royal-700' : undefined}>
                  {line}
                </MaskedLine>
              ))}
            </h1>

            <motion.p
              variants={lineReveal}
              custom={3}
              className="mt-7 max-w-prose text-pretty text-base leading-relaxed text-ink-muted sm:text-lg"
            >
              {t(summary)}
            </motion.p>

            <motion.div variants={lineReveal} custom={4} className="mt-9 flex flex-wrap items-center gap-3">
              {ctas.map((cta) => (
                <a key={cta.href} href={cta.href} className={cta.primary ? 'btn-primary group' : 'btn-secondary group'}>
                  {cta.label}
                  <Icon
                    name={lang === 'ar' ? 'arrowLeft' : 'arrowRight'}
                    className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:-translate-x-0.5 ltr:group-hover:translate-x-0.5"
                  />
                </a>
              ))}
            </motion.div>

            <motion.div variants={lineReveal} custom={5} className="mt-8">
              <SourceNote keys={identity.sources} />
            </motion.div>
          </div>

          <div className="lg:ps-4">
            <HeroVisual />
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8, ease: EASE }}
        className="container-page relative mt-16 hidden items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-ink-faint transition-colors duration-300 hover:text-royal-700 lg:flex"
      >
        <Icon name="chevronDown" className="h-4 w-4 animate-[bounce_2.4s_ease-in-out_infinite]" />
        {t(ui.hero.scroll)}
      </motion.a>
    </section>
  );
}

export default Hero;
