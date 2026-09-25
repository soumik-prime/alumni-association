import CardGridSkeleton from "./CardGridSkeleton";

export default function DirectoryResultsSkeleton({
  count = 12,
}: {
  count?: number;
}) {
  return (
    <div className="flex flex-1 flex-col" aria-hidden="true">
      <div className="mb-4 h-3 w-40 animate-pulse rounded-full bg-gray-100" />
      <CardGridSkeleton count={count} />
      <div className="mt-auto pt-4">
        <div className="h-9 w-full max-w-xs animate-pulse rounded-lg bg-gray-100" />
      </div>
    </div>
  );
}
