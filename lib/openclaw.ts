import "server-only";

import { getAppEnv, getOpenClawUrls } from "@/lib/auth";

export type OpenClawHealth = {
  reachable: boolean;
  latencyMs: number | null;
  checkedAt: string;
  environment: string;
  openclawUrl: string;
  error?: string;
};

function getHealthProbeUrl(): string {
  const { internalUrl } = getOpenClawUrls();

  return new URL("/", internalUrl).toString();
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to reach OpenClaw.";
}

export async function getOpenClawHealth(): Promise<OpenClawHealth> {
  const startedAt = Date.now();
  const checkedAt = new Date().toISOString();
  const environment = getAppEnv();
  const { publicUrl } = getOpenClawUrls();

  try {
    const response = await fetch(getHealthProbeUrl(), {
      method: "GET",
      cache: "no-store",
      redirect: "follow",
      signal: AbortSignal.timeout(3000),
      headers: {
        Accept: "text/html,application/json;q=0.9,*/*;q=0.8",
      },
    });

    const latencyMs = Date.now() - startedAt;
    const reachable = response.status < 500;

    return {
      reachable,
      latencyMs,
      checkedAt,
      environment,
      openclawUrl: publicUrl,
      error: reachable ? undefined : `OpenClaw responded with HTTP ${response.status}.`,
    };
  } catch (error) {
    return {
      reachable: false,
      latencyMs: null,
      checkedAt,
      environment,
      openclawUrl: publicUrl,
      error: getErrorMessage(error),
    };
  }
}
