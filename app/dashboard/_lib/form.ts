import { ActionError } from "./guards";

export const str = (fd: FormData, key: string): string => {
  const v = fd.get(key);
  return typeof v === "string" ? v.trim() : "";
};

export const optStr = (fd: FormData, key: string): string | null => str(fd, key) || null;
export const bool = (fd: FormData, key: string): boolean => fd.get(key) === "on" || fd.get(key) === "true";

export function required(value: string, label: string, max?: number): string {
  if (!value) throw new ActionError(`${label} is required.`);
  if (max && value.length > max) throw new ActionError(`${label} must be ${max} characters or fewer.`);
  return value;
}

export function maxLen(value: string | null, label: string, max: number): string | null {
  if (value && value.length > max) throw new ActionError(`${label} must be ${max} characters or fewer.`);
  return value;
}

export function pickEnum<T extends string>(value: string, allowed: Record<T, string>, label: string): T {
  if (!(value in allowed)) throw new ActionError(`Choose a valid ${label}.`);
  return value as T;
}

export function optEnum<T extends string>(value: string, allowed: Record<T, string>, label: string): T | null {
  return value ? pickEnum(value, allowed, label) : null;
}

export function optUrl(value: string | null, label: string): string | null {
  if (!value) return null;
  try {
    const u = new URL(value);
    if (u.protocol !== "http:" && u.protocol !== "https:") throw new Error();
    return u.toString();
  } catch {
    throw new ActionError(`${label} must be a full link starting with http:// or https://`);
  }
}

export function optEmail(value: string | null, label: string): string | null {
  if (!value) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) throw new ActionError(`${label} isn't a valid email address.`);
  return value.toLowerCase();
}

export function optInt(value: string, label: string, min: number, max: number): number | null {
  if (!value) return null;
  const n = Number(value);
  if (!Number.isInteger(n) || n < min || n > max) throw new ActionError(`${label} must be a whole number between ${min} and ${max}.`);
  return n;
}

/** `<input type="date">` value -> Date (UTC midnight), or null when blank. */
export function optDate(value: string, label: string): Date | null {
  if (!value) return null;
  const d = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(d.getTime())) throw new ActionError(`${label} isn't a valid date.`);
  return d;
}

/** ISO string from <LocalDateTimeInput> -> Date, or null when blank. */
export function optDateTime(value: string, label: string): Date | null {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) throw new ActionError(`${label} isn't a valid date and time.`);
  return d;
}
