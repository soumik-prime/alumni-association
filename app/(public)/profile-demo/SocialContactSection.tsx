import type { Profile } from "./profile";
import { SocialLinks } from "./SocialLinks";

type Props = {
  profile: Profile;
};

export function SocialContactSection({ profile }: Props) {
  const hasAnyLink =
    profile.email ||
    profile.linkedin ||
    profile.github ||
    profile.google_scholar ||
    profile.portfolio ||
    profile.facebook;

  if (!hasAnyLink) return null;

  return (
    <section aria-labelledby="connect-heading" className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 id="connect-heading" className="font-[Bricolage_Grotesque] text-lg font-semibold text-slate-900">
        Connect
      </h2>
      <div className="mt-4">
        <SocialLinks profile={profile} variant="full" />
      </div>
    </section>
  );
}
