"use client";

// Everything on the page that depends on today's date lives here,
// so it can be recomputed in the visitor's browser.

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { currentDrop, stateOf, type ResolvedDrop, type ResolvedHoliday } from "@/lib/drop-state";
import { money } from "@/lib/order";
import { clock, closesPhrase, dayDate, timeWindow, weekday } from "@/lib/time";
import { Flower } from "./Flower";
import { OrderButton } from "./OrderButton";
import { useNow } from "./Now";
import { Status } from "./Status";

function SampleStamp({ className = "" }: { className?: string }) {
  return (
    <span className={`stamp ${className}`}>
      Sample<span className="sr-only">: these dates are placeholders, not a real drop yet</span>
    </span>
  );
}

const leadDays = (d: ResolvedDrop) => Math.round((d.pickupStart - d.closeAt) / 86_400_000);
const longDate = (ms: number) => `${weekday(ms)}, ${dayDate(ms).split(", ")[1]}`;

/* ---------- Hero drop status ---------- */

export function HeroDrop({ drops }: { drops: ResolvedDrop[] }) {
  const now = useNow();
  const drop = currentDrop(drops, now);
  if (!drop) return null;
  const open = stateOf(drop, now) === "open";
  return (
    <div className="op__drop">
      <p className="t-label">
        {open ? "Next drop" : "Orders closed"} {drop.isSample && <SampleStamp className="ml-2 text-script-2" />}
      </p>
      <p className="t-h4">{longDate(drop.pickupStart)}</p>
      <p className="t-small">
        {open
          ? `Orders close ${closesPhrase(drop.closeAt, now)}`
          : `Pickup ${timeWindow(drop.pickupStart, drop.pickupEnd)}`}
      </p>
    </div>
  );
}

/* ---------- This week's drop ---------- */

export function ThisWeek({ drops }: { drops: ResolvedDrop[] }) {
  const now = useNow();
  const drop = currentDrop(drops, now);

  if (!drop) {
    return (
      <>
        <div className="head">
          <p className="t-label">This week&apos;s drop</p>
          <h2 id="this-week-title" className="t-h2" data-motion="lift">
            Nothing on the board right now
          </h2>
          <p className="head__intro">
            Every drop goes up on Hotplate. Follow along on Hotplate so you don&apos;t miss the next one.
          </p>
        </div>
        <OrderButton position="board" label="Follow on Hotplate" />
      </>
    );
  }

  const open = stateOf(drop, now) === "open";
  const days = leadDays(drop);
  const anyPrice = drop.lines.some((l) => l.price !== null);

  return (
    <>
      <div className="head">
        <p className="t-label">This week&apos;s drop</p>
        <h2 id="this-week-title" className="t-h2" data-motion="lift">
          Pickup {longDate(drop.pickupStart)}
        </h2>
        <div className="head__intro grid justify-items-start gap-3">
          <p>
            {open
              ? `Orders close ${closesPhrase(drop.closeAt, now)}. Everything is made to order, so when it's sold out, it's sold out.`
              : "Orders for this drop are closed. Follow along on Hotplate for the next one."}
          </p>
          {drop.isSample && <SampleStamp className="text-script-2" />}
        </div>
      </div>

      <dl className="wk__facts">
        <div>
          <dt className="t-label">Pickup</dt>
          <dd className="t-h4">
            {timeWindow(drop.pickupStart, drop.pickupEnd)}
            <span className="t-small mt-1 block normal-case">{longDate(drop.pickupStart)}</span>
          </dd>
        </div>
        <div>
          <dt className="t-label">Where</dt>
          <dd className="t-h4">
            {site.location.city}, {site.location.region}
            <span className="t-small mt-1 block normal-case">{site.location.addressNote}</span>
          </dd>
        </div>
        <div>
          <dt className="t-label">Orders close</dt>
          <dd className="t-h4">
            {open ? `${weekday(drop.closeAt)}, ${clock(drop.closeAt)}` : "Closed"}
            {open && days > 0 && (
              <span className="t-small mt-1 block normal-case">
                {days === 1 ? "One day" : `${days} days`} before pickup
              </span>
            )}
          </dd>
        </div>
      </dl>

      <div className={`wk__cols t-label ${anyPrice ? "" : "wk--noprice"}`} aria-hidden="true">
        <span>Item</span>
        <span>Option</span>
        <span>Status</span>
        {anyPrice && <span>Price</span>}
      </div>
      <ul className={anyPrice ? "" : "wk--noprice"}>
        {drop.lines.map((l) => (
          <li key={l.name + l.variant} className={`wk__row ${l.status === "sold-out" ? "wk__row--sold" : ""}`}>
            <span className="rule" aria-hidden="true" data-motion="rule" />
            <h3 className="wk__name t-h4">{l.name}</h3>
            <span className="t-small">
              {l.variant || " "}
              {l.quantity !== undefined && <span className="block">{l.quantity} baked</span>}
            </span>
            <span>{l.status !== "available" && <Status status={l.status} />}</span>
            {anyPrice && (
              <span className="tnum">
                {l.price === null ? <span className="t-small">On Hotplate</span> : <span className="t-h4">{money(l.price)}</span>}
              </span>
            )}
          </li>
        ))}
      </ul>
      <div className="wk__foot">
        <span className="rule" aria-hidden="true" data-motion="rule" />
        <p className="t-small max-w-[48ch]">
          {anyPrice ? "Checkout happens on Hotplate." : "Prices and checkout are on Hotplate."}
        </p>
        <OrderButton position="board" label={open ? "Order on Hotplate" : "See Hotplate"} />
      </div>
    </>
  );
}

