interface FooterTitleProps {
  title: string;
}

export default function FooterTitle({ title }: FooterTitleProps) {
  return (
    <h3 className="flex items-center gap-3 text-base font-semibold tracking-wide text-slate-200">
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-(--neu-emerald) opacity-50" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-(--neu-emerald)" />
      </span>

      {title}
    </h3>
  );
}
