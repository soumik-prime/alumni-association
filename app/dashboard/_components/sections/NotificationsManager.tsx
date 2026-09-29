"use client";

import type { NotificationType } from "@/generated/prisma/enums";
import { NOTIFICATION_TYPE_LABEL, toOptions } from "../../_constants/options";
import { createNotification, deleteNotification, updateNotification } from "../../_actions/notifications";
import { fmtDateTime } from "../../_lib/format";
import { Badge, Card, Checkbox, EmptyState, Field, Grid, Input, Select, SectionHeader } from "../ui";
import ActionButton from "../ui/ActionButton";
import ActionForm from "../ui/ActionForm";
import LocalDateTimeInput from "../ui/LocalDateTimeInput";

const TYPES = toOptions(NOTIFICATION_TYPE_LABEL);

export type NotificationRow = {
  id: string; type: NotificationType | null; message: string; active: boolean;
  startsAt: string | null; expiresAt: string | null; createdAt: string; createdByName: string;
  state: "live" | "scheduled" | "expired" | "inactive";
};

const STATE_BADGE = {
  live: { tone: "green", label: "Live" }, scheduled: { tone: "blue", label: "Scheduled" },
  expired: { tone: "gray", label: "Expired" }, inactive: { tone: "amber", label: "Inactive" },
} as const;

type Caps = { create: boolean; edit: boolean; delete: boolean; publish: boolean };

function Fields({ row, caps }: { row?: NotificationRow; caps: Caps }) {
  const contentLocked = !!row && !caps.edit;
  return (
    <>
      <Grid>
        <Field label="Type">
          <Select name="type" options={TYPES} defaultValue={row?.type ?? "INFO"} disabled={contentLocked} />
        </Field>
        <Field label="Message" hint="Max 160 characters">
          <Input name="message" maxLength={160} defaultValue={row?.message ?? ""} required disabled={contentLocked} />
        </Field>
      </Grid>
      {caps.publish ? (
        <>
          <Grid>
            <Field label="Starts at" hint="Leave empty to start immediately"><LocalDateTimeInput name="startsAt" defaultValue={row?.startsAt} /></Field>
            <Field label="Expires at" hint="Leave empty to never expire"><LocalDateTimeInput name="expiresAt" defaultValue={row?.expiresAt} /></Field>
          </Grid>
          <Checkbox name="active" label="Published (active)" defaultChecked={row?.active ?? false} />
        </>
      ) : (
        <p className="text-xs text-[var(--neu-gray-500)]">
          Notifications are saved as inactive — someone with publish access can take them live.
        </p>
      )}
    </>
  );
}

export default function NotificationsManager({ rows, caps }: { rows: NotificationRow[]; caps: Caps }) {
  return (
    <div className="space-y-6">
      <Card>
        <SectionHeader title="Site notifications" description="Banners shown across the site while they're live." />
        {rows.length === 0 ? (
          <EmptyState>No notifications yet.</EmptyState>
        ) : (
          <ul className="divide-y divide-[var(--neu-gray-100)]">
            {rows.map((r) => {
              const badge = STATE_BADGE[r.state];
              const canEditRow = caps.edit || caps.publish;
              return (
                <li key={r.id} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[var(--neu-gray-800)]">{r.message}</p>
                      <p className="mt-0.5 text-xs text-[var(--neu-gray-500)]">
                        {r.type ? NOTIFICATION_TYPE_LABEL[r.type] : "—"} · by {r.createdByName}
                        {(r.startsAt || r.expiresAt) && ` · ${r.startsAt ? fmtDateTime(new Date(r.startsAt)) : "now"} → ${r.expiresAt ? fmtDateTime(new Date(r.expiresAt)) : "no expiry"}`}
                      </p>
                    </div>
                    <Badge tone={badge.tone}>{badge.label}</Badge>
                  </div>
                  {(canEditRow || caps.delete) && (
                    <details className="mt-2">
                      <summary className="cursor-pointer select-none text-xs font-semibold text-[var(--neu-green)]">{canEditRow ? "Edit" : "Delete"}</summary>
                      <div className="mt-3 rounded-[var(--neu-radius-md)] bg-[var(--neu-gray-50)] p-3">
                        {canEditRow ? (
                          <ActionForm
                            action={updateNotification.bind(null, r.id)}
                            extra={caps.delete && (
                              <ActionButton variant="danger" confirm="Delete this notification?" action={deleteNotification.bind(null, r.id)}>Delete</ActionButton>
                            )}
                          >
                            <Fields row={r} caps={caps} />
                          </ActionForm>
                        ) : (
                          <ActionButton variant="danger" confirm="Delete this notification?" action={deleteNotification.bind(null, r.id)}>Delete</ActionButton>
                        )}
                      </div>
                    </details>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </Card>

      {caps.create && (
        <Card>
          <SectionHeader title="New notification" />
          <ActionForm action={createNotification} submitLabel={caps.publish ? "Save" : "Save as inactive"} resetOnSuccess>
            <Fields caps={caps} />
          </ActionForm>
        </Card>
      )}
    </div>
  );
}
