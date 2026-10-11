// Builds a single self-contained preview file (preview-en.html, preview-uk.html) from dist/,
// with CSS, fonts and scripts inlined, so the page can be opened straight from disk.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
for (const [lang, file] of [['en', 'dist/index.html'], ['uk', 'dist/uk/index.html']]) {
  let html = readFileSync(file, 'utf8');
  html = html.replace(/<link rel="stylesheet" href="([^"]+)"[^>]*>/g, (_, href) => {
    let css = readFileSync(join('dist', href), 'utf8');
    css = css.replace(/url\((\/_astro\/[^)]+\.woff2)\)/g, (m, u) => `url(data:font/woff2;base64,${readFileSync(join('dist', u)).toString('base64')})`)
             .replace(/url\((\/_astro\/[^)]+\.woff)\)/g, 'url(about:blank)');
    return `<style>${css}</style>`;
  });
  html = html.replace(/<script type="module" src="([^"]+)"><\/script>/g, (_, src) => `<script type="module">${readFileSync(join('dist', src), 'utf8')}</script>`);
  html = html.replace(/<link rel="preload"[^>]*>/g, '');
  html = html.replace(/href="\/cv\//g, 'href="public/cv/').replace(/href="\/uk\/"/g, 'href="preview-uk.html"').replace(/href="\/"/g, 'href="preview-en.html"');
  html = html.replace(/href="\/favicon.svg"/, 'href="public/favicon.svg"');
  writeFileSync(`preview-${lang}.html`, html);
  console.log(`preview-${lang}.html`, Math.round(html.length / 1024), 'KB');
}
