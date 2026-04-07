import "server-only";

import { getAppEnv, getOpenClawUrls } from "@/lib/auth";

export type OpenClawHealth = {
  reachable: boolean;
  latencyMs: number | null;
  checkedAt: string;
  environment: string;
  openclawUrl: string;
  statusText?: string;
  error?: string;
};

function getHealthProbeUrl(): string {
  const { healthUrl, internalUrl } = getOpenClawUrls();

  return healthUrl ?? new URL("/health", internalUrl).toString();
}

function getErrorMessage(): string {
  return "Unable to reach OpenClaw.";
}

async function readStatusText(response: Response): Promise<string | undefined> {
  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    return undefined;
  }

  try {
    const payload = (await response.json()) as { status?: unknown };

    return typeof payload.status === "string" ? payload.status : undefined;
  } catch {
    return undefined;
  }
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
      signal: AbortSignal.timeout(3000),
      headers: {
        Accept: "application/json,text/plain;q=0.9,*/*;q=0.8",
      },
    });

    const latencyMs = Date.now() - startedAt;
    const statusText = await readStatusText(response);
    const reachable = response.ok;

    return {
      reachable,
      latencyMs,
      checkedAt,
      environment,
      openclawUrl: publicUrl,
      statusText,
      error: reachable ? undefined : `OpenClaw responded with HTTP ${response.status}.`,
    };
  } catch {
    return {
      reachable: false,
      latencyMs: null,
      checkedAt,
      environment,
      openclawUrl: publicUrl,
      statusText: undefined,
      error: getErrorMessage(),
    };
  }
}
