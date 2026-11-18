import { orderUrl, type OrderPosition } from "@/lib/order";

type Props = {
  position: OrderPosition;
  label?: string;
  /** "light" for use on dark bands. */
  tone?: "dark" | "light";
  className?: string;
  id?: string;
};

/** Every Order link on the site. Goes to Hotplate with tracking tags for its position. */
export function OrderButton({ position, label = "Order on Hotplate", tone = "dark", className = "", id }: Props) {
  return (
    <a
      id={id}
      href={orderUrl(position)}
      data-order={position}
      className={`btn ${tone === "light" ? "btn--light" : ""} ${className}`}
    >
      <span className="btn__label">{label}</span>
    </a>
  );
}

/** The small square arrow used beside text links. */
export function Arrow() {
  return (
    <span className="icon" aria-hidden="true">
      <svg viewBox="0 0 16 16" width="14" height="14">
        <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </span>
  );
}
