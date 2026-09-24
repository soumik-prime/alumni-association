import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight, GraduationCap } from "lucide-react";

type PersonStatus = "student" | "alumni";
export interface StudentCardProps {
  photoUrl: string;
  name: string;
  status: PersonStatus;
  session: string;
  batch: string;
  location: string;
  href: string;
}
const STATUS_STYLES: Record<
  PersonStatus,
  {
    accent: string;
    badge: string;
    dot: string;
    text: string;
    hoverText: string;
    buttonHover: string;
  }
> = {
  student: {
    accent: "bg-[#176B4D]",
    badge: "bg-[#EAF6F0] text-[#176B4D]",
    dot: "bg-[#1F8A63]",
    text: "text-[#176B4D]",
    hoverText: "group-hover:text-[#176B4D]",
    buttonHover: "group-hover:bg-[#176B4D]",
  },
  alumni: {
    accent: "bg-[#991925]",
    badge: "bg-[#FBECEE] text-[#991925]",
    dot: "bg-[#B52A36]",
    text: "text-[#991925]",
    hoverText: "group-hover:text-[#991925]",
    buttonHover: "group-hover:bg-[#991925]",
  },
};

export default function Card({
  photoUrl,
  name,
  status,
  session,
  batch,
  location,
  href,
}: StudentCardProps) {
  const styles = STATUS_STYLES[status];
  return (
    <Link
      href={href}
      aria-label={`View profile of ${name}`}
      className="flex h-full w-full items-center justify-center"
    >
      <div className="group relative flex h-full w-full max-w-72 md:max-w-85 flex-col overflow-hidden rounded-2xl md:rounded-[28px] bg-white p-3 md:p-4 text-left shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.10)]">
        <div className={`absolute inset-x-0 top-0 h-1 ${styles.accent}`} />
        <div className="relative aspect-square w-full overflow-hidden rounded-xl md:rounded-[22px] bg-[#F3F6F4]">
          <Image
            src={photoUrl}
            alt={name}
            fill
            sizes="(max-width: 768px) 288px, 340px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
        <div className="mt-2.5 md:mt-4 flex flex-col gap-1 px-1 md:px-2">
          <h3
            className={`line-clamp-1 text-base md:text-xl font-bold text-[#17211D] transition-colors duration-200 ${styles.hoverText}`}
          >
            {name}
          </h3>
          <div className="flex items-center gap-1.5 text-[11px] md:text-xs text-[#66736D]">
            <GraduationCap
              className="h-3 w-3 md:h-3.5 md:w-3.5 shrink-0 text-[#82908A]"
              strokeWidth={1.8}
            />
            <span className="line-clamp-1">
              {session} • Batch {batch}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] md:text-xs text-[#66736D]">
            <MapPin
              className="h-3 w-3 md:h-3.5 md:w-3.5 shrink-0 text-[#82908A]"
              strokeWidth={1.8}
            />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>
        <div className="mt-3 md:mt-4 flex items-center justify-between gap-1.5 md:gap-2 rounded-xl md:rounded-2xl bg-[#F3F6F4] p-2 md:p-2.5">
          <span
            className={`inline-flex shrink-0 items-center gap-1 md:gap-1.5 rounded-full px-2 md:px-2.5 py-1 md:py-1.5 text-[10px] md:text-[11px] font-semibold ${styles.badge}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
            {status === "student" ? "Student" : "Alumni"}
          </span>
          <span
            className={`inline-flex items-center gap-1 md:gap-1.5 rounded-lg md:rounded-xl bg-white px-2.5 md:px-3 py-1 sm:py-1.5 md:py-2 text-[10px] md:text-xs font-semibold shadow-sm transition-all duration-150 ${styles.text} ${styles.buttonHover} group-hover:text-white`}
          >
            View Profile
            <ArrowUpRight className="hidden sm:block h-3 w-3 md:h-3.5 md:w-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
