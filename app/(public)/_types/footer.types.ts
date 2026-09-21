import type { ComponentType, ReactNode } from "react";

export interface FooterLinkItem {
  href: string;
  label: string;
  external?: boolean;
}

export interface FooterSocialItem {
  name: string;
  href: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
}

export interface FooterContactInfo {
  addressLines: readonly string[];
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
}

export interface FooterDeveloper {
  name: string;
  href: string;
}

export type FooterTagline = ReactNode;
