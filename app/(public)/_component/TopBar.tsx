import Link from "next/link";
import Image from "next/image";
import { ExternalLinkIcon } from "lucide-react";
import { ContactLink } from "./ContactLink";
import { MobileNav } from "./navigation/MobileNav";

const logoPath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/university-logo.png`;

export default function TopBar() {
  return (
    <div className="relative mx-auto flex items-center justify-between gap-3 border-b border-gray-200/50 px-4 py-2 pr-16 md:py-4 md:pr-6 sm:px-6">
      <div className="flex min-w-0 gap-3 sm:gap-6">
        <Image
          src={logoPath}
          alt="Netrokona University Logo"
          width={80}
          height={80}
          priority
          unoptimized
          className="h-16 w-auto shrink-0 sm:h-20 md:h-20"
        />

        <div className="flex min-w-0 flex-col leading-tight">
          <Link
            href="/"
            className="truncate text-lg font-bold text-gray-800 sm:text-2xl"
          >
            Alumni Association
          </Link>

          <a
            href="https://cse.neu.ac.bd"
            target="_blank"
            rel="noopener noreferrer"
            className="group/uni inline-flex items-center gap-1 truncate text-xs font-semibold text-[#158279] sm:text-sm"
          >
            <span className="truncate">
              Department of{" "}
              <span className="sm:hidden">CSE</span>
              <span className="hidden sm:inline">
                Computer Science &amp; Engineering
              </span>
            </span>
            <ExternalLinkIcon
              className="h-3 w-3 shrink-0 opacity-70 transition-all duration-200 group-hover/uni:-translate-y-0.5 group-hover/uni:translate-x-0.5 group-hover/uni:opacity-100 sm:h-3.5 sm:w-3.5"
              strokeWidth={2}
            />
          </a>

          <a
            href="https://neu.ac.bd"
            target="_blank"
            rel="noopener noreferrer"
            className="group/uni inline-flex items-center gap-1 truncate text-xs font-semibold text-[#991925] sm:text-sm"
          >
            <span className="truncate">Netrokona University</span>
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