import "server-only";

import { getAppEnv, getOpenClawUrls } from "@/lib/auth";

const HEALTH_PROBE_TIMEOUT_MS = 3000;
const DISCONNECTED_STATUS_TEXT = "Unavailable";
const DISCONNECTED_ERROR_MESSAGE = "OpenClaw is currently unavailable.";

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

function getDisconnectedHealth(args: {
  checkedAt: string;
  environment: string;
  openclawUrl: string;
}): OpenClawHealth {
  return {
    reachable: false,
    latencyMs: null,
    checkedAt: args.checkedAt,
    environment: args.environment,
    openclawUrl: args.openclawUrl,
    statusText: DISCONNECTED_STATUS_TEXT,
    error: DISCONNECTED_ERROR_MESSAGE,
  };
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
      signal: AbortSignal.timeout(HEALTH_PROBE_TIMEOUT_MS),
      headers: {
        Accept: "application/json,text/plain;q=0.9,*/*;q=0.8",
      },
    });

    if (!response.ok) {
      return getDisconnectedHealth({
        checkedAt,
        environment,
        openclawUrl: publicUrl,
      });
    }

    const latencyMs = Date.now() - startedAt;
    const statusText = await readStatusText(response);

    return {
      reachable: true,
      latencyMs,
      checkedAt,
      environment,
      openclawUrl: publicUrl,
      statusText,
    };
  } catch {
    return getDisconnectedHealth({
      checkedAt,
      environment,
      openclawUrl: publicUrl,
    });
  }
}
