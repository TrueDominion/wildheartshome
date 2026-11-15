import { site } from "@/content/site";

/** Where an Order button sits. Shows up in Hotplate referral data and in analytics. */
export type OrderPosition = "header" | "hero" | "board" | "holiday" | "closing" | "sticky" | "footer";

export function orderUrl(position: OrderPosition): string {
  const url = new URL(site.hotplateUrl);
  url.searchParams.set("utm_source", "wildheartshomebakery.com");
  url.searchParams.set("utm_medium", "website");
  url.searchParams.set("utm_campaign", "order_button");
  url.searchParams.set("utm_content", position);
  return url.toString();
}

export const money = (n: number) => (Number.isInteger(n) ? `$${n}` : `$${n.toFixed(2)}`);
