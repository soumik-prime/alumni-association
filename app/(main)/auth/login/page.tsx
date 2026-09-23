"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/sign-in/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, callbackURL: "/dashboard" }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error?.message || "Unable to sign in. Please try again.");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to sign in. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-16">
      <div className="w-full max-w-5xl overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
        <div className="grid md:grid-cols-[1.1fr_0.9fr]">
          <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-(--neu-green) p-8 text-white md:p-12">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
              Alumni portal
            </div>
            <h1 className="mt-8 text-4xl font-bold tracking-tight md:text-5xl">
              Welcome back to the CSE community.
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-slate-200">
              Manage your profile, connect with alumni, and stay updated with the latest
              news and opportunities from the department.
            </p>
            <div className="mt-10 grid gap-4 text-sm text-slate-200">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold text-white">Member access</p>
                <p className="mt-1 text-slate-300">Signed-in alumni and students only.</p>
              </div>
              {/* <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold text-white">Secure account</p>
                <p className="mt-1 text-slate-300">Use your department email to continue safely.</p>
              </div> */}
            </div>
          </section>

          <section className="flex items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Sign in
                </p>
                <h2 className="mt-3 text-3xl font-bold text-slate-900">Community portal</h2>
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

                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                      Password
                    </label>
                    <Link
                      href="/auth/forget-password"
                      className="text-sm font-medium text-(--neu-green) transition hover:text-(--neu-green-hover)"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-(--neu-green) focus:bg-white focus:ring-4 focus:ring-emerald-100"
                    placeholder="Enter your password"
                  />
                </div>

                {error ? (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {error}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center rounded-xl bg-(--neu-green) px-4 py-3 text-base font-semibold text-white transition hover:bg-(--neu-green-hover) disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-slate-600">
                Need an account? Contact the alumni office to request access.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
