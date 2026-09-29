/** True when `pathname` is the item's route or one of its nested routes. */
export function isActiveRoute(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

import type { NavSection } from "../_types/navigation";

/** Hrefs of the nav items the user may see (serialisable for client components). */
export function allowedNavHrefs(sections: NavSection[], has: (...keys: string[]) => boolean): string[] {
  return sections.flatMap((s) =>
    s.items.filter((i) => !i.permissions || has(...i.permissions)).map((i) => i.href),
  );
}
