# Wild Hearts Home Bakery website

The website for Wild Hearts Home Bakery in Worcester, MA. It is a branded front door: every Order button goes to the Hotplate storefront, which handles the menu, payment and pickup slots.

All the words, dates, prices and photos live in four files in the `content` folder. You never need to touch anything else for normal updates.

| File | What it holds | How often |
|---|---|---|
| `content/drops.ts` | This week's drop and the holiday menu | Every week |
| `content/menu.ts` | Items, descriptions, prices, sizes, allergens, photos | When the menu changes |
| `content/faq.ts` | Questions and answers | Rarely |
| `content/site.ts` | Hotplate link, email, Instagram, story, compliance statement | Rarely |

## The weekly update (about five minutes, all in the browser)

1. Go to the repository on GitHub and open `content/drops.ts`.
2. Click the pencil icon (Edit this file).
3. In the first block inside `drops`, change:
   - `pickupDate` to the pickup day, written `"2026-11-28"` (year, month, day).
   - `pickupStart` and `pickupEnd` to the pickup window, 24 hour clock: `"09:00"` and `"11:00"`.
   - `closeDate` and `closeTime` to when Hotplate orders close: `"2026-11-26"` and `"20:00"` for 8 PM.
   - `isSample` to `false` once the dates are real.
   - The `lines` list to what is being baked. Each line is `{ item: "classic-loaf" }`, using the ids from `content/menu.ts`.
4. Optional per line: `status: "sold-out"` prints a SOLD OUT stamp; `quantity: 24` shows "24 baked"; `variants: ["4-pack"]` shows only that size.
5. Click **Commit changes**, keep the default option, and confirm.
6. Cloudflare rebuilds the site by itself. It is live in about two minutes.

All times are Worcester time, whatever time zone you are in. Keep the quote marks and commas exactly as they are. If a build fails, Cloudflare shows a red "Latest build failed" message; the build log names the file and the problem, and the live site keeps showing the last good version.

### What the site does with the dates by itself

- Before orders close: the hero shows "Next drop" with the close time, and the board shows the order button.
- After orders close: it switches to "Orders closed" and the pickup window.
- After pickup ends: the hero line disappears and the board says no drop is scheduled, with a link to follow on Hotplate.

This is worked out in each visitor's browser, so it stays correct even if nobody rebuilds the site.

## Holiday menu

In `content/drops.ts`, the `holiday` block works like a drop, plus a `title` (for example `"Thanksgiving"`) and `specials`, a list of extra items that are not on the regular menu:

```ts
specials: [{ name: "Item name", description: "One line in her words.", price: 18 }],
```

Set `holiday` to `null` when there is no holiday menu. Her standing holiday note shows instead. A holiday block also disappears by itself once its pickup has passed.

## Menu changes

In `content/menu.ts`, each item has:

- `price`: a number like `12` or `4.5`, or `null` to show "Price on Hotplate".
- `size`: text like `"About 900 g"`, or `null`.
- `allergens`: a list like `["Wheat", "Milk", "Eggs"]`, or `null` while not confirmed. `[]` means none.
- `status`: `"available"`, `"sold-out"`, `"coming-soon"` or `"seasonal"`.
- `photo`: see below.

Never change an item's `id` once a drop uses it. To add an item, copy an existing block, give it a new id, and edit the words.

## Photos

Follow `SHOT_LIST.md`. In short: export at 1600 px on the long side as WebP or JPG, name it like `02-classic-loaf.webp`, upload it to `public/photos/` on GitHub (Add file, Upload files), then set `src: "/photos/02-classic-loaf.webp"` on that item and describe the photo in `alt`.

## Analytics (optional)

The site can count Order button clicks by position (hero, board, sticky bar and so on) with Plausible, which uses no cookies.

1. Create a Plausible site for the domain.
2. In Cloudflare: Workers & Pages, wildheartshome, Settings, **Builds**, Variables and secrets. Add `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` with the domain as the value. It must be a build variable, not a runtime variable, because the site is built ahead of time.
3. In Plausible, add a custom event goal named `Order Click`.

Every Order link also carries tags (`utm_content=hero` and so on), so Hotplate referral data shows which button sent each visitor.

## Deploying (Cloudflare Workers)

Already connected to this GitHub repository. The settings that matter, under Settings, Builds:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Root directory: `/` (blank)
- Production branch: the branch you edit and commit to.

`wrangler.jsonc` tells Cloudflare to serve the finished files in `out`.

## For a developer

- Next.js (App Router, static export), TypeScript, Tailwind CSS v4. Fonts: Beth Ellen and Lora from her brand guide, self hosted and subset in `app/fonts` (see the README there).
- `npm install`, then `npm run dev` for local work, `npm run build` for the production build, `npm run typecheck` to check types.
- Layout adapted from the MIT licensed 8B florist template (`design/florist-template/`, `THIRD_PARTY_NOTICES.md`). Brand guide: `design/brand/style-guide.png`. Design tokens and rules: `DESIGN.md`. Research: `research/NOTES.md`. Original site copy: `content/live-site-snapshot.md`.
- No shadcn components and no animation library: the design needs two CSS transitions and a native `details` accordion, so both would be unused weight.
