import PageTitle, { PageContainer } from "../../_components/PageTitle";
import ProfileForm from "../../_components/sections/ProfileForm";
import VisibilityCard from "../../_components/sections/VisibilityCard";
import { Notice } from "../../_components/ui";
import { createOwnProfile, updateProfile, uploadProfilePhoto } from "../../_actions/profile";
import { P } from "../../_constants/permissions";
import { pageAccess } from "../../_lib/guards";
import { getOwnProfile } from "../../_lib/queries";

export default async function ProfilePage() {
  const me = await pageAccess();
  const profile = await getOwnProfile(me.userId);

  return (
    <PageContainer>
      <PageTitle title="Profile" description="Who you are in the alumni directory." />

      {!profile ? (
        me.can(P.profileCreate) ? (
          <ProfileForm profile={null} action={createOwnProfile} />
        ) : (
          <Notice tone="warn">You don&apos;t have a profile and you don&apos;t have permission to create one. Ask an administrator.</Notice>
        )
      ) : (
        <>
          <ProfileForm
            profile={profile}
            action={updateProfile.bind(null, profile.id)}
            photoAction={uploadProfilePhoto.bind(null, profile.id)}
            canEdit={me.can(P.profileEditOwn, P.profileEditAny)}
          />
          <VisibilityCard profileId={profile.id} visible={profile.visible} canToggle={me.can(P.profileVisibility)} />
        </>
      )}
    </PageContainer>
  );
}
