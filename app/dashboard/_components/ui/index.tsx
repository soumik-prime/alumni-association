import type { ComponentProps, ReactNode } from "react";

/* Pure presentational pieces — safe in both server and client components. */

export const inputClass =
  "block w-full rounded-[var(--neu-radius-md)] border border-[var(--neu-gray-200)] bg-white px-3 py-2 text-sm text-[var(--neu-gray-800)] outline-none transition-colors placeholder:text-[var(--neu-gray-400)] focus:border-[var(--neu-emerald)] focus:ring-2 focus:ring-[var(--neu-emerald)]/20 disabled:cursor-not-allowed disabled:bg-[var(--neu-gray-50)] disabled:text-[var(--neu-gray-500)]";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-[var(--neu-radius-lg)] border border-[var(--neu-gray-200)] bg-white p-4 shadow-sm sm:p-5 ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
      <div className="min-w-0">
        <h2 className="text-base font-semibold text-[var(--neu-gray-800)]">{title}</h2>
        {description && <p className="mt-0.5 text-sm text-[var(--neu-gray-500)]">{description}</p>}
      </div>
      {actions}
    </div>
  );
}

export function Field({
  label, hint, children, className = "",
}: { label: string; hint?: string; children: ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-semibold text-[var(--neu-gray-600)]">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-[var(--neu-gray-500)]">{hint}</span>}
    </label>
  );
}

export function Input({ className = "", ...props }: ComponentProps<"input">) {
  return <input {...props} className={`${inputClass} ${className}`} />;
}

export function Textarea({ className = "", ...props }: ComponentProps<"textarea">) {
  return <textarea rows={4} {...props} className={`${inputClass} resize-y ${className}`} />;
}

export type Option = { value: string; label: string };

export function Select({
  options, placeholder, className = "", ...props
}: ComponentProps<"select"> & { options: Option[]; placeholder?: string }) {
  return (
    <select {...props} className={`${inputClass} ${className}`}>
      {placeholder !== undefined && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

export function Checkbox({ label, className = "", ...props }: ComponentProps<"input"> & { label: ReactNode }) {
  return (
    <label className={`flex items-center gap-2 text-sm text-[var(--neu-gray-700)] ${className}`}>
      <input
        type="checkbox"
        {...props}
        className="h-4 w-4 rounded border-[var(--neu-gray-300)] accent-[var(--neu-green)]"
      />
      {label}
    </label>
  );
}

const btn = {
  primary: "bg-[var(--neu-green)] text-white hover:bg-[var(--neu-green-hover)] focus-visible:ring-[var(--neu-emerald)]",
  secondary: "border border-[var(--neu-gray-200)] bg-white text-[var(--neu-gray-700)] hover:bg-[var(--neu-gray-50)] focus-visible:ring-[var(--neu-emerald)]",
  danger: "border border-red-200 bg-white text-red-600 hover:bg-red-50 focus-visible:ring-red-400",
} as const;

export function btnClass(variant: keyof typeof btn = "primary", size: "sm" | "md" = "md") {
  return `inline-flex items-center justify-center gap-2 rounded-[var(--neu-radius-md)] font-medium outline-none transition-colors focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${
    size === "sm" ? "px-2.5 py-1.5 text-xs" : "px-4 py-2 text-sm"
  } ${btn[variant]}`;
}

export function Btn({
  variant = "primary", size = "md", className = "", ...props
}: ComponentProps<"button"> & { variant?: keyof typeof btn; size?: "sm" | "md" }) {
  return <button type="button" {...props} className={`${btnClass(variant, size)} ${className}`} />;
}

const tones = {
  gray: "bg-[var(--neu-gray-100)] text-[var(--neu-gray-600)]",
  green: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
  red: "bg-red-50 text-red-600",
  blue: "bg-sky-50 text-sky-700",
} as const;

export function Badge({ tone = "gray", children }: { tone?: keyof typeof tones; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function Notice({ tone = "info", children }: { tone?: "info" | "warn" | "error" | "success"; children: ReactNode }) {
  const cls = {
    info: "border-sky-200 bg-sky-50 text-sky-800",
    warn: "border-amber-200 bg-amber-50 text-amber-800",
    error: "border-red-200 bg-red-50 text-red-700",
    success: "border-emerald-200 bg-emerald-50 text-emerald-800",
  }[tone];
  return <div className={`rounded-[var(--neu-radius-md)] border px-3 py-2 text-sm ${cls}`}>{children}</div>;
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-[var(--neu-radius-md)] border border-dashed border-[var(--neu-gray-200)] px-4 py-8 text-center text-sm text-[var(--neu-gray-500)]">
      {children}
    </p>
  );
}

export function Grid({ children, cols = 2 }: { children: ReactNode; cols?: 1 | 2 | 3 }) {
  const c = { 1: "", 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3" }[cols];
  return <div className={`grid gap-4 ${c}`}>{children}</div>;
}

export function AccessDenied({ message = "You don't have permission to view this page." }: { message?: string }) {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <Card>
        <h1 className="text-base font-semibold text-[var(--neu-gray-800)]">Access denied</h1>
        <p className="mt-1 text-sm text-[var(--neu-gray-500)]">{message}</p>
      </Card>
    </div>
  );
}
