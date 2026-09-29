import { useLanguage } from '../../i18n/LanguageContext.jsx';
import ui from '../../i18n/ui.js';
import { milestones, academyResults } from '../../data/school.js';
import Section from '../ui/Section.jsx';
import Reveal from '../ui/Reveal.jsx';
import SourceNote from '../ui/SourceNote.jsx';
import Icon from '../ui/Icon.jsx';
import Badge from '../ui/Badge.jsx';

function Timeline() {
  const { t } = useLanguage();
  return (
    <ol className="relative">
      {/* The spine sits behind the markers and stops at the last entry. */}
      <span
        aria-hidden="true"
        className="absolute bottom-8 top-3 start-[0.4375rem] w-px bg-gradient-to-b from-royal-300 via-mist-200 to-transparent sm:start-[0.5625rem]"
      />
      {milestones.map((milestone, i) => (
        <Reveal as="li" key={milestone.id} index={i} className="relative ps-8 pb-10 last:pb-0 sm:ps-12">
          <span
            aria-hidden="true"
            className="absolute start-0 top-2 grid h-3.5 w-3.5 place-items-center rounded-full bg-royal-600 ring-4 ring-white sm:h-[1.125rem] sm:w-[1.125rem]"
          >
            <span className="h-1 w-1 rounded-full bg-white sm:h-1.5 sm:w-1.5" />
          </span>

          <p className="text-xs font-medium uppercase tracking-wider text-royal-700">
            {t(milestone.dateAr, milestone.dateEn)}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-navy-900 sm:text-xl">
            {t(milestone.titleAr, milestone.titleEn)}
          </h3>
          <p className="mt-3 max-w-prose text-pretty leading-relaxed text-ink-muted">
            {t(milestone.bodyAr, milestone.bodyEn)}
          </p>
          <div className="mt-4">
            <SourceNote keys={milestone.sources} />
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

function AcademyResults() {
  const { t, lang } = useLanguage();

  return (
    <div className="mt-20 sm:mt-24">
      <Reveal>
        <h3 className="text-display-md font-semibold text-navy-900">{t(ui.achievements.academyTitle)}</h3>
      </Reveal>

      {/* The attribution caveat leads, before any medal count is shown. */}
      <Reveal index={1}>
        <div className="mt-5 flex items-start gap-3 rounded-card border border-royal-100 bg-royal-50/70 p-5">
          <Icon name="info" className="mt-0.5 h-5 w-5 shrink-0 text-royal-700" />
          <p className="text-pretty text-sm leading-relaxed text-navy-800">{t(ui.achievements.academyNote)}</p>
        </div>
      </Reveal>

      <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:gap-6">
        {academyResults.map((result, i) => (
          <Reveal as="li" key={result.id} index={i + 2} className="card-interactive flex flex-col p-7 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <Badge variant="royal">
                <Icon name="trophy" className="h-3.5 w-3.5" strokeWidth={1.8} />
                {t(result.attributedTo)}
              </Badge>
              <span className="tabular font-mono text-sm font-medium text-ink-faint">{result.year}</span>
            </div>

            <h4 className="mt-5 text-lg font-semibold leading-snug text-navy-900">
              {t(result.eventAr, result.eventEn)}
            </h4>
            <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ink-faint">
              <Icon name="pin" className="h-3.5 w-3.5" />
              {t(result.placeAr, result.placeEn)}
            </p>

            <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-mist-200 bg-mist-200">
              {[
                { value: result.medals.gold, label: t(ui.achievements.gold) },
                { value: result.medals.silver, label: t(ui.achievements.silver) },
                { value: result.medals.special, label: t(ui.achievements.special) },
              ].map((stat) => (
                <div key={stat.label} className="bg-white px-3 py-4 text-center">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="tabular block text-2xl font-semibold text-navy-950">{stat.value}</span>
                    <span className="mt-1 block text-[0.6875rem] leading-tight text-ink-faint">{stat.label}</span>
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-5 flex-1 text-pretty text-sm leading-relaxed text-ink-muted">
              {t(result.resultAr, result.resultEn)}
            </p>

            <div className="mt-5 border-t border-mist-200 pt-4">
              <SourceNote keys={result.sources} />
            </div>
          </Reveal>
        ))}
      </ul>

      <Reveal index={4}>
        <p className="mt-6 text-sm text-ink-faint">
          {lang === 'ar'
            ? 'لم يُنشر عبر المصادر الرسمية حتى تاريخ إعداد هذا الموقع أي نتائج مسابقات منسوبة تحديدًا إلى طلاب مدارس الموهوبين التقنية، ولذلك لا تُعرض هنا.'
            : 'As of this site’s preparation, no competition results attributed specifically to the Technical Gifted Schools’ own students had been published through official sources, so none are shown here.'}
        </p>
      </Reveal>
    </div>
  );
}

export function Milestones() {
  const { t } = useLanguage();
  return (
    <Section
      id="milestones"
      eyebrow={t(ui.achievements.eyebrow)}
      title={t(ui.achievements.title)}
      lead={t(ui.achievements.lead)}
      tone="light"
    >
      <Timeline />
      <AcademyResults />
    </Section>
  );
}

export default Milestones;
