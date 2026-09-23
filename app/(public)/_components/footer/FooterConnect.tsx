import Link from "next/link";
import { LogIn } from "lucide-react";

import FooterTitle from "./FooterTitle";
import type { FooterSocialItem } from "../../_types/footer.types";

interface FooterConnectProps {
  socials: readonly FooterSocialItem[];
}

export default function FooterConnect({ socials }: FooterConnectProps) {
  return (
    <div>
      <div>
        <FooterTitle title="PORTAL & SOCIALS" />

        <Link
          href="/auth/login"
          className="
            group mt-6 flex h-11 max-w-64 w-full items-center justify-center gap-2.5
            rounded-lg
            border border-(--neu-green)/35
            bg-(--neu-green)/8
            text-sm font-semibold text-slate-300
            shadow-inner shadow-white/2
            transition-all duration-200
            hover:border-(--neu-emerald)/60
            hover:bg-(--neu-green)/[0.14]
            hover:text-white
          "
        >
          <LogIn
            className="
              h-4 w-4
              text-(--neu-emerald)/80
              transition-transform duration-200
              group-hover:translate-x-0.5
            "
            strokeWidth={1.8}
          />

          <span>Community Portal</span>
        </Link>
      </div>

      <div className="mt-8">
        <h3 className="text-base font-semibold text-slate-300/80">
          CONNECT WITH US
        </h3>

        <div className="mt-1">
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
        </div>
      </div>
    </div>
  );
}
