# Shot list

A phone camera is enough. The site's look is bold type on oat paper, so photos should be bright, honest and simple. No filters, no stock, no AI images.

## Light and setup

- **Daylight only.** Near a big window, mid morning, or outside in open shade. Turn off kitchen lights so colors stay true.
- **Light from the side**, not behind you and not behind the food. Side light shows crust and crumb.
- **Backgrounds:** plain wood board, unbleached linen, parchment, the stall table. Avoid busy patterns and shiny counters.
- **Props:** almost none. A bread knife, a cooling rack, a hand. The food is the subject.
- **Phone settings:** main lens (1x), not portrait mode. Tap the food to focus, slide exposure down a little so the frosting does not blow out. Shoot in the highest quality setting.
- **Shoot both ways.** Vertical (4:5) and horizontal for each subject. Fill the frame, leave a little space around the edges for cropping.
- **People:** only Lauren and family, or customers who said yes. No faces of kids without a parent's clear yes.

## Numbered shots

The number appears on the site's placeholder, so you can see where each one goes.

| # | Where on the site | Subject | Framing |
|---|---|---|---|
| 01 | Hero (top of page) | Classic loaf cut open, crumb facing camera | Vertical 4:5, close, loaf filling most of the frame |
| 02 | Menu | Classic Sourdough Loaf, whole | Vertical 4:5, 45 degree angle, crust in focus |
| 03 | Menu | Garlic & Rosemary Loaf, sliced | Vertical 4:5, slices fanned, rosemary visible |
| 04 | Menu | Everything Seasoned Loaf | Vertical 4:5, close on the seeded crust |
| 05 | Menu | Chocolate Chip Cookies | Vertical 4:5, a short stack plus one broken open |
| 06 | Menu | Snickerdoodles | Vertical 4:5, overhead on parchment, sugar visible |
| 07 | Menu | Ginger Molasses Cookies | Vertical 4:5, close on the crackled tops |
| 08 | Menu | Cinnamon rolls, 4-pack | Vertical 4:5, overhead in the pan or box, frosting detail |
| 09 | Spare | One cinnamon roll pulled apart | Close, for Instagram or a future single roll photo |
| 10 | Spare | Holiday bake (when she has one) | Vertical and horizontal |
| 11 | Spare | Hands shaping dough or scoring a loaf | Horizontal, process shot |
| 12 | Spare | A bagged order ready for pickup | Vertical, shows the real packaging |
| 13 | Wide band between Menu and Holiday | The pickup table set out on a Saturday morning | Horizontal, very wide (21:9 crop), table and bakes, no house numbers or street signs |
| 14 | About me | Lauren in her kitchen | Vertical 3:4, natural light, holding a tray or a loaf |

## Privacy checks before using any photo

- No house number, street sign, license plate or recognizable house front.
- Turn off location tagging on the phone, or strip location data when exporting.

## File rules

1. **Export as WebP or JPG**, color profile sRGB.
2. **Size:** long edge 1600 px (hero shot 01: 2000 px). Aim for under 350 KB each. The site does not resize photos for you, so big files slow it down.
3. **Name:** shot number, then subject, lowercase, dashes. Example: `02-classic-loaf.webp`.
4. **Put the file** in `public/photos/`.
5. **Point to it** in the content file, for example in `content/menu.ts`: `src: "/photos/02-classic-loaf.webp"`. Update the `alt` text to describe what is actually in the photo.
