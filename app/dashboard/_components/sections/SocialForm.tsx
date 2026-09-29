import type { Profile } from "@/generated/prisma/client";
import type { FormAction } from "../../_lib/action-state";
import { Card, Field, Grid, Input, Notice, SectionHeader } from "../ui";
import ActionForm from "../ui/ActionForm";

export default function SocialForm({
  profile, action, canEdit = true,
}: { profile: Profile; action: FormAction; canEdit?: boolean }) {
  return (
    <Card>
      <SectionHeader
        title="Social & contact"
        description="Shown on your public profile. Leave a field empty to hide it."
      />
      {!canEdit && <div className="mb-4"><Notice tone="warn">You don&apos;t have permission to edit this profile.</Notice></div>}
      <ActionForm action={action} readOnly={!canEdit}>
        <Grid>
          <Field label="Public contact email" hint="Separate from your sign-in email, which never changes.">
            <Input name="email" type="email" defaultValue={profile.email ?? ""} />
          </Field>
          <Field label="Portfolio"><Input name="portfolio" type="url" defaultValue={profile.portfolio ?? ""} placeholder="https://" /></Field>
          <Field label="LinkedIn"><Input name="linkedin" type="url" defaultValue={profile.linkedin ?? ""} placeholder="https://linkedin.com/in/…" /></Field>
          <Field label="GitHub"><Input name="github" type="url" defaultValue={profile.github ?? ""} placeholder="https://github.com/…" /></Field>
          <Field label="Facebook"><Input name="facebook" type="url" defaultValue={profile.facebook ?? ""} placeholder="https://facebook.com/…" /></Field>
          <Field label="Google Scholar"><Input name="googleScholar" type="url" defaultValue={profile.googleScholar ?? ""} placeholder="https://scholar.google.com/…" /></Field>
        </Grid>
      </ActionForm>
    </Card>
  );
}
