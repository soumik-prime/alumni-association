"use client";

import { useState } from "react";
import { registerUser } from "../../_actions/users";
import { Card, Checkbox, Field, Grid, Input, Notice, SectionHeader } from "../ui";
import ActionForm from "../ui/ActionForm";

export default function RegisterUserForm({
  groups, canAssignGroups, canSetVisibility,
}: {
  groups: { id: string; name: string; description: string }[];
  canAssignGroups: boolean;
  canSetVisibility: boolean;
}) {
  const [withProfile, setWithProfile] = useState(true);

  return (
    <Card>
      <SectionHeader
        title="Register a member"
        description="Name and email are permanent once created. A profile is optional — the person can also create their own later."
      />
      <ActionForm
        action={registerUser}
        submitLabel="Create account"
        pendingLabel="Creating…"
        resetOnSuccess
        renderSuccess={(s) => (
          <Notice tone="success">
            <p className="font-medium">{s.message}</p>
            {s.payload?.password && (
              <div className="mt-2 space-y-1">
                <p>
                  Temporary password (shown once — share it securely):{" "}
                  <code className="select-all rounded bg-white px-1.5 py-0.5 font-mono text-[13px] text-[var(--neu-gray-800)]">
                    {s.payload.password}
                  </code>
                </p>
                <p className="text-xs">They can also use “Forgot password” on the sign-in page to choose their own.</p>
              </div>
            )}
          </Notice>
        )}
      >
        <Grid>
          <Field label="Full name"><Input name="name" required maxLength={100} /></Field>
          <Field label="Email"><Input name="email" type="email" required /></Field>
        </Grid>

        <Checkbox name="createProfile" label="Create an alumni profile now" checked={withProfile} onChange={(e) => setWithProfile(e.target.checked)} />

        {withProfile && (
          <div className="space-y-4 rounded-[var(--neu-radius-md)] bg-[var(--neu-gray-50)] p-3">
            <Grid>
              <Field label="Registration no." hint="Up to 9 letters/digits"><Input name="regNo" maxLength={9} required /></Field>
              <Field label="Batch"><Input name="batch" type="number" min={1} max={500} required /></Field>
              <Field label="Session" hint="e.g. 2021-22"><Input name="session" maxLength={7} placeholder="2021-22" required /></Field>
              <Field label="Graduation date"><Input name="graduationDate" type="date" /></Field>
            </Grid>
            {canSetVisibility && <Checkbox name="visible" label="Show in the public directory" defaultChecked />}
          </div>
        )}

        {canAssignGroups && groups.length > 0 && (
          <fieldset className="space-y-2">
            <legend className="mb-1 text-xs font-semibold text-[var(--neu-gray-600)]">Permission groups (optional)</legend>
            {groups.map((g) => (
              <label key={g.id} className="flex items-start gap-2 text-sm text-[var(--neu-gray-700)]">
                <input type="checkbox" name="groupId" value={g.id} className="mt-0.5 h-4 w-4 accent-[var(--neu-green)]" />
                <span><span className="font-medium">{g.name}</span> <span className="text-[var(--neu-gray-500)]">— {g.description}</span></span>
              </label>
            ))}
          </fieldset>
        )}
      </ActionForm>
    </Card>
  );
}
