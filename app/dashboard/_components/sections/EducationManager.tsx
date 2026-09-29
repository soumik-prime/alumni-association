import type { Degree } from "@/generated/prisma/enums";
import { DEGREE_LABEL, toOptions } from "../../_constants/options";
import { addEducation, deleteEducation, updateEducation } from "../../_actions/education";
import { Badge, Card, EmptyState, Field, Grid, Input, Notice, Select, SectionHeader } from "../ui";
import ActionButton from "../ui/ActionButton";
import ActionForm from "../ui/ActionForm";
import { InstitutionPicker } from "./ReferencePicker";

const DEGREES = toOptions(DEGREE_LABEL);

export type EducationRow = {
  id: string; degree: Degree; field: string | null; graduationYear: number | null;
  institution: { id: string; name: string; website: string | null };
};

function Fields({
  row, institutions, canCreateInstitution,
}: { row?: EducationRow; institutions: { id: string; name: string }[]; canCreateInstitution: boolean }) {
  return (
    <Grid>
      <InstitutionPicker items={institutions} defaultId={row?.institution.id} canCreate={canCreateInstitution} />
      <Field label="Degree"><Select name="degree" options={DEGREES} placeholder="Select degree" defaultValue={row?.degree ?? ""} required /></Field>
      <Field label="Field of study"><Input name="field" maxLength={50} defaultValue={row?.field ?? ""} /></Field>
      <Field label="Graduation year"><Input name="graduationYear" type="number" min={1950} max={new Date().getFullYear() + 10} defaultValue={row?.graduationYear ?? ""} /></Field>
    </Grid>
  );
}

export default function EducationManager({
  profileId, rows, institutions, canEdit, canCreateInstitution,
}: {
  profileId: string; rows: EducationRow[]; institutions: { id: string; name: string }[];
  canEdit: boolean; canCreateInstitution: boolean;
}) {
  return (
    <div className="space-y-6">
      {!canEdit && <Notice tone="warn">You don&apos;t have permission to edit education records.</Notice>}

      <Card>
        <SectionHeader title="Education history" description="SSC, HSC and any further study." />
        {rows.length === 0 ? (
          <EmptyState>No education records yet.</EmptyState>
        ) : (
          <ul className="divide-y divide-[var(--neu-gray-100)]">
            {rows.map((r) => (
              <li key={r.id} className="py-3 first:pt-0 last:pb-0">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[var(--neu-gray-800)]">
                      {DEGREE_LABEL[r.degree]}{r.field ? ` · ${r.field}` : ""}
                    </p>
                    <p className="text-sm text-[var(--neu-gray-600)]">{r.institution.name}</p>
                  </div>
                  {r.graduationYear && <Badge>{r.graduationYear}</Badge>}
                </div>
                {canEdit && (
                  <details className="group mt-2">
                    <summary className="cursor-pointer select-none text-xs font-semibold text-[var(--neu-green)]">Edit</summary>
                    <div className="mt-3 rounded-[var(--neu-radius-md)] bg-[var(--neu-gray-50)] p-3">
                      <ActionForm
                        action={updateEducation.bind(null, profileId, r.id)}
                        extra={
                          <ActionButton variant="danger" confirm="Remove this education record?" action={deleteEducation.bind(null, profileId, r.id)}>
                            Delete
                          </ActionButton>
                        }
                      >
                        <Fields row={r} institutions={institutions} canCreateInstitution={canCreateInstitution} />
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
          <SectionHeader title="Add education" />
          <ActionForm action={addEducation.bind(null, profileId)} submitLabel="Add education" pendingLabel="Adding…" resetOnSuccess>
            <Fields institutions={institutions} canCreateInstitution={canCreateInstitution} />
          </ActionForm>
        </Card>
      )}
    </div>
  );
}
