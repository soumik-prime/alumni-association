import { CATEGORY_LABEL } from "../../_constants/options";
import { addToGroup, grantPermission, removeFromGroup, revokePermission } from "../../_actions/access";
import { fmtDateTime } from "../../_lib/format";
import { Badge, Card, EmptyState, Field, Grid, Select, SectionHeader } from "../ui";
import ActionButton from "../ui/ActionButton";
import ActionForm from "../ui/ActionForm";
import LocalDateTimeInput from "../ui/LocalDateTimeInput";

export type DirectGrant = {
  id: string; key: string; description: string | null; grantedAt: Date; expireAt: Date | null;
  grantedByName: string | null; state: "active" | "expired" | "revoked";
};
export type Membership = { groupId: string; name: string; description: string; isSystem: boolean };

export default function AccessManager({
  userId, grants, memberships, allGroups, allPermissions, canGrant, canAssign, heldKeys,
}: {
  userId: string;
  grants: DirectGrant[];
  memberships: Membership[];
  allGroups: { id: string; name: string }[];
  allPermissions: { key: string; category: string | null }[];
  canGrant: boolean;
  canAssign: boolean;
  heldKeys: string[];
}) {
  const memberOf = new Set(memberships.map((m) => m.groupId));
  const grantable = allPermissions.filter((p) => heldKeys.includes(p.key));
  const joinable = allGroups.filter((g) => !memberOf.has(g.id));

  return (
    <div className="space-y-6">
      <Card>
        <SectionHeader title="Permission groups" description="Everything in a group applies to the member." />
        {memberships.length === 0 ? (
          <EmptyState>Not in any group.</EmptyState>
        ) : (
          <ul className="divide-y divide-[var(--neu-gray-100)]">
            {memberships.map((m) => (
              <li key={m.groupId} className="flex flex-wrap items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[var(--neu-gray-800)]">{m.name} {m.isSystem && <Badge tone="blue">System</Badge>}</p>
                  <p className="text-xs text-[var(--neu-gray-500)]">{m.description}</p>
                </div>
                {canAssign && (
                  <ActionButton variant="danger" confirm={`Remove from “${m.name}”?`} action={removeFromGroup.bind(null, userId, m.groupId)}>Remove</ActionButton>
                )}
              </li>
            ))}
          </ul>
        )}
        {canAssign && joinable.length > 0 && (
          <div className="mt-4 border-t border-[var(--neu-gray-100)] pt-4">
            <ActionForm action={addToGroup.bind(null, userId)} submitLabel="Add to group" pendingLabel="Adding…" resetOnSuccess>
              <Field label="Add to group">
                <Select name="groupId" options={joinable.map((g) => ({ value: g.id, label: g.name }))} placeholder="Select group" required />
              </Field>
            </ActionForm>
          </div>
        )}
      </Card>

      <Card>
        <SectionHeader title="Direct permissions" description="Granted to this member individually, optionally with an expiry." />
        {grants.length === 0 ? (
          <EmptyState>No direct grants.</EmptyState>
        ) : (
          <ul className="divide-y divide-[var(--neu-gray-100)]">
            {grants.map((g) => (
              <li key={g.id} className="flex flex-wrap items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="font-mono text-[13px] font-semibold text-[var(--neu-gray-800)]">{g.key}</p>
                  <p className="text-xs text-[var(--neu-gray-500)]">
                    {g.description ?? "—"} · granted {fmtDateTime(g.grantedAt)}{g.grantedByName ? ` by ${g.grantedByName}` : ""}
                    {g.expireAt && ` · ${g.state === "expired" ? "expired" : "expires"} ${fmtDateTime(g.expireAt)}`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge tone={g.state === "active" ? "green" : g.state === "expired" ? "amber" : "gray"}>
                    {g.state === "active" ? "Active" : g.state === "expired" ? "Expired" : "Revoked"}
                  </Badge>
                  {canGrant && g.state === "active" && (
                    <ActionButton variant="danger" confirm={`Revoke ${g.key}?`} action={revokePermission.bind(null, userId, g.id)}>Revoke</ActionButton>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
        {canGrant && (
          <div className="mt-4 border-t border-[var(--neu-gray-100)] pt-4">
            <ActionForm action={grantPermission.bind(null, userId)} submitLabel="Grant permission" pendingLabel="Granting…" resetOnSuccess>
              <Grid>
                <Field label="Permission" hint="You can only grant permissions you hold yourself.">
                  <Select
                    name="permissionKey"
                    placeholder="Select permission"
                    required
                    options={grantable.map((p) => ({ value: p.key, label: `${CATEGORY_LABEL[p.category ?? ""] ?? "Other"} · ${p.key}` }))}
                  />
                </Field>
                <Field label="Expires at (optional)"><LocalDateTimeInput name="expireAt" /></Field>
              </Grid>
            </ActionForm>
          </div>
        )}
      </Card>
    </div>
  );
}
