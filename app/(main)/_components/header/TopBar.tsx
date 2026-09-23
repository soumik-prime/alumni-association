import Link from "next/link";
import Image from "next/image";
import { ExternalLinkIcon } from "lucide-react";
import { HEADER_BRAND } from "../../_constants/header.data";
import { ContactLink } from "./ContactLink";
import { MobileNav } from "./MobileNav";

export default function TopBar() {
  return (
    <div className="relative mx-auto flex items-center justify-between gap-3 border-b border-gray-200/50 px-4 py-2 pr-16 md:py-4 md:pr-6 sm:px-6">
      <div className="flex min-w-0 gap-3 sm:gap-6">
        <Image
          src={HEADER_BRAND.logoSrc}
          alt={HEADER_BRAND.logoAlt}
          width={80}
          height={80}
          priority
          className="h-16 w-auto shrink-0 sm:h-20 md:h-20"
        />

        <div className="flex min-w-0 flex-col leading-tight">
          <Link
            href="/"
            className="truncate text-lg font-bold text-gray-800 sm:text-2xl"
          >
            {HEADER_BRAND.homeLabel}
          </Link>

          <a
            href={HEADER_BRAND.departmentHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group/uni inline-flex items-center gap-1 truncate text-xs font-semibold text-[#158279] sm:text-sm"
          >
            <span className="truncate">
              {HEADER_BRAND.departmentLabel}{" "}
              <span className="sm:hidden">{HEADER_BRAND.departmentShortLabel}</span>
              <span className="hidden sm:inline">{HEADER_BRAND.departmentFullLabel}</span>
            </span>
            <ExternalLinkIcon
              className="h-3 w-3 shrink-0 opacity-70 transition-all duration-200 group-hover/uni:-translate-y-0.5 group-hover/uni:translate-x-0.5 group-hover/uni:opacity-100 sm:h-3.5 sm:w-3.5"
              strokeWidth={2}
            />
          </a>

          <a
            href={HEADER_BRAND.universityHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group/uni inline-flex items-center gap-1 truncate text-xs font-semibold text-[#991925] sm:text-sm"
          >
            <span className="truncate">{HEADER_BRAND.universityLabel}</span>
            <ExternalLinkIcon
              className="h-3 w-3 shrink-0 opacity-70 transition-all duration-200 group-hover/uni:-translate-y-0.5 group-hover/uni:translate-x-0.5 group-hover/uni:opacity-100 sm:h-3.5 sm:w-3.5"
              strokeWidth={2}
            />
          </a>
        </div>
      </div>

      <div className="hidden shrink-0 md:block">
        <ContactLink variant="full" />
      </div>

      <MobileNav />
    </div>
  );
}