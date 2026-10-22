import Link from "next/link";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="foot">
      <div className="shell foot__inner">
        <Link className="foot__mark" href="/" data-cursor-hover>
          {site.firstName}
          <span>.</span>
        </Link>
        <nav className="foot__links" aria-label="Footer">
          <Link href="/work/" data-cursor-hover>Work</Link>
          <Link href="/case-studies/" data-cursor-hover>Case Studies</Link>
          <Link href="/#about" data-cursor-hover>About</Link>
          <Link href="/fractional-cmo-services/" data-cursor-hover>Fractional CMO Services</Link>
          <a href={site.cta.href} data-cursor-hover>{site.cta.label}</a>
        </nav>
        <p className="foot__note">{site.role}</p>
      </div>
    </footer>
  );
}
