import { getInitials } from "../_lib/member";

type AvatarProps = { name: string; alumni: boolean; size?: number | string };

export function Avatar({ name, alumni, size = 48 }: AvatarProps) {
  return (
    <span
      role="img"
      aria-label={name}
      style={{ width: size, height: size }}
      className={`inline-flex shrink-0 items-center justify-center rounded-full border-2 border-white text-sm font-bold shadow-sm ${
        alumni ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
      }`}
    >
      {getInitials(name)}
    </span>
  );
}
