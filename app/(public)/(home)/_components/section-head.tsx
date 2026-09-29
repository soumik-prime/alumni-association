type SectionHeadProps = { eyebrow?: string; title: string; text?: string };

export function SectionHead({ eyebrow, title, text }: SectionHeadProps) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      {eyebrow && <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700">{eyebrow}</p>}
      <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      {text && <p className="mt-3 text-slate-600">{text}</p>}
    </div>
  );
}
