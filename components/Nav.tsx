"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { orderUrl } from "@/lib/order";
import { Flower } from "./Flower";
import { Arrow } from "./OrderButton";

const LINKS = [
  { href: "#this-week", label: "This week" },
  { href: "#menu", label: "Menu" },
  { href: "#holiday", label: "Holiday" },
  { href: "#how", label: "How it works" },
  { href: "#story", label: "About" },
  { href: "#faq", label: "Questions" },
];

/** Fixed top bar that tucks away while scrolling down and returns on the way up. */
export function Nav() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const openBtn = useRef<HTMLButtonElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      if (Math.abs(dy) < 3) return;
      setHidden(dy > 0 && y > 140);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) closeBtn.current?.focus();
  }, [open]);

  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) openBtn.current?.focus();
  };

  return (
    <header id="navigation" className={hidden && !open ? "is-hidden" : ""}>
      <a className="nav__brand" href="#top">
        <Flower className="h-9 w-auto" />
        <span className="nav__brand-name">{site.shortName}</span>
        <span className="sr-only">Home Bakery, back to top</span>
      </a>
      <nav className="nav__links" aria-label="Sections">
        {LINKS.map((l) => (
          <a key={l.href} className="link-2" href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>
      <a className="nav__cta" href={orderUrl("header")} data-order="header">
        Order on Hotplate <Arrow />
      </a>
      <button
        ref={openBtn}
        className="nav__menu icon"
        type="button"
        aria-expanded={open}
        aria-controls="site-menu"
        aria-label="Open the menu"
        onClick={() => setOpen(true)}
      >
        <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
          <path d="M1 4.5h14M1 11.5h14" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>
      <div
        className="menu"
        id="site-menu"
        hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        onKeyDown={(e) => e.key === "Escape" && close()}
      >
        <div className="menu__top">
          <span className="nav__brand-name">{site.name}</span>
          <button ref={closeBtn} className="icon" type="button" aria-label="Close the menu" onClick={() => close()}>
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <path d="M3 3l10 10M13 3L3 13" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
        </div>
        <nav className="menu__links" aria-label="Menu">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => close(false)}>
              {l.label}
            </a>
          ))}
          <a href={orderUrl("header")} data-order="header">
            Order on Hotplate
          </a>
        </nav>
        <p className="t-small">
          {site.location.city}, {site.location.region} ·{" "}
          <a className="link" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </p>
      </div>
    </header>
  );
}
