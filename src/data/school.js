/**
 * Verified knowledge base for مدارس الموهوبين التقنية.
 *
 * RULES FOR EDITING THIS FILE
 * ---------------------------
 * 1. Every entry must carry a `sources` array referencing keys in ./sources.js.
 * 2. If a fact cannot be traced to an official or state source, it does not
 *    belong here — leave the field out rather than guessing.
 * 3. Wording marked `official: true` is quoted from the publisher. Wording
 *    marked `official: false` is our own plain-language summary of verified
 *    facts and is labelled as such in the UI, never presented as a quote.
 *
 * This same object is the sole context handed to the Gemini assistant, so an
 * omission here is an omission the assistant will correctly refuse to fill.
 */

export const identity = {
  nameAr: 'مدارس الموهوبين التقنية',
  // The Riyadh flagship launched under the singular name; after the expansion
  // to further cities the plural form is used by the Ministry and the schools.
  fullNameAr: 'مدرسة الموهوبين التقنية الثانوية',
  altNameAr: 'ثانوية الموهوبين التقنية',
  nameEn: 'Technical Gifted Schools',
  fullNameEn: 'Technical Gifted Secondary School',
  operator: {
    ar: 'أكاديمية طويق',
    en: 'Tuwaiq Academy',
    url: 'https://tuwaiq.edu.sa/',
  },
  partner: {
    ar: 'وزارة التعليم',
    en: 'Ministry of Education',
    url: 'https://www.moe.gov.sa/',
  },
  stage: { ar: 'المرحلة الثانوية', en: 'Secondary stage' },
  country: { ar: 'المملكة العربية السعودية', en: 'Kingdom of Saudi Arabia' },
  sources: ['schoolSite', 'moeLaunch', 'spaLaunch'],
};

export const summary = {
  official: false,
  ar: 'أول مدارس حكومية في المملكة متخصصة في رعاية الموهوبين تقنيًا، أطلقتها أكاديمية طويق بالشراكة مع وزارة التعليم، وتجمع بين المنهج الدراسي العام للمرحلة الثانوية ومسارات تقنية متقدمة في علوم الحاسب والذكاء الاصطناعي وهندسة الميكاترونيكس والأمن السيبراني.',
  en: 'The first government schools in the Kingdom dedicated to nurturing technically gifted students. Launched by Tuwaiq Academy in partnership with the Ministry of Education, they combine the general secondary curriculum with advanced technical tracks in computer science, artificial intelligence, mechatronics engineering and cybersecurity.',
  sources: ['moeLaunch', 'spaLaunch', 'schoolSite'],
};

/** Officially published purpose statements, quoted from the publisher. */
export const purpose = [
  {
    id: 'raise-level',
    official: true,
    ar: 'رفع مستوى التعليم التقني في المملكة، والعمل على تمثيلها في المعارض والمسابقات الإقليمية والدولية.',
    en: 'To raise the standard of technical education in the Kingdom and to represent it at regional and international exhibitions and competitions.',
    sources: ['spaLaunch'],
  },
  {
    id: 'innovation-environment',
    official: true,
    ar: 'توفير بيئة مناسبة للابتكار والبحث العلمي التقني.',
    en: 'To provide an environment suited to innovation and technical scientific research.',
    sources: ['spaLaunch'],
  },
  {
    id: 'future-competencies',
    official: true,
    ar: 'الإسهام في بناء كفاءات المستقبل بمنهجية تعليمية وفق التطبيقات العملية والشهادات الاحترافية العالمية.',
    en: 'To contribute to building the competencies of the future through a teaching methodology based on practical application and international professional certification.',
    sources: ['spaLaunch'],
  },
  {
    id: 'attract-talent',
    official: true,
    ar: 'استقطاب المواهب الواعدة من العقول المبدعة والشغوفة بالتقنية، لتنمية قدراتهم ومهاراتهم في مختلف مجالات التقنيات المتقدمة.',
    en: 'To attract promising talent — creative minds with a passion for technology — and develop their abilities and skills across the advanced technology fields.',
    sources: ['schoolSite'],
  },
  {
    id: 'projects-patents',
    official: true,
    ar: 'تمكين الطلاب من بناء وتطوير مشاريع تقنية نوعية وتسجيل براءات اختراع لمشاريعهم، وتأهيلهم للتخصصات التقنية محليًا ودوليًا.',
    en: 'To enable students to build and develop distinctive technical projects, register patents for them, and prepare them for technical specialisations locally and internationally.',
    sources: ['moeLaunch', 'spaLaunch'],
  },
];

