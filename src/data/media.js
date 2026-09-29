/**
 * Verified photograph manifest.
 *
 * WHY THIS FILE IS EMPTY
 * ----------------------
 * The site's content rule is that nothing is presented as a photograph of the
 * school unless it can be verified as such. Stock photography and generated
 * imagery are not acceptable substitutes, and an unattributed image found in a
 * search result is not verification.
 *
 * The gallery, hero and programme cards are all wired to this manifest and will
 * render real photography the moment entries are added — no component changes
 * are needed. Until then the hero uses a designed, non-pictorial treatment that
 * never claims to depict the school, and the gallery section routes visitors to
 * the publishers who do hold authentic imagery (see ./channels.js).
 *
 * HOW TO ADD A PHOTOGRAPH
 * -----------------------
 * 1. Save the image under `public/media/` (see public/media/README.md for the
 *    naming and size guidance).
 * 2. Add an entry below. Every field except `width`/`height` is required:
 *
 *    {
 *      id:        'riyadh-exterior',              // unique, kebab-case
 *      src:       '/media/riyadh-exterior.jpg',   // path under public/
 *      width:     2400, height: 1600,             // intrinsic px, avoids layout shift
 *      category:  'exterior',                     // see CATEGORIES below
 *      alt:       { ar: '...', en: '...' },       // describe what is shown, factually
 *      caption:   { ar: '...', en: '...' },       // optional, shown in the lightbox
 *      credit:    'وزارة التعليم',                 // the publisher of the photograph
 *      sourceUrl: 'https://www.moe.gov.sa/...',   // the page it was published on
 *      verifiedOn:'2026-01-01',                   // when you confirmed the attribution
 *    }
 *
 * 3. Only add an image whose publishing page identifies it as depicting
 *    مدارس الموهوبين التقنية. If the page does not say so, leave it out.
 *
 * Suggested places to look, all of which publish their own photography:
 *   • https://schools.tuwaiq.edu.sa/           (the schools' own site)
 *   • https://x.com/TuwaiqSchools              (the schools' official account)
 *   • https://www.moe.gov.sa/ar/mediacenter/   (Ministry of Education media centre)
 *   • https://www.spa.gov.sa/                  (Saudi Press Agency photo wires)
 * Check each publisher's terms before reusing an image.
 */

export const CATEGORIES = ['exterior', 'interior', 'labs', 'activities', 'events', 'projects', 'competitions'];

/** @type {Array<{id:string,src:string,width?:number,height?:number,category:string,alt:{ar:string,en:string},caption?:{ar:string,en:string},credit:string,sourceUrl:string,verifiedOn?:string}>} */
export const photographs = [];

/** The single image used as the hero's main visual, if one has been verified. */
export const heroPhotoId = null;

export const hasPhotographs = photographs.length > 0;

export const getHeroPhoto = () =>
  (heroPhotoId && photographs.find((p) => p.id === heroPhotoId)) || photographs[0] || null;

export const photosByCategory = (category) =>
  category === 'all' ? photographs : photographs.filter((p) => p.category === category);

export const activeCategories = () =>
  CATEGORIES.filter((c) => photographs.some((p) => p.category === c));

export default photographs;
