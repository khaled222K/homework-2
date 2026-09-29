import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { figures } from '../../data/school.js';
import useCountUp from '../../hooks/useCountUp.js';
import Reveal from '../ui/Reveal.jsx';

function Figure({ figure, index }) {
  const { t } = useLanguage();
  // Years read as labels, not quantities — counting to 2024 would look like a bug.
  const animate = !figure.isYear && !figure.isOrdinal;
  const { ref, value } = useCountUp(figure.value, { enabled: animate });

  const display = figure.isOrdinal
    ? t(figure.prefixAr, figure.prefixEn)
    : figure.isYear
      ? String(figure.value)
      : String(animate ? value : figure.value);

  return (
    <Reveal
      as="div"
      index={index}
      className="group relative px-1 py-2"
    >
      <div ref={ref} className="flex items-baseline gap-1.5">
        <span className={`text-4xl font-semibold text-navy-950 sm:text-5xl ${figure.isOrdinal ? '' : 'tabular'}`}>
          {display}
        </span>
        {!figure.isOrdinal && !figure.isYear && (
          <span aria-hidden="true" className="text-2xl font-light text-royal-400">+</span>
        )}
      </div>
      <p className="mt-2.5 max-w-[22ch] text-sm leading-relaxed text-ink-muted">
        {t(figure.labelAr, figure.labelEn)}
      </p>
      <span
        aria-hidden="true"
        className="absolute -top-2 bottom-0 start-0 hidden w-px bg-mist-200 transition-colors duration-500 group-hover:bg-royal-300 lg:block"
      />
    </Reveal>
  );
}

/** A quiet band of verified figures. No invented counts appear here. */
export function Stats() {
  const { lang } = useLanguage();
  return (
    <section aria-label={lang === 'ar' ? 'أرقام منشورة' : 'Published figures'} className="border-y border-mist-200 bg-mist-50">
      <div className="container-page grid grid-cols-2 gap-x-6 gap-y-10 py-14 sm:py-16 lg:grid-cols-4 lg:gap-x-4 lg:ps-0">
        {figures.map((figure, i) => (
          <Figure key={figure.id} figure={figure} index={i} />
        ))}
      </div>
    </section>
  );
}

export default Stats;
