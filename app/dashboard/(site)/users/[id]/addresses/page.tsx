import { notFound } from "next/navigation";
import AddressForm from "../../../../_components/sections/AddressForm";
import { AccessDenied } from "../../../../_components/ui";
import { saveAddresses } from "../../../../_actions/address";
import { P } from "../../../../_constants/permissions";
import { getCountries } from "../../../../_lib/queries";
import { loadTarget } from "../../../../_lib/target-user";
import { prisma } from "@/lib/prisma/prisma";

export default async function ManageUserAddresses({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { me, profile } = await loadTarget(id);
  if (!profile) notFound();
  if (!me.can(P.profileEditAny)) return <AccessDenied />;

  const [addresses, countries] = await Promise.all([
    prisma.profile.findUniqueOrThrow({
      where: { id: profile.id },
      select: {
        presentAddress: { select: { city: true, iso2: true } },
        permanentAddress: { select: { city: true, iso2: true } },
      },
    }),
    getCountries(),
  ]);

  return (
    <AddressForm
      present={addresses.presentAddress}
      permanent={addresses.permanentAddress}
      countries={countries}
      action={saveAddresses.bind(null, profile.id)}
    />
  );
}
