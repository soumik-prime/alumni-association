"use client";

import { useCallback, useState, type ReactNode } from "react";
import { Menu } from "lucide-react";
import DashboardSidebar from "./DashboardSidebar";

type ShellProps = {
  children: ReactNode;
  allowedHrefs: string[];
  user: { name: string; email: string };
};

export default function DashboardShell({ children, allowedHrefs, user }: ShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-[var(--neu-gray-50)]">
      <DashboardSidebar open={sidebarOpen} onClose={closeSidebar} allowedHrefs={allowedHrefs} user={user} />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header with menu button: small screens only */}
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-[var(--neu-gray-200)] bg-white px-4 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            aria-expanded={sidebarOpen}
            className="flex h-9 w-9 items-center justify-center rounded-md text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="truncate text-sm font-semibold text-slate-900">
            Dashboard
          </span>
        </header>

        <main className="min-w-0 flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
