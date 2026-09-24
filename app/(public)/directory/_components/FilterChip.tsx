"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";

const FILTERS = ["q", "type", "batch", "session", "semester", "gradYear", "gender", "location", "institution"];

export default function FilterChips() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = FILTERS.map((key) => ({ key, value: searchParams.get(key) })).filter((chip): chip is { key: string; value: string } => Boolean(chip.value));
  const remove = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key); params.delete("page");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  if (!active.length) return null;
  return <div className="flex flex-wrap items-center gap-2">{active.map(({ key, value }) => <span key={key} className="inline-flex items-center gap-1.5 rounded-full border border-[#02644A]/20 bg-[#02644A]/5 px-3 py-1 text-xs font-medium text-[#02644A]">{key}: {value}<button type="button" onClick={() => remove(key)} aria-label={`Remove ${key} filter`} className="rounded-full p-0.5"><X className="h-3 w-3" /></button></span>)}</div>;
}