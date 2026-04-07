import type { OpenClawHealth } from "@/lib/openclaw";

type TopStatusBarProps = {
  health: OpenClawHealth;
};

function formatCheckedAt(checkedAt: string): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(checkedAt));
}

export function TopStatusBar({ health }: TopStatusBarProps) {
  const statusLabel = health.reachable ? "Connected" : "Disconnected";
  const statusTone = health.reachable
    ? "border-emerald-400/30 bg-emerald-400/12 text-emerald-100"
    : "border-rose-400/30 bg-rose-400/12 text-rose-100";

  return (
    <section className="rounded-[1.5rem] border border-white/10 bg-slate-950/50 px-4 py-4 shadow-[0_18px_60px_rgba(2,6,23,0.36)] sm:px-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
            <dt className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
              Status
            </dt>
            <dd className="mt-2">
              <span
                className={`inline-flex min-h-10 items-center rounded-full border px-3 text-sm font-medium ${statusTone}`}
              >
                {statusLabel}
              </span>
            </dd>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
            <dt className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
              Environment
            </dt>
            <dd className="mt-2 text-sm font-medium text-slate-100">
              {health.environment}
            </dd>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
            <dt className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
              Last Check
            </dt>
            <dd className="mt-2 text-sm font-medium text-slate-100">
              {formatCheckedAt(health.checkedAt)}
            </dd>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
            <dt className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
              OpenClaw
            </dt>
            <dd className="mt-2">
              <a
                href={health.openclawUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 text-sm font-medium text-cyan-100 transition hover:border-cyan-200/40 hover:bg-cyan-300/16"
              >
                Open OpenClaw
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
