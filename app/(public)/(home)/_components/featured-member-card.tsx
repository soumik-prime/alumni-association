import Link from "next/link";
import { Layers, MapPin, ShieldCheck } from "lucide-react";
import { ROUTES } from "../_constants/home.constants";
import { glass } from "../_constants/styles";
import type { FeaturedMember } from "../_types/home.types";
import { Avatar } from "./avatar";
import { Badge } from "./badge";

export function FeaturedMemberCard({ member: p }: { member: FeaturedMember }) {
  const alumni = p.status === "alumni";

  return (
    <article className={`${glass} relative flex w-[300px] shrink-0 snap-start flex-col p-6 transition hover:-translate-y-0.5 hover:shadow-2xl`}>
      <div className="flex items-center gap-3">
        <Avatar name={p.name} alumni={alumni} size={56} />
        <div className="min-w-0">
          <h3 className="flex items-center gap-1 font-bold text-slate-900">
            <Link href={`${ROUTES.directory}/${p.id}`} className="truncate after:absolute after:inset-0">{p.name}</Link>
            {p.verified && <ShieldCheck size={16} className="shrink-0 text-emerald-600" aria-label="Verified CSE profile" />}
          </h3>
          <p className="line-clamp-2 text-xs text-slate-500">{p.headline}</p>
        </div>
      </div>
      <div className="mt-4 space-y-1 text-xs text-slate-500">
        <p className="flex items-center gap-1.5"><Layers size={14} />Batch {p.batch} · Session {p.session}</p>
        {p.location && <p className="flex items-center gap-1.5"><MapPin size={14} />{p.location}</p>}
      </div>
      <p className="mt-4 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">{p.bio}</p>
      <div className="mt-5 flex items-center justify-between">
        <Badge tone={alumni ? "gold" : "green"}>{alumni ? "Alumni" : "Student"}</Badge>
        <span className="text-xs font-bold text-emerald-700">View Profile</span>
      </div>
    </article>
  );
}
