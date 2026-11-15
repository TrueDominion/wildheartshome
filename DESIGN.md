# Design brief

Wild Hearts Home Bakery. A home baker in Worcester, Massachusetts. Weekend drops, front yard pickup, orders through Hotplate.

The site has one job: get a phone visitor from Instagram to a confident Hotplate order in under a minute, knowing what it costs, when and where to pick up, and whether it is safe for their family to eat.

## What both directions share

- Type carries the brand until real photography exists. Empty photo slots look deliberate, never broken.
- The weekly drop is the product. Next drop, order deadline and pickup window sit in the first screen.
- One persistent Order action, sticky on mobile, never covering content.
- No icons as decoration, no gradients, no glass, no cartoon wheat.
- Her words, lightly cleaned (em dashes removed), never rewritten into marketing copy.

---

## Direction A: The Order Slip

**Concept.** The site reads like the paper that changes hands at a home bakery: an order slip, a menu card, a note from the baker. Editorial serif for her voice, a typewriter-plain mono for facts that matter (dates, prices, allergens). Facts look like facts, feelings look like handwriting on a page.

**Mood words.** Quiet, honest, warm paper, ink, morning light, kept promises.

**Palette.** Flour paper, oat, ink, crust, cinnamon, rosemary. All taken from the bake.

**Type pairing.** Newsreader (display and text, optical sizes) with IBM Plex Mono for data and labels. Both SIL Open Font License.

**Layout idea.** Asymmetric editorial grid. Headlines hang left with an indented second line. Photos bleed off one edge on desktop and sit at staggered heights. The menu is set like a printed card: item name, one line, size, dotted leader, price. Photos accompany the menu instead of turning it into a card grid.

**Signature moment.** The drop slip. In the hero, a small paper slip with a perforated top edge, set in mono:

```
NEXT DROP        SAT NOV 21
ORDERS CLOSE     THU NOV 19, 8 PM
PICKUP           9 TO 11 AM, [AREA]
                 closes in 4 days
```

It is generated from `content/drops.ts`, recomputed in the browser against the real clock, and disappears when no drop is scheduled. It is the only skeuomorphic element on the site. (Dates shown are an illustration of format, not real dates.)

**Photography direction.** Natural window light from one side, late morning. Matte surfaces: unbleached linen, a worn wood board, parchment. True color, no filters. Close crops on crumb and crust texture. One hands-in-frame shot per category. Empty space left on one side of hero shots for type.

---

## Direction B: The Stall Sign

**Concept.** The front yard stall as a brand. A painted board sign, bold condensed lettering, a weekly menu chalked up and wiped clean. Louder, more poster, more Instagram native.

**Mood words.** Bright Saturday, neighborly, bold, handmade signage, sold out by noon.

**Palette.** Oat background, rye brown, brick cinnamon red, a butter yellow accent used once per screen.

| Token | Hex | Contrast |
|---|---|---|
| oat (bg) | `#EFE5D2` | |
| rye (text) | `#33241A` | 11.94 on oat |
| brick (accent, buttons) | `#9E3B1B` | 5.43 on oat, oat on brick 5.43 |
| butter (highlight on rye) | `#E8C15A` | 8.67 on rye |

**Type pairing.** Big Shoulders Display (condensed signage caps) with Source Serif 4 for reading text. Both SIL Open Font License.

**Layout idea.** Full width bands. Section titles in huge condensed caps. The menu is a stall board: one dark rye panel with item names in condensed caps and prices in butter yellow. Photos as large full bleed bands between sections.

**Signature moment.** The board. The weekly drop menu as a full width sign. Sold out items get a stamped "SOLD OUT" diagonal over the line, driven by data.

**Photography direction.** Bright outdoor daylight or direct flash at the stall. Documentary: hands passing bags, the table loaded at 9 am, neighbors in line (only with permission). Top down boards of the full week's bake.

---

## Recommendation: Direction A, The Order Slip

