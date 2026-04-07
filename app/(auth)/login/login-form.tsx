"use client";

import { useActionState } from "react";

import { authenticateAdmin } from "@/app/(auth)/login/actions";

type LoginFormProps = {
  initialError?: string | null;
};

export function LoginForm({ initialError = null }: LoginFormProps) {
  const [state, formAction, isPending] = useActionState(
    authenticateAdmin,
    {
      error: initialError,
    },
  );

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <label
          htmlFor="username"
          className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400"
        >
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          className="min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-300/50"
          placeholder="admin"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-cyan-300/50"
          placeholder="Enter password"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="flex min-h-12 w-full items-center justify-center rounded-2xl bg-cyan-300 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:bg-cyan-300/70"
      >
        {isPending ? "Signing in..." : "Sign in"}
      </button>

      {state.error ? (
        <p className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
