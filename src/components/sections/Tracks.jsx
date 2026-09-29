import { useLanguage } from '../../i18n/LanguageContext.jsx';
import ui from '../../i18n/ui.js';
import { tracks } from '../../data/school.js';
import Section from '../ui/Section.jsx';
import Reveal from '../ui/Reveal.jsx';
import SourceNote from '../ui/SourceNote.jsx';
import Icon from '../ui/Icon.jsx';

/** The four published technical tracks, with the schools' own descriptions. */
export function Tracks() {
  const { t, lang } = useLanguage();

  return (
    <Section id="tracks" eyebrow={t(ui.tracks.eyebrow)} title={t(ui.tracks.title)} lead={t(ui.tracks.lead)} tone="light">
      <ul className="grid gap-5 sm:grid-cols-2 lg:gap-6">
        {tracks.map((track, i) => (
          <Reveal
            as="li"
            key={track.id}
            index={i}
            className="card-interactive group relative flex flex-col overflow-hidden p-7 sm:p-8"
          >
            {/* A single hairline that draws itself on hover — the site's one hover flourish. */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-royal-600 transition-transform duration-500 ease-premium group-hover:scale-x-100 rtl:origin-right"
            />

            <div className="flex items-start justify-between gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-mist-100 text-royal-700 transition-colors duration-500 group-hover:bg-royal-700 group-hover:text-white">
                <Icon name={track.icon} className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <span className="font-mono text-xs text-ink-faint" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>

            <h3 className="mt-6 text-xl font-semibold text-navy-900 sm:text-2xl">
              {t(track.nameAr, track.nameEn)}
            </h3>
            {/* The other language's name, as a quiet secondary line. */}
            <p className="mt-1 text-sm text-ink-faint">{lang === 'ar' ? track.nameEn : track.nameAr}</p>

            <p className="mt-4 flex-1 text-pretty leading-relaxed text-ink-muted">
              {t(track.descAr, track.descEn)}
            </p>

            <div className="mt-6 border-t border-mist-200 pt-4">
              <SourceNote keys={track.sources} />
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

export default Tracks;
