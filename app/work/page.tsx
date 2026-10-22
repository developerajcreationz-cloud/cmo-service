import type { Metadata } from "next";
import { pages, projects } from "@/content/site";
import { PageHead, ProjectGrid, WorkNext } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Work",
  description: pages.work.note,
  alternates: { canonical: "/work/" },
};

export default function WorkPage() {
  return (
    <main id="main" className="page page--work">
      <PageHead section="work" {...pages.work} />
      <section className="work work--index">
        <div className="shell">
          <ProjectGrid projects={projects} />
        </div>
      </section>
      <WorkNext
        title="Case Studies"
        note="The full strategy, execution and outcomes behind our engagements."
        href="/case-studies/"
        label="All case studies"
      />
    </main>
  );
}
