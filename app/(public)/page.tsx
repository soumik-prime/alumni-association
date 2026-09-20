

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Join the Netrokona University CSE alumni community, explore graduate profiles, and stay connected with your department network.",
};

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12 md:py-20">
      <section className="space-y-6" aria-labelledby="hero-title">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">
          Alumni Network
        </p>
        <h1 id="hero-title" className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
          Connecting CSE graduates, students, and faculty in one community.
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-slate-700">
          The Department of CSE Alumni Association brings together graduates from
          Netrokona University to share opportunities, celebrate achievements, and
          strengthen professional connections.
        </p>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-3" aria-label="Key highlights">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Directory</h2>
          <p className="mt-3 text-slate-700">
            Discover alumni, students, and faculty profiles across multiple batches and
            departments.
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Batches</h2>
          <p className="mt-3 text-slate-700">
            Follow graduating groups and build stronger bonds within each cohort.
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Publications</h2>
          <p className="mt-3 text-slate-700">
            Highlight research, academic achievements, and professional milestones.
          </p>
        </article>
      </section>
    </main>
  );
}
