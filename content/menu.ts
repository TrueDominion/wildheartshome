// The full menu. Descriptions are her own words from the live site.
// TODO(content): every price, size and allergen list below is unconfirmed (null).
import type { MenuCategory } from "./types";

export const menu: MenuCategory[] = [
  {
    id: "sourdough",
    name: "Organic Sourdough",
    items: [
      {
        id: "classic-loaf",
        name: "Classic Sourdough Loaf",
        description:
          "The original. A crusty, chewy loaf with an open, airy crumb. Perfect for toast, sandwiches, or just warm with butter.",
        variants: [{ label: "", size: null, price: null }],
        allergens: null,
        status: "available",
        photo: { src: null, alt: "Classic Sourdough Loaf with a deep golden crust.", shot: 2 },
      },
      {
        id: "garlic-rosemary-loaf",
        name: "Garlic & Rosemary Loaf",
        description:
          "Fresh garlic and rosemary folded into our classic sourdough. Savory, aromatic, and impossible to stop eating.",
        variants: [{ label: "", size: null, price: null }],
        allergens: null,
        status: "available",
        photo: { src: null, alt: "Garlic and Rosemary Loaf, sliced, with rosemary flecks in the crumb.", shot: 3 },
      },
      {
        id: "everything-loaf",
        name: "Everything Seasoned Loaf",
        description:
          "Topped with our everything blend: sesame, poppy seed, garlic, onion, and salt. Crunchy, savory, and packed with flavor.",
        variants: [{ label: "", size: null, price: null }],
        // TODO(content): her description lists sesame. Confirm the full allergen list.
        allergens: null,
        status: "available",
        photo: { src: null, alt: "Everything Seasoned Loaf with a seeded crust.", shot: 4 },
      },
    ],
  },
  {
    id: "cookies",
    name: "Cookies",
    items: [
      {
        id: "chocolate-chip",
        name: "Chocolate Chip Cookies",
        description: "Crisp edges, soft centers, and plenty of chocolate. The classic, done right.",
        variants: [{ label: "", size: null, price: null }],
        allergens: null,
        status: "available",
        photo: { src: null, alt: "A stack of chocolate chip cookies, one broken open.", shot: 5 },
      },
      {
        id: "snickerdoodles",
        name: "Snickerdoodles",
        description: "Soft and pillowy, rolled in cinnamon sugar. A little tangy, a lot of comfort.",
        variants: [{ label: "", size: null, price: null }],
        allergens: null,
        status: "available",
        photo: { src: null, alt: "Snickerdoodles dusted in cinnamon sugar.", shot: 6 },
      },
      {
        id: "ginger-molasses",
        name: "Ginger Molasses Cookies",
        description: "Deep, dark molasses with warm ginger spice. Chewy, rich, and perfectly spiced.",
        variants: [{ label: "", size: null, price: null }],
        allergens: null,
        status: "available",
        photo: { src: null, alt: "Dark ginger molasses cookies with crackled tops.", shot: 7 },
      },
    ],
  },
  {
    id: "cinnamon-rolls",
    name: "Cinnamon Rolls",
    items: [
      {
        id: "cinnamon-roll",
        name: "Classic Cinnamon Roll",
        description:
          "A fluffy, gooey cinnamon roll swirled with brown sugar and cinnamon, topped with buttercream frosting. Pure indulgence.",
        variants: [
          { label: "Single", size: null, price: null },
          { label: "4-pack", size: null, price: null },
        ],
        allergens: null,
        status: "available",
        photo: { src: null, alt: "Four frosted cinnamon rolls in a pan.", shot: 8 },
      },
    ],
  },
];

/** Find a menu item by its id. */
export function findItem(id: string) {
  for (const category of menu) {
    const item = category.items.find((i) => i.id === id);
    if (item) return item;
  }
  throw new Error(`content/drops.ts refers to "${id}", which is not an id in content/menu.ts`);
}
