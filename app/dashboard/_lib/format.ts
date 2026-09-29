import { APP_TIMEZONE } from "../_constants/options";

const opts = { timeZone: APP_TIMEZONE } as const;

export const fmtDate = (d: Date | null | undefined) =>
  d ? d.toLocaleDateString("en-GB", { ...opts, day: "2-digit", month: "short", year: "numeric" }) : "—";

export const fmtMonth = (d: Date | null | undefined) =>
  d ? d.toLocaleDateString("en-GB", { ...opts, month: "short", year: "numeric" }) : "—";

export const fmtDateTime = (d: Date | null | undefined) =>
  d
    ? d.toLocaleString("en-GB", { ...opts, day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })
    : "—";

/** Date -> value for <input type="date"> */
export const toDateInput = (d: Date | null | undefined) => (d ? d.toISOString().slice(0, 10) : "");
