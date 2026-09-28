import type { ReactNode } from "react";

/** Full-page background + centered card + footer shared by all auth pages. */
export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex min-h-dvh items-center justify-center bg-slate-50 px-4 py-10 sm:py-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-(--neu-green)/10 blur-3xl sm:-top-32 sm:-left-32 sm:h-96 sm:w-96" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-(--neu-emerald)/10 blur-3xl sm:-bottom-32 sm:-right-32 sm:h-96 sm:w-96" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(15 23 42 / 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgb(15 23 42 / 0.02) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <section className="relative w-full max-w-md">
        <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur-sm sm:p-10">
          {children}
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Department of Computer Science & Engineering · Netrokona University
        </p>
      </section>
    </main>
  );
}
