import Link from "next/link";

import FooterTitle from "./FooterTitle";
import type { FooterSocialItem } from "../../_types/footer.types";

interface FooterConnectProps {
  socials: readonly FooterSocialItem[];
}

export default function FooterConnect({ socials }: FooterConnectProps) {
  return (
    <div>
      <FooterTitle title="CONNECT WITH US" />

      <div className="mt-6">
        <p className="max-w-sm text-[15px] leading-6 text-slate-500">
          Stay connected with the CSE community and follow our latest
          updates.
        </p>

        <div className="mt-2 flex gap-3">
          {socials.map((social) => {
            const Icon = social.icon;
            const external = social.href.startsWith("http");

            return (
              <a
                key={social.name}
                aria-label={social.name}
                href={social.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="
                  flex h-11 w-11 items-center justify-center
                  rounded-lg
                  border border-slate-700/50
                  bg-slate-900/40
                  text-slate-400
                  transition-all duration-200 ease-out
                  hover:-translate-y-1
                  hover:border-(--neu-green)/60
                  hover:bg-(--neu-green)/10
                  hover:text-(--neu-emerald)
                "
              >
                <Icon className="h-5 w-5" strokeWidth={1.7} />
              </a>
            );
          })}
        </div>

        <Link
          href="/login"
          className="
            group mt-4 flex h-12 w-full items-center justify-center
            overflow-hidden rounded-lg
            bg-(--neu-green)
            px-5
            text-sm font-semibold text-gray-50
            transition-all duration-200
            hover:bg-(--neu-green-hover)
            hover:shadow-[0_8px_20px_-8px_var(--neu-green)]
            leading-tight
          "
        >
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">
            Community Portal →
          </span>
        </Link>
      </div>
    </div>
  );
}
