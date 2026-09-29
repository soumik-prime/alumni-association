import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Compass, SearchX } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found | CSE Alumni Association",
  description: "The page you're looking for doesn't exist or may have moved.",
};

const glass =
  "rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-xl shadow-slate-200/50";
const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-emerald-800";
const btnSecondary =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white/70 px-5 py-3 text-sm font-bold text-emerald-900 backdrop-blur-sm transition hover:bg-white";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[calc(100vh-1px)] items-center overflow-hidden bg-linear-to-b from-green-50/45 via-emerald-50/20 to-green-50/40 px-4 py-24">
      <div className="pointer-events-none absolute -left-20 -top-24 h-96 w-96 rounded-full bg-green-200/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-96 w-96 rounded-full bg-emerald-300/15 blur-3xl" />

      <div className={`${glass} relative z-10 mx-auto w-full max-w-lg px-8 py-12 text-center sm:px-12`}>
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-emerald-100 text-emerald-700">
          <SearchX size={30} />
        </span>

        <p className="mt-6 text-sm font-bold uppercase tracking-widest text-emerald-700">404</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          The page you&apos;re looking for doesn&apos;t exist, may have been moved, or the profile
          isn&apos;t public.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className={btnPrimary}>
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <Link href="/directory" className={btnSecondary}>
            <Compass size={16} />
            Browse Directory
          </Link>
        </div>
      </div>
    </main>
  );
}