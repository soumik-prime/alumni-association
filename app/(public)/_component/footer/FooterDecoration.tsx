export default function FooterDecoration() {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-(--neu-green)/70 to-transparent"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-xl -translate-x-1/2 rounded-full bg-(--neu-green)/10 blur-3xl"
      />
    </>
  );
}
