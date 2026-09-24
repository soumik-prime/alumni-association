import type { HeaderNavLink } from "../_types/header.types";

export const HEADER_CONTACT = {
  email: "csealumni@neu.xx.xx",
  label: "Contact us",
} as const;

export const HEADER_BRAND = {
  logoSrc: "/logo.png",
  logoAlt: "Netrokona University Logo",
  homeLabel: "CSE Alumni Association",
  departmentHref: "https://cse.neu.ac.bd",
  departmentLabel: "Department of",
  departmentShortLabel: "CSE",
  departmentFullLabel: "Computer Science & Engineering",
  universityHref: "https://neu.ac.bd",
  universityLabel: "Netrokona University",
} as const;

export const HEADER_UI = {
  mainNavigationLabel: "Main",
  mobileMenuLabel: "Menu",
  mobileNavigationLabel: "Site navigation",
  toggleNavigationLabel: "Toggle navigation menu",
  closeNavigationLabel: "Close navigation menu",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/directory", label: "Students & Alumni" },
  { href: "/blogs", label: "Blogs" },
  { href: "/publications", label: "Publications" },
  { href: "/statistics", label: "Statistics" },
  { href: "/about", label: "About" },
  // { href: "/dashboard", label: "Dashboard" },
  // { href: "/profile/me", label: "👤 My Profile" },
] as const satisfies readonly HeaderNavLink[];
