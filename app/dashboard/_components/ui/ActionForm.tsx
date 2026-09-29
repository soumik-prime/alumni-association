"use client";

import { useActionState, useEffect, useRef, useTransition, type FormEvent, type ReactNode } from "react";
import { IDLE, type FormAction } from "../../_lib/action-state";
import { btnClass, Notice } from ".";

type Props = {
  action: FormAction;
  children: ReactNode;
  submitLabel?: string;
  pendingLabel?: string;
  /** Clear the inputs after a successful save (add-record forms). */
  resetOnSuccess?: boolean;
  /** Renders the fields read-only and hides the submit button. */
  readOnly?: boolean;
  className?: string;
  /** Extra content rendered next to the submit button. */
  extra?: ReactNode;
  /** Render this instead of the default success line (e.g. a one-time password). */
  renderSuccess?: (state: Extract<import("../../_lib/action-state").ActionState, { status: "success" }>) => ReactNode;
};

/**
 * Wraps a server action. Submits through a transition (not `action=`) so React
 * doesn't wipe the inputs when validation fails.
 */
export default function ActionForm({
  action, children, submitLabel = "Save changes", pendingLabel = "Saving…",
  resetOnSuccess = false, readOnly = false, className = "space-y-4", extra, renderSuccess,
}: Props) {
  const [state, dispatch] = useActionState(action, IDLE);
  const [pending, startTransition] = useTransition();
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (resetOnSuccess && state.status === "success") ref.current?.reset();
  }, [state, resetOnSuccess]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => dispatch(data));
  }

  return (
    <form ref={ref} onSubmit={onSubmit} className={className}>
      <fieldset disabled={readOnly || pending} className="min-w-0 space-y-4 border-0 p-0">
        {children}
      </fieldset>

      {state.status === "error" && <Notice tone="error">{state.message}</Notice>}
      {state.status === "success" &&
        (renderSuccess ? renderSuccess(state) : <Notice tone="success">{state.message}</Notice>)}

      {!readOnly && (
        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" disabled={pending} className={btnClass("primary")}>
            {pending ? pendingLabel : submitLabel}
          </button>
          {extra}
        </div>
      )}
    </form>
  );
}
