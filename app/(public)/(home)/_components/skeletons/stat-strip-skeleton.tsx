import { glass, wrap } from "../../_constants/styles";

export function StatStripSkeleton() {
  return (
    <section className={`${wrap} relative z-10 pb-16`} aria-hidden>
      <div className={`${glass} grid animate-pulse grid-cols-2 lg:grid-cols-4`}>
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="flex items-center gap-4 p-6">
            <span className="h-11 w-11 shrink-0 rounded-xl bg-emerald-100" />
            <div className="space-y-2">
              <div className="h-7 w-16 rounded bg-slate-200/70" />
              <div className="h-3 w-24 rounded bg-slate-200/70" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
