# Design brief


## Visitor job and primary action
Help local visitors decide whether their shoes or leather goods can be repaired and call or visit the shop. Primary action: call 410-544-2129. Secondary: directions to 568 Benfield Road. [S3][S5]

## Content plan
A concise landing page: clear repair proposition and phone CTA; service categories; Coleman and the shop history (since 1978); shoe-care supplies; visit/contact with published hours. Answer what can be repaired, who does it, and how to reach the shop. [S2][S3][S4][S5]

## Template site

**Chosen 2026-10-16 (round 2) by the frontend owner, Claude Opus 5.5: George Cleverley, https://www.gjcleverley.co.uk/** (bespoke shoemakers of Mayfair, since 1958). Supporting detail reference: **Henry Poole & Co, https://henrypoole.com/** (Savile Row, est. 1806). Both inspected live at 1440 px and 390 px on 2026-10-16.

Why it won (polish first, fit second): Cleverley is the most expensive-looking site in the closest premium category. It is one heritage house in shoes, with a confident serif "since" headline under a small-caps eyebrow, one short paragraph, one understated action, deep oxblood colour fields and generous whitespace on desktop and phone. Its oxblood split panel ("Craft at the Highest Level") is a typographic composition that still works without photography. That matters because none of Shoe Specialist's collected media is cleared, or large enough for a premium hero (see the media decision below). Fit is good too: a single shop with a founding year, a visit-the-shop action, shoes and leather goods. Henry Poole contributes two details suited to a call-first local shop: a slim top bar that leads with the phone number, and a lockup that ties the name to its place.

