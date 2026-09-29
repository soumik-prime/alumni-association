import type { ReactNode } from "react";

type PageTitleProps = { title: string; description?: string; actions?: ReactNode };

export default function PageTitle({ title, description, actions }: PageTitleProps) {
  return (
    <div className="flex w-full flex-wrap items-start justify-between gap-3">
      <div className="min-w-0">
        <h1 className="text-xl font-bold text-slate-900">{title}</h1>
        {description && <p className="mt-1 text-sm text-[var(--neu-gray-500)]">{description}</p>}
      </div>
      {actions}
    </div>
  );
}

/** Standard page wrapper: centred column with vertical rhythm. */
export function PageContainer({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-5xl space-y-6">{children}</div>;
}
