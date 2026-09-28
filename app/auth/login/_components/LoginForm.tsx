"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthDivider } from "../../_components/AuthDivider";
import { AuthHeader } from "../../_components/AuthHeader";
import { AuthShell } from "../../_components/AuthShell";
import { EmailField } from "../../_components/EmailField";
import { FormError } from "../../_components/FormError";
import { PasswordField } from "../../_components/PasswordField";
import { SubmitButton } from "../../_components/SubmitButton";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
        submitError instanceof Error ? submitError.message : "Unable to sign in. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthShell>
      <AuthHeader title="Welcome back" subtitle="Sign in to the CSE community portal" />

      <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit} noValidate>
        <EmailField value={email} onChange={setEmail} invalid={Boolean(error)} />

        <PasswordField
          id="password"
          label="Password"
          value={password}
          onChange={setPassword}
          placeholder="Enter your password"
          autoComplete="current-password"
          invalid={Boolean(error)}
          visible={showPassword}
          onToggleVisible={() => setShowPassword((prev) => !prev)}
          labelAction={
            <Link
              href="/auth/forget-password"
              className="text-xs font-medium text-(--neu-green) transition hover:text-(--neu-green-hover) hover:underline"
            >
              Forgot password?
            </Link>
          }
        />

        <FormError message={error} />

        <SubmitButton loading={isSubmitting} loadingText="Signing in...">
          Sign in
        </SubmitButton>
      </form>

      <AuthDivider />

      <p className="mt-6 text-center text-sm text-slate-600">
        Need an account? <br />
        <span className="font-medium text-slate-900">Contact the department</span> to request access.
      </p>
    </AuthShell>
  );
}
