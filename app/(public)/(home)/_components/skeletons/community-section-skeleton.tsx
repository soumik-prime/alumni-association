import { glass, wrap } from "../../_constants/styles";

export function CommunitySectionSkeleton() {
  return (
    <section className={`${wrap} relative z-10 py-16`} aria-hidden>
      <div className="mx-auto mb-10 max-w-2xl animate-pulse space-y-3">
        <div className="mx-auto h-9 w-3/4 rounded bg-slate-200/70" />
        <div className="mx-auto h-4 w-full rounded bg-slate-200/70" />
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className={`${glass} flex animate-pulse flex-col items-center p-8`}>
            <div className="h-11 w-48 rounded-full bg-emerald-100" />
            <div className="mt-6 h-6 w-40 rounded bg-slate-200/70" />
            <div className="mt-3 h-4 w-56 rounded bg-slate-200/70" />
            <div className="mt-8 h-11 w-36 rounded-xl bg-emerald-100" />
          </div>
        ))}
      </div>
    </section>
  );
}
