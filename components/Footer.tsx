import { site } from "@/content/site";
import { Flower } from "./Flower";
import { OrderButton } from "./OrderButton";

export function Footer() {
  return (
    <footer id="footer" className="on-dark">
      <div className="ft__mark" aria-hidden="true">
        <span className="ft__word">{site.shortName}</span>
        <Flower className="ft__flower" />
      </div>
      <div className="ft__cols">
        <nav className="ft__col" aria-label="Footer">
          <p className="t-label">The bakery</p>
          <a className="link-2" href="#this-week">This week</a>
          <a className="link-2" href="#menu">Menu</a>
          <a className="link-2" href="#holiday">Holiday</a>
          <a className="link-2" href="#how">How it works</a>
        </nav>
        <nav className="ft__col" aria-label="More">
          <p className="t-label">About</p>
          <a className="link-2" href="#story">My story</a>
          <a className="link-2" href="#faq">Questions</a>
        </nav>
        <div className="ft__col">
          <p className="t-label">Pickup</p>
          <p>
            {site.location.city}, {site.location.region}
          </p>
          <p className="t-small text-soft">{site.location.addressNote}</p>
        </div>
        <div className="ft__col">
          <p className="t-label">Order or ask</p>
          <OrderButton position="footer" tone="light" className="justify-self-start" />
          <a className="link-2" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          {site.instagram && (
            <a className="link-2" href={`https://www.instagram.com/${site.instagram}/`}>
              Instagram @{site.instagram}
            </a>
          )}
        </div>
      </div>
      {site.complianceStatement && <p className="t-small pb-6 text-soft">{site.complianceStatement}</p>}
      <div className="ft__base t-small">
        <p>
          © {new Date().getFullYear()} {site.name}, {site.location.city} · Design adapted from{" "}
          <a href="https://8b.com/" className="link-2">
            8B
          </a>
        </p>
        <a className="link-2" href="#top">
          Back to the top
        </a>
      </div>
    </footer>
  );
}
