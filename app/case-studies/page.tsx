import type { Metadata } from "next";
import { caseStudies, pages } from "@/content/site";
import { CaseRow, PageHead, WorkNext } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Case Studies",
  description: pages.cases.note,
  alternates: { canonical: "/case-studies/" },
};

export default function CaseStudiesPage() {
  return (
    <main id="main" className="page page--cases">
      <PageHead section="cases" {...pages.cases} />
      <section className="csx-list">
        <div className="shell">
          <ul>
            {caseStudies.map((c) => (
              <CaseRow key={c.slug} c={c} />
            ))}
          </ul>
        </div>
      </section>
      <WorkNext
        title="Featured Projects"
        note="The builds behind the numbers: Shopify and WordPress, design through launch."
        href="/work/"
        label="See the projects"
      />
    </main>
  );
}
