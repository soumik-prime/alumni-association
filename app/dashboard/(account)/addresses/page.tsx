import PageTitle, { PageContainer } from "../../_components/PageTitle";
import AddressForm from "../../_components/sections/AddressForm";
import NoProfile from "../../_components/sections/NoProfile";
import { saveAddresses } from "../../_actions/address";
import { P } from "../../_constants/permissions";
import { pageAccess } from "../../_lib/guards";
import { getCountries } from "../../_lib/queries";
import { prisma } from "@/lib/prisma/prisma";

export default async function AddressesPage() {
  const me = await pageAccess();
  const [profile, countries] = await Promise.all([
    prisma.profile.findUnique({
      where: { userId: me.userId },
      select: {
        id: true,
        presentAddress: { select: { city: true, iso2: true } },
        permanentAddress: { select: { city: true, iso2: true } },
      },
    }),
    getCountries(),
  ]);

  return (
    <PageContainer>
      <PageTitle title="Addresses" />
      {profile ? (
        <AddressForm
          present={profile.presentAddress}
          permanent={profile.permanentAddress}
          countries={countries}
          action={saveAddresses.bind(null, profile.id)}
          canEdit={me.can(P.profileEditOwn, P.profileEditAny)}
        />
      ) : (
        <NoProfile />
      )}
    </PageContainer>
  );
}