/** The four technical tracks, with the school's own descriptions. */
export const tracks = [
  {
    id: 'computer-science',
    icon: 'code',
    nameAr: 'علوم الحاسب',
    nameEn: 'Computer Science',
    descAr: 'تعلّم البرمجة وبناء الحلول التقنية اعتمادًا على التفكير المنطقي والخوارزميات.',
    descEn: 'Learning programming and building technical solutions grounded in logical thinking and algorithms.',
    official: true,
    sources: ['schoolSite', 'spaAdmissionTests'],
  },
  {
    id: 'artificial-intelligence',
    icon: 'ai',
    nameAr: 'الذكاء الاصطناعي',
    nameEn: 'Artificial Intelligence',
    descAr: 'تطوير نماذج الذكاء الاصطناعي وتعلّم الآلة لبناء حلول تقنية متقدمة.',
    descEn: 'Developing artificial intelligence and machine-learning models to build advanced technical solutions.',
    official: true,
    sources: ['schoolSite', 'spaAdmissionTests'],
  },
  {
    id: 'mechatronics',
    icon: 'robot',
    nameAr: 'هندسة الميكاترونيكس',
    nameEn: 'Mechatronics Engineering',
    descAr: 'الجمع بين الميكانيكا والإلكترونيات والبرمجة لتصميم وبناء الأنظمة الذكية والروبوتات.',
    descEn: 'Combining mechanics, electronics and programming to design and build intelligent systems and robots.',
    official: true,
    sources: ['schoolSite', 'spaAdmissionTests'],
  },
  {
    id: 'cybersecurity',
    icon: 'shield',
    nameAr: 'الأمن السيبراني',
    nameEn: 'Cybersecurity',
    descAr: 'حماية الأنظمة والشبكات، والتصدي للتهديدات السيبرانية، وتطوير حلول الأمن الرقمي.',
    descEn: 'Protecting systems and networks, countering cyber threats and developing digital security solutions.',
    official: true,
    sources: ['schoolSite', 'spaAdmissionTests'],
  },
];

/** Programme characteristics that are explicitly published. */
export const programme = {
  curriculum: {
    official: false,
    ar: 'تجمع المدارس بين المنهج الدراسي العام للمرحلة الثانوية ومنهج تعليمي تقني مكثّف ضمن بيئة محفّزة وتنافسية.',
    en: 'The schools combine the general secondary curriculum with an intensive technical curriculum, inside a stimulating and competitive environment.',
    sources: ['spaLaunch', 'spaNewBranches'],
  },
  certifications: {
    official: true,
    ar: 'منهج تعليمي مكثّف يتضمن شهادات احترافية من كبرى الجهات العالمية، أبرزها: Apple وNVIDIA وMeta وGoogle.',
    en: 'An intensive curriculum that includes professional certifications from major global organisations, foremost among them Apple, NVIDIA, Meta and Google.',
    partners: ['Apple', 'NVIDIA', 'Meta', 'Google'],
    sources: ['spaNewBranches', 'moeFiveAdmins'],
  },
  competitions: {
    official: true,
    ar: 'مشاريع وبرامج مختصّة لتأهيل الطلاب للمشاركة في المسابقات الإقليمية والدولية، مثل المعرض الدولي للعلوم والهندسة «ISEF» والأولمبياد الوطني للبرمجة والذكاء الاصطناعي «أذكى».',
    en: 'Dedicated projects and programmes preparing students to compete regionally and internationally, including the International Science and Engineering Fair (ISEF) and the national programming and AI olympiad, “Athkia”.',
    named: ['ISEF', 'أذكى'],
    sources: ['schoolSite'],
  },
};

