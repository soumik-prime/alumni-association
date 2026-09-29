import { AccessDenied, Badge, Card, Field, Input, Notice, SectionHeader } from "../../../_components/ui";
import ActionButton from "../../../_components/ui/ActionButton";
import VisibilityCard from "../../../_components/sections/VisibilityCard";
import { deleteProfile } from "../../../_actions/profile";
import { deleteUser } from "../../../_actions/users";
import { P, USERS_AREA } from "../../../_constants/permissions";
import { fmtDate } from "../../../_lib/format";
import { loadTarget } from "../../../_lib/target-user";

export default async function ManageUserOverview({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { me, user, profile, isSelf } = await loadTarget(id);
  if (!me.can(...USERS_AREA)) return <AccessDenied />;

  return (
    <>
      <Card>
        <SectionHeader
          title="Account"
          description="Name and email are set at registration and can't be changed."
          actions={<Badge tone={user.emailVerified ? "green" : "amber"}>{user.emailVerified ? "Email verified" : "Not verified"}</Badge>}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name"><Input value={user.name} readOnly disabled /></Field>
          <Field label="Email"><Input value={user.email} readOnly disabled /></Field>
          <Field label="Joined"><Input value={fmtDate(user.createdAt)} readOnly disabled /></Field>
        </div>
      </Card>

      {profile ? (
        <>
          <Card>
            <SectionHeader title="Alumni profile" description={`${profile.name} · Reg. no. ${profile.regNo} · Batch ${profile.batch} · ${profile.session}`} />
            {!me.can(P.profileEditAny) && (
              <p className="text-sm text-[var(--neu-gray-500)]">You can view this profile but not edit it.</p>
            )}
          </Card>
          <VisibilityCard profileId={profile.id} visible={profile.visible} canToggle={me.can(P.profileVisibility)} />
        </>
      ) : (
        <Notice tone="info">This account has no alumni profile. Members create their own from the Profile page.</Notice>
      )}

      {(me.can(P.profileDelete) && profile && !isSelf) || (me.can(P.usersDelete) && !isSelf) ? (
        <Card className="border-red-200">
          <SectionHeader title="Danger zone" />
          <div className="space-y-4">
            {profile && me.can(P.profileDelete) && !isSelf && (
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-[var(--neu-gray-600)]">Delete the alumni profile, education and work history. The account stays.</p>
                <ActionButton variant="danger" confirm="Delete this profile and its education & work history?" action={deleteProfile.bind(null, profile.id)}>
                  Delete profile
                </ActionButton>
              </div>
            )}
            {me.can(P.usersDelete) && !isSelf && (
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-[var(--neu-gray-600)]">Permanently delete the account, its sessions, permissions and profile.</p>
                <ActionButton variant="danger" confirm={`Permanently delete ${user.name}'s account? This can't be undone.`} action={deleteUser.bind(null, user.id)}>
                  Delete account
                </ActionButton>
              </div>
            )}
          </div>
        </Card>
      ) : null}
    </>
  );
}
