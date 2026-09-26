import { BookOpen, ExternalLink } from "lucide-react";

import { Profile } from "../_types/profile.types";
import { EmptyState } from "./shared/SectionParts";

interface PublicationSectionProps {
  profile: Profile;
}

export default function PublicationSection({
  profile,
}: PublicationSectionProps) {
  const publications = profile.publications;

  if (publications.length === 0) {
    return (
      <EmptyState
        icon={BookOpen}
        title="No publications yet"
        message="Papers and articles this student has authored or co-authored will show up here."
      />
    );
  }

  // Sort publications by year descending (latest first)
  const sorted = publications
    .slice()
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));

  return (
    <div className="overflow-x-auto scrollbar-none">
      <table className="w-full text-left text-sm">
        <tbody className="text-(--neu-gray-900)">
          {sorted.map((pub, i) => (
            <tr
              key={`${pub.title}-${i}`}
              className="border-b border-(--neu-gray-200) transition-colors hover:bg-(--neu-gray-50)/50"
            >
              <td className="px-4 py-4 sm:px-6">
                <div>
                  {/* Title with link if available */}
                  {pub.link ? (
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-(--neu-gray-900) underline decoration-(--neu-gray-300) underline-offset-2 transition-colors hover:text-(--neu-green) hover:decoration-(--neu-green)"
                    >
                      <span>{pub.title}</span>
                      <ExternalLink className="size-3.5 shrink-0 text-(--neu-gray-400)" />
                    </a>
                  ) : (
                    <p className="font-semibold text-(--neu-gray-900)">
                      {pub.title}
                    </p>
                  )}

                  {/* Venue & Year */}
                  {(pub.venue || pub.year) && (
                    <p className="mt-1 text-xs text-(--neu-gray-500)">
                      {[pub.venue, pub.year].filter(Boolean).join(" · ")}
                    </p>
                  )}

                  {/* Co-Authors */}
                  {pub.coAuthors && pub.coAuthors.length > 0 && (
                    <p className="mt-1.5 text-xs text-(--neu-gray-400)">
                      Co-authors: {pub.coAuthors.join(", ")}
                    </p>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}