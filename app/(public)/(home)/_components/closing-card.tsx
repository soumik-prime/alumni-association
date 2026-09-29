import { Award } from "lucide-react";
import { glass, wrap } from "../_constants/styles";
import type { CommunitySample, CommunityStats } from "../_types/home.types";
import { AvatarStack } from "./avatar-stack";

type ClosingCardProps = { stats: CommunityStats; sample: CommunitySample };

export function ClosingCard({ stats, sample }: ClosingCardProps) {
  const totals = [
    { value: stats.batches, label: "Batches" },
    { value: stats.students, label: "Members" },
    { value: stats.alumni, label: "Alumni" },
  ];

  return (
    <section className={`${wrap} relative z-10 pb-24 pt-8`}>
      <div className={`${glass} relative overflow-hidden px-6 py-12 sm:px-12 lg:px-16 lg:py-16`}>
        <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-green-200/50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-emerald-300/30 blur-3xl" />


          <div className="text-center">
            <span className=" inline-flex items-center gap-2 rounded-full border border-emerald-200/30 bg-emerald-100/40 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-900 shadow-sm backdrop-blur-sm">
              <Award size={14} className="text-emerald-700" />
              CSE · Netrokona University
            </span>
            <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-emerald-800 sm:text-4xl lg:text-5xl">
              One community. Many journeys.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg mx-auto">
              From classrooms and research to careers and beyond, the CSE community continues to connect
              the people who shaped it and the stories they carry forward.
            </p>
          </div>


      </div>
    </section>
  );
}
