"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");
    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/request-password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          redirectTo: `${window.location.origin}/auth/reset-password`,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error?.message || "Unable to send reset link.");
      }

      setStatus("success");
      setMessage(
        "If this email exists in our system, we have sent a password reset link. Please check your inbox.",
      );
      setEmail("");
    } catch (submitError) {
      setStatus("error");
      setMessage(
        submitError instanceof Error
          ? submitError.message
          : "Unable to send reset link. Please try again.",
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
            Account recovery
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">Reset your password</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Enter the email associated with your alumni account and we will send you a secure
            reset link.
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-(--neu-green) focus:bg-white focus:ring-4 focus:ring-emerald-100"
              placeholder="you@example.com"
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
            disabled={isSubmitting}
            className="flex w-full items-center justify-center rounded-xl bg-(--neu-green) px-4 py-3 text-base font-semibold text-white transition hover:bg-(--neu-green-hover) disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Sending link..." : "Send reset link"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          Remember your password?{" "}
          <Link href="/auth/login" className="font-semibold text-(--neu-green) hover:text-(--neu-green-hover)">
            Back to sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
