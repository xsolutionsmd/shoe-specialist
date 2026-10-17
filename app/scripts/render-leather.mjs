// Developer tool, not part of the build: renders the original leather-grain tiles in public/textures/
// from SVG turbulence + lighting filters (no photography or third-party imagery).
// Usage (needs Playwright and a local Chrome, installed outside this app):
//   node render-leather.mjs out.png '#6e262b' 512   -> leather-ox    (then WebP q90)
//   node render-leather.mjs out.png '#4a1a1c' 512   -> leather-deep  (then WebP q90)
import { chromium } from 'playwright';
const [,, out, base, size='640'] = process.argv;
const S = +size;
const html = `<!doctype html><html><body style="margin:0;background:${base}">
<svg width="${S}" height="${S}" xmlns="http://www.w3.org/2000/svg">
<filter id="f" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
 <feTurbulence type="fractalNoise" baseFrequency="0.046" numOctaves="3" seed="7" stitchTiles="stitch" result="n"/>
 <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.4 0 0 0 -0.35" result="a"/>
 <feDiffuseLighting in="a" surfaceScale="1.8" diffuseConstant="1.05" lighting-color="#fff" result="l"><feDistantLight azimuth="235" elevation="52"/></feDiffuseLighting>
 <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" stitchTiles="stitch" result="fine"/>
 <feColorMatrix in="fine" type="saturate" values="0" result="fg"/>
 <feBlend in="l" in2="fg" mode="multiply" result="lit"/>
 <feComponentTransfer in="lit" result="t"><feFuncR type="linear" slope="0.55" intercept="0.22"/><feFuncG type="linear" slope="0.55" intercept="0.22"/><feFuncB type="linear" slope="0.55" intercept="0.22"/></feComponentTransfer>
 <feFlood flood-color="${base}" result="c"/>
 <feBlend in="c" in2="t" mode="multiply"/>
</filter>
<rect width="${S}" height="${S}" filter="url(#f)"/></svg></body></html>`;
const b = await chromium.launch({channel:'chrome'});
const p = await b.newPage({viewport:{width:S,height:S}, deviceScaleFactor:1});
await p.setContent(html); await p.waitForTimeout(300);
await p.screenshot({path:out, clip:{x:0,y:0,width:S,height:S}});
await b.close();
