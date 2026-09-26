import {
  Mail,
  Code2,
  BriefcaseBusiness,
  UsersRound,
  GraduationCap,
  Globe,
  type LucideIcon,
} from "lucide-react";
import type { Profile } from "./profile";

type LinkDef = {
  label: string;
  href: string;
  icon: LucideIcon;
  external: boolean;
};

function buildLinks(profile: Profile): LinkDef[] {
  const links: LinkDef[] = [];

  if (profile.email) {
    links.push({
      label: "Email",
      href: `mailto:${profile.email}`,
      icon: Mail,
      external: false,
    });
  }
  if (profile.linkedin) {
    links.push({ label: "LinkedIn", href: profile.linkedin, icon: BriefcaseBusiness, external: true });
  }
  if (profile.github) {
    links.push({ label: "GitHub", href: profile.github, icon: Code2, external: true });
  }
  if (profile.google_scholar) {
    links.push({
      label: "Google Scholar",
      href: profile.google_scholar,
      icon: GraduationCap,
      external: true,
    });
  }
  if (profile.portfolio) {
    links.push({ label: "Portfolio", href: profile.portfolio, icon: Globe, external: true });
  }
  if (profile.facebook) {
    links.push({ label: "Facebook", href: profile.facebook, icon: UsersRound, external: true });
  }

  return links;
}

type Props = {
  profile: Profile;
  variant?: "compact" | "full";
};

/** Renders only the links that exist on the profile — never an empty/placeholder button. */
export function SocialLinks({ profile, variant = "compact" }: Props) {
  const links = buildLinks(profile);
  if (links.length === 0) return null;

  if (variant === "full") {
    return (
      <ul className="grid gap-2 sm:grid-cols-2">
        {links.map(({ label, href, icon: Icon, external }) => (
          <li key={label}>
            <a
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="flex items-center gap-3 rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-[color:var(--neu-green)] hover:text-[color:var(--neu-green)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--neu-green)]"
            >
              <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-[color:var(--neu-emerald)]" />
              {label}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
      {links.map(({ label, href, icon: Icon, external }) => (
        <a
          key={label}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          aria-label={label}
          title={label}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-[color:var(--neu-green)] hover:bg-[color:var(--neu-emerald-light)] hover:text-[color:var(--neu-green)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--neu-green)]"
        >
          <Icon aria-hidden="true" className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}
