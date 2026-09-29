# مدارس الموهوبين التقنية — portfolio site

A production frontend for **مدارس الموهوبين التقنية** (Technical Gifted Schools), the
first government schools in Saudi Arabia specialising in technical giftedness, run by

**أكاديمية طويق** in partnership with *





An educational project built with AI, demonstrating clean file structure and
secure API key handling via .env and .env.example.



Arabic-first with full RTL support and an Arabic/English toggle. Includes a
Gemini-powered assistant that answers **only** from the site's verified knowledge base.

> This is an unofficial informational site. The schools' official site is
> <https://schools.tuwaiq.edu.sa/>.

## Quick start

```bash
npm install
cp .env.example .env        # then add your GEMINI_API_KEY
npm run dev                 # Vite on :5173, API on :3001
```

Open <http://localhost:5173>. The site works fully without an API key — only the
assistant is disabled, and it says so in its own empty state rather than failing
silently.

```bash
npm run build && npm start  # production build, served from :3001
```

## The content rule

**Accuracy outranks completeness.** Every factual claim on this site traces to an
official or state source, and anything that could not be verified was left out rather
than plausibly filled in.

- All facts live in [`src/data/school.js`](src/data/school.js); each entry carries a
  `sources` array keyed into [`src/data/sources.js`](src/data/sources.js).
- Sections render those sources as discreet attribution lines.
- [`RESEARCH.md`](RESEARCH.md) is the research record: every claim, its basis, and an
  explicit list of what was deliberately omitted.
- No photographs of the schools are shown, because none could be verified. See
  [Photography](#photography).

If you add content, add it to `src/data/school.js` with a source — not to a component.

## Gemini assistant

### Security

The API key is read **only** by the Node backend. It is never bundled into the
frontend, never prefixed with `VITE_`, and never leaves the server.

```
Browser  ──POST /api/chat──▶  Node backend  ──▶  Gemini API
                                    ▲
                             GEMINI_API_KEY
                          (server environment only)
```

`.env` is gitignored; `.env.example` carries the placeholder.

### Grounding

[`server/knowledge.js`](server/knowledge.js) renders `src/data/school.js` into the
model's system instruction, together with an explicit **"not available"** list. The
model is told to answer only from that context, to say so plainly when something is
absent, to never present unofficial wording as an official quote, and to reply in the
language it was asked in. Temperature is 0.2 — this assistant reports, it does not
invent.

### Model selection

No model id is hard-coded as the primary choice. On first use the backend calls the
Gemini **ListModels** endpoint, filters to models that currently support
`generateContent`, and picks the best available by preference order, caching the
result. Pin one with `GEMINI_MODEL` to skip discovery; `gemini-2.5-flash` is the
fallback if discovery is unavailable.

### API

| | |
|---|---|
| `GET /api/chat` | `{ configured: boolean, model?: string }` — readiness probe |
| `POST /api/chat` | `{ message: string, history?: [{role, text}] }` → `{ reply, model }` |

Handled: missing key (503), validation (400), rate limiting (429, 20/min per IP),
upstream timeout (504), safety blocks (422), empty candidates, and unparseable
responses. Each maps to a distinct, localised message in the UI with a retry.

## Photography

No image is presented as a photograph of the schools unless its publishing page
identifies it as one, and none could be verified when this was built. No stock or
generated imagery stands in.

So the *الصور والمقاطع* section sends visitors to the publishers who do hold
authentic photography and video — the schools' own account, Tuwaiq Academy's
channels, the Ministry of Education media centre and SPA. Those are recorded in
[`src/data/channels.js`](src/data/channels.js), and each group is badged with whose
channel it is, since the schools' account, the operating academy's, and a ministry
release are not the same thing. The assistant knows them too, so it can answer
"where can I see the school?".

The photo grid is still fully built and reads
[`src/data/media.js`](src/data/media.js), which ships empty. Drop verified images
into `public/media/`, register them in the manifest, and the grid appears above the
channel list — no component changes needed. See
[`public/media/README.md`](public/media/README.md) for sourcing rules.

## Architecture

```
api/chat.js              Serverless entry (Vercel/Netlify)
server/
  index.js               Express server — /api in dev, + dist/ in production
  chatHandler.js         Shared handler: validation, rate limiting, error mapping
  gemini.js              Gemini client, model discovery, typed errors
  knowledge.js           Builds the grounding context from src/data/school.js
src/
  data/school.js         ← the verified knowledge base (single source of truth)
  data/sources.js        Source registry
  data/media.js          Verified photograph manifest
  i18n/                  Language context (ar/en, RTL) + interface copy
  components/
    ui/                  Section, Reveal, SourceNote, Icon, motion vocabulary
    sections/            One file per page section
    chat/                Assistant panel and its state hook
    layout/              Navbar, Footer, document head & JSON-LD
```

Both deployment targets call the same `chatHandler`, so they cannot drift apart.

## Design

White, deep navy and royal blue, with very light blue surfaces. One technical grid
motif, one easing curve (`cubic-bezier(0.22, 1, 0.36, 1)`), short travel (16–24px),
and nothing that loops, spins or bounces. `prefers-reduced-motion` is honoured
globally.

## Accessibility & SEO

Semantic landmarks, labelled sections, skip link, visible focus rings, keyboard-
operable lightbox and chat, `aria-live` on the typing indicator, and focus trapping via
scroll lock on modal surfaces. `<html lang>` and `dir` follow the language toggle.
Open Graph and Twitter metadata update per language, and `HighSchool` JSON-LD is
emitted from the same verified data the page renders.

## Deployment

**Vercel/Netlify:** [`vercel.json`](vercel.json) is included; set `GEMINI_API_KEY` in
the project's environment variables. `api/chat.js` is picked up automatically.

**Node host:** `npm run build && npm start`, with `GEMINI_API_KEY` and optionally
`PORT` in the environment.

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Vite + API together |
| `npm run build` | Production bundle to `dist/` |
| `npm start` | Serve `dist/` and the API from Express |
| `npm run lint` | ESLint |
