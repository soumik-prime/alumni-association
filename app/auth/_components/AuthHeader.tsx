import Image from "next/image";

/** Logo, brand label, title and subtitle at the top of an auth card. */
export function AuthHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6 flex flex-col items-center text-center sm:mb-8">
      <Image
        src="/logo.png"
        alt="Alumni Association logo"
        width={80}
        height={80}
        priority
        className="mb-4 h-12 w-auto shrink-0 sm:h-14"
      />
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--neu-green)">
        Alumni Association
      </p>
      <h1 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">{title}</h1>
      <p className="mt-1.5 text-sm text-slate-500">{subtitle}</p>
    </div>
  );
}
