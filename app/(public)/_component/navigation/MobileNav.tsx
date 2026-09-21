"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "../../_constants/navigation";
import { isActive } from "../../_lib/navigation";
import { ContactLink } from "../ContactLink";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const close = () => setOpen(false);


  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Lock background scroll + send focus into the drawer while it's open
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle navigation menu"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        className="absolute right-4 top-1/2 z-50 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center text-gray-700 transition-all duration-200 hover:bg-[#eff6f5] hover:text-[#268b81] md:hidden"
      >
        <Menu
          className={`absolute h-8 w-8 transition-all duration-200 ${
            open ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
        />
        <X
          className={`absolute h-5 w-5 transition-all duration-200 ${
            open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </button>

      {/* Backdrop — dims + blurs the page and eats every touch/click behind it */}
      <div
        aria-hidden="true"
        onClick={close}
        className={`fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <div
        id="mobile-nav-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!open}
        inert={!open}
        className={`fixed inset-y-0 right-0 z-50 flex w-[80vw] max-w-xs flex-col bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <span className="text-sm font-semibold text-gray-900">Menu</span>
          <button
            type="button"
            onClick={close}
            aria-label="Close navigation menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-[#eff6f5] hover:text-[#268b81]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
          {NAV_LINKS.map((link, i) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                ref={i === 0 ? firstLinkRef : undefined}
                href={link.href}
                role="menuitem"
                onClick={close}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-[#eff6f5] text-[#268b81]"
                    : "text-gray-700 hover:bg-gray-50 hover:text-[#268b81]"
                }`}
              >
                {active && (
                  <span className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-[#268b81]" />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gray-100 px-5 py-4">
          <ContactLink variant="compact" onClick={close} />
        </div>
      </div>
    </>
  );
}