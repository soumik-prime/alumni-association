
import Image from "next/image";

import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  CalendarDays,
  Droplet,
  GraduationCap,
  Hash,
  Mail,
  Share2,
} from "lucide-react";

import { Profile } from "../_types/profile.types";
import { formatBloodGroup, getEnrollmentStatus } from "../_lib/format";

interface ProfileHeaderProps {
  profile: Profile;
}

function getSocialIcon(label: string) {
  const normalized = label.toLowerCase();

  if (normalized.includes("github")) {
    return (
      <svg
        className="size-4 fill-current"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    );
  }

  if (normalized.includes("linkedin")) {
    return (
      <svg
        className="size-4 fill-current"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.762 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.764.79 1.764 1.75-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    );
  }

  return <Share2 className="size-3.5" />;
}

function getSocialLinks(profile: Profile) {
  return [
    { label: "GitHub", href: profile.github },
    { label: "LinkedIn", href: profile.linkedin },
    { label: "Facebook", href: profile.facebook },
    { label: "Google Scholar", href: profile.googleScholar },
    { label: "Portfolio", href: profile.portfolio },
  ].filter(
    (link): link is { label: string; href: string } => Boolean(link.href),
  );
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const links = getSocialLinks(profile);
  const status = getEnrollmentStatus(profile.graduationYear);

  return (
    <section className="overflow-hidden p-4 lg:pt-12 lg:pb-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-stretch md:gap-6">
        {/* Profile Photo */}
        <div className="group relative mx-auto h-48 w-48 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-56 sm:w-56 md:mx-0 md:h-auto md:w-64">
          <Image
            src={profile.photo}
            alt={`Photo of ${profile.name}`}
            fill
            sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 256px"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            priority
          />

          {/* Soft edge fade */}
          <div className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_0_18px_6px_rgba(255,255,255,0.3)]" />
        </div>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col pb-2">
          {/* Name + Verification */}
          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-2">
              <h1 className="min-w-0 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {profile.name}
              </h1>

              <span
                title="Verified NEU CSE Profile"
                className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20"
              >
                <BadgeCheck className="size-4 fill-emerald-600 text-white" />
                <span>Verified</span>
              </span>
            </div>

            {/* Enrollment Status */}
            <div className="mt-2">
              <span
                className={`inline-flex items-center gap-1.5 text-sm font-medium ${
                  status.isCurrentStudent
                    ? "text-blue-700"
                    : "text-emerald-700"
                }`}
              >
                {status.isCurrentStudent ? (
                  <GraduationCap className="size-4" />
                ) : (
                  <Award className="size-4" />
                )}

                {status.label}
              </span>
            </div>
          </div>

          {/* Key Information */}
          <div className="mt-4 flex flex-wrap gap-2">
            <InfoBadge
              icon={<Hash className="size-3.5" />}
              label="Reg"
              value={profile.regNo}
            />

            <InfoBadge
              icon={<GraduationCap className="size-3.5" />}
              label="Batch"
              value={profile.batch}
            />

            <InfoBadge
              icon={<CalendarDays className="size-3.5" />}
              label="Session"
              value={profile.session}
            />

            {profile.bloodGroup && (
              <InfoBadge
                icon={<Droplet className="size-3.5 text-red-500" />}
                label="Blood"
                value={formatBloodGroup(profile.bloodGroup)}
              />
            )}
          </div>

          {/* Bio */}
          {profile.bio && (
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {profile.bio}
            </p>
          )}

          {/* Email */}
          {profile.email && (
            <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
              <Mail className="size-4 shrink-0 text-slate-400" />
              <a
                href={`mailto:${profile.email}`}
                className="truncate transition-colors hover:text-emerald-700"
              >
                {profile.email}
              </a>
            </div>
          )}

          {/* Social Links */}
          {links.length > 0 && (
            <div className="mt-2 border-t border-slate-100 pt-3">
              <div className="flex flex-wrap gap-2">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${link.label} profile`}
                    className="group inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                  >
                    {getSocialIcon(link.label)}

                    <span>{link.label}</span>

                    <ArrowUpRight className="size-3 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

interface InfoBadgeProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

function InfoBadge({ icon, label, value }: InfoBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-600">
      <span className="text-slate-400">{icon}</span>

      <span>{label}:</span>

      <strong className="font-semibold text-slate-900">{value}</strong>
    </span>
  );
}

