import { BookOpen, GraduationCap, Layers, Users } from "lucide-react";
import { glass, wrap } from "../_constants/styles";
import type { CommunityStats } from "../_types/home.types";

export function StatStrip({ stats }: { stats: CommunityStats }) {
  const items = [
    { icon: Layers, value: stats.batches, label: "Academic Batches" },
    { icon: Users, value: stats.students, label: "Students" },
    { icon: BookOpen, value: stats.current, label: "Current Students" },
    { icon: GraduationCap, value: stats.alumni, label: "Alumni" },
  ];

  return (
    <section className={`${wrap} relative z-10 pb-16`}>
      <dl className={`${glass} grid grid-cols-2 lg:grid-cols-4`}>
        {items.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex items-center gap-4 p-6">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-700"><Icon size={22} /></span>
            <div>
              <dd className="text-3xl font-black tracking-tight text-emerald-800">{value}</dd>
              <dt className="text-xs font-semibold uppercase tracking-widest text-slate-400">{label}</dt>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}
