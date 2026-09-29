import type { ReactNode } from "react";

const TONES = {
  green: "bg-emerald-100 text-emerald-800 border-emerald-200/60",
  gold: "bg-amber-100 text-amber-800 border-amber-200/60",
  line: "bg-white text-slate-600 border-slate-200",
};

export function Badge({ children, tone }: { children: ReactNode; tone: keyof typeof TONES }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${TONES[tone]}`}>
      {children}
    </span>
  );
}
