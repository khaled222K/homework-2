import { useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext.jsx';
import { identity, summary, tracks, locations, contact } from '../../data/school.js';

const setMeta = (selector, attr, value) => {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

/**
 * Keeps <title>, meta description and Open Graph tags in step with the active
 * language, and publishes JSON-LD describing the schools.
 *
 * The structured data mirrors src/data/school.js exactly — no claim appears here
 * that is not already verified and rendered on the page.
 */
export function DocumentHead() {
  const { lang } = useLanguage();

  useEffect(() => {
    const isAr = lang === 'ar';
    const title = isAr
      ? `${identity.nameAr} | ${identity.fullNameAr}`
      : `${identity.nameEn} | ${identity.fullNameEn}`;
    const description = isAr ? summary.ar : summary.en;

    document.title = title;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:locale"]', 'content', isAr ? 'ar_SA' : 'en_US');
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
  }, [lang]);

  useEffect(() => {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'HighSchool',
      name: identity.nameAr,
      alternateName: [identity.fullNameAr, identity.altNameAr, identity.nameEn, identity.fullNameEn],
      description: summary.ar,
      url: contact.website.url,
      inLanguage: ['ar', 'en'],
      parentOrganization: {
        '@type': 'EducationalOrganization',
        name: identity.operator.ar,
        url: identity.operator.url,
      },
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'SA',
        addressLocality: 'Riyadh',
      },
      areaServed: locations.cities.map((city) => ({ '@type': 'City', name: city.en })),
      sameAs: contact.social.map((s) => s.url),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Technical tracks',
        itemListElement: tracks.map((track) => ({
          '@type': 'Course',
          name: track.nameEn,
          alternateName: track.nameAr,
          description: track.descEn,
          provider: { '@type': 'EducationalOrganization', name: identity.operator.en },
        })),
      },
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  return null;
}

export default DocumentHead;
