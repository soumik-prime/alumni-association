import type { Profile } from "./profile";
import { getCurrentExperience } from "./profile-utils";

type Item = { label: string; value: string };

function buildItems(profile: Profile): Item[] {
  const current = getCurrentExperience(profile.work_experiences);
  const items: Item[] = [
    { label: "Batch", value: String(profile.batch) },
    { label: "Session", value: profile.session },
  ];

  if (profile.graduation_year) {
    items.push({ label: "Graduation Year", value: String(profile.graduation_year) });
  }
  items.push({ label: "Registration No.", value: profile.reg_no });

  if (current) {
    items.push({ label: "Industry", value: current.company.industry });
    if (current.career_field) {
      items.push({ label: "Career Field", value: current.career_field });
    }
    items.push({ label: "Employment Type", value: current.employment_type });
  }

  if (profile.present_address) {
    items.push({
      label: "Based in",
      value: `${profile.present_address.city}, ${profile.present_address.country.name}`,
    });
  }

  return items;
}

type Props = {
  profile: Profile;
};

export function ProfileOverview({ profile }: Props) {
  const items = buildItems(profile);

  return (
    <section aria-labelledby="overview-heading" className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 id="overview-heading" className="font-[Bricolage_Grotesque] text-lg font-semibold text-slate-900">
        Overview
      </h2>
      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4">
        {items.map(({ label, value }) => (
          <div key={label} className="min-w-0">
            <dt className="text-xs text-slate-400">{label}</dt>
            <dd className="mt-0.5 truncate text-sm font-medium text-slate-800" title={value}>
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
