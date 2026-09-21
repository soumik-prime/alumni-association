import type { FooterTagline } from "../../_types/footer.types";

interface FooterBrandHeaderProps {
  title: string;
  tagline: FooterTagline;
}

export default function FooterBrandHeader({
  title,
  tagline,
}: FooterBrandHeaderProps) {
  return (
    <div className="mx-auto px-5 pt-12 sm:px-6 lg:px-8 lg:pt-16">
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl lg:text-4xl">
          {title}
        </h2>

        <p className="mt-3 text-sm text-slate-500 sm:text-base">{tagline}</p>

        <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-linear-to-r from-(--neu-green)/80 to-(--neu-emerald)/70" />
      </div>
    </div>
  );
}
