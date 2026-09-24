import { SlidersHorizontal } from "lucide-react";

interface FilterButtonProps {
  onClick?: () => void;
  className?: string;
}

export function FilterButton({ className = "" }: FilterButtonProps) {
  return (
    <button
      type="button"
      aria-label="Open filters"
      className={`lg:hidden aspect-square h-full rounded-sm flex items-center justify-center text-gray-700 transition-colors hover:border-gray-600 hover:text-gray-600 ${className}`}
    >
      <SlidersHorizontal className="size-7" />
    </button>
  );
}