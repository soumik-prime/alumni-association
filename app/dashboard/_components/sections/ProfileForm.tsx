import type { Profile } from "@/generated/prisma/client";
import { BLOOD_GROUP_LABEL, GENDER_LABEL, toOptions } from "../../_constants/options";
import type { FormAction } from "../../_lib/action-state";
import { toDateInput } from "../../_lib/format";
import { Card, Field, Grid, Input, Notice, Select, SectionHeader, Textarea } from "../ui";
import ActionForm from "../ui/ActionForm";
import ProfilePhotoUploader from "./ProfilePhotoUploader";

const GENDERS = toOptions(GENDER_LABEL);
const BLOODS = toOptions(BLOOD_GROUP_LABEL);

/** Create (profile = null) or edit a profile's identity + academic fields. */
export default function ProfileForm({
  profile, action, photoAction, canEdit = true, title = "Profile",
}: { profile: Profile | null; action: FormAction; photoAction?: FormAction; canEdit?: boolean; title?: string }) {
  return (
    <Card>
      <SectionHeader
        title={profile ? title : "Create your profile"}
        description={
          profile
            ? "Your account name and email are permanent. Everything on this profile can be changed."
            : "Add your academic details to appear in the alumni directory."
        }
      />
      {!canEdit && <div className="mb-4"><Notice tone="warn">You don&apos;t have permission to edit this profile.</Notice></div>}
      <ActionForm
        action={action}
        readOnly={!canEdit}
        submitLabel={profile ? "Save profile" : "Create profile"}
        pendingLabel={profile ? "Saving…" : "Creating…"}
      >
        <Grid>
          <Field label="Full name"><Input name="name" defaultValue={profile?.name ?? ""} required maxLength={100} /></Field>
          <Field label="Registration no." hint="Up to 9 letters/digits">
            <Input name="regNo" defaultValue={profile?.regNo ?? ""} required maxLength={9} />
          </Field>
          <Field label="Batch"><Input name="batch" type="number" min={1} max={500} defaultValue={profile?.batch ?? ""} required /></Field>
          <Field label="Session" hint="e.g. 2021-22"><Input name="session" defaultValue={profile?.session ?? ""} required maxLength={7} placeholder="2021-22" /></Field>
          <Field label="Graduation date"><Input name="graduationDate" type="date" defaultValue={toDateInput(profile?.graduationDate)} /></Field>
          <Field label="Gender"><Select name="gender" options={GENDERS} placeholder="Prefer not to say" defaultValue={profile?.gender ?? ""} /></Field>
          <Field label="Blood group"><Select name="bloodGroup" options={BLOODS} placeholder="Not specified" defaultValue={profile?.bloodGroup ?? ""} /></Field>
        </Grid>
        <Field label="Bio"><Textarea name="bio" defaultValue={profile?.bio ?? ""} maxLength={1000} /></Field>
      </ActionForm>
      {profile && photoAction && canEdit && <div className="mt-4"><ProfilePhotoUploader photo={profile.photo} action={photoAction} /></div>}
    </Card>
  );
}
