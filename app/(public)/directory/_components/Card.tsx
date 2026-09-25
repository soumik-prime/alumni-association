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
      <div className="group relative flex h-full w-full max-w-62.5 flex-col overflow-hidden rounded-xl bg-white p-2.5 text-left shadow-[0_2px_10px_rgba(0,0,0,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(0,0,0,0.10)] sm:max-w-65 md:rounded-2xl md:p-3">
        <div className={`absolute inset-x-0 top-0 h-0.5 ${styles.accent}`} />

        {/* Image */}
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#F3F6F4] md:rounded-xl">
          <Image
            src={photoUrl}
            alt={name}
            fill
            sizes="(max-width: 640px) 230px, (max-width: 768px) 240px, 260px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>

        {/* Information */}
        <div className="mt-2 flex flex-col gap-0.5 px-0.5 md:mt-2.5 md:px-1">
          <h3
            className={`line-clamp-1 text-sm font-bold text-[#17211D] transition-colors duration-200 md:text-base ${styles.hoverText}`}
          >
            {name}
          </h3>

          <div className="flex items-center gap-1 text-[10px] text-[#66736D] md:text-[11px]">
            <GraduationCap
              className="h-3 w-3 shrink-0 text-[#82908A]"
              strokeWidth={1.8}
            />
            <span className="line-clamp-1">
              {session} • Batch {batch}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[10px] text-[#66736D] md:text-[11px]">
            <MapPin
              className="h-3 w-3 shrink-0 text-[#82908A]"
              strokeWidth={1.8}
            />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-2 flex items-center justify-between gap-1 rounded-lg bg-[#F3F6F4] p-1.5 md:mt-2.5 md:rounded-xl md:p-2">
          <span
            className={`inline-flex shrink-0 items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-semibold md:px-2 md:py-1 md:text-[10px] ${styles.badge}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
            {status === "student" ? "Student" : "Alumni"}
          </span>

          <span
            className={`inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 text-[9px] font-semibold shadow-sm transition-all duration-150 md:rounded-lg md:px-2.5 md:py-1.5 md:text-[10px] ${styles.text} ${styles.buttonHover} group-hover:text-white`}
          >
            View Profile
            <ArrowUpRight className="hidden h-3 w-3 transition-transform duration-150 lg:block group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}