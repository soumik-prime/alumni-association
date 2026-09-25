export default function CardSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className="flex h-full w-full max-w-62.5 animate-pulse flex-col overflow-hidden rounded-xl bg-white p-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.06)] sm:max-w-65 md:rounded-2xl md:p-3"
        aria-hidden="true"
      >
        {/* Image */}
        <div className="aspect-square w-full rounded-lg bg-[#F3F6F4] md:rounded-xl" />

        {/* Information */}
        <div className="mt-2 flex flex-col gap-1 px-0.5 md:mt-2.5 md:px-1">
          <div className="h-4 w-3/4 rounded-full bg-[#F3F6F4] md:h-4" />
          <div className="h-3 w-1/2 rounded-full bg-[#F3F6F4]" />
          <div className="h-3 w-2/5 rounded-full bg-[#F3F6F4]" />
        </div>

        {/* Bottom */}
        <div className="mt-2 flex items-center justify-between gap-1 rounded-lg bg-[#F3F6F4] p-1.5 md:mt-2.5 md:rounded-xl md:p-2">
          <div className="h-4 w-14 rounded-full bg-white/80 md:h-5 md:w-16" />
          <div className="h-5 w-20 rounded-md bg-white/80 md:h-6 md:w-20 md:rounded-lg" />
        </div>
      </div>
    </div>
  );
}