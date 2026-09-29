import { glass, wrap } from "../../_constants/styles";

export function FeaturedSectionSkeleton() {
  return (
    <section className={`${wrap} relative z-10 py-16`} aria-hidden>
      <div className="mx-auto mb-10 max-w-2xl animate-pulse space-y-3">
        <div className="mx-auto h-9 w-3/4 rounded bg-slate-200/70" />
        <div className="mx-auto h-4 w-2/3 rounded bg-slate-200/70" />
      </div>
      <div className="flex gap-5 overflow-hidden pb-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className={`${glass} flex h-[320px] w-[300px] shrink-0 animate-pulse flex-col p-6`}>
            <div className="flex items-center gap-3">
              <span className="h-14 w-14 rounded-full bg-emerald-100" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 rounded bg-slate-200/70" />
                <div className="h-3 w-1/2 rounded bg-slate-200/70" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-3 w-2/3 rounded bg-slate-200/70" />
              <div className="h-3 w-1/2 rounded bg-slate-200/70" />
            </div>
            <div className="mt-4 flex-1 space-y-2">
              <div className="h-3 w-full rounded bg-slate-200/70" />
              <div className="h-3 w-full rounded bg-slate-200/70" />
              <div className="h-3 w-3/4 rounded bg-slate-200/70" />
            </div>
            <div className="h-5 w-16 rounded-full bg-slate-200/70" />
          </div>
        ))}
      </div>
    </section>
  );
}
