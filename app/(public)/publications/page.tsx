import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Read about academic contributions, research work, and publication highlights from the CSE community at Netrokona University.",
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12 md:py-20">
      <section className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">
          Research & achievements
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Discover publications and academic milestones.
        </h1>
        <p className="text-lg leading-8 text-slate-700">
          Showcase publications, research activity, and notable work from alumni and
          faculty to highlight the academic excellence of the Department of CSE.
        </p>
      </section>
    </main>
  );
}
