# Research notes

Captured 2026-11-15. Patterns to borrow, not layouts to copy.

## Method and limits

- Live site copy pulled verbatim into `content/live-site-snapshot.md`.
- Mobbin: 9 searches across sections, screens and flows. 15 finds saved to the private Mobbin collection "Wild Hearts", each with a comment on what to borrow.
- Reference sites: this build environment's network only reaches package registries, so a browser could not load third party sites. Reference sites were read as page content through a search and extract service. Notes below cover structure, content model and copy, which that method shows reliably. Visual judgments rely on the Mobbin captures and on prior knowledge of the sites. Treat visual claims about the reference sites as unverified.

## Reference sites

| Site | What works | Borrow as a pattern | Avoid |
|---|---|---|---|
| Tartine Bakery (SF) | Lead time stated as a plain fact: "special order cakes require a seven day lead time." Link labels name the pickup place inside the button text. | Put lead time and pickup area in the same sentence as the order link. | The press quote and book carousel. Nothing like that exists for us and we will not invent it. |
| Flour Bakery (Boston) | Seasonal menus get their own block with "order ahead" language. An allergens guide is linked from the footer on every page. | Holiday block with its own order by date. Allergens reachable from the footer and inline on items. | Instagram grid embed and newsletter popups. Heavy, slow, generic. |
| St. JOHN (London) | Restraint. Short paragraphs, rhythm words ("the menu is written twice a day"), no decoration. | Describe the baking rhythm as a fact of life: what day she bakes, what day you pick up. | Nothing. It is the tone benchmark. |
| Diaspora Co. | Product card is name, price, size, and one sentence about how you would use it. | Menu item model: name, size, price, one line, tags. Her existing descriptions already fit this. | Sale price strikethroughs and review counts. |
| Dandelion Chocolate | "Open today: 10AM to 5PM" status line computed per location. | A single computed status line for the drop. | Mega menu. One page does not need it. |
| Sullivan Street Bakery | Counter example. Six slide carousel with no text and alt text such as "a close up of a stuffed animal." | Nothing. | Carousels, auto generated alt text, image only home pages. |
| The Sourdough Circle (MD microbakery) | Says plainly: "a home-based micro-bakery, not a retail storefront... Preorders are required." Weekly menu with a dated range. Deadline line at the top. | Home business honesty. Deadline sentence above the fold. Dated weekly menu. | Emoji as bullets and arrows, all caps shouting. |
| Crumb Sourdough Microbakery (OR) | FAQ explains why the deadline exists: sourdough takes 3 to 5 days. "Address is provided at time of purchase." Pickup rules spelled out. | Explain the lead time in her voice so the deadline feels earned, not arbitrary. Address on confirmation only. | Wix template chrome. |
| Hotplate (platform) | Customers already know the vocabulary: storefront, drop, pickup window, text alerts. | Use "drop" consistently. Point people to Hotplate text alerts as the honest answer to "when is the next one." | Copying Hotplate UI. Our site is the front door, Hotplate is the counter. |

## Mobbin patterns worth borrowing

1. **Monte menu**: a menu set like a printed card in one ink color. Proves type alone can carry the brand while photos are missing.
2. **Corgi price list**: dotted leaders between item and price, small mono column labels.
3. **re_ product page**: outlined dietary tag, "Pickup from: [area]" chip, ingredients as an expandable row.
4. **Savor hero**: indented two line serif headline with a staggered row of small photos. Asymmetric, and forgiving of imperfect photos.
5. **Savor preorder card**: small persistent order card. Desktop reference only.
6. **Analogue status line**: factual pre order status in the hero instead of countdown theater.
7. **Escape Cafe steps**: three ruled, numbered steps with no icons.
8. **KÖPPEN and incident.io founder notes**: narrow letter column, offset portrait, real signature as the only handmade mark.
9. **Oatly and David FAQs**: hairline ruled rows, plus and minus, FAQ beside a tall photo on desktop.
10. **Best Buy drops flow**: three states (live, upcoming, nothing right now) with an honest empty state.
11. **Deliveroo pickup**: "available to collect within your selected window." Pickup is a window, not a time.

## Conflicts with the brief

- **Countdown timers** (Rains, Graphical, Relume) conflict with honest urgency and add ticking motion. Rejected. We show the real close time and a computed relative phrase ("closes in 2 days") that updates on page load, never a seconds ticker.
- **Floating preorder card** (Savor) covers content on phones. On mobile it becomes a bottom bar with reserved space at the end of the page so nothing is hidden behind it.
- **Hidden drop status vs. honest empty state**: the brief hides the hero status when no drop exists. Best Buy shows that an empty state still needs a next step. Resolution: the hero line disappears, but the drop section stays and says there is no drop scheduled and how to get notified on Hotplate.
- **Static site vs. time based status**: a static build would freeze "orders open" after the deadline passes. The drop state must be recomputed in the browser against the current time, with the build time value as the fallback.

## Component sources and licenses

| Source | Decision | License |
|---|---|---|
| shadcn/ui | Use only where a primitive saves real work, fully restyled. Likely none needed: FAQ uses native `details` and `summary` with zero JavaScript. | MIT |
| Radix UI (under shadcn) | Only if a component above is adopted. | MIT |
| Motion | Two or three transitions, all disabled under reduced motion. | MIT |
| Aceternity UI, Magic UI | Rejected. Their signature effects (spotlights, beams, glow, marquee) are on the anti slop list. | Mixed, MIT for free tiers |
| 21st.dev | Not used. The blocks needed here are small enough to write directly against our tokens. | Varies by author |
| Google Fonts candidates | Newsreader, IBM Plex Mono, Big Shoulders Display, Source Serif 4. Self hosted at build time through `next/font`. | SIL Open Font License 1.1 |

## Takeaways for the design

1. Type must carry the brand until real photos exist. Photo slots must look intentional when empty.
2. The weekly drop is the product. Deadline, pickup window and area belong in the first screen.
3. Every fact a customer asks in DMs (price, size, allergens, where, when, why the deadline) belongs on the page.
4. Home business honesty reads as trust, not as a weakness.
