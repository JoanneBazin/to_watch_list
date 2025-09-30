import { prisma } from "@/src/lib/prisma";
import { ApiError } from "@/src/utils/ApiError";
import { handleApiRoute } from "@/src/utils/handleApiRoute";
import { requireAuth } from "@/src/utils/requireAuth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  return handleApiRoute(async () => {
    const session = await requireAuth(req);
    const userId = session.user.id;

    const userCount = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        _count: {
          select: {
            friendRequestReceived: {
              where: {
                status: "PENDING",
              },
            },
            suggestionsReceived: {
              where: {
                status: "PENDING",
              },
            },
          },
        },
      },
    });

    if (!userCount) throw new ApiError(404, "Utilisateur introuvable");

    return NextResponse.json(userCount);
  });
}
