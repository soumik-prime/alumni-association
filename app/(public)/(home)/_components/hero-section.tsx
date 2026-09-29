import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { ROUTES } from "../_constants/home.constants";
import { btnPrimary, btnSecondary, wrap } from "../_constants/styles";

/** `children` is the right-hand visual (the avatar orbit). */
export function HeroSection({ children }: { children: ReactNode }) {
  return (
    <section className={`${wrap} relative z-10 pb-16 pt-16 sm:pt-24`}>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Connecting the CSE Community of Netrokona University
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Discover students, connect with alumni, and follow the academic, research, and career journeys that grow from CSE.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={ROUTES.directory} className={btnPrimary}>
              Explore Students &amp; Alumni <ArrowRight size={16} />
            </Link>
            <Link href={ROUTES.statistics} className={btnSecondary}>View Statistics</Link>
          </div>
          <p className="mt-6 flex items-center gap-2 text-sm text-slate-500">
            <ShieldCheck size={18} className="text-emerald-700" />
            A student &amp; alumni community platform for CSE, Netrokona University
          </p>
        </div>
        <div>
          {children}
          <div className="mt-4 flex justify-center gap-5 text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-emerald-600" />Current students</span>
            <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-full bg-amber-500" />Alumni</span>
          </div>
        </div>
      </div>
    </section>
  );
}
