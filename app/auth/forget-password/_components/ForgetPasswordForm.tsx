"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { AuthDivider } from "../../_components/AuthDivider";
import { AuthHeader } from "../../_components/AuthHeader";
import { AuthShell } from "../../_components/AuthShell";
import { EmailField } from "../../_components/EmailField";
import { FormError } from "../../_components/FormError";
import { SubmitButton } from "../../_components/SubmitButton";
import { ForgetSuccess } from "./ForgetSuccess";

export function ForgetPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/forget-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, redirectTo: "/auth/reset-password" }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error?.message || "Unable to send reset link. Please try again.");
      }

      // Same success state whether or not the account exists, so registered emails aren't revealed.
      setIsSubmitted(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to send reset link. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthShell>
      <AuthHeader
        title={isSubmitted ? "Check your email" : "Forgot your password?"}
        subtitle={
          isSubmitted
            ? "We've sent instructions to reset your password."
            : "Enter your email and we'll send you a reset link"
        }
      />

      {isSubmitted ? (
        <ForgetSuccess
          email={email}
          onReset={() => {
            setIsSubmitted(false);
            setEmail("");
          }}
        />
      ) : (
        <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit} noValidate>
          <EmailField value={email} onChange={setEmail} invalid={Boolean(error)} />
          <FormError message={error} />
          <SubmitButton loading={isSubmitting} loadingText="Sending reset link...">
            Send reset link
          </SubmitButton>
        </form>
      )}

      <AuthDivider />

      <p className="mt-6 text-center text-sm text-slate-600">
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-1.5 font-medium text-(--neu-green) transition hover:text-(--neu-green-hover) hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to sign in
        </Link>
      </p>
    </AuthShell>
  );
}
