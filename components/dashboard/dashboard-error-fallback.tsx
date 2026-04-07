type DashboardErrorFallbackProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
};

export function DashboardErrorFallback({
  title = "Something went wrong while loading this dashboard section.",
  description = "You can refresh and try again.",
  onRetry,
}: DashboardErrorFallbackProps) {
  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-5 shadow-[0_22px_80px_rgba(2,6,23,0.48)] sm:p-6">
      <div className="flex flex-col gap-5">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-amber-200/70">
            Dashboard Notice
          </p>
          <h2 className="text-xl font-semibold tracking-tight text-white">
            {title}
          </h2>
          <p className="max-w-xl text-sm leading-7 text-slate-400">
            {description}
          </p>
        </div>

        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
          <p className="text-sm leading-7 text-slate-300">
            The rest of your dashboard session is still available.
          </p>
        </div>

        {onRetry ? (
          <div className="border-t border-white/8 pt-4">
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/8 px-5 text-sm font-medium text-slate-100 transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
            >
              Try again
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
