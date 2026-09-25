import Card from "./Card";
import type { DirectoryProfile } from "../_data/types";

export interface CardGridProps {
  profiles: DirectoryProfile[];
}

// No "use client" needed — this just maps data to <Card />, so it can be
// rendered on the server (see DirectoryResults.tsx).
export default function CardGrid({ profiles }: CardGridProps) {
  if (profiles.length === 0) {
    return (
      <div className="flex min-h-48 w-full items-center justify-center rounded-2xl bg-white/60 text-sm text-gray-400">
        No profiles match your filters.
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-6 md:gap-4 md:justify-between lg:gap-6">
      {profiles.map((profile) => (
        <div
          key={profile.id}
          className="flex h-full w-full items-center justify-center"
        >
          <Card
            photoUrl={profile.photoUrl}
            name={profile.name}
            status={profile.status}
            session={profile.session}
            batch={profile.batch}
            location={`${profile.city}, ${profile.country}`}
            href={`/directory/${profile.id}`}
          />
        </div>
      ))}
    </div>
  );
}
