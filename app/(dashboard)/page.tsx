import { signOutAdmin } from "./actions";

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_34%),linear-gradient(180deg,_#050816_0%,_#090c17_48%,_#05070f_100%)] px-4 py-6 text-slate-100 sm:px-6">
      <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-between rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_32px_120px_rgba(2,6,23,0.65)] backdrop-blur sm:p-8">
        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-cyan-200/70">
            OpenClaw Admin Surface
          </p>
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              OpenclawUI Dashboard
            </h1>
            <p className="max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              Authenticated
            </p>
          </div>
        </div>

        <form action={signOutAdmin} className="pt-10">
          <button
            type="submit"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/8 px-5 text-sm font-medium text-slate-100 transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
          >
            Sign out
          </button>
        </form>
      </section>
    </main>
  );
}
