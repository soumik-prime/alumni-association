"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, X } from "lucide-react";
import SidebarNav from "./SidebarNav";
import Image from "next/image";

type DashboardSidebarProps = {
  allowedHrefs: string[];
  user: { name: string; email: string };
  /** Mobile drawer state. Ignored on lg+ where the sidebar is always visible. */
  open: boolean;
  onClose: () => void;
};

export default function DashboardSidebar({ open, onClose, allowedHrefs, user }: DashboardSidebarProps) {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  async function signOut() {
    setSigningOut(true);
    try {
      await fetch("/api/auth/sign-out", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      });
    } finally {
      router.replace("/auth/login");
      router.refresh();
    }
  }

  // Close the drawer with Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop (mobile only) */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-[2px] transition-opacity duration-200 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        aria-label="Dashboard sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-72 max-w-[85vw] flex-col border-r border-[var(--neu-gray-200)] bg-[var(--neu-white)] shadow-xl transition-[transform,visibility] duration-200 ease-out lg:visible lg:static lg:z-auto lg:w-64 lg:max-w-none lg:shrink-0 lg:translate-x-0 lg:shadow-none ${
          open ? "visible translate-x-0" : "invisible -translate-x-full"
        }`}
      >
        {/* 1. Fixed branding */}
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-[var(--neu-gray-200)] px-3 py-4">
          <Link
            href="/"
            onClick={onClose}
            className="group flex min-w-0 flex-1 items-center gap-3 rounded-[var(--neu-radius-md)] px-2 py-1.5 outline-none transition-colors hover:bg-[var(--neu-gray-50)] focus-visible:ring-2 focus-visible:ring-[var(--neu-emerald)]"
          >
            {/* TODO: swap for the project's logo asset (e.g. next/image). */}
            {/* <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--neu-radius-md)] bg-[var(--neu-green)] text-xs font-bold tracking-wide text-white shadow-[var(--neu-shadow-lg)] transition-colors group-hover:bg-[var(--neu-green-hover)]">
              NEU
            </span> */}
            <span className="flex h-10 w-10 shrink-0 items-center justify-center">
              <Image src={'/logo.png'} width={30} height={30} alt="logo"/>
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-sm font-bold text-[var(--neu-gray-800)]">
                CSE Alumni Association
              </span>
              <span className="mt-0.5 block truncate text-xs font-medium text-[var(--neu-green)]">
                Netrokona University
              </span>
            </span>
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[var(--neu-gray-500)] outline-none transition-colors hover:bg-[var(--neu-gray-100)] hover:text-[var(--neu-gray-800)] focus-visible:ring-2 focus-visible:ring-[var(--neu-emerald)] lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* 2. Scrollable navigation */}
        <SidebarNav onNavigate={onClose} allowedHrefs={allowedHrefs} />

        {/* 3. Fixed sign out */}
        <div className="shrink-0 border-t border-[var(--neu-gray-200)] p-3">
          <div className="mb-2 min-w-0 px-3">
            <p className="truncate text-sm font-semibold text-[var(--neu-gray-800)]">{user.name}</p>
            <p className="truncate text-xs text-[var(--neu-gray-500)]">{user.email}</p>
          </div>
          <button
            type="button"
            onClick={signOut}
            disabled={signingOut}
            className="flex w-full items-center gap-3 rounded-[var(--neu-radius-md)] px-3 py-2.5 text-left text-sm font-medium text-[var(--neu-gray-600)] outline-none transition-colors hover:bg-red-50 hover:text-[var(--neu-red)] focus-visible:ring-2 focus-visible:ring-red-400"
          >
            <LogOut className="h-[18px] w-[18px] shrink-0" />
            <span>{signingOut ? "Signing out…" : "Sign out"}</span>
          </button>
        </div>
      </aside>
    </>
  );
}