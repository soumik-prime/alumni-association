import { Suspense } from "react";
import { ResetPasswordForm } from "./_components/ResetPasswordForm";

// useSearchParams needs a Suspense boundary in Next.js production builds
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}
