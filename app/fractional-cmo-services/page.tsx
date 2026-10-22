import type { Metadata } from "next";
import Link from "next/link";
import { fcmo, site } from "@/content/site";
import { Button } from "@/components/Button";
import { ArrowLeft, CheckMark, Close, External, OwnIcon, PlayMark } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Fractional CMO Services",
  description: fcmo.title,
  alternates: { canonical: "/fractional-cmo-services/" },
};

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="bullets">
      {items.map((t) => (
        <li key={t} data-bullet>
          <PlayMark />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export default function FractionalCmoPage() {
  return (
    <main id="main" className="page page--sheet page--fcmo">
      <div className="sheet sheet--wide" data-sheet>
        <div className="sheet__backdrop" aria-hidden="true">
          <span className="sheet__shot" />
          <span className="sheet__dim" />
        </div>

        <div className="sheet__card" data-sheet-card>
          <div className="sheet__controls">
            <Link className="btn btn--secondary sheet__back" href="/" data-sheet-back="" data-cursor-hover="">
              <ArrowLeft />
              <span className="btn__label">
                <span>Back</span>
                <span aria-hidden="true">Back</span>
              </span>
            </Link>
            <Link className="sheet__close" href="/" aria-label="Close and return home" data-cursor-hover="">
              <Close />
            </Link>
          </div>

          <header className="fc__hero">
            <span className="fc__halo" aria-hidden="true" />
            <div className="fc__portrait" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/ahmad-jan.webp" alt="" width={1000} height={1333} data-fc-photo />
            </div>

            <div className="fc__copy">
              <p className="fc__eyebrow" data-split-words>{fcmo.eyebrow}</p>
              <h1 className="fc__title" data-split>{fcmo.title}</h1>
              {fcmo.paras.map((p) => (
                <p key={p.slice(0, 24)} className="fc__para">{p}</p>
              ))}
              <p className="fc__emphasis">{fcmo.emphasis}</p>
            </div>

            <ul className="fc__stats" data-fc-stats>
              {fcmo.stats.map((s) => (
                <li key={s.label}>
                  <b>{s.value}</b>
                  <span>{s.label}</span>
                </li>
              ))}
            </ul>
          </header>

          <section className="fc__panels">
            <article className="fc__panel" data-panel>
              <h2 className="fc__panel-title">{fcmo.highlightsTitle}</h2>
              <Bullets items={fcmo.highlights} />
            </article>
            <article className="fc__panel" data-panel>
              <h2 className="fc__panel-title">{fcmo.achievementsTitle}</h2>
              <Bullets items={fcmo.achievements} />
              <ul className="fc__logos" aria-label="Brands and organizations worked with">
                {fcmo.logos.map((l) => (
                  <li key={l} data-logo>{l}</li>
                ))}
              </ul>
            </article>
          </section>

          <section className="fc__own">
            <h2 className="h2 fc__own-title" data-split>{fcmo.ownTitle}</h2>
            <ul className="fc__owngrid">
              {fcmo.own.map((o) => (
                <li key={o.name} className="fc__owncell" data-owncell>
                  <OwnIcon name={o.icon} />
                  <h3 className="fc__ownname">{o.name}</h3>
                  <p className="fc__ownbody">{o.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="fc__how" data-how>
            <div className="fc__how-bg" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/fcmo-band.svg" alt="" loading="lazy" data-how-bg />
              <span className="fc__how-veil" />
              <span className="fc__how-warm" />
            </div>
            <div className="fc__how-stage">
              <div className="fc__how-inner">
                <h2 className="h2" data-split>{fcmo.howTitle}</h2>
                <div className="fc__how-body">
                  {fcmo.how.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>
              </div>
              <div className="fc__how-photo" data-how-photo>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/img/fcmo-handshake.svg" alt="" loading="lazy" />
              </div>
            </div>
          </section>

          <section className="fc__fit">
            <div className="fc__fit-head">
              <p className="fc__eyebrow" data-split-words>{fcmo.fitEyebrow}</p>
              <h2 className="h2" data-split>{fcmo.fitTitle}</h2>
            </div>
            <ul className="fc__fitlist" data-fitlist>
              {fcmo.fit.map((t) => (
                <li key={t} data-fititem>
                  <CheckMark />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="fc__diff">
            <h2 className="h2" data-split>{fcmo.diffTitle}</h2>
            <div className="fc__diff-cols">
              <p>{fcmo.diff[0]}</p>
              <p className="fc__diff-strong">{fcmo.diff[1]}</p>
            </div>
            <span className="fc__diff-rule" data-rule2 aria-hidden="true" />
          </section>

          <section className="fc__close">
            <div className="resultcard resultcard--center" data-resultcard>
              <span className="resultcard__glow" aria-hidden="true" />
              <p className="fc__closetext" data-cta-statement>{fcmo.close}</p>
              <Button href={site.cta.href} variant="purple" external icon={<External />}>{site.cta.label}</Button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
