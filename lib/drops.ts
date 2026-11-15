// Turns the content files into plain data the page can render.
import { drops, holiday } from "@/content/drops";
import { findItem } from "@/content/menu";
import type { Drop } from "@/content/types";
import { worcesterTime } from "./time";
import type { BoardLine, ResolvedDrop, ResolvedHoliday } from "./drop-state";

export type { ResolvedDrop, ResolvedHoliday };

export function resolve(drop: Drop): ResolvedDrop {
  const lines: BoardLine[] = drop.lines.flatMap((line) => {
    const item = findItem(line.item);
    const wanted = line.variants;
    const variants = wanted ? item.variants.filter((v) => wanted.includes(v.label)) : item.variants;
    if (wanted && variants.length !== wanted.length) {
      throw new Error(`content/drops.ts: a variant listed for "${line.item}" does not exist in content/menu.ts`);
    }
    return variants.map((v) => ({
      name: item.name,
      variant: v.label,
      price: v.price,
      status: line.status ?? item.status,
      quantity: line.quantity,
    }));
  });
  return {
    isSample: drop.isSample,
    closeAt: worcesterTime(drop.closeDate, drop.closeTime),
    pickupStart: worcesterTime(drop.pickupDate, drop.pickupStart),
    pickupEnd: worcesterTime(drop.pickupDate, drop.pickupEnd),
    note: drop.note,
    lines,
  };
}

export const resolvedDrops: ResolvedDrop[] = drops.map(resolve).sort((a, b) => a.pickupEnd - b.pickupEnd);

export const resolvedHoliday: ResolvedHoliday | null = holiday
  ? { ...resolve(holiday), title: holiday.title, specials: holiday.specials }
  : null;

