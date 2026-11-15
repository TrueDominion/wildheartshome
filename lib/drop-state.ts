// Small, browser safe helpers for working out which drop is current.
import type { Status } from "@/content/types";

export type BoardLine = {
  name: string;
  variant: string;
  price: number | null;
  status: Status;
  quantity?: number;
};

export type ResolvedDrop = {
  isSample: boolean;
  closeAt: number;
  pickupStart: number;
  pickupEnd: number;
  note?: string;
  lines: BoardLine[];
};

export type DropState = "open" | "closed" | "past";

export type ResolvedHoliday = ResolvedDrop & {
  title: string;
  specials: { name: string; description: string; price: number | null }[];
};

/** The next drop whose pickup has not ended. */
export function currentDrop<T extends ResolvedDrop>(list: T[], now: number): T | null {
  return list.find((d) => d.pickupEnd > now) ?? null;
}

export function stateOf(drop: ResolvedDrop, now: number): DropState {
  if (now < drop.closeAt) return "open";
  if (now < drop.pickupEnd) return "closed";
  return "past";
}
