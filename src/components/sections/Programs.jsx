import { useLanguage } from '../../i18n/LanguageContext.jsx';
import ui from '../../i18n/ui.js';
import { programme } from '../../data/school.js';
import Section from '../ui/Section.jsx';
import Reveal from '../ui/Reveal.jsx';
import SourceNote from '../ui/SourceNote.jsx';
import Badge from '../ui/Badge.jsx';
import Icon from '../ui/Icon.jsx';

/**
 * Programmes & activities.
 *
 * Three published dimensions of the programme: the curriculum, the
 * certification partners, and the competition pipeline. Partner names are
 * rendered as plain typography — using their marks would misrepresent a
 * relationship we have no licence to depict.
 */
export function Programs() {
  const { t, lang } = useLanguage();

  const cards = [
    {
      key: 'curriculum',
      icon: 'academic',
      title: t(ui.programs.curriculumTitle),
      body: t(programme.curriculum),
      sources: programme.curriculum.sources,
      official: programme.curriculum.official,
    },
    {
      key: 'certifications',
      icon: 'certificate',
      title: t(ui.programs.certificationsTitle),
      body: t(programme.certifications),
      sources: programme.certifications.sources,
      official: programme.certifications.official,
      chips: programme.certifications.partners,
    },
    {
      key: 'competitions',
      icon: 'trophy',
      title: t(ui.programs.competitionsTitle),
      body: t(programme.competitions),
      sources: programme.competitions.sources,
      official: programme.competitions.official,
      chips: programme.competitions.named,
    },
  ];

  return (
    <Section id="programs" eyebrow={t(ui.programs.eyebrow)} title={t(ui.programs.title)} tone="mist">
      <ul className="grid gap-5 lg:grid-cols-3 lg:gap-6">
        {cards.map((card, i) => (
          <Reveal as="li" key={card.key} index={i} className="card-interactive flex flex-col p-7 sm:p-8">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-900 text-white">
              <Icon name={card.icon} className="h-6 w-6" strokeWidth={1.5} />
            </span>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-semibold text-navy-900">{card.title}</h3>
              {card.official && (
                <Badge variant="neutral">
                  {t(ui.common.officialWording)}
                </Badge>
              )}
            </div>

            <p className="mt-4 flex-1 text-pretty leading-relaxed text-ink-muted">{card.body}</p>

            {card.chips && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {card.chips.map((chip) => (
                  <li
                    key={chip}
                    className="rounded-lg border border-mist-200 bg-white px-3 py-1.5 text-[0.8125rem] font-medium text-navy-800"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 border-t border-mist-200 pt-4">
              <SourceNote keys={card.sources} />
            </div>
          </Reveal>
        ))}
      </ul>

      <Reveal index={3} className="mt-8">
        <p className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-faint">
          <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0" />
          {lang === 'ar'
            ? 'أسماء الجهات المانحة للشهادات مذكورة كما وردت في البيانات الرسمية، ولا تُعرض شعاراتها هنا.'
            : 'Certification partners are named exactly as they appear in the official statements; their logos are not reproduced here.'}
        </p>
      </Reveal>
    </Section>
  );
}

export default Programs;
