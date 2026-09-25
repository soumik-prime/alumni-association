import CardSkeleton from "./CardSkeleton";

export default function CardGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div
      className="w-full grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3 gap-2 sm:gap-6 md:gap-4 md:justify-between lg:gap-6"
      role="status"
      aria-label="Loading profiles"
    >
      {Array.from({ length: count }, (_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
