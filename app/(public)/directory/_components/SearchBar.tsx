"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

export default function SearchBar({
  placeholder = "Search by name, batch, or location...",
  paramKey = "search",
  debounceMs = 600,
}: {
  placeholder?: string;
  paramKey?: string;
  debounceMs?: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlValue = searchParams.get(paramKey) ?? "";
  const [value, setValue] = useState(urlValue);
  const lastUrlValue = useRef(urlValue);

  useEffect(() => {
    if (urlValue !== lastUrlValue.current) {
      lastUrlValue.current = urlValue;
      setValue(urlValue);
    }
  }, [urlValue]);

  useEffect(() => {
    const handle = setTimeout(() => {
      const current = searchParams.get(paramKey) ?? "";
      if (value === current) return;
      const params = new URLSearchParams(searchParams.toString());
      if (value.trim() === "") params.delete(paramKey);
      else params.set(paramKey, value.trim());
      const queryString = params.toString();
      router.push(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    }, debounceMs);
    return () => clearTimeout(handle);
  }, [value, debounceMs, searchParams, paramKey, pathname, router]);

  return (
    <div className="w-full sm:max-w-2xl md:py-6">
      <div className="group relative flex items-center rounded-2xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 transition-colors focus-within:border-[#02644A] focus-within:bg-white focus-within:ring-1 focus-within:ring-[#02644A]">
        <Search className="h-4 w-4 shrink-0 text-gray-400 group-focus-within:text-[#02644A]" />
        <input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          aria-label="Search"
          className="w-full min-w-0 bg-transparent px-2.5 text-sm md:text-md lg:text-lg text-slate-700 placeholder:text-gray-400 outline-none"
        />
        {value && (
          <button
            type="button"
            onClick={() => setValue("")}
            aria-label="Clear search"
            className="shrink-0 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-200/60 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
