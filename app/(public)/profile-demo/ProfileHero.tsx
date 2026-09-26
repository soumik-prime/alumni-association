import Image from "next/image";
import type { Profile } from "./profile";
import { getCurrentExperience, initials } from "./profile-utils";
import { SocialLinks } from "./SocialLinks";

type Props = {
  profile: Profile;
};

export function ProfileHero({ profile }: Props) {
  const current = getCurrentExperience(profile.work_experiences);
  const location = profile.present_address;

  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-24 bg-[color:var(--neu-green)]/[0.06]"
      />
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-full w-1 bg-[color:var(--neu-green)]"
      />

      <div className="relative flex flex-col gap-6 p-6 sm:p-8 md:flex-row md:items-start md:gap-8">
        <div className="flex shrink-0 justify-center md:justify-start">
          {profile.photo ? (
            <Image
              src={profile.photo}
              alt={`Photo of ${profile.name}`}
              width={128}
              height={128}
              className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-sm ring-1 ring-slate-200 sm:h-32 sm:w-32"
            />
          ) : (
            <div
              aria-hidden="true"
              className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-[color:var(--neu-emerald-light)] font-[Bricolage_Grotesque] text-3xl font-semibold text-[color:var(--neu-green)] shadow-sm ring-1 ring-slate-200 sm:h-32 sm:w-32"
            >
              {initials(profile.name)}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1 text-center md:text-left">
          <h1 className="font-[Bricolage_Grotesque] text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {profile.name}
          </h1>

          <p className="mt-1.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-slate-600 md:justify-start">
            <span>CSE &middot; Batch {profile.batch}</span>
            <span className="text-slate-300">|</span>
            <span>Session {profile.session}</span>
            <span className="text-slate-300">|</span>
            <span>Reg. {profile.reg_no}</span>
          </p>

          {current && (
            <div className="mt-3">
              <p className="text-base font-medium text-slate-900">
                {current.title}
              </p>
              <p className="text-sm text-slate-600">{current.company.name}</p>
            </div>
          )}

          {location && (
            <p className="mt-2 text-sm text-slate-500">
              {location.city}, {location.country.name}
              {location.country.flag ? ` ${location.country.flag}` : ""}
            </p>
          )}

          {profile.bio && (
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-700 md:mx-0">
              {profile.bio}
            </p>
          )}

          <div className="mt-5 flex justify-center md:justify-start">
            <SocialLinks profile={profile} />
          </div>
        </div>
      </div>
    </section>
  );
}
