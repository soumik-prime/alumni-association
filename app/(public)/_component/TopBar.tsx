// Suggested location: components/layout/TopBar.tsx
// Requires: next, lucide-react
// Sits above <Navbar /> — this is branding + a primary action only;
// Navbar.tsx below it handles the six nav links.
// Colors reference your global.css variables directly via inline style,
// since only bg-neu-green / bg-neu-green-hover / text-neu-green /
// border-neu-green exist as real Tailwind utilities.

import Link from "next/link";
import Image from "next/image";
import { ExternalLinkIcon } from "lucide-react";

const logoPath = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/university-logo.png`;

export default function TopBar() {
  return (
    <div className="w-full bg-white py-2 mt-1">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Branding — the "/" link wraps only the icon + name line so the
            department / university lines below aren't nested inside it
            (nesting <a> inside <a> is invalid HTML and breaks hydration) */}
        <div className="flex items-center gap-2.5">
          <Image
            src={logoPath}
            alt="Alumni Association Logo"
            width={64}
            height={64}
            className="h-[64px] w-auto"
          />
          <span className="flex flex-col leading-tight">
            <Link
              href="/"
              className="text-sm font-semibold"
              style={{ color: "var(--neu-gray-800)" }}
            >
              Alumni Association
            </Link>
            <a
              href="https://cse.neu.ac.bd"
              target="_blank"
              rel="noopener noreferrer"
              className="group/uni inline-flex items-center gap-1 text-xs hover:underline"
              style={{ color: "var(--neu-gray-500)" }}
            >
              Department of Computer Science and Engineering
              <ExternalLinkIcon className="h-3 w-3 shrink-0 opacity-70 transition-all duration-200 group-hover/uni:opacity-100 group-hover/uni:translate-x-0.5 group-hover/uni:-translate-y-0.5 sm:h-3.5 sm:w-3.5" strokeWidth={2} />
            </a>
            <a
              href="https://neu.ac.bd"
              target="_blank"
              rel="noopener noreferrer"
              className="group/uni inline-flex items-center gap-1 text-xs hover:underline"
              style={{ color: "var(--neu-gray-500)" }}
            >
              Netrokona University
              <ExternalLinkIcon className="h-3 w-3 shrink-0 opacity-70 transition-all duration-200 group-hover/uni:opacity-100 group-hover/uni:translate-x-0.5 group-hover/uni:-translate-y-0.5 sm:h-3.5 sm:w-3.5" strokeWidth={2} />
            </a>
          </span>
        </div>

        {/* Primary action */}
        {/* <Link
          href="/login"
          className="rounded-md px-4 py-2 text-sm font-medium text-white transition-colors duration-150 [background-color:var(--neu-green)] hover:[background-color:var(--neu-green-hover)]"
        >
          Login
        </Link> */}
      </div>
    </div>
  );
}