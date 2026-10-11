// Builds the downloadable CV files from src/data/cv.mjs:
//   public/cv/*.pdf   single-column ATS PDF (rendered by Chromium via playwright-core)
//   public/cv/*.docx  single-column ATS Word file (docx)
//   public/og.png, public/apple-touch-icon.png
// Run locally after any change to src/data/cv.mjs:  npm run cv
// The generated files are committed, so CI never needs a browser.
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { CV, CONTACT, FILES } from '../src/data/cv.mjs';
import {
  Document, Packer, Paragraph, TextRun, ExternalHyperlink, AlignmentType,
  LevelFormat, BorderStyle, HeadingLevel,
} from 'docx';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright-core');
const EXEC = process.env.CHROMIUM_PATH || ['/opt/pw-browsers/chromium', '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'].find((p) => existsSync(p));

mkdirSync('public/cv', { recursive: true });
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const font = (w) => readFileSync(`node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-${w}-normal.woff2`).toString('base64');
const fontCyr = (w) => readFileSync(`node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-cyrillic-${w}-normal.woff2`).toString('base64');

// ---------- PDF ----------
function cvHtml(lang) {
  const d = CV[lang];
  const contacts = `${esc(CONTACT.email)} · t.me/bodco · linkedin.com/in/bneymet · github.com/bodco`;
  const faces = [400, 600, 700].map((w) => `
    @font-face{font-family:Plex;font-weight:${w};src:url(data:font/woff2;base64,${font(w)}) format('woff2');unicode-range:U+0000-00FF,U+2000-206F,U+20AC,U+2122;}
    @font-face{font-family:Plex;font-weight:${w};src:url(data:font/woff2;base64,${fontCyr(w)}) format('woff2');unicode-range:U+0400-045F,U+0490-0491,U+04B0-04B1,U+2116;}`).join('');
  const roles = d.roles.map((r) => `
    <div class="role">
      <h3>${esc(r.title)}, ${esc(r.company)}</h3>
      <p class="meta">${esc(r.start)} - ${esc(r.end)} · ${esc(r.where)}</p>
      <ul>${r.groups.flatMap((g) => g.items).map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
    </div>`).join('');
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>${esc(CONTACT.name)} - ${esc(d.title)} - CV</title>
<style>${faces}
@page{size:A4;margin:15mm 16mm 15mm 16mm}
*{box-sizing:border-box}
body{font-family:Plex,Arial,sans-serif;font-size:10pt;line-height:1.42;color:#111;margin:0;border-left:3pt solid #E8492F;padding-left:9pt}
h1{font-size:21pt;margin:0;letter-spacing:-0.01em;line-height:1.1}
.title{font-size:11pt;font-weight:600;color:#C93A20;margin:2pt 0 4pt}
.contacts{font-size:9pt;color:#333;margin:0}
.contacts a{color:#333;text-decoration:none}
h2{font-size:10.5pt;text-transform:uppercase;letter-spacing:0.08em;margin:12pt 0 5pt;padding-bottom:2pt;border-bottom:0.75pt solid #999;color:#111;break-after:avoid}
h3{font-size:10.5pt;margin:0;break-after:avoid}
.meta{margin:1pt 0 3pt;color:#444;font-size:9.2pt}
p{margin:0}
ul{margin:0;padding-left:13pt;list-style:none}
li{margin:0 0 2pt;position:relative}
li::before{content:'•';position:absolute;left:-10pt}
.role{margin-bottom:8pt}
.role li{break-inside:avoid}
.skills p{margin-bottom:2.5pt}
.two{columns:1}
a{color:#111}
</style></head><body>
<h1>${esc(CONTACT.name)}</h1>
<p class="title">${esc(d.title)}</p>
<p class="contacts">${esc(d.location)}<br><a href="mailto:${CONTACT.email}">${esc(CONTACT.email)}</a> · Telegram <a href="${CONTACT.telegram.url}">@bodco</a> · <a href="${CONTACT.linkedin.url}">linkedin.com/in/bneymet</a> · <a href="${CONTACT.github.url}">github.com/bodco</a> · <a href="${CONTACT.site}">bodco.pm</a></p>
<h2>${esc(d.h.summary)}</h2><p>${esc(d.summary)}</p>
<h2>${esc(d.h.skills)}</h2><div class="skills">${d.skills.map((s) => `<p><b>${esc(s.name)}:</b> ${esc(s.items.join(', '))}</p>`).join('')}</div>
<h2>${esc(d.h.experience)}</h2>${roles}
<h2>${esc(d.h.projects)}</h2>
<p><b>${esc(d.project.name)}</b> · ${esc(d.project.meta)} · <a href="${CONTACT.tower}">tower.bodco.pm</a> · <a href="${CONTACT.towerRepo}">github.com/bodco/pm-control-tower</a></p><p>${esc(d.project.text)}</p>
<h2>${esc(d.h.education)}</h2><ul>${d.education.map((e) => `<li>${esc(e.degree)}. ${esc(e.school)}</li>`).join('')}</ul>
<h2>${esc(d.h.certifications)}</h2><ul>${d.certifications.map((c) => `<li>${esc(c.name)}. ${esc(c.meta)}</li>`).join('')}</ul>
<h2>${esc(d.h.languages)}</h2><p>${d.languages.map((l) => `${esc(l.name)}: ${esc(l.level)}`).join(' · ')}</p>
</body></html>`;
}

// ---------- DOCX ----------
function cvDocx(lang) {
  const d = CV[lang];
  const F = 'Calibri';
  const t = (text, o = {}) => new TextRun({ text, font: F, size: 21, ...o });
  const link = (text, url) => new ExternalHyperlink({ link: url, children: [new TextRun({ text, font: F, size: 19, style: 'Hyperlink' })] });
  const h2 = (text) => new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 220, after: 80 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '999999', space: 2 } },
    keepNext: true,
    children: [new TextRun({ text: text.toUpperCase(), font: F, size: 22, bold: true, characterSpacing: 20, color: '111111' })],
  });
  const p = (children, o = {}) => new Paragraph({ spacing: { after: 60 }, children, ...o });
  const bullet = (text) => new Paragraph({ numbering: { reference: 'b', level: 0 }, spacing: { after: 40 }, children: [t(text)] });

  const sep = () => new TextRun({ text: ' · ', font: F, size: 19 });
  const kids = [
    new Paragraph({ heading: HeadingLevel.TITLE, spacing: { after: 20 }, children: [new TextRun({ text: CONTACT.name, font: F, size: 40, bold: true, color: '111111' })] }),
    new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: d.title, font: F, size: 24, bold: true, color: 'C93A20' })] }),
    p([new TextRun({ text: d.location, font: F, size: 19 })], { spacing: { after: 20 } }),
    p([link(CONTACT.email, `mailto:${CONTACT.email}`), sep(), new TextRun({ text: 'Telegram ', font: F, size: 19 }), link('@bodco', CONTACT.telegram.url), sep(), link('linkedin.com/in/bneymet', CONTACT.linkedin.url), sep(), link('github.com/bodco', CONTACT.github.url), sep(), link('bodco.pm', CONTACT.site)]),
    h2(d.h.summary), p([t(d.summary)]),
    h2(d.h.skills),
    ...d.skills.map((s) => p([t(`${s.name}: `, { bold: true }), t(s.items.join(', '))], { spacing: { after: 40 } })),
    h2(d.h.experience),
    ...d.roles.flatMap((r) => [
      new Paragraph({ heading: HeadingLevel.HEADING_2, keepNext: true, spacing: { before: 100, after: 0 }, children: [t(`${r.title}, ${r.company}`, { bold: true, color: '111111' })] }),
      new Paragraph({ keepNext: true, spacing: { after: 60 }, children: [t(`${r.start} - ${r.end} · ${r.where}`, { color: '444444', size: 19 })] }),
      ...r.groups.flatMap((g) => g.items).map(bullet),
    ]),
    h2(d.h.projects),
    p([t(d.project.name, { bold: true }), t(` · ${d.project.meta} · `), link('tower.bodco.pm', CONTACT.tower), sep(), link('github.com/bodco/pm-control-tower', CONTACT.towerRepo)], { spacing: { after: 40 } }),
    p([t(d.project.text)]),
    h2(d.h.education), ...d.education.map((e) => bullet(`${e.degree}. ${e.school}`)),
    h2(d.h.certifications), ...d.certifications.map((c) => bullet(`${c.name}. ${c.meta}`)),
    h2(d.h.languages), p([t(d.languages.map((l) => `${l.name}: ${l.level}`).join(' · '))]),
  ];
  return new Document({
    creator: CONTACT.name,
    title: `${CONTACT.name} - ${d.title} - CV`,
    description: 'CV',
    styles: {
      default: {
        document: { run: { font: F, size: 21, language: { value: lang === 'uk' ? 'uk-UA' : 'en-US' } } },
        title: { run: { font: F, size: 40, bold: true, color: '111111' } },
        heading1: { run: { font: F, size: 22, bold: true, color: '111111' }, paragraph: { spacing: { before: 220, after: 80 } } },
        heading2: { run: { font: F, size: 21, bold: true, color: '111111' }, paragraph: { spacing: { before: 100, after: 0 } } },
      },
    },
    keywords: 'Senior Project Manager, Delivery Manager, Technical Project Manager, Fintech, Payments, Agile, Scrum, PM Control Tower',
    subject: `${d.title} CV`,
    numbering: { config: [{ reference: 'b', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 340, hanging: 220 } } } }] }] },
    sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 900, bottom: 900, left: 1000, right: 1000 } } }, children: kids }],
  });
}

// ---------- OG + touch icon ----------
const plexSans = (w) => `url(data:font/woff2;base64,${font(w)})`;
const ogHtml = `<!doctype html><html><head><style>
@font-face{font-family:P;font-weight:700;src:${plexSans(700)}}
@font-face{font-family:P;font-weight:400;src:${plexSans(400)}}
@font-face{font-family:M;src:url(data:font/woff2;base64,${readFileSync('node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2').toString('base64')})}
body{margin:0;width:1200px;height:630px;background:#0e1014;background-image:linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px);background-size:80px 80px;border-left:14px solid #E8492F;box-sizing:border-box;color:#ecedef;font-family:P;padding:96px 88px;position:relative}
.m{width:72px;height:72px}
h1{font-size:104px;margin:40px 0 8px;letter-spacing:-.035em;line-height:1}
.r{font-family:M;font-size:26px;letter-spacing:.2em;color:#E8492F;text-transform:uppercase}
.l{position:absolute;left:88px;bottom:72px;font-family:M;font-size:20px;letter-spacing:.16em;color:#b5bac2;text-transform:uppercase}
</style></head><body>${readFileSync('public/favicon.svg', 'utf8').replace('<svg ', '<svg class="m" ')}<h1>Bohdan N.</h1><div class="r">Senior Project Manager</div><div class="l">Fintech · Payments · 50,000+ users · PM Control Tower</div></body></html>`;

const browser = await chromium.launch({ executablePath: EXEC });
const page = await browser.newPage();
for (const lang of ['en', 'uk']) {
  await page.setContent(cvHtml(lang), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: `public${FILES[lang].pdf}`, format: 'A4', printBackground: true, preferCSSPageSize: true, tagged: true, outline: true });
  writeFileSync(`public${FILES[lang].docx}`, await Packer.toBuffer(cvDocx(lang)));
  console.log(`cv: ${lang} pdf + docx`);
}
await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(ogHtml, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'public/og.png' });
await page.setViewportSize({ width: 180, height: 180 });
await page.setContent(`<body style="margin:0">${readFileSync('public/favicon.svg', 'utf8').replace('<svg ', '<svg width="180" height="180" ')}</body>`);
await page.screenshot({ path: 'public/apple-touch-icon.png' });
await browser.close();
console.log('og.png + apple-touch-icon.png');
