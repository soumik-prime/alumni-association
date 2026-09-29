"use client";

import { useState } from "react";
import type { PublicationStatus, PublicationType } from "@/generated/prisma/enums";
import {
  PUBLICATION_STATUS_LABEL, PUBLICATION_TYPE_LABEL, toOptions,
} from "../../_constants/options";
import { addPublication, deletePublication, updatePublication } from "../../_actions/publications";
import { Badge, Btn, Card, EmptyState, Field, Grid, Input, Notice, Select, SectionHeader, Textarea } from "../ui";
import ActionButton from "../ui/ActionButton";
import ActionForm from "../ui/ActionForm";

const TYPES = toOptions(PUBLICATION_TYPE_LABEL);
const STATUSES = toOptions(PUBLICATION_STATUS_LABEL);

export type PublicationRow = {
  id: string; title: string; abstract: string | null; type: PublicationType; venue: string | null;
  doi: string | null; externalUrl: string | null; publishedYear: number | null; status: PublicationStatus;
  /** True when the signed-in user added it (the only people who can edit). */
  mine: boolean;
  authors: { order: number; regNo: string | null; name: string }[];
};

type AuthorDraft = { key: number; regNo: string; name: string };

/** Each row posts `authorRegNo` + `authorName`; a reg no. links a member. */
function AuthorsField({ initial }: { initial: { regNo: string | null; name: string }[] }) {
  const seed = initial.length ? initial : [{ regNo: "", name: "" }];
  const [rows, setRows] = useState<AuthorDraft[]>(seed.map((a, i) => ({ key: i, regNo: a.regNo ?? "", name: a.regNo ? "" : a.name })));
  const [next, setNext] = useState(seed.length);

  return (
    <div>
      <span className="mb-1 block text-xs font-semibold text-[var(--neu-gray-600)]">Authors (in order)</span>
      <div className="space-y-2">
        {rows.map((r, i) => (
          <div key={r.key} className="flex flex-wrap items-center gap-2">
            <span className="w-5 text-xs text-[var(--neu-gray-500)]">{i + 1}.</span>
            <Input name="authorRegNo" placeholder="Member reg. no." maxLength={9} defaultValue={r.regNo} className="w-40" />
            <span className="text-xs text-[var(--neu-gray-500)]">or</span>
            <Input name="authorName" placeholder="Outside co-author name" maxLength={150} defaultValue={r.name} className="min-w-0 flex-1" />
            {rows.length > 1 && (
              <Btn size="sm" variant="secondary" onClick={() => setRows(rows.filter((x) => x.key !== r.key))} aria-label="Remove author">✕</Btn>
            )}
          </div>
        ))}
      </div>
      <Btn size="sm" variant="secondary" className="mt-2" onClick={() => { setRows([...rows, { key: next, regNo: "", name: "" }]); setNext(next + 1); }}>
        + Add author
      </Btn>
    </div>
  );
}

function Fields({ row }: { row?: PublicationRow }) {
  return (
    <>
      <Field label="Title"><Input name="title" maxLength={500} defaultValue={row?.title ?? ""} required /></Field>
      <Grid>
        <Field label="Type"><Select name="type" options={TYPES} defaultValue={row?.type ?? "JOURNAL"} /></Field>
        <Field label="Status"><Select name="status" options={STATUSES} defaultValue={row?.status ?? "DRAFT"} /></Field>
        <Field label="Venue"><Input name="venue" maxLength={255} defaultValue={row?.venue ?? ""} placeholder="Journal / conference" /></Field>
        <Field label="Year"><Input name="publishedYear" type="number" min={1950} max={new Date().getFullYear() + 1} defaultValue={row?.publishedYear ?? ""} /></Field>
        <Field label="DOI"><Input name="doi" maxLength={255} defaultValue={row?.doi ?? ""} placeholder="10.xxxx/…" /></Field>
        <Field label="Link"><Input name="externalUrl" type="url" defaultValue={row?.externalUrl ?? ""} placeholder="https://" /></Field>
      </Grid>
      <Field label="Abstract"><Textarea name="abstract" maxLength={5000} defaultValue={row?.abstract ?? ""} /></Field>
      <AuthorsField initial={row?.authors.map((a) => ({ regNo: a.regNo, name: a.name })) ?? []} />
    </>
  );
}

export default function PublicationsManager({ rows, canAdd }: { rows: PublicationRow[]; canAdd: boolean }) {
  return (
    <div className="space-y-6">
      <Card>
        <SectionHeader title="Your publications" description="Ones you added, and ones where you're listed as an author." />
        {rows.length === 0 ? (
          <EmptyState>No publications yet.</EmptyState>
        ) : (
          <ul className="divide-y divide-[var(--neu-gray-100)]">
            {rows.map((r) => (
              <li key={r.id} className="py-3 first:pt-0 last:pb-0">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[var(--neu-gray-800)]">{r.title}</p>
                    <p className="text-sm text-[var(--neu-gray-600)]">{r.authors.map((a) => a.name).join(", ")}</p>
                    <p className="mt-0.5 text-xs text-[var(--neu-gray-500)]">
                      {[r.venue, r.publishedYear, PUBLICATION_TYPE_LABEL[r.type]].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!r.mine && <Badge tone="blue">Co-author</Badge>}
                    <Badge tone={r.status === "PUBLISHED" ? "green" : r.status === "REJECTED" ? "red" : "gray"}>
                      {PUBLICATION_STATUS_LABEL[r.status]}
                    </Badge>
                  </div>
                </div>
                {r.mine && (
                  <details className="mt-2">
                    <summary className="cursor-pointer select-none text-xs font-semibold text-[var(--neu-green)]">Edit</summary>
                    <div className="mt-3 rounded-[var(--neu-radius-md)] bg-[var(--neu-gray-50)] p-3">
                      <ActionForm
                        action={updatePublication.bind(null, r.id)}
                        extra={
                          <ActionButton variant="danger" confirm="Delete this publication?" action={deletePublication.bind(null, r.id)}>
                            Delete
                          </ActionButton>
                        }
                      >
                        <Fields row={r} />
                      </ActionForm>
                    </div>
                  </details>
                )}
              </li>
            ))}
          </ul>
        )}
      </Card>

      {canAdd ? (
        <Card>
          <SectionHeader title="Add publication" />
          <ActionForm action={addPublication} submitLabel="Add publication" pendingLabel="Adding…" resetOnSuccess>
            <Fields />
          </ActionForm>
        </Card>
      ) : (
        <Notice tone="info">Create your profile first to add publications.</Notice>
      )}
    </div>
  );
}
