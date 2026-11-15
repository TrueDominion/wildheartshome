import { site } from "@/content/site";
import { Flower } from "./Flower";
import { OrderButton } from "./OrderButton";

export function Footer() {
  return (
    <footer className="on-ink bg-ink pb-28 pt-16 text-paper md:pb-16">
      <div className="wrap grid gap-10 md:grid-cols-12">
        <div className="flex items-start gap-5 md:col-span-6">
          <Flower className="w-16 shrink-0 md:w-20" />
          <div>
            <p className="font-script text-[2.5rem] leading-[1.35] text-peach">Wild Hearts</p>
            <p className="t-label text-lavender">Home Bakery</p>
            <p className="t-body mt-4 text-lavender">{site.footerLine}</p>
            <p className="t-body mt-1 text-lavender">
              {site.location.city}, {site.location.region}
            </p>
          </div>
        </div>
        <ul className="t-body space-y-3 md:col-span-5 md:col-start-8">
          <li>
            <OrderButton position="footer" />
          </li>
          <li>
            Questions?{" "}
            <a href={`mailto:${site.email}`} className="text-paper">
              {site.email}
            </a>
          </li>
          {site.instagram && (
            <li>
              <a href={`https://www.instagram.com/${site.instagram}/`} className="text-paper">
                Instagram @{site.instagram}
              </a>
            </li>
          )}
        </ul>
        {site.complianceStatement && (
          <p className="t-small border-t border-paper/20 pt-6 text-lavender md:col-span-12">{site.complianceStatement}</p>
        )}
        <p className="t-small text-lavender md:col-span-12">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
