// THE WEEKLY FILE. Edit this when a new drop goes up on Hotplate.
//
// - Add the new drop to the top of `drops`. Old ones can stay or be deleted.
// - The site shows the next drop whose pickup has not ended yet.
// - If none is in the future, the hero line hides itself and the board says no drop is scheduled.
// - Times are Worcester time, 24 hour clock: "20:00" is 8 PM.
// - Keep isSample: true until the dates are real. It prints a SAMPLE stamp on the site.
import type { Drop, HolidayMenu } from "./types";

export const drops: Drop[] = [
  {
    // TODO(content): sample dates. Replace with the real drop from Hotplate.
    isSample: true,
    pickupDate: "2026-11-21",
    pickupStart: "09:00",
    pickupEnd: "11:00",
    closeDate: "2026-11-19",
    closeTime: "20:00",
    lines: [
      { item: "classic-loaf" },
      { item: "garlic-rosemary-loaf" },
      { item: "everything-loaf" },
      { item: "chocolate-chip" },
      { item: "ginger-molasses" },
      { item: "cinnamon-roll", variants: ["4-pack"] },
    ],
  },
];

// The holiday block. Set to null when there is no holiday menu; the block then
// shows her standing note about holiday drops instead.
export const holiday: HolidayMenu | null = {
  // TODO(content): sample Thanksgiving menu. Replace dates, items and specials with the real ones.
  isSample: true,
  title: "Thanksgiving",
  pickupDate: "2026-11-25",
  pickupStart: "10:00",
  pickupEnd: "13:00",
  closeDate: "2026-11-21",
  closeTime: "20:00",
  lines: [
    { item: "classic-loaf" },
    { item: "cinnamon-roll", variants: ["4-pack"] },
    { item: "ginger-molasses" },
  ],
  // TODO(content): her holiday specials. Names and descriptions must come from her.
  specials: [],
};
