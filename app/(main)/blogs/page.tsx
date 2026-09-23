import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Batches",
  description:
    "Explore graduating cohorts, batch highlights, and community connections from the CSE alumni network at Netrokona University.",
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12 md:py-20">
      <section className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">
          Batch history
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Celebrate every graduating batch.
        </h1>
        <p className="text-lg leading-8 text-slate-700">
          View communication between cohorts, follow graduation milestones, and keep the
          spirit of each batch alive through reunion and networking opportunities.
        </p>
      </section>
    </main>
  );
}
