"use client";

import { DashboardErrorFallback } from "@/components/dashboard/dashboard-error-fallback";

export default function DashboardError({
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  return <DashboardErrorFallback onRetry={reset} />;
}
