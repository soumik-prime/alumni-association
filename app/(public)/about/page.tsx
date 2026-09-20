import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the CSE Alumni Association at Netrokona University and its mission to connect graduates and students.",
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12 md:py-20">
      <section className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">
          About us
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Building a stronger alumni community.
        </h1>
        <p className="text-lg leading-8 text-slate-700">
          The CSE Alumni Association connects graduates, current students, and faculty
          of the Department of Computer Science and Engineering at Netrokona University.
          Our mission is to create lasting professional relationships, support career
          development, and celebrate the achievements of our community.
        </p>
      </section>
    </main>
  );
}
