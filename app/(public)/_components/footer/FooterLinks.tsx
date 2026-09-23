import Link from "next/link";
import { ChevronRight } from "lucide-react";

import type { FooterLinkItem } from "../../_types/footer.types";

interface FooterLinksProps {
  links: readonly FooterLinkItem[];
}

export default function FooterLinks({ links }: FooterLinksProps) {
  return (
    <ul className="mt-6 space-y-2">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={link.external ? "noopener noreferrer" : undefined}
            className="
              group relative inline-flex w-fit items-center gap-1.5
              text-[15px] text-slate-400
              transition-colors duration-200
              hover:text-slate-200
            "
          >
            <ChevronRight className="h-4 w-4 shrink-0 text-(--neu-emerald)" />
            {link.label}

            <span
              aria-hidden="true"
              className="
                absolute -bottom-1 left-5.5 right-0 h-px
                origin-left scale-x-0
                bg-(--neu-emerald)/70
                transition-transform duration-300 ease-out
                group-hover:scale-x-100
              "
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
