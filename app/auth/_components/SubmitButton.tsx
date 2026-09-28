import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";

type SubmitButtonProps = {
  loading: boolean;
  loadingText: string;
  children: ReactNode;
};

export function SubmitButton({ loading, loadingText, children }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-(--neu-green) px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-(--neu-green)/20 transition hover:bg-(--neu-green-hover) hover:shadow-(--neu-green)/30 focus:outline-none focus:ring-2 focus:ring-(--neu-green)/20 disabled:cursor-not-allowed disabled:opacity-70 disabled:shadow-none"
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}
