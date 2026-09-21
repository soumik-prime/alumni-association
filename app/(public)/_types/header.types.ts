export type ContactLinkVariant = "full" | "compact";

export interface ContactLinkProps {
  variant?: ContactLinkVariant;
  onClick?: () => void;
}

export interface HeaderNavLink {
  href: string;
  label: string;
}
