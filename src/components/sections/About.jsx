import { motion } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import ui from '../../i18n/ui.js';
import { identity, summary, locations, milestones } from '../../data/school.js';
import Section from '../ui/Section.jsx';
import Reveal from '../ui/Reveal.jsx';
import SourceNote from '../ui/SourceNote.jsx';
import Icon from '../ui/Icon.jsx';
import { fadeUp, viewportOnce } from '../ui/motion.js';

const launch = milestones.find((m) => m.id === 'launch-2024');

export function About() {
  const { t, lang } = useLanguage();

  const facts = [
    {
      icon: 'academic',
      label: { ar: 'الجهة المشغّلة', en: 'Operated by' },
      value: t(identity.operator),
      href: identity.operator.url,
    },
    {
      icon: 'handshake',
      label: { ar: 'الشريك الحكومي', en: 'Government partner' },
      value: t(identity.partner),
      href: identity.partner.url,
    },
    {
      icon: 'calendar',
      label: { ar: 'التدشين', en: 'Inaugurated' },
      value: t(launch.dateAr, launch.dateEn),
    },
    {
      icon: 'pin',
      label: { ar: 'المقر الأول', en: 'Founding campus' },
      value: t(locations.headquarters),
    },
  ];

  return (
    <Section id="about" eyebrow={t(ui.about.eyebrow)} title={t(ui.about.title)} tone="light">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <Reveal>
            <p className="text-pretty text-lg leading-relaxed text-navy-800 sm:text-xl">{t(summary)}</p>
          </Reveal>

          <Reveal index={1}>
            <p className="mt-6 text-pretty leading-relaxed text-ink-muted">
              {t(launch.bodyAr, launch.bodyEn)}
            </p>
          </Reveal>

          <Reveal index={2}>
            <hr className="rule-gradient my-8" />
            <SourceNote keys={[...new Set([...summary.sources, ...launch.sources])]} />
          </Reveal>
        </div>

        <motion.dl
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          custom={1}
          className="grid h-fit gap-px overflow-hidden rounded-panel border border-mist-200 bg-mist-200 sm:grid-cols-2 lg:grid-cols-1"
        >
          {facts.map((fact) => (
            <div key={fact.label.en} className="group bg-white p-6 transition-colors duration-500 hover:bg-mist-50">
              <dt className="flex items-center gap-2.5 text-xs font-medium uppercase tracking-wider text-ink-faint">
                <Icon name={fact.icon} className="h-4 w-4 text-royal-500" strokeWidth={1.6} />
                {t(fact.label)}
              </dt>
              <dd className="mt-2.5 text-[0.9375rem] font-medium leading-snug text-navy-900">
                {fact.href ? (
                  <a
                    href={fact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 transition-colors duration-300 hover:text-royal-700"
                  >
                    {fact.value}
                    <Icon name="external" className="h-3.5 w-3.5 opacity-50" />
                  </a>
                ) : (
                  fact.value
                )}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* Names the school is published under — useful and verifiable. */}
      <Reveal index={3} className="mt-14">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-card border border-mist-200 bg-mist-50 px-5 py-4 text-sm text-ink-muted">
          <Icon name="info" className="h-4 w-4 shrink-0 text-royal-500" />
          <span className="font-medium text-navy-800">
            {lang === 'ar' ? 'تُنشر المدارس تحت هذه المسميات:' : 'The schools are published under these names:'}
          </span>
          <span>
            {[identity.nameAr, identity.fullNameAr, identity.altNameAr].join(' · ')}
            {lang === 'en' && ` · ${identity.nameEn} · ${identity.fullNameEn}`}
          </span>
        </div>
      </Reveal>
    </Section>
  );
}

export default About;
