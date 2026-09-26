import { ExternalLink, PenLine } from "lucide-react";

import { Profile } from "../_types/profile.types";
import { EmptyState } from "./shared/SectionParts";

interface BlogsSectionProps {
  profile: Profile;
}

// Profile has no `blogs` table yet (not part of the DBML schema shared for
// this project), so `profile.blogs` is optional and typically undefined.
// The section is built to render real posts the moment that field is wired up.

export default function BlogsSection({ profile }: BlogsSectionProps) {
  const blogs = profile.blogs ?? [];

  if (blogs.length === 0) {
    return (
      <EmptyState
        icon={PenLine}
        title="No blog posts yet"
        message="Articles this student has written will show up here."
      />
    );
  }

  const sorted = blogs
    .slice()
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime(),
    );

  return (
    <div className="overflow-x-auto scrollbar-none">
      <table className="w-full text-left text-sm">
        <tbody className="text-(--neu-gray-900)">
          {sorted.map((post, i) => (
            <tr
              key={`${post.title}-${i}`}
              className="border-b border-(--neu-gray-200) transition-colors hover:bg-(--neu-gray-50)/50"
            >
              <td className="px-4 py-4 sm:px-6">
                <div>
                  {/* Title */}
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-start gap-1.5 text-sm font-semibold text-(--neu-gray-900) transition-colors hover:text-(--neu-green)"
                  >
                    <span>{post.title}</span>
                    <ExternalLink className="mt-0.5 size-3.5 shrink-0 text-(--neu-gray-400) transition-colors group-hover:text-(--neu-green)" />
                  </a>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="mt-1.5 text-sm text-(--neu-gray-500)">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Published Date */}
                  <p className="mt-2 text-xs text-(--neu-gray-400)">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}