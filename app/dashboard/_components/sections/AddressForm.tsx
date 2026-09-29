"use client";

import { useState } from "react";
import type { FormAction } from "../../_lib/action-state";
import { Card, Checkbox, Field, Grid, Input, Notice, Select, SectionHeader } from "../ui";
import ActionForm from "../ui/ActionForm";

type Country = { iso2: string; name: string; flag: string | null };
type Addr = { city: string; iso2: string } | null;

export default function AddressForm({
  present, permanent, countries, action, canEdit = true,
}: { present: Addr; permanent: Addr; countries: Country[]; action: FormAction; canEdit?: boolean }) {
  const same = !!present && !!permanent && present.city === permanent.city && present.iso2 === permanent.iso2;
  const [sameAsPresent, setSame] = useState(same);
  const options = countries.map((c) => ({ value: c.iso2, label: `${c.flag ? c.flag + " " : ""}${c.name}` }));

  return (
    <Card>
      <SectionHeader title="Addresses" description="City and country only — no street addresses are stored." />
      {!canEdit && <div className="mb-4"><Notice tone="warn">You don&apos;t have permission to edit this profile.</Notice></div>}
      <ActionForm action={action} readOnly={!canEdit}>
        <div>
          <h3 className="mb-2 text-sm font-semibold text-[var(--neu-gray-700)]">Present address</h3>
          <Grid>
            <Field label="City"><Input name="presentCity" maxLength={100} defaultValue={present?.city ?? ""} /></Field>
            <Field label="Country"><Select name="presentCountry" options={options} placeholder="Select country" defaultValue={present?.iso2 ?? ""} /></Field>
          </Grid>
        </div>
        <div>
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-[var(--neu-gray-700)]">Permanent address</h3>
            <Checkbox
              name="sameAsPresent"
              label="Same as present"
              checked={sameAsPresent}
              onChange={(e) => setSame(e.target.checked)}
            />
          </div>
          {!sameAsPresent && (
            <Grid>
              <Field label="City"><Input name="permanentCity" maxLength={100} defaultValue={permanent?.city ?? ""} /></Field>
              <Field label="Country"><Select name="permanentCountry" options={options} placeholder="Select country" defaultValue={permanent?.iso2 ?? ""} /></Field>
            </Grid>
          )}
        </div>
      </ActionForm>
    </Card>
  );
}
