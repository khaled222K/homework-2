import { sources as registry } from '../../data/sources.js';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import ui from '../../i18n/ui.js';

/**
 * The discreet attribution line under a factual claim.
 *
 * Deliberately quiet — small, muted, underlined only on hover — so the page
 * reads as an institutional site rather than a paper, while every claim stays
 * traceable.
 */
export function SourceNote({ keys = [], className = '', tone = 'light' }) {
  const { t, lang } = useLanguage();
  const entries = keys.map((k) => registry[k]).filter(Boolean);
  if (!entries.length) return null;

  const label = t(ui.common[entries.length > 1 ? 'sources' : 'source']);
  const muted = tone === 'navy' ? 'text-navy-300' : 'text-ink-faint';
  const link = tone === 'navy' ? 'text-navy-200 hover:text-white' : 'text-ink-muted hover:text-royal-700';

  return (
    <p className={`flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs leading-relaxed ${muted} ${className}`}>
      <span className="font-medium">{label}:</span>
      {entries.map((source, i) => (
        <span key={source.id} className="inline-flex items-center gap-1.5">
          {i > 0 && <span aria-hidden="true" className="opacity-40">·</span>}
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className={`underline decoration-dotted underline-offset-4 transition-colors duration-200 ${link}`}
          >
            {source.label[lang] ?? source.label.ar}
          </a>
        </span>
      ))}
    </p>
  );
}

export default SourceNote;
