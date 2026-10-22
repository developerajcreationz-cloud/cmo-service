import Link from "next/link";
import type { ReactNode } from "react";
import { site, type Project, type CaseStudy } from "@/content/site";
import { ArrowUpRight } from "./Icons";

const live = site.detailPagesLive;

/** Links to a detail page only once those pages exist. */
function MaybeLink({ href, className, children, label }: { href: string; className: string; children: ReactNode; label?: string }) {
  return live ? (
    <Link className={className} href={href} aria-label={label}>
      {children}
    </Link>
  ) : (
    <div className={className}>{children}</div>
  );
}

export function ProjectCard({ p }: { p: Project }) {
  const cursorProps = live ? { "data-cursor-project": "" } : {};
  return (
    <li className="card" data-card {...cursorProps}>
      <MaybeLink href={`/work/${p.slug}/`} className="card__media" label={`${p.title}: ${p.kind}`}>
        <span className="card__mat" style={{ ["--mat" as string]: p.mat }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt="" width={1108} height={984} loading="lazy" data-card-img />
      </MaybeLink>
      <div className="card__meta">
        <h3 className="card__title">{live ? <Link href={`/work/${p.slug}/`}>{p.title}</Link> : p.title}</h3>
        <p className="card__kind">{p.kind}</p>
      </div>
    </li>
  );
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <ul className="work__grid">
      {projects.map((p) => (
        <ProjectCard key={p.slug} p={p} />
      ))}
    </ul>
  );
}

/** One row of the /case-studies/ index. */
export function CaseRow({ c }: { c: CaseStudy }) {
  const cursorProps = live ? { "data-cursor-project": "" } : {};
  const inner = (
    <>
      <div className="csx__panel">
        <p className="csx__tag">{c.tag}</p>
        <h2 className="csx__name">{c.name}</h2>
        {c.stats && (
          <ul className="csx__stats">
            {c.stats.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        )}
        {c.challenge && <p className="csx__challenge">{c.challenge}</p>}
        {live && (
          <span className="csx__go">
            Read the case study <ArrowUpRight />
          </span>
        )}
      </div>
      <div className="csx__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={c.image} alt="" loading="lazy" data-csx-img />
      </div>
    </>
  );
  return (
    <li className="csx" data-csx {...cursorProps}>
      {live ? (
        <Link className="csx__inner" href={`/case-studies/${c.slug}/`}>
          {inner}
        </Link>
      ) : (
        <div className="csx__inner">{inner}</div>
      )}
    </li>
  );
}

/** Slide inside the home page case-study carousel. */
export function CaseSlide({ c, active }: { c: CaseStudy; active: boolean }) {
  return (
    <article className={`case${active ? " is-active" : ""}`} data-case>
      <div className="case__panel">
        <div className="case__panel-copy">
          <p className="case__tag">{c.tag}</p>
          <h3 className="case__name">{c.name}</h3>
          {c.stats && (
            <ul className="case__stats">
              {c.stats.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          )}
          {live && (
            <div className="case__pills">
              <Link className="case__pill" href={`/case-studies/${c.slug}/`}>
                Read the case study
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="case__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={c.image} alt="" width={1500} height={1002} loading="lazy" data-case-img />
      </div>
    </article>
  );
}

/** Heading + CTA strip at the bottom of the two index pages. */
export function WorkNext({ title, note, href, label }: { title: string; note: string; href: string; label: string }) {
  return (
    <section className="worknext">
      <div className="shell worknext__inner">
        <div>
          <h2 className="h2" data-split>
            {title}
          </h2>
          <p className="section-head__note">{note}</p>
        </div>
        <Link className="btn btn--secondary" href={href} data-magnetic="" data-cursor-hover="">
          <span className="btn__label">
            <span>{label}</span>
            <span aria-hidden="true">{label}</span>
          </span>
          <ArrowUpRight />
        </Link>
      </div>
    </section>
  );
}

export function PageHead({ eyebrow, title, note, section }: { eyebrow: string; title: string; note: string; section: string }) {
  return (
    <section className="pagehead" data-section={section}>
      <span className="pagehead__glow" aria-hidden="true" />
      <div className="shell">
        <p className="pagehead__eyebrow" data-split-words>
          {eyebrow}
        </p>
        <h1 className="pagehead__title" data-split>
          {title}
        </h1>
        <p className="pagehead__note">{note}</p>
      </div>
    </section>
  );
}
