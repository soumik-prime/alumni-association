import { MapPin } from "lucide-react";
import type { Address, Profile } from "./profile";
import { sameAddress } from "./profile-utils";

function AddressCard({ label, address }: { label: string; address: Address }) {
  return (
    <div className="flex items-start gap-3">
      <span
        aria-hidden="true"
        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--neu-emerald-light)] text-[color:var(--neu-green)]"
      >
        <MapPin className="h-4 w-4" />
      </span>
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="font-medium text-slate-800">
          {address.city}, {address.country.name}
          {address.country.flag ? ` ${address.country.flag}` : ""}
        </p>
      </div>
    </div>
  );
}

type Props = {
  profile: Profile;
};

export function AddressSection({ profile }: Props) {
  const { present_address, permanent_address } = profile;
  if (!present_address && !permanent_address) return null;

  const identical = sameAddress(present_address, permanent_address);

  return (
    <section aria-labelledby="location-heading" className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 id="location-heading" className="font-[Bricolage_Grotesque] text-lg font-semibold text-slate-900">
        Location
      </h2>
      <div className="mt-4 space-y-4">
        {present_address && <AddressCard label="Present" address={present_address} />}
        {permanent_address && !identical && (
          <AddressCard label="Permanent" address={permanent_address} />
        )}
        {permanent_address && identical && (
          <p className="pl-11 text-sm text-slate-400">Permanent address is the same</p>
        )}
      </div>
    </section>
  );
}