1. **It works on day one without photos.** A is type led; its photo slots are supporting players. B depends on big, confident, full bleed photography, and the brief is explicit that we must not ship a layout that only works with perfect photos.
2. **It fits her voice.** Her copy is quiet, personal and family first. B's condensed caps shout over it.
3. **Facts in mono builds trust.** Prices, dates, sizes and allergens in a consistent data face signal that this information is real and maintained. That is the honest urgency the brief asks for.
4. **It ages and maintains better.** B's look depends on getting the sign style exactly right every week (stamps, highlight placement). A degrades gracefully when a non-developer edits a content file.
5. **It avoids a template trap.** Condensed caps on cream with a red accent is now a common craft brewery and coffee subscription template. B would have to work hard not to look like one.

**Risk with A.** Serif plus mono on cream can drift toward a generic "editorial" Squarespace look. Guards: the drop slip as the single strong idea, a real asymmetric grid, her own photography, and no decorative flourishes beyond a subtle paper grain.

**What B does better.** More energy on Instagram and more visible "event" feel. If she later wants more of that, A can borrow one element: a single condensed caps label for "SOLD OUT", not the whole system.

---

## Full token set (Direction A)

### Color

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `--flour` | `#F5EFE4` | Page background | |
| `--oat` | `#EBE1CF` | Sunken surfaces, photo placeholders, slip | |
| `--ink` | `#22190F` | Primary text | 15.12 on flour, 13.35 on oat (AAA) |
| `--ink-2` | `#5E4C3C` | Secondary text, captions | 7.13 on flour, 6.29 on oat (AAA) |
| `--crust` | `#7A3E1B` | Primary buttons, links, "coming soon" | 7.25 on flour, 6.40 on oat; flour text on crust 7.25 (AAA) |
| `--cinnamon` | `#A4572A` | Large display accents and non-text marks only | 4.62 on flour (AA). 4.08 on oat: large text only (18.66 px bold or 24 px and up) |
| `--rosemary` | `#4D5B3A` | "Available" status | 6.39 on flour, 5.64 on oat |
| `--rye` | `#2A1E16` | Dark band (story section, footer) | flour on rye 14.16 |
| `--line` | `#CDBFA8` | Hairlines, dashed photo slot borders | 1.58 on flour. Decorative only, never the sole carrier of meaning |
| `--focus` | `--ink` on light, `--flour` on rye | Focus ring | 15.12 and 14.16 |

Rule: color never carries meaning alone. Every status has a text label.

### Typography

Families: `Newsreader` (variable, optical size axis) and `IBM Plex Mono` (400, 500). Loaded through `next/font/google`, self hosted, `display: swap`, subset latin.

| Token | Size (390 px to 1280 px) | Line height | Family and settings |
|---|---|---|---|
| `display` | `clamp(2.75rem, 1.6rem + 5.6vw, 6rem)` | 0.95 | Newsreader 400, opsz 72, tracking -0.02em |
| `h2` | `clamp(2rem, 1.4rem + 3vw, 3.5rem)` | 1.02 | Newsreader 400, opsz 60, tracking -0.015em |
| `h3` | `clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem)` | 1.15 | Newsreader 500, opsz 24 |
| `lede` | `1.1875rem` (19 px) | 1.5 | Newsreader 400 italic allowed for her signature line only |
| `body` | `1.0625rem` (17 px) | 1.55 | Newsreader 400, opsz 16 |
| `small` | `0.9375rem` (15 px) | 1.45 | Newsreader 400 |
| `data` | `0.9375rem` (15 px) | 1.4 | Plex Mono 400, tabular figures. Prices, dates, sizes |
| `label` | `0.8125rem` (13 px) | 1.3 | Plex Mono 500, uppercase, tracking 0.08em. Tags, eyebrows, buttons |

Measure: body text max 62ch. Minimum text size anywhere: 13 px.

### Spacing

4 px base. Tokens: `1`=4, `2`=8, `3`=12, `4`=16, `6`=24, `8`=32, `12`=48, `16`=64, `24`=96, `32`=128.

- Page gutter: 20 px mobile, 40 px at 1024 px and up.
- Section padding: 64 px mobile, 128 px desktop.
- Grid: 4 columns mobile, 8 at 768, 12 at 1024. Max content width 1280 px.

### Radius

- `0` for photos, sections, the slip.
- `2px` for buttons and tags.
- `999px` only for status dots.

