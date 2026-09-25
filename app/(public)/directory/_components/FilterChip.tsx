"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { PARAM_KEYS, PARAM_LABELS } from "../_data/filter-config";

// All filter param keys that can show up as a removable chip. Sourced from
// PARAM_KEYS so this can never drift from what Filter/MobileFilter actually
// write to the URL again.
const FILTER_KEYS = Object.values(PARAM_KEYS);

export default function FilterChips() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = FILTER_KEYS.map((key) => ({
    key,
    value: searchParams.get(key),
  })).filter((chip): chip is { key: string; value: string } =>
    Boolean(chip.value),
  );
  const remove = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  const clearAll = () => {
    router.push(pathname, { scroll: false });
  };
  if (!active.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-2 pb-4">
      {active.map(({ key, value }) => (
        <span
          key={key}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#02644A]/20 bg-[#02644A]/5 px-3 py-1 text-xs font-medium text-[#02644A]"
        >
          {PARAM_LABELS[key] ?? key}: {value}
          <button
            type="button"
            onClick={() => remove(key)}
            aria-label={`Remove ${PARAM_LABELS[key] ?? key} filter`}
            className="rounded-full p-0.5"
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      {active.length > 1 && (
        <button
          type="button"
          onClick={clearAll}
          className="text-xs font-medium text-gray-500 underline-offset-2 hover:text-[#02644A] hover:underline"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
