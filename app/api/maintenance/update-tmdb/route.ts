import { updateTmdbMedia } from "@/scripts/updateTmdbMedia";
import { NextResponse } from "next/server";

//  CRON TASK

export async function GET(req: Request) {
  if (req.headers.get("x-cron-secret") !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const result = await updateTmdbMedia();
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
