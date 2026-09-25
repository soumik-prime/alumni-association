export default function FilterSkeleton() {
  return (
    <div
      className="flex h-full w-full animate-pulse flex-col rounded-3xl border border-gray-100 bg-white shadow-sm"
      aria-hidden="true"
    >
      <div className="flex shrink-0 items-center justify-between p-5 pb-4">
        <div className="h-5 w-20 rounded-full bg-gray-100" />
        <div className="h-7 w-20 rounded-xl bg-gray-100" />
      </div>
      <div className="flex-1 overflow-hidden px-5 pb-5">
        <div className="flex flex-col gap-4">
          <div className="h-9 w-full rounded-xl bg-gray-50" />
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <div className="h-3 w-20 rounded-full bg-gray-100" />
              <div className="h-9 w-full rounded-xl bg-gray-50" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
