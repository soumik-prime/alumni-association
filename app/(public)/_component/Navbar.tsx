"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/directory", label: "Students & Alumni" },
  { href: "/batches", label: "Batches" },
  { href: "/statistics", label: "Statistics" },
  { href: "/publications", label: "Publications" },
  { href: "/about", label: "About" },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Desktop nav — visible md and up */}
        <nav
          aria-label="Main"
          className="hidden md:flex md:items-center md:gap-1"
        >
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className="relative rounded-md px-3.5 py-2 text-sm font-medium transition-colors duration-150"
                style={{ color: active ? "var(--neu-green)" : "#475569" }}
              >
                {link.label}
                {active && (
                  <span
                    className="absolute inset-x-3.5 -bottom-[1px] h-[2px] rounded-full"
                    style={{ backgroundColor: "var(--neu-emerald)" }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile toggle — visible below md, ALWAYS rendered regardless of open state */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md md:hidden"
          style={{ color: "var(--neu-green)" }}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu panel — only exists in the DOM while open, so nothing to fight with */}
      {open && (
        <nav
          aria-label="Main"
          className="border-t md:hidden"
          style={{ borderColor: "var(--neu-emerald-light)" }}
        >
          <div className="flex flex-col gap-1 px-4 py-3">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium"
                  style={
                    active
                      ? {
                          color: "var(--neu-green)",
                          backgroundColor: "var(--neu-emerald-light)",
                        }
                      : { color: "#475569" }
                  }
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{
                      backgroundColor: active
                        ? "var(--neu-emerald)"
                        : "transparent",
                    }}
                  />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
