import FooterTitle from "./FooterTitle";
import FooterLinks from "./FooterLinks";
import type { FooterLinkItem } from "../../_types/footer.types";

interface FooterLinksColumnProps {
  title: string;
  links: readonly FooterLinkItem[];
}

export default function FooterLinksColumn({
  title,
  links,
}: FooterLinksColumnProps) {
  return (
    <div>
      <FooterTitle title={title} />
      <FooterLinks links={links} />
    </div>
  );
}
