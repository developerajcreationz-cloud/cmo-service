import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { advantage, caseStudies, closing, marquee, projects, reviews, site, stats } from "@/content/site";
import { Button } from "@/components/Button";
import { CaseSlide, ProjectGrid } from "@/components/Sections";
import { ArrowLeft, ArrowRight, ArrowUpRight, External, QuoteMark, StatIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: { absolute: `${site.name} | ${site.role}` },
  alternates: { canonical: "/" },
};

const SLATS = 6;

export default function HomePage() {
  const featured = projects.slice(0, 6);
  return (
    <>
      <div className="intro" data-intro>
        <div className="intro__ink" data-intro-ink>
          <span className="intro__glow" data-intro-glow aria-hidden="true" />
          <p className="intro__role" data-intro-role>{site.role}</p>
          <h2 className="intro__name" data-intro-name>{site.name}</h2>
          <div className="intro__meter">
            <span className="intro__count" data-intro-count>00</span>
            <span className="intro__pct" aria-hidden="true">%</span>
          </div>
          <span className="intro__rail" aria-hidden="true"><i data-intro-rail /></span>
        </div>
        <div className="intro__slats" data-intro-slats aria-hidden="true">
          {Array.from({ length: SLATS }, (_, i) => <span key={i} />)}
        </div>
      </div>

      <main id="main" className="page page--home">
        {/* hero */}
        <section className="hero" data-hero>
          <div className="hero__scene">
            <div className="hero__halo" data-halo aria-hidden="true" />
            <div className="hero__halo hero__halo--2" data-halo-2 aria-hidden="true" />
            <div className="hero__stage">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="hero__photo" data-hero-photo src="/img/hero.svg" alt={site.name} width={1024} height={1536} />
              <div className="hero__fade" aria-hidden="true" />
            </div>
          </div>
          <div className="hero__copy shell shell--wide">
            <div className="hero__lede" data-hero-lede>
              <p className="hero__desc">{site.description}</p>
              <Button href={site.cta.href} variant="primary" external icon={<External />}>{site.cta.shortLabel}</Button>
            </div>
            <div className="hero__id">
              <h1 className="hero__name" data-hero-name>{site.name}</h1>
              <span className="tag" data-hero-tag>
                <span className="tag__dot" aria-hidden="true" />
                {site.role}
              </span>
            </div>
          </div>
          <div className="hero__cue" data-hero-cue aria-hidden="true">
            <span className="hero__cue-line" />
            <span className="hero__cue-text">Scroll</span>
          </div>
        </section>

        {/* marquee: Motion duplicates the children until the track is wide enough */}
        <div className="marquee" data-marquee aria-hidden="true">
          <div className="marquee__track" data-marquee-track>
            {marquee.map((m) => (
              <Fragment key={m}>
                <span>{m}</span>
                <i>&bull;</i>
              </Fragment>
            ))}
          </div>
        </div>

        {/* featured projects */}
        <section className="work" id="work" data-section="work">
          <div className="shell">
            <header className="section-head work__head">
              <h2 className="h2" data-split>Featured Projects</h2>
            </header>
            <ProjectGrid projects={featured} />
          </div>
        </section>

        {/* reviews */}
        <section className="reviews" id="reviews" data-section="reviews">
          <div className="shell">
            <div className="reviews__inner">
              <span className="reviews__slab" data-slab aria-hidden="true" />
              <div className="reviews__intro">
                <h2 className="h2" data-split>Client Reviews</h2>
                <p className="section-head__note">Hear directly from the businesses we&rsquo;ve partnered with to design, build, and grow their digital presence.</p>
                <div className="reviews__nav">
                  <button className="arrow-btn" data-rev-prev aria-label="Previous review" data-cursor-hover=""><ArrowLeft /></button>
                  <button className="arrow-btn" data-rev-next aria-label="Next review" data-cursor-hover=""><ArrowRight /></button>
                </div>
              </div>

              <div className="reviews__card" data-rev-card>
                <QuoteMark />
                <div className="reviews__viewport">
                  {reviews.map((r, i) => (
                    <article key={i} className={`review${i === 0 ? " is-active" : ""}`} data-review>
                      <p className="review__text">{r.text}</p>
                      <footer className="review__by">
                        <span className="review__mono" aria-hidden="true">{r.name.charAt(0)}</span>
                        <span>
                          <strong>{r.name}</strong>
                          <br />
                          {r.role}
                        </span>
                        <Link className="review__link" href="/work/" aria-label="See the work">
                          <ArrowUpRight />
                        </Link>
                      </footer>
                    </article>
                  ))}
                </div>
              </div>

              <ul className="stats" data-stats>
                {stats.map((s) => (
                  <li key={s.label} className="stat" data-stat>
                    <span className="stat__text"><b data-count={s.value}>0</b>{s.suffix} {s.label}</span>
                    <span className={`stat__icon stat__icon--${s.tone}`}><StatIcon tone={s.tone} /></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* case studies carousel */}
        <section className="cases" id="cases" data-section="cases">
          <div className="shell">
            <header className="section-head">
              <h2 className="h2" data-split>Case Studies</h2>
              <p className="section-head__note">Real projects. Real results. The strategy, execution, and outcomes behind some of our most successful client engagements.</p>
            </header>
            <div className="cases__slider" data-case-frame>
              <div className="cases__card">
                <div className="cases__viewport" data-case-viewport>
                  {caseStudies.map((c, i) => (
                    <CaseSlide key={c.slug} c={c} active={i === 0} />
                  ))}
                </div>
              </div>
              <ul className="cases__dots" data-case-dots>
                {caseStudies.map((c, i) => (
                  <li key={c.slug}>
                    <button data-case-dot className={i === 0 ? "is-on" : undefined} aria-label={c.name} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* operator's advantage */}
        <section className="adv" id="about" data-section="about">
          <div className="shell">
            <header className="section-head adv__head">
              <h2 className="h2" data-split>{advantage.title}</h2>
              <p className="section-head__note">{advantage.note}</p>
            </header>
            <div className="adv__grid">
              <span className="adv__rule adv__rule--top" data-rule aria-hidden="true" />
              {advantage.cols.map((c) => (
                <article key={c.title.join()} className="adv__col" data-adv-col>
                  <span className="adv__dot" style={{ ["--dot" as string]: c.dot }} aria-hidden="true" />
                  <h3 className="adv__title">{c.title[0]}<br />{c.title[1]}</h3>
                  <p className="adv__body">{c.body}</p>
                </article>
              ))}
              <span className="adv__rule adv__rule--bottom" data-rule aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* closing cta */}
        <section className="cta" id="contact" data-section="cmo">
          <div className="cta__glow" data-cta-glow aria-hidden="true" />
          <div className="shell cta__inner">
            <p className="cta__statement" data-cta-statement>{closing.statement}</p>
            <Button href={site.cta.href} variant="purple" external icon={<External />} className="cta__btn">{site.cta.label}</Button>
          </div>
        </section>
      </main>
    </>
  );
}
