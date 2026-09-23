import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Directory",
  description:
    "Browse the alumni and student directory for the Department of CSE at Netrokona University.",
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12 md:py-20">
      <section className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">
          Community directory
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Alumni and student directory.
        </h1>
        <p className="text-lg leading-8 text-slate-700">
          Search and connect with graduates, current students, and faculty members from
          the CSE department to build opportunities and encourage collaboration.
        </p>
      </section>
    </main>
  );
}
