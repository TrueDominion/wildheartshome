# Content needed from Lauren

In priority order. Each item names the file it goes in. Nothing on the site was invented: every gap below currently shows as a placeholder, a "Price on Hotplate" note, a SAMPLE stamp, or is hidden.

## Before launch

1. **Real drop dates.** Next pickup day, pickup window, and when orders close. Goes in `content/drops.ts`. Then set `isSample: false`. Until then the board carries a SAMPLE stamp.
2. **Thanksgiving menu, or none.** Real order by date, pickup date and window, which regular items are included, and any holiday specials (name, one line description, price). Goes in `holiday` in `content/drops.ts`. Set `holiday = null` if there is no Thanksgiving drop; her standing holiday note then shows instead. Thanksgiving is November 26, so this is urgent.
3. **Allergens for every item.** Plain words only (for example Wheat, Milk, Eggs, Sesame). Goes in `allergens` per item in `content/menu.ts`. Note: her own description of the Everything Seasoned Loaf lists sesame. Until confirmed, each item says "Allergens not listed yet. Ask before ordering."
4. **Massachusetts cottage food and labeling statement.** The exact wording she is required to carry, checked by her against current state requirements. Goes in `complianceStatement` in `content/site.ts`. Do not write this for her.
5. **Organic claim confirmation.** The site repeats her current wording exactly ("Organic sourdough", "I use organic ingredients in all my bakes. No exceptions."). She should confirm it is accurate for every ingredient, then set `organicClaimConfirmed: true` in `content/site.ts`.

## Soon after launch

6. **Prices and sizes.** Per item and per variant (Single, 4-pack). Goes in `content/menu.ts`. Until set, the site says "Price on Hotplate".
7. **Photos.** See `SHOT_LIST.md`. Priority: shot 01 (hero), shot 14 (her portrait), then shots 02 to 08 (one per menu item).
8. **FAQ answers she has not written yet.** In `content/faq.ts`, these are hidden until answered:
   - Can I cancel or change my order?
   - Do you take custom orders?
   - Can you make something gluten free, dairy free or vegan?
   - What if I miss the pickup window?
9. **Instagram handle.** Goes in `instagram` in `content/site.ts` (no @). Hidden until set.
10. **Her signature (optional).** A photo of her real signature in dark ink on white paper would replace the typed "Lauren". Never fake one with a script font.

## Confirmed at the checkpoint

- Hotplate storefront: `https://hotplate.com/tnbhofficial`.
- Story signed as "Lauren".
- Pickup shown as "Worcester, MA" only. The exact address goes out with the order confirmation.

## One wording check

- The FAQ allergen answer says "email me before you order and I'll tell you exactly what's in it." That is a promise in her voice. She should confirm she is happy to answer those emails.
