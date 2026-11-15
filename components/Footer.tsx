import { site } from "@/content/site";
import { OrderButton } from "./OrderButton";

export function Footer() {
  return (
    <footer className="on-rye bg-rye pb-28 pt-16 text-oat md:pb-16">
      <div className="wrap grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="t-h2 text-butter">
            Wild Hearts
            <br />
            Home Bakery
          </p>
          <p className="t-body mt-4 text-oat-muted">{site.footerLine}</p>
          <p className="t-body mt-1 text-oat-muted">
            {site.location.city}, {site.location.region}
          </p>
        </div>
        <ul className="t-body space-y-3 md:col-span-4 md:col-start-7">
          <li>
            <OrderButton position="footer" />
          </li>
          <li>
            Questions?{" "}
            <a href={`mailto:${site.email}`} className="text-oat">
              {site.email}
            </a>
          </li>
          {site.instagram && (
            <li>
              <a href={`https://www.instagram.com/${site.instagram}/`} className="text-oat">
                Instagram @{site.instagram}
              </a>
            </li>
          )}
        </ul>
        {site.complianceStatement && (
          <p className="t-small border-t border-oat/20 pt-6 text-oat-muted md:col-span-12">{site.complianceStatement}</p>
        )}
        <p className="t-small text-oat-muted md:col-span-12">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
