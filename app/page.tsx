import { Board, HeroDropLine, Holiday, Steps, StickyOrderBar } from "@/components/DropAware";
import { Faq } from "@/components/Faq";
import { Flower } from "@/components/Flower";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Menu } from "@/components/Menu";
import { NowProvider } from "@/components/Now";
import { OrderButton } from "@/components/OrderButton";
import { PhotoSlot } from "@/components/PhotoSlot";
import { site } from "@/content/site";
import { resolvedDrops, resolvedHoliday } from "@/lib/drops";

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

export default function Home() {
  const builtAt = Date.now();
  return (
    <NowProvider initial={builtAt}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }} />
      <a
        href="#main"
        className="t-label sr-only z-50 bg-ink px-4 py-3 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Header />

      <main id="main">
        {/* Hero */}
        <section id="top" aria-labelledby="hero-title" className="pb-16 pt-8 md:pb-24 md:pt-14">
          <div className="wrap grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="t-label text-ink-2">{site.hero.eyebrow}</p>
              <h1 id="hero-title" className="t-display mt-4">
                <span className="sr-only">{site.name}: </span>
                {site.hero.headline[0]}{" "}
                <span className="block pl-3 text-coral-ink md:pl-10">{site.hero.headline[1]}</span>
              </h1>
              <p className="t-lede mt-6 max-w-[34ch]">{site.hero.lede}</p>
              <OrderButton id="hero-order" position="hero" className="mt-8" />
              <HeroDropLine drops={resolvedDrops} />
            </div>
            <div className="relative md:col-span-5">
              <Flower className="absolute -top-12 right-2 z-10 w-28 md:-top-16 md:-right-4 md:w-44" />
              <PhotoSlot
                photo={site.hero.photo}
                ratio="aspect-[4/5]"
                emptyRatio="aspect-[3/2] md:aspect-[4/5]"
                sizes="(min-width: 768px) 40vw, 100vw"
                priority
              />
            </div>
          </div>
        </section>

        {/* This week's drop */}
        <section id="this-week" aria-labelledby="this-week-title" className="section-pad bg-lav-tint">
          <div className="wrap">
            <Board drops={resolvedDrops} />
          </div>
        </section>

        <Menu />

        {/* Stall photo band. Collapses to a thin strip until the real photo exists. */}
        <div className="wrap pb-16">
          <PhotoSlot
            photo={site.stallPhoto}
            ratio="aspect-[21/9]"
            emptyRatio="h-18"
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="max-h-[70vh]"
          />
        </div>

        {/* Holiday */}
        <section id="holiday" aria-labelledby="holiday-title" className="section-pad bg-peach-tint">
          <div className="wrap">
            <Holiday
              holiday={resolvedHoliday}
              standing={
                <div className="max-w-[60ch]">
                  <h2 id="holiday-title" className="t-h2">
                    {site.holidayStanding.heading}
                  </h2>
                  <p className="t-lede mt-6">{site.holidayStanding.body}</p>
                  <p className="t-body mt-4 text-ink-2">{site.holidayStanding.follow}</p>
                  <OrderButton position="holiday" label="Follow on Hotplate" className="mt-8" />
                </div>
              }
            />
          </div>
        </section>

        {/* How it works */}
        <section id="how" aria-labelledby="how-title" className="section-pad">
          <div className="wrap">
            <h2 id="how-title" className="t-h2">
              How it works
            </h2>
            <Steps drops={resolvedDrops} />
          </div>
        </section>

        {/* Her story */}
        <section id="story" aria-labelledby="story-title" className="section-pad border-t-2 border-ink">
          <div className="wrap grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <PhotoSlot
                photo={site.story.photo}
                ratio="aspect-[3/4]"
                emptyRatio="aspect-[3/2] md:aspect-[3/4]"
                sizes="(min-width: 768px) 40vw, 100vw"
              />
            </div>
            <div className="md:col-span-6 md:col-start-7 md:self-center">
              <h2 id="story-title" className="t-label text-coral-ink">
                {site.story.heading}
              </h2>
              <blockquote className="t-quote mt-5 max-w-[22ch]">
                <p>{site.story.signatureLine}</p>
              </blockquote>
              {site.story.paragraphs.map((p) => (
                <p key={p.slice(0, 20)} className="t-body mt-6 max-w-[56ch]">
                  {p}
                </p>
              ))}
              <p className="mt-8 font-script text-[2.75rem] leading-[1.3] text-coral-ink">{site.story.signedAs}</p>
            </div>
          </div>
        </section>

        <Faq />

        {/* Closing */}
        <section aria-labelledby="closing-title" className="border-t-2 border-ink py-16 md:py-24">
          <div className="wrap md:flex md:items-end md:justify-between md:gap-10">
            <h2 id="closing-title" className="t-h2 md:max-w-[12ch]">
              {site.closing.heading}
            </h2>
            <OrderButton position="closing" className="mt-8 md:mt-0" />
          </div>
        </section>
      </main>

      <Footer />
      <StickyOrderBar drops={resolvedDrops} />
    </NowProvider>
  );
}
