"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_SECTIONS } from "../_constants/navigation";
import { isActiveRoute } from "../_lib/navigation";

type SidebarNavProps = {
  /** Called after a link is clicked (closes the mobile drawer). */
  onNavigate: () => void;
  /** Items the signed-in user is allowed to see. */
  allowedHrefs: string[];
};

export default function SidebarNav({ onNavigate, allowedHrefs }: SidebarNavProps) {
  const pathname = usePathname();
  const sections = NAV_SECTIONS.map((s) => ({
    ...s,
    items: s.items.filter((i) => allowedHrefs.includes(i.href)),
  })).filter((s) => s.items.length > 0);

  return (
    <nav
      aria-label="Dashboard"
      className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 [scrollbar-color:var(--neu-gray-300)_transparent] [scrollbar-width:thin]"
    >
      {sections.map((section) => (
        <div key={section.title ?? "root"} className="mb-5 last:mb-0">
          {section.title && (
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-widest text-[var(--neu-gray-500)]">
              {section.title}
            </p>
          )}

          <ul className="space-y-1">
            {section.items.map(({ label, href, icon: Icon }) => {
              const active = isActiveRoute(pathname, href);

              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={`group relative flex items-center gap-3 rounded-[var(--neu-radius-md)] px-3 py-2.5 text-sm font-medium outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-[var(--neu-emerald)] ${
                      active
                        ? "bg-[var(--neu-emerald-light)] font-semibold text-[var(--neu-green)]"
                        : "text-[var(--neu-gray-600)] hover:bg-[var(--neu-gray-100)] hover:text-[var(--neu-gray-800)]"
                    }`}
                  >
                    {/* Active indicator bar */}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-y-2 -left-3 w-1 rounded-r-full bg-[var(--neu-emerald)] transition-opacity duration-150 ${
                        active ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <Icon
                      className={`h-[18px] w-[18px] shrink-0 transition-colors duration-150 ${
                        active
                          ? "text-[var(--neu-green)]"
                          : "text-[var(--neu-gray-500)] group-hover:text-[var(--neu-green)]"
                      }`}
                    />
                    <span className="truncate">{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}