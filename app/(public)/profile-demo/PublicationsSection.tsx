import { ExternalLink } from "lucide-react";
import type { Profile, Publication } from "./profile";
import { publicationStatusLabel, publicationTypeLabel } from "./profile-utils";

function StatusBadge({ status }: { status: Publication["status"] }) {
  const styles: Record<Publication["status"], string> = {
    PUBLISHED: "bg-[color:var(--neu-emerald-light)] text-[color:var(--neu-green)]",
    UNDER_REVIEW: "bg-amber-50 text-amber-700",
    SUBMITTED: "bg-amber-50 text-amber-700",
    DRAFT: "bg-slate-100 text-slate-600",
    REJECTED: "bg-slate-100 text-slate-500",
  };

  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}>
      {publicationStatusLabel(status)}
    </span>
  );
}

function PublicationCard({ publication, ownerId }: { publication: Publication; ownerId: string }) {
  const isPublished = publication.status === "PUBLISHED";

  return (
    <li
      className={`rounded-xl border p-5 ${
        isPublished ? "border-slate-200 bg-white" : "border-slate-200 bg-slate-50/60"
      }`}
    >
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-600">
          {publicationTypeLabel(publication.type)}
        </span>
        <StatusBadge status={publication.status} />
        {publication.published_year && (
          <span className="text-xs text-slate-400">{publication.published_year}</span>
        )}
      </div>

      <h3 className={`mt-2.5 font-medium leading-snug text-slate-900 ${isPublished ? "text-[15px]" : "text-sm"}`}>
        {publication.title}
      </h3>

      {publication.venue && <p className="mt-1 text-sm italic text-slate-500">{publication.venue}</p>}

      {publication.abstract && (
        <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-slate-600">
          {publication.abstract}
        </p>
      )}

      <p className="mt-3 text-sm text-slate-600">
        {publication.authors.map((author, i) => (
          <span key={author.name}>
            <span
              className={
                author.student_id === ownerId ? "font-medium text-slate-800" : undefined
              }
            >
              {author.name}
            </span>
            {i < publication.authors.length - 1 ? ", " : ""}
          </span>
        ))}
      </p>

      {(publication.doi || publication.external_url) && (
        <a
          href={publication.external_url ?? `https://doi.org/${publication.doi}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[color:var(--neu-green)] hover:text-[color:var(--neu-green-hover)]"
        >
          {publication.doi ? "View via DOI" : "View publication"}
          <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
        </a>
      )}
    </li>
  );
}

type Props = {
  profile: Profile;
};

export function PublicationsSection({ profile }: Props) {
  if (profile.publications.length === 0) return null;

  return (
    <section aria-labelledby="publications-heading" className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 id="publications-heading" className="font-[Bricolage_Grotesque] text-lg font-semibold text-slate-900">
        Research &amp; Publications
      </h2>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2">
        {profile.publications.map((publication) => (
          <PublicationCard key={publication.id} publication={publication} ownerId={profile.reg_no} />
        ))}
      </ul>
    </section>
  );
}
