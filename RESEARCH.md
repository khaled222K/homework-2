# Research record

Every factual claim on this site traces back to an entry here. The machine-readable
version lives in [`src/data/sources.js`](src/data/sources.js); the claims themselves
live in [`src/data/school.js`](src/data/school.js), each carrying a `sources` array.

## Subject

**مدارس الموهوبين التقنية** — also published as **مدرسة الموهوبين التقنية الثانوية**
and **ثانوية الموهوبين التقنية**. English: *Technical Gifted Schools* /
*Technical Gifted Secondary School*.

Launched by **أكاديمية طويق** (Tuwaiq Academy) in partnership with **وزارة التعليم**
(the Saudi Ministry of Education), as the first government school of its kind in the
Kingdom.

## Sources consulted

| Tier | Source | URL |
|---|---|---|
| Official | Technical Gifted Schools — official site | https://schools.tuwaiq.edu.sa/ |
| Official | Tuwaiq Academy | https://tuwaiq.edu.sa/ |
| Official | Tuwaiq Academy — launch announcement | https://tuwaiq.edu.sa/news/5e773783-7ce6-422a-ba0d-4bd804197047 |
| Official | Ministry of Education — inauguration (25 Dec 2024) | https://www.moe.gov.sa/ar/mediacenter/MOEnews/Pages/news1_25122024.aspx |
| Official | Ministry of Education — five directorates (18 Jul 2025) | https://www.moe.gov.sa/ar/mediacenter/MOEnews/Pages/news1_18072025.aspx |
| Official | Schools' account on X | https://x.com/TuwaiqSchools |
| State | SPA — Tuwaiq Academy launches the school | https://www.spa.gov.sa/N2157339 |
| State | SPA — opening across five directorates | https://www.spa.gov.sa/N2362979 |
| State | SPA — new branches in five further cities | https://www.spa.gov.sa/N2563471 |
| State | SPA — admission testing across ten cities | https://www.spa.gov.sa/N2608811 |
| State | SPA — Madinah registration | https://www.spa.gov.sa/N2488503 |
| State | SPA — Jeddah registration | https://www.spa.gov.sa/N2350842 |
| State | SPA — Tuwaiq Academy at ITEX 2024 | https://www.spa.gov.sa/N2105201 |
| State | SPA — Tuwaiq Academy at ITEX 2025 | https://www.spa.gov.sa/N2331223 |
| Reference | Saudipedia entry | https://saudipedia.com/مدرسة-الموهوبين-التقنية-الثانوية |

## What is on the site, and why

| Claim | Basis |
|---|---|
| First government school in the Kingdom specialising in technical giftedness | MoE inauguration release; SPA launch report |
| Inaugurated December 2024 by Minister of Education Yousef Al-Benyan, at Tuwaiq Academy in Riyadh; attended by the Minister of Communications and IT Abdullah Alswaha and Tuwaiq Academy board chairman Faisal Alkhamisi | MoE inauguration release; SPA launch report |
| Four tracks: computer science, AI, mechatronics engineering, cybersecurity — with the descriptions quoted | Schools' official site; SPA admission-testing report |
| Professional certifications from Apple, NVIDIA, Meta and Google | SPA new-branches report; MoE five-directorates release |
| Preparation for ISEF and the national programming/AI olympiad "أذكى" | Schools' official site |
| Ten cities: Riyadh, Jeddah, Eastern Province, Qassim, Madinah, Makkah, Al-Ahsa, Abha, Jazan, Hail | MoE five-directorates release; SPA new-branches report; SPA admission-testing report |
| Admission: enrolled in third intermediate grade, ≥90% in last qualification, English fundamentals | SPA Madinah registration report |
| Selection via standardised talent-identification instruments (general mental ability, attainment, creativity) plus interview | SPA admission-testing report |
| Academic year 1448–1449 AH for the current admission cycle | SPA admission-testing and new-branches reports |
| ITEX results (2024: 9 gold / 1 silver / 11 special; 2025: 12 gold / 2 silver / 16 special, 14 projects by 17 students) | SPA ITEX reports |

## Deliberate omissions

Nothing below appears on the site, because no official or state source publishes it.
These are also listed explicitly in the AI assistant's grounding context so that it
refuses rather than guesses.

- Student numbers, teacher numbers, staff numbers
- Names of school principals or faculty
- Tuition fees or funding figures
- A telephone number or email address for the schools
- Detailed street addresses for individual branches
- Named individual student projects belonging to these schools
- An itemised list of facilities or laboratories
- Competition results attributed specifically to *these schools'* own students

## Two attribution decisions worth flagging

**1. "Vision" and "Mission".** The schools publish no statements formally headed
رؤية or رسالة. Rather than invent institutional boilerplate, the site presents their
*stated purpose* as published, and the section lead says exactly that. Each statement
quoted from a publisher is badged as official wording; our own connective summaries
are labelled as ours.

**2. The ITEX medals belong to Tuwaiq Academy, not to the schools.** The SPA reports
attribute these results to **أكاديمية طويق** — the body that founded and operates the
schools — and do *not* attribute them to the schools' student body. The 2024 edition
predates the schools' December 2024 inauguration entirely. The site therefore presents
them under the academy's name, leads the section with that caveat, and states plainly
that no results attributed to the schools' own students have been published. The
assistant's system instruction carries the same constraint.

## Photography

The site displays no photographs of the schools. The rule is that an image is only
presented as a school photograph if its publishing page identifies it as one, and no
such image could be verified while this site was built. Stock and generated imagery
are not acceptable substitutes, so the hero and gallery use designed,
non-pictorial treatments that never imply they depict the campus.

The gallery is fully built and reads from [`src/data/media.js`](src/data/media.js) —
adding verified entries there turns it on with no component changes. See
[`public/media/README.md`](public/media/README.md) for the procedure.

## Research conditions

This site was built in a sandboxed environment whose network policy blocked direct
page fetches to `schools.tuwaiq.edu.sa`, `tuwaiq.edu.sa`, `moe.gov.sa`, `spa.gov.sa`
and `saudipedia.com`. Research was therefore conducted through indexed search
results rather than by reading each page directly, and cross-checked across at least
two independent sources for every claim above.

**Before publishing, open each URL in the table above and confirm the claim it
supports.** The claims are recorded here precisely so that check is quick.
