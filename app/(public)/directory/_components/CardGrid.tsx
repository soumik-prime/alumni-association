import { UserX } from "lucide-react";
import { Profile } from "../_types/profile.types";
import Card from "./Card";

export interface CardGridProps {
  profiles: Profile[];
}

export default function CardGrid({ profiles }: CardGridProps) {
  if (profiles.length === 0) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-(--neu-gray-200) bg-(--neu-gray-50)/50 px-6 py-10 text-center">
        <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-white text-(--neu-gray-400) shadow-sm ring-1 ring-(--neu-gray-200)/70">
          <UserX className="size-6" strokeWidth={1.7} />
        </div>

        <h3 className="text-sm font-semibold text-(--neu-gray-800)">
          No profiles found
        </h3>

        <p className="mt-1.5 max-w-sm text-sm leading-5 text-(--neu-gray-500)">
          Try adjusting your search or filters to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3 gap-2 sm:gap-6 md:gap-4 md:justify-between lg:gap-6">
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
            href={`/directory/${profile.regNo}`}
          />
        </div>
      ))}
    </div>
  );
}
