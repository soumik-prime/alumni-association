import type { ReactNode } from "react";
import DashboardShell from "./_components/DashboardShell";
import { NAV_SECTIONS } from "./_constants/navigation";
import { pageAccess } from "./_lib/guards";
import { allowedNavHrefs } from "./_lib/navigation";

// Everything under /dashboard depends on the signed-in user.
export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const access = await pageAccess(); // redirects to /auth/login when signed out
  const allowedHrefs = allowedNavHrefs(NAV_SECTIONS, access.can);

  return (
    <DashboardShell allowedHrefs={allowedHrefs} user={{ name: access.name, email: access.email }}>
      {children}
    </DashboardShell>
  );
}
