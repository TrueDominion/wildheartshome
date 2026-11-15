"use client";

// Everything on the page that depends on today's date lives here,
// so it can be recomputed in the visitor's browser.

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { currentDrop, stateOf, type ResolvedDrop, type ResolvedHoliday } from "@/lib/drop-state";
import { money } from "@/lib/order";
import { clock, closesPhrase, dayDate, timeWindow, weekday } from "@/lib/time";
import { OrderButton } from "./OrderButton";
import { useNow } from "./Now";
import { Status } from "./Status";

function SampleStamp({ className = "" }: { className?: string }) {
  return (
    <span className={`stamp text-[1.125rem] ${className}`}>
      Sample<span className="sr-only">: these dates are placeholders, not a real drop yet</span>
    </span>
  );
}

/* ---------- Hero status strip ---------- */

export function HeroDropLine({ drops }: { drops: ResolvedDrop[] }) {
  const now = useNow();
  const drop = currentDrop(drops, now);
  if (!drop) return null;
  const state = stateOf(drop, now);
  return (
    <div className="relative mt-10 border-y-[3px] border-rye bg-butter px-4 py-4 text-rye">
      <p className="t-label text-rye-2">{state === "open" ? "Next drop" : "Orders closed"}</p>
      <p className="t-h2 mt-1 text-[clamp(2.25rem,1.8rem+2vw,3.25rem)]">{dayDate(drop.pickupStart)}</p>
      <p className="t-label mt-2 text-[1.125rem]">
        {state === "open"
          ? `Orders close ${closesPhrase(drop.closeAt, now)}`
          : `Pickup ${timeWindow(drop.pickupStart, drop.pickupEnd)}`}
      </p>
      {drop.isSample && <SampleStamp className="absolute right-4 top-4 text-rye" />}
    </div>
  );
}

/* ---------- The board ---------- */

