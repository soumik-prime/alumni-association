"use client";

import { useState } from "react";
import type { EmploymentType, Industry } from "@/generated/prisma/enums";
import { EMPLOYMENT_LABEL, INDUSTRY_LABEL, toOptions } from "../../_constants/options";
import { addWorkExperience, deleteWorkExperience, updateWorkExperience } from "../../_actions/work-experience";
import { toDateInput, fmtMonth } from "../../_lib/format";
import { Badge, Card, Checkbox, EmptyState, Field, Grid, Input, Notice, Select, SectionHeader } from "../ui";
import ActionButton from "../ui/ActionButton";
import ActionForm from "../ui/ActionForm";
import { CompanyPicker } from "./ReferencePicker";

const TYPES = toOptions(EMPLOYMENT_LABEL);

export type WorkRow = {
  id: string; title: string; careerField: string | null; employmentType: EmploymentType;
  startDate: string; endDate: string | null; // ISO strings (serialisable)
  company: { id: string; name: string; industry: Industry | null };
};

function Fields({
  row, companies, canCreateCompany,
}: { row?: WorkRow; companies: { id: string; name: string }[]; canCreateCompany: boolean }) {
  const [current, setCurrent] = useState(row ? row.endDate === null : false);
  return (
    <>
      <Grid>
        <Field label="Job title"><Input name="title" maxLength={255} defaultValue={row?.title ?? ""} required /></Field>
        <CompanyPicker items={companies} defaultId={row?.company.id} canCreate={canCreateCompany} />
        <Field label="Employment type"><Select name="employmentType" options={TYPES} placeholder="Select type" defaultValue={row?.employmentType ?? ""} required /></Field>
        <Field label="Career field"><Input name="careerField" maxLength={100} defaultValue={row?.careerField ?? ""} placeholder="e.g. Backend engineering" /></Field>
        <Field label="Start date"><Input name="startDate" type="date" defaultValue={toDateInput(row ? new Date(row.startDate) : null)} required /></Field>
        {!current && (
          <Field label="End date"><Input name="endDate" type="date" defaultValue={toDateInput(row?.endDate ? new Date(row.endDate) : null)} /></Field>
        )}
      </Grid>
      <Checkbox name="current" label="I currently work here" checked={current} onChange={(e) => setCurrent(e.target.checked)} />
    </>
  );
}

export default function WorkManager({
  profileId, rows, companies, canEdit, canCreateCompany,
}: {
  profileId: string; rows: WorkRow[]; companies: { id: string; name: string }[];
  canEdit: boolean; canCreateCompany: boolean;
}) {
  return (
    <div className="space-y-6">
      {!canEdit && <Notice tone="warn">You don&apos;t have permission to edit work experience.</Notice>}

      <Card>
        <SectionHeader title="Work experience" description="Newest first." />
        {rows.length === 0 ? (
          <EmptyState>No work experience yet.</EmptyState>
        ) : (
          <ul className="divide-y divide-[var(--neu-gray-100)]">
            {rows.map((r) => (
              <li key={r.id} className="py-3 first:pt-0 last:pb-0">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[var(--neu-gray-800)]">{r.title}</p>
                    <p className="text-sm text-[var(--neu-gray-600)]">
                      {r.company.name}{r.company.industry ? ` · ${INDUSTRY_LABEL[r.company.industry]}` : ""}
                    </p>
                    <p className="mt-0.5 text-xs text-[var(--neu-gray-500)]">
                      {fmtMonth(new Date(r.startDate))} – {r.endDate ? fmtMonth(new Date(r.endDate)) : "Present"}
                      {r.careerField ? ` · ${r.careerField}` : ""}
                    </p>
                  </div>
                  <Badge tone={r.endDate ? "gray" : "green"}>{EMPLOYMENT_LABEL[r.employmentType]}</Badge>
                </div>
                {canEdit && (
                  <details className="mt-2">
                    <summary className="cursor-pointer select-none text-xs font-semibold text-[var(--neu-green)]">Edit</summary>
                    <div className="mt-3 rounded-[var(--neu-radius-md)] bg-[var(--neu-gray-50)] p-3">
                      <ActionForm
                        action={updateWorkExperience.bind(null, profileId, r.id)}
                        extra={
                          <ActionButton variant="danger" confirm="Remove this work experience?" action={deleteWorkExperience.bind(null, profileId, r.id)}>
                            Delete
                          </ActionButton>
                        }
                      >
                        <Fields row={r} companies={companies} canCreateCompany={canCreateCompany} />
                      </ActionForm>
                    </div>
                  </details>
                )}
              </li>
            ))}
          </ul>
        )}
      </Card>

      {canEdit && (
        <Card>
          <SectionHeader title="Add work experience" />
          <ActionForm action={addWorkExperience.bind(null, profileId)} submitLabel="Add experience" pendingLabel="Adding…" resetOnSuccess>
            <Fields companies={companies} canCreateCompany={canCreateCompany} />
          </ActionForm>
        </Card>
      )}
    </div>
  );
}
