import type { ReactNode } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

type PasswordFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  invalid?: boolean;
  visible: boolean;
  /** Pass this to render the show/hide button inside the field. */
  onToggleVisible?: () => void;
  /** Optional element shown on the right of the label row (e.g. "Forgot password?"). */
  labelAction?: ReactNode;
};

export function PasswordField({
  id,
  label,
  value,
  onChange,
  placeholder,
  autoComplete = "new-password",
  invalid,
  visible,
  onToggleVisible,
  labelAction,
}: PasswordFieldProps) {
  return (
    <div>
      <div className="mb-1.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">
          {label}
        </label>
        {labelAction}
      </div>
      <div className="relative">
        <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          required
          aria-invalid={invalid}
          placeholder={placeholder}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3 pl-10.5 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-(--neu-green) focus:bg-white focus:ring-2 focus:ring-(--neu-green)/10"
        />
        {onToggleVisible ? (
          <button
            type="button"
            onClick={onToggleVisible}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
            aria-label={visible ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {visible ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
          </button>
        ) : null}
      </div>
    </div>
  );
}
