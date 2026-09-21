import { Mail } from "lucide-react";
import { HEADER_CONTACT } from "../../_constants/header.data";
import type { ContactLinkProps } from "../../_types/header.types";

export function ContactLink({
  variant = "full",
  onClick,
}: ContactLinkProps) {
  if (variant === "compact") {
    return (
      <a
        href={`mailto:${HEADER_CONTACT.email}`}
        onClick={onClick}
        className="group flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-gray-600 transition-colors hover:bg-[#eff6f5] hover:text-[#268b81]"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eff6f5] text-[#268b81] transition-colors group-hover:bg-[#268b81] group-hover:text-white">
          <Mail className="h-4 w-4" />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="font-semibold text-gray-900 group-hover:text-[#268b81]">
            {HEADER_CONTACT.label}
          </span>
          <span className="text-xs text-gray-500">{HEADER_CONTACT.email}</span>
        </span>
      </a>
    );
  }

  return (
    <a
      href={`mailto:${HEADER_CONTACT.email}`}
      onClick={onClick}
      className="group inline-flex items-center gap-4 border border-gray-100/75 rounded-2xl bg-transparent px-4 py-2 shrink-0 transition-all duration-200 hover:bg-[#eff6f5]"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eff6f5] text-[#268b81] transition-colors duration-200 group-hover:bg-[#268b81] group-hover:text-white">
        <Mail className="h-5 w-5" strokeWidth={2} />
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-bold uppercase tracking-wider text-[#8a9ca8]">
          {HEADER_CONTACT.label}
        </span>
        <span className="text-sm font-bold text-gray-700">{HEADER_CONTACT.email}</span>
      </div>
    </a>
  );
}
