import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export function ResetSuccess() {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-(--neu-green)/20 bg-(--neu-green)/5 px-4 py-3.5 text-sm text-slate-700">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-(--neu-green)" />
      <span>
        Your password has been reset.{" "}
        <Link href="/auth/login" className="font-medium text-(--neu-green) hover:underline">
          Sign in now
        </Link>
      </span>
    </div>
  );
}
