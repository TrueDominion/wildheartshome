import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Source_Serif_4 } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { site } from "@/content/site";
import "./globals.css";

const shoulders = Big_Shoulders({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-shoulders",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-source-serif",
  display: "swap",
});

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
  themeColor: "#efe5d2",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  return (
    <html lang="en-US" className={`${shoulders.variable} ${sourceSerif.variable}`}>
      <body>
        {children}
        {plausibleDomain && <Analytics domain={plausibleDomain} />}
      </body>
    </html>
  );
}
