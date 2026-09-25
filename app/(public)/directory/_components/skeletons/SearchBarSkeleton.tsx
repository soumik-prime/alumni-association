export default function SearchBarSkeleton() {
  return (
    <div className="w-full sm:max-w-2xl md:py-6" aria-hidden="true">
      <div className="flex h-11 md:h-13 w-full animate-pulse items-center gap-2.5 rounded-2xl border border-gray-100 bg-gray-50 px-3.5">
        <div className="h-4 w-4 shrink-0 rounded-full bg-gray-200" />
        <div className="h-3 w-40 rounded-full bg-gray-200" />
      </div>
    </div>
  );
}
