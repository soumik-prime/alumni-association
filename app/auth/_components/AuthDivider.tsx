/** The thin "— or —" divider between the form and the footer link. */
export function AuthDivider() {
  return (
    <div className="mt-6 flex items-center gap-3">
      <div className="h-px flex-1 bg-slate-200" />
      <span className="text-xs text-slate-400">or</span>
      <div className="h-px flex-1 bg-slate-200" />
    </div>
  );
}
