import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Statistics",
  description:
    "Review alumni and academic statistics for the Department of CSE at Netrokona University.",
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12 md:py-20">
      <section className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">
          Community insights
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          School, batch, and alumni statistics.
        </h1>
        <p className="text-lg leading-8 text-slate-700">
          Explore key trends, academic milestones, and program insights that reflect the
          growth and impact of the CSE alumni network at Netrokona University.
        </p>
      </section>
    </main>
  );
}
