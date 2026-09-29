import { wrap } from "../_constants/styles";
import type { FeaturedMember } from "../_types/home.types";
import { FeaturedMemberCard } from "./featured-member-card";
import { SectionHead } from "./section-head";

export function FeaturedSection({ members }: { members: FeaturedMember[] }) {
  if (members.length === 0) return null;

  return (
    <section className={`${wrap} relative z-10 py-16`}>
      <SectionHead
        title="Featured Community Members"
        text="A few of the profiles you will find in the directory."
      />
      <div
        className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        tabIndex={0}
        aria-label="Featured members"
      >
        {members.map((m) => (
          <FeaturedMemberCard key={m.id} member={m} />
        ))}
      </div>
    </section>
  );
}
