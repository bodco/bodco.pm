# bodco.pm: personal CV site of Bohdan N.

One page, two languages (EN at `/`, UK at `/uk/`), same design system as
[tower.bodco.pm](https://tower.bodco.pm): IBM Plex, 80 px grid, red bar, dark by default, light only when switched by hand.

Under the hood it is built for parsers, not only for people:

- semantic HTML, one `h1`, standard CV section names in every `h2` (Summary, Work Experience,
  Projects, Skills, Education, Certifications, Languages), all facts as real text;
- JSON-LD `ProfilePage` + `Person`, canonical, hreflang, Open Graph image;
- downloadable single-column ATS CVs in PDF and Word, EN and UK, generated from the same data.

## Where the content lives

| What | File |
|---|---|
| CV facts (roles, skills, education, PDF/DOCX content), EN and UK | `src/data/cv.mjs` |
| Page-only copy (hero, case, Control Tower block, habits, contact) | `src/views/Home.astro`, object `T` |
| Head, SEO, JSON-LD | `src/layouts/Base.astro` |
| Design tokens (copied from tower, fonts trimmed to latin + cyrillic) | `src/styles/global.css` |
| CV-specific components and print styles | `src/styles/cv.css` |
| PDF, DOCX, og.png, apple-touch-icon generator | `scripts/build-cv.mjs` |

## Rules for the text

Facts come only from the Truth Bank (Notion: Opportunities > CV і Truth Bank). In short:
name is always "Bohdan N.", no phone, no pre-2019 experience, no education years, the 2019-2022
employer is always "IT Outsourcing Company (name under NDA)", no client or product names, no
hours-saved claims for PM Control Tower, no long dashes. Nothing on the page says "open to work".

## Run locally

```
npm install
npm run dev          # http://localhost:4321
npm run cv           # regenerate public/cv/*.pdf, *.docx, og.png (needs Chromium, see below)
npm run check:text   # no long dashes, no private words
npm run build        # static site in dist/
node scripts/make-preview.mjs   # preview-en.html / preview-uk.html, open straight from disk
```

`npm run cv` uses `playwright-core` with a local Chromium. On a Mac with Google Chrome:
`CHROMIUM_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" npm run cv`.
The generated files are committed, so CI never needs a browser.

## Private words check

`.private-words` (git-ignored, one word per line) holds real client, employer and project names.
`npm run check:text` fails if any of them, or a long dash, appears in `src/`, `public/` or the docs.
The CV PDFs and DOCX are binary, so check them after `npm run cv` with
`pdftotext public/cv/*.pdf - | grep -iFf .private-words`.

## Deploy

See [DEPLOY.md](DEPLOY.md).
