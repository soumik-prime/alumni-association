export default function CardSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className="flex h-full w-full max-w-72 md:max-w-85 animate-pulse flex-col overflow-hidden rounded-2xl md:rounded-[28px] bg-white p-3 md:p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
        aria-hidden="true"
      >
        <div className="aspect-square w-full rounded-xl md:rounded-[22px] bg-[#F3F6F4]" />
        <div className="mt-2.5 md:mt-4 flex flex-col gap-2 px-1 md:px-2">
          <div className="h-4 w-3/4 rounded-full bg-[#F3F6F4] md:h-5" />
          <div className="h-3 w-1/2 rounded-full bg-[#F3F6F4]" />
          <div className="h-3 w-2/5 rounded-full bg-[#F3F6F4]" />
        </div>
        <div className="mt-3 md:mt-4 flex items-center justify-between gap-2 rounded-xl md:rounded-2xl bg-[#F3F6F4] p-2 md:p-2.5">
          <div className="h-5 w-16 rounded-full bg-white/80" />
          <div className="h-6 w-20 rounded-lg md:rounded-xl bg-white/80" />
        </div>
      </div>
    </div>
  );
}