### Shadow

None on surfaces. Paper sits flat. One exception:

- `--shadow-bar: 0 -1px 0 var(--line), 0 -8px 24px rgb(34 25 15 / 0.08)` for the mobile sticky order bar.

### Texture

A single inline SVG noise layer on the page background at 4 percent opacity. Never on photos, never on text blocks inside rye bands. Removed in forced colors mode.

### Motion

| Token | Value | Use |
|---|---|---|
| `--dur-1` | 120 ms | Button press, link underline |
| `--dur-2` | 200 ms | Hover, FAQ open, sticky bar enter |
| `--dur-3` | 420 ms | Photo reveal on first view, once |
| `--ease-out` | `cubic-bezier(0.2, 0.7, 0.2, 1)` | Default |
| `--ease-in-out` | `cubic-bezier(0.6, 0, 0.2, 1)` | Sticky bar |

Rules: photos fade and rise 8 px once on first view. Nothing loops, bounces, parallaxes or ticks. Under `prefers-reduced-motion: reduce` every duration is 0.

### Component rules

- **Button, primary.** Crust fill, flour text, `label` style, 2 px radius, min height 48 px, horizontal padding 20 px. Hover: ink fill. Active: translate 1 px. Focus: 2 px focus ring, 3 px offset. Text always says where it goes: "Order on Hotplate".
- **Link.** Ink text, 1 px underline at 4 px offset, thickens to 2 px on hover. External links carry a visually hidden "(opens Hotplate)" note.
- **Drop slip.** Oat surface, perforated top edge via CSS mask, `data` text in a two column definition list (`dl`). States: open, closing soon (under 48 hours, wording only, no color alarm), closed, none. Rendered on the server, then reconciled in the browser against the current time.
- **Menu item.** Name (h3), one line description (body), then one row of `data`: size, dotted leader, price. Tags row below. Optional 4:5 photo. Status label shown only when not plain "available".
- **Allergen tag.** `label` style, 1 px `--ink-2` border, 2 px radius, ink text. Plain words ("Wheat", "Milk", "Eggs", "Sesame"), never icons.
- **Status.** 8 px dot plus text. Available: rosemary. Sold out: ink-2 with "Sold out". Coming soon: crust. Seasonal: cinnamon dot, ink text.
- **Photo slot.** Fixed aspect ratio box. Hero 4:5, menu item 4:5, drop items 1:1, story portrait 3:4, stall 3:2. Real image via `next/image` with blur placeholder. Missing image: oat fill, 1 px dashed `--line` border, a `label` reading "PHOTO TODO" plus the shot number from `SHOT_LIST.md`.
- **FAQ.** Native `details` and `summary`. Hairline rule between rows. Plus rotates to minus over `--dur-2`. Works with no JavaScript.
- **Sticky order bar (mobile only).** Appears once the hero Order button leaves the viewport. Full width, flour surface, `--shadow-bar`, respects the safe area inset. Contains the drop close line in `data` and the primary button. The page reserves matching bottom padding so the footer is never covered.
- **Header.** Wordmark set in Newsreader display, anchor links on desktop, a single Order button always visible. No hamburger menu on mobile: the anchor links scroll horizontally as one quiet row under the wordmark.

### Accessibility commitments

WCAG 2.1 AA minimum, AAA contrast for body text. Visible focus everywhere. Full keyboard path. Skip link. Real alt text written per photo in content files. Reduced motion honored. Status communicated by text, not color.

---

## Decisions and assumptions stated up front

- "Drop" is the word customers already know from Hotplate. Used everywhere.
- The hero drop line hides itself when no drop is scheduled. The drop section stays and says so honestly, with a link to Hotplate alerts.
- Dates and deadlines are recomputed in the browser so a static site never shows a stale "orders open".
- Her name: the current site's public email uses "Lauren". I will sign her story as "Lauren" unless told otherwise.
- The Hotplate handle on the live site is `tnbhofficial`, which does not match the bakery name. I will keep it in one config value and flag it.
- Timing risk: Thanksgiving is November 26, 2026. If she runs a holiday drop, real dates and an order by date are needed within days.
