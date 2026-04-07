import { LiveOpenClawHealth } from "@/components/dashboard/live-openclaw-health";
import { getOpenClawHealth } from "@/lib/openclaw";

export default async function DashboardPage() {
  const health = await getOpenClawHealth();

  return <LiveOpenClawHealth initialHealth={health} />;
}
