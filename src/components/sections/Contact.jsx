import { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import ui from '../../i18n/ui.js';
import { contact, locations } from '../../data/school.js';
import Section from '../ui/Section.jsx';
import Reveal from '../ui/Reveal.jsx';
import SourceNote from '../ui/SourceNote.jsx';
import Icon from '../ui/Icon.jsx';

// The founding campus is Tuwaiq Academy's Riyadh headquarters. No detailed
// street address is published per branch, so the map is framed on Riyadh rather
// than dropping a pin on an address we cannot verify.
const RIYADH_EMBED =
  'https://www.openstreetmap.org/export/embed.html?bbox=46.5%2C24.55%2C46.92%2C24.87&layer=mapnik';
const RIYADH_LINK = 'https://www.google.com/maps/search/?api=1&query=Tuwaiq+Academy+Riyadh';

function Map() {
  const { t } = useLanguage();
  const [loaded, setLoaded] = useState(false);

  return (
    <Reveal index={2} className="card self-start overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b border-mist-200 px-6 py-5">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-navy-900">{t(ui.contact.mapTitle)}</h3>
          <p className="mt-1 truncate text-sm text-ink-faint">{t(locations.headquarters)}</p>
        </div>
        <a
          href={RIYADH_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary shrink-0 !px-4 !py-2 !text-sm"
        >
          <Icon name="external" className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">{t(ui.contact.openMap)}</span>
        </a>
      </div>

      <div className="relative aspect-[16/10] w-full bg-mist-100 sm:aspect-[16/9]">
        {!loaded && (
          <div className="absolute inset-0 grid place-items-center">
            <span className="h-6 w-6 animate-spin rounded-full border-2 border-mist-300 border-t-royal-600" />
          </div>
        )}
        <iframe
          title={t(ui.contact.mapTitle)}
          src={RIYADH_EMBED}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full border-0 transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>

      <p className="border-t border-mist-200 px-6 py-4 text-sm leading-relaxed text-ink-muted">
        {t(ui.contact.mapNote)}
      </p>
    </Reveal>
  );
}

export function Contact() {
  const { t } = useLanguage();

  const websites = [
    { ...contact.website, icon: 'globe' },
    { ...contact.operatorWebsite, icon: 'academic' },
    { ...contact.ministryWebsite, icon: 'flag' },
  ];

  return (
    <Section id="contact" eyebrow={t(ui.contact.eyebrow)} title={t(ui.contact.title)} tone="light">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-8">
        <div className="grid gap-6">
          <Reveal className="card p-7 sm:p-8">
            <h3 className="text-lg font-semibold text-navy-900">{t(ui.contact.officialChannels)}</h3>
            <ul className="mt-5 grid gap-2.5">
              {websites.map((site) => (
                <li key={site.url}>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3.5 rounded-xl border border-mist-200 px-4 py-3.5 transition-[border-color,background-color,transform] duration-300 ease-premium hover:-translate-y-0.5 hover:border-royal-200 hover:bg-mist-50"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-mist-100 text-royal-700 transition-colors duration-300 group-hover:bg-royal-700 group-hover:text-white">
                      <Icon name={site.icon} className="h-4 w-4" strokeWidth={1.6} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.9375rem] font-medium text-navy-900">
                        {t(site.labelAr, site.labelEn)}
                      </span>
                      <span className="block truncate text-xs text-ink-faint" dir="ltr">
                        {site.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                      </span>
                    </span>
                    <Icon name="external" className="h-4 w-4 shrink-0 text-ink-faint" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal index={1} className="card p-7 sm:p-8">
            <h3 className="text-lg font-semibold text-navy-900">{t(ui.contact.socialTitle)}</h3>
            <ul className="mt-5 grid gap-2.5">
              {contact.social.map((account) => (
                <li key={account.url}>
                  <a
                    href={account.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3.5 rounded-xl border border-mist-200 px-4 py-3.5 transition-[border-color,background-color,transform] duration-300 ease-premium hover:-translate-y-0.5 hover:border-royal-200 hover:bg-mist-50"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-navy-900 text-white">
                      <Icon name="x" className="h-3.5 w-3.5" filled />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.9375rem] font-medium text-navy-900" dir="ltr">
                        {account.handle}
                      </span>
                      {account.labelAr && (
                        <span className="block text-xs text-ink-faint">{t(account.labelAr, account.labelEn)}</span>
                      )}
                    </span>
                    <Icon name="external" className="h-4 w-4 shrink-0 text-ink-faint" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Say what is missing rather than inventing a phone number. */}
            <p className="mt-6 flex items-start gap-2.5 border-t border-mist-200 pt-5 text-sm leading-relaxed text-ink-muted">
              <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0 text-royal-500" />
              {t(contact.note)}
            </p>
            <div className="mt-4">
              <SourceNote keys={['xSchools', 'schoolSite']} />
            </div>
          </Reveal>
        </div>

        <Map />
      </div>
    </Section>
  );
}

export default Contact;
