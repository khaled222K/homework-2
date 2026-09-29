import { useLanguage } from '../../i18n/LanguageContext.jsx';
import ui from '../../i18n/ui.js';
import { purpose } from '../../data/school.js';
import Section from '../ui/Section.jsx';
import Reveal from '../ui/Reveal.jsx';
import SourceNote from '../ui/SourceNote.jsx';
import Badge from '../ui/Badge.jsx';
import Icon from '../ui/Icon.jsx';

/**
 * Vision & Mission.
 *
 * The schools publish no separate statements formally headed "Vision" and
 * "Mission", so this section presents their purpose as published instead, and
 * says so plainly in the lead rather than inventing institutional boilerplate.
 */
export function Purpose() {
  const { t } = useLanguage();

  return (
    <Section id="purpose" eyebrow={t(ui.vision.eyebrow)} title={t(ui.vision.title)} lead={t(ui.vision.lead)} tone="navy">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-motif opacity-[0.35]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_80%_0%,rgba(52,121,248,0.22),transparent_65%)]"
      />

      <ol className="relative grid gap-px overflow-hidden rounded-panel bg-white/10 md:grid-cols-2">
        {purpose.map((item, i) => {
          // With an odd number of statements the last one spans the full width
          // rather than leaving a dead half-cell in the grid.
          const spansFullRow = purpose.length % 2 === 1 && i === purpose.length - 1;
          return (
          <Reveal
            as="li"
            key={item.id}
            index={i}
            className={`group relative bg-navy-950 p-7 transition-colors duration-500 hover:bg-navy-900 sm:p-8 ${
              spansFullRow ? 'md:col-span-2' : ''
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <span className="font-mono text-xs text-royal-400" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              {item.official && (
                <Badge variant="navy">
                  <Icon name="check" className="h-3 w-3" strokeWidth={2.2} />
                  {t(ui.vision.officialBadge)}
                </Badge>
              )}
            </div>
            <p className={`mt-5 text-pretty text-[1.0625rem] leading-relaxed text-white sm:text-lg ${
              spansFullRow ? 'md:max-w-4xl' : ''
            }`}>
              {t(item.ar, item.en)}
            </p>
            <div className="mt-5">
              <SourceNote keys={item.sources} tone="navy" />
            </div>
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-royal-400 to-transparent transition-transform duration-700 ease-premium group-hover:scale-x-100"
            />
          </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}

export default Purpose;
