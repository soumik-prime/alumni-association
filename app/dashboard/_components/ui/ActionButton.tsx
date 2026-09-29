"use client";

import { useState, useTransition, type ReactNode } from "react";
import { btnClass } from ".";
import type { ActionState, PlainAction } from "../../_lib/action-state";

/** A button that runs a (pre-bound) server action, with optional confirm. */
export default function ActionButton({
  action, children, confirm, variant = "secondary", size = "sm",
}: {
  action: PlainAction;
  children: ReactNode;
  confirm?: string;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md";
}) {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<ActionState>({ status: "idle" });

  function onClick() {
    if (confirm && !window.confirm(confirm)) return;
    startTransition(async () => setResult(await action()));
  }

  return (
    <span className="inline-flex flex-col items-start gap-1">
      <button type="button" onClick={onClick} disabled={pending} className={btnClass(variant, size)}>
        {pending ? "Working…" : children}
      </button>
      {result.status === "error" && <span className="text-xs text-red-600">{result.message}</span>}
    </span>
  );
}
