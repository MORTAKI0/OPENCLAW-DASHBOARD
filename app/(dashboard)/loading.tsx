import { OpenClawHealthCardSkeleton } from "@/components/dashboard/openclaw-health-card";

export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      <section
        aria-hidden="true"
        className="rounded-[1.5rem] border border-white/10 bg-slate-950/50 px-4 py-4 shadow-[0_18px_60px_rgba(2,6,23,0.36)] sm:px-5"
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
            <div className="h-3 w-16 rounded-full bg-white/8" />
            <div className="mt-3 h-10 w-28 rounded-full border border-cyan-300/18 bg-cyan-300/10" />
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
            <div className="h-3 w-24 rounded-full bg-white/8" />
            <div className="mt-3 h-5 w-24 rounded-full bg-white/10" />
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
            <div className="h-3 w-24 rounded-full bg-white/8" />
            <div className="mt-3 h-5 w-32 rounded-full bg-white/10" />
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
            <div className="h-3 w-24 rounded-full bg-white/8" />
            <div className="mt-3 h-11 w-32 rounded-full border border-cyan-300/18 bg-cyan-300/10" />
          </div>
        </div>
      </section>

      <OpenClawHealthCardSkeleton />
    </div>
  );
}
