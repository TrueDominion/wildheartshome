import { menu } from "@/content/menu";
import { site } from "@/content/site";
import type { MenuItem } from "@/content/types";
import { money } from "@/lib/order";
import { PhotoSlot } from "./PhotoSlot";
import { Status } from "./Status";

function Prices({ item }: { item: MenuItem }) {
  const unpriced = item.variants.every((v) => v.price === null && !v.size);
  if (unpriced) {
    const labels = item.variants.map((v) => v.label).filter(Boolean);
    return (
      <p className="t-label mt-3 text-ink-2">
        {labels.length > 0 && <span className="text-ink">{labels.join(" or ")} · </span>}
        Price on Hotplate
      </p>
    );
  }
  return (
    <ul className="mt-3">
      {item.variants.map((v) => (
        <li key={v.label} className="flex items-baseline gap-3">
          {(v.label || v.size) && (
            <span className="t-label">
              {[v.label, v.size].filter(Boolean).join(" · ")}
            </span>
          )}
          <span aria-hidden="true" className="flex-1 translate-y-[-0.3em] border-b border-dotted border-ink-2" />
          <span className="tnum">
            {v.price === null ? (
              <span className="t-label text-ink-2">Price on Hotplate</span>
            ) : (
              <span className="t-h3 text-coral-ink">{money(v.price)}</span>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Allergens({ item }: { item: MenuItem }) {
  if (item.allergens === null) {
    return (
      <p className="t-small mt-3 text-ink-2">
        Allergens not listed yet.{" "}
        <a href={`mailto:${site.email}?subject=${encodeURIComponent(`Allergens: ${item.name}`)}`} className="text-ink">
          Ask before ordering
        </a>
        .
      </p>
    );
  }
  if (item.allergens.length === 0) {
    return <p className="t-small mt-3 text-ink-2">No major allergens.</p>;
  }
  return (
    <p className="mt-3 flex flex-wrap items-center gap-2">
      <span className="t-small text-ink-2">Contains</span>
      {item.allergens.map((a) => (
        <span key={a} className="t-label border-[1.5px] border-ink px-2 py-1 text-[0.9375rem]">
          {a}
        </span>
      ))}
    </p>
  );
}

function Item({ item }: { item: MenuItem }) {
  return (
    <li
      className={`border-t border-ink/15 py-6 md:border-t-0 md:py-0 ${
        item.photo.src ? "grid grid-cols-[7rem_1fr] gap-4 md:block" : "flex flex-col md:block"
      }`}
    >
      <PhotoSlot
        photo={item.photo}
        ratio="aspect-[4/5]"
        emptyRatio="order-last mt-4 h-11 md:order-none md:mt-0 md:mb-4"
        sizes="(min-width: 768px) 30vw, 112px"
      />
      <div className={item.photo.src ? "md:mt-4" : ""}>
        <h4 className="t-h3">{item.name}</h4>
        {item.status !== "available" && (
          <p className="mt-2">
            <Status status={item.status} />
          </p>
        )}
        <p className="t-body mt-2 text-ink-2">{item.description}</p>
        <Prices item={item} />
        <Allergens item={item} />
      </div>
    </li>
  );
}

export function Menu() {
  return (
    <section id="menu" aria-labelledby="menu-title" className="section-pad">
      <div className="wrap">
        <h2 id="menu-title" className="t-h2">
          The menu
        </h2>
        {menu.map((cat) => (
          <div key={cat.id} className="mt-12 border-t-2 border-ink pt-4 lg:grid lg:grid-cols-12 lg:gap-10">
            <h3 className="t-h3 text-coral-ink lg:col-span-3">{cat.name}</h3>
            <ul className="mt-2 md:mt-6 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-12 lg:col-span-9 lg:mt-0">
              {cat.items.map((item) => (
                <Item key={item.id} item={item} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
