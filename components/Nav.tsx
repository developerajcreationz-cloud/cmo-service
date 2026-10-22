"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./Button";
import { site } from "@/content/site";

const links = [
  { href: "/work/", label: "Work", target: "work" },
  { href: "/case-studies/", label: "Case Studies", target: "cases" },
  { href: "/#about", label: "About", target: "about" },
];

export function Nav() {
  const pathname = usePathname();
  // "About" is the home page's #about section, so it is current on "/".
  const isCurrent = (href: string) => (href === "/#about" ? pathname === "/" : pathname === href);

  return (
    <header className="nav" data-nav>
      <div className="nav__inner shell shell--wide">
        <Link className="nav__mark" href="/" data-cursor-hover aria-label={`${site.name}, home`}>
          <span className="nav__mark-text">{site.firstName}</span>
          <span className="nav__mark-dot">.</span>
        </Link>
        <nav className="nav__links" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              data-nav-link
              data-target={l.target}
              className={isCurrent(l.href) ? "is-current" : undefined}
              aria-current={isCurrent(l.href) ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
          <span className="nav__ind" data-nav-ind aria-hidden="true" />
        </nav>
        <Button href="/fractional-cmo-services/" variant="purple" className="nav__cta">
          Fractional CMO Services
        </Button>
        <button className="nav__burger" data-burger aria-label="Menu" aria-expanded="false">
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
