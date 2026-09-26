import { Home, MapPin } from "lucide-react";
import { Profile } from "../_types/profile.types";
import { EmptyState } from "./shared/SectionParts";

interface LocationSectionProps {
  profile: Profile;
}

export default function LocationSection({ profile }: LocationSectionProps) {
  const { presentAddress, permanentAddress } = profile;

  if (!presentAddress && !permanentAddress) {
    return (
      <EmptyState
        icon={MapPin}
        title="No location on record"
        message="Address details will show up here once added."
      />
    );
  }

  const isSameAddress = Boolean(
    presentAddress &&
      permanentAddress &&
      presentAddress.city === permanentAddress.city &&
      presentAddress.country.name === permanentAddress.country.name,
  );

  return (
    <div className="overflow-x-auto scrollbar-none">
      <table className="w-full text-left text-sm">
        <thead className="sticky top-0 z-10 border-b border-(--neu-gray-200) bg-(--neu-gray-50) text-xs font-semibold uppercase tracking-wide text-(--neu-gray-500)">
          <tr>
            <th scope="col" className="px-4 py-3 sm:px-6">Type</th>
            <th scope="col" className="px-4 py-3 sm:px-6">City</th>
            <th scope="col" className="px-4 py-3 sm:px-6">Country</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-(--neu-gray-200) text-(--neu-gray-900)">
          {/* Present Address Row */}
          {presentAddress && (
            <TableRow
              icon={MapPin}
              label="Present address"
              city={presentAddress.city}
              country={presentAddress.country.name}
            />
          )}

          {/* Permanent Address Row */}
          {isSameAddress ? (
            <tr>
              <td colSpan={3} className="px-4 py-3.5 text-center text-xs text-(--neu-gray-400) sm:px-6">
                Permanent address is the same as present address.
              </td>
            </tr>
          ) : permanentAddress ? (
            <TableRow
              icon={Home}
              label="Permanent address"
              city={permanentAddress.city}
              country={permanentAddress.country.name}
            />
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

function TableRow({
  icon: Icon,
  label,
  city,
  country,
}: {
  icon: typeof MapPin;
  label: string;
  city: string;
  country: string;
}) {
  return (
    <tr className="hover:bg-(--neu-gray-50)/50 transition-colors">
      <td className="px-4 py-3.5 sm:px-6 font-medium">
        <div className="flex items-center gap-2">
          <Icon className="size-4 shrink-0 text-(--neu-gray-400)" />
          <span>{label}</span>
        </div>
      </td>
      <td className="px-4 py-3.5 sm:px-6">{city}</td>
      <td className="px-4 py-3.5 sm:px-6 text-(--neu-gray-500)">{country}</td>
    </tr>
  );
}