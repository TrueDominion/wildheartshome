import { orderUrl, type OrderPosition } from "@/lib/order";

type Props = {
  position: OrderPosition;
  label?: string;
  className?: string;
  id?: string;
};

/** Every Order link on the site. Goes to Hotplate with tracking tags for its position. */
export function OrderButton({ position, label = "Order on Hotplate", className = "", id }: Props) {
  return (
    <a id={id} href={orderUrl(position)} data-order={position} className={`btn ${className}`}>
      {label}
    </a>
  );
}
