"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import type { MenuItem } from "@/content/types";
import { money, orderUrl } from "@/lib/order";
import { Flower } from "./Flower";
import { Arrow } from "./OrderButton";
import { PhotoSlot } from "./PhotoSlot";
import { Status } from "./Status";

type Row = MenuItem & { category: string };

function priceLine(item: MenuItem) {
  const parts = item.variants.map((v) => {
    const bits = [v.label, v.size, v.price === null ? null : money(v.price)].filter(Boolean);
    return bits.join(" ");
  });
  const anyPrice = item.variants.some((v) => v.price !== null);
  const options = parts.filter(Boolean).join(" or ");
  return [options, anyPrice ? null : "Price on Hotplate"].filter(Boolean).join(" · ");
}

function Allergens({ item }: { item: MenuItem }) {
  if (item.allergens === null) {
    return (
      <p className="t-small">
        Allergens not listed yet.{" "}
        <a className="link" href={`mailto:${site.email}?subject=${encodeURIComponent(`Allergens: ${item.name}`)}`}>
          Ask before ordering
        </a>
      </p>
    );
  }
  if (item.allergens.length === 0) return <p className="t-small">No major allergens.</p>;
  return <p className="t-small">Contains {item.allergens.join(", ")}.</p>;
}

/** Her menu as a list of rows beside one held frame that follows the row you are reading. */
export function MenuBench({ rows }: { rows: Row[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const anyPhoto = rows.some((r) => r.photo.src);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div className={`bench__frame ${anyPhoto ? "" : "max-md:hidden"}`} aria-hidden="true">
        <div className="bench__deck">
          {rows.map((r, i) => (
            <div key={r.id} className={`bench__slide ${i === active ? "is-active" : ""}`}>
              {r.photo.src ? (
                <PhotoSlot photo={r.photo} sizes="(min-width: 768px) 40vw, 100vw" />
              ) : (
                <div className="op__art">
                  <Flower className="op__art-flower" />
                  <span className="op__art-note t-label">
                    {r.name} · photo to come · shot {String(r.photo.shot).padStart(2, "0")}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <ol className="bench__rows">
        {rows.map((r, i) => (
          <li
            key={r.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-index={i}
            className={`bench__row ${i === active ? "is-active" : ""}`}
          >
            <p className="t-label bench__meta">{r.category}</p>
            <h3 className="bench__name t-h4">{r.name}</h3>
            {r.status !== "available" && (
              <p>
                <Status status={r.status} />
              </p>
            )}
            <p className="t-label bench__meta">{priceLine(r)}</p>
            <p className="bench__note">{r.description}</p>
            <Allergens item={r} />
          </li>
        ))}
      </ol>
      <a className="bench__more rowlink" href={orderUrl("menu")} data-order="menu">
        <span className="rule" aria-hidden="true" />
        <span className="rowlink__label">Order this week&apos;s bakes on Hotplate</span>
        <Arrow />
      </a>
    </>
  );
}