/** Admission — published criteria only. */
export const admission = {
  audience: {
    ar: 'طلاب وطالبات الصف الأول الثانوي (بنين وبنات).',
    en: 'First-year secondary students, both boys and girls.',
    sources: ['spaNewBranches', 'spaAdmissionTests'],
  },
  requirements: [
    {
      id: 'enrolled',
      ar: 'الانتظام في الصف الثالث المتوسط.',
      en: 'Currently enrolled in the third intermediate grade.',
      sources: ['spaMadinahRegistration'],
    },
    {
      id: 'grade',
      ar: 'ألّا تقل النسبة في آخر مؤهل دراسي عن 90%.',
      en: 'A score of no less than 90% in the most recent academic qualification.',
      sources: ['spaMadinahRegistration'],
    },
    {
      id: 'english',
      ar: 'الإلمام بأساسيات اللغة الإنجليزية.',
      en: 'Command of the fundamentals of the English language.',
      sources: ['spaMadinahRegistration'],
    },
  ],
  process: {
    official: true,
    ar: 'تُطبَّق اختبارات الكشف عن الموهبة باستخدام أدوات مقنّنة ومعتمدة لقياس القدرة العقلية العامة والتحصيل والإبداع، إلى جانب المقابلة الشخصية.',
    en: 'Talent-identification testing uses standardised, accredited instruments measuring general mental ability, attainment and creativity, alongside a personal interview.',
    sources: ['spaAdmissionTests'],
  },
  registerUrl: 'https://schools.tuwaiq.edu.sa/',
};

/** Verified milestones. Dated, sourced, and nothing more. */
export const milestones = [
  {
    id: 'launch-2024',
    date: '2024-12',
    dateAr: 'ديسمبر 2024',
    dateEn: 'December 2024',
    titleAr: 'تدشين أول مدرسة ثانوية حكومية للموهوبين في التقنية',
    titleEn: 'Inauguration of the first government technical gifted secondary school',
    bodyAr: 'دشّن وزير التعليم الأستاذ يوسف بن عبدالله البنيان مدرسة الموهوبين التقنية الثانوية بأكاديمية طويق في الرياض، بحضور وزير الاتصالات وتقنية المعلومات المهندس عبدالله بن عامر السواحة، ورئيس مجلس إدارة أكاديمية طويق الأستاذ فيصل بن سعود الخميسي.',
    bodyEn: 'The Minister of Education, Yousef bin Abdullah Al-Benyan, inaugurated the Technical Gifted Secondary School at Tuwaiq Academy in Riyadh, attended by the Minister of Communications and Information Technology, Abdullah bin Amer Alswaha, and the chairman of Tuwaiq Academy’s board, Faisal bin Saud Alkhamisi.',
    sources: ['moeLaunch', 'spaLaunch'],
  },
  {
    id: 'five-directorates-2025',
    date: '2025-07',
    dateAr: 'يوليو 2025',
    dateEn: 'July 2025',
    titleAr: 'افتتاح مدارس الموهوبين التقنية في 5 إدارات تعليمية',
    titleEn: 'Opening across five education directorates',
    bodyAr: 'أعلنت وزارة التعليم بالشراكة مع أكاديمية طويق افتتاح مدارس الموهوبين التقنية في خمس إدارات تعليمية: الرياض، وجدة، والمنطقة الشرقية، والقصيم، والمدينة المنورة.',
    bodyEn: 'The Ministry of Education, in partnership with Tuwaiq Academy, announced the opening of Technical Gifted Schools across five education directorates: Riyadh, Jeddah, the Eastern Province, Qassim and Madinah.',
    sources: ['moeFiveAdmins', 'spaFiveAdmins'],
  },
  {
    id: 'five-new-cities',
    date: '2026',
    dateAr: 'التوسع اللاحق',
    dateEn: 'Subsequent expansion',
    titleAr: 'افتتاح فروع جديدة في 5 مدن إضافية',
    titleEn: 'New branches in five further cities',
    bodyAr: 'أعلنت ثانوية الموهوبين التقنية افتتاح فروعها الجديدة في مكة المكرمة والأحساء وأبها وجازان وحائل، إلى جانب فروعها القائمة، مع إطلاق التسجيل للعام الدراسي الجديد.',
    bodyEn: 'The Technical Gifted Secondary Schools announced new branches in Makkah, Al-Ahsa, Abha, Jazan and Hail alongside their existing locations, opening registration for the new academic year.',
    sources: ['spaNewBranches'],
  },
  {
    id: 'admission-ten-cities',
    date: '2026',
    dateAr: 'اختبارات القبول',
    dateEn: 'Admission testing',
    titleAr: 'اختتام اختبارات القبول في 10 مدن حول المملكة',
    titleEn: 'Admission testing concludes across ten cities',
    bodyAr: 'اختتمت مدارس الموهوبين التقنية اختبارات القبول للعام الدراسي 1448–1449هـ في عشر مدن حول المملكة، بهدف استقطاب أفضل القدرات والكفاءات الوطنية الموهوبة في المجالات التقنية.',
    bodyEn: 'The Technical Gifted Schools concluded admission testing for the 1448–1449 AH academic year across ten cities in the Kingdom, aiming to attract the strongest nationally gifted talent in technical fields.',
    sources: ['spaAdmissionTests'],
  },
];

