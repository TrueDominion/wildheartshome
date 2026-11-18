import { HeroDrop, Holiday, StickyOrderBar, Steps, ThisWeek } from "@/components/DropAware";
import { Faq } from "@/components/Faq";
import { Flower } from "@/components/Flower";
import { Footer } from "@/components/Footer";
import { MenuBench } from "@/components/MenuBench";
import { Motion } from "@/components/Motion";
import { Nav } from "@/components/Nav";
import { NowProvider } from "@/components/Now";
import { OrderButton } from "@/components/OrderButton";
import { PhotoSlot } from "@/components/PhotoSlot";
import { menu } from "@/content/menu";
import { site } from "@/content/site";
import type { Photo } from "@/content/types";
import { resolvedDrops, resolvedHoliday } from "@/lib/drops";
import { orderUrl } from "@/lib/order";

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: site.name,
    url: site.url,
    email: site.email,
    description: site.description,
    image: `${site.url}/og.png`,
    // City level only. This is a home business; the street address is never published.
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      addressCountry: "US",
    },
    areaServed: `${site.location.city}, ${site.location.region}`,
    sameAs: [site.hotplateUrl, ...(site.instagram ? [`https://www.instagram.com/${site.instagram}/`] : [])],
    potentialAction: { "@type": "OrderAction", target: site.hotplateUrl },
  };
}


/** The peach panel with her flower, shown wherever a photo has not been taken yet. */
function ArtPanel({ photo, label, priority = false }: { photo: Photo; label: string; priority?: boolean }) {
  return (
    <div className="op__art" role="img" aria-label={`Photo to come: ${photo.alt}`}>
      <Flower className="op__art-flower" priority={priority} />
      <span className="op__art-note t-label" aria-hidden="true">
        {label} · photo to come · shot {String(photo.shot).padStart(2, "0")}
      </span>
    </div>
  );
}

