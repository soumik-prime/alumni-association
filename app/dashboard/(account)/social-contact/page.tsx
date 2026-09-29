import PageTitle, { PageContainer } from "../../_components/PageTitle";
import NoProfile from "../../_components/sections/NoProfile";
import SocialForm from "../../_components/sections/SocialForm";
import { updateSocial } from "../../_actions/profile";
import { P } from "../../_constants/permissions";
import { pageAccess } from "../../_lib/guards";
import { getOwnProfile } from "../../_lib/queries";

export default async function SocialContactPage() {
  const me = await pageAccess();
  const profile = await getOwnProfile(me.userId);

  return (
    <PageContainer>
      <PageTitle title="Social & Contact" />
      {profile ? (
        <SocialForm profile={profile} action={updateSocial.bind(null, profile.id)} canEdit={me.can(P.profileEditOwn, P.profileEditAny)} />
      ) : (
        <NoProfile />
      )}
    </PageContainer>
  );
}
