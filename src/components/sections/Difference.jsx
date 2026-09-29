import { useLanguage } from '../../i18n/LanguageContext.jsx';
import ui from '../../i18n/ui.js';
import { distinctives } from '../../data/school.js';
import Section from '../ui/Section.jsx';
import Reveal from '../ui/Reveal.jsx';
import SourceNote from '../ui/SourceNote.jsx';
import Icon from '../ui/Icon.jsx';

/** Six distinguishing characteristics, each tied to a published statement. */
export function Difference() {
  const { t } = useLanguage();

  return (
    <Section
      id="difference"
      eyebrow={t(ui.difference.eyebrow)}
      title={t(ui.difference.title)}
      lead={t(ui.difference.lead)}
      tone="light"
    >
      <ul className="grid gap-px overflow-hidden rounded-panel border border-mist-200 bg-mist-200 sm:grid-cols-2 lg:grid-cols-3">
        {distinctives.map((item, i) => (
          <Reveal
            as="li"
            key={item.id}
            index={i}
            className="group flex flex-col bg-white p-7 transition-colors duration-500 hover:bg-mist-50 sm:p-8"
          >
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-mist-200 bg-mist-50 text-royal-700 transition-colors duration-500 group-hover:border-royal-200 group-hover:bg-white">
              <Icon name={item.icon} className="h-5 w-5" strokeWidth={1.5} />
            </span>
            <h3 className="mt-5 text-[1.0625rem] font-semibold leading-snug text-navy-900">
              {t(item.titleAr, item.titleEn)}
            </h3>
            <p className="mt-3 flex-1 text-pretty text-[0.9375rem] leading-relaxed text-ink-muted">
              {t(item.bodyAr, item.bodyEn)}
            </p>
            <div className="mt-5">
              <SourceNote keys={item.sources} />
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

export default Difference;