/* ---------- How it works: three panels ---------- */

export function Steps({ drops }: { drops: ResolvedDrop[] }) {
  const now = useNow();
  const drop = currentDrop(drops, now);
  const open = drop && stateOf(drop, now) === "open";
  const days = drop ? leadDays(drop) : 0;

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
        days > 0
          ? `Everything is made to order, so orders close ${days === 1 ? "a day" : `${days} days`} before pickup. When it's sold out, it's sold out.`
          : "Everything is made to order, so orders close before each pickup. When it's sold out, it's sold out.",
    },
  ];

  return (
    <div className="how__run" style={{ ["--panels" as string]: steps.length }}>
      <div className="how__stage">
        <ol className="how__track">
          {steps.map((s, i) => (
            <li key={s.title} className="how__panel">
              <p className="how__num" aria-hidden="true">
                {i + 1}
              </p>
              <div className="how__copy">
                <h3 className="t-h4">
                  <span className="sr-only">Step {i + 1}: </span>
                  {s.title}
                </h3>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ---------- Holiday band ---------- */

export function Holiday({ holiday }: { holiday: ResolvedHoliday | null }) {
  const now = useNow();
  const live = holiday && holiday.pickupEnd > now ? holiday : null;

  if (!live) {
    return (
      <>
        <div className="hol__body">
          <p className="t-label">Holiday specials</p>
          <h2 id="holiday-title" className="t-h2" data-motion="lift">
            {site.holidayStanding.heading}
          </h2>
          <p className="hol__lead">{site.holidayStanding.body}</p>
          <p className="hol__lead">{site.holidayStanding.follow}</p>
          <OrderButton position="holiday" label="Follow on Hotplate" tone="light" />
        </div>
        <Flower className="hol__flower" />
      </>
    );
  }

  const open = stateOf(live, now) === "open";
  const items = [
    ...live.lines.map((l) => ({ name: l.name, variant: l.variant, price: l.price, description: "" })),
    ...live.specials.map((s) => ({ name: s.name, variant: "", price: s.price, description: s.description })),
  ];

  return (
    <>
      <div className="hol__body">
        <p className="t-label">Holiday menu {live.isSample && <SampleStamp className="ml-2" />}</p>
        <h2 id="holiday-title" className="t-h2" data-motion="lift">
          {live.title}
        </h2>
        <p className="hol__lead">{site.holidayStanding.body}</p>
        <ul className="hol__rows">
          {items.map((l) => (
            <li key={l.name + l.variant} className="hol__row">
              <span className="rule" aria-hidden="true" data-motion="rule" />
              <span>
                <span className="t-h4">{l.name}</span>
                {l.variant && <span className="t-label ml-2 whitespace-nowrap">{l.variant}</span>}
                {l.description && <span className="t-small mt-1 block">{l.description}</span>}
              </span>
              <span className="tnum t-small">{l.price === null ? "On Hotplate" : money(l.price)}</span>
            </li>
          ))}
        </ul>
        {open && <OrderButton position="holiday" tone="light" />}
      </div>
      <div className="hol__dates">
        <div>
          <span className="rule" aria-hidden="true" data-motion="rule" />
          <p className="t-label">Order by</p>
          <p className="t-h4 mt-2">{open ? dayDate(live.closeAt) : "Closed"}</p>
          {open && <p className="t-small">{clock(live.closeAt)}</p>}
        </div>
        <div>
          <span className="rule" aria-hidden="true" data-motion="rule" />
          <p className="t-label">Pickup</p>
          <p className="t-h4 mt-2">{dayDate(live.pickupStart)}</p>
          <p className="t-small">{timeWindow(live.pickupStart, live.pickupEnd)}</p>
        </div>
        <Flower className="hol__flower" />
      </div>
    </>
  );
}

/* ---------- Mobile sticky order bar ---------- */

export function StickyOrderBar({ drops }: { drops: ResolvedDrop[] }) {
  const now = useNow();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const target = document.getElementById("hero-order");
    if (!target) return;
    const io = new IntersectionObserver(([entry]) =>
      setShow(!entry.isIntersecting && entry.boundingClientRect.top < 0),
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  const drop = currentDrop(drops, now);
  const open = drop && stateOf(drop, now) === "open";

  return (
    <div className={`sticky-bar ${show ? "is-shown" : ""}`} aria-hidden={!show} inert={!show}>
      <p className="t-small leading-tight">
        {open ? (
          <>
            Orders close
            <br />
            <strong className="font-semibold">{closesPhrase(drop.closeAt, now)}</strong>
          </>
        ) : (
          site.name
        )}
      </p>
      <OrderButton
        position="sticky"
        label={open ? "Order on Hotplate" : "See Hotplate"}
        className="shrink-0 whitespace-nowrap"
      />
    </div>
  );
}
