export default function Title({
  title,
  description,
  maxWidth,
}: {
  title: string;
  description: string;
  maxWidth: string;
}) {
  return (
    <section
      className={`${maxWidth} flex w-full flex-col items-center gap-2 px-4 pt-12 text-center md:gap-4`}
    >
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-4xl">
        {title}
      </h1>

      <p className="max-w-3xl text-sm leading-6 text-slate-700 md:text-lg">
        {description}
      </p>
    </section>
  );
}