/** The ten cities with a published presence. */
export const locations = {
  headquarters: {
    ar: 'المقر الرئيس لأكاديمية طويق، الرياض',
    en: 'Tuwaiq Academy headquarters, Riyadh',
    sources: ['spaLaunch', 'moeLaunch'],
  },
  cities: [
    { id: 'riyadh', ar: 'الرياض', en: 'Riyadh', wave: 'first', sources: ['moeFiveAdmins'] },
    { id: 'jeddah', ar: 'جدة', en: 'Jeddah', wave: 'first', sources: ['moeFiveAdmins'] },
    { id: 'eastern', ar: 'الدمام — المنطقة الشرقية', en: 'Dammam — Eastern Province', wave: 'first', sources: ['moeFiveAdmins'] },
    { id: 'qassim', ar: 'القصيم', en: 'Qassim', wave: 'first', sources: ['moeFiveAdmins'] },
    { id: 'madinah', ar: 'المدينة المنورة', en: 'Madinah', wave: 'first', sources: ['moeFiveAdmins'] },
    { id: 'makkah', ar: 'مكة المكرمة', en: 'Makkah', wave: 'second', sources: ['spaNewBranches'] },
    { id: 'ahsa', ar: 'الأحساء', en: 'Al-Ahsa', wave: 'second', sources: ['spaNewBranches'] },
    { id: 'abha', ar: 'أبها', en: 'Abha', wave: 'second', sources: ['spaNewBranches'] },
    { id: 'jazan', ar: 'جازان', en: 'Jazan', wave: 'second', sources: ['spaNewBranches'] },
    { id: 'hail', ar: 'حائل', en: 'Hail', wave: 'second', sources: ['spaNewBranches'] },
  ],
};

/**
 * Figures that appear verbatim in official or state reporting.
 * No student counts, staff counts or budget figures are published, so none
 * appear here.
 */
export const figures = [
  {
    id: 'cities',
    value: 10,
    labelAr: 'مدن حول المملكة',
    labelEn: 'cities across the Kingdom',
    sources: ['spaAdmissionTests', 'spaNewBranches'],
  },
  {
    id: 'tracks',
    value: 4,
    labelAr: 'مسارات تقنية متخصصة',
    labelEn: 'specialised technical tracks',
    sources: ['schoolSite', 'spaAdmissionTests'],
  },
  {
    id: 'first',
    value: 1,
    prefixAr: 'الأولى',
    labelAr: 'من نوعها على مستوى المملكة',
    prefixEn: 'First',
    labelEn: 'of its kind in the Kingdom',
    sources: ['spaLaunch', 'moeLaunch'],
    isOrdinal: true,
  },
  {
    id: 'since',
    value: 2024,
    labelAr: 'عام التدشين',
    labelEn: 'year of inauguration',
    sources: ['moeLaunch'],
    isYear: true,
  },
];

