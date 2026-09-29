import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Any-of. Omit for items every signed-in user can see. */
  permissions?: string[];
};

export type NavSection = {
  /** Omit for an untitled group (e.g. Overview at the top). */
  title?: string;
  items: NavItem[];
};
