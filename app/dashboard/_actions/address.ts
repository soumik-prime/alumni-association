"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma/prisma";
import { P } from "../_constants/permissions";
import type { ActionState } from "../_lib/action-state";
import { bool, str } from "../_lib/form";
import { ActionError, run } from "../_lib/guards";
import { authorizeProfile } from "../_lib/profile-access";

/** Address rows are shared: same city + country -> same row. */
async function findOrCreateAddress(city: string, iso2: string, label: string): Promise<string | null> {
  if (!city && !iso2) return null;
  if (!city || !iso2) throw new ActionError(`${label}: choose both a city and a country, or leave both empty.`);
  if (city.length > 100) throw new ActionError(`${label} city must be 100 characters or fewer.`);
  const country = await prisma.country.findUnique({ where: { iso2 }, select: { iso2: true } });
  if (!country) throw new ActionError(`${label}: choose a valid country.`);
  const existing = await prisma.address.findFirst({
    where: { iso2, city: { equals: city, mode: "insensitive" } },
    select: { id: true },
  });
  if (existing) return existing.id;
  return (await prisma.address.create({ data: { city, iso2 }, select: { id: true } })).id;
}

export async function saveAddresses(profileId: string, _prev: ActionState, fd: FormData): Promise<ActionState> {
  return run(async () => {
    await authorizeProfile(profileId, P.profileEditOwn, P.profileEditAny);

    const presentId = await findOrCreateAddress(str(fd, "presentCity"), str(fd, "presentCountry"), "Present address");
    const permanentId = bool(fd, "sameAsPresent")
      ? presentId
      : await findOrCreateAddress(str(fd, "permanentCity"), str(fd, "permanentCountry"), "Permanent address");

    await prisma.profile.update({
      where: { id: profileId },
      data: { presentAddressId: presentId, permanentAddressId: permanentId },
    });
    revalidatePath("/dashboard", "layout");
    return "Addresses saved.";
  });
}
