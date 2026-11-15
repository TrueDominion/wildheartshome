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


## Decision: Direction B, The Stall Sign

Chosen at the checkpoint. My original recommendation was A. The risks I raised for B are real, so the system below is built to contain them.

| Risk | Mitigation |
|---|---|
| Photo dependence | Every photo slot has a fixed ratio and a designed empty state (oat panel, condensed caption, shot number). Bands that would be full bleed photos collapse to a narrow captioned strip until a real photo exists. |
| Condensed caps hurt reading | Big Shoulders is used only for headings, the wordmark, the board, buttons and short labels. Anything longer than about six words is Source Serif 4. |
| Craft brewery template look | No badges, no circles, no stars, no faux distress textures. The stamp appears only for real state (sold out, sample). Butter yellow appears at most once per screen. |
| Loudness drowns her voice | Her story sits in a calm serif column with generous space, the one place on the page where nothing is uppercase. |

**Signature moment.** The board. This week's drop as a dark rye sign: drop date and order deadline in the header, every item in condensed caps with a butter price, a stamped SOLD OUT on items marked sold out, and a stamped SAMPLE when the drop data is placeholder. Driven entirely by `content/drops.ts`.

---

## Token set (Direction B)

### Color

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `--oat` | `#EFE5D2` | Page background | |
| `--oat-2` | `#E4D6BE` | Sunken surfaces, photo placeholders | |
| `--rye` | `#33241A` | Text, rules, board background | 11.94 on oat, 10.41 on oat-2 (AAA) |
| `--rye-2` | `#5A4636` | Secondary text, captions | 7.11 on oat, 6.20 on oat-2 (AAA) |
| `--brick` | `#9E3B1B` | Buttons, numerals, display accent | 5.43 on oat, oat on brick 5.43 (AA). Never on rye (2.2) |
| `--butter` | `#E8C15A` | Prices on the board, sticky bar, one highlight per screen | 8.67 on rye; rye on butter 8.67 |
| `--stamp` | `#F08A63` | Stamp text and border on the board | 6.05 on rye |
| `--oat-muted` | `#CDBFA8` | Secondary text on rye | 8.25 on rye |
| `--sage` | `#4F5E38` | "Available" status label | 5.62 on oat |
| `--line` | `#C4B396` | Hairlines, dashed photo slot borders | Decorative only |

Rule: color never carries meaning alone. Every status has a text label.

### Typography

Families: `Big Shoulders` (variable, optical size axis, 700 and 800; Google now ships the former Big Shoulders Display under this name) and `Source Serif 4` (variable, optical size, 400 and 600, italic 400). Self hosted through `next/font/google`. Both SIL Open Font License 1.1.

| Token | Size (390 px to 1280 px) | Line height | Family and settings |
|---|---|---|---|
| `display` | `clamp(4.5rem, 2.6rem + 8vw, 10rem)` | 0.84 | Big Shoulders 800, uppercase |
| `h2` | `clamp(3rem, 2rem + 4.4vw, 6rem)` | 0.88 | Big Shoulders 800, uppercase |
| `board-item` | `clamp(1.75rem, 1.4rem + 1.6vw, 2.75rem)` | 1 | Big Shoulders 800, uppercase |
| `h3` | `clamp(1.5rem, 1.3rem + 0.8vw, 1.875rem)` | 1 | Big Shoulders 800, uppercase, tracking 0.01em |
| `label` | `1rem` (16 px) | 1.1 | Big Shoulders 700, uppercase, tracking 0.05em. Buttons, eyebrows, tags |
| `lede` | `clamp(1.1875rem, 1.1rem + 0.4vw, 1.375rem)` | 1.45 | Source Serif 4, 400 |
| `body` | `1.0625rem` (17 px) | 1.55 | Source Serif 4, 400 |
| `small` | `0.9375rem` (15 px) | 1.45 | Source Serif 4, 400 |
| `quote` | `clamp(1.75rem, 1.3rem + 2vw, 2.75rem)` | 1.15 | Source Serif 4 italic, her signature line only |

Prices use tabular figures. Measure: body max 60ch. Minimum text size anywhere: 15 px for serif, 16 px for condensed labels (condensed faces read small).

### Spacing

