"use client";

import { useEffect, useState } from "react";

import { OpenClawHealthCard } from "@/components/dashboard/openclaw-health-card";
import { TopStatusBar } from "@/components/dashboard/top-status-bar";
import type { OpenClawHealth } from "@/lib/openclaw";

const HEALTH_REFRESH_INTERVAL_MS = 30_000;
const HEALTH_ROUTE = "/api/openclaw-health";

type LiveOpenClawHealthProps = {
  initialHealth: OpenClawHealth;
};

export function LiveOpenClawHealth({
  initialHealth,
}: LiveOpenClawHealthProps) {
  const [health, setHealth] = useState(initialHealth);

  useEffect(() => {
    let isActive = true;

    async function refreshHealth(): Promise<void> {
      try {
        const response = await fetch(HEALTH_ROUTE, {
          method: "GET",
          cache: "no-store",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          return;
        }

        const nextHealth = (await response.json()) as OpenClawHealth;

        if (isActive) {
          setHealth(nextHealth);
        }
      } catch {
        // Keep the last known state if a refresh request fails.
      }
    }

    const intervalId = window.setInterval(() => {
      void refreshHealth();
    }, HEALTH_REFRESH_INTERVAL_MS);

    return () => {
      isActive = false;
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="space-y-8">
      <TopStatusBar health={health} />
      <OpenClawHealthCard health={health} />
    </div>
  );
}
