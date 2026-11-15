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
    <header className="border-b border-ink/15 bg-paper md:sticky md:top-0 md:z-30">
      <div aria-hidden="true" className="brand-band" />
      <div className="wrap flex items-center justify-between gap-6 py-2">
        <a href="#top" className="flex flex-col no-underline">
          <span className="font-script text-[1.75rem] leading-[1.2]">Wild Hearts</span>
          <span className="t-label mt-0.5 text-[0.6875rem] leading-none text-ink-2">Home Bakery</span>
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
        <OrderButton position="header" label="Order" className="min-h-11 px-5" />
      </div>
      <nav aria-label="Sections" className="border-t border-ink/15 md:hidden">
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