export default function Home() {
  const builtAt = Date.now();
  const rows = menu.flatMap((c) => c.items.map((item) => ({ ...item, category: c.name })));
  const wm = site.hero.wordmark;
  return (
    <NowProvider initial={builtAt}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }} />
      <a
        href="#main"
        className="t-label sr-only z-[70] bg-dark px-4 py-3 text-light focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Nav />

      <main id="main">
        {/* Opening: width filling wordmark, then a dark band rising as a dome */}
        <section id="top" aria-labelledby="hero-title">
          <div id="opening">
            <div className="op__hold">
              <div className="op__top">
                <h1 id="hero-title" className="op__mark t-mark" style={{ ["--len" as string]: 11 }}>
                  <span className="op__w">
                    <span className="op__word">{wm.first}</span>
                  </span>{" "}
                  <span className="op__and">{wm.script}</span>{" "}
                  <span className="op__w op__line2">
                    <span className="op__word">{wm.second}</span>
                  </span>
                </h1>
                <div className="op__tag grid gap-3">
                  <p className="t-label">{site.hero.eyebrow}</p>
                  <p className="t-h4">{site.hero.tagline}</p>
                  <p className="max-w-[40ch]">{site.hero.lede}</p>
                </div>
                <div className="op__right">
                  <HeroDrop drops={resolvedDrops} />
                  <div className="op__actions">
                    <OrderButton id="hero-order" position="hero" />
                    <a className="link" href="#this-week">
                      See this week
                    </a>
                  </div>
                </div>
              </div>
              <div className="op__photo">
                {site.hero.photo.src ? (
                  <PhotoSlot photo={site.hero.photo} sizes="100vw" priority />
                ) : (
                  <ArtPanel photo={site.hero.photo} label="Hero" priority />
                )}
              </div>
            </div>
            <div className="op__night on-dark">
              <p className="t-label">{site.night.label}</p>
              <p className="op__statement">{site.night.statement}</p>
              <p
                className="op__ribbon t-script ribbon-move"
                aria-hidden="true"
                style={{ ["--len" as string]: site.night.ribbon.length }}
              >
                {site.night.ribbon}
              </p>
              <p className="t-label">
                {site.location.city}, {site.location.region}
              </p>
            </div>
          </div>
        </section>

        {/* This week's drop */}
        <section id="this-week" className="sec" aria-labelledby="this-week-title">
          <ThisWeek drops={resolvedDrops} />
        </section>

        {/* Menu: rows beside a held frame */}
        <section id="menu" className="sec border-t border-dark/15" aria-labelledby="menu-title">
          <header className="bench__head">
            <p className="t-label">{site.footerLine}</p>
            <h2 id="menu-title" className="t-h2" data-motion="lift">
              The menu
            </h2>
            <p className="head__intro">{site.sections.menuIntro}</p>
          </header>
          <MenuBench rows={rows} />
        </section>

        {/* Holiday band */}
        <section id="holiday" className="sec" aria-labelledby="holiday-title">
          <Holiday holiday={resolvedHoliday} />
        </section>

        {/* How it works */}
        <section id="how" aria-labelledby="how-title">
          <div className="head sec !pb-[clamp(36px,5vw,64px)]">
            <p className="t-label">Ordering</p>
            <h2 id="how-title" className="t-h2" data-motion="lift">
              How it works
            </h2>
            <p className="head__intro">{site.sections.howIntro}</p>
          </div>
          <Steps drops={resolvedDrops} />
        </section>

        {/* Her story: a letter beside her photo */}
        <section id="story" className="sec on-dark" aria-labelledby="story-title">
          <p
            className="t-script ribbon-move pb-6 text-center"
            aria-hidden="true"
            style={{ ["--len" as string]: site.story.heading.length }}
          >
            {site.story.heading.toLowerCase()}
          </p>
          <article className="nt__feature">
            <div className="nt__frame">
              {site.story.photo.src ? (
                <PhotoSlot photo={site.story.photo} ratio="3 / 4" sizes="(min-width: 768px) 40vw, 100vw" />
              ) : (
                <div className="relative aspect-[4/3] md:aspect-[3/4]">
                  <ArtPanel photo={site.story.photo} label="Portrait" />
                </div>
              )}
            </div>
            <div className="nt__letter surface">
              <h2 id="story-title" className="t-label">
                {site.story.heading}
              </h2>
              <p className="nt__q">{site.story.signatureLine}</p>
              {site.story.paragraphs.map((p) => (
                <p key={p.slice(0, 20)} className="nt__a">
                  {p}
                </p>
              ))}
              <p className="nt__sign">{site.story.signedAs}</p>
            </div>
          </article>
        </section>

        <Faq />

        {/* Closing card over the stall photo */}
        <section id="order" aria-labelledby="order-title">
          <div className="ct__room">
            {site.stallPhoto.src ? (
              <PhotoSlot photo={site.stallPhoto} sizes="100vw" />
            ) : (
              <ArtPanel photo={site.stallPhoto} label="Pickup table" />
            )}
          </div>
          <div className="ct__card surface">
            <div className="ct__main">
              <p className="t-label">Order</p>
              <h2 id="order-title" className="t-h2">
                {site.closing.heading}
              </h2>
              <p>{site.sections.closingNote}</p>
              <OrderButton position="closing" />
            </div>
            <dl className="ct__info">
              <div>
                <dt className="t-label">Pickup</dt>
                <dd>
                  {site.location.city}, {site.location.region}
                  <span className="t-small block">{site.location.addressNote}</span>
                </dd>
              </div>
              <div>
                <dt className="t-label">Order</dt>
                <dd>
                  <a className="link" href={orderUrl("closing")} data-order="closing">
                    Hotplate storefront
                  </a>
                </dd>
              </div>
              <div>
                <dt className="t-label">Questions</dt>
                <dd>
                  <a className="link break-all" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </main>

      <Footer />
      <StickyOrderBar drops={resolvedDrops} />
      <Motion />
    </NowProvider>
  );
}
