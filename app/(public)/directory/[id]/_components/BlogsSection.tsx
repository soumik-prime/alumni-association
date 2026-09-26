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
      <div>
        <EmptyState
          icon={PenLine}
          title="No blog posts yet"
          message="Articles this student has written will show up here."
        />
      </div>
    );
  }

  const sorted = blogs
    .slice()
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return (
    <div>

      <ul className="space-y-3">
        {sorted.map((post, i) => (
          <li
            key={`${post.title}-${i}`}
            className="rounded-(--neu-radius-lg) border border-(--neu-gray-200) bg-(--neu-white) p-4"
          >
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-start gap-1.5 text-sm font-semibold text-(--neu-gray-900) hover:text-(--neu-green)"
            >
              <span>{post.title}</span>
              <ExternalLink className="mt-0.5 size-3.5 shrink-0 text-(--neu-gray-400) group-hover:text-(--neu-green)" />
            </a>
            {post.excerpt && (
              <p className="mt-1.5 text-sm text-(--neu-gray-500)">{post.excerpt}</p>
            )}
            <p className="mt-2 text-xs text-(--neu-gray-400)">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
