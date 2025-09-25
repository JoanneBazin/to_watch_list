import { prisma } from "@/src/lib/prisma";
import { requireAuth } from "@/src/utils/requireAuth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
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

  if (!userCount)
    return NextResponse.json(
      { error: "Utilisateur non trouvé" },
      { status: 404 }
    );

  return NextResponse.json(userCount);
}
