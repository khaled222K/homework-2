# `public/media` — verified school photography

Drop authentic photographs of مدارس الموهوبين التقنية here, then register each
one in `src/data/media.js`. The gallery, hero and programme cards read that
manifest directly; nothing else needs to change.

## The rule

Only images published by a source that identifies them as depicting the schools
belong here. That means, in practice:

- the schools' own site — <https://schools.tuwaiq.edu.sa/>
- the schools' official account on X — <https://x.com/TuwaiqSchools>
- Tuwaiq Academy — <https://tuwaiq.edu.sa/>
- the Ministry of Education media centre — <https://www.moe.gov.sa/ar/mediacenter/>
- Saudi Press Agency coverage — <https://www.spa.gov.sa/>

A photograph that merely *looks* like a technology classroom is not a
photograph of this school. Stock imagery and generated imagery must not be
placed here at all. Check each publisher's terms of use before republishing.

## File guidance

| | |
|---|---|
| Format | `.webp` preferred, `.jpg` accepted |
| Long edge | 2400px for gallery/hero, 1200px for card thumbnails |
| Naming | `<city>-<subject>.webp`, e.g. `riyadh-exterior.webp` |
| Weight | keep each file under ~400 KB after compression |

Record the intrinsic `width` and `height` in the manifest entry — the gallery
reserves the correct aspect ratio from them, which keeps Cumulative Layout Shift
at zero while images stream in.
