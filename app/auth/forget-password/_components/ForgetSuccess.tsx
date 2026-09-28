import { CheckCircle2 } from "lucide-react";

type ForgetSuccessProps = {
  email: string;
  onReset: () => void;
};

export function ForgetSuccess({ email, onReset }: ForgetSuccessProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 rounded-xl border border-(--neu-green)/20 bg-(--neu-green)/5 px-4 py-3.5 text-sm text-slate-700">
        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-(--neu-green)" />
        <span>
          If an account exists for <span className="font-medium text-slate-900">{email}</span>,
          you&apos;ll receive an email shortly with a link to reset your password. It may take a few
          minutes to arrive — check your spam folder too.
        </span>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        Use a different email
      </button>
    </div>
  );
}
