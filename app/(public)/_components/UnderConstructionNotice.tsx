import { Construction } from "lucide-react";

export default function UnderConstructionNotice() {
  return (
    <aside
      aria-label="Website status"
      className="border-b border-amber-200 bg-amber-50/90 px-4 py-3 text-amber-950"
    >
      <div className="mx-auto flex max-w-screen-2xl items-center justify-center gap-3 text-center">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-200 text-amber-800">
          <Construction className="h-4 w-4" aria-hidden="true" />
        </span>
        <p className="text-sm font-medium leading-6">
          <span className="font-bold">Under construction</span>
          <span className="mx-2 text-amber-700/60" aria-hidden="true">
            /
          </span>
          We are preparing something useful for the alumni community.
        </p>
      </div>
    </aside>
  );
}
