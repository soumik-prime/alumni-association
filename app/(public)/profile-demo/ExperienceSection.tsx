import type { Profile, WorkExperience } from "./profile";
import { formatMonthYear, sortExperiencesDesc } from "./profile-utils";

function ExperienceItem({ experience, isLast }: { experience: WorkExperience; isLast: boolean }) {
  const current = !experience.end_date;

  return (
    <li className="relative pl-8">
      <span
        aria-hidden="true"
        className={`absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white ring-1 ${
          current
            ? "bg-[color:var(--neu-green)] ring-[color:var(--neu-emerald)]"
            : "bg-slate-300 ring-slate-300"
        }`}
      />
      {!isLast && (
        <span
          aria-hidden="true"
          className="absolute left-[4.5px] top-4 h-[calc(100%+1rem)] w-px bg-slate-200"
        />
      )}

      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <div>
          <p className="font-medium text-slate-900">{experience.title}</p>
          {experience.company.website ? (
            <a
              href={experience.company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-slate-700 underline decoration-slate-300 underline-offset-2 transition-colors hover:text-[color:var(--neu-green)] hover:decoration-[color:var(--neu-green)]"
            >
              {experience.company.name}
            </a>
          ) : (
            <p className="text-sm font-medium text-slate-700">{experience.company.name}</p>
          )}
        </div>
        <p className="whitespace-nowrap text-sm text-slate-500">
          {formatMonthYear(experience.start_date)} &ndash;{" "}
          {current ? (
            <span className="font-medium text-[color:var(--neu-green)]">Present</span>
          ) : (
            formatMonthYear(experience.end_date)
          )}
        </p>
      </div>

      <div className="mt-1.5 flex flex-wrap gap-1.5">
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600">
          {experience.company.industry}
        </span>
        {experience.career_field && (
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600">
            {experience.career_field}
          </span>
        )}
        <span className="rounded-full bg-[color:var(--neu-emerald-light)] px-2.5 py-0.5 text-xs text-[color:var(--neu-green)]">
          {experience.employment_type}
        </span>
      </div>
    </li>
  );
}

type Props = {
  profile: Profile;
};

export function ExperienceSection({ profile }: Props) {
  if (profile.work_experiences.length === 0) return null;

  const sorted = sortExperiencesDesc(profile.work_experiences);

  return (
    <section aria-labelledby="experience-heading" className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 id="experience-heading" className="font-[Bricolage_Grotesque] text-lg font-semibold text-slate-900">
        Professional Journey
      </h2>
      <ul className="mt-5 space-y-7">
        {sorted.map((experience, i) => (
          <ExperienceItem key={experience.id} experience={experience} isLast={i === sorted.length - 1} />
        ))}
      </ul>
    </section>
  );
}
