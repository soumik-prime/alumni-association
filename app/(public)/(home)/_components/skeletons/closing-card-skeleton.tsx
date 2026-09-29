import { glass, wrap } from "../../_constants/styles";

export function ClosingCardSkeleton() {
  return (
    <section className={`${wrap} relative z-10 pb-24 pt-8`} aria-hidden>
      <div className={`${glass} grid animate-pulse items-center gap-10 px-6 py-12 sm:px-12 lg:grid-cols-[1.2fr_1fr] lg:px-16 lg:py-16`}>
        <div className="space-y-4">
          <div className="h-7 w-52 rounded-full bg-emerald-100" />
          <div className="h-12 w-3/4 rounded bg-slate-200/70" />
          <div className="h-4 w-full max-w-xl rounded bg-slate-200/70" />
          <div className="h-4 w-2/3 rounded bg-slate-200/70" />
        </div>
        <div className="h-56 rounded-2xl bg-white/60" />
      </div>
    </section>
  );
}
