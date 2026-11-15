// Time helpers. All bakery times are Worcester (America/New_York) time,
// no matter where the visitor is.

export const TZ = "America/New_York";

function offsetMs(utcMs: number): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(new Date(utcMs));
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second"));
  return asUtc - utcMs;
}

/** "2026-11-19" + "20:00" in Worcester time -> epoch milliseconds. */
export function worcesterTime(date: string, time: string): number {
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  if ([y, m, d, hh, mm].some((n) => Number.isNaN(n))) {
    throw new Error(`Bad date or time in content: "${date}" "${time}"`);
  }
  const guess = Date.UTC(y, m - 1, d, hh, mm);
  const first = guess - offsetMs(guess);
  return guess - offsetMs(first); // second pass settles daylight saving edges
}

const fmt = (opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-US", { timeZone: TZ, ...opts });

/** "Sat, Nov 21" */
export const dayDate = (ms: number) => fmt({ weekday: "short", month: "short", day: "numeric" }).format(ms);

/** "Saturday" */
export const weekday = (ms: number) => fmt({ weekday: "long" }).format(ms);

/** "8 PM" or "8:30 PM" */
export function clock(ms: number): string {
  return fmt({ hour: "numeric", minute: "2-digit" }).format(ms).replace(":00", "");
}

/** "9 to 11 AM" or "11 AM to 1 PM" */
export function timeWindow(startMs: number, endMs: number): string {
  const a = clock(startMs);
  const b = clock(endMs);
  const [aTime, aPeriod] = a.split(" ");
  return aPeriod === b.split(" ")[1] ? `${aTime} to ${b}` : `${a} to ${b}`;
}

/** Calendar day number in Worcester, for "today" and "tomorrow". */
function dayIndex(ms: number): number {
  const p = fmt({ year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(ms);
  const g = (t: string) => Number(p.find((x) => x.type === t)?.value);
  return Date.UTC(g("year"), g("month") - 1, g("day")) / 86_400_000;
}

/** "today, 8 PM", "tomorrow, 8 PM", "Thursday, 8 PM" or "Thu, Nov 19". Honest, never a ticker. */
export function closesPhrase(closeMs: number, nowMs: number): string {
  const days = dayIndex(closeMs) - dayIndex(nowMs);
  if (days <= 0) return `today, ${clock(closeMs)}`;
  if (days === 1) return `tomorrow, ${clock(closeMs)}`;
  if (days < 7) return `${weekday(closeMs)}, ${clock(closeMs)}`;
  return `${dayDate(closeMs)}, ${clock(closeMs)}`;
}