4 px base: `1`=4, `2`=8, `3`=12, `4`=16, `6`=24, `8`=32, `12`=48, `16`=64, `24`=96, `32`=128.

- Page gutter: 20 px mobile, 40 px from 1024 px.
- Section padding: 64 px mobile, 112 px desktop.
- Grid: 4 columns mobile, 8 from 768 px, 12 from 1024 px. Max content width 1280 px.

### Rules, radius, shadow

- Rules do the structural work instead of cards: 3 px rye rule above each section title and each step, 1 px rules between list rows.
- Radius `0` everywhere. Signs and paper are square. Status dots are the only round element.
- No shadows. The sticky bar separates with a 3 px rye top rule.

### Motion

| Token | Value | Use |
|---|---|---|
| `--dur-1` | 120 ms | Button press |
| `--dur-2` | 200 ms | Hover, FAQ open, sticky bar slide |
| `--ease-out` | `cubic-bezier(0.2, 0.7, 0.2, 1)` | Default |

Stamps sit at a fixed small rotation, they do not animate. Nothing loops, bounces or parallaxes. Under `prefers-reduced-motion: reduce` every duration is 0.

### Component rules

- **Button, primary.** Brick fill, oat text, `label` style, square, min height 48 px. Hover: rye fill. Active: 1 px down. Focus: 3 px rye outline at 3 px offset (oat outline on rye surfaces). Text names the destination: "Order on Hotplate".
- **Header.** Two line condensed wordmark left, Order button right, 3 px rye rule below. Below 768 px the anchor links sit in one horizontally scrollable row. No hamburger.
- **Hero.** Display headline left aligned, lede, button, and the drop status line ("Next drop Sat Nov 21. Orders close Thu, 8 PM.") as a butter highlighted strip. Hidden when no drop is scheduled. Not centered.
- **The board.** Rye panel. Header row: "This week" in butter plus date and deadline right aligned. Rows: item name, variant, price in butter, 1 px rules. Stamps for SOLD OUT and SAMPLE. Empty state: "No drop on the board right now" plus the Hotplate alerts link.
- **Menu item.** 4:5 photo slot, condensed name, serif description, a row with size and price, tags, status label when not plain available.
- **Tag.** `label` style at 15 px, 1.5 px rye border, square, rye text. Words only.
- **Status.** 8 px dot plus text label. Available: sage. Sold out: rye-2. Coming soon: brick. Seasonal: butter dot with rye text.
- **Photo slot.** Fixed ratio: hero 4:5 (mobile) and 3:2 (desktop), menu 4:5, stall band 21:9, portrait 3:4. Real image through `next/image` with blur placeholder. Empty: oat-2 fill, 1 px dashed line border, condensed caption "Photo to come" plus shot number.
- **Steps.** Three rows, 3 px rye rule above each, brick numeral, condensed title, serif body. No icons.
- **FAQ.** Native `details` and `summary`, 1 px rules, condensed plus that rotates. Works without JavaScript.
- **Sticky order bar (mobile).** Butter surface, 3 px rye top rule, deadline left, button right. Appears after the hero button leaves the viewport. The page reserves matching space at the bottom.
- **Footer.** Rye band, oat text. Hotplate link, email, Instagram slot, "Worcester, MA", compliance slot.

### Accessibility commitments

WCAG 2.1 AA minimum, AAA contrast for body text. Visible focus, skip link, full keyboard path, real alt text per photo in content files, reduced motion honored, status by text and not color alone.

---

## Decisions and assumptions

- "Drop" is the word customers already know from Hotplate. Used everywhere.
- Pickup location shows as "Worcester, MA" only. Exact address comes with the order confirmation.
- Story is signed "Lauren".
- Hotplate storefront confirmed as `hotplate.com/tnbhofficial`.
- Drop and Thanksgiving data are samples by request. Every sample record carries `isSample: true`, which prints a visible SAMPLE stamp on the live site so no customer mistakes it for a real date.
- Dates are recomputed in the browser so a static site never shows a stale "orders open".
- No Motion library. The design needs two CSS transitions. Motion would add JavaScript weight against the Lighthouse target with nothing to show for it.
- No shadcn components. The only candidate was the FAQ accordion, and native `details` is lighter and accessible without JavaScript.
