// Shapes for the content files. You should not need to edit this file.

/** How an item shows on the site. */
export type Status = "available" | "sold-out" | "coming-soon" | "seasonal";

/** A photo. Leave `src` as null until the real photo exists. */
export type Photo = {
  /** Path inside /public, for example "/photos/classic-loaf.jpg". null shows a placeholder. */
  src: string | null;
  /** What the photo shows, for people using screen readers. Describe the food, not the vibe. */
  alt: string;
  /** Shot number from SHOT_LIST.md, printed on the placeholder so you know which photo goes where. */
  shot: number;
};

export type Variant = {
  /** For example "Single" or "4-pack". Use "" for an item with one option. */
  label: string;
  /** Size people get, for example "About 900 g" or "6 cookies". null hides it. */
  size: string | null;
  /** Price in dollars, for example 12 or 4.5. null shows "Price on Hotplate". */
  price: number | null;
};

export type MenuItem = {
  /** Short id used by drops.ts to refer to this item. Lowercase, no spaces. Never change it once used. */
  id: string;
  name: string;
  description: string;
  variants: Variant[];
  /**
   * Allergens in plain words, for example ["Wheat", "Milk", "Eggs"].
   * null means not confirmed yet. The site then tells people to ask before ordering.
   */
  allergens: string[] | null;
  status: Status;
  photo: Photo;
};

export type MenuCategory = {
  id: string;
  name: string;
  items: MenuItem[];
};

/** One line on the drop board. */
export type DropLine = {
  /** Must match an `id` in menu.ts. */
  item: string;
  /** Optional: only show some variants, for example ["4-pack"]. Leave out to show all. */
  variants?: string[];
  /** Optional: overrides the menu status for this drop only. */
  status?: Status;
  /** Optional: how many are being baked, for example 24. Shown as "24 baked". */
  quantity?: number;
};

export type Drop = {
  /** true prints a SAMPLE stamp on the site. Set to false once the dates are real. */
  isSample: boolean;
  /** Pickup day as "YYYY-MM-DD". */
  pickupDate: string;
  /** 24 hour clock, Worcester time. */
  pickupStart: string;
  pickupEnd: string;
  /** When ordering closes. Day as "YYYY-MM-DD", time as 24 hour clock, Worcester time. */
  closeDate: string;
  closeTime: string;
  /** Optional one line note shown on the board. */
  note?: string;
  lines: DropLine[];
};

export type HolidayMenu = Drop & {
  /** For example "Thanksgiving". */
  title: string;
  /** Holiday items that are not on the regular menu. */
  specials: { name: string; description: string; price: number | null }[];
};

export type FaqEntry = {
  question: string;
  /** null hides the question from the site until she writes the answer. */
  answer: string | null;
};
