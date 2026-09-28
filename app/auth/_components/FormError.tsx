import { AlertCircle } from "lucide-react";

export function FormError({ message }: { message: string }) {
  if (!message) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700"
    >
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      <span className="wrap-break-word">{message}</span>
    </div>
  );
}
