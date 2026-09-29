/**
 * Where to actually see the schools and their environment.
 *
 * The site does not republish photography it cannot verify, but the publishers
 * who hold authentic imagery are themselves verifiable — so we send visitors to
 * the source instead. Every entry below is an account or media centre that was
 * confirmed to belong to the schools, to Tuwaiq Academy (the operator), or to
 * the government bodies that covered them.
 *
 * `owner` matters and is surfaced in the UI: the schools' own channel is not
 * the same thing as the operating academy's, and neither is a ministry release.
 * Nothing here is described as the schools' own unless it is.
 */

export const channelGroups = [
  {
    id: 'schools',
    owner: 'schools',
    titleAr: 'قنوات المدارس الرسمية',
    titleEn: 'The schools’ own channels',
    noteAr: 'الحساب الرسمي لمدارس الموهوبين التقنية، وفيه صور ومقاطع من داخل المدارس وفعالياتها واختبارات القبول.',
    noteEn: 'The Technical Gifted Schools’ official account, carrying photographs and clips from inside the schools, their events and admission testing.',
    sources: ['xSchools'],
    items: [
      {
        id: 'schools-x',
        icon: 'x',
        brand: true,
        nameAr: 'مدارس الموهوبين التقنية على X',
        nameEn: 'Technical Gifted Schools on X',
        handle: '@TuwaiqSchools',
        descAr: 'المنشورات الرسمية: صور الفعاليات، الفصول، المختبرات، واختبارات القبول في مختلف المدن.',
        descEn: 'Official posts: event photography, classrooms, laboratories and admission testing across the cities.',
        url: 'https://x.com/TuwaiqSchools',
      },
      {
        id: 'schools-x-media',
        icon: 'camera',
        nameAr: 'معرض الصور والمقاطع على X',
        nameEn: 'Photo and video tab on X',
        handle: '@TuwaiqSchools/media',
        descAr: 'كل الصور والمقاطع التي نشرها الحساب الرسمي، مجمّعة في صفحة واحدة.',
        descEn: 'Every image and clip the official account has posted, gathered on a single page.',
        url: 'https://x.com/TuwaiqSchools/media',
        featured: true,
      },
      {
        id: 'schools-x-highlights',
        icon: 'spark',
        nameAr: 'أبرز المنشورات',
        nameEn: 'Highlights',
        handle: '@TuwaiqSchools/highlights',
        descAr: 'المنشورات التي اختارها الحساب لإبرازها، وغالبًا ما تشمل الإعلانات والفعاليات الكبرى.',
        descEn: 'The posts the account has chosen to highlight — usually major announcements and events.',
        url: 'https://x.com/TuwaiqSchools/highlights',
      },
    ],
  },
  {
    id: 'academy',
    owner: 'academy',
    titleAr: 'قنوات أكاديمية طويق',
    titleEn: 'Tuwaiq Academy’s channels',
    noteAr: 'أكاديمية طويق هي الجهة التي أسّست المدارس وتشغّلها، ودُشّنت المدرسة الأولى في مقرها بالرياض. قنواتها تعرض البيئة التقنية والمرافق والفعاليات، وليست كل موادها مخصصة للمدارس.',
    noteEn: 'Tuwaiq Academy founded and operates the schools, and the first school was inaugurated at its Riyadh campus. Its channels show the technical environment, facilities and events — not all of that material is specific to the schools.',
    sources: ['tuwaiqSite'],
    items: [
      {
        id: 'academy-youtube',
        icon: 'youtube',
        nameAr: 'قناة أكاديمية طويق على يوتيوب',
        nameEn: 'Tuwaiq Academy on YouTube',
        handle: '@TuwaiqAcademy_',
        descAr: 'مقاطع مرئية تعرض البيئة التعليمية والتقنية والفعاليات والبرامج.',
        descEn: 'Video showing the teaching and technical environment, events and programmes.',
        url: 'https://www.youtube.com/@TuwaiqAcademy_/videos',
        featured: true,
      },
      {
        id: 'academy-intro-video',
        icon: 'play',
        nameAr: 'الفيديو التعريفي بأكاديمية طويق',
        nameEn: 'Tuwaiq Academy introductory film',
        descAr: 'جولة مرئية تعرّف بالأكاديمية وبيئتها التقنية ومرافقها.',
        descEn: 'A filmed introduction to the academy, its technical environment and its facilities.',
        url: 'https://www.youtube.com/watch?v=XaD-inLGgZM',
        featured: true,
      },
      {
        id: 'academy-instagram',
        icon: 'instagram',
        nameAr: 'أكاديمية طويق على إنستقرام',
        nameEn: 'Tuwaiq Academy on Instagram',
        handle: '@tuwaiqacademy',
        descAr: 'صور ومقاطع قصيرة من داخل الأكاديمية وفعالياتها.',
        descEn: 'Photography and short clips from inside the academy and its events.',
        url: 'https://www.instagram.com/tuwaiqacademy/',
      },
      {
        id: 'academy-tiktok',
        icon: 'tiktok',
        nameAr: 'أكاديمية طويق على تيك توك',
        nameEn: 'Tuwaiq Academy on TikTok',
        handle: '@tuwaiqacademy',
        descAr: 'مقاطع قصيرة عن البرامج والمتدربين والبيئة التقنية.',
        descEn: 'Short-form video on the programmes, trainees and the technical environment.',
        url: 'https://www.tiktok.com/@tuwaiqacademy',
      },
      {
        id: 'academy-linkedin',
        icon: 'linkedin',
        nameAr: 'أكاديمية طويق على لينكدإن',
        nameEn: 'Tuwaiq Academy on LinkedIn',
        descAr: 'إعلانات ومواد مصوّرة عن الشراكات والبرامج والمخرجات.',
        descEn: 'Announcements and imagery covering partnerships, programmes and outcomes.',
        url: 'https://www.linkedin.com/school/tuwaiqacademy/',
      },
      {
        id: 'academy-x',
        icon: 'x',
        brand: true,
        nameAr: 'أكاديمية طويق على X',
        nameEn: 'Tuwaiq Academy on X',
        handle: '@TuwaiqAcademy',
        descAr: 'التغطية اليومية للفعاليات والمشاركات والمسابقات.',
        descEn: 'Day-to-day coverage of events, participations and competitions.',
        url: 'https://x.com/TuwaiqAcademy',
      },
    ],
  },
  {
    id: 'government',
    owner: 'government',
    titleAr: 'المصادر الحكومية والإعلامية',
    titleEn: 'Government and press sources',
    noteAr: 'تنشر وزارة التعليم ووكالة الأنباء السعودية تغطيات مصوّرة لتدشين المدارس وافتتاح فروعها.',
    noteEn: 'The Ministry of Education and the Saudi Press Agency publish photographed coverage of the schools’ inauguration and of each expansion.',
    sources: ['moeLaunch', 'spaLaunch'],
    items: [
      {
        id: 'moe-launch',
        icon: 'newspaper',
        nameAr: 'وزارة التعليم — تغطية التدشين',
        nameEn: 'Ministry of Education — inauguration coverage',
        descAr: 'الخبر الرسمي لتدشين أول مدرسة ثانوية للموهوبين في التقنية، ومعه الصور المنشورة.',
        descEn: 'The official release on the inauguration of the first technical gifted secondary school, with its published photography.',
        url: 'https://www.moe.gov.sa/ar/mediacenter/MOEnews/Pages/news1_25122024.aspx',
        featured: true,
      },
      {
        id: 'moe-media',
        icon: 'camera',
        nameAr: 'المركز الإعلامي لوزارة التعليم',
        nameEn: 'Ministry of Education media centre',
        descAr: 'أرشيف الأخبار والمواد المصوّرة للوزارة، ويمكن البحث فيه عن تغطيات المدارس.',
        descEn: 'The ministry’s news and media archive, searchable for coverage of the schools.',
        url: 'https://www.moe.gov.sa/ar/mediacenter/',
      },
      {
        id: 'moe-branches',
        icon: 'newspaper',
        nameAr: 'وزارة التعليم — افتتاح الفروع',
        nameEn: 'Ministry of Education — branch openings',
        descAr: 'تغطية افتتاح مدارس الموهوبين التقنية في خمس إدارات تعليمية.',
        descEn: 'Coverage of the schools opening across five education directorates.',
        url: 'https://www.moe.gov.sa/ar/mediacenter/MOEnews/Pages/news1_18072025.aspx',
      },
      {
        id: 'spa',
        icon: 'newspaper',
        nameAr: 'وكالة الأنباء السعودية — واس',
        nameEn: 'Saudi Press Agency (SPA)',
        descAr: 'التغطيات الرسمية المصوّرة لإطلاق المدارس وتوسعها واختبارات القبول.',
        descEn: 'Official photographed coverage of the launch, the expansion and admission testing.',
        url: 'https://www.spa.gov.sa/N2157339',
      },
    ],
  },
];

export const allChannels = channelGroups.flatMap((g) => g.items);

export const featuredChannels = allChannels.filter((c) => c.featured);

export default channelGroups;
