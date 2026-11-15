import type { Status as StatusType } from "@/content/types";

const LABEL: Record<StatusType, string> = {
  available: "Available",
  "sold-out": "Sold out",
  "coming-soon": "Coming soon",
  seasonal: "Seasonal",
};

const DOT: Record<StatusType, string> = {
  available: "bg-sage",
  "sold-out": "bg-rye-2",
  "coming-soon": "bg-brick",
  seasonal: "bg-butter",
};

/** A dot plus a word. The word carries the meaning; the dot only helps scanning. */
export function Status({ status, onRye = false }: { status: StatusType; onRye?: boolean }) {
  const text = onRye ? "text-oat-muted" : status === "available" ? "text-sage" : "text-rye-2";
  return (
    <span className={`t-label inline-flex items-center gap-2 ${text}`}>
      <span aria-hidden="true" className={`size-2 rounded-full ${DOT[status]}`} />
      {LABEL[status]}
    </span>
  );
}
