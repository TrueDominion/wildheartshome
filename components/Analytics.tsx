"use client";

import Script from "next/script";
import { useEffect } from "react";

type Plausible = ((event: string, opts?: { props: Record<string, string> }) => void) & { q?: unknown[] };
declare global {
  interface Window {
    plausible?: Plausible;
  }
}

/**
 * Optional, privacy friendly analytics (Plausible: no cookies, no personal data).
 * Only loads when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set. Records an "Order Click" event
 * with the button position (hero, board, sticky and so on).
 */
export function Analytics({ domain }: { domain: string }) {
  useEffect(() => {
    window.plausible =
      window.plausible ||
      Object.assign((...args: unknown[]) => (window.plausible!.q = window.plausible!.q || []).push(args), {});
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>("a[data-order]");
      if (link) window.plausible?.("Order Click", { props: { position: link.dataset.order ?? "unknown" } });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return <Script src="https://plausible.io/js/script.js" data-domain={domain} strategy="afterInteractive" />;
}
