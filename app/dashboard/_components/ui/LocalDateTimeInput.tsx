"use client";

import { useState } from "react";
import { inputClass } from ".";

const pad = (n: number) => String(n).padStart(2, "0");
const toLocalValue = (iso?: string | null) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

/**
 * Shows the viewer's local time but submits an absolute ISO string, so the
 * server never has to guess the browser's timezone.
 */
export default function LocalDateTimeInput({
  name, defaultValue, disabled,
}: { name: string; defaultValue?: string | null; disabled?: boolean }) {
  const [local, setLocal] = useState(() => toLocalValue(defaultValue));
  const iso = local ? new Date(local).toISOString() : "";

  return (
    <>
      <input
        type="datetime-local"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        disabled={disabled}
        className={inputClass}
      />
      <input type="hidden" name={name} value={iso} disabled={disabled} />
    </>
  );
}
