# Design brief


## Visitor job and primary action
Help local visitors decide whether their shoes or leather goods can be repaired and call or visit the shop. Primary action: call 410-544-2129. Secondary: directions to 568 Benfield Road. [S3][S5]

## Content plan
A concise landing page: clear repair proposition and phone CTA; service categories; Coleman and the shop history (since 1978); shoe-care supplies; visit/contact with published hours. Answer what can be repaired, who does it, and how to reach the shop. [S2][S3][S4][S5]

## Template site

**Provisional — 2026-10-16 correction:** this early selection is retained as research only. Claude was stopped so research, the complete media library, verified Slack delivery and placeholder infrastructure finish first. Relaunched Claude must re-check this choice against the completed media before accepting or replacing it.
Chosen 2026-10-16 by the frontend owner (Claude Opus 5.5): **Rago Brothers Shoe & Leather Repair — https://www.ragobrothers.com/** (inspected live at 1440 px and 390 px).

Why it won: the closest visitor job and content shape. It is a family-run, single-shop cobbler with a long founding history, covering both shoes and handbags/leather goods, and it keeps the phone number, email and "stop in" invitation visible beside the navigation. Shoe Specialist has the same shape: one owner-led shop since 1978, shoes plus luggage/handbags, and a call-first primary action.

Runners-up (all inspected desktop and mobile):
- Leather Spa — https://leatherspa.com/ : strong craft photography and confident brand, but a multi-location chain built around an online repair wizard, carousel and e-commerce we must not imitate.
- The Cobblers — https://thecobblers.com/ : the most restrained, gallery-like typography and whitespace, but a national restoration marketplace whose primary action is an online request.
- Jim's Shoe Repair / Cobbler Concierge — https://www.jimsshoerepair.com/ , https://www.cobblerconcierge.com/ : heritage NYC shop (est. 1932), but the hero is dominated by a quote form and heavy all-caps type.
- The Shoe Healer — https://www.theshoehealer.com/ : right scale and call-first, but a dense centered paragraph hero with lower polish.

Inspo `recommend` (hosted helper) returned software and institutional layouts (marquee-hero exemplars such as Standardvision and Mage AI), not local-business layouts, so it was used only as a weak signal for warm leather-tone anchors; the targeted live same-industry search above is the recorded fallback.

Traits adopted (structure and quality only; no Rago branding, copy, logos, photos, code or proof):
- Page structure: one concise landing page. Header carries the wordmark, short section navigation and the phone number as a persistent call action; directions sit beside it on wide screens.
- Section order: heritage-led hero (what they repair, since when, call/directions) → repair categories (shoes and boots, heels and soles, sandals, luggage and handbags, orthopedic work, keys) → the owner and shop story → shoe-care supplies → visit (address, hours, call/email/directions).
- Navigation: compact top bar; on phones a call button stays reachable and the menu collapses to a native-feeling disclosure.
- Type scale: classic high-contrast serif display (Rago's engraved-caps feel, modernised in mixed case) over a clean humanist sans for body and labels; generous display sizes on desktop, deliberate reflow on phones.
- Spacing rhythm: alternating full-bleed bands with wide left/right compositions per service family, separated by hairline rules and whitespace rather than cards or numbers.
- Motion character: calm and tactile — short fade/rise entrances that replay on return, hover lift on actions, no carousel, no autoplay; reduced-motion respected.

Media it calls for (to be owner-approved or owner-supplied before production): a wide still-life of a repaired pair of shoes or boots on the bench; close crops of new soles/heels and stitching; a handbag or luggage repair detail; the storefront in Benfield Shopping Center; a portrait of Coleman Eldridge at work. Until cleared media exists, the site uses an art-directed typographic composition with original CSS/SVG craft details (stitch lines, leather tones), never stock, generated or competitor imagery presented as the shop's work.

## Visual direction
Frontend owner selects a premium same-industry reference and a coherent Stitch direction. Use authentic cleared media or a polished typographic composition; no competitor imagery. All environments initially noindex.

## Accepted decisions and corrections
2026-10-16: Apply standing X Solutions preferences; no client-specific design corrections were found. Template selection is delegated to Claude Opus 5.5 high.

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
