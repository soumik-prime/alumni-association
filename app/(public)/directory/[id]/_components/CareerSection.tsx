import { Briefcase, ExternalLink } from "lucide-react";
import { Profile } from "../_types/profile.types";
import { formatDateRange, formatEmploymentType } from "../_lib/format";
import { EmptyState } from "./shared/SectionParts";

interface CareerSectionProps {
  profile: Profile;
}

export default function CareerSection({ profile }: CareerSectionProps) {
  const experience = profile.workExperience;

  if (experience.length === 0) {
    return (
      <EmptyState
        icon={Briefcase}
        title="No work experience on record"
        message="Roles and internships will show up here once added."
      />
    );
  }

  // Sort work experience descending (latest start date first)
  const sorted = experience
    .slice()
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

  return (
    <div className="overflow-x-auto scrollbar-none">
      <table className="w-full text-left text-sm">
        <thead className="sticky top-0 z-10 border-b border-(--neu-gray-200) bg-(--neu-gray-50) text-xs font-semibold uppercase tracking-wide text-(--neu-gray-500)">
          <tr>
            <th scope="col" className="px-4 py-3 sm:px-6">Role & Type</th>
            <th scope="col" className="px-4 py-3 sm:px-6">Company</th>
            <th scope="col" className="px-4 py-3 sm:px-6 text-right">Duration</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-(--neu-gray-200) text-(--neu-gray-900)">
          {sorted.map((role, i) => (
            <tr
              key={`${role.company.name}-${role.startDate}-${i}`}
              className="hover:bg-(--neu-gray-50)/50 transition-colors"
            >
              {/* Role & Type (includes field) */}
              <td className="px-4 py-3.5 sm:px-6 font-medium">
                <div>
                  <p className="font-semibold text-(--neu-gray-900)">{role.title}</p>
                  <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-xs text-(--neu-gray-500)">
                    <span>{formatEmploymentType(role.employmentType)}</span>
                    {role.careerField && (
                      <>
                        <span>·</span>
                        <span>{role.careerField}</span>
                      </>
                    )}
                  </div>
                </div>
              </td>

              {/* Company (with web link if available) */}
              <td className="px-4 py-3.5 sm:px-6 text-(--neu-gray-600)">
                {role.company.website ? (
                  <a
                    href={role.company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-(--neu-gray-900) underline decoration-(--neu-gray-300) underline-offset-2 hover:text-(--neu-green) hover:decoration-(--neu-green) transition-colors"
                  >
                    <span>{role.company.name}</span>
                    <ExternalLink className="size-3 shrink-0 text-(--neu-gray-400)" />
                  </a>
                ) : (
                  role.company.name
                )}
              </td>

              {/* Duration */}
              <td className="px-4 py-3.5 sm:px-6 text-right text-xs font-medium text-(--neu-gray-500) whitespace-nowrap">
                {formatDateRange(role.startDate, role.endDate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}