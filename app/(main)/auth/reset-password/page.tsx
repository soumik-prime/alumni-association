"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = useMemo(() => searchParams.get("token") ?? "", [searchParams]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");
    setMessage("");

    if (!token) {
      setStatus("error");
      setMessage("This reset link is invalid or expired. Please request a new one.");
      return;
    }

    if (password.length < 8) {
      setStatus("error");
      setMessage("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setStatus("error");
      setMessage("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword: password, token }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error?.message || "Unable to reset password.");
      }

      setStatus("success");
      setMessage("Your password has been reset successfully.");
      setPassword("");
      setConfirmPassword("");
    } catch (submitError) {
      setStatus("error");
      setMessage(
        submitError instanceof Error
          ? submitError.message
          : "Unable to reset password. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-16">
      <div className="w-full max-w-xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_12px_35px_rgba(15,23,42,0.08)] md:p-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Set new password
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">Choose a strong password</h1>
        </div>

        {!token && !message ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
            This reset link is missing a valid token. Please request a new password reset email.
          </div>
        ) : null}

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
              New password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-(--neu-green) focus:bg-white focus:ring-4 focus:ring-emerald-100"
              placeholder="Enter a new password"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-slate-700">
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              autoComplete="new-password"
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-(--neu-green) focus:bg-white focus:ring-4 focus:ring-emerald-100"
              placeholder="Re-enter your password"
            />
          </div>

          {message ? (
            <div
              className={[
                "rounded-xl border px-3 py-2 text-sm",
                status === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-red-200 bg-red-50 text-red-700",
              ].join(" ")}
            >
              {message}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting || !token}
            className="flex w-full items-center justify-center rounded-xl bg-(--neu-green) px-4 py-3 text-base font-semibold text-white transition hover:bg-(--neu-green-hover) disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Updating password..." : "Reset password"}
          </button>
        </form>

        {status === "success" ? (
          <div className="mt-6 text-center text-sm text-slate-600">
            <Link href="/auth/login" className="font-semibold text-(--neu-green) hover:text-(--neu-green-hover)">
              Go to sign in
            </Link>
          </div>
        ) : (
          <div className="mt-6 text-center text-sm text-slate-600">
            Need a new link?{" "}
            <Link href="/auth/forget-password" className="font-semibold text-(--neu-green) hover:text-(--neu-green-hover)">
              Request another reset
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
