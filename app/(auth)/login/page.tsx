import { redirect } from "next/navigation";

import { auth } from "@/auth";

import { LoginForm } from "./login-form";

type LoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LoginPage({
  searchParams,
}: LoginPageProps) {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  const resolvedSearchParams = await searchParams;
  const initialError =
    resolvedSearchParams.error === "CredentialsSignin"
      ? "Invalid username or password."
      : null;

  return (
    <main className="relative flex min-h-screen overflow-hidden bg-[#050816] px-4 py-6 text-slate-100 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.14),_transparent_32%)]" />
      <section className="relative mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-[0_32px_120px_rgba(2,6,23,0.65)] backdrop-blur sm:p-8">
          <div className="mb-8 space-y-3">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-cyan-200/70">
              OpenClaw Admin
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              Dashboard Sign In
            </h1>
            <p className="text-sm leading-7 text-slate-400">
              Use the configured admin credentials to access the dashboard.
            </p>
          </div>

          <LoginForm initialError={initialError} />
        </div>
      </section>
    </main>
  );
}
