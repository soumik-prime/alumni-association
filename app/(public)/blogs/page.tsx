import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | CSE Alumni Association",
  description:
    "Explore career stories, industry insights, and alumni news from the CSE Alumni Association at Netrokona University.",
};

export default async function Page() {
  const maxWidth = "w-full max-w-screen-2xl mx-auto";

  return (
    <main
      id="main-content"
      className="relative bg-gradient-to-b from-green-50/90 via-emerald-50/40 to-green-50/80 min-h-[80vh] flex items-center justify-center overflow-hidden px-4 py-16"
      aria-label="Main content"
    >
      {/* Background Decorative Blur Effects */}
      <div className="absolute -top-24 -left-20 w-96 h-96 bg-green-200/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-20 w-96 h-96 bg-emerald-300/30 rounded-full blur-3xl pointer-events-none" />

      <section className={`${maxWidth} relative z-10 flex flex-col items-center text-center max-w-3xl`}>
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200/60 shadow-sm backdrop-blur-sm mb-6">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
          </span>
          <span className="text-xs font-semibold text-emerald-900 tracking-wide uppercase">
            Alumni Blog Hub
          </span>
        </div>

        {/* Header */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
          CSE Alumni Blog & Insights
        </h1>

        {/* Description */}
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
          We’re brewing up career stories, industry tips, alumni spotlights, and late-night tech ramblings from Netrokona University grads around the globe!
        </p>

        {/* Coming Soon Card with Fun Elements */}
        <div className="mt-10 p-8 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-xl shadow-slate-200/50 w-full max-w-md">
          <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
            Current Status
          </p>
          <div className="mt-2 text-3xl font-black tracking-tight text-emerald-800">
            COMING SOON
          </div>

          {/* Progress Bar */}
          <div className="mt-4 h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-green-600 w-4/5 rounded-full animate-pulse" />
          </div>

          {/* Fun Dev Quote */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-mono text-slate-500 italic">
            &rdquo;There are only 10 types of people in the world: those who understand binary, and those who are waiting for this blog to launch.&rdquo; ☕
          </div>
        </div>
      </section>
    </main>
  );
}