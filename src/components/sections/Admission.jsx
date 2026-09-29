import { useLanguage } from '../../i18n/LanguageContext.jsx';
import ui from '../../i18n/ui.js';
import { admission, academicYear, locations } from '../../data/school.js';
import Section from '../ui/Section.jsx';
import Reveal from '../ui/Reveal.jsx';
import SourceNote from '../ui/SourceNote.jsx';
import Icon from '../ui/Icon.jsx';

function Footprint() {
  const { t } = useLanguage();
  const waves = [
    { key: 'first', label: t(ui.locations.firstWave) },
    { key: 'second', label: t(ui.locations.secondWave) },
  ];

  return (
    <div className="mt-20 sm:mt-24">
      <Reveal>
        <p className="eyebrow">
          <span aria-hidden="true" className="inline-block h-px w-8 bg-royal-400" />
          {t(ui.locations.eyebrow)}
        </p>
        <h3 className="mt-4 text-display-md font-semibold text-navy-900">{t(ui.locations.title)}</h3>
      </Reveal>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:gap-12">
        {waves.map((wave, w) => (
          <Reveal key={wave.key} index={w + 1}>
            <h4 className="text-sm font-medium uppercase tracking-wider text-ink-faint">{wave.label}</h4>
            <ul className="mt-4 grid gap-2.5">
              {locations.cities
                .filter((c) => c.wave === wave.key)
                .map((city, i) => (
                  <Reveal
                    as="li"
                    key={city.id}
                    index={i}
                    className="flex items-center gap-3 rounded-xl border border-mist-200 bg-white px-4 py-3 transition-[border-color,transform] duration-300 ease-premium hover:-translate-y-0.5 hover:border-royal-200"
                  >
                    <Icon name="pin" className="h-4 w-4 shrink-0 text-royal-600" strokeWidth={1.6} />
                    <span className="font-medium text-navy-900">{t(city.ar, city.en)}</span>
                  </Reveal>
                ))}
            </ul>
          </Reveal>
        ))}
      </div>

      <Reveal index={3} className="mt-6">
        <SourceNote keys={['moeFiveAdmins', 'spaNewBranches', 'spaAdmissionTests']} />
      </Reveal>
    </div>
  );
}

export function Admission() {
  const { t } = useLanguage();

  return (
    <Section id="admission" eyebrow={t(ui.admission.eyebrow)} title={t(ui.admission.title)} tone="mist">
      <div className="grid gap-6 lg:grid-cols-3">
        <Reveal className="card flex flex-col p-7 sm:p-8">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-900 text-white">
            <Icon name="academic" className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <h3 className="mt-5 text-lg font-semibold text-navy-900">{t(ui.admission.audienceTitle)}</h3>
          <p className="mt-3 flex-1 leading-relaxed text-ink-muted">{t(admission.audience)}</p>
          <p className="mt-5 rounded-lg bg-mist-50 px-4 py-3 text-sm">
            <span className="text-ink-faint">{t(ui.admission.yearLabel)}: </span>
            <span className="font-medium text-navy-900">{academicYear.hijri}</span>
          </p>
          <div className="mt-5 border-t border-mist-200 pt-4">
            <SourceNote keys={admission.audience.sources} />
          </div>
        </Reveal>

        <Reveal index={1} className="card flex flex-col p-7 sm:p-8">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-royal-700 text-white">
            <Icon name="check" className="h-5 w-5" strokeWidth={2} />
          </span>
          <h3 className="mt-5 text-lg font-semibold text-navy-900">{t(ui.admission.requirementsTitle)}</h3>
          <ul className="mt-4 flex-1 space-y-3">
            {admission.requirements.map((req) => (
              <li key={req.id} className="flex items-start gap-2.5 leading-relaxed text-ink-muted">
                <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-royal-600" strokeWidth={2.2} />
                <span>{t(req.ar, req.en)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 border-t border-mist-200 pt-4">
            <SourceNote keys={admission.requirements[0].sources} />
          </div>
        </Reveal>

        <Reveal index={2} className="card flex flex-col p-7 sm:p-8">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-royal-50 text-royal-700">
            <Icon name="target" className="h-5 w-5" strokeWidth={1.6} />
          </span>
          <h3 className="mt-5 text-lg font-semibold text-navy-900">{t(ui.admission.processTitle)}</h3>
          <p className="mt-3 flex-1 leading-relaxed text-ink-muted">{t(admission.process)}</p>
          <a
            href={admission.registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary group mt-6 w-full"
          >
            {t(ui.admission.cta)}
            <Icon name="external" className="h-4 w-4 opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
          </a>
          <div className="mt-5 border-t border-mist-200 pt-4">
            <SourceNote keys={admission.process.sources} />
          </div>
        </Reveal>
      </div>

      <Footprint />
    </Section>
  );
}

export default Admission;
