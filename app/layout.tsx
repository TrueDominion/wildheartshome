import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@/components/Analytics";
import { site } from "@/content/site";
import "./globals.css";

// Brand fonts from Lauren's style guide, self hosted and subset (see app/fonts/README.md).
const bethEllen = localFont({
  src: "./fonts/beth-ellen.woff2",
  weight: "400",
  variable: "--font-beth-ellen",
  display: "swap",
  fallback: ["Brush Script MT", "cursive"],
});

// Lora is a variable font (400 to 700) in one file. "optional" keeps the fallback on a slow
// first visit instead of re-painting late, which protects LCP.
const lora = localFont({
  src: "./fonts/lora.woff2",
  weight: "400 700",
  variable: "--font-lora",
  display: "optional",
  fallback: ["Georgia", "serif"],
});

// Italic appears only further down (her signature line), so it is not preloaded.
const loraItalic = localFont({
  src: "./fonts/lora-italic.woff2",
  weight: "400 700",
  style: "italic",
  variable: "--font-lora-italic",
  display: "swap",
  preload: false,
  fallback: ["Georgia", "serif"],
});

const MOTION_GATE =
  "if(matchMedia('(prefers-reduced-motion: no-preference)').matches&&CSS.supports('animation-timeline: view()'))document.documentElement.setAttribute('data-live','')";

const title = `${site.name} | Organic sourdough in ${site.location.city}, ${site.location.region}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name}, baked to order in ${site.location.city}` }],
  },
  twitter: { card: "summary_large_image", title, description: site.description, images: ["/og.png"] },
};

export const viewport: Viewport = {
  themeColor: "#fde7dd",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  return (
    <html
      lang="en-US"
      className={`${bethEllen.variable} ${lora.variable} ${loraItalic.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Turns on scroll-linked motion only where it is supported and wanted. */}
        <script dangerouslySetInnerHTML={{ __html: MOTION_GATE }} />
      </head>
      <body>
        {children}
        {plausibleDomain && <Analytics domain={plausibleDomain} />}
      </body>
    </html>
  );
}
