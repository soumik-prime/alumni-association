import { CATEGORY_LABEL } from "../../_constants/options";
import { createGroup, deleteGroup, updateGroup } from "../../_actions/access";
import { Badge, Card, EmptyState, Field, Grid, Input, SectionHeader } from "../ui";
import ActionButton from "../ui/ActionButton";
import ActionForm from "../ui/ActionForm";

export type PermissionOption = { key: string; description: string | null; category: string | null };
export type GroupRow = {
  id: string; name: string; description: string; isSystem: boolean; memberCount: number; keys: string[];
};

function byCategory(perms: PermissionOption[]) {
  const map = new Map<string, PermissionOption[]>();
  for (const p of perms) {
    const c = CATEGORY_LABEL[p.category ?? ""] ?? "Other";
    map.set(c, [...(map.get(c) ?? []), p]);
  }
  return [...map.entries()];
}

function PermissionChecklist({ perms, selected }: { perms: PermissionOption[]; selected?: string[] }) {
  return (
    <div className="max-h-72 space-y-4 overflow-y-auto rounded-[var(--neu-radius-md)] border border-[var(--neu-gray-200)] bg-white p-3">
      {byCategory(perms).map(([category, items]) => (
        <fieldset key={category}>
          <legend className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-[var(--neu-gray-500)]">{category}</legend>
          <div className="grid gap-1 sm:grid-cols-2">
            {items.map((p) => (
              <label key={p.key} className="flex items-start gap-2 text-sm text-[var(--neu-gray-700)]" title={p.description ?? undefined}>
                <input type="checkbox" name="permissionKey" value={p.key} defaultChecked={selected?.includes(p.key)} className="mt-0.5 h-4 w-4 accent-[var(--neu-green)]" />
                <span className="font-mono text-[12px]">{p.key}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
}

export default function GroupsManager({
  groups, permissions, canManage,
}: { groups: GroupRow[]; permissions: PermissionOption[]; canManage: boolean }) {
  const desc = new Map(permissions.map((p) => [p.key, p.description]));
  return (
    <div className="space-y-6">
      <Card>
        <SectionHeader title="Permission groups" description="Bundles of permissions that can be assigned to members." />
        {groups.length === 0 ? (
          <EmptyState>No groups yet.</EmptyState>
        ) : (
          <ul className="divide-y divide-[var(--neu-gray-100)]">
            {groups.map((g) => (
              <li key={g.id} className="py-3 first:pt-0 last:pb-0">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[var(--neu-gray-800)]">{g.name} {g.isSystem && <Badge tone="blue">System</Badge>}</p>
                    <p className="text-sm text-[var(--neu-gray-600)]">{g.description}</p>
                  </div>
                  <p className="text-xs text-[var(--neu-gray-500)]">{g.keys.length} permissions · {g.memberCount} member{g.memberCount === 1 ? "" : "s"}</p>
                </div>

                <details className="mt-2">
                  <summary className="cursor-pointer select-none text-xs font-semibold text-[var(--neu-green)]">
                    {canManage && !g.isSystem ? "View & edit" : "View permissions"}
                  </summary>
                  <div className="mt-3 rounded-[var(--neu-radius-md)] bg-[var(--neu-gray-50)] p-3">
                    {canManage && !g.isSystem ? (
                      <ActionForm
                        action={updateGroup.bind(null, g.id)}
                        extra={
                          <ActionButton variant="danger" confirm={`Delete the “${g.name}” group? Members lose its permissions.`} action={deleteGroup.bind(null, g.id)}>
                            Delete group
                          </ActionButton>
                        }
                      >
                        <Grid>
                          <Field label="Name"><Input name="name" defaultValue={g.name} maxLength={100} required /></Field>
                          <Field label="Description"><Input name="description" defaultValue={g.description} maxLength={160} required /></Field>
                        </Grid>
                        <PermissionChecklist perms={permissions} selected={g.keys} />
                      </ActionForm>
                    ) : g.keys.length === 0 ? (
                      <p className="text-sm text-[var(--neu-gray-500)]">No permissions.</p>
                    ) : (
                      <ul className="grid gap-1 sm:grid-cols-2">
                        {g.keys.map((k) => (
                          <li key={k} className="text-sm" title={desc.get(k) ?? undefined}>
                            <span className="font-mono text-[12px] text-[var(--neu-gray-700)]">{k}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {canManage && (
        <Card>
          <SectionHeader title="New group" />
          <ActionForm action={createGroup} submitLabel="Create group" pendingLabel="Creating…" resetOnSuccess>
            <Grid>
              <Field label="Name"><Input name="name" maxLength={100} required /></Field>
              <Field label="Description"><Input name="description" maxLength={160} required /></Field>
            </Grid>
            <PermissionChecklist perms={permissions} />
          </ActionForm>
        </Card>
      )}
    </div>
  );
}
