// Static contract checks for the built site. Run after `vite build` (npm run check).
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const failures = [];
const check = (ok, message) => {
  if (!ok) failures.push(message);
};

check(existsSync(join(dist, 'index.html')), 'dist/index.html is missing');
const html = existsSync(join(dist, 'index.html')) ? readFileSync(join(dist, 'index.html'), 'utf8') : '';
const text = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ');

// Real destinations
check(html.includes('href="tel:+14105442129"'), 'tel:+14105442129 call link missing');
check(html.includes('mailto:Colemaneldridge1@comcast.net'), 'business email link missing');
check(
  html.includes('google.com/maps/dir/?api=1&amp;destination=568%20Benfield%20Road%2C%20Severna%20Park%2C%20MD%2021146'),
  'directions link to 568 Benfield Road missing'
);

// Indexing stays off in every environment until the owner approves it.
check(/<meta name="robots" content="noindex, nofollow"/.test(html), 'noindex robots meta missing');

// No fake contact form, no third-party runtime requests.
check(!/<form[\s>]/i.test(html), 'a <form> exists without a delivery path');
const external = [...html.matchAll(/(?:src|href)="(https?:\/\/[^"]+)"/g)]
  .map((m) => m[1])
  .filter((url) => !url.startsWith('https://www.google.com/maps/dir/') && !url.startsWith('https://shoe-specialist.xsolutionsmd.com/'));
check(external.length === 0, 'unexpected external resources: ' + external.join(', '));

// Standing rule: no decorative numbering (01, 02 / 04 style ordinals or counters).
check(!/>\s*0\d\s*</.test(text) && !/\b0\d\s*\/\s*0\d\b/.test(text), 'decorative numbering pattern found');

// Facts that must not appear without owner confirmation.
for (const banned of [/\$\s?\d/, /\b\d\s*stars?\b/i, /testimonial/i, /\bpercent\b|\d+%/i, /years? of experience/i]) {
  check(!banned.test(text), 'unapproved claim pattern found: ' + banned);
}

// Every image needs alt text; every in-page link needs a target.
for (const img of html.matchAll(/<img\b[^>]*>/g)) check(/\balt="/.test(img[0]), 'img without alt: ' + img[0]);
for (const m of html.matchAll(/href="#([^"]+)"/g)) check(html.includes(`id="${m[1]}"`), 'broken anchor #' + m[1]);

// Basic metadata
check(/<html lang="en">/.test(html), 'missing lang');
check(/<title>[^<]{10,}<\/title>/.test(html), 'missing title');
check(/<meta\s+name="description"/.test(html), 'missing meta description');
check(existsSync(join(dist, 'favicon.svg')), 'favicon.svg missing');

// Media rights: no collected photography ships. Only the original leather textures and favicon are allowed.
const publicImages = [];
const walk = (dir, rel = '') => {
  for (const entry of readdirSync(join(dir, rel), { withFileTypes: true })) {
    const path = rel ? `${rel}/${entry.name}` : entry.name;
    if (entry.isDirectory()) walk(dir, path);
    else if (/\.(jpe?g|png|webp|avif|gif)$/i.test(entry.name)) publicImages.push(path);
  }
};
if (existsSync(dist)) walk(dist);
const allowedImages = ['textures/leather-ox.webp', 'textures/leather-deep.webp'];
check(
  publicImages.every((f) => allowedImages.includes(f)),
  'unexpected image files in dist (rights unverified?): ' + publicImages.filter((f) => !allowedImages.includes(f)).join(', ')
);
for (const f of allowedImages) check(existsSync(join(dist, f)), `${f} missing`);
check(!/<img\b/i.test(html), 'an <img> appeared; confirm media rights in kb/media.md before shipping photography');

// Structured data must parse and state only verified facts (owner and 1978 are verified; "founder" is not).
const jsonLd = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
let business = null;
try {
  business = jsonLd ? JSON.parse(jsonLd[1]) : null;
} catch {
  // reported below
}
check(business && business.telephone === '+1-410-544-2129', 'JSON-LD missing or invalid');
check(business && !('founder' in business), 'JSON-LD asserts an unverified founder');

const assets = existsSync(join(dist, 'assets')) ? readdirSync(join(dist, 'assets')) : [];
check(assets.some((f) => f.endsWith('.css')) && assets.some((f) => f.endsWith('.js')), 'built CSS/JS assets missing');

// Header reflow and reduced-motion overrides must survive the build.
const css = assets.filter((f) => f.endsWith('.css')).map((f) => readFileSync(join(dist, 'assets', f), 'utf8')).join('\n');
check(/@container site-header/.test(css), 'header container queries missing from built CSS');
check(/prefers-reduced-motion:\s*reduce/.test(css), 'reduced-motion overrides missing from built CSS');

if (failures.length) {
  console.error('Site checks failed:\n- ' + failures.join('\n- '));
  process.exit(1);
}
console.log(`Site checks passed (${assets.length} built assets).`);
