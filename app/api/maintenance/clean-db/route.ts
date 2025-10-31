import { cleanWatchlist } from "@/scripts/cleanWatchlist";
import { NextResponse } from "next/server";

//  CRON TASK - Called by Vercel Scheduler

export async function GET(req: Request) {
  if (req.headers.get("x-cron-secret") !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await cleanWatchlist();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
