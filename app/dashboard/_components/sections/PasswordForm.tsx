import { changePassword } from "../../_actions/security";
import { Card, Checkbox, Field, Input, SectionHeader } from "../ui";
import ActionForm from "../ui/ActionForm";

export default function PasswordForm() {
  return (
    <Card>
      <SectionHeader title="Change password" description="Use at least 8 characters." />
      <ActionForm action={changePassword} submitLabel="Change password" pendingLabel="Changing…" resetOnSuccess>
        <div className="grid max-w-md gap-4">
          <Field label="Current password"><Input name="currentPassword" type="password" autoComplete="current-password" required /></Field>
          <Field label="New password"><Input name="newPassword" type="password" autoComplete="new-password" minLength={8} maxLength={128} required /></Field>
          <Field label="Confirm new password"><Input name="confirmPassword" type="password" autoComplete="new-password" minLength={8} required /></Field>
          <Checkbox name="revokeOthers" label="Sign out of my other devices" defaultChecked />
        </div>
      </ActionForm>
    </Card>
  );
}
