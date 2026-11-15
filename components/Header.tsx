import { OrderButton } from "./OrderButton";

const LINKS = [
  { href: "#this-week", label: "This week" },
  { href: "#menu", label: "Menu" },
  { href: "#holiday", label: "Holiday" },
  { href: "#how", label: "How it works" },
  { href: "#story", label: "About" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  return (
    <header className="border-b-[3px] border-rye bg-oat md:sticky md:top-0 md:z-30">
      <div className="wrap flex items-center justify-between gap-6 py-3">
        <a href="#top" className="t-label text-[1.625rem] leading-[0.9] tracking-[0.01em] no-underline">
          Wild Hearts
          <br />
          Home Bakery
          <span className="sr-only">, back to top</span>
        </a>
        <nav aria-label="Sections" className="hidden md:block">
          <ul className="flex gap-6">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="t-label no-underline hover:underline">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <OrderButton position="header" label="Order" className="min-h-11 px-4 text-base" />
      </div>
      <nav aria-label="Sections" className="border-t border-rye/20 md:hidden">
        <ul className="wrap flex gap-5 overflow-x-auto whitespace-nowrap py-2.5 [mask-image:linear-gradient(to_right,#000_85%,transparent)] [scrollbar-width:none]">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="t-label inline-block py-1 no-underline">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