/**
 * Competition results.
 *
 * IMPORTANT: these results are published as achievements of أكاديمية طويق
 * (Tuwaiq Academy), the body that founded and operates the schools — the
 * reporting does not attribute them to the schools' own student body, and the
 * 2024 edition predates the schools' December 2024 inauguration. They are shown
 * on the site under the academy's name for exactly that reason, and the AI
 * assistant is instructed to preserve the distinction.
 */
export const academyResults = [
  {
    id: 'itex-2025',
    attributedTo: { ar: 'أكاديمية طويق', en: 'Tuwaiq Academy' },
    eventAr: 'المعرض الدولي للاختراعات والابتكارات التقنية «ITEX»',
    eventEn: 'International Invention, Innovation & Technology Exhibition (ITEX)',
    placeAr: 'كوالالمبور، ماليزيا',
    placeEn: 'Kuala Lumpur, Malaysia',
    year: 2025,
    resultAr: '12 ميدالية ذهبية وميداليتان فضيتان و16 جائزة خاصة، بمشاركة 14 مشروعًا مبتكرًا طوّرها 17 طالبًا وطالبة.',
    resultEn: '12 gold medals, two silver medals and 16 special awards, from 14 innovative projects developed by 17 students.',
    medals: { gold: 12, silver: 2, special: 16 },
    sources: ['spaItex2025'],
  },
  {
    id: 'itex-2024',
    attributedTo: { ar: 'أكاديمية طويق', en: 'Tuwaiq Academy' },
    eventAr: 'المعرض الدولي للاختراعات والابتكارات التقنية «ITEX»',
    eventEn: 'International Invention, Innovation & Technology Exhibition (ITEX)',
    placeAr: 'ماليزيا',
    placeEn: 'Malaysia',
    year: 2024,
    resultAr: '9 ميداليات ذهبية وميدالية فضية واحدة و11 جائزة خاصة.',
    resultEn: 'Nine gold medals, one silver medal and 11 special awards.',
    medals: { gold: 9, silver: 1, special: 11 },
    sources: ['spaItex2024'],
  },
];

