"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, LogOut } from "lucide-react";

type LogoutButtonProps = {
  /** Extra classes appended to the default styling. */
  className?: string;
  label?: string;
};

export function LogoutButton({ className = "", label = "Log out" }: LogoutButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);
    try {
      await fetch("/api/auth/sign-out", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
    } finally {
      // Go to login even if the request fails, and refresh so server components drop the session
      router.replace("/auth/login");
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoading}
      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
      {label}
    </button>
  );
}
