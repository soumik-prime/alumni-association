import { Mail } from "lucide-react";

type EmailFieldProps = {
  id?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  invalid?: boolean;
  placeholder?: string;
};

export function EmailField({
  id = "email",
  label = "Email address",
  value,
  onChange,
  invalid,
  placeholder = "you@example.com",
}: EmailFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
        <input
          id={id}
          type="email"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete="email"
          required
          aria-invalid={invalid}
          placeholder={placeholder}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3 pl-10.5 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-(--neu-green) focus:bg-white focus:ring-2 focus:ring-(--neu-green)/10"
        />
      </div>
    </div>
  );
}
