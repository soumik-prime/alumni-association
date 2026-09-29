import { notFound } from "next/navigation";
import SocialForm from "../../../../_components/sections/SocialForm";
import { AccessDenied } from "../../../../_components/ui";
import { updateSocial } from "../../../../_actions/profile";
import { P } from "../../../../_constants/permissions";
import { loadTarget } from "../../../../_lib/target-user";

export default async function ManageUserSocial({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { me, profile } = await loadTarget(id);
  if (!profile) notFound();
  if (!me.can(P.profileEditAny)) return <AccessDenied />;
  return <SocialForm profile={profile} action={updateSocial.bind(null, profile.id)} />;
}
