// Fails the build on two things:
// 1. the long dash (U+2014) anywhere in content or source;
// 2. words listed in a local, git-ignored file `.private-words` (one per line),
//    so real project, client and people names never reach the public site.
//    The list itself stays on the author's machine and is never committed.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOTS = ['src', 'public', 'README.md', 'DEPLOY.md'];
const EXT = new Set(['.astro', '.md', '.mdx', '.ts', '.js', '.mjs', '.css', '.json', '.svg', '.html', '.txt', '']);
const LONG_DASH = String.fromCharCode(0x2014);

// The list comes from the local file, or from the PRIVATE_WORDS secret in CI (a missing list is
// reported, so a green run never pretends the check ran).
const rawWords = process.env.PRIVATE_WORDS || (existsSync('.private-words') ? readFileSync('.private-words', 'utf8') : null);
if (rawWords === null) console.warn('check-text: no private word list (.private-words or PRIVATE_WORDS): names not checked');
const privateWords = (rawWords ?? '').split('\n').map((s) => s.trim()).filter((s) => s && !s.startsWith('#'));

function walk(p, out = []) {
  if (!existsSync(p)) return out;
  if (statSync(p).isDirectory()) {
    for (const f of readdirSync(p)) walk(join(p, f), out);
  } else if (EXT.has(extname(p))) {
    out.push(p);
  }
  return out;
}

let problems = 0;
for (const file of ROOTS.flatMap((r) => walk(r))) {
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    if (line.includes(LONG_DASH)) {
      console.error(`${file}:${i + 1}: long dash found`);
      problems++;
    }
    for (const w of privateWords) {
      if (new RegExp(`(?<![\\p{L}\\p{N}_])${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\p{L}\\p{N}_])`, 'iu').test(line)) {
        console.error(`${file}:${i + 1}: private word "${w}"`);
        problems++;
      }
    }
  });
}

if (problems) {
  console.error(`\n${problems} problem(s). Fix them before publishing.`);
  process.exit(1);
}
console.log(`check-text: OK (${privateWords.length} private words checked)`);
