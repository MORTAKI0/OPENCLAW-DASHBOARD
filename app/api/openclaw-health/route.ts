import { NextResponse } from "next/server";

import { getOpenClawHealth } from "@/lib/openclaw";

export const runtime = "nodejs";

export async function GET() {
  const health = await getOpenClawHealth();

  return NextResponse.json(health, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
