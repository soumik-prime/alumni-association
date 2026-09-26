import { ExternalLink, GraduationCap, School } from "lucide-react";
import { Profile } from "../_types/profile.types";
import { formatDegree } from "../_lib/format";

interface EducationSectionProps {
  profile: Profile;
}

export default function EducationSection({
  profile,
}: EducationSectionProps) {
  const educations = [...profile.educations].sort(
    (a, b) => (b.graduationYear ?? 0) - (a.graduationYear ?? 0),
  );

  return (
    <div className="overflow-x-auto scrollbar-none">
      <table className="w-full text-left text-sm">
        <thead className="sticky top-0 z-10 border-b border-(--neu-gray-200) bg-(--neu-gray-50) text-xs font-semibold uppercase tracking-wide text-(--neu-gray-500)">
          <tr>
            <th scope="col" className="px-4 py-3 sm:px-6">
              Degree
            </th>
            <th scope="col" className="px-4 py-3 sm:px-6">
              Field
            </th>
            <th scope="col" className="px-4 py-3 sm:px-6">
              Institution
            </th>
            <th scope="col" className="px-4 py-3 text-right sm:px-6">
              Passing Year
            </th>
          </tr>
        </thead>

        <tbody className="text-(--neu-gray-900)">
          {educations.map((education, index) => {
            const isSchool =
              education.degree === "SSC" || education.degree === "HSC";

            const Icon = isSchool ? School : GraduationCap;

            return (
              <tr
                key={`${education.degree}-${education.institution.name}-${index}`}
                className="border-b border-(--neu-gray-200) transition-colors hover:bg-(--neu-gray-50)/50"
              >
                <td className="px-4 py-3.5 font-medium sm:px-6">
                  <div className="flex items-center gap-2.5">
                    <Icon className="size-4 shrink-0 text-(--neu-gray-400)" />
                    <span>{formatDegree(education.degree)}</span>
                  </div>
                </td>

                <td className="px-4 py-3.5 text-(--neu-gray-600) sm:px-6">
                  {education.field || "—"}
                </td>

                <td className="px-4 py-3.5 text-(--neu-gray-600) sm:px-6">
                  <InstitutionLink institution={education.institution} />
                </td>

                <td className="px-4 py-3.5 text-right font-medium text-(--neu-gray-500) sm:px-6">
                  {education.graduationYear ?? "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function InstitutionLink({
  institution,
}: {
  institution: { name: string; website?: string | null };
}) {
  if (!institution.website) {
    return <span>{institution.name}</span>;
  }

  return (
    <a
      href={institution.website}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 font-medium text-(--neu-gray-900) underline decoration-(--neu-gray-300) underline-offset-2 hover:text-(--neu-green) hover:decoration-(--neu-green) transition-colors"
    >
      <span>{institution.name}</span>
      <ExternalLink className="size-3 shrink-0 text-(--neu-gray-400)" />
    </a>
  );
}