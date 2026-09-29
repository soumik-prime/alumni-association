"use client";

import { useState } from "react";
import { INDUSTRY_LABEL, NEW_OPTION, toOptions } from "../../_constants/options";
import { Field, Input, Select } from "../ui";

const INDUSTRIES = toOptions(INDUSTRY_LABEL);

type Item = { id: string; name: string };

/** Institution <select> with an inline "add new" (only when `canCreate`). */
export function InstitutionPicker({
  items, defaultId = "", canCreate,
}: { items: Item[]; defaultId?: string; canCreate: boolean }) {
  const [value, setValue] = useState(defaultId);
  const options = [
    ...items.map((i) => ({ value: i.id, label: i.name })),
    ...(canCreate ? [{ value: NEW_OPTION, label: "＋ Add a new institution…" }] : []),
  ];
  return (
    <>
      <Field label="Institution" hint={canCreate ? undefined : "Can't find yours? Ask an administrator to add it."}>
        <Select name="institutionId" options={options} placeholder="Select institution" value={value} onChange={(e) => setValue(e.target.value)} required />
      </Field>
      {value === NEW_OPTION && (
        <>
          <Field label="New institution name"><Input name="newInstitutionName" maxLength={200} required /></Field>
          <Field label="Website"><Input name="newInstitutionWebsite" type="url" placeholder="https://" /></Field>
        </>
      )}
    </>
  );
}

/** Company <select> with an inline "add new" (only when `canCreate`). */
export function CompanyPicker({
  items, defaultId = "", canCreate,
}: { items: Item[]; defaultId?: string; canCreate: boolean }) {
  const [value, setValue] = useState(defaultId);
  const options = [
    ...items.map((i) => ({ value: i.id, label: i.name })),
    ...(canCreate ? [{ value: NEW_OPTION, label: "＋ Add a new company…" }] : []),
  ];
  return (
    <>
      <Field label="Company / organisation" hint={canCreate ? undefined : "Can't find yours? Ask an administrator to add it."}>
        <Select name="companyId" options={options} placeholder="Select company" value={value} onChange={(e) => setValue(e.target.value)} required />
      </Field>
      {value === NEW_OPTION && (
        <>
          <Field label="New company name"><Input name="newCompanyName" maxLength={200} required /></Field>
          <Field label="Industry"><Select name="newCompanyIndustry" options={INDUSTRIES} placeholder="Not specified" /></Field>
          <Field label="Website"><Input name="newCompanyWebsite" type="url" placeholder="https://" /></Field>
        </>
      )}
    </>
  );
}
