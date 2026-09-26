import type { HigherStudy, Profile } from "./profile";

function HigherStudyItem({ study, isLast }: { study: HigherStudy; isLast: boolean }) {
  return (
    <li className="relative pl-8">
      <span
        aria-hidden="true"
        className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[color:var(--neu-green)] ring-1 ring-[color:var(--neu-emerald)]"
      />
      {!isLast && (
        <span
          aria-hidden="true"
          className="absolute left-[4.5px] top-4 h-[calc(100%+0.5rem)] w-px bg-slate-200"
        />
      )}
      <p className="font-medium text-slate-900">
        {study.degree}
        {study.field ? ` in ${study.field}` : ""}
      </p>
      {study.institution.website ? (
        <a
          href={study.institution.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-slate-600 underline decoration-slate-300 underline-offset-2 transition-colors hover:text-[color:var(--neu-green)] hover:decoration-[color:var(--neu-green)]"
        >
          {study.institution.name}
        </a>
      ) : (
        <p className="text-sm text-slate-600">{study.institution.name}</p>
      )}
      {study.graduation_year && (
        <p className="mt-0.5 text-sm text-slate-400">{study.graduation_year}</p>
      )}
    </li>
  );
}

type Props = {
  profile: Profile;
};

export function HigherStudiesSection({ profile }: Props) {
  if (profile.higher_studies.length === 0) return null;

  const sorted = [...profile.higher_studies].sort(
    (a, b) => (a.graduation_year ?? 0) - (b.graduation_year ?? 0)
  );

  return (
    <section aria-labelledby="higher-studies-heading" className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 id="higher-studies-heading" className="font-[Bricolage_Grotesque] text-lg font-semibold text-slate-900">
        Higher Studies
      </h2>
      <ul className="mt-5 space-y-6">
        {sorted.map((study, i) => (
          <HigherStudyItem key={study.id} study={study} isLast={i === sorted.length - 1} />
        ))}
      </ul>
    </section>
  );
}
