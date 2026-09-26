import type { Institution, Profile } from "./profile";

function InstitutionLink({ institution }: { institution: Institution }) {
  if (institution.website) {
    return (
      <a
        href={institution.website}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 transition-colors hover:text-[color:var(--neu-green)] hover:decoration-[color:var(--neu-green)]"
      >
        {institution.name}
      </a>
    );
  }
  return <span className="font-medium text-slate-800">{institution.name}</span>;
}

type Props = {
  profile: Profile;
};

export function AcademicSection({ profile }: Props) {
  const previous = [
    profile.hsc_institution ? { label: "HSC", institution: profile.hsc_institution } : null,
    profile.ssc_institution ? { label: "SSC", institution: profile.ssc_institution } : null,
  ].filter((v): v is { label: string; institution: Institution } => v !== null);

  return (
    <section aria-labelledby="academic-heading" className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 id="academic-heading" className="font-[Bricolage_Grotesque] text-lg font-semibold text-slate-900">
        Academic Background
      </h2>

      <div className="mt-4 border-l-2 border-[color:var(--neu-emerald-light)] pl-4">
        <p className="font-medium text-slate-900">Netrokona University &mdash; CSE</p>
        <dl className="mt-1.5 space-y-1 text-sm text-slate-600">
          <div className="flex gap-1.5">
            <dt className="text-slate-400">Registration:</dt>
            <dd>{profile.reg_no}</dd>
          </div>
          <div className="flex gap-1.5">
            <dt className="text-slate-400">Batch / Session:</dt>
            <dd>
              {profile.batch} &middot; {profile.session}
            </dd>
          </div>
          {profile.graduation_year && (
            <div className="flex gap-1.5">
              <dt className="text-slate-400">Graduated:</dt>
              <dd>{profile.graduation_year}</dd>
            </div>
          )}
        </dl>
      </div>

      {previous.length > 0 && (
        <div className="mt-5 border-t border-slate-100 pt-4">
          <p className="text-sm text-slate-500">Previous Education</p>
          <ul className="mt-2 space-y-1.5 text-sm">
            {previous.map(({ label, institution }) => (
              <li key={label} className="flex items-baseline gap-2">
                <span className="w-9 shrink-0 text-slate-400">{label}</span>
                <InstitutionLink institution={institution} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
