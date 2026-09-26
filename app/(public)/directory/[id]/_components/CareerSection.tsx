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
    .sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
    );

  return (
    <div className="overflow-x-auto scrollbar-none">
      <table className="w-full text-left text-sm">
        <thead className="sticky top-0 z-10 border-b border-(--neu-gray-200) bg-(--neu-gray-50) text-xs font-semibold uppercase tracking-wide text-(--neu-gray-500)">
          <tr>
            <th scope="col" className="px-4 py-3 sm:px-6">
              Role
            </th>
            <th scope="col" className="px-4 py-3 sm:px-6">
              Employment Type
            </th>
            <th scope="col" className="px-4 py-3 sm:px-6">
              Field
            </th>
            <th scope="col" className="px-4 py-3 sm:px-6">
              Organization
            </th>
            <th scope="col" className="px-4 py-3 text-right sm:px-6">
              Duration
            </th>
          </tr>
        </thead>

        <tbody className="text-(--neu-gray-900)">
          {sorted.map((role, i) => (
            <tr
              key={`${role.company.name}-${role.startDate}-${i}`}
              className="border-b border-(--neu-gray-200) transition-colors hover:bg-(--neu-gray-50)/50"
            >
              {/* Role */}
              <td className="px-4 py-3.5 font-semibold sm:px-6">
                {role.title}
              </td>

              {/* Employment Type */}
              <td className="px-4 py-3.5 text-(--neu-gray-600) sm:px-6">
                {formatEmploymentType(role.employmentType)}
              </td>

              {/* Career Field */}
              <td className="px-4 py-3.5 text-(--neu-gray-600) sm:px-6">
                {role.careerField || "—"}
              </td>

              {/* Company */}
              <td className="px-4 py-3.5 text-(--neu-gray-600) sm:px-6">
                {role.company.website ? (
                  <a
                    href={role.company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-(--neu-gray-900) underline decoration-(--neu-gray-300) underline-offset-2 transition-colors hover:text-(--neu-green) hover:decoration-(--neu-green)"
                  >
                    <span>{role.company.name}</span>
                    <ExternalLink className="size-3 shrink-0 text-(--neu-gray-400)" />
                  </a>
                ) : (
                  role.company.name
                )}
              </td>

              {/* Duration */}
              <td className="whitespace-nowrap px-4 py-3.5 text-right text-xs font-medium text-(--neu-gray-500) sm:px-6">
                {formatDateRange(role.startDate, role.endDate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}