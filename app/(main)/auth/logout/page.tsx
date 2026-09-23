"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    async function signOut() {
      try {
        await fetch("/api/auth/sign-out", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch {
        // Ignore and redirect regardless.
      } finally {
        router.push("/auth/login");
        router.refresh();
      }
    }

    void signOut();
  }, [router]);

  return null;
}
