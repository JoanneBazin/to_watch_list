import { prisma } from "@/src/lib/server";
import { handleApiRoute, requireAuth } from "@/src/utils/server";
import { ApiError } from "@/src/utils/shared";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
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
