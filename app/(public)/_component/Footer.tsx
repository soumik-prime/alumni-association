// Suggested location: components/layout/Footer.tsx
// Requires: next, lucide-react (npm i lucide-react)
// Colors reference your global.css variables directly via inline style /
// var(--neu-...), since only bg-neu-green / bg-neu-green-hover /
// text-neu-green / border-neu-green exist as real Tailwind utilities.
// Background uses --neu-gray-900, which your own CSS comments mark as the
// footer background color.

import Link from "next/link";
import { GraduationCap, Mail } from "lucide-react";
import FacebookIcon from "./ui/FacebookIcon";
import LinkedinIcon from "./ui/LinkedinIcon";
import GithubIcon from "./ui/GithubIcon";
const EXPLORE_LINKS = [
  { href: "/directory", label: "Students & Alumni" },
  { href: "/batches", label: "Batches" },
  { href: "/statistics", label: "Statistics" },
  { href: "/publications", label: "Publications" },
  { href: "/about", label: "About" },
] as const;

const COMMUNITY_LINKS = [
  { href: "/login", label: "Login" },
  { href: "/me", label: "Update Profile" },
  { href: "mailto:alumni.cse@example.edu", label: "Contact" },
] as const;

const UNIVERSITY_LINKS = [
  { href: "/about", label: "Department of CSE" },
  { href: "https://nu.ac.bd", label: "Netrokona University", external: true },
] as const;

const SOCIALS = [
  { name: "Email", href: "mailto:alumni.cse@example.edu", icon: Mail },
  { name: "Facebook", href: "#", icon: FacebookIcon },
  { name: "LinkedIn", href: "#", icon: LinkedinIcon },
  { name: "GitHub", href: "https://github.com", icon: GithubIcon },
] as const;

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string; external?: boolean }[];
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-white">{title}</h4>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="text-sm transition-colors duration-150 [color:var(--neu-gray-300)] hover:[color:var(--neu-emerald)]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "var(--neu-gray-900)" }}>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-md"
                style={{ backgroundColor: "var(--neu-green)" }}
              >
                <GraduationCap
                  className="h-[18px] w-[18px] text-white"
                  strokeWidth={2}
                />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-semibold text-white">
                  Alumni Association
                </span>
                <span
                  className="block text-xs"
                  style={{ color: "var(--neu-gray-300)" }}
                >
                  CSE · Netrokona University
                </span>
              </span>
            </Link>
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{ color: "var(--neu-gray-300)" }}
            >
              The community platform for students and alumni of the Department
              of Computer Science &amp; Engineering.
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    s.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-md transition-colors duration-150 [background-color:var(--neu-gray-800)] [color:var(--neu-gray-300)] hover:[background-color:var(--neu-green)] hover:!text-white"
                >
                  <s.icon className="h-4 w-4" strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Explore" links={EXPLORE_LINKS} />
          <FooterColumn title="Community" links={COMMUNITY_LINKS} />
          <FooterColumn title="University" links={UNIVERSITY_LINKS} />
        </div>

        <div
          className="mt-10 border-t pt-6 text-sm"
          style={{
            borderColor: "var(--neu-gray-800)",
            color: "var(--neu-gray-500)",
          }}
        >
          © {year} Alumni Association, Department of CSE, Netrokona University
        </div>
      </div>
    </footer>
  );
}
