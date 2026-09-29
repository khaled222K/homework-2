import { useLanguage } from '../../i18n/LanguageContext.jsx';
import ui from '../../i18n/ui.js';
import { identity, contact } from '../../data/school.js';
import { sourceList } from '../../data/sources.js';
import { NAV_ITEMS } from './Navbar.jsx';
import Icon from '../ui/Icon.jsx';

export function Footer() {
  const { t, lang } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-navy-200">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-motif opacity-[0.25]" />

      <div className="container-page relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] lg:gap-8">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white">
                <Icon name="academic" className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <span className="text-lg font-semibold text-white">
                {lang === 'ar' ? identity.nameAr : identity.nameEn}
              </span>
            </div>
            <p className="mt-5 text-pretty text-sm leading-relaxed text-navy-300">{t(ui.footer.tagline)}</p>
            <a
              href="#top"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-white transition-colors duration-300 hover:bg-white/10"
            >
              <Icon name="arrowUp" className="h-3.5 w-3.5" />
              {t(ui.common.backToTop)}
            </a>
          </div>

          <nav aria-label={t(ui.footer.navTitle)}>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white">{t(ui.footer.navTitle)}</h2>
            <ul className="mt-5 grid gap-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-navy-300 transition-colors duration-300 hover:text-white"
                  >
                    {t(ui.nav[item.key])}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white">{t(ui.footer.officialTitle)}</h2>
            <ul className="mt-5 grid gap-2.5">
              {[contact.website, contact.operatorWebsite, contact.ministryWebsite].map((site) => (
                <li key={site.url}>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-navy-300 transition-colors duration-300 hover:text-white"
                  >
                    {t(site.labelAr, site.labelEn)}
                    <Icon name="external" className="h-3 w-3 opacity-60" />
                  </a>
                </li>
              ))}
              {contact.social.map((account) => (
                <li key={account.url}>
                  <a
                    href={account.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-navy-300 transition-colors duration-300 hover:text-white"
                  >
                    <Icon name="x" className="h-3 w-3" filled />
                    <span dir="ltr">{account.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white">{t(ui.footer.sourcesTitle)}</h2>
            <ul className="mt-5 grid max-h-64 gap-2.5 overflow-y-auto pe-2 scrollbar-slim">
              {sourceList.map((source) => (
                <li key={source.id}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-xs leading-relaxed text-navy-400 transition-colors duration-300 hover:text-navy-100"
                  >
                    {source.label[lang] ?? source.label.ar}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <p className="text-xs leading-relaxed text-navy-400">{t(ui.footer.disclaimer)}</p>
          <p className="mt-3 text-xs text-navy-500">
            © {year} — {t(ui.footer.rights)}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
