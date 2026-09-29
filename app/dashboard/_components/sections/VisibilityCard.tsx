import { setVisibility } from "../../_actions/profile";
import { Badge, Card, SectionHeader } from "../ui";
import ActionButton from "../ui/ActionButton";

/** Directory visibility. Only people with `profile.visibility.toggle` get the button. */
export default function VisibilityCard({
  profileId, visible, canToggle,
}: { profileId: string; visible: boolean; canToggle: boolean }) {
  return (
    <Card>
      <SectionHeader
        title="Directory visibility"
        description={
          canToggle
            ? "Hidden profiles don't appear in the public alumni directory."
            : "Whether this profile appears in the public alumni directory. It's managed by the administrators."
        }
        actions={<Badge tone={visible ? "green" : "amber"}>{visible ? "Visible" : "Hidden"}</Badge>}
      />
      {canToggle && (
        <ActionButton size="md" variant={visible ? "secondary" : "primary"} action={setVisibility.bind(null, profileId, !visible)}>
          {visible ? "Hide from directory" : "Show in directory"}
        </ActionButton>
      )}
    </Card>
  );
}
