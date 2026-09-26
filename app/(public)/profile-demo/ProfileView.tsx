import type { Profile as ProfileType } from "./profile";
import { formatUpdatedAt } from "./profile-utils";
import { ProfileHero } from "./ProfileHero";
import { ProfileOverview } from "./ProfileOverview";
import { AboutSection } from "./AboutSection";
import { AcademicSection } from "./AcademicSection";
import { HigherStudiesSection } from "./HigherStudiesSection";
import { ExperienceSection } from "./ExperienceSection";
import { PublicationsSection } from "./PublicationsSection";
import { SocialContactSection } from "./SocialContactSection";
import { AddressSection } from "./AddressSection";

type Props = {
  profile: ProfileType;
};

/**
 * Public Alumni Association profile page.
 * Purely presentational and driven entirely by `profile` — swap the
 * static example object for an API response with no changes here.
 */
export function Profile({ profile }: Props) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="flex flex-col gap-6">
        <ProfileHero profile={profile} />

        <div className="grid gap-6 md:grid-cols-2">
          <AboutSection profile={profile} />
          <ProfileOverview profile={profile} />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <AcademicSection profile={profile} />
          <SocialContactSection profile={profile} />
        </div>

        <ExperienceSection profile={profile} />
        <HigherStudiesSection profile={profile} />
        <PublicationsSection profile={profile} />

        <AddressSection profile={profile} />

        <p className="pb-2 text-center text-xs text-slate-400">
          {formatUpdatedAt(profile.updated_at)}
        </p>
      </div>
    </div>
  );
}