Candidates reviewed in this round (all live, desktop and mobile; screenshots in ignored `.design-evidence/r2/references/`):
- Anderson & Sheppard, https://www.anderson-sheppard.co.uk/ : the most luxurious first impression, but the home page is a two-door splash into bespoke and an online shop; it gives no structure for a one-page local business.
- Henry Poole & Co, https://henrypoole.com/ : refined lockup and editorial alternating rows. It loses to Cleverley on polish (mailing-list popup, carousel controls, dense centred copy on phones). Kept as the supporting reference.
- Huntsman, https://www.huntsmansavilerow.com/ : strong typography, but an e-commerce grid, popups and video; wrong visitor job.
- Gaziano & Girling, https://www.gazianogirling.com/ : beautiful shoe photography, but the whole design depends on product imagery we do not have.
- Frank Clegg Leatherworks, https://www.frankclegg.com/ : a relevant leather atelier with a heritage date, but the promo bar and shop-first layout read as retail rather than atelier.
- Stefano Bemer and Tricker's: product-catalogue structures. Edward Green blocked the automated visit with a bot check.
- Shoe-repair candidates from round 1 (Rago Brothers, The Cobblers, Leather Spa, Jim's, The Shoe Healer): Rago Brothers and The Cobblers were re-checked live. Rago's boxed hero overlay, mail-in banner, crowded header and script signature read as a typical small-business template. The Cobblers is clean but generic and marketplace-driven. Neither meets the quality bar.

Inspo `recommend` was retried with a luxury-atelier brief (evidence `.design-evidence/inspo-r3/`). It returned Rapha, Parachute and Albacross (e-commerce and SaaS), so it was treated as a weak signal; the targeted live search above is the recorded fallback.

Traits adopted (structure and quality only; no Cleverley or Henry Poole branding, copy, logos, photos, code or proof):
- Page structure and order: thin call-first utility bar; centred wordmark header with split navigation; full-bleed hero with eyebrow, a "since" serif headline, one short paragraph and one primary action; repairs; an oxblood and cream split panel for the shop story; supplies; a dark visit band; compact footer.
- Navigation: on desktop, nav split either side of a centred tracked-caps wordmark, with a small outlined Call button. On phones, menu at left, wordmark centred and a call button at right (Cleverley's mobile pattern); the menu is a disclosure panel.
- Typography: high-contrast Garamond display (Cormorant Garamond) in mixed case with an italic accent, tracked uppercase sans eyebrows and labels (Instrument Sans), old-style figures for the year.
- Spacing rhythm: large section padding (about 160 px desktop, 80 px phone), hairline rules instead of cards, centred compositions alternating with left-aligned editorial columns.
- Motion: calm. Hero lines fade and rise in sequence once; sections fade up on entry and replay when you return; hover changes are underline and colour only. Nothing loops, so no pause control is needed. Reduced motion shows everything immediately.

Media decision: the production-ready design ships **no collected photography**. All 43 files are `public-unverified`. The authentic shop images are small or soft (storefront 1334x751 with parked cars and neighbouring tenants, counter portrait 980x395, repair machine and supplies 300x260), and the large files are iStock or directory images that are not the shop's work. Imagery is instead an original treatment made by X Solutions and safe for production: oxblood leather grain rendered from SVG turbulence and lighting filters (`app/scripts/render-leather.mjs`, tiles in `app/public/textures/`), cream saddle-stitch borders and a pressed crease. Shortlist roles: storefront (gallery) is not used, and the address and directions carry the visit role; the counter portrait (about) is not used, and the "Established 1978" plate stands in; the repair-machine (service:repair) and supplies (service:supplies) images are not used, and the text lists stand in. When owner-approved photos arrive, the left half of the shop panel is the planned place for a portrait or storefront photo; the hero can stay typographic.

### Earlier provisional selection (superseded 2026-10-16, kept for history)

Round 1 picked Rago Brothers on niche fit, before research, the full media library and infrastructure were finished. Round 2 reassessed it on quality first, as required, and replaced it for the reasons above. The original record follows.

> Provisional note (2026-10-16): this early selection is retained as research only. Claude was stopped so research, the complete media library, verified Slack delivery and placeholder infrastructure finish first. Relaunched Claude must re-check this choice against the completed media before accepting or replacing it.
> Chosen 2026-10-16 by the frontend owner (Claude Opus 5.5): **Rago Brothers Shoe & Leather Repair — https://www.ragobrothers.com/** (inspected live at 1440 px and 390 px).
>
> Why it won: the closest visitor job and content shape. It is a family-run, single-shop cobbler with a long founding history, covering both shoes and handbags/leather goods, and it keeps the phone number, email and "stop in" invitation visible beside the navigation. Shoe Specialist has the same shape: one owner-led shop since 1978, shoes plus luggage/handbags, and a call-first primary action.
>
> Runners-up (all inspected desktop and mobile):
> - Leather Spa — https://leatherspa.com/ : strong craft photography and confident brand, but a multi-location chain built around an online repair wizard, carousel and e-commerce we must not imitate.
> - The Cobblers — https://thecobblers.com/ : the most restrained, gallery-like typography and whitespace, but a national restoration marketplace whose primary action is an online request.
> - Jim's Shoe Repair / Cobbler Concierge — https://www.jimsshoerepair.com/ , https://www.cobblerconcierge.com/ : heritage NYC shop (est. 1932), but the hero is dominated by a quote form and heavy all-caps type.
> - The Shoe Healer — https://www.theshoehealer.com/ : right scale and call-first, but a dense centered paragraph hero with lower polish.
>
> Inspo `recommend` (hosted helper) returned software and institutional layouts (marquee-hero exemplars such as Standardvision and Mage AI), not local-business layouts, so it was used only as a weak signal for warm leather-tone anchors; the targeted live same-industry search above is the recorded fallback.
>
> Traits adopted (structure and quality only; no Rago branding, copy, logos, photos, code or proof):
> - Page structure: one concise landing page. Header carries the wordmark, short section navigation and the phone number as a persistent call action; directions sit beside it on wide screens.
> - Section order: heritage-led hero (what they repair, since when, call/directions) → repair categories (shoes and boots, heels and soles, sandals, luggage and handbags, orthopedic work, keys) → the owner and shop story → shoe-care supplies → visit (address, hours, call/email/directions).
> - Navigation: compact top bar; on phones a call button stays reachable and the menu collapses to a native-feeling disclosure.
> - Type scale: classic high-contrast serif display (Rago's engraved-caps feel, modernised in mixed case) over a clean humanist sans for body and labels; generous display sizes on desktop, deliberate reflow on phones.
> - Spacing rhythm: alternating full-bleed bands with wide left/right compositions per service family, separated by hairline rules and whitespace rather than cards or numbers.
> - Motion character: calm and tactile — short fade/rise entrances that replay on return, hover lift on actions, no carousel, no autoplay; reduced-motion respected.
>
> Media it calls for (to be owner-approved or owner-supplied before production): a wide still-life of a repaired pair of shoes or boots on the bench; close crops of new soles/heels and stitching; a handbag or luggage repair detail; the storefront in Benfield Shopping Center; a portrait of Coleman Eldridge at work. Until cleared media exists, the site uses an art-directed typographic composition with original CSS/SVG craft details (stitch lines, leather tones), never stock, generated or competitor imagery presented as the shop's work.

## Visual direction

Accepted by the frontend owner, round 2, 2026-10-16.

- Palette: oxblood `#4a1a1d` plus leather tiles, deep oxblood `#2b0f11`, near-black utility bar and footer `#1d0a0b`, cream paper `#f6efe4` and `#eee3d2`, ink `#1d1512`, muted ink `#57463d`, brass `#c9a574` on dark, brass ink `#7a5432` on paper. Measured text contrast is at least 5.2:1 everywhere.
- Type: Cormorant Garamond Variable (display, roman and italic) and Instrument Sans Variable (body, labels), self-hosted through Fontsource; no third-party requests.
- Components: square-cornered cream button on leather; uppercase text links whose underline shortens on hover; ruled repair "ledger" rows; a hairline grid for supplies; an "Established 1978" plate; a three-column visit band (two columns plus a full-width contact row on tablet).
- Actions: primary `tel:+14105442129` (utility bar, header, hero, visit). Directions open Google Maps for 568 Benfield Road in a new tab. Email is a supporting `mailto:` link. No form, booking, payment, reviews or prices.
- Stitch: one desktop generation was requested in project `8809784878582546937` with this direction. The call timed out and no screen appeared after repeated `list_screens` checks over about 25 minutes. Following the skill's bounded fallback, implementation went straight from the inspected references and this written direction; no retry was made, to avoid duplicate credit use.
- Implementation: `app/` (Vite 7, static output in `app/dist`). Evidence screenshots: `.design-evidence/r2/site/` (ignored).

## Accepted decisions and corrections
2026-10-16: Apply standing X Solutions preferences; no client-specific design corrections were found. Template selection is delegated to Claude Opus 5.5 high.

2026-10-16 (round 2, frontend owner): George Cleverley replaces the provisional Rago Brothers template. Production ships no public-unverified media and uses an original leather and stitch typographic treatment instead; owner-approved photography can later fill the shop panel.

2026-10-16 (review round 1 triage, frontend owner): the header lays out by its own width in rem (CSS container query), so enlarged text reflows it like a narrower screen. The split desktop header needs at least 60rem. Below 30rem the menu and call controls are icon-only (their accessible names stay). Below 20rem, for example a phone with 200% text, the wordmark takes its own row above the controls and the place line is dropped. Browsers without container queries keep the compact menu header. The open menu is bounded to the viewport and scrolls internally. With reduced motion, the menu opens and closes at once, and the skip link, arrow nudge and nav underline do not move. JSON-LD no longer names a founder. The verified owner stays in the visible copy, and the 1978 founding year stays as `foundingDate`. No share image for now: no rights-cleared artwork exists.

## X Solutions standing design rules

- Thoughtful, distinctive, professional and clean: strong typography, authentic
  photography, smooth restrained motion, enjoyable interaction; necessary copy only.
- No decorative numbering: no section ordinals, numbered badges, photo prefixes or
  counters such as 01 / 02. Factual numbers (prices, phone, dates) are fine.
- Choose photos for composition, quality, real work shown, variety and recency across
  the whole history, not just the newest posts. Never present generated or competitor
  work as the client's.
- Check every form control against its containing card (including padding) on narrow
  phones, with enlarged text and focus states; page-level overflow checks are not enough.
- Native inputs, keyboard access, visible focus, reduced-motion support and a pause
  control for ongoing decorative movement.
- Consistent SVG arrows/icons (no text glyphs or emoji arrows). No visitor-facing demo,
  preview or "functionality" banners and no repeated disclaimers.
- Optimise without degrading the experience: right-sized media, lazy loading, no
  needless browser work.
