import { fetchMediaQuery } from "@/src/lib/server/tmdbService";
import { EntryType } from "@/src/types";
import { requireAuth, handleApiRoute } from "@/src/utils/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return handleApiRoute(async () => {
    await requireAuth(req);
    const query = req.nextUrl.searchParams.get("q");
    const entry = req.nextUrl.searchParams.get("type") as EntryType;

    if (!query || !entry) {
      return NextResponse.json(
        { message: "Paramètres 'q' et 'type' requis" },
        { status: 400 }
      );
    }
    const data = await fetchMediaQuery(query, entry);
    return NextResponse.json(data);
  });
}