function BoardLines({ lines }: { lines: ResolvedDrop["lines"] }) {
  // When no price is set yet, one note in the header beats repeating it on every row.
  const anyPrice = lines.some((l) => l.price !== null);
  return (
    <ul className="mt-2">
      {lines.map((l) => {
        const sold = l.status === "sold-out";
        return (
          <li
            key={l.name + l.variant}
            className="relative flex items-baseline justify-between gap-4 border-b border-oat/20 py-3"
          >
            <span className={sold ? "text-oat/50" : ""}>
              <span className="t-board">{l.name}</span>
              {l.variant && <span className="t-label ml-2 whitespace-nowrap text-oat-muted">{l.variant}</span>}
              {l.quantity !== undefined && <span className="t-label ml-2 text-oat-muted">{l.quantity} baked</span>}
              {l.status !== "available" && !sold && (
                <span className="ml-3 align-middle">
                  <Status status={l.status} onRye />
                </span>
              )}
            </span>
            {sold && <span className="stamp absolute right-20 top-2 text-[1.25rem] text-stamp">Sold out</span>}
            {anyPrice && (
              <span className="tnum shrink-0 text-right">
                {l.price === null ? (
                  <span className="t-label text-oat-muted">On Hotplate</span>
                ) : (
                  <span className="t-board text-butter">{money(l.price)}</span>
                )}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function Fact({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-oat/20 py-3">
      <dt className="t-label text-oat-muted">{term}</dt>
      <dd className="t-lede mt-1">{children}</dd>
    </div>
  );
}

export function Board({ drops }: { drops: ResolvedDrop[] }) {
  const now = useNow();
  const drop = currentDrop(drops, now);

  if (!drop) {
    return (
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 id="this-week-title" className="t-h2 text-butter">
            This week
          </h2>
          <p className="t-board mt-6 border-t-2 border-butter pt-4">No drop on the board right now.</p>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <p className="t-lede">
            Every drop goes up on Hotplate. Follow along on Hotplate so you don&apos;t miss the next one.
          </p>
          <OrderButton position="board" label="Follow on Hotplate" className="mt-6" />
        </div>
      </div>
    );
  }

  const state = stateOf(drop, now);
  const leadDays = Math.round((drop.pickupStart - drop.closeAt) / 86_400_000);

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b-2 border-butter pb-4">
          <h2 id="this-week-title" className="t-h2 text-butter">
            This week
          </h2>
          <p className="t-label text-[1.125rem] leading-tight md:text-right">
            Pickup {dayDate(drop.pickupStart)}, {timeWindow(drop.pickupStart, drop.pickupEnd)}
            <br />
            {state === "open" ? `Order by ${weekday(drop.closeAt)}, ${clock(drop.closeAt)}` : "Orders closed"}
          </p>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          {!drop.lines.some((l) => l.price !== null) && (
            <p className="t-label text-oat-muted">Prices are listed on Hotplate</p>
          )}
          {drop.isSample && <SampleStamp className="text-stamp" />}
        </div>
        <BoardLines lines={drop.lines} />
        {drop.note && <p className="t-body mt-4 text-oat-muted">{drop.note}</p>}
      </div>

      <div className="lg:col-span-4 lg:col-start-9">
        <dl>
          <Fact term="Where">
            {site.location.city}, {site.location.region}
            <span className="t-small mt-1 block text-oat-muted">{site.location.addressNote}</span>
          </Fact>
          <Fact term="Orders close">
            {state === "open" ? (
              <>
                {weekday(drop.closeAt)}, {clock(drop.closeAt)}
                {leadDays > 0 && (
                  <span className="t-small mt-1 block text-oat-muted">
                    {leadDays === 1 ? "One day" : `${leadDays} days`} before pickup, because everything is made to order.
                  </span>
                )}
              </>
            ) : (
              "Closed for this drop."
            )}
          </Fact>
        </dl>
        {state === "open" ? (
          <OrderButton position="board" className="mt-6 w-full md:w-auto" />
        ) : (
          <OrderButton position="board" label="See Hotplate" className="mt-6 w-full md:w-auto" />
        )}
      </div>
    </div>
  );
}

/* ---------- How it works ---------- */

export function Steps({ drops }: { drops: ResolvedDrop[] }) {
  const now = useNow();
  const drop = currentDrop(drops, now);
  const open = drop && stateOf(drop, now) === "open";
  const leadDays = drop ? Math.round((drop.pickupStart - drop.closeAt) / 86_400_000) : 0;

  const steps = [
    {
      title: "Order on Hotplate",
      body: open
        ? `Choose from this week's drop and pay on Hotplate. Orders close ${closesPhrase(drop.closeAt, now)}.`
        : "Choose from the current drop and pay on Hotplate before orders close.",
    },
    {
      title: `Pick up in ${site.location.city}`,
      body: `Come by during the pickup window${
        drop ? `, ${weekday(drop.pickupStart)} ${timeWindow(drop.pickupStart, drop.pickupEnd)}` : ""
      }. ${site.location.addressNote}`,
    },
    {
      title: "Order ahead",
      body:
        leadDays > 0
          ? `Everything is made to order, so orders close ${leadDays === 1 ? "a day" : `${leadDays} days`} before pickup. When it's sold out, it's sold out.`
          : "Everything is made to order, so orders close before each pickup. When it's sold out, it's sold out.",
    },
  ];

  return (
    <ol className="mt-10 grid gap-x-10 md:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s.title} className="grid grid-cols-[3rem_1fr] border-t-[3px] border-rye pb-8 pt-4 md:block">
          <span aria-hidden="true" className="t-h2 block text-brick md:mb-4">
            {i + 1}
          </span>
          <div>
            <h3 className="t-h3">{s.title}</h3>
            <p className="t-body mt-2 max-w-[36ch] text-rye-2">{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ---------- Holiday ---------- */

export function Holiday({ holiday, standing }: { holiday: ResolvedHoliday | null; standing: React.ReactNode }) {
  const now = useNow();
  const live = holiday && holiday.pickupEnd > now ? holiday : null;
  if (!live) return <>{standing}</>;
  const open = stateOf(live, now) === "open";

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <p className="t-label text-brick">Holiday menu</p>
        <h2 id="holiday-title" className="t-h2 mt-3">
          {live.title}
        </h2>
        {live.isSample && (
          <p className="mt-5">
            <SampleStamp className="text-brick" />
          </p>
        )}
        <dl className="mt-8 grid grid-cols-2 gap-6 border-t-[3px] border-rye pt-4">
          <div>
            <dt className="t-label text-rye-2">Order by</dt>
            <dd className="t-h3 mt-2">
              {open ? (
                <>
                  {dayDate(live.closeAt)}
                  <span className="t-small mt-1 block font-normal normal-case">{clock(live.closeAt)}</span>
                </>
              ) : (
                "Closed"
              )}
            </dd>
          </div>
          <div>
            <dt className="t-label text-rye-2">Pickup</dt>
            <dd className="t-h3 mt-2">
              {dayDate(live.pickupStart)}
              <span className="t-small mt-1 block font-normal normal-case">{timeWindow(live.pickupStart, live.pickupEnd)}</span>
            </dd>
          </div>
        </dl>
        {open && <OrderButton position="holiday" className="mt-8" />}
      </div>
      <ul className="lg:col-span-5 lg:col-start-8">
        {[...live.lines.map((l) => ({ name: l.name, variant: l.variant, price: l.price, description: "" })),
          ...live.specials.map((s) => ({ name: s.name, variant: "", price: s.price, description: s.description }))].map((l) => (
          <li key={l.name + l.variant} className="flex items-baseline justify-between gap-4 border-b border-rye/25 py-3">
            <span>
              <span className="t-h3">{l.name}</span>
              {l.variant && <span className="t-label ml-2 whitespace-nowrap text-rye-2">{l.variant}</span>}
              {l.description && <span className="t-small mt-1 block text-rye-2">{l.description}</span>}
            </span>
            <span className="tnum shrink-0">
              {l.price === null ? (
                <span className="t-label text-rye-2">Price on Hotplate</span>
              ) : (
                <span className="t-h3 text-brick">{money(l.price)}</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Mobile sticky order bar ---------- */

export function StickyOrderBar({ drops }: { drops: ResolvedDrop[] }) {
  const now = useNow();
  const [show, setShow] = useState(false);
  const raf = useRef(0);

  useEffect(() => {
    const target = document.getElementById("hero-order");
    if (!target) return;
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() =>
        setShow(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      );
    });
    io.observe(target);
    return () => io.disconnect();
  }, []);

  const drop = currentDrop(drops, now);
  const open = drop && stateOf(drop, now) === "open";

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t-[3px] border-rye bg-butter pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 transition-transform duration-200 ease-out md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!show}
      inert={!show}
    >
      <div className="wrap flex items-center justify-between gap-4">
        <p className="t-label text-[1.0625rem] leading-tight">
          {open ? (
            <>
              Orders close
              <br />
              {closesPhrase(drop.closeAt, now)}
            </>
          ) : (
            site.shortName
          )}
        </p>
        <OrderButton position="sticky" label={open ? "Order on Hotplate" : "See Hotplate"} />
      </div>
    </div>
  );
}
