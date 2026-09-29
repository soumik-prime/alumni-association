import {
  Bell,
  BookOpen,
  BriefcaseBusiness,
  FolderKey,
  GraduationCap,
  KeyRound,
  LayoutDashboard,
  MapPin,
  Share2,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";
import type { NavSection } from "../_types/navigation";
import { NOTIFICATIONS_AREA, P, USERS_AREA } from "./permissions";

export const DASHBOARD_BASE_PATH = "/dashboard";
export const DASHBOARD_HOME_PATH = `${DASHBOARD_BASE_PATH}/overview`;

// `permissions` is any-of; the layout hides items the user holds none of.
export const NAV_SECTIONS: NavSection[] = [
  {
    items: [
      { label: "Overview", href: `${DASHBOARD_BASE_PATH}/overview`, icon: LayoutDashboard },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Profile", href: `${DASHBOARD_BASE_PATH}/profile`, icon: UserRound },
      { label: "Social & Contact", href: `${DASHBOARD_BASE_PATH}/social-contact`, icon: Share2 },
      { label: "Education History", href: `${DASHBOARD_BASE_PATH}/education`, icon: GraduationCap },
      { label: "Work Experience", href: `${DASHBOARD_BASE_PATH}/work-experience`, icon: BriefcaseBusiness },
      { label: "Publications", href: `${DASHBOARD_BASE_PATH}/publications`, icon: BookOpen },
      { label: "Addresses", href: `${DASHBOARD_BASE_PATH}/addresses`, icon: MapPin },
      { label: "Security", href: `${DASHBOARD_BASE_PATH}/security`, icon: ShieldCheck },
    ],
  },
  {
    title: "Site",
    items: [
      { label: "Users", href: `${DASHBOARD_BASE_PATH}/users`, icon: Users, permissions: USERS_AREA },
      { label: "Notifications", href: `${DASHBOARD_BASE_PATH}/notifications`, icon: Bell, permissions: NOTIFICATIONS_AREA },
    ],
  },
  {
    title: "Access Control",
    items: [
      { label: "Permissions", href: `${DASHBOARD_BASE_PATH}/permissions`, icon: KeyRound },
      { label: "Permission Groups", href: `${DASHBOARD_BASE_PATH}/permission-groups`, icon: FolderKey, permissions: [P.groupsManage, P.groupsAssign, P.permGrant] },
    ],
  },
];