"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { FormAction } from "../../_lib/action-state";
import { IDLE } from "../../_lib/action-state";
import { btnClass, Notice } from "../ui";

export default function ProfilePhotoUploader({ photo, action }: { photo: string | null; action: FormAction }) {
  const [state, dispatch, pending] = useActionState(action, IDLE);
  const [preview, setPreview] = useState<string | null>(photo);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (state.status === "success") router.refresh();
  }, [router, state.status]);

  function previewFile(file: File | undefined) {
    if (!file) return;
    const nextPreview = URL.createObjectURL(file);
    setPreview((previous) => {
      if (previous?.startsWith("blob:")) URL.revokeObjectURL(previous);
      return nextPreview;
    });
  }

  return (
    <div className="rounded-[var(--neu-radius-md)] border border-[var(--neu-gray-200)] p-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--neu-gray-100)] text-xs text-[var(--neu-gray-500)]">
          {preview ? <Image unoptimized src={preview} alt="Profile photo preview" width={64} height={64} className="h-full w-full object-cover" /> : "No photo"}
        </div>
        <form action={dispatch} className="min-w-0 flex-1 space-y-2">
          <label className="block text-xs font-semibold text-[var(--neu-gray-600)]" htmlFor="profile-photo">
            Profile photo
          </label>
          <input
            ref={inputRef}
            id="profile-photo"
            name="photo"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            required
            disabled={pending}
            onChange={(event) => previewFile(event.currentTarget.files?.[0])}
            className="block w-full text-sm text-[var(--neu-gray-600)] file:mr-3 file:rounded-[var(--neu-radius-md)] file:border-0 file:bg-[var(--neu-gray-100)] file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-[var(--neu-gray-700)] hover:file:bg-[var(--neu-gray-200)]"
          />
          <p className="text-xs text-[var(--neu-gray-500)]">JPEG, PNG, WebP, or GIF; up to 5 MB.</p>
          <button type="submit" disabled={pending} className={btnClass("secondary", "sm")}>
            {pending ? "Uploading…" : "Upload photo"}
          </button>
        </form>
      </div>
      {state.status === "error" && <div className="mt-3"><Notice tone="error">{state.message}</Notice></div>}
      {state.status === "success" && <div className="mt-3"><Notice tone="success">{state.message}</Notice></div>}
    </div>
  );
}
