import { LucideIcon } from "lucide-react";


/** Icon + title row used at the top of every tab panel. */


interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  message: string;
}

/** Shown in place of a section's content when there's nothing to display yet. */
export function EmptyState({ icon: Icon, title, message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 h-auto rounded-b-(--neu-radius-lg) border border-dashed border-(--neu-gray-200) px-6 py-12 text-center">
      <span className="inline-flex size-11 items-center justify-center rounded-full bg-(--neu-gray-50) text-(--neu-gray-400)">
        <Icon className="size-5" />
      </span>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-(--neu-gray-700)">{title}</p>
        <p className="max-w-xs text-sm text-(--neu-gray-500)">{message}</p>
      </div>
    </div>
  );
}

/**
 * Loading placeholder for a tab panel. Not wired to any async fetch today —
 * getDemoProfile() resolves synchronously — but kept ready to drop in as a
 * Suspense fallback once a tab's data comes from a real query.
 */
export function SectionSkeleton() {
  return (
    <div className="animate-pulse space-y-4" aria-hidden="true">
      <div className="h-5 w-32 rounded-(--neu-radius-sm) bg-(--neu-gray-100)" />
      <div className="space-y-3">
        <div className="h-20 rounded-(--neu-radius-lg) bg-(--neu-gray-50)" />
        <div className="h-20 rounded-(--neu-radius-lg) bg-(--neu-gray-50)" />
      </div>
    </div>
  );
}
