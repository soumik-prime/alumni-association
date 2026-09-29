import Link from "next/link";
import { Card } from "../ui";

export default function NoProfile() {
  return (
    <Card>
      <h2 className="text-base font-semibold text-[var(--neu-gray-800)]">You don&apos;t have a profile yet</h2>
      <p className="mt-1 text-sm text-[var(--neu-gray-500)]">
        Create your profile first, then come back to fill in this section.
      </p>
      <Link
        href="/dashboard/profile"
        className="mt-3 inline-flex rounded-[var(--neu-radius-md)] bg-[var(--neu-green)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--neu-green-hover)]"
      >
        Go to profile
      </Link>
    </Card>
  );
}
