import { notFound } from "next/navigation";
import ProfileForm from "../../../../_components/sections/ProfileForm";
import { AccessDenied } from "../../../../_components/ui";
import { updateProfile, uploadProfilePhoto } from "../../../../_actions/profile";
import { P } from "../../../../_constants/permissions";
import { loadTarget } from "../../../../_lib/target-user";

export default async function ManageUserProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { me, profile } = await loadTarget(id);
  if (!profile) notFound();
  if (!me.can(P.profileEditAny)) return <AccessDenied />;
  return <ProfileForm profile={profile} action={updateProfile.bind(null, profile.id)} photoAction={uploadProfilePhoto.bind(null, profile.id)} />;
}
