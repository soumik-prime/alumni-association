import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbsProps {
  name: string;
}

export function Breadcrumbs({ name }: BreadcrumbsProps) {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Directory", href: "/people" },
    { label: name, href: undefined },
  ];

  return (
    <nav
      aria-label="Breadcrumb"
      className="px-4 pt-5 sm:px-6 lg:px-8"
    >
      <ol className="flex items-center gap-1 overflow-hidden text-xs text-slate-500">
        {crumbs.map((crumb, i) => (
          <li
            key={crumb.label}
            className="flex min-w-0 items-center gap-1"
          >
            {i > 0 && (
              <ChevronRight
                size={13}
                className="shrink-0 text-slate-300"
              />
            )}

            {crumb.href ? (
              <Link
                href={crumb.href}
                className="inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-1 transition-colors hover:bg-slate-100 hover:text-emerald-700"
              >
                {i === 0 && <Home size={12} />}
                {crumb.label}
              </Link>
            ) : (
              <span className="truncate px-1.5 py-1 font-medium text-slate-700">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}