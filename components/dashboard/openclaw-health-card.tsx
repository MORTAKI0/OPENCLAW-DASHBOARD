import type { OpenClawHealth } from "@/lib/openclaw";

type OpenClawHealthCardProps = {
  health: OpenClawHealth;
  isRefreshing?: boolean;
};

function formatLatency(latencyMs: number | null): string {
  if (latencyMs === null) {
    return "Unavailable";
  }

  return `${latencyMs} ms`;
}

function formatCheckedAt(checkedAt: string): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(new Date(checkedAt));
}

export function OpenClawHealthCard({
  health,
  isRefreshing = false,
}: OpenClawHealthCardProps) {
  const statusLabel = health.reachable ? "Connected" : "Disconnected";
  const statusTone = health.reachable
    ? "border-emerald-400/30 bg-emerald-400/12 text-emerald-100"
    : "border-rose-400/30 bg-rose-400/12 text-rose-100";
  const description = health.reachable
    ? "OpenClaw responded to the latest server-side probe."
    : health.error ?? "OpenClaw could not be reached from the dashboard server.";

  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-5 shadow-[0_22px_80px_rgba(2,6,23,0.48)] sm:p-6">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.32em] text-cyan-200/65">
              OpenClaw Status
            </p>
            <h2 className="text-xl font-semibold tracking-tight text-white">
              Gateway Reachability
            </h2>
            <p className="max-w-xl text-sm leading-7 text-slate-400">
              {description}
            </p>
            {isRefreshing ? (
              <p className="inline-flex min-h-6 items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-cyan-200/70">
                <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300/75" />
                Refreshing health probe
              </p>
            ) : null}
          </div>

          <div
            className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium ${statusTone}`}
          >
            {statusLabel}
          </div>
        </div>

        <dl className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
            <dt className="text-xs uppercase tracking-[0.22em] text-slate-500">
              Status
            </dt>
            <dd className="mt-2 text-base font-medium text-slate-100">
              {statusLabel}
            </dd>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
            <dt className="text-xs uppercase tracking-[0.22em] text-slate-500">
              Environment
            </dt>
            <dd className="mt-2 text-base font-medium text-slate-100">
              {health.environment}
            </dd>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
            <dt className="text-xs uppercase tracking-[0.22em] text-slate-500">
              Last Check
            </dt>
            <dd className="mt-2 text-base font-medium text-slate-100">
              {formatCheckedAt(health.checkedAt)}
            </dd>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
            <dt className="text-xs uppercase tracking-[0.22em] text-slate-500">
              Latency
            </dt>
            <dd className="mt-2 text-base font-medium text-slate-100">
              {formatLatency(health.latencyMs)}
            </dd>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 sm:col-span-2">
            <dt className="text-xs uppercase tracking-[0.22em] text-slate-500">
              Status Text
            </dt>
            <dd className="mt-2 text-base font-medium text-slate-100">
              {health.statusText ?? "Unavailable"}
            </dd>
          </div>
        </dl>

        <div className="flex flex-col gap-3 border-t border-white/8 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">
            Open the full OpenClaw surface in a separate tab.
          </p>
          <a
            href={health.openclawUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 px-5 text-sm font-medium text-cyan-100 transition hover:border-cyan-200/40 hover:bg-cyan-300/16"
          >
            Open OpenClaw
          </a>
        </div>
      </div>
    </section>
  );
}

export function OpenClawHealthCardSkeleton() {
  return (
    <section
      aria-hidden="true"
      className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-5 shadow-[0_22px_80px_rgba(2,6,23,0.48)] sm:p-6"
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <div className="h-3 w-36 rounded-full bg-cyan-200/12" />
            <div className="h-8 w-64 max-w-full rounded-full bg-white/10" />
            <div className="space-y-2">
              <div className="h-4 w-full max-w-xl rounded-full bg-white/8" />
              <div className="h-4 w-56 max-w-full rounded-full bg-white/8" />
            </div>
            <div className="inline-flex min-h-6 items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-cyan-200/70">
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300/75" />
              Checking health probe
            </div>
          </div>

          <div className="inline-flex min-h-11 w-32 rounded-full border border-cyan-300/18 bg-cyan-300/10 px-4" />
        </div>

        <dl className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
            <dt className="text-xs uppercase tracking-[0.22em] text-slate-500">
              Status
            </dt>
            <dd className="mt-2 h-6 w-28 rounded-full bg-white/10" />
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
            <dt className="text-xs uppercase tracking-[0.22em] text-slate-500">
              Environment
            </dt>
            <dd className="mt-2 h-6 w-32 rounded-full bg-white/10" />
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
            <dt className="text-xs uppercase tracking-[0.22em] text-slate-500">
              Last Check
            </dt>
            <dd className="mt-2 h-6 w-40 rounded-full bg-white/10" />
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
            <dt className="text-xs uppercase tracking-[0.22em] text-slate-500">
              Latency
            </dt>
            <dd className="mt-2 h-6 w-24 rounded-full bg-white/10" />
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 sm:col-span-2">
            <dt className="text-xs uppercase tracking-[0.22em] text-slate-500">
              Status Text
            </dt>
            <dd className="mt-2 h-6 w-full rounded-full bg-white/10 sm:max-w-[18rem]" />
          </div>
        </dl>

        <div className="flex flex-col gap-3 border-t border-white/8 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="h-4 w-64 max-w-full rounded-full bg-white/8" />
          <div className="inline-flex min-h-12 w-40 rounded-full border border-cyan-300/18 bg-cyan-300/10 px-5" />
        </div>
      </div>
    </section>
  );
}
