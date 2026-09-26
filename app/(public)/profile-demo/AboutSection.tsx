import type { Profile } from "./profile";

type Props = {
  profile: Profile;
};

export function AboutSection({ profile }: Props) {
  if (!profile.bio) return null;

  return (
    <section aria-labelledby="about-heading" className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 id="about-heading" className="font-[Bricolage_Grotesque] text-lg font-semibold text-slate-900">
        About
      </h2>
      <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-slate-700">
        {profile.bio}
      </p>
    </section>
  );
}
