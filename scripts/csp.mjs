// Adds a Content-Security-Policy <meta> to every built page (GitHub Pages cannot send headers).
// Inline scripts are allowed by their SHA-256 only, so an injected script would not run.
// Google Analytics 4: gtag.js from googletagmanager.com, hits to *.google-analytics.com.
// Runs after `astro build`: node scripts/csp.mjs [dist]
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const DIST = process.argv[2] || 'dist';
const GA = 'https://www.googletagmanager.com';
const GA_HITS = 'https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com';

function walk(p, out = []) {
  for (const f of readdirSync(p)) {
    const q = join(p, f);
    if (statSync(q).isDirectory()) walk(q, out); else if (q.endsWith('.html')) out.push(q);
  }
  return out;
}

let pages = 0, bad = 0;
for (const file of walk(DIST)) {
  let html = readFileSync(file, 'utf8');
  if (html.includes('http-equiv="Content-Security-Policy"')) continue;
  if (/\son[a-z]+\s*=\s*["']/i.test(html.replace(/<script[\s\S]*?<\/script>/gi, ''))) {
    console.error(`${file}: inline event handler (onclick=...) would be blocked by the CSP`); bad++;
  }
  const hashes = new Set();
  for (const m of html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (/type=["']application\/(ld\+)?json["']/i.test(m[1])) continue;   // data, never executed
    hashes.add(`'sha256-${createHash('sha256').update(m[2], 'utf8').digest('base64')}'`);
  }
  const csp = [
    "default-src 'self'",
    `script-src 'self' ${[...hashes].join(' ')} ${GA}`.replace(/\s+/g, ' ').trim(),
    `connect-src 'self' ${GA_HITS}`,
    `img-src 'self' data: ${GA_HITS}`,
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self' data:",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'none'",
  ].join('; ');
  const meta = `<meta http-equiv="Content-Security-Policy" content="${csp}">`;
  html = html.replace(/(<meta charset="[^"]*"\s*\/?>)/i, `$1${meta}`);
  if (!html.includes(meta)) { console.error(`${file}: no <meta charset> to anchor the CSP`); bad++; continue; }
  writeFileSync(file, html);
  pages++;
}
console.log(`csp: ${pages} page(s)` + (bad ? `, ${bad} problem(s)` : ''));
if (bad) process.exit(1);
