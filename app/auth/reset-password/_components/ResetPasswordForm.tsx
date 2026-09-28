"use client";

import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { AuthHeader } from "../../_components/AuthHeader";
import { AuthShell } from "../../_components/AuthShell";
import { FormError } from "../../_components/FormError";
import { PasswordField } from "../../_components/PasswordField";
import { SubmitButton } from "../../_components/SubmitButton";
import { ResetSuccess } from "./ResetSuccess";

const MIN_LENGTH = 8;

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const hasLinkError = Boolean(searchParams.get("error"));

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // No token (or Better Auth flagged the link invalid/expired) -> back to login immediately.
  if (!token || hasLinkError) {
    redirect("/auth/login");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password.length < MIN_LENGTH) {
      setError(`Password must be at least ${MIN_LENGTH} characters.`);
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
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
        throw new Error(
          data?.error?.code === "INVALID_TOKEN"
            ? "This reset link is invalid or has expired."
            : data?.error?.message || "Unable to reset password. Please try again.",
        );
      }

      setIsDone(true);
      setTimeout(() => router.push("/auth/login"), 2500);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to reset password. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthShell>
      <AuthHeader
        title={isDone ? "Password updated" : "Set a new password"}
        subtitle={
          isDone ? "Redirecting you to sign in..." : "Choose a new password for your account"
        }
      />

      {isDone ? (
        <ResetSuccess />
      ) : (
        <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit} noValidate>
          <PasswordField
            id="password"
            label="New password"
            value={password}
            onChange={setPassword}
            placeholder={`At least ${MIN_LENGTH} characters`}
            invalid={Boolean(error)}
            visible={showPassword}
            onToggleVisible={() => setShowPassword((prev) => !prev)}
          />
          <PasswordField
            id="confirm"
            label="Confirm password"
            value={confirm}
            onChange={setConfirm}
            placeholder="Re-enter your password"
            invalid={Boolean(error)}
            visible={showPassword}
          />

          <FormError message={error} />

          <SubmitButton loading={isSubmitting} loadingText="Updating password...">
            Reset password
          </SubmitButton>
        </form>
      )}
    </AuthShell>
  );
}
