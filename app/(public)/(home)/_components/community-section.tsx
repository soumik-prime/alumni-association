import Link from "next/link";
import { ROUTES } from "../_constants/home.constants";
import { btnPrimary, glass, wrap } from "../_constants/styles";
import type { BatchSummary, CommunitySample } from "../_types/home.types";
import { AvatarStack } from "./avatar-stack";
import { SectionHead } from "./section-head";

type CommunitySectionProps = { batches: BatchSummary[]; sample: CommunitySample };

export function CommunitySection({ batches, sample }: CommunitySectionProps) {
  return (
    <section className={`${wrap} relative z-10 py-16`}>
      <SectionHead
        title="Meet the CSE Community"
        text="Three ways into the department's community, whether you are looking for a classmate, a mentor, or a whole batch."
      />
      <div className="grid gap-5 md:grid-cols-3">
        <article className={`${glass} flex flex-col items-center p-8 text-center`}>
          <AvatarStack names={sample.currentNames} alumni={false} />
          <h3 className="mt-6 text-xl font-bold text-slate-900">Current Students</h3>
          <p className="mt-2 flex-1 text-sm text-slate-600">Discover students currently studying Computer Science &amp; Engineering.</p>
          <Link href={`${ROUTES.directory}?type=current`} className={`${btnPrimary} mt-6`}>Explore Students</Link>
        </article>

        <article className={`${glass} flex flex-col items-center p-8 text-center`}>
          <AvatarStack names={sample.alumniNames} alumni />
          <h3 className="mt-6 text-xl font-bold text-slate-900">Alumni</h3>
          <p className="mt-2 flex-1 text-sm text-slate-600">Find graduates and learn about their academic and professional journeys.</p>
          <Link href={`${ROUTES.directory}?type=alumni`} className={`${btnPrimary} mt-6`}>Explore Alumni</Link>
        </article>

        <article className={`${glass} flex flex-col items-center p-8 text-center`}>
          <div className="flex flex-wrap justify-center gap-1.5">
            {batches.map((b) => (
              <span
                key={b.number}
                title={`Batch ${b.number} · ${b.session} · ${b.memberCount} members`}
                className={`grid h-9 w-9 place-items-center rounded-full text-xs font-bold ${
                  b.graduated ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
                }`}
              >
                {b.number}
              </span>
            ))}
          </div>
          <h3 className="mt-6 text-xl font-bold text-slate-900">Academic Batches</h3>
          <p className="mt-2 flex-1 text-sm text-slate-600">Explore the CSE community by academic batch.</p>
          <Link href={ROUTES.batches} className={`${btnPrimary} mt-6`}>Browse Batches</Link>
        </article>
      </div>
    </section>
  );
}
