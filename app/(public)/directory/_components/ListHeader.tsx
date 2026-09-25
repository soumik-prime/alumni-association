"use client";

import { usePageParam } from "./Pagination";

const PAGE_SIZE = 20;

interface ListHeaderProps {
  total: number;
  pageSize?: number;
  paramKey?: string;
}



export default function ListHeader({
  total,
  pageSize = PAGE_SIZE,
  paramKey = "page",
}: ListHeaderProps) {
  const page = usePageParam(paramKey);

  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <p className="text-[12px] pb-4 text-gray-400">
      {total === 0 ? (
        "No results found"
      ) : (
        <>
          Showing{" "}
          <span className="font-medium text-gray-600">
            {start}–{end}
          </span>{" "}
          of <span className="font-medium text-gray-600">{total}</span>
        </>
      )}
    </p>
  );
}