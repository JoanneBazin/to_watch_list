import { cleanWatchlist } from "@/scripts/cleanWatchlist";
import { NextRequest, NextResponse } from "next/server";

//  CRON TASK

export async function GET(req: NextRequest) {
  if (req.headers.get("x-cron-secret") !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const result = await cleanWatchlist();
  return NextResponse.json(result);
}
