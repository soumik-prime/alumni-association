import { Mail } from "lucide-react";

import FacebookIcon from "../_components/ui/FacebookIcon";
import LinkedinIcon from "../_components/ui/LinkedinIcon";
import GithubIcon from "../_components/ui/GithubIcon";

import type {
  FooterContactInfo,
  FooterDeveloper,
  FooterLinkItem,
  FooterSocialItem,
} from "../_types/footer.types";

export const QUICK_LINKS: readonly FooterLinkItem[] = [
  { href: "/directory", label: "Students & Alumni" },
  { href: "/batches", label: "Batches" },
  { href: "/statistics", label: "Statistics" },
  { href: "/publications", label: "Publications" },
  { href: "/about", label: "About" },
];

export const UNIVERSITY_LINKS: readonly FooterLinkItem[] = [
  {
    href: "https://cse.neu.ac.bd",
    label: "CSE Department Site",
    external: true,
  },
  {
    href: "https://neu.ac.bd",
    label: "Netrokona University",
    external: true,
  },
];

export const SOCIALS: readonly FooterSocialItem[] = [
  {
    name: "Email",
    href: "#",
    icon: Mail,
  },
  {
    name: "Facebook",
    href: "#",
    icon: FacebookIcon,
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: LinkedinIcon,
  },
  {
    name: "GitHub",
    href: "#", // TODO: point this at the real department/org GitHub
    icon: GithubIcon,
  },
];

export const CONTACT_INFO: FooterContactInfo = {
  addressLines: [
    "Department of CSE",
    "Netrokona University",
    "Netrokona, Bangladesh",
  ],
  phone: "+880 15xxxxxxxx",
  email: "csealumni@neu.xx.xx",
};

export const DEVELOPER: FooterDeveloper = {
  name: "Md. Samiul Islam Soumik",
  href: "https://github.com/soumik-prime",
};
