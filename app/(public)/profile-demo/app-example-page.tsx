// Renders the local demo profile until a profile data source is connected.

import { Profile } from "./ProfileView";
import { exampleProfile } from "./example-profile";

export default function ProfilePage() {
  return <Profile profile={exampleProfile} />;
}
