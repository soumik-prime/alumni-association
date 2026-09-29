"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type Tab = { label: string; href: string; exact?: boolean };

export default function UserTabs({ tabs }: { tabs: Tab[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Manage user" className="-mb-px flex gap-1 overflow-x-auto border-b border-[var(--neu-gray-200)]">
      {tabs.map((t) => {
        const active = t.exact ? pathname === t.href : pathname === t.href || pathname.startsWith(`${t.href}/`);
        return (
          <Link
            key={t.href}
            href={t.href}
            aria-current={active ? "page" : undefined}
            className={`whitespace-nowrap border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? "border-[var(--neu-green)] text-[var(--neu-green)]"
                : "border-transparent text-[var(--neu-gray-500)] hover:text-[var(--neu-gray-800)]"
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
