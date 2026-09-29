/**
 * Source registry.
 *
 * Every factual claim rendered on this site carries a `sources` array of keys
 * from this map. Nothing is displayed unless it can be traced back to one of
 * these entries — see RESEARCH.md for the full research record.
 *
 * `tier` drives nothing visually; it documents how much weight a source carries:
 *   official  — the school, Tuwaiq Academy, or the Ministry of Education itself
 *   state     — Saudi Press Agency (the official state news agency)
 *   reference — encyclopaedic / established press, used only for cross-checks
 */
export const sources = {
  schoolSite: {
    id: 'schoolSite',
    tier: 'official',
    label: { ar: 'الموقع الرسمي لمدارس الموهوبين التقنية', en: 'Technical Gifted Schools — official site' },
    url: 'https://schools.tuwaiq.edu.sa/',
  },
  tuwaiqSite: {
    id: 'tuwaiqSite',
    tier: 'official',
    label: { ar: 'أكاديمية طويق', en: 'Tuwaiq Academy' },
    url: 'https://tuwaiq.edu.sa/',
  },
  tuwaiqLaunchNews: {
    id: 'tuwaiqLaunchNews',
    tier: 'official',
    label: { ar: 'أكاديمية طويق — خبر إطلاق المدرسة', en: 'Tuwaiq Academy — school launch announcement' },
    url: 'https://tuwaiq.edu.sa/news/5e773783-7ce6-422a-ba0d-4bd804197047',
  },
  moeLaunch: {
    id: 'moeLaunch',
    tier: 'official',
    label: { ar: 'وزارة التعليم — تدشين أول مدرسة ثانوية للموهوبين في التقنية', en: 'Ministry of Education — inauguration announcement' },
    url: 'https://www.moe.gov.sa/ar/mediacenter/MOEnews/Pages/news1_25122024.aspx',
    date: '2024-12-25',
  },
  moeFiveAdmins: {
    id: 'moeFiveAdmins',
    tier: 'official',
    label: { ar: 'وزارة التعليم — افتتاح مدارس الموهوبين التقنية في 5 إدارات تعليمية', en: 'Ministry of Education — opening across five education directorates' },
    url: 'https://www.moe.gov.sa/ar/mediacenter/MOEnews/Pages/news1_18072025.aspx',
    date: '2025-07-18',
  },
  spaLaunch: {
    id: 'spaLaunch',
    tier: 'state',
    label: { ar: 'واس — أكاديمية طويق تطلق مدرسة الموهوبين التقنية الثانوية', en: 'SPA — Tuwaiq Academy launches the Technical Gifted Secondary School' },
    url: 'https://www.spa.gov.sa/N2157339',
  },
  spaFiveAdmins: {
    id: 'spaFiveAdmins',
    tier: 'state',
    label: { ar: 'واس — افتتاح مدارس الموهوبين التقنية في 5 إدارات تعليمية', en: 'SPA — opening across five education directorates' },
    url: 'https://www.spa.gov.sa/N2362979',
  },
  spaNewBranches: {
    id: 'spaNewBranches',
    tier: 'state',
    label: { ar: 'واس — ثانوية الموهوبين التقنية تفتتح فروعها الجديدة في 5 مدن', en: 'SPA — new branches open in five further cities' },
    url: 'https://www.spa.gov.sa/N2563471',
  },
  spaAdmissionTests: {
    id: 'spaAdmissionTests',
    tier: 'state',
    label: { ar: 'واس — اختتام اختبارات القبول في 10 مدن حول المملكة', en: 'SPA — admission testing concludes across ten cities' },
    url: 'https://www.spa.gov.sa/N2608811',
  },
  spaMadinahRegistration: {
    id: 'spaMadinahRegistration',
    tier: 'state',
    label: { ar: 'واس — فتح باب التسجيل بالمدينة المنورة', en: 'SPA — registration opens in Madinah' },
    url: 'https://www.spa.gov.sa/N2488503',
  },
  spaJeddahRegistration: {
    id: 'spaJeddahRegistration',
    tier: 'state',
    label: { ar: 'واس — تعليم جدة يعلن استمرار التسجيل في ثانوية الموهوبين التقنية', en: 'SPA — Jeddah education directorate on continued registration' },
    url: 'https://www.spa.gov.sa/N2350842',
  },
  spaItex2024: {
    id: 'spaItex2024',
    tier: 'state',
    label: { ar: 'واس — أبطال أكاديمية طويق في مسابقة ITEX (2024)', en: 'SPA — Tuwaiq Academy at ITEX (2024)' },
    url: 'https://www.spa.gov.sa/N2105201',
  },
  spaItex2025: {
    id: 'spaItex2025',
    tier: 'state',
    label: { ar: 'واس — 12 ميدالية ذهبية و16 جائزة لطلاب أكاديمية طويق في ITEX', en: 'SPA — 12 golds and 16 awards for Tuwaiq Academy students at ITEX' },
    url: 'https://www.spa.gov.sa/N2331223',
  },
  saudipedia: {
    id: 'saudipedia',
    tier: 'reference',
    label: { ar: 'سعوديبيديا — مدرسة الموهوبين التقنية الثانوية', en: 'Saudipedia — Technical Gifted Secondary School' },
    url: 'https://saudipedia.com/%D9%85%D8%AF%D8%B1%D8%B3%D8%A9-%D8%A7%D9%84%D9%85%D9%88%D9%87%D9%88%D8%A8%D9%8A%D9%86-%D8%A7%D9%84%D8%AA%D9%82%D9%86%D9%8A%D8%A9-%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%88%D9%8A%D8%A9',
  },
  xSchools: {
    id: 'xSchools',
    tier: 'official',
    label: { ar: 'حساب مدارس الموهوبين التقنية على منصة X', en: 'Technical Gifted Schools on X' },
    url: 'https://x.com/TuwaiqSchools',
  },
};

export const sourceList = Object.values(sources);

export const getSource = (key) => sources[key];
