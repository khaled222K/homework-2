import { useLanguage } from '../../i18n/LanguageContext.jsx';
import ui from '../../i18n/ui.js';
import { programme, purpose } from '../../data/school.js';
import Section from '../ui/Section.jsx';
import Reveal from '../ui/Reveal.jsx';
import SourceNote from '../ui/SourceNote.jsx';
import Icon from '../ui/Icon.jsx';

const projectsPurpose = purpose.find((p) => p.id === 'projects-patents');

/**
 * Student projects.
 *
 * No individual student project has been documented in official reporting as
 * belonging to these schools, so none is listed. Rather than drop the section,
 * it states that plainly and shows what *is* published about the project work:
 * the intent, and the competitions students are prepared for.
 */
export function Projects() {
  const { t } = useLanguage();

  const published = [
    {
      icon: 'spark',
      title: { ar: 'بناء مشاريع تقنية نوعية', en: 'Building distinctive technical projects' },
      body: t(projectsPurpose.ar, projectsPurpose.en),
      sources: projectsPurpose.sources,
    },
    {
      icon: 'trophy',
      title: { ar: 'التأهيل للمسابقات', en: 'Competition preparation' },
      body: t(programme.competitions),
      sources: programme.competitions.sources,
    },
  ];

  return (
    <Section id="projects" eyebrow={t(ui.projects.eyebrow)} title={t(ui.projects.title)} tone="mist">
      <Reveal>
        <div className="flex max-w-3xl items-start gap-3.5 rounded-card border border-mist-200 bg-white p-6">
          <Icon name="info" className="mt-0.5 h-5 w-5 shrink-0 text-royal-600" />
          <p className="text-pretty leading-relaxed text-ink-muted">{t(ui.projects.empty)}</p>
        </div>
      </Reveal>

      <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:gap-6">
        {published.map((item, i) => (
          <Reveal as="li" key={item.title.en} index={i + 1} className="card-interactive flex flex-col p-7 sm:p-8">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-royal-50 text-royal-700">
              <Icon name={item.icon} className="h-6 w-6" strokeWidth={1.5} />
            </span>
            <h3 className="mt-6 text-xl font-semibold text-navy-900">{t(item.title)}</h3>
            <p className="mt-4 flex-1 text-pretty leading-relaxed text-ink-muted">{item.body}</p>
            <div className="mt-6 border-t border-mist-200 pt-4">
              <SourceNote keys={item.sources} />
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

export default Projects;