/** What is genuinely distinctive, each line traceable to a source. */
export const distinctives = [
  {
    id: 'first-government',
    icon: 'flag',
    titleAr: 'الأولى من نوعها في المملكة',
    titleEn: 'First of its kind in the Kingdom',
    bodyAr: 'أول مدرسة حكومية متخصصة في رعاية الموهوبين في المجالات التقنية على مستوى المملكة.',
    bodyEn: 'The first government school in the Kingdom dedicated to nurturing giftedness in technical fields.',
    sources: ['moeLaunch', 'spaLaunch'],
  },
  {
    id: 'dual-partnership',
    icon: 'handshake',
    titleAr: 'شراكة بين وزارة التعليم وأكاديمية طويق',
    titleEn: 'A Ministry of Education and Tuwaiq Academy partnership',
    bodyAr: 'تُدار المدارس بالشراكة بين وزارة التعليم وأكاديمية طويق، بما يجمع بين المرجعية التعليمية الحكومية والخبرة التقنية المتخصصة.',
    bodyEn: 'The schools are run in partnership between the Ministry of Education and Tuwaiq Academy, pairing government educational oversight with specialist technical expertise.',
    sources: ['moeFiveAdmins', 'spaLaunch'],
  },
  {
    id: 'global-certs',
    icon: 'certificate',
    titleAr: 'شهادات احترافية عالمية',
    titleEn: 'Global professional certification',
    bodyAr: 'منهج مكثّف يتضمن شهادات احترافية من كبرى الجهات العالمية، أبرزها Apple وNVIDIA وMeta وGoogle.',
    bodyEn: 'An intensive curriculum including professional certifications from major global organisations — Apple, NVIDIA, Meta and Google among them.',
    sources: ['spaNewBranches', 'moeFiveAdmins'],
  },
  {
    id: 'selective',
    icon: 'target',
    titleAr: 'قبول انتقائي قائم على قياس الموهبة',
    titleEn: 'Selective admission based on talent measurement',
    bodyAr: 'اختبارات كشف عن الموهبة بأدوات مقنّنة ومعتمدة تقيس القدرة العقلية العامة والتحصيل والإبداع، إلى جانب المقابلة الشخصية.',
    bodyEn: 'Talent-identification testing with standardised, accredited instruments measuring general mental ability, attainment and creativity, alongside a personal interview.',
    sources: ['spaAdmissionTests'],
  },
  {
    id: 'competition-track',
    icon: 'trophy',
    titleAr: 'تأهيل للمنافسات الدولية',
    titleEn: 'Preparation for international competition',
    bodyAr: 'برامج ومشاريع مختصّة تؤهل الطلاب للمشاركة في المسابقات الإقليمية والدولية مثل «ISEF» و«أذكى».',
    bodyEn: 'Dedicated programmes and projects preparing students for regional and international competitions such as ISEF and “Athkia”.',
    sources: ['schoolSite'],
  },
  {
    id: 'national-reach',
    icon: 'map',
    titleAr: 'حضور وطني في عشر مدن',
    titleEn: 'A national footprint across ten cities',
    bodyAr: 'حضور في عشر مدن: الرياض، وجدة، والمنطقة الشرقية، والقصيم، والمدينة المنورة، ومكة المكرمة، والأحساء، وأبها، وجازان، وحائل.',
    bodyEn: 'Present in ten cities: Riyadh, Jeddah, the Eastern Province, Qassim, Madinah, Makkah, Al-Ahsa, Abha, Jazan and Hail.',
    sources: ['spaAdmissionTests', 'spaNewBranches'],
  },
];

/**
 * Contact. Only channels that are publicly published are listed.
 * No phone number or email address is published for the schools specifically,
 * so none is invented here.
 */
export const contact = {
  website: { url: 'https://schools.tuwaiq.edu.sa/', labelAr: 'الموقع الرسمي', labelEn: 'Official website' },
  operatorWebsite: { url: 'https://tuwaiq.edu.sa/', labelAr: 'أكاديمية طويق', labelEn: 'Tuwaiq Academy' },
  ministryWebsite: { url: 'https://www.moe.gov.sa/', labelAr: 'وزارة التعليم', labelEn: 'Ministry of Education' },
  social: [
    { id: 'x', network: 'X', handle: '@TuwaiqSchools', url: 'https://x.com/TuwaiqSchools', sources: ['xSchools'] },
    { id: 'x-academy', network: 'X', handle: '@TuwaiqAcademy', url: 'https://x.com/TuwaiqAcademy', labelAr: 'أكاديمية طويق', labelEn: 'Tuwaiq Academy', sources: ['tuwaiqSite'] },
  ],
  note: {
    ar: 'لم يُنشر رقم هاتف أو بريد إلكتروني مخصص لمدارس الموهوبين التقنية عبر القنوات الرسمية، لذا يرجى التواصل عبر الموقع الرسمي أو الحساب الرسمي على منصة X.',
    en: 'No dedicated telephone number or email address for the Technical Gifted Schools is published through official channels; please use the official website or the official account on X.',
  },
};

/** Hijri/Gregorian academic year referenced by the current admission cycle. */
export const academicYear = {
  hijri: '1448 – 1449هـ',
  sources: ['spaAdmissionTests', 'spaNewBranches'],
};

export const schoolData = {
  identity,
  summary,
  purpose,
  tracks,
  programme,
  admission,
  milestones,
  locations,
  figures,
  academyResults,
  distinctives,
  contact,
  academicYear,
};

export default schoolData;
