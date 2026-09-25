"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 20;

/* ── Hook: reads ?page=N from URL ── */
export function usePageParam(paramKey = "page") {
  const searchParams = useSearchParams();
  return Math.max(1, parseInt(searchParams.get(paramKey) ?? "1") || 1);
}

/* ── Hook: slices a client-side array for the current page ── */
export function usePagination<T>(items: T[], page: number, pageSize = PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  const paged = items.slice(start, start + pageSize);
  return { paged, totalPages, safePage };
}

/* ── URL-aware pagination (syncs ?page=N) ── */
interface PaginationProps {
  total: number;
  pageSize?: number;
  paramKey?: string;
}

export default function Pagination({
  total,
  pageSize = PAGE_SIZE,
  paramKey = "page",
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Hooks must run unconditionally, before any early return.
  const page = usePageParam(paramKey);
  const [jumpVal, setJumpVal] = useState("");

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  function go(p: number) {
    const clamped = Math.min(Math.max(1, p), totalPages);
    const params = new URLSearchParams(searchParams.toString());
    if (clamped === 1) {
      params.delete(paramKey);
    } else {
      params.set(paramKey, String(clamped));
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleJump() {
    const n = parseInt(jumpVal, 10);
    if (!isNaN(n)) go(n);
    setJumpVal("");
  }

  if (totalPages <= 1) return null;

  // Page window
  const pages: (number | "…")[] = [];
  const add = (n: number) => {
    if (!pages.includes(n)) pages.push(n);
  };
  add(1);
  if (page - 2 > 2) pages.push("…");
  for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) add(i);
  if (page + 2 < totalPages - 1) pages.push("…");
  add(totalPages);

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div className="mt-4 flex flex-col flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4 sm:flex-row">
      {/* Count */}
      <p className="shrink-0 text-[12px] text-gray-400">
        Showing{" "}
        <span className="font-medium text-gray-600">
          {start}–{end}
        </span>{" "}
        of <span className="font-medium text-gray-600">{total}</span>
      </p>

      {/* Pages + Jump */}
      <nav
        aria-label="Pagination"
        className="flex flex-wrap items-center justify-center gap-2"
      >
        <button
          type="button"
          disabled={page === 1}
          onClick={() => go(page - 1)}
          aria-label="Previous page"
          className="flex h-7.5 w-7.5 items-center justify-center rounded-md border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>

        <div className="flex items-center gap-1">
          {pages.map((p, i) =>
            p === "…" ? (
              <span
                key={`el-${i}`}
                className="select-none px-1 text-[13px] text-gray-400"
              >
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => go(p as number)}
                aria-current={p === page ? "page" : undefined}
                className={`h-7.5 min-w-7.5 rounded-md px-1 text-[13px] font-medium transition-colors ${
                  p === page
                    ? "bg-[#02644A] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            )
          )}
        </div>

        <button
          type="button"
          disabled={page === totalPages}
          onClick={() => go(page + 1)}
          aria-label="Next page"
          className="flex h-7.5 w-7.5 items-center justify-center rounded-md border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>

        {/* Jump — only worth showing once there are enough pages to need it */}
        {totalPages > 5 && (
          <div className="ml-1 flex items-center gap-1.5">
            <span className="text-[12px] text-gray-400">Go to</span>
            <input
              type="number"
              min={1}
              max={totalPages}
              value={jumpVal}
              onChange={(e) => setJumpVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleJump()}
              placeholder="—"
              aria-label={`Jump to page, 1 to ${totalPages}`}
              className="w-11.5 rounded-md border border-gray-200 px-2 py-1 text-center text-[12px] text-gray-700 outline-none transition-colors focus:border-[#02644A] focus:ring-1 focus:ring-[#02644A] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <button
              type="button"
              onClick={handleJump}
              disabled={!jumpVal}
              className="rounded-md border border-gray-200 px-2 py-1 text-[12px] text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Go
            </button>
          </div>
        )}
      </nav>
    </div>
  );